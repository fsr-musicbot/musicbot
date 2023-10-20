import { ZodiosHooks } from "@zodios/react";
import { createApiClient } from "./generated";

const apiClient = createApiClient("http://localhost:8000/", {});

export const apiHooks = new ZodiosHooks("openAPIHooks", apiClient);

// note: wrap your <App/> in a queryClient provider like so:
// javascript/packages/client-music-gen/src/routes/root.tsx
// learn more: https://github.com/ecyrbe/zodios-react
