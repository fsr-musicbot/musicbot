import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));

app.post("/test", zValidator("json", z.object({ name: z.string() })), (c) => {
  console.log(c.body);
  const data = c.req.valid("json");
  return c.json({ name: data.name });
});

serve(app);

console.log("Server running at http://localhost:3000");
