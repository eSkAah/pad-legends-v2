// .claude/types/agent.types.ts

export interface AgentConfig {
  name: string;
  role: string;
  expertise: readonly string[];
  context: Record<string, any>;
  workingDirectory: string;
  watchPatterns: string[];
  autoActions: AutoActions;
  templates?: Record<string, string>;
  prompts: AgentPrompts;
  tools: readonly string[];
  securityRules: SecurityRules;
  typeChecking?: TypeCheckingConfig;
  performance?: PerformanceConfig;
}

export interface AutoActions {
  afterCodeGeneration: string[];
  beforeDeployment: string[];
  onError?: string[];
  beforeCommit?: string[];
}

export interface AgentPrompts {
  systemPrompt: string;
  taskPrompts: Record<string, string>;
  contextPrompts?: Record<string, string>;
}

export interface SecurityRules {
  alwaysReview: string[];
  requireApproval: string[];
  neverAutoApprove?: string[];
  sensitivePatterns?: string[];
}

export interface TypeCheckingConfig {
  strict: boolean;
  noImplicitAny: boolean;
  noImplicitReturns: boolean;
  noImplicitThis: boolean;
  strictNullChecks?: boolean;
  strictFunctionTypes?: boolean;
}

export interface PerformanceConfig {
  cacheEnabled: boolean;
  maxConcurrentTasks: number;
  timeoutMs: number;
  memoryLimitMb: number;
}

export interface WorkflowStep {
  agent: string;
  task: string;
  dependsOn?: string[];
  timeout?: number;
  retries?: number;
}

export interface AgentWorkflow {
  name: string;
  description: string;
  steps: WorkflowStep[];
  onSuccess?: string[];
  onFailure?: string[];
}

export interface ClaudeConfig {
  autoApprove: boolean;
  verbose: boolean;
  agents: Record<string, AgentConfig>;
  autoAgentSelection: Record<string, string>;
  workflows: Record<string, WorkflowStep[]>;
  collaboration: CollaborationConfig;
}

export interface CollaborationConfig {
  sharedContext: string;
  handoffRules: Record<string, string>;
  communicationProtocol: "json" | "yaml" | "markdown";
}
