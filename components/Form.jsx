import React from "react";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platforms.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl flex flex-col w-full mt-10 gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-gray-700 text-base">
            Your AI prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-gray-700 text-base">
            Tag {` `}
          </span>
          <span className="font-normal">
            (#product, #webdevelopment, #idea)
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mb-5 mx-3 gap-4">
          <Link href="/" className="text-gray-700 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm rounded-full text-white bg-primary-orange"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
