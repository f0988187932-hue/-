
import React, { useState } from 'react';
import { BadgeDollarSign, User, TrendingUp, Plus, Trash2, Edit3, X, Save } from 'lucide-react';
import { PayrollRecord, DeductionItem } from '../types';

const PayrollPage: React.FC = () => {
  const [showDeductionModal, setShowDeductionModal] = useState<string | null>(null);
  const [tempDeductions, setTempDeductions] = useState<DeductionItem[]>([]);
  
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>([
    { id: 'EMP01', name: '張小明', role: '高級經紀人', base: 35000, bonus: 45000, deductions: [{ type: 'Late', reason: '遲到三次', amount: 500 }], status: 'Paid' },
    { id: 'EMP02', name: '李美玲', role: '中級經紀人', base: 30000, bonus: 85000, deductions: [], status: 'Pending' },
    { id: 'EMP03', name: '王大偉', role: '行政專員', base: 42000, bonus: 2000, deductions: [{ type: 'Leave', reason: '事假兩天', amount: 2800 }], status: 'Paid' },
  ]);

  const openDeductionModal = (empId: string) => {
    const emp = payrolls.find(p => p.id === empId);
    setTempDeductions(emp?.deductions || []);
    setShowDeductionModal(empId);
  };

  const addDeduction = () => {
    setTempDeductions([...tempDeductions, { type: 'Other', reason: '', amount: 0 }]);
  };

  const saveDeductions = () => {
    setPayrolls(payrolls.map(p => 
      p.id === showDeductionModal ? { ...p, deductions: tempDeductions } : p
    ));
    setShowDeductionModal(null);
  };

  const calculateTotal = (p: PayrollRecord) => {
    const totalDeduction = p.deductions.reduce((sum, d) => sum + d.amount, 0);
    return p.base + p.bonus - totalDeduction;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">員工薪資結算系統</h2>
          <p className="text-sm text-slate-500">精確輸入員工底薪、獎金及獎懲細項</p>
        </div>
        <select className="border-none bg-white shadow-sm px-4 py-2 rounded-xl text-sm font-black text-indigo-600 outline-none">
          <option>2024 年 4 月</option>
          <option>2024 年 3 月</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-lg shadow-indigo-100 relative overflow-hidden">
          <BadgeDollarSign className="absolute -right-4 -bottom-4 text-white/10" size={120} />
          <p className="text-indigo-100 text-xs font-black uppercase tracking-widest">本月預計支出</p>
          <p className="text-3xl font-black mt-2">${payrolls.reduce((sum, p) => sum + calculateTotal(p), 0).toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><TrendingUp /></div>
            <div>
                <p className="text-slate-400 text-[10px] font-black uppercase">本月發放獎金</p>
                <p className="text-2xl font-black text-slate-800">${payrolls.reduce((sum, p) => sum + p.bonus, 0).toLocaleString()}</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-slate-50 text-slate-500 rounded-2xl"><User /></div>
            <div>
                <p className="text-slate-400 text-[10px] font-black uppercase">受薪人數</p>
                <p className="text-2xl font-black text-slate-800">{payrolls.length} 位</p>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b">
            <tr>
              <th className="px-6 py-4">員工資訊</th>
              <th className="px-6 py-4">基本底薪</th>
              <th className="px-6 py-4">業績獎金</th>
              <th className="px-6 py-4">扣款細項</th>
              <th className="px-6 py-4">實領總額</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {payrolls.map((p) => {
              const totalDeduction = p.deductions.reduce((sum, d) => sum + d.amount, 0);
              return (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <p className="font-black text-slate-800">{p.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{p.role}</p>
                  </td>
                  <td className="px-6 py-5 font-mono font-bold text-slate-600">${p.base.toLocaleString()}</td>
                  <td className="px-6 py-5 font-mono font-bold text-emerald-600">+${p.bonus.toLocaleString()}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold text-rose-500 ${totalDeduction > 0 ? '' : 'text-slate-200'}`}>
                            -${totalDeduction.toLocaleString()}
                        </span>
                        <button 
                            onClick={() => openDeductionModal(p.id)}
                            className="p-1.5 hover:bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-indigo-600 shadow-sm transition-colors"
                        >
                            <Edit3 size={14} />
                        </button>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl font-mono font-black text-base">
                        ${calculateTotal(p).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${p.status === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                        {p.status === 'Paid' ? '已發放' : '核算中'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 獎懲細項輸入 Modal */}
      {showDeductionModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50/50">
                    <h3 className="font-black text-slate-800 flex items-center gap-2">
                        <Edit3 size={18} className="text-indigo-600" />
                        編輯扣款細項：{payrolls.find(p => p.id === showDeductionModal)?.name}
                    </h3>
                    <button onClick={() => setShowDeductionModal(null)} className="text-slate-400 hover:text-rose-500"><X size={20} /></button>
                </div>
                <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                    {tempDeductions.map((d, idx) => (
                        <div key={idx} className="flex gap-3 items-end bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <div className="flex-1 space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase">事由</label>
                                <input 
                                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    value={d.reason}
                                    placeholder="例如：事假兩天"
                                    onChange={(e) => {
                                        const next = [...tempDeductions];
                                        next[idx].reason = e.target.value;
                                        setTempDeductions(next);
                                    }}
                                />
                            </div>
                            <div className="w-24 space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase">金額</label>
                                <input 
                                    type="number"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    value={d.amount}
                                    onChange={(e) => {
                                        const next = [...tempDeductions];
                                        next[idx].amount = Number(e.target.value);
                                        setTempDeductions(next);
                                    }}
                                />
                            </div>
                            <button 
                                onClick={() => setTempDeductions(tempDeductions.filter((_, i) => i !== idx))}
                                className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg transition-colors mb-0.5"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    <button 
                        onClick={addDeduction}
                        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all font-bold text-sm flex items-center justify-center gap-2"
                    >
                        <Plus size={18} /> 新增扣款項目
                    </button>
                </div>
                <div className="p-6 border-t border-slate-100 bg-slate-50/80 flex gap-3">
                    <button 
                        onClick={() => setShowDeductionModal(null)}
                        className="flex-1 py-3 px-4 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition"
                    >
                        取消
                    </button>
                    <button 
                        onClick={saveDeductions}
                        className="flex-2 py-3 px-8 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                    >
                        <Save size={18} /> 保存變更
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default PayrollPage;
