import { ImageResponse } from "@vercel/og";
export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const size = {
    width: 800,
    height: 558,
  };

  const secondaryHeading = searchParams.get("heading");
  const primaryHeading = searchParams.get("subHeading");
  const description = searchParams.get("description");
  const waterMarkImage = searchParams.get("bgImage");

  const samiBold = await fetch(
    new URL("../../../../assets/FamiljenGrotesk-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const fontMedium = await fetch(
    new URL("../../../../assets/Inter-Medium .otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  // const samiBold = await b;
  // const fontMedium = await m;

  const KALIBRE_FULL_NAME =
    "https://res.cloudinary.com/kalibre-ai/image/upload/v1715771480/icons/kalibre_logo_k41tiq.svg";

  const Arrow_Icon =
    "https://res.cloudinary.com/kalibre-ai/image/upload/v1716619650/icons/Arrow_03_e0di3w.svg";

  const response = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          // backgroundImage: "linear-gradient(117deg, #FFECE2 -14.36%, #E7F4FF 52.04%, #F0CBF9 119.72%)",
          backgroundImage:
            "linear-gradient(135deg, #fef5f1, #f0f8ff 48%, #faedfd)",
          padding: "30px 35px",
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
              flex: "0 1 65%",
              fontFamily: "meduim",
              // gap: "5px",
            }}
          >
            {secondaryHeading && (
              <h1 style={{ color: "#669AFB", fontWeight: 500 }}>
                {secondaryHeading}
              </h1>
            )}

            {primaryHeading && (
              <div
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 600,
                  color: "#222222",
                  textWrap: "warap",
                  textShadow: "-3px 4px 5px #C4C4C4",
                  lineHeight: "3.6rem",
                  fontFamily: "samibold",
                  marginTop: "5px",
                }}
                // tw="text-6xl font-black"
              >
                {primaryHeading}
              </div>
            )}

            {description && (
              <p
                style={{
                  fontSize: "1.3rem",
                  color: "#717171",
                  fontWeight: 400,
                  lineHeight: "1.7",
                  fontFamily: "meduim",
                  marginTop: "35px",
                }}
              >
                {description}
              </p>
            )}
          </div>

          {waterMarkImage && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "60px",
              }}
            >
              <img
                src={waterMarkImage}
                alt="logo"
                width="180px"
                style={{
                  opacity: "0.13",
                }}
              />
              <img
                src={Arrow_Icon}
                alt="logo"
                width="120px"
                style={{
                  opacity: "0.07",
                  marginTop: "40px",
                }}
              />
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "samibold",
          data: samiBold,
          style: "normal",
        },
        {
          name: "meduim",
          data: fontMedium,
          style: "normal",
        },
      ],
    }
  );

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}
