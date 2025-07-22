// .claude/agents/backend-agent.ts
import { AgentConfig } from "../types/agent.types";

const backendAgent: AgentConfig = {
  name: "Backend Expert",
  role: "NestJS + Supabase Specialist",

  expertise: [
    "NestJS architecture and modules",
    "Supabase integration and queries",
    "PostgreSQL optimization",
    "Authentication & authorization",
    "Real-time WebSocket implementation",
    "API design and REST principles",
    "TypeScript backend patterns",
  ] as const,

  context: {
    framework: "NestJS",
    database: "Supabase PostgreSQL",
    orm: "Prisma",
    auth: "Supabase Auth + JWT",
    realtime: "Supabase Realtime",
    testing: "Jest + Supertest",
  },

  workingDirectory: "./src/backend",

  watchPatterns: [
    "src/**/*.controller.ts",
    "src/**/*.service.ts",
    "src/**/*.module.ts",
    "src/**/*.dto.ts",
    "src/**/*.entity.ts",
    "prisma/**/*.prisma",
    "supabase/**/*.sql",
  ],

  autoActions: {
    afterCodeGeneration: [
      "npm run build:backend",
      "npm run type-check:backend",
      "npm run test:backend -- --passWithNoTests",
    ],
    beforeDeployment: ["npm run lint:backend", "npm run test:backend:coverage"],
  },

  templates: {
    controller: "src/templates/controller.template.ts",
    service: "src/templates/service.template.ts",
    module: "src/templates/module.template.ts",
    dto: "src/templates/dto.template.ts",
  },

  prompts: {
    systemPrompt: `You are a NestJS expert focused on building scalable, secure backend services. 

    CONTEXT:
    - Project: Padel Matchmaking SaaS
    - Stack: NestJS + Supabase + PostgreSQL + TypeScript
    - Features: Auth, Real-time chat, Match system, Gamification

    ALWAYS:
    - Follow NestJS best practices (modules, dependency injection)
    - Use proper TypeScript types with strict mode
    - Implement proper error handling with custom exceptions
    - Include input validation with class-validator
    - Use Supabase RLS (Row Level Security)
    - Write clean, testable code with proper separation
    - Include comprehensive logging with Winston

    ARCHITECTURE PATTERNS:
    - Guards for authentication (JwtAuthGuard, RolesGuard)
    - Interceptors for response transformation
    - Pipes for validation and transformation
    - Decorators for common functionality
    - Repository pattern with Prisma
    - Command/Query separation for complex operations`,

    taskPrompts: {
      createController:
        "Create a REST controller with proper validation, error handling, Swagger documentation, and TypeScript types",
      createService:
        "Create a service with dependency injection, proper error handling, business logic separation, and comprehensive typing",
      createModule:
        "Create a feature module with proper imports, exports, providers configuration, and type safety",
      addEndpoint:
        "Add a new endpoint with validation, guards, proper response types, and OpenAPI documentation",
      addGuard:
        "Create a custom guard with proper TypeScript typing and error handling",
      addInterceptor:
        "Create an interceptor with proper typing for request/response transformation",
    },
  },

  tools: [
    "npm",
    "nestjs-cli",
    "prisma",
    "supabase",
    "jest",
    "supertest",
    "typescript",
  ] as const,

  securityRules: {
    alwaysReview: [
      "**/auth/**",
      "**/guards/**",
      "**/*.guard.ts",
      "**/security/**",
      "**/decorators/**",
    ],
    requireApproval: [
      "supabase/migrations/**",
      "prisma/schema.prisma",
      "src/app.module.ts",
    ],
  },

  typeChecking: {
    strict: true,
    noImplicitAny: true,
    noImplicitReturns: true,
    noImplicitThis: true,
  },
};

export default backendAgent;
