import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "etimg.etb2bimg.com" },
      { protocol: "https", hostname: "emaaesthetics.com" },
      { protocol: "https", hostname: "www.btlnet.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "exosome-rna.com" },
      { protocol: "https", hostname: "endlessbeauty.clinic" },
      { protocol: "https", hostname: "bodybybtl.com" },
      { protocol: "https", hostname: "www.wohmedical.tw" },
      { protocol: "https", hostname: "shop.inbodyusa.com" },
      { protocol: "https", hostname: "www.btlnet.co.in" },
      { protocol: "https", hostname: "blogger.googleusercontent.com" },
      { protocol: "https", hostname: "laboderm-skin.com" },
      { protocol: "https", hostname: "assets.cntraveller.in" },
      { protocol: "https", hostname: "media.istockphoto.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "buyhbot.com.au" },
      { protocol: "https", hostname: "www.hpotech.com" },
      { protocol: "https", hostname: "www.mecotec.net" },
      { protocol: "https", hostname: "btlmed.ru" },
      { protocol: "https", hostname: "www.btlmedical.com.hk" },
      { protocol: "https", hostname: "images.ctfassets.net" },
      { protocol: "https", hostname: "www.silverfoxamerica.com" },
      { protocol: "https", hostname: "www.teleamedical.com" },
      { protocol: "https", hostname: "www.canfieldsci.com" },
      { protocol: "https", hostname: "storzmedical.co.jp" },
      { protocol: "https", hostname: "www.unitree.com" },
      { protocol: "https", hostname: "ammortal.com" },
      { protocol: "https", hostname: "www.seca.com" },
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "www.theicebath.co" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "www.brainsway.com" },
      { protocol: "https", hostname: "alterg.com" },
      { protocol: "https", hostname: "www.seca-store.com" },
      { protocol: "https", hostname: "mb.cision.com" },
      { protocol: "https", hostname: "www.esaote.com" },
      { protocol: "https", hostname: "csmisolutions.com" },
    ],
  },
};

export default nextConfig;
