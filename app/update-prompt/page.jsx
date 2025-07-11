"use client";
import { useState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();

  const SearchParams = useSearchParams();
  const PromptId = SearchParams.get("id");
  const [submitting, setsubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`api/prompts/${PromptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (PromptId) getPromptDetails();
  }, [PromptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    if (!PromptId) return alert("Prompt Id not found");

    try {
      const response = await fetch(`/api/prompts/${PromptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setsubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
