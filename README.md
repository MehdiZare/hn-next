This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
# folder structure

hn-next/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── items/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── users/
│   │       └── [id]/
│   │           └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ScoreboardCard.tsx
│   │   ├── PostTypeChart.tsx
│   │   ├── DailyActivityChart.tsx
│   │   └── TopList.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   └── api.ts
│   └── types/
│       └── index.ts
├── public/
│   └── favicon.ico
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json