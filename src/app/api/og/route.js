import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const secondaryHeading = searchParams.get("heading");
  const KALIBRE_FULL_NAME =
    "https://res.cloudinary.com/kalibre-ai/image/upload/v1715771480/icons/kalibre_logo_k41tiq.svg";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          gap: "2px",
          flexDirection: "column",
          background:
            "linear-gradient(117deg, #FFECE2 -14.36%, #E7F4FF 52.04%, #F0CBF9 119.72%)",
          padding: "25px",
        }}
      >
        <img src={KALIBRE_FULL_NAME} alt="logo" width="100px" />
        <div
          style={{
            marginTop: "10px",
            fontSize: "70px",
            fontWeight: 500,
            color: "#1D1D1D",
            textWrap: "warap",
            textShadow: "-2.312px 4.623px 9.593px rgba(0, 0, 0, 0.25)",
          }}
        >
          {secondaryHeading}
        </div>
      </div>
    ),
    {
      width: 800,
      height: 555,
    }
  );
}
