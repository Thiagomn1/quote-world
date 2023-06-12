"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import axios from "axios";

const CreateQuote = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [quote, setQuote] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagChange = (event: React.KeyboardEvent) => {
    if (event.key === " ") {
      event.preventDefault();
    }

    if (event.key === "Enter" && tagInput !== "") {
      event.preventDefault();
      let tag = tagInput;
      if (!tagInput.startsWith("#")) {
        tag = `#${tagInput}`;
      }
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  const handleTagDelete = (tagToRemove: string) => {
    setTags((tags) => {
      return tags.filter((tag) => tag !== tagToRemove);
    });
  };

  const createQuote = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const bodyRequest = {
        quote,
        userId: session?.user.id,
        tags: JSON.stringify(tags),
      };

      const response = await axios.post("/api/quote/new", {
        method: "POST",
        body: JSON.stringify(bodyRequest),
      });

      if (response.data.newQuote) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      quote={quote}
      setQuote={setQuote}
      tags={tags}
      tagInput={tagInput}
      setTagInput={setTagInput}
      submitting={submitting}
      handleSubmit={createQuote}
      handleTagChange={handleTagChange}
      handleTagDelete={handleTagDelete}
    />
  );
};

export default CreateQuote;
