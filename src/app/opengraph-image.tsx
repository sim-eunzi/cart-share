import { ImageResponse } from "next/og";

export const alt = "왓츠인마이카트 — 쇼핑몰 장바구니를 카드로 만들어 친구에게 공유하세요";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const HEART = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='173' viewBox='0 0 22 19'>
    <rect x='3' y='0' width='6' height='3' fill='#ff6fa5'/>
    <rect x='13' y='0' width='6' height='3' fill='#ff6fa5'/>
    <rect x='0' y='3' width='22' height='6' fill='#ff6fa5'/>
    <rect x='3' y='9' width='16' height='3' fill='#ff6fa5'/>
    <rect x='6' y='12' width='10' height='3' fill='#ff6fa5'/>
    <rect x='9' y='15' width='4' height='3' fill='#ff6fa5'/>
    <rect x='3' y='3' width='3' height='3' fill='#fff'/>
  </svg>`,
)}`;

/** 링크 공유 미리보기용 OG 이미지 (핑크 픽셀 키치, 레트로 창) */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fce4ec",
          padding: 48,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: "10px solid #7a1f3d",
            boxShadow: "16px 16px 0 #7a1f3d",
            backgroundColor: "#ffffff",
          }}
        >
          {/* 레트로 타이틀바 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ff6fa5",
              borderBottom: "8px solid #7a1f3d",
              padding: "18px 28px",
            }}
          >
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 28, height: 28, backgroundColor: "#fce4ec", border: "4px solid #7a1f3d" }} />
              <div style={{ width: 28, height: 28, backgroundColor: "#fce4ec", border: "4px solid #7a1f3d" }} />
              <div style={{ width: 28, height: 28, backgroundColor: "#fce4ec", border: "4px solid #7a1f3d" }} />
            </div>
            <div style={{ marginLeft: 24, color: "#ffffff", fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>
              WHAT&apos;S IN MY CART?
            </div>
          </div>

          {/* 본문 */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
            }}
          >
            <img src={HEART} width={180} height={156} alt="" style={{ marginBottom: 24 }} />
            <div style={{ fontSize: 88, fontWeight: 800, color: "#ff3d6e", lineHeight: 1.05, textAlign: "center" }}>
              WHAT&apos;S IN MY CART?
            </div>
            <div style={{ fontSize: 34, fontWeight: 600, color: "#7a1f3d", marginTop: 28, textAlign: "center" }}>
              Paste a link → get a cute card → share it ♥
            </div>
          </div>

          {/* 하단 픽셀 바닥 */}
          <div style={{ height: 28, backgroundColor: "#ff3d6e", borderTop: "8px solid #7a1f3d" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
