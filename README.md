# 🌐 Weavy — Social Application Platform

A full-stack social media platform built with Next.js, TypeScript, and PostgreSQL. Weavy lets users share posts, follow others, send notifications, and manage their privacy — with features like two-factor authentication, real-time interactions, and a clean modern UI.

## 🚀 Live Demo

[View the App](https://weavy.ahmedrehandev.net)

## ✨ Features

#### 🔒 Authentication

1. Email & password sign up / sign in
2. Two-factor authentication (authenticator app, backup codes, email OTP)
3. Session management
4. Forgot password / reset password

#### 👤 User Profile

1. Profile page
2. Edit profile settings
3. Followers / following pages with pagination and search
4. Follow / unfollow toggle
5. View liked and bookmarked posts from profile
6. Share post to social media
7. Report posts and users

#### 📝 Posts & Feed

1. CRUD operations on posts
2. Like / unlike posts
3. Comment on posts

#### 🌐 Social

1. Follow / unfollow users
2. Block / unblock users
3. Notifications system
4. Mute System

#### ⚙️ Settings

1. Account settings
2. Privacy settings (online status, blocked users)
3. Security settings (2FA management)
4. Notification settings
5. Danger Zone (delete account)

#### 🛠️ Technical

1. Server side rendering with prefetching
2. TanStack Query with pagination and caching
3. Optimistic UI updates
4. Email notifications via Resend
5. Dark / light mode
6. Fully responsive design
7. SEO metadata on all pages

## 🧰 Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Shadcn UI, React Hook Form, Zod and Tanstack Query.
- **Backend**: Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth
- **Email**: Resend
- **Hosting**: Vercel
- **Database Hosting**: Neon
- **Image Hosting**: Uploadthing

## 📸 App Preview

![Weavy App Preview](/public/weavy-app-preview.png)

## Installation and Setup

1. Clone the repository

```
git clone git@github.com:Ahmed-HA-RE/weavy.git
```

2. Install dependencies

```
pnpm or npm install
```

3. Add .env file in the root directory and add the following environment variables:

```
UPLOADTHING_TOKEN=
NEXT_PROD_SERVER_URL=
EMAIL=
LICENSE_KEY=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=
RESEND_DOMAIN=
GOOGLE_CLIENT_ID=
GOOGLE_RECAPTCHA_SECRET=
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
COMPANY_EMAIL=
```
