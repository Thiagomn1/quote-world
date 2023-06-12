import Quote from "@models/quote";
import { connectToDB } from "@utils/database";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const quote = await Quote.findById(params.id);

    if (!quote) {
      return new Response("Quote not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(quote), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all quotes", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const json = await req.json();
  const body = JSON.parse(json.body);
  const { quote, tags } = body;

  try {
    await connectToDB();

    const existingQuote = await Quote.findById(params.id);

    if (!existingQuote) {
      return new Response("Quote not found", {
        status: 404,
      });
    }

    existingQuote.quote = quote;
    existingQuote.tags = tags;
    console.log(existingQuote);

    await existingQuote.save();

    return new Response(JSON.stringify(existingQuote), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update quote", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    await Quote.findByIdAndRemove(params.id);

    return new Response("Quote deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to delete quote", {
      status: 500,
    });
  }
}
