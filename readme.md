# Monorepo for Web Application Development

## Structure

### Apps

- **web:** Next.js application for the frontend user interface.
- **api:** Express backend API powered by TRPC for efficient remote procedure calls.

### libs

- **db:** Database interactions handled by Prisma, ensuring data consistency and efficiency.
- **forms:** Secure and reliable form validation and management with Zod and React Hook Form.
- **network:** NextAuth handles authentication and network-related logic with ease.
- **trpc-client:** Configuration for the frontend to seamlessly communicate with the TRPC server. It supports both the client and react server components.
- **trpc-server:** Robust TRPC server setup for the backend API.
- **ui:** Reusable and encapsulated UI components built with Shadow DOM and styled with Tailwind CSS.

## Key Features

- **TypeScript:** Enforces strong typing for a clean, maintainable, and error-free codebase.
- **Static Testing:** Maintain code quality and catch potential issues early with Prettier, ESLint, and TypeScript.
- **Type Propagation:** Database types seamlessly flow to UI components, ensuring type safety and preventing errors.
- **Modern Tooling:** Leverage the power of Prisma, TRPC, and NextAuth for efficient data management, communication, and authentication.
- **Reusable Components:** Build scalable and maintainable UIs with shared components, Shadow DOM encapsulation, and Tailwind CSS styling.
