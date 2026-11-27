import { ImageResponse } from "next/og";

export const alt = "Fredrick Kimutai — Junior Network Engineer, Dublin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#111111",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, color: "#9ca3af", letterSpacing: 2 }}>KIMTAI.NET</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24 }}>Fredrick Kimutai</div>
        <div style={{ fontSize: 44, marginTop: 12 }}>Junior Network Engineer · Dublin</div>
        <div style={{ fontSize: 30, color: "#9ca3af", marginTop: 40 }}>
          Cisco · MikroTik · VLANs · OSPF · Proxmox · LibreNMS · CCNA labs
        </div>
      </div>
    ),
    size
  );
}
