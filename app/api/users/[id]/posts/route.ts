import Quote from "@models/quote";
import { connectToDB } from "@utils/database";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const quotes = await Quote.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(quotes), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all quotes", {
      status: 500,
    });
  }
}
