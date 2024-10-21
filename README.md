# Celebrities browser app

This is a demo app written using TypeScript/React/Vite that allows the user to browse [The Movie DB](https://www.themoviedb.org/) celebrities.

In addition to displaying the most popular celebrities and supporting searching for specific ones by name, the fetched list of celebrities is paginated. You can also click on specific celebrities to view more info about them. Lastly, the app is responsive and should work well with both mobile and desktop layouts.

## Running the app locally

1. In the root directory of the project run `npm install` to install the dependencies.
2. Create a `.env.local` file in the root directory and add the following environment variable with your local testing The Movie DB API key (replace `XXXXXXX`):

```
VITE_THE_MOVIE_DB_API_KEY=XXXXXXX
```

3. Run `npm run dev` to run the app on localhost. The app should be available at the default Vite server port at http://localhost:5173/

## Building the app for production

1. Create a `.env.production` file in the root directory of the project and specify your production environment API key the same way the `.env.local` file was configured.
2. Build the app using `npm run build`. The files in the generated `dist` directory can be uploaded to your hosting provider.

## Running the test cases

Run `npm run test` to run some example test cases using Vitest and React Testing Library.
