# Mutual Aid NYC Community Resources Lists

A [Next.js](https://nextjs.org) website to find, create custom lists of, and share resources from the [Mutual Aid NYC](https://mutualaid.nyc/) Community Resources Library. The Library is a community-sourced, volunteer-curated collection of free and low cost services, support, and mutual aid available to New Yorkers. 

Adapted from the [Open Referral](https://openreferral.org) data format, data is stored in [Airtable](https://airtable.com) and managed by Mutual Aid NYC volunteers.

## Technical Overview

As of our most recent design, the major components of the project are as follows:

- Frontend
  - Uses Next.js and houses most of the logic for fetching and displaying list data from the database.
- Backend
  - Uses Next.js's API routes to wrap (to hide API keys from request headers) and cache Airtable API calls.
- Database
  - An Airtable base that is maintained manually by the the Mutual Aid NYC research team. The public and volunteers submit resources and help keep information up to date.

## Tech Stack

- [TypeScript](https://www.typescriptlang.org)
- [Chakra UI](https://chakra-ui.com)
- [React Google Maps API](https://react-google-maps-api-docs.netlify.app/)
- [Airtable.js](https://github.com/airtable/airtable.js/)
- [Axios](https://axios-http.com/)
- [React Query](https://react-query.tanstack.com)
- [React Hook Form](https://react-hook-form.com)
- [Yup](https://github.com/jquense/yup)

## Requirements

- [Node.js](https://nodejs.org/en/download/releases) (max version: 20.17.0) - Downloads are under "Releases" for each Node version. The installers for Windows have the `.msi` file extension, `.pkg` for macOS.
  - ~~This Node.js version cap is because [the project's version of Next.js (11.1.4), doesn't support above the specified version](https://github.com/vercel/next.js/issues/30078).~~
  - To install and easily switch between versions of Node when running locally, install [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager).
  - With the addition of the `.nvmrc` file, make sure to run `nvm use` to match your local environment's Node version with the project's prior to running `yarn dev`
  - ~~Alternatively, the `NODE_OPTIONS` environment variable can be set before running locally with Node v17+: `NODE_OPTIONS=--openssl-legacy-provider npm run dev`~~
- [Yarn 1](https://classic.yarnpkg.com/lang/en/)

## Running Locally

- Copy this repo: `git clone https://github.com/MutualAidNYC/services-lists.git`
- Install the Yarn package manager (version 1): `npm install --global yarn`
- Install dependencies: `yarn install`
- Copy the `sample.env` file: `cp sample.env .env.local`
- Add your Airtable API key and the id of the Airtable base containing your data to the `.env.local` file.
- Start a development server: `yarn dev`
- View the site locally at http://localhost:3000/

## Running with Docker

- Copy the `sample.env` file: `cp sample.env .env.local`
- Add your Airtable API key and the id of the Airtable base containing your data to the `.env.local` file.
- Build docker image from main directory: `docker build -t services-lists-docker . `
- Run created image: `docker run -p 3000:3000 services-lists-docker`

## Testing

[Jest](https://jestjs.io/) is used to run unit tests.

- To run unit tests, run `yarn test`.
- The project's test configuration is specified in the `jest.config.js` file.
  
- ### Testing Tech Stack
  - [ts-jest](https://github.com/kulshekhar/ts-jest)
  - [React Hooks Testing Library](https://react-hooks-testing-library.com/)
  - [Mock Service Worker](https://mswjs.io/)

## Type Checking

[TypeScript's `tsc` CLI command](https://www.typescriptlang.org/docs/handbook/compiler-options.html) is used to compile the code and check for any type errors.

- To run a type check, run `yarn typecheck`.
- The project's TypeScript configuration is specified in the `tsconfig.json` file.

## Linting

[ESLint](https://eslint.org/) is used to automatically check this project's code for programattic errors (AKA linting).

- To run the linter, run `yarn lint` - this will check all files in the project except those specified in the `.eslintignore` file.
- The linter's configuration is specified in the `.eslintrc.json` file.

## Code Formatting

[Prettier](https://prettier.io/) is used to automatically format this project's code according to Prettier's style guide so it will stay consistently formatted across developers.

- To run the formatter, run `yarn format` - this will format all the files in the project except those specified in the `.prettierignore` file.
- The formatter's configuration is specified in the `.prettierrc.json` file.

## Contributing

This is an open-source project and we welcome contributions! If you are an outside contributor and want to report a bug, or have an idea of how to enhance the application, file an issue in this repository. This will provide a location to discuss proposed implementations of fixes or enhancements, and can then be tied to a subsequent pull request.

If you want to join our developer team to contribute ideas and update code, join us as a [volunteer at Mutual Aid NYC](https://mutualaid.nyc/get-involved/).
