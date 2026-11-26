import { createRequire } from "module";

const require = createRequire(import.meta.url);
const legacyRedirects = require("./lib/legacy-redirects.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  async redirects() {
    const list = [
      {
        source: "/:path*",
        destination: "https://www.bansalimmigration.com.au/:path*",
        permanent: true,
        has: [{ type: "host", value: "bansalimmigration.com.au" }],
      },
    ];
    const seen = new Set(["/:path*"]);

    for (const [from, to] of Object.entries(legacyRedirects)) {
      if (from && to && from !== to) {
        const cleanFrom = from.endsWith("/") && from !== "/" ? from.slice(0, -1) : from;
        if (!seen.has(cleanFrom)) {
          seen.add(cleanFrom);
          list.push({
            source: cleanFrom,
            destination: to,
            permanent: true,
          });
        }
      }
    }

    const customRedirects = [
      { source: "/parent-visas", destination: "/family-visa", permanent: true },
      {
        source: "/family-visa/new-zealand-citizen-family-relationship-461",
        destination: "/family-visa/new-zealand-citizen-family-relationship-visa-subclass-461",
        permanent: true,
      },
      {
        source: "/family-visa/orphan-reletive-visa-117",
        destination: "/family-visa/orphan-relative-visa-117",
        permanent: true,
      },
      {
        source: "/employer-sponsored/global-talent-employer-sponsored-gtes",
        destination: "/employer-sponsored/gtes",
        permanent: true,
      },
      { source: "/our-team", destination: "/team", permanent: true },
      { source: "/people", destination: "/team", permanent: true },
      { source: "/staff", destination: "/team", permanent: true },
      { source: "/pr-calculator", destination: "/migrate-to-australia/pr-point-calculator", permanent: true },
      { source: "/points-for-pr-australia", destination: "/migrate-to-australia/pr-point-calculator", permanent: true },
      { source: "/migrate-to-australia/post-study-work-visa-subclass-485", destination: "/migrate-to-australia/temporary-graduate-visa-subclass-485", permanent: true },
      { source: "/migrate-to-australia/distinguished-talent-visa-858", destination: "/migrate-to-australia/national-innovation-visa-858", permanent: true },
      { source: "/migrate-to-australia/distinguished-talent-visa-124", destination: "/migrate-to-australia/national-innovation-visa-858", permanent: true },
      { source: "/migrate-to-australia/global-talent-independent-program-gti", destination: "/migrate-to-australia/national-innovation-visa-858", permanent: true },
      { source: "/skilled-migration", destination: "/migrate-to-australia", permanent: true },
      { source: "/migrate-to-australia/migration", destination: "/migrate-to-australia", permanent: true },
      { source: "/study-australia/student-visa-information", destination: "/study-australia/student-visa-subclass-500", permanent: true },
      { source: "/study-australia/student-visa-journey", destination: "/study-australia/student-visa-subclass-500", permanent: true },
      { source: "/blogs/test-title", destination: "/blogs", permanent: true },
      { source: "/team/vijay-patel", destination: "/team", permanent: true },
      { source: "/student-visa-financial-calculator", destination: "/study-australia/student-visa-financial-calculator", permanent: true },
      { source: "/apply-afp-ipc-form", destination: "/afp-national-police-check", permanent: true },
      { source: "/ea-skill-assessment", destination: "/skill-assessment/ea-skill-assessment", permanent: true },
      { source: "/vetassess-skill-assessment", destination: "/skill-assessment/vetassess-skill-assessment", permanent: true },
      { source: "/citizenship-by-descent", destination: "/citizenship/citizenship-by-descent", permanent: true },
      { source: "/can-taxi-drivers-get-pr-australia-dama", destination: "/", permanent: true },
      { source: "/thank-you", destination: "/", permanent: true },
      { source: "/mission-vision", destination: "/about#standards", permanent: true },
      { source: "/why-choose-us", destination: "/about", permanent: true },
      { source: "/why-choose", destination: "/about", permanent: true },
    ];

    for (const item of customRedirects) {
      if (!seen.has(item.source)) {
        seen.add(item.source);
        list.push(item);
      }
    }

    return list;
  },
  async headers() {
    if (process.env.NEXT_PUBLIC_SITE_ENV === "production") return [];

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: "http://127.0.0.1:8000/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
