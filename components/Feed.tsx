"use client";

import React, { useEffect, useState } from "react";
import QuoteCard from "./QuoteCard";
import axios from "axios";
import { Quote } from "@types";

const QuoteCardList = ({
  data,
  handleTagClick,
}: {
  data: Quote[];
  handleTagClick: (tag: string) => void;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((quote: Quote) => (
        <QuoteCard
          key={quote._id}
          quote={quote}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [quotes, setQuotes] = useState([]);

  const handleSearchChange = (event: React.FormEvent) => {};

  const fetchQuotes = async () => {
    const response = await axios.get("/api/quote");
    setQuotes(response.data);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      <QuoteCardList data={quotes} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
