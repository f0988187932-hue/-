
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ArrowUpCircle, ArrowDownCircle, Wallet, Download } from 'lucide-react';

const FinancePage: React.FC = () => {
  const data = [
    { name: '佣金收入', value: 850000, color: '#6366f1' },
    { name: '代管手續費', value: 120000, color: '#10b981' },
    { name: '員工薪資', value: 450000, color: '#f43f5e' },
    { name: '行銷支出', value: 80000, color: '#f59e0b' },
    { name: '辦公室租金', value: 120000, color: '#64748b' },
  ];

  const recentTransactions = [
    { id: 'F-1001', date: '2024-04-20', type: 'Income', category: '佣金', amount: 320000, desc: '忠孝東路案結案佣金' },
    { id: 'F-1002', date: '2024-04-18', type: 'Expense', category: '行銷', amount: 15000, desc: 'FB 物件廣告費' },
    { id: 'F-1003', date: '2024-04-15', type: 'Expense', category: '薪資', amount: 233200, desc: '4月份員工薪資發放' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">公司財務管理</h2>
        <button className="bg-white border text-slate-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-slate-50">
          <Download size={18} />
          <span>導出年度報表</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 lg:col-span-1">
          <h3 className="font-bold text-slate-800 mb-6">收支分佈圖</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl flex items-center space-x-4">
                 <ArrowUpCircle className="text-emerald-600" size={32} />
                 <div>
                    <p className="text-xs text-emerald-600 font-bold">本月總收入</p>
                    <p className="text-2xl font-bold text-slate-800">$970,000</p>
                 </div>
              </div>
              <div className="bg-rose-50 border border-rose-100 p-5 rounded-xl flex items-center space-x-4">
                 <ArrowDownCircle className="text-rose-600" size={32} />
                 <div>
                    <p className="text-xs text-rose-600 font-bold">本月總支出</p>
                    <p className="text-2xl font-bold text-slate-800">$665,000</p>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-4 border-b font-bold flex items-center space-x-2">
                 <Wallet size={18} className="text-slate-400" />
                 <span>近期收支明細</span>
              </div>
              <table className="w-full text-left">
                 <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold border-b">
                    <tr>
                       <th className="px-6 py-3">日期</th>
                       <th className="px-6 py-3">分類</th>
                       <th className="px-6 py-3">描述</th>
                       <th className="px-6 py-3 text-right">金額</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {recentTransactions.map((t) => (
                       <tr key={t.id} className="text-sm">
                          <td className="px-6 py-4 text-slate-500">{t.date}</td>
                          <td className="px-6 py-4">
                             <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${t.type === 'Income' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                {t.category}
                             </span>
                          </td>
                          <td className="px-6 py-4 font-medium">{t.desc}</td>
                          <td className={`px-6 py-4 text-right font-bold ${t.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                             {t.type === 'Income' ? '+' : '-'}${t.amount.toLocaleString()}
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;
