# GPT-3 Blog Post Generator
## Description

This is a simple blog post generator using OpenAI's GPT-3 API.

## Tools Used

- [OpenAI's GPT-3 API](https://openai.com/)
- [Auth0](https://auth0.com/)
- [Stripe](https://stripe.com/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)

## Set Environment Variables

Create a `.env.local` file and add the following:

```bash
NODE_ENV= # development | production
OPENAI_API_KEY=
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
MONGODB_URI=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_PRODUCT_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
```

# Notes

- Create "users" and "posts" collections in MongoDB.
- Create Price ID of a product in Stripe, for example: 10 tokens for $10.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Deploy

Recomended to use [Digital Ocean](https://www.digitalocean.com/) apps to deploy this project.
