
import React, { useState } from 'react';
import { Plus, Download, Calendar, MapPin, ChevronDown, CheckCircle } from 'lucide-react';

const TransactionPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const transactions = [
    { 
      id: 'TX-44', 
      date: '2024/02/21', 
      address: '館前東路26號3樓', 
      totalDeal: 38000, 
      income: 44000,
      agent: '阿月',
      details: [
        { type: '屋主', name: '鄭太太', amount: 25000 },
        { type: '承租客', name: '林小姐', amount: 19000 }
      ],
      remarks: '首月免管理費'
    },
    { 
      id: 'TX-47', 
      date: '2024/02/15', 
      address: '中山路二段85號1樓', 
      totalDeal: 60000, 
      income: 80000,
      agent: '阿恆',
      details: [
        { type: '屋主', name: '林先生', amount: 40000 },
        { type: '承租客', name: '黃先生', amount: 40000 }
      ],
      remarks: '長約三年'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">成交與佣金結算</h2>
          <p className="text-sm text-slate-500">清晰管理每筆案件的收入拆解與經手業務</p>
        </div>
        <div className="flex gap-2">
            <button className="bg-white border text-slate-700 px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-slate-50 transition shadow-sm font-bold text-sm">
                <Download size={18} className="text-slate-400" />
                <span>匯出 EXCEL</span>
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-indigo-700 transition shadow-lg font-bold text-sm">
                <Plus size={18} />
                <span>新增成交</span>
            </button>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-indigo-200 transition-all">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                        <CheckCircle size={24} />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tx.id}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span className="text-xs font-bold text-slate-500">{tx.date}</span>
                        </div>
                        <h3 className="text-lg font-black text-slate-800 flex items-center gap-1">
                            <MapPin size={16} className="text-rose-500" />
                            {tx.address}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium italic">{tx.remarks || '尚無備註'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-black uppercase">月租/售價</p>
                        <p className="text-lg font-mono font-black text-slate-600">${tx.totalDeal.toLocaleString()}</p>
                    </div>
                    <div className="text-right bg-indigo-50 px-4 py-2 rounded-xl">
                        <p className="text-[10px] text-indigo-400 font-black uppercase tracking-tighter">總佣金收入</p>
                        <p className="text-xl font-mono font-black text-indigo-600">${tx.income.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-black uppercase">經辦人</p>
                        <span className="px-2 py-1 bg-slate-100 rounded-lg text-xs font-black text-slate-600">{tx.agent}</span>
                    </div>
                    <button 
                        onClick={() => setExpandedId(expandedId === tx.id ? null : tx.id)}
                        className={`p-2 rounded-full hover:bg-slate-100 transition-transform ${expandedId === tx.id ? 'rotate-180' : ''}`}
                    >
                        <ChevronDown size={20} className="text-slate-400" />
                    </button>
                </div>
            </div>

            {expandedId === tx.id && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-50 bg-slate-50/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tx.details.map((detail, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-3">
                                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${detail.type === '屋主' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {detail.type}
                                    </span>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{detail.name}</p>
                                        <p className="text-[10px] text-slate-400">來源對象資訊</p>
                                    </div>
                                </div>
                                <p className="font-mono font-black text-slate-700 text-lg">${detail.amount.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionPage;
