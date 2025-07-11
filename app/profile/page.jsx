"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

import React from "react";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [MyPost, setMyPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPost(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompts/${post._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to delete prompt");
        }
        // 1. Optimistic update (instant UI change)
        const filteredPosts = MyPost.filter((p) => p._id !== post._id);
        setMyPost(filteredPosts);

        // 2. Silent background refresh (ensure consistency)
        try {
          const refreshResponse = await fetch(
            `/api/users/${session.user.id}/posts`
          );
          const newData = await refreshResponse.json();
          setMyPost(newData); // Only updates if different
        } catch (error) {
          console.error("Background refresh failed (non-critical)", error);
        }

        alert("Prompt deleted successfully");
      } catch (error) {
        console.error("Delete error:", error);
        alert(error.message);
      }
    }
  };

  return (
    <div>
      <Profile
        data={MyPost}
        name="My"
        desc="Welcome to your personalized profile page"
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
