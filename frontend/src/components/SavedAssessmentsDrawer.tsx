import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Clock, ArrowRight, FolderCheck } from 'lucide-react';
import type { UserAssessmentRecord } from '@emigrant/shared';
import { fetchAssessmentHistory } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface SavedAssessmentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAssessment?: (record: UserAssessmentRecord) => void;
}

export const SavedAssessmentsDrawer: React.FC<SavedAssessmentsDrawerProps> = ({
  isOpen,
  onClose,
  onSelectAssessment,
}) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [records, setRecords] = useState<UserAssessmentRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchAssessmentHistory().then((res) => {
        if (res.success && res.data) {
          setRecords(res.data);
        }
        setLoading(false);
      });
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end select-none">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Canvas */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="relative w-full max-w-md bg-[#faf9f5] h-full shadow-2xl flex flex-col border-l border-[#e6dfd8] z-10"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#e6dfd8] flex items-center justify-between bg-[#efe9de]/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#181715] text-white flex items-center justify-center">
              <FolderCheck className="w-4 h-4 text-[#c2410c]" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-stone-900 leading-tight">
                我的全球测算方案智库
              </h2>
              <p className="text-[10px] text-stone-500 font-mono mt-0.5">
                {isAuthenticated ? `已登录: ${user?.name || user?.email}` : '未登录 (展示本地离线快照)'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-[#efe9de] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5 select-text">
          {!isAuthenticated && (
            <div className="p-3.5 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] space-y-2 text-xs">
              <p className="text-stone-700 leading-relaxed text-[11px]">
                💡 您当前处于离线访客模式。登录后可永久将测算方案跨设备同步并接收政策变动提醒。
              </p>
              <button
                onClick={() => openAuthModal('login')}
                className="w-full py-2 rounded-xl bg-[#c2410c] text-white text-xs font-semibold hover:bg-[#9a3412] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>立即登录同步云端</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {loading ? (
            <div className="py-12 text-center text-xs font-mono text-stone-400">
              加载方案列表中...
            </div>
          ) : records.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Clock className="w-8 h-8 text-stone-300 mx-auto" />
              <div className="text-xs font-semibold text-stone-700">暂无已保存的测算方案</div>
              <p className="text-[11px] text-stone-400 max-w-xs mx-auto leading-relaxed">
                在右侧点击“开始智能测算”，完成 6 维问卷后即可一键保存并对比推荐梯队。
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {records.map((record) => {
                const profile = record.profileSnapshot || {};
                const results = Array.isArray(record.resultSnapshot) ? record.resultSnapshot : [];
                const tier1Count = results.filter((r: any) => r.tier === 'tier1').length;

                return (
                  <div
                    key={record.id}
                    className="p-4 rounded-2xl bg-[#faf9f5] hover:bg-white border border-[#e6dfd8] hover:border-[#c2410c]/50 shadow-xs transition-all space-y-2.5 group"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-[#e6dfd8]/60 pb-2">
                      <div>
                        <div className="font-bold text-xs text-stone-900 font-serif">
                          {record.title}
                        </div>
                        <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                          {record.createdAt.replace('T', ' ').substring(0, 16)}
                        </div>
                      </div>

                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#eaf6ed] text-[#2e7d32] border border-[#c5e8ce]">
                        {tier1Count} 国极力推荐
                      </span>
                    </div>

                    {/* Snapshot Tag Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono text-stone-600">
                      {profile.age && <span className="px-1.5 py-0.5 rounded bg-[#efe9de]">{profile.age}岁</span>}
                      {profile.educationLevel && (
                        <span className="px-1.5 py-0.5 rounded bg-[#efe9de]">
                          {profile.educationLevel === 'vocational' ? '大专/技工' :
                           profile.educationLevel === 'bachelor' ? '本科' :
                           profile.educationLevel === 'master' ? '硕士' : '博士'}
                        </span>
                      )}
                      {profile.fieldCategory && (
                        <span className="px-1.5 py-0.5 rounded bg-[#efe9de]">{profile.fieldCategory}</span>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-1 flex items-center justify-between">
                      <div className="text-[11px] font-mono text-stone-400">
                        匹配度: {results[0]?.matchScore || 85}%
                      </div>
                      {onSelectAssessment && (
                        <button
                          onClick={() => {
                            onSelectAssessment(record);
                            onClose();
                          }}
                          className="text-xs font-semibold text-[#c2410c] hover:text-[#9a3412] flex items-center gap-1 transition-colors"
                        >
                          <span>查看方案详情</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
