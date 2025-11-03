# Simple Monorepo

A monorepo with 3 apps and shared packages using npm workspaces.

## Structure

```
simple-monorepo/
├── apps/
│   ├── nextjs-app/      # Next.js 14 app (port 3000)
│   ├── express-server/  # Express API server (port 3001)
│   └── vite-app/        # Vite React app (port 5173)
└── packages/
    ├── button/          # Shared React Button component
    └── utils/           # Shared utilities (formatDate)
```

## Setup

1. Install dependencies:
```bash
npm install
```

## Development

Run individual apps:
```bash
npm run dev:nextjs    # Start Next.js app
npm run dev:express   # Start Express server
npm run dev:vite      # Start Vite app
```

## Build

Build all apps:
```bash
npm run build
```

## Features

- **Shared packages**: Button component and formatDate utility used across all apps
- **Type safety**: Full TypeScript support
- **Hot reload**: All apps support hot module replacement in dev mode
- **npm workspaces**: Simple dependency management
