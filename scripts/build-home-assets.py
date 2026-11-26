"""Build the homepage image sizes named in the handoff."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public"))
FONT = r"C:\Windows\Fonts\arial.ttf"
FONT_BOLD = r"C:\Windows\Fonts\arialbd.ttf"


def cover(src, dest, size, quality):
    image = Image.open(src).convert("RGB")
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
    image.save(dest, "WEBP", quality=quality, method=6)


def under(src, dest, size, limit):
    quality = 62
    cover(src, dest, size, quality)
    while os.path.getsize(dest) > limit and quality > 24:
        quality -= 4
        cover(src, dest, size, quality)
    return os.path.getsize(dest), quality


services = [
    ("img/blog/big-changes-to-australia-temporary-skilled-migration.webp", "skilled"),
    ("img/blog/Australian-Citizen-or-Permanent-Resident-for-Family-Member-Bansal-Immigration-1.webp", "partner"),
    ("img/blog/work-restrictions-Post-Study-1080x675.webp", "student"),
    ("img/employer-sponosred-hero.webp", "employer"),
    ("img/Ausse-flags-hero.webp", "visitor"),
    ("img/appointment-hero.webp", "skills"),
    ("img/evidence-of-citizenship-hero.webp", "citizenship"),
    ("img/homepage.webp", "appeals"),
]
os.makedirs(os.path.join(ROOT, "img", "services"), exist_ok=True)
for src, name in services:
    dest = os.path.join(ROOT, "img", "services", f"{name}-640.webp")
    size, quality = under(os.path.join(ROOT, src), dest, (640, 400), 40 * 1024)
    print(f"service {name}: {size} bytes q={quality}")

os.makedirs(os.path.join(ROOT, "img", "offices"), exist_ok=True)
office_src = os.path.join(ROOT, "img", "team", "team-bansal-1280.jpg")
office_dest = os.path.join(ROOT, "img", "offices", "melbourne-office.webp")
print("melbourne", under(office_src, office_dest, (1200, 800), 180 * 1024))

os.makedirs(os.path.join(ROOT, "img", "og"), exist_ok=True)
canvas = Image.new("RGB", (1200, 630), "#172554")
logo = Image.open(os.path.join(ROOT, "img", "logo.png")).convert("RGBA")
logo.thumbnail((520, 200), Image.Resampling.LANCZOS)
plate = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
plate.paste(logo, ((1200 - logo.width) // 2, 120), logo)
canvas.paste(Image.alpha_composite(canvas.convert("RGBA"), plate).convert("RGB"))
draw = ImageDraw.Draw(canvas)
title = ImageFont.truetype(FONT_BOLD, 42)
sub = ImageFont.truetype(FONT, 28)
line = "Registered migration agents"
line2 = "in Melbourne and Adelaide"
draw.text(((1200 - draw.textlength(line, font=title)) / 2, 390), line, font=title, fill="white")
draw.text(((1200 - draw.textlength(line2, font=sub)) / 2, 450), line2, font=sub, fill="#dbeafe")
og = os.path.join(ROOT, "img", "og", "home-1200x630.jpg")
canvas.save(og, "JPEG", quality=82, optimize=True)
print("og", canvas.size, os.path.getsize(og))

page = Image.new("RGB", (1240, 1754), "white")
draw = ImageDraw.Draw(page)
logo_pdf = Image.open(os.path.join(ROOT, "img", "logo.png")).convert("RGBA")
logo_pdf.thumbnail((360, 140), Image.Resampling.LANCZOS)
page.paste(logo_pdf, (80, 70), logo_pdf)
h = ImageFont.truetype(FONT_BOLD, 36)
body = ImageFont.truetype(FONT, 22)
small = ImageFont.truetype(FONT, 16)
draw.text((80, 250), "What to bring to your appointment", font=h, fill="#172554")
draw.text((80, 310), "Bansal Immigration  |  Melbourne and Adelaide", font=body, fill="#1e3a8a")
items = [
    "Passport (current and any old passports you still have)",
    "Current visa grant and the visa you hold now",
    "Any refusal, cancellation or request letter, with the date",
    "Qualifications, transcripts and skills assessment, if you have them",
    "Work history: employer names, dates and duties",
    "English test result, if you have one",
    "A list of questions you want answered",
]
y = 390
for item in items:
    draw.ellipse((86, y + 6, 106, y + 26), fill="#1d4ed8")
    draw.text((124, y), item, font=body, fill="#1e293b")
    y += 64
draw.text((80, 920), "If something is missing, book anyway. We will tell you what to gather.", font=body, fill="#334155")
draw.text((80, 1000), "Monday to Friday, 9:30 am to 6:00 pm.", font=small, fill="#475569")
draw.text((80, 1032), "Melbourne  +61 3 9602 1330     Adelaide  +61 8 8317 1340", font=small, fill="#475569")
draw.text((80, 1080), "This checklist is general information. It is not personal visa advice.", font=small, fill="#64748b")
pdf = os.path.join(ROOT, "appointment-checklist.pdf")
page.save(pdf, "PDF", resolution=150)
print("pdf", os.path.getsize(pdf))
