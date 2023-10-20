import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { $ } from "zx";

const app = new Hono();

app.get("/", (c) => c.text("Hello world!"));

app.post(
  "/musicgen",
  zValidator(
    "json",
    z.object({
      audioFilePath: z.string(),
      startTime: z.number(),
      endTime: z.number(),
    })
  ),
  async (c) => {
    console.log(c.body);
    const data = c.req.valid("json");

    // extract the region of the audio to a temp file
    await $`ffmpeg -y -i ${data.audioFilePath} -ss ${data.startTime} -to ${data.endTime} tmp.mp3`;

    // send it to music gen
    return c.json({ success: true });
  }
);

serve(app);

console.log("Server running at http://localhost:3000");
