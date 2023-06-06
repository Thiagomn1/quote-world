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
  const [post, setPost] = useState({
    quote: "",
    tag: "",
  });

  const createQuote = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const bodyRequest = {
        quote: post.quote,
        userId: session?.user.id,
        tag: post.tag,
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
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createQuote}
    />
  );
};

export default CreateQuote;
