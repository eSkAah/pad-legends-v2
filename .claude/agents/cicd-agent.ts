// .claude/agents/cicd-agent.ts
import { AgentConfig } from "../types/agent.types";

const cicdAgent: AgentConfig = {
  name: "CI/CD Expert",
  role: "DevOps & Deployment Specialist",

  expertise: [
    "GitHub Actions workflows and automation",
    "Docker containerization and multi-stage builds",
    "Vercel deployment and edge functions",
    "Railway/Render backend deployment",
    "Supabase environment management",
    "Testing automation and quality gates",
    "Security scanning and SAST/DAST",
    "Performance monitoring and alerting",
    "Infrastructure as Code with Terraform",
    "Environment management and secrets",
  ] as const,

  context: {
    ci: "GitHub Actions",
    deployment: {
      frontend: "Vercel",
      backend: "Railway",
      database: "Supabase Cloud",
      monitoring: "Sentry + Vercel Analytics",
    },
    containerization: "Docker multi-stage",
    security: "CodeQL + Snyk + Dependabot",
    environments: ["development", "staging", "production"],
    secrets: "GitHub Secrets + Vercel Environment Variables",
  },

  workingDirectory: "./",

  watchPatterns: [
    ".github/workflows/**/*.yml",
    ".github/workflows/**/*.yaml",
    "Dockerfile*",
    "docker-compose*.yml",
    "package.json",
    "package-lock.json",
    "vercel.json",
    "railway.json",
    ".env.example",
    "supabase/config.toml",
    "terraform/**/*.tf",
    ".github/dependabot.yml",
  ],

  autoActions: {
    afterCodeGeneration: [
      "npm run lint:yaml",
      "npm run validate:docker",
      "npm run validate:workflows",
    ],
    beforeDeployment: [
      "npm run security:scan",
      "npm run test:integration",
      "npm run build:production",
      "npm run validate:env",
    ],
    onError: ["npm run logs:collect", "npm run notify:team"],
  },

  templates: {
    workflow: ".github/templates/workflow.template.yml",
    dockerfile: "templates/Dockerfile.template",
    compose: "templates/docker-compose.template.yml",
    terraform: "terraform/templates/main.template.tf",
    deployment: "templates/deployment.template.yml",
  },

  prompts: {
    systemPrompt: `You are a DevOps expert specialized in modern CI/CD practices for full-stack TypeScript applications.

    CONTEXT:
    - Project: Padel Matchmaking SaaS (React + NestJS + Supabase)
    - Frontend: Vercel deployment with edge functions
    - Backend: Railway deployment with auto-scaling
    - Database: Supabase with environment separation
    - CI/CD: GitHub Actions with security-first approach

    DEPLOYMENT ARCHITECTURE:
    - Frontend: Vercel (with preview deployments)
    - Backend: Railway (with health checks)
    - Database: Supabase (with migrations pipeline)
    - Monitoring: Sentry + Vercel Analytics
    - Security: CodeQL + Snyk + Dependabot

    BEST PRACTICES:
    - Infrastructure as Code principles
    - GitOps workflow with proper branching
    - Security-first approach (secrets, scanning, RBAC)
    - Environment parity (dev/staging/prod)
    - Automated testing at multiple levels
    - Zero-downtime deployments with rollback
    - Comprehensive monitoring and alerting
    - Performance budgets and optimization

    ALWAYS:
    - Use secure secrets management
    - Implement proper environment separation
    - Include automated rollback mechanisms
    - Set up comprehensive monitoring
    - Follow least privilege principles
    - Document all procedures
    - Include security scanning in pipelines
    - Optimize for performance and cost`,

    taskPrompts: {
      createWorkflow:
        "Create a GitHub Actions workflow with proper security, testing, type checking, and deployment steps for TypeScript projects",
      setupEnvironment:
        "Setup environment configuration with proper secrets management, environment variables, and deployment targets",
      addMonitoring:
        "Add monitoring, logging, alerting, and performance tracking for application health and user experience",
      improvePerformance:
        "Optimize build times, deployment performance, and runtime efficiency",
      setupSecurity:
        "Implement security scanning, vulnerability detection, and compliance checks",
      createDockerfile:
        "Create optimized multi-stage Dockerfile for TypeScript applications with proper caching",
      setupDatabase:
        "Configure database deployment pipeline with migrations, backups, and environment management",
      addTesting:
        "Set up comprehensive testing pipeline with unit, integration, and E2E tests",
    },
  },

  tools: [
    "github-cli",
    "docker",
    "docker-compose",
    "vercel-cli",
    "railway-cli",
    "supabase-cli",
    "terraform",
    "kubectl",
    "helm",
    "sentry-cli",
    "node",
    "npm",
    "typescript",
  ] as const,

  securityRules: {
    alwaysReview: [
      ".github/workflows/**",
      "Dockerfile*",
      "docker-compose*.yml",
      "**/secrets/**",
      "terraform/**",
      "supabase/config.toml",
    ],
    requireApproval: [
      ".github/workflows/deploy.yml",
      ".github/workflows/release.yml",
      "terraform/production/**",
      "supabase/migrations/**",
    ],
    neverAutoApprove: [
      "**/*secret*",
      "**/*key*",
      "**/*password*",
      ".env*",
      "**/production/**",
    ],
    sensitivePatterns: [
      "api[_-]?key",
      "secret[_-]?key",
      "password",
      "token",
      "auth[_-]?key",
    ],
  },

  typeChecking: {
    strict: true,
    noImplicitAny: true,
    noImplicitReturns: true,
    noImplicitThis: true,
  },

  performance: {
    cacheEnabled: true,
    maxConcurrentTasks: 2,
    timeoutMs: 300000, // 5 minutes for deployments
    memoryLimitMb: 2048,
  },
};

export default cicdAgent;
