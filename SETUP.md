# Manual Monorepo Setup Guide

This guide explains how to manually set up a monorepo structure similar to this project using npm workspaces.

## Overview

This monorepo uses:
- **npm workspaces** for package management
- **TypeScript** for type safety
- Multiple apps sharing common packages

## Step-by-Step Setup

### 1. Initialize the Root Project

```bash
# Create project directory
mkdir simple-monorepo
cd simple-monorepo

# Initialize root package.json
npm init -y
```

### 2. Configure Root package.json

Edit `package.json` to add workspaces and mark as private:

```json
{
  "name": "simple-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev:nextjs": "npm run dev -w @monorepo/nextjs-app",
    "dev:express": "npm run dev -w @monorepo/express-server",
    "dev:vite": "npm run dev -w @monorepo/vite-app",
    "build": "npm run build --workspaces --if-present",
    "clean": "rm -rf node_modules apps/*/node_modules packages/*/node_modules"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
```

### 3. Create Directory Structure

```bash
# Create workspace directories
mkdir -p apps packages
```

### 4. Create Shared Package

```bash
# Create shared package directory
mkdir -p packages/src/{ui/button,utils}

# Initialize package
cat > packages/package.json << 'EOF'
{
  "name": "@monorepo/packages",
  "version": "0.1.0",
  "private": true,
  "main": "src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./ui": "./src/ui/index.ts",
    "./utils": "./src/utils/index.ts"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
EOF
```

Create TypeScript config for shared package:

```bash
cat > packages/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
EOF
```

Create shared utilities:

```bash
# Create formatDate utility
cat > packages/src/utils/formatDate.ts << 'EOF'
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
EOF

# Create utils index
cat > packages/src/utils/index.ts << 'EOF'
export { formatDate } from './formatDate';
EOF
```

Create Button component:

```bash
# Create Button component
cat > packages/src/ui/button/index.tsx << 'EOF'
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
      }}
    >
      {children}
    </button>
  );
}
EOF

# Create UI index
cat > packages/src/ui/index.ts << 'EOF'
export { Button } from './button';
EOF
```

Create main package index:

```bash
cat > packages/src/index.ts << 'EOF'
export * from './ui';
export * from './utils';
EOF
```

### 5. Create Next.js App

```bash
# Create Next.js app directory
mkdir -p apps/nextjs-app/app

# Create package.json
cat > apps/nextjs-app/package.json << 'EOF'
{
  "name": "@monorepo/nextjs-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@monorepo/packages": "*",
    "next": "^14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.6",
    "@types/react": "^18.2.45",
    "typescript": "^5.3.3"
  }
}
EOF

# Create tsconfig.json
cat > apps/nextjs-app/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# Create Next.js config
cat > apps/nextjs-app/next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@monorepo/packages'],
};

module.exports = nextConfig;
EOF

# Create app page
cat > apps/nextjs-app/app/page.tsx << 'EOF'
'use client';
import { Button, formatDate } from '@monorepo/packages';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Next.js App</h1>
      <p>Today is: {formatDate(new Date())}</p>
      <Button onClick={() => alert('Clicked!')}>Click Me</Button>
    </main>
  );
}
EOF

# Create layout
cat > apps/nextjs-app/app/layout.tsx << 'EOF'
export const metadata = {
  title: 'Next.js App',
  description: 'Monorepo Next.js app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
EOF
```

### 6. Create Express Server

```bash
# Create Express server directory
mkdir -p apps/express-server/src

# Create package.json
cat > apps/express-server/package.json << 'EOF'
{
  "name": "@monorepo/express-server",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@monorepo/packages": "*",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.6",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3"
  }
}
EOF

# Create tsconfig.json
cat > apps/express-server/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
EOF

# Create server
cat > apps/express-server/src/index.ts << 'EOF'
import express from 'express';
import { formatDate } from '@monorepo/packages/utils';

const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.json({
    message: 'Express server is running!',
    date: formatDate(new Date())
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
EOF
```

### 7. Create Vite React App

```bash
# Create Vite app directory
mkdir -p apps/vite-app/src

# Create package.json
cat > apps/vite-app/package.json << 'EOF'
{
  "name": "@monorepo/vite-app",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@monorepo/packages": "*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.10"
  }
}
EOF

# Create Vite config
cat > apps/vite-app/vite.config.ts << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
EOF

# Create tsconfig.json
cat > apps/vite-app/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

# Create tsconfig.node.json
cat > apps/vite-app/tsconfig.node.json << 'EOF'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF

# Create index.html
cat > apps/vite-app/index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# Create App component
cat > apps/vite-app/src/App.tsx << 'EOF'
import { Button, formatDate } from '@monorepo/packages';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Vite React App</h1>
      <p>Today is: {formatDate(new Date())}</p>
      <Button onClick={() => alert('Clicked!')}>Click Me</Button>
    </div>
  );
}

export default App;
EOF

# Create main entry
cat > apps/vite-app/src/main.tsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
EOF

# Create vite-env.d.ts
cat > apps/vite-app/src/vite-env.d.ts << 'EOF'
/// <reference types="vite/client" />
EOF
```

### 8. Create .gitignore

```bash
cat > .gitignore << 'EOF'
node_modules
dist
.next
*.log
.DS_Store
.env*.local
EOF
```

### 9. Install Dependencies

```bash
# Install all dependencies from root
npm install
```

### 10. Run the Apps

```bash
# Run Next.js app (port 3000)
npm run dev:nextjs

# Run Express server (port 3001)
npm run dev:express

# Run Vite app (port 5173)
npm run dev:vite

# Build all apps
npm run build
```

## Key Concepts

### npm Workspaces

The `workspaces` field in the root `package.json` tells npm to treat `apps/*` and `packages/*` as linked packages. This enables:

- **Shared dependencies**: Common packages installed once at the root
- **Local package linking**: Apps can reference `@monorepo/packages` without publishing
- **Unified scripts**: Run commands across all workspaces

### Package Naming

- Use scoped names like `@monorepo/package-name` for internal packages
- Mark all packages as `"private": true` to prevent accidental publishing
- Use `"*"` as version for local workspace dependencies

### Running Workspace Scripts

```bash
# Run a script in a specific workspace
npm run <script> -w <workspace-name>

# Example
npm run dev -w @monorepo/nextjs-app

# Run script in all workspaces that have it
npm run build --workspaces --if-present
```

## Project Structure

```
simple-monorepo/
├── package.json                 # Root config with workspaces
├── .gitignore
├── apps/
│   ├── nextjs-app/             # Next.js 14 app
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── tsconfig.json
│   │   └── app/
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── express-server/         # Express API
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       └── index.ts
│   └── vite-app/               # Vite React app
│       ├── package.json
│       ├── vite.config.ts
│       ├── tsconfig.json
│       ├── index.html
│       └── src/
│           ├── main.tsx
│           └── App.tsx
└── packages/
    ├── package.json            # Shared package config
    ├── tsconfig.json
    └── src/
        ├── index.ts
        ├── ui/
        │   ├── index.ts
        │   └── button/
        │       └── index.tsx
        └── utils/
            ├── index.ts
            └── formatDate.ts
```

## Troubleshooting

### "Cannot find module '@monorepo/packages'"

Run `npm install` from the root to ensure all workspace links are created.

### Changes in shared package not reflected

Some bundlers need to transpile local packages. For Next.js, use:

```js
// next.config.js
module.exports = {
  transpilePackages: ['@monorepo/packages'],
};
```

### Module resolution issues

Ensure your `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "moduleResolution": "node" // or "bundler" for Vite
  }
}
```

## Next Steps

- Add **Turbo** or **Nx** for better build caching
- Set up **Changesets** for versioning
- Add **ESLint** and **Prettier** for code quality
- Configure **path aliases** for cleaner imports
- Set up **CI/CD** pipelines
