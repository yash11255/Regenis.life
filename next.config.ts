import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "etimg.etb2bimg.com" },
      { protocol: "https", hostname: "emaaesthetics.com" },
      { protocol: "https", hostname: "www.btlnet.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "exosome-rna.com" },
      { protocol: "https", hostname: "endlessbeauty.clinic" },
      { protocol: "https", hostname: "bodybybtl.com" },
      { protocol: "https", hostname: "www.btlnet.co.in" },
      { protocol: "https", hostname: "blogger.googleusercontent.com" },
      { protocol: "https", hostname: "laboderm-skin.com" },
      { protocol: "https", hostname: "assets.cntraveller.in" },
      { protocol: "https", hostname: "media.istockphoto.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "buyhbot.com.au" },
      { protocol: "https", hostname: "www.hpotech.com" },
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "www.theicebath.co" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
