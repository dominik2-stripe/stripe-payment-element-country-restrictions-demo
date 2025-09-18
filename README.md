# Stripe Payment Element - Country Restrictions Demo

> This is a Next.js app that demonstrates how to implement country restrictions with Stripe Payment Element.

**THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.**

## Prerequisites

- Node.js 22+
- pnpm package manager
- Stripe Account

## Getting Started

1. Create a Stripe account and get the secret and publishable keys.
2. Create a Stripe customer and get the customer ID.
3. Set up your environment:

```bash
# Copy environment variables template
cp env.example .env

# Edit .env with your configuration (Stripe keys, etc.)
```

Then, install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
