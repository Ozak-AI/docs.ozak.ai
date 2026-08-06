[![Tinasaurus Demo](https://res.cloudinary.com/forestry-demo/image/upload/v1677522334/tina-io/blog/tinacms-docusaurus-markdown-editing.gif "Tinasaurus Overview Video")](https://www.youtube.com/watch?v=2bHBwM54UB8)

## Quickstart With Tina

```
$ bun install && bun run dev
```

This will install dependencies and open the website in your browser.

> This project uses [bun](https://bun.sh/) as its package manager. `bun.lock` is the only lockfile committed — please don't run `npm`, `yarn`, or `pnpm` here, as they'll generate a competing lockfile.

Visit the CMS at [http://localhost:3000/admin](http://localhost:3000/admin) to start editing.

## About

This website is built using [Docusaurus 3](https://docusaurus.io/) and [TinaCMS](https://tina.io/).

[Watch an overview of this project on YouTube](https://www.youtube.com/watch?v=2bHBwM54UB8).

### Installation

```
$ bun install
```

### Local Development

```
$ bun run dev
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server. Go to the [Tina Admin](http://localhost:3000/admin) to start editing.

### Build

```
$ bun run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

To deploy to production and support editing on your live website (at **your-domain.com/admin**), you can follow the steps from [Tina's docs to get it running on TinaCloud](https://tina.io/docs/tina-cloud/overview/).
