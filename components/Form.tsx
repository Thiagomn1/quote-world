import React from "react";
import Link from "next/link";
import { Quote } from "@types";

interface FormType {
  type: string;
  quote: string;
  tags: string[];
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
  setQuote: React.Dispatch<React.SetStateAction<string>>;
  submitting: boolean;
  handleSubmit: (event: React.FormEvent) => void;
  handleTagChange: (event: React.KeyboardEvent) => void;
  handleTagDelete: (tagToRemove: string) => void;
}

const Form = ({
  type,
  quote,
  setQuote,
  tags,
  tagInput,
  setTagInput,
  handleTagChange,
  handleTagDelete,
  submitting,
  handleSubmit,
}: FormType) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type}</span> Quote
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
            value={quote}
            onChange={(event) => setQuote(event.target.value)}
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
            value={tagInput}
            disabled={tags.length === 3}
            maxLength={15}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={handleTagChange}
            placeholder="#tag"
            required
            className="form_input"
          />
          {tags.length > 0 && (
            <div>
              <div className="mt-2 flex flex-row">
                {tags.map((tag) => (
                  <p
                    className="bg-slate-200 text-primary-orange rounded-md px-2 py-1 mr-2 "
                    onClick={() => handleTagDelete(tag)}
                    key={tag}
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          )}
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
