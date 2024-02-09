import Link from 'next/link'

import { GitCommit } from 'lucide-react'

export const HomePage = () => {
  return (
    <div className="max-w-2xl my-8 space-y-8">
      <h1 className="mb-4 text-3xl font-bold">
        Monorepo for Web Application Development
      </h1>

      <div>
        <Link
          href="https://github.com/karthickthankyou/foundation-trpc"
          target="_blank"
          className="inline-flex gap-2 px-2 py-1 border"
        >
          <GitCommit /> Github <GitCommit />
        </Link>
      </div>
      <h2 className="mb-2 text-xl font-semibold">Structure</h2>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Apps</h3>
        <ul className="ml-6 space-y-2 list-disc">
          <li>web: Next.js application for the frontend user interface.</li>
          <li>
            api: Express backend API powered by TRPC for efficient remote
            procedure calls.
          </li>
        </ul>
      </div>

      <div className="mt-4 ">
        <h3 className="mb-2 text-lg font-semibold">Libs</h3>
        <ul className="ml-6 space-y-2 list-disc">
          <li>
            db: Database interactions handled by Prisma, ensuring data
            consistency and efficiency.
          </li>
          <li>
            forms: Secure and reliable form validation and management with Zod
            and React Hook Form.
          </li>
          <li>
            network: NextAuth handles authentication and network-related logic
            with ease.
          </li>
          <li>
            trpc-client: Configuration for the frontend to seamlessly
            communicate with the TRPC server. It supports both the client and
            react server components.
          </li>
          <li>trpc-server: Robust TRPC server setup for the backend API.</li>
          <li>
            ui: Reusable and encapsulated UI components built with Shadow DOM
            and styled with Tailwind CSS.
          </li>
        </ul>
      </div>

      <h2 className="my-4 text-xl font-semibold">Key Features</h2>
      <ul className="ml-6 space-y-2 list-disc">
        <li>
          TypeScript: Enforces strong typing for a clean, maintainable, and
          error-free codebase.
        </li>
        <li>
          Static Testing: Maintain code quality and catch potential issues early
          with Prettier, ESLint, and TypeScript.
        </li>
        <li>
          Type Propagation: Database types seamlessly flow to UI components,
          ensuring type safety and preventing errors.
        </li>
        <li>
          Modern Tooling: Leverage the power of Prisma, TRPC, and NextAuth for
          efficient data management, communication, and authentication.
        </li>
        <li>
          Reusable Components: Build scalable and maintainable UIs with shared
          components, Shadow DOM encapsulation, and Tailwind CSS styling.
        </li>
      </ul>
    </div>
  )
}
