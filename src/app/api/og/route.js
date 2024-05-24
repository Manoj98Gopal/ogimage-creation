import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const secondaryHeading = searchParams.get("heading");
  const primaryHeading = searchParams.get("subHeading");
  const description = searchParams.get("description");
  const waterMarkImage = searchParams.get("bgImage");

  const KALIBRE_FULL_NAME =
    "https://res.cloudinary.com/kalibre-ai/image/upload/v1715771480/icons/kalibre_logo_k41tiq.svg";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          // background: "linear-gradient(117deg, #FFECE2 -14.36%, #E7F4FF 52.04%, #F0CBF9 119.72%)",
          backgroundImage:
            "linear-gradient(135deg,#f9f5f3,#f3f6f9 51%,#f8f3f9)",
          padding: "30px 30px",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex" }}>
          <img src={KALIBRE_FULL_NAME} alt="logo" width="130px" />
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "0 1 70%",
            }}
          >
            {secondaryHeading && (
              <h1 style={{ color: "#3478F6", fontWeight: 500 }}>
                {secondaryHeading}
              </h1>
            )}

            {primaryHeading && (
              <h1
                style={{
                  marginTop: "10px",
                  fontSize: "3.5rem",
                  fontWeight: 700,
                  color: "#1D1D1D",
                  textWrap: "warap",
                  textShadow: "-3px 4px 5px #C4C4C4",
                  lineHeight: "4rem",
                }}
              >
                {primaryHeading}
              </h1>
            )}

            {description && (
              <p
                style={{
                  fontSize: "1rem",
                  color: "#1D1D1D",
                  fontWeight: 400,
                  lineHeight: "1.5",
                }}
              >
                {description}
              </p>
            )}
          </div>

          {waterMarkImage && (
            <div style={{ display: "flex" }}>
              <img
                src={waterMarkImage}
                alt="logo"
                width="180px"
                style={{
                  opacity: "0.1",
                }}
              />
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 800,
      height: 558,
    }
  );
}
