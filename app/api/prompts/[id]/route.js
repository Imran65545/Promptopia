import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//Get req
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

//PATCH(update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

//DELETE req

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    console.log(`Attempting to delete prompt: ${params.id}`);

    // Actually delete the document
    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

    if (!deletedPrompt) {
      console.log("Prompt not found");
      return new Response(JSON.stringify({ message: "Prompt not found" }), {
        status: 404,
      });
    }

    console.log("Successfully deleted:", deletedPrompt);
    return new Response(
      JSON.stringify({
        message: "Prompt deleted successfully",
        deletedId: params.id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to delete prompt",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
