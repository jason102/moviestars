# Celebrities browser app

This is a demo app written using TypeScript/React/Vite that allows the user to browse [The Movie DB](https://www.themoviedb.org/) celebrities.

In addition to displaying the most popular celebrities and supporting searching for specific ones by name, the fetched list of celebrities is paginated. You can also click on specific celebrities to view more info about them. Lastly, the app is responsive and should work well with both mobile and desktop layouts.

KNOWN ISSUE OF LIBRARY: Vertical scrolling pagination does not work if the initially fetched number of celebrities do not have a long enough vertical scrolling area. You can force it to work by resizing the window to be more tall than wide. I just discovered this at the end of development and it seems to be intentional behavior of the [react-virtuoso](https://virtuoso.dev/) library. Can read about it [here](https://github.com/petyosi/react-virtuoso/issues/919) and [here](https://github.com/petyosi/react-virtuoso/issues/924). I suppose I would have to add more complex "hacky" code to somehow always enable the `endReached` prop of the library's component. Or choose another library all together. I also looked into specifying the number of results returned by the API to be more than the default amount, but it seems this is not supported at least for the [person/popular](https://developer.themoviedb.org/reference/person-popular-list) endpoint.

I hope this demonstrates that I understand how to implement pagination and that you can forgive me that the library I chose may not be performing as ideally as possible. (I still stand by my decision to use it though.)

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
