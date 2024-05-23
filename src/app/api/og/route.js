import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        👋 Hello Image is creating...
      </div>
    ),
    {
      width: 800,
      height: 555,
    }
  );
}
