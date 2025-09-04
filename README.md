# TypeDrop

Paste, share, done — text sharing made simple.

- Live app: https://typedrop-1.onrender.com/
- Stack: Node.js, Express, EJS, MongoDB (Mongoose), dotenv

## Project structure

```
TypeDrop/
├─ index.js            # Express server and routes
├─ db.js               # Mongoose model
├─ views/              # EJS templates (home, content)
├─ public/             # Static assets (e.g., logo)
├─ package.json        # Dependencies
└─ .gitignore
```

## Prerequisites

- Node.js 18+
- A MongoDB connection string

## Setup

1) Install dependencies
```bash
npm install
```

2) Configure environment
Create a `.env` file in `TypeDrop/`:
```bash
MONGO_URL=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
```

## Run locally
```bash
node index.js
```
- Server: http://localhost:3000

## Usage
- Open the home page and enter a route name (e.g. `my-notes`).
- You’ll be redirected to `/content?route=my-notes` where you can type directly in the page.
- Content auto-saves (debounced) to MongoDB.

## Endpoints
- GET `/` — Renders `views/home.ejs`.
- GET `/content?route=<name>` — Renders the editor for the given `route` with any previously saved content.
- POST `/save`
  - Body: JSON `{ "content": string, "routeName": string }`
  - Effect: Updates the document with `route = routeName`.

## Data model
Defined in `db.js` as collection `routes`:
```js
{ route: String, content: String }
```

## Notes
- Port is currently hard-coded to `3000` in `index.js`.
- Required env: `MONGO_URL`.

## Known limitations
- First-time creation uses `insertOne` without awaiting; consider switching to `await RouteModle.create({ route, content: "" })` and handling the returned doc.
- No authentication; anyone with a route name can view/edit its content.

## Deployment
- Deployed on Render: https://typedrop-1.onrender.com/
- Typical Render settings:
  - Build command: `npm install`
  - Start command: `node index.js`
  - Env var: `MONGO_URL`
