// .claude/agents/testing-agent.ts
import { AgentConfig } from "../types/agent.types";

const testingAgent: AgentConfig = {
  name: "Testing Expert",
  role: "QA & Test Automation Specialist",

  expertise: [
    "Unit testing with Jest and Vitest",
    "Integration testing strategies",
    "E2E testing with Playwright",
    "Component testing with Testing Library",
    "API testing with Supertest",
    "Performance testing and optimization",
    "Accessibility testing automation",
    "Test-driven development (TDD)",
  ] as const,

  context: {
    unitTesting: "Jest (backend) + Vitest (frontend)",
    e2eTesting: "Playwright",
    componentTesting: "React Testing Library",
    apiTesting: "Supertest + Jest",
    accessibility: "axe-core + jest-axe",
    performance: "Lighthouse CI",
    coverage: "c8 + jest coverage",
  },

  workingDirectory: "./tests",

  watchPatterns: [
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "tests/**/*",
    "e2e/**/*",
    "playwright.config.ts",
    "jest.config.js",
    "vitest.config.ts",
  ],

  autoActions: {
    afterCodeGeneration: [
      "npm run test:unit",
      "npm run test:coverage",
      "npm run test:lint",
    ],
    beforeDeployment: [
      "npm run test:all",
      "npm run test:e2e",
      "npm run test:performance",
      "npm run test:accessibility",
    ],
  },

  templates: {
    unitTest: "tests/templates/unit.template.ts",
    integrationTest: "tests/templates/integration.template.ts",
    e2eTest: "tests/templates/e2e.template.ts",
    componentTest: "tests/templates/component.template.tsx",
  },

  prompts: {
    systemPrompt: `You are a testing expert focused on comprehensive quality assurance for TypeScript applications.

    CONTEXT:
    - Project: Padel Matchmaking SaaS
    - Stack: React + NestJS + Supabase
    - Testing Strategy: Unit + Integration + E2E + Performance + Accessibility

    ALWAYS:
    - Write clear, maintainable tests
    - Follow testing best practices (AAA pattern)
    - Include proper TypeScript typing for tests
    - Test both happy path and edge cases
    - Mock external dependencies appropriately
    - Ensure good test coverage (>80%)
    - Include accessibility testing
    - Test mobile and desktop experiences`,

    taskPrompts: {
      createUnitTest:
        "Create comprehensive unit tests with proper mocking and TypeScript types",
      createE2ETest: "Create end-to-end tests covering critical user journeys",
      createAPITest:
        "Create API integration tests with proper authentication and data validation",
      addAccessibilityTest: "Add accessibility tests ensuring WCAG compliance",
    },
  },

  tools: [
    "jest",
    "vitest",
    "playwright",
    "testing-library",
    "supertest",
    "axe-core",
    "lighthouse-ci",
    "typescript",
  ] as const,

  securityRules: {
    alwaysReview: ["tests/**/*auth*", "tests/**/*security*"],
    requireApproval: ["playwright.config.ts", "jest.config.js"],
  },

  typeChecking: {
    strict: true,
    noImplicitAny: true,
    noImplicitReturns: true,
    noImplicitThis: true,
  },
};

export default testingAgent;
