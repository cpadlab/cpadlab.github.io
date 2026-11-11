import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const config: NextConfig = {
    ...(!isDev && { output: "export" }),
    reactCompiler: true,
    experimental: {
      optimizePackageImports: ["lucide-react", "@base-ui/react"],
    },
    images: {
      unoptimized: true,
      formats: ["image/avif", "image/webp"],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      imageSizes: [16, 32, 48, 64, 96, 128, 256],
      minimumCacheTTL: 31536000,
    },
    compress: true,
    poweredByHeader: false,
    compiler: {
      removeConsole:
        process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
    },
    turbopack: {
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "X-Frame-Options",
              value: "DENY",
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
            {
              key: "Permissions-Policy",
              value: "camera=(), microphone=(), geolocation=()",
            },
          ],
        },
        {
          source: "/(fonts|images)/(.*)",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
          ],
        },
      ];
    },
  };

  return withNextIntl(config);
};
