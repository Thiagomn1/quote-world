"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import axios from "axios";
import { data } from "autoprefixer";

const EditQuote = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quoteId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [quote, setQuote] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagChange = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && tagInput !== "") {
      event.preventDefault();
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleTagDelete = (tagToRemove: string) => {
    setTags((tags) => {
      return tags.filter((tag) => tag !== tagToRemove);
    });
  };

  const updateQuote = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    if (!quoteId) return alert("Quote ID not found");

    try {
      const bodyRequest = {
        quote: quote,
        tags: JSON.stringify(tags),
      };

      const response = await axios.patch(`/api/quote/${quoteId}`, {
        method: "POST",
        body: JSON.stringify(bodyRequest),
      });

      if (response.data.quote) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const getQuoteDetails = async () => {
    const response = await axios.get(`/api/quote/${quoteId}`);
    setQuote(response.data.quote);
    setTags(JSON.parse(response.data.tags));
  };

  useEffect(() => {
    if (quoteId) getQuoteDetails();
  }, [quoteId]);

  return (
    <Form
      type="Edit"
      quote={quote}
      setQuote={setQuote}
      tags={tags}
      tagInput={tagInput}
      setTagInput={setTagInput}
      submitting={submitting}
      handleSubmit={updateQuote}
      handleTagChange={handleTagChange}
      handleTagDelete={handleTagDelete}
    />
  );
};

export default EditQuote;
