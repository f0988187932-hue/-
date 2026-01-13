
import React, { useState } from 'react';
import { Plus, Wallet, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { RentalProperty } from '../types';

const RentalPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const properties: RentalProperty[] = [
    { id: 'R1', address: '長安街A', contractPeriod: '113/12/03-114/12/02', paymentDay: 5, remarks: '房客習慣提早轉帳', monthlyRent: 19000, payments: [{ month: selectedMonth, amount: 19000, status: 'Paid' }] },
    { id: 'R2', address: '新泰路1', contractPeriod: '113/03/10-115/03/09', paymentDay: 10, remarks: '需協助代繳電費', monthlyRent: 18000, payments: [{ month: selectedMonth, amount: 9000, status: 'Pending' }] },
  ];

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-4 md:space-y-6 pb-4">
      {/* 月份選擇器 (橫向滾動) */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {months.map(m => (
          <button
            key={m}
            onClick={() => setSelectedMonth(m)}
            className={`shrink-0 w-16 md:w-20 py-2 md:py-3 rounded-xl transition-all flex flex-col items-center border ${
              selectedMonth === m 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
                : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'
            }`}
          >
            <span className="text-[8px] md:text-[9px] font-black uppercase">Month</span>
            <span className="text-sm md:text-lg font-black">{m}月</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">包租代管控制台</h2>
          <p className="text-xs md:text-sm text-slate-500">{selectedMonth}月 租金收繳清單</p>
        </div>
        <div className="flex gap-2">
            <button className="flex-1 md:flex-none bg-indigo-600 text-white px-4 py-2.5 rounded-xl flex items-center justify-center space-x-2 font-bold text-sm shadow-lg">
                <Plus size={18} />
                <span>新增物件</span>
            </button>
        </div>
      </div>

      {/* 電腦版表格 / 手機版滾動容器 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          <table className="w-full text-left min-w-[700px] md:min-w-full">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b">
              <tr>
                <th className="px-4 md:px-6 py-4">物件地址</th>
                <th className="px-4 md:px-6 py-4">付款日</th>
                <th className="px-4 md:px-6 py-4 text-right">月租金</th>
                <th className="px-4 md:px-6 py-4 text-center">收款狀態</th>
                <th className="px-4 md:px-6 py-4">備註</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {properties.map((p) => {
                const pay = p.payments.find(pm => pm.month === selectedMonth);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/30">
                    <td className="px-4 md:px-6 py-4">
                        <p className="font-bold text-slate-800 text-sm">{p.address}</p>
                        <p className="text-[10px] text-slate-400">{p.contractPeriod}</p>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center">
                        <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded">每月 {p.paymentDay} 日</span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right font-mono font-black text-slate-700">
                        ${p.monthlyRent.toLocaleString()}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black ${
                            pay?.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                            {pay?.status === 'Paid' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                            {pay?.status === 'Paid' ? '已入帳' : '未入帳'}
                        </div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 truncate max-w-[150px]">
                            <MessageSquare size={12} className="text-indigo-400" />
                            {p.remarks}
                        </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 手機版快速統計提示 */}
      <div className="md:hidden grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <p className="text-[10px] font-black text-emerald-600 uppercase">本月已收</p>
              <p className="text-xl font-black text-slate-800">$19,000</p>
          </div>
          <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
              <p className="text-[10px] font-black text-rose-600 uppercase">本月待追</p>
              <p className="text-xl font-black text-slate-800">$18,000</p>
          </div>
      </div>
    </div>
  );
};

export default RentalPage;
