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
  const [searchTimeout, setSearchTimeout] = useState<any>(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    const response = await axios.get("/api/quote");
    setQuotes(response.data);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const filterQuotes = (searchText: string) => {
    const regex = new RegExp(searchText, "i");
    return quotes.filter(
      (item: Quote) =>
        regex.test(item.creator?.username ?? "") ||
        regex.test(item.tags) ||
        regex.test(item.quote)
    );
  };

  const handleSearchChange = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    clearTimeout(searchTimeout);
    setSearchText(target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterQuotes(target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterQuotes(tagName);
    setSearchedResults(searchResult);
  };

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
      {searchText ? (
        <QuoteCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <QuoteCardList data={quotes} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
