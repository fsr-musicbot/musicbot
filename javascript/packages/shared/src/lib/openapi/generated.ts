import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const MusicGenRequestBody = z
  .object({
    file_path: z.string(),
    start_time: z.number(),
    end_time: z.number(),
  })
  .passthrough();
const ValidationError = z
  .object({
    loc: z.array(z.union([z.string(), z.number()])),
    msg: z.string(),
    type: z.string(),
  })
  .passthrough();
const HTTPValidationError = z
  .object({ detail: z.array(ValidationError) })
  .partial()
  .passthrough();

export const schemas = {
  MusicGenRequestBody,
  ValidationError,
  HTTPValidationError,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/",
    alias: "read_root__get",
    requestFormat: "json",
    response: z.unknown(),
  },
  {
    method: "post",
    path: "/musicgen",
    alias: "generate_music_musicgen_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: MusicGenRequestBody,
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
