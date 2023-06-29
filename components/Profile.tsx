import { Quote } from "@types";
import QuoteCard from "./QuoteCard";
import { useEffect, useState } from "react";

interface ProfileType {
  name: string;
  desc: string;
  data: Quote[];
  handleEdit?: (quote: Quote) => void;
  handleDelete?: (quote: Quote) => void;
}

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileType) => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<any>(null);
  const [searchedResults, setSearchedResults] = useState(data);

  useEffect(() => {
    setSearchedResults(data);
  }, [data]);

  const filterQuotes = (searchText: string) => {
    const regex = new RegExp(searchText, "i");
    return data.filter(
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
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}</span> Profile
      </h1>
      <p className="desc text-left">{desc}</p>
      <form className="relative  w-8/12 sm:w-6/12 mt-4">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <div className="mt-2 quote_layout">
        {searchedResults.map((quote: Quote) => (
          <QuoteCard
            key={quote._id}
            quote={quote}
            handleEdit={() => handleEdit?.(quote)}
            handleDelete={() => handleDelete?.(quote)}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
