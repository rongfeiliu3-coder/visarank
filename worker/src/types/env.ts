import type { User } from '@emigrant/shared';

export interface Env {
  Bindings: {
    DB: D1Database;
    POLICY_CACHE?: KVNamespace;
    ENVIRONMENT?: string;
    DEEPSEEK_API_KEY?: string;
    JWT_SECRET?: string;
    ADMIN_SECRET?: string;
  };
  Variables: {
    requestId: string;
    user?: User;
  };
}
