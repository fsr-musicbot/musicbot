import Replicate from "replicate";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("here")
const replicate = new Replicate({
  auth: "r8_ZUeEOlfWu5PdBsNGcXdLZ7wLDnQzPo40OEaYX",
});

console.log(replicate)

const body = await req.json()

const output = await replicate.run(
  "openai/whisper:91ee9c0c3df30478510ff8c8a3a545add1ad0259ad3a9f78fba57fbc05ee64f7",
  {
    input: {
      audio: body
    }
  }
);

// const output = await fetch("https://api.replicate.com/v1/predictions", {
//     method: "POST",
//     headers: {
//       Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       // Pinned to a specific version of Stable Diffusion
//       // See https://replicate.com/stability-ai/sdxl
//       version: "2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2",

//       // This is the text prompt that will be submitted by a form on the frontend
//       input: body,
//     }),
//   });

console.log("output", output)
return new Response(JSON.stringify({ output }), {
  headers: {
    "Content-Type": "application/json",
  },
});
}