// .claude/config.ts
import { ClaudeConfig } from "./types/agent.types";
import backendAgent from "./agents/back-end-agent";
import frontendAgent from "./agents/front-end-agent";
import cicdAgent from "./agents/cicd-agent";
import testingAgent from "./agents/testing-agent";

const config: ClaudeConfig = {
  // Configuration globale
  autoApprove: true,
  verbose: true,

  // Agents disponibles avec typage strict
  agents: {
    backend: backendAgent,
    frontend: frontendAgent,
    cicd: cicdAgent,
    testing: testingAgent,
  },

  // Règles d'auto-sélection d'agent avec patterns typés
  autoAgentSelection: {
    "**/*.controller.ts": "backend",
    "**/*.service.ts": "backend",
    "**/*.module.ts": "backend",
    "**/*.dto.ts": "backend",
    "**/*.entity.ts": "backend",
    "**/*.guard.ts": "backend",
    "**/*.interceptor.ts": "backend",

    "**/*.tsx": "frontend",
    "**/*.css": "frontend",
    "**/components/**": "frontend",
    "**/pages/**": "frontend",
    "**/hooks/**": "frontend",
    "**/stores/**": "frontend",

    ".github/workflows/**": "cicd",
    "Dockerfile*": "cicd",
    "docker-compose.yml": "cicd",
    "vercel.json": "cicd",
    "railway.json": "cicd",

    "supabase/migrations/**": "database",
    "supabase/**/*.sql": "database",
    "prisma/**": "database",

    "**/*.test.ts": "testing",
    "**/*.test.tsx": "testing",
    "**/*.spec.ts": "testing",
    "**/*.spec.tsx": "testing",
    "tests/**": "testing",
    "e2e/**": "testing",
    "playwright.config.ts": "testing",
  },

  // Workflows multi-agents avec typage
  workflows: {
    "create-feature": [
      {
        agent: "database",
        task: "Design database schema and create migrations",
        timeout: 90000,
      },
      {
        agent: "backend",
        task: "Create API endpoints with proper TypeScript types",
        dependsOn: ["database"],
        timeout: 120000,
      },
      {
        agent: "frontend",
        task: "Create UI components with TypeScript interfaces",
        dependsOn: ["backend"],
        timeout: 90000,
      },
      {
        agent: "testing",
        task: "Create comprehensive tests for all layers",
        dependsOn: ["backend", "frontend"],
        timeout: 120000,
      },
      {
        agent: "cicd",
        task: "Update deployment pipeline",
        dependsOn: ["testing"],
      },
    ],

    "add-endpoint": [
      {
        agent: "backend",
        task: "Create controller and service with full TypeScript typing",
      },
      {
        agent: "frontend",
        task: "Update API client with new endpoint types",
      },
    ],

    "deploy-feature": [
      {
        agent: "testing",
        task: "Run comprehensive test suite",
      },
      {
        agent: "backend",
        task: "Run backend tests and type checking",
        dependsOn: ["testing"],
      },
      {
        agent: "frontend",
        task: "Run frontend tests and build validation",
        dependsOn: ["testing"],
      },
      {
        agent: "cicd",
        task: "Deploy to staging with health checks",
        dependsOn: ["backend", "frontend"],
      },
    ],
  },

  // Communication inter-agents
  collaboration: {
    sharedContext: ".claude/shared-context.json",
    communicationProtocol: "json",
    handoffRules: {
      "database-to-backend":
        "Share database schema, types, and migration scripts",
      "backend-to-frontend": "Share API types, endpoints, and response schemas",
      "frontend-to-testing":
        "Share component interfaces and user flow requirements",
      "testing-to-cicd":
        "Share test results, coverage reports, and quality gates",
      "any-to-cicd": "Share build requirements and deployment specifications",
    },
  },
};

export default config;
