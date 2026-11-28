import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  REPEAT_LIMIT_MESSAGE,
  recentSubmissionCount,
  tooManyRecentLeads,
  validateEmail,
  validateLeadText,
  validatePersonName,
  validatePhone,
} from "@/lib/lead-guard";
import { clientIp, verifyTurnstile } from "@/lib/turnstile";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      name,
      email,
      contact_email,
      phone,
      contact_phone,
      subject,
      message,
      form_source = "website_callback",
      form_variant = "callback",
      urgent,
      website_honeypot,
      bot_field,
      cf_turnstile_response,
    } = body;

    // Spam protection: if honeypot is filled, return success silently
    if (website_honeypot || bot_field) {
      return NextResponse.json({
        success: true,
        message: "Thank you! Your call-back request has been received.",
      });
    }

    const turnstileOk = await verifyTurnstile(
      typeof cf_turnstile_response === "string" ? cf_turnstile_response : "",
      clientIp(req.headers)
    );
    if (!turnstileOk) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete the security check and try again.",
        },
        { status: 422 }
      );
    }

    const leadName = (name || "").trim();
    const leadEmail = (email || contact_email || "").trim();
    const leadPhone = (phone || contact_phone || "").trim();
    const leadSubject = urgent
      ? `[URGENT] ${(subject || "Visa refused or cancelled").trim()}`
      : (subject || "General Consultation").trim();
    const leadMessage = (message || "Requested call back from homepage").trim();

    const fieldError =
      validatePersonName(leadName, "full name") ||
      (!leadPhone && !leadEmail
        ? "Please provide a valid phone number or email address."
        : null) ||
      validateEmail(leadEmail, false) ||
      validatePhone(leadPhone, false) ||
      validateLeadText(leadSubject, leadMessage);
    if (fieldError) {
      return NextResponse.json({ success: false, message: fieldError }, { status: 400 });
    }

    const ipAddress = clientIp(req.headers) || "127.0.0.1";
    const recent = await recentSubmissionCount(getDb(), "contacts", ipAddress, leadEmail, leadPhone);
    if (tooManyRecentLeads(recent)) {
      return NextResponse.json({ success: false, message: REPEAT_LIMIT_MESSAGE }, { status: 429 });
    }
    const userAgent = req.headers.get("user-agent") || "";

    const db = getDb();
    await db.execute(
      `INSERT INTO contacts (
        name,
        contact_email,
        contact_phone,
        subject,
        message,
        status,
        form_source,
        form_variant,
        ip_address,
        user_agent,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, 'unread', ?, ?, ?, ?, NOW(), NOW())`,
      [
        leadName,
        leadEmail,
        leadPhone,
        leadSubject,
        leadMessage,
        form_source,
        form_variant,
        ipAddress,
        userAgent,
      ]
    );

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your request has been received. A registered migration agent will contact you shortly.",
    });
  } catch (err) {
    console.error("Error processing contact submission:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          "We could not save your request at this moment. Please call our Melbourne office directly on +61 3 9602 1330.",
      },
      { status: 500 }
    );
  }
}
