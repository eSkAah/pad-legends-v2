// .claude/agents/frontend-agent.ts
import { AgentConfig } from "../types/agent.types";

const frontendAgent: AgentConfig = {
  name: "Frontend Expert",
  role: "React + UI/UX Specialist",

  expertise: [
    "React 19+ with hooks and context",
    "TypeScript frontend patterns",
    "Tailwind CSS and premium design systems",
    "Apple-style UI/UX implementation",
    "Mobile-first responsive design",
    "PWA optimization and performance",
    "State management (Zustand/React Query)",
    "Accessibility and user experience",
  ] as const,

  context: {
    framework: "React + TypeScript",
    styling: "Tailwind CSS + Headless UI",
    state: "Zustand + React Query",
    routing: "React Router",
    build: "Vite",
    testing: "Vitest + Testing Library",
    designSystem: "Apple-inspired premium UI",
    colors: {
      navy: {
        900: "#0C1B2E",
        800: "#1E293B",
        700: "#334155",
      },
      amber: {
        400: "#FBBF24",
        500: "#F59E0B",
      },
    },
  },

  workingDirectory: "./src/frontend",

  watchPatterns: [
    "src/**/*.tsx",
    "src/**/*.ts",
    "src/**/*.css",
    "src/components/**/*",
    "src/pages/**/*",
    "src/hooks/**/*",
    "src/stores/**/*",
    "src/types/**/*",
    "public/**/*",
  ],

  autoActions: {
    beforeDeployment: [
      "pnpm run build:frontend",
      "pnpm run test:frontend",
      "pnpm run a11y:check",
    ],
    afterCodeGeneration: [
      "pnpm run type-check:frontend",
      "pnpm run lint:frontend -- --fix",
      "pnpm run format",
      "pnpm run test:types",
    ],
    beforeCommit: [
      "pnpm run build:frontend",
      "pnpm run test:frontend",
      "pnpm run a11y:check",
    ],
  },

  prompts: {
    systemPrompt: `You are a React frontend expert specialized in premium mobile-first applications with TypeScript.

    CONTEXT:
    - Project: Padel Matchmaking SaaS
    - Design: Apple-inspired premium UI
    - Colors: Navy (backgrounds) + Amber (accents)
    - Target: Mobile-first PWA with desktop support
    - Type Safety: Strict TypeScript throughout

    UI PRINCIPLES:
    - Apple-style design language with premium feel
    - Glassmorphism and subtle shadows
    - Fluid animations (300ms cubic-bezier transitions)
    - 44px+ touch targets for mobile accessibility
    - Premium typography hierarchy with system fonts
    - WCAG AA compliance mandatory

    TYPESCRIPT REQUIREMENTS:
    - Strict mode enabled with no any types
    - Proper interface definitions for all props
    - Generic types for reusable components
    - Discriminated unions for complex state
    - Proper error boundary typing
    - Event handler typing with proper generics

    ALWAYS:
    - Mobile-first responsive design
    - TypeScript strict typing with interfaces
    - Semantic HTML structure for accessibility
    - Proper error boundaries with typed errors
    - Loading and empty states with skeleton UI
    - Keyboard navigation with focus management
    - Screen reader compatibility with ARIA labels`,

    taskPrompts: {
      createComponent:
        "Create a reusable component with strict TypeScript interfaces, proper props validation, and Apple-style design",
      createPage:
        "Create a page component with proper layout, SEO meta tags, mobile optimization, and comprehensive typing",
      addAnimation:
        "Add fluid micro-interactions with CSS transitions or Framer Motion with proper TypeScript",
      improveUX:
        "Enhance user experience with better feedback, loading states, error handling, and accessibility",
      createHook:
        "Create a custom hook with proper TypeScript generics and comprehensive error handling",
      addForm:
        "Create a form with proper validation, error handling, and TypeScript typing",
      createStore:
        "Create a Zustand store with proper TypeScript typing and persistence",
    },
  },

  tools: [
    "vite",
    "react-devtools",
    "tailwind",
    "headless-ui",
    "vitest",
    "playwright",
    "typescript",
    "eslint",
    "prettier",
  ] as const,

  securityRules: {
    alwaysReview: ["**/auth/**", "**/api/**", "**/*secret*", "src/config/**"],
    requireApproval: [
      "src/types/global.d.ts",
      "vite.config.ts",
      "tailwind.config.js",
    ],
  },

  typeChecking: {
    strict: true,
    noImplicitAny: true,
    noImplicitReturns: true,
    noImplicitThis: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
  },

  performance: {
    cacheEnabled: true,
    maxConcurrentTasks: 3,
    timeoutMs: 60000,
    memoryLimitMb: 1024,
  },
};

export default frontendAgent;
