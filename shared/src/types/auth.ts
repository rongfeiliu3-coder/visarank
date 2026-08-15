export interface User {
  id: string;
  email: string;
  name?: string;
  role?: 'admin' | 'user';
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role?: 'admin' | 'user';
  exp: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface UserAssessmentRecord {
  id: string;
  userId?: string;
  title: string;
  profileSnapshot: any;
  resultSnapshot: any;
  createdAt: string;
}

export interface SaveAssessmentInput {
  title?: string;
  profileSnapshot: any;
  resultSnapshot: any;
}
