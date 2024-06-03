import { ImageResponse } from "@vercel/og";
export const runtime = "edge";
export const contentType = "image/jpg";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const size = {
    width: 1200,
    height: 630,
  };

  const secondaryHeading = searchParams.get("heading");
  const primaryHeading = searchParams.get("subHeading");
  const description = searchParams.get("description");
  const waterMarkImage = searchParams.get("bgImage");
  const cmpLogo = searchParams.get("cmp_logo");

  console.log("cmp logo ===", cmpLogo);

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

  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          // background: "linear-gradient(117deg, #FFECE2 -14.36%, #E7F4FF 52.04%, #F0CBF9 119.72%)",
          backgroundImage:
            "linear-gradient(135deg,#f9f5f3,#f3f6f9 51%,#f8f3f9)",
          padding: "80px 50px",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            marginTop: "20px",
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
              <h1
                style={{
                  color: "#3478F6",
                  fontWeight: 500,
                  fontSize: "2.5rem",
                }}
              >
                {secondaryHeading}
              </h1>
            )}

            {(cmpLogo || primaryHeading) && (
              <div
                style={{
                  display: "flex",
                  gap: "30px",
                  alignItems: "center",
                }}
              >
                {cmpLogo && (
                  <div style={{ display: "flex" }}>
                    <img
                      src={cmpLogo}
                      alt="logo"
                      style={{
                        width: "65px",
                        height: "65px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                )}

                {primaryHeading && (
                  <div
                    style={{
                      fontSize: "5rem",
                      fontWeight: 600,
                      color: "#222222",
                      textWrap: "warap",
                      textShadow: "-3px 4px 5px #C4C4C4",
                      lineHeight: "5rem",
                      fontFamily: "samibold",
                      // marginTop: "5px",
                    }}
                    // tw="text-6xl font-black"
                  >
                    {primaryHeading}
                  </div>
                )}
              </div>
            )}

            {description && (
              <p
                style={{
                  fontSize: "2rem",
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
                width="230px"
                style={{
                  opacity: "0.13",
                }}
              />

              <img
                src={KALIBRE_FULL_NAME}
                alt="logo"
                width="100px"
                style={{ margin: "180px 0px 0px 130px" }}
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

  // Convert the image response to a buffer
  const imageBuffer = await imageResponse.arrayBuffer();

  // Encode the buffer to a base64 string
  const base64Image = Buffer.from(imageBuffer).toString("base64");

  // const url = "http://192.168.0.118:3000/api/convertPngToJpg";

  const url = "https://ogimage-creation.vercel.app/api/convertPngToJpg";

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: `data:image/png;base64,${base64Image}` }),
  });

  const result = await response.json();

  // Return the image as a JSON response
  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });

  // return imageResponse;
}

export async function OPTIONS(request) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  return new Response(null, {
    status: 204,
    headers: headers,
  });
}
