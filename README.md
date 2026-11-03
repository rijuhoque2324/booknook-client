# 📚 BookNook — Online Library Management System

BookNook is a modern, community-driven online library management platform built with Next.js. It allows users to explore books, contribute books to the library, borrow available books, and manage their borrowing activities through a simple and user-friendly interface.

## 🌟 Features

- **Explore Books:** Browse and discover books from the community library.
- **User Authentication:** Secure registration and login using Better Auth.
- **Add Books:** Authenticated users can contribute new books to the library.
- **My Books:** Manage books added by the logged-in user.
- **Edit & Delete Books:** Book owners can update or remove their own books.
- **Borrow Books:** Borrow books with available copies.
- **My Borrows:** View and manage personal borrowing records.
- **Return Books:** Return previously borrowed books.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Toast Notifications:** Clear success and error feedback using React Toastify.
- **Protected Routes:** Restricts private pages to authenticated users.
- **Dynamic Page Metadata:** Provides page-specific titles and descriptions.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework |
| React | UI development |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Better Auth | Authentication |
| React Toastify | Notifications |
| Lucide React | Icons |
| Swiper.js | Home page slider |
| React Hook Form | Form management |
| Zod | Form validation |

## 📁 Project Structure


booknook-client/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── add-book/
│   │   ├── books/
│   │   ├── login/
│   │   ├── register/
│   │   ├── my-books/
│   │   ├── my-borrows/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── books/
│   │   ├── shared/
│   │   └── ui/
│   ├── lib/
│   └── services/
├── .env.local
├── .gitignore
├── package.json
├── tsconfig.json
└── next.config.ts


## 🔐 Authentication & Authorization

BookNook uses Better Auth for user authentication.

- Users can register and log in securely.
- Public users can explore the library.
- Authenticated users can add books and borrow available books.
- Private pages require an authenticated session.
- JWT tokens are used to authenticate requests to the backend API.
- Book ownership determines who can edit or delete a book.

## 📖 Application Routes

| Route | Description | Access |
|---|---|---|
| `/` | Home page | Public |
| `/books` | Explore all books | Public |
| `/books/[id]` | Book details | Authenticated |
| `/login` | User login | Guest |
| `/register` | User registration | Guest |
| `/add-book` | Add a new book | Authenticated |
| `/my-books` | Manage contributed books | Authenticated |
| `/my-borrows` | Manage borrowed books | Authenticated |


The backend handles:

- Book management
- Borrowing operations
- Returning books
- JWT verification
- Ownership authorization
- Database operations

## 🚀 Deployment

The frontend is designed to be deployed on **Vercel**.

1. Push the client repository to GitHub.
2. Sign in to Vercel.
3. Import the BookNook client repository.
4. Configure the production environment variables.
5. Deploy the application.
6. Update the Better Auth URL and backend API URL with the production domains.
7. Configure the production authentication trusted origins and OAuth callback URLs if applicable.

## 🔒 Security

- Protected routes for authenticated users.
- JWT-based backend API authentication.
- Secure authentication using Better Auth.
- Environment-based configuration.
- Server-side authorization and validation through the backend API.

## 🎯 Project Goal

BookNook aims to make reading more accessible by creating a community-driven platform where people can share, discover, borrow, and return books.

## 👨‍💻 Project Information

**Project Name:** BookNook

**Project Type:** Online Library Management System

**Frontend:** Next.js

**Backend:** Express.js

**Database:** MongoDB

**Authentication:** Better Auth

**Developed as:** Programming Hero Assignment

