import React from "react";
import Link from "next/link";
import { Quote } from "@types";

interface FormType {
  type: string;
  post: Quote;
  setPost: React.Dispatch<React.SetStateAction<Quote>>;
  submitting: boolean;
  handleSubmit: (event: React.FormEvent) => void;
}

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormType) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type}</span> Post
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing quotes with the world
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Quote
          </span>
          <textarea
            value={post.quote}
            onChange={(event) =>
              setPost({ ...post, quote: event.target.value })
            }
            placeholder="Write your quote here..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags
          </span>
          <input
            value={post.tag}
            onChange={(event) => setPost({ ...post, tag: event.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-grat-500 text-sm">
            Cancel
          </Link>

          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            type="submit"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
