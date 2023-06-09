"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";
import axios from "axios";
import { Quote } from "@types";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [quotes, setQuotes] = useState([]);

  const handleEdit = (quote: Quote) => {
    router.push(`update-quote?id=${quote._id}`);
  };

  const handleDelete = async (quote: Quote) => {
    const hasConfirmed = confirm("Are you sure you want to delete this quote?");

    if (hasConfirmed) {
      try {
        await axios.delete(`/api/quote/${quote._id?.toString()}`);

        const filteredQuotes = quotes.filter((q: Quote) => q._id !== quote._id);
        setQuotes(filteredQuotes);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchQuotes = async () => {
    if (!session?.user?.id) return;
    const response = await axios.get(`/api/users/${session?.user.id}/posts`);
    setQuotes(response.data);
  };

  useEffect(() => {
    fetchQuotes();
  }, [session]);
  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={quotes}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
