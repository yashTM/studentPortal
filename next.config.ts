import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Old Student Portal routes that were merged or renamed.
  async redirects() {
    return [
      { source: "/student/credentials", destination: "/student/documents#credentials", permanent: false },
      { source: "/student/academic-plan", destination: "/student/calendar#registered", permanent: false },
      { source: "/student/fees", destination: "/student/fees/ledger", permanent: false },
      { source: "/student/timetable", destination: "/student/calendar#timetable", permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
