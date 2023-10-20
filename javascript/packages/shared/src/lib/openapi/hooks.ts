import { ZodiosHooks } from "@zodios/react";
import { createApiClient } from "./generated";

const apiClient = createApiClient("http://localhost:8000/", {});

export const apiHooks = new ZodiosHooks("openAPIHooks", apiClient);
