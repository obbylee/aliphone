# Aliphone - Fullstack B2B phone ecommerce

A modern web application built to showcase a catalog of realistic mobile phones, providing users with a seamless Browse and detailed viewing experience.

## 🌟 About This Project (Portfolio & Learning Focus)

## ✨ Features

- **Product Listing:** A responsive homepage displaying a grid of realistic mobile phones with their name, price, and a thumbnail image.
- **Product Details:** A dedicated page for each product, offering an in-depth view including name, full description, detailed specifications, price, and a larger image.
- **Clean Code:** Adherence to high code quality standards through consistent linting, formatting, a modular folder structure, and descriptive comments for complex logic.
- **Bun Runtime:** Leverages the speed and efficiency of Bun for dependency management and potentially for server-side logic.
- **Database:** A well-structured database to store and manage product information.
- **Live Deployment:** The application is publicly deployed for easy access.
- **Product Search:** Ability to search products by keyword.
- **Advanced Product Browse:** Features for sorting, filtering, and pagination of products based on various criteria.
- **Product Categories:** Organization of products into distinct categories for easier navigation.
- **User Authentication & Authorization:** Basic implementation of user sign-up, login, and role-based access control.
- **Shopping Cart & Checkout:** A complete flow for adding products to a cart and proceeding through a checkout process.
- **Admin Dashboard:** A dedicated interface for administrators to manage products, monitor transactions, and oversee application data.

## 🚀 Live Demo

You can view the live application here:
[**https://aliphone.vercel.app/**]

---

## 🛠️ Technologies Used

- **Runtime & Package Manager:** **Bun**
- **Fullstack Framework:** **NextJs** (for powerful routing, rendering, and API routes)
- **Styling:** **Tailwind CSS** with **shadcn/ui**
- **Schema Validation:** **Zod**
- **API Layer:** **tRPC**
- **ORM:** **Prisma**
- **Database:** **PostgreSQL**
- **Authentication:** **Better Auth**
<!-- * **Monorepo Tool (Optional):** **Turborepo** -->
- **Containerization:** **Docker Compose** (primarily for local database setup)
- **Tools:** **ESLint** with **Prettier**
- **Deployment:** **Vercel**

---

## 📦 Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Bun:** Follow the official Bun installation guide: [https://bun.sh/docs/installation](https://bun.sh/docs/installation)
- **Git:** [https://git-scm.com/downloads](https://git-scm.com/downloads)

### 1. Clone the Repository

```bash
git clone git@github.com:obbylee/aliphone.git
cd aliphone
```

### 2. Install Dependencies

Navigate to the project's root directory and install all dependencies:

```bash
bun install
```

### 3. Database Setup

This project uses PostgreSQL, managed locally via Docker Compose.

### 3.1. Environment Variables

Create a `.env` file in the root directory of your project based on the `.env.example` provided. This file contains all necessary environment variables for your Next.js application, including database connection details and authentication secrets.

```code
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"

BETTER_AUTH_SECRET="Q1vF1jahagT3qkpPeQjv6wq6GDS7FFno"
BETTER_AUTH_URL="http://localhost:3000"

DATABASE_URL="postgresql://aliphone:888888@localhost:5432/aliphonedb"
POSTGRES_HOST_PORT="5432"
POSTGRES_USER="aliphone"
POSTGRES_PASSWORD="888888"
POSTGRES_DB="aliphonedb"
```

### 3.2. Start Database Container

Make sure you currently at `root` directory, start the PostgreSQL database container:

```bash
# current directory app/server
bun db:docker #running docker-compose up -d
```

### 3.3. Run Migrations & Seed Data

Ensure your PostgreSQL container is running. Then, apply the database schema migrations and seed it with initial product data using Prisma. Run these commands from the app/server directory.

```bash
# current directory app/server

# Apply database migrations
bun db:migrate # This typically runs `bunx prisma migrate dev` or similar

# prisma generate
bun db:generate

# Seed the database with product data
bun db:seed # This typically runs `bunx prisma db seed`

```

### 4. Run the Application

Navigate to the root directory of your project and start the Next.js development server:

```bash
bun dev
```

### Database Schema:

The database schema, managed by Prisma, is defined in /prisma/schema.prisma.

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "./generated/prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id
  name          String
  email         String
  emailVerified Boolean
  image         String?
  createdAt     DateTime
  updatedAt     DateTime
  sessions      Session[]
  accounts      Account[]
  carts         Cart[] // Relation to Cart model

  @@unique([email])
  @@map("user")
}

model Session {
  id        String   @id
  expiresAt DateTime
  token     String
  createdAt DateTime
  updatedAt DateTime
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([token])
  @@map("session")
}

model Account {
  id                    String    @id
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime
  updatedAt             DateTime

  @@map("account")
}

model Verification {
  id         String    @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime?
  updatedAt  DateTime?

  @@map("verification")
}

model ProductCategory {
  id          String    @id @default(ulid())
  name        String    @unique
  slug        String    @unique
  description String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  products    Product[] // Relation to Product model

  @@map("product_category")
}

model Product {
  id                   String   @id @default(ulid())
  sku                  String   @unique
  slug                 String   @unique
  name                 String
  description          String
  price                Decimal
  imageUrl             String?
  stockQuantity        Int
  minimumOrderQuantity Int
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
  isFeatured           Boolean  @default(false)
  isActive             Boolean  @default(true)

  // Relation to ProductCategory
  categoryId String?
  category   ProductCategory? @relation(fields: [categoryId], references: [id])

  cartItems CartItem[] // Relation to CartItem model

  @@map("product")
}

model Cart {
  id        String     @id @default(ulid())
  userId    String     @unique // Each user can only have one active cart
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  items     CartItem[] // Relation to CartItem model

  @@map("cart")
}

model CartItem {
  id        String   @id @default(ulid())
  cartId    String
  cart      Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  quantity  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([cartId, productId]) // Ensures a product is only once in a given cart
  @@map("cart_item")
}
```

The app should now be running, typically on `http://localhost:3000`

### 📂 Project Structure

```
.
├── .next/                  # Next.js build output (generated)
├── node_modules/           # Project dependencies
├── public/                 # Static assets (e.g., images, favicon)
├── prisma/                 # Prisma schema and database migrations
│   ├── migrations/         # Database migration files
│   └── schema.prisma       # Prisma database schema definition
├── src/                    # Main application source code
│   ├── app/                # Next.js App Router (pages, layouts, API routes)
│   │   ├── (auth)/         # Example of Next.js Route Group for authentication features
│   │   ├── (main)/         # Example of Next.js Route Group for main application pages
│   │   ├── api/            # Next.js API Routes (e.g., for tRPC endpoint)
│   │   ├── layout.tsx      # Root layout for Next.js App Router
│   │   └── page.tsx        # Example root page for Next.js App Router
│   ├── components/         # Reusable UI components (shadcn/ui integration)
│   ├── generated/          # Generated code (e.g., Prisma client, as configured in schema.prisma)
│   │   └── prisma-client-js/ # Prisma client files
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Core utilities, authentication helpers, tRPC client setup
│   ├── server/             # Server-side logic (e.g., tRPC routers, server-side utilities, Prisma client instance)
│   ├── utils/              # General utility functions (e.g., formatters, validators)
│   └── env.mjs             # Environment variable validation (optional, but good practice)
├── .env.local              # Local environment variables (sensitive, ignored by Git)
├── .env.example            # Example environment variables (for reference)
├── .eslintrc.json          # ESLint configuration
├── .prettierignore         # Prettier ignore file
├── .prettierrc             # Prettier configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

---

### 💭 Development Decisions & Challenges

---

#### Key Development Decisions

- **Bun for Speed**: Chosen for its exceptional speed in dependency installation and script execution, significantly improving development and build times, and offering native TypeScript support.
- **Full-stack Next.js Architecture**: All application logic, from UI rendering to API endpoints and server-side data fetching, is unified within a single Next.js project. This streamlines development and deployment, and ensures consistent tooling throughout the stack.
- **Structured src Directory**: Organizing the codebase within a src directory, with dedicated folders for `app`, `components`, `hooks`, `lib`, `server`, and `utils`, promotes modularity, maintainability, and clear separation of concerns.
- **End-to-End Type Safety**: Achieved using Prisma for database typing, tRPC for type-safe API contracts between backend (Hono) and frontend (React), and Zod for robust schema validation. This setup drastically reduces runtime errors.
- **Component-Driven UI**: Built with React and React Router v7 for modularity. Tailwind CSS with shadcn/ui provides a utility-first, high-quality, and accessible component library for rapid UI development.

#### Challenges Encountered & Learned Lessons

- **Next.js App Router Data Fetching & Hydration:**:

  - **Challenge**: Understanding the various data fetching strategies in the Next.js App Router (Server Components, Client Components, Server Actions) and managing their impact on hydration and performance.
  - **Lesson Learned**: Gained expertise in optimizing data flow by strategically choosing between server-side and client-side data fetching, leveraging caching mechanisms, and ensuring efficient revalidation strategies for dynamic content.

* **Integrating tRPC with Next.js App Router**
  - **Challenge:** Setting up tRPC to work seamlessly across Next.js's different rendering environments (e.g., calling tRPC procedures from Server Components, Client Components, and API Routes), especially with the explicit `src/server` directory for tRPC routers.
  - **Lesson Learned:** Successfully implemented tRPC context and client setup that adapts to both server and client execution environments within Next.js, allowing for truly end-to-end type-safe API calls throughout the application. This deepened understanding of Next.js's execution model and tRPC's flexibility.

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or find a bug, please open an issue or submit a pull request.
