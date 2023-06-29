"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import { Quote } from "@types";
import axios from "axios";

const UserProfile = ({ params }: { params: { id: string; name: string } }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState<Quote[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/api/users/${params?.id}/posts`);

      setUserPosts(response.data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName ?? ""}
      desc={`Welcome to ${userName}'s profile page. Explore ${userName}'s exceptional quotes and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
