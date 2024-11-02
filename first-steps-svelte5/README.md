## Developing

#### Default `.env`:
```
DATABASE_URL="postgres://root:mysecretpassword@localhost:5432/local"
```

#### Initial migrations
```bash
npm run db:migrate
```

#### Run db container
```bash
npm run db:start
```

#### Run SvelteKit
```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
