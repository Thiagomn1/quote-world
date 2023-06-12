import Quote from "@models/quote";
import { connectToDB } from "@utils/database";

export async function POST(req: Request) {
  const json = await req.json();
  const body = JSON.parse(json.body);
  const { quote, tags, userId } = body;

  try {
    await connectToDB();
    const newQuote = new Quote({ creator: userId, quote, tags });

    await newQuote.save();

    return new Response(
      JSON.stringify({
        newQuote,
      }),
      {
        status: 201,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(`Failed to create new quote: ${error}`, {
      status: 500,
    });
  }
}
