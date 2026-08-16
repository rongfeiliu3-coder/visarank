import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Lock, Mail, User as UserIcon, ArrowRight, CheckCircle2, AlertCircle, KeyRound, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sendVerificationCode } from '../services/api';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    authModalPrompt,
    closeAuthModal,
    login,
    register,
    resetPassword,
    triggerPendingAction,
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot_password'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Sync mode with context
  useEffect(() => {
    setMode(authModalMode);
    setErrorMsg('');
    setSuccessMsg('');
  }, [authModalMode, isAuthModalOpen]);

  // Handle countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  if (!isAuthModalOpen) return null;

  const handleSendCode = async () => {
    if (!email || !email.includes('@')) {
      setErrorMsg('请先输入有效的电子邮箱地址');
      return;
    }
    setErrorMsg('');
    setSuccessMsg('');
    setSendingCode(true);

    try {
      const res = await sendVerificationCode({
        email,
        purpose: 'reset_password',
      });
      if (res.success) {
        setSuccessMsg(res.message || '6 位验证码已发送至您的邮箱，请注意查收！');
        setCountdown(60);
      } else {
        setErrorMsg(res.error || '验证码发送失败，请稍后重试');
        if ((res as any).remainingSeconds) {
          setCountdown((res as any).remainingSeconds);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || '网络连接异常');
    } finally {
      setSendingCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setSubmitting(true);

    try {
      if (mode === 'login') {
        const res = await login({ email, password });
        if (res.success) {
          triggerPendingAction();
          closeAuthModal();
        } else {
          setErrorMsg(res.error || '登录失败，请检查账号密码');
        }
      } else if (mode === 'register') {
        const res = await register({ email, password, name });
        if (res.success) {
          triggerPendingAction();
          closeAuthModal();
        } else {
          setErrorMsg(res.error || '注册失败，请稍后重试');
        }
      } else if (mode === 'forgot_password') {
        if (!verificationCode || verificationCode.trim().length !== 6) {
          setErrorMsg('请输入 6 位数字验证码');
          setSubmitting(false);
          return;
        }
        if (!newPassword || newPassword.length < 6) {
          setErrorMsg('新密码至少需要 6 个字符');
          setSubmitting(false);
          return;
        }

        const res = await resetPassword({
          email,
          code: verificationCode.trim(),
          newPassword,
        });

        if (res.success) {
          triggerPendingAction();
          closeAuthModal();
        } else {
          setErrorMsg(res.error || '重置密码失败，请核对验证码');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || '网络连接异常');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 select-none">
      {/* 1. Frosted Blur Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeAuthModal}
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-md transition-opacity"
      />

      {/* 2. Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="relative w-full max-w-md bg-[#faf9f5] border border-[#e6dfd8] shadow-2xl rounded-3xl z-10 p-5 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto my-auto"
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-[#efe9de] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#efe9de] border border-[#e6dfd8] text-[11px] text-stone-700 font-mono">
            <Sparkles className="w-3 h-3 text-[#c2410c]" />
            <span>VISARANK 安全通行证</span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
            {mode === 'login' && '登录以管理您的出海方案'}
            {mode === 'register' && '免费注册专属决策画像'}
            {mode === 'forgot_password' && '安全找回 / 重置登录密码'}
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            {mode === 'login' && '随时同步全球 14 国测算底牌，回溯与对比历史多套路径。'}
            {mode === 'register' && '一键保存当前测算记录，解锁 3 年落地时间线与政策变动预警。'}
            {mode === 'forgot_password' && '输入注册邮箱获取 6 位数字安全验证码，即可秒级完成密码重设。'}
          </p>
        </div>

        {/* Custom Auth Prompt / Access Guard Banner */}
        {authModalPrompt && (
          <div className="p-3 rounded-2xl bg-[#fff7ed] border border-[#fed7aa] text-xs text-[#c2410c] flex items-start gap-2.5 font-medium leading-relaxed shadow-2xs animate-in fade-in duration-200">
            <Sparkles className="w-4 h-4 text-[#c2410c] flex-shrink-0 mt-0.5" />
            <span>{authModalPrompt}</span>
          </div>
        )}

        {/* Value Proposition Highlights (Hidden in forgot password mode to reduce height) */}
        {mode !== 'forgot_password' && (
          <div className="bg-[#efe9de]/60 p-3 rounded-2xl border border-[#e6dfd8] space-y-1.5 text-xs text-stone-700">
            <div className="flex items-center gap-2 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] flex-shrink-0" />
              <span>永久云端保存多份选国对比方案</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] flex-shrink-0" />
              <span>解锁 3 年完整落地规划与法案卡点排雷</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] flex-shrink-0" />
              <span>2026 各国移民配额与获邀门槛即时预警</span>
            </div>
          </div>
        )}

        {/* Success Message Banner */}
        {successMsg && (
          <div className="p-3 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-xs text-[#065f46] flex items-center gap-2 animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Error Banner */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-[#faeaea] border border-[#f5c6c6] text-xs text-[#a62828] flex items-center gap-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-800 font-mono">您的称呼 / 昵称</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例如: 程序员阿海"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] text-base sm:text-xs text-stone-900 focus:outline-none focus:border-[#c2410c]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-800 font-mono">电子邮箱 (Email)</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] text-base sm:text-xs text-stone-900 focus:outline-none focus:border-[#c2410c]"
              />
            </div>
          </div>

          {/* Forgot Password: 6-Digit Code & Send Code Button */}
          {mode === 'forgot_password' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800 font-mono">6 位邮箱验证码</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="6 位数字代码"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] text-base sm:text-xs font-mono tracking-widest text-stone-900 focus:outline-none focus:border-[#c2410c]"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={sendingCode || countdown > 0}
                    onClick={handleSendCode}
                    className="px-3.5 py-2.5 rounded-xl bg-[#efe9de] hover:bg-[#e4dcce] active:bg-[#d8cebe] text-stone-800 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5 min-h-[44px]"
                  >
                    {countdown > 0 ? (
                      <>
                        <Clock className="w-3.5 h-3.5 text-[#c2410c] animate-spin" />
                        <span>{countdown}s 后重发</span>
                      </>
                    ) : sendingCode ? (
                      <span>发送中...</span>
                    ) : (
                      <span>获取验证码</span>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800 font-mono">设置新密码</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="输入新的登录密码 (至少 6 位)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] text-base sm:text-xs text-stone-900 focus:outline-none focus:border-[#c2410c]"
                  />
                </div>
              </div>
            </>
          )}

          {/* Normal Login & Register Password */}
          {mode !== 'forgot_password' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-800 font-mono">密码 (Password)</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot_password');
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    className="text-[11px] text-[#c2410c] hover:underline cursor-pointer"
                  >
                    忘记密码？
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="至少 6 位字符"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] text-base sm:text-xs text-stone-900 focus:outline-none focus:border-[#c2410c]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] active:bg-[#7c2d12] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-card-hover transition-all cursor-pointer disabled:opacity-50 min-h-[44px]"
          >
            {submitting ? (
              <span>处理中...</span>
            ) : (
              <>
                <span>
                  {mode === 'login' && '立即登录并继续'}
                  {mode === 'register' && '创建账号并保存测算'}
                  {mode === 'forgot_password' && '验证并重置新密码'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Mode Switcher */}
        <div className="pt-2 border-t border-[#e6dfd8] text-center text-xs text-stone-500">
          {mode === 'login' && (
            <div>
              还没有 VisaRank 账号？{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="text-[#c2410c] font-bold hover:underline cursor-pointer"
              >
                免费注册新账号
              </button>
            </div>
          )}

          {mode === 'register' && (
            <div>
              已有账号？{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="text-[#c2410c] font-bold hover:underline cursor-pointer"
              >
                直接登录
              </button>
            </div>
          )}

          {mode === 'forgot_password' && (
            <div>
              想起密码了？{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="text-[#c2410c] font-bold hover:underline cursor-pointer"
              >
                返回登录
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
