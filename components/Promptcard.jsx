"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Promptcard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setcopied] = useState("");
  const router = useRouter();
  const handleCopy = () => {
    setcopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setcopied("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex flex-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3  cursor-pointer">
          <Image
            src={post.creator?.image || "/assets/images/logo.svg"} // Fallback if image missing
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator?.username || "Unknown User"}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator?.email || "No Email"}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="image"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm text_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default Promptcard;
