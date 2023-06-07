import Quote from "@models/quote";
import { connectToDB } from "@utils/database";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const quotes = await Quote.find({}).populate("creator");

    return new Response(JSON.stringify(quotes), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all quotes", {
      status: 500,
    });
  }
}
