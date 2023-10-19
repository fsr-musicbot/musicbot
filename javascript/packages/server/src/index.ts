import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();
app.get("/", (c) => c.text("Hello Hono!"));

serve(app);

console.log("Server running at http://localhost:3000");
