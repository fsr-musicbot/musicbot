# JavaScript

- [JavaScript](#javascript)
  - [Summary](#summary)
  - [Code sharing](#code-sharing)
  - [Packages](#packages)
  - [Installing new dependencies](#installing-new-dependencies)
  - [Client-server communication with OpenAPI](#client-server-communication-with-openapi)

## Summary

- This is a simple pnpm workspace setup
- Each app/packages goes inside `packages` directory

## Code sharing

- Packages can share code with each other.
  - Example: Shared code is inside `packages/shared`, which has the name `@musicbot/shared`
  - So my package `package/client-music-gen` can import it. In `package/client-music-gen/package.json`, it is imported like `@musicbot/shared: workspace:*`
  - After saving the `package.json`, run `pnpm install` to install the shared package

## Packages

- Clients
  - `app-ui`: NextJS app with Dropzone / drag drop
  - `client-music-gen`: Vite app with waveform display
- `shared`: has some shared code, like a shared button component

## Installing new dependencies

- Go to the package you want to install a dependency to e.g. `cd javascript/packages/app-ui`
- `pnpm i <name of your dependency>`

## Client-server communication with OpenAPI

- The python server is defined in `python/server`. You can read more about it in [python/README.md](../python/README.md).
- The server conforms to an OpenAPI specification.
- When you `cd python && make server`, it will start the server and output the `python/server/openapi.json` file.
- We can generate a TypeScript library to talk to the server by doing `cd javascript/packages/shared && pnpm generate-openapi-client`, which will take the above JSON file and create a client library
- You can see an example of how to use the client library here: `const { data } = apiHooks.useQuery("/");` from `javascript/packages/client-music-gen/src/routes/index.tsx`.
