import { Quote } from "@types";
import QuoteCard from "./QuoteCard";

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
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}</span> Profile
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((quote: Quote) => (
          <QuoteCard
            key={quote._id}
            quote={quote}
            handleEdit={() => handleEdit?.(quote)}
            handleDelete={() => handleDelete?.(quote)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
