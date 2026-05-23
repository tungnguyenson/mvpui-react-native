import type { NextConfig } from "next"

const imageHost = process.env.IMAGE_HOST

const config: NextConfig = {
  images: {
    remotePatterns: imageHost
      ? [
          {
            protocol: new URL(imageHost).protocol.replace(":", "") as "https" | "http",
            hostname: new URL(imageHost).hostname,
            pathname: "/**",
          },
        ]
      : [],
  },
}

export default config
