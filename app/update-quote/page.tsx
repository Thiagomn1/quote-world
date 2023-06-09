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
  const [post, setPost] = useState({
    quote: "",
    tag: "",
  });

  const updateQuote = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    if (!quoteId) return alert("Quote ID not found");

    try {
      const bodyRequest = {
        quote: post.quote,
        tag: post.tag,
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

    setPost({
      quote: response.data.quote,
      tag: response.data.tag,
    });
  };

  useEffect(() => {
    if (quoteId) getQuoteDetails();
  }, [quoteId]);

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateQuote}
    />
  );
};

export default EditQuote;
