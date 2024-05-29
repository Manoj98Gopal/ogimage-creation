import sharp from "sharp"; // Import Sharp library

export async function POST(request) {
  // Check for POST request method
  if (!request.method === "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // Access the request body
    const data = await request.json();

    const { image } = data; // Assuming 'image' key holds the base64 PNG data

    // Check if the data starts with the base64 PNG header
    if (!image.startsWith("data:image/png;base64,")) {
      return new Response("Invalid image format (expected PNG)", {
        status: 400,
      });
    }

    // Split the base64 data from the header
    const base64Data = image.split(",")[1];

    // Decode the base64 string
    const buffer = Buffer.from(base64Data, "base64");

    // Convert PNG to JPEG with Sharp
    const jpegBuffer = await sharp(buffer)
      .jpeg({ quality: 80 }) // Adjust quality as needed (0-100)
      .toBuffer();

    // Convert the JPEG buffer back to base64 string
    const base64Jpeg = jpegBuffer.toString("base64");

    // Construct the new base64 JPEG data URI
    const responseImage = `data:image/jpeg;base64,${base64Jpeg}`;

    // Return the converted base64 JPEG data
    return new Response(JSON.stringify({ image: responseImage }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
