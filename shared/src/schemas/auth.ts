import { z } from 'zod';

export const LoginInputSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少需要 6 个字符'),
});

export const RegisterInputSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少需要 6 个字符'),
  name: z.string().min(1, '请输入姓名或称呼').optional(),
});

export const SaveAssessmentInputSchema = z.object({
  title: z.string().optional(),
  profileSnapshot: z.any(),
  resultSnapshot: z.any(),
});
