import { Schema, model, models } from "mongoose";

const quoteSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  quote: {
    type: String,
    required: [true, "Quote is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Quote = models.Quote || model("Quote", quoteSchema);

export default Quote;
