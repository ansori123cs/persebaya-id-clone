# FaiSal - Modern Next.js Dashboard Template

A production-ready dashboard template built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Zustand**. Features a responsive sidebar, navbar, and pre-built components for rapid development.

## ✨ Features

- ⚡ **Next.js App Router** - Latest Next.js with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📘 **TypeScript** - Full type safety
- 📱 **Responsive Design** - Mobile-first approach
- 🧩 **Reusable Components** - UI component library
- 🎭 **State Management** - Zustand for lightweight state
- 🚀 **Production Ready** - Best practices throughout
- ♿ **Accessible** - Semantic HTML and ARIA ready
- 🎪 **Icons** - Lucide React icons included

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard route
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Layout components (Navbar, Sidebar)
│   └── ui/                # Reusable UI components
├── layouts/               # Layout wrappers
├── lib/                   # Utility functions
└── stores/                # Zustand stores
```

## 🚀 Getting Started

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
