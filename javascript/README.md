# JavaScript

- [JavaScript](#javascript)
  - [Summary](#summary)
  - [Code sharing](#code-sharing)
  - [Packages](#packages)
  - [Installing new dependencies](#installing-new-dependencies)

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
- `server`: uses Hono.js, which is kind of like Express
- `shared`: has some shared code, like a shared button component

## Installing new dependencies

- Go to the package you want to install a dependency to e.g. `cd javascript/packages/app-ui`
- `pnpm i <name of your dependency>`
