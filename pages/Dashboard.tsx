
import React, { useState, useEffect } from 'react';
// Fix: Added missing import for Link
import { Link } from 'react-router-dom';
import { 
  TrendingUp, TrendingDown, Users, DollarSign, 
  Calendar, AlertCircle, Sparkles, Loader2,
  // Fix: Added missing import for BrainCircuit
  BrainCircuit 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { generateBusinessSummary } from '../services/geminiService';

const mockChartData = [
  { name: '1月', income: 400000, expense: 240000 },
  { name: '2月', income: 300000, expense: 139000 },
  { name: '3月', income: 200000, expense: 980000 },
  { name: '4月', income: 278000, expense: 390000 },
  { name: '5月', income: 189000, expense: 480000 },
  { name: '6月', income: 239000, expense: 380000 },
  { name: '7月', income: 349000, expense: 430000 },
];

const Dashboard: React.FC = () => {
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  const dashboardData = {
    transactionsCount: 12,
    totalSales: 15800000,
    expiringContractsCount: 5,
    rentalsCount: 48,
    totalIncome: 850000,
    totalExpenses: 520000
  };

  const fetchAiInsight = async () => {
    setLoadingAi(true);
    const summary = await generateBusinessSummary(dashboardData);
    setAiSummary(summary);
    setLoadingAi(false);
  };

  useEffect(() => {
    fetchAiInsight();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">歡迎回來，系統管理員</h2>
          <p className="text-slate-500 text-sm">這是您今日的經營概覽。</p>
        </div>
        <div className="flex space-x-2">
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">今日日期</p>
            <p className="text-sm font-bold">{new Date().toLocaleDateString('zh-TW')}</p>
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="本月成交" 
          value={`$${dashboardData.totalSales.toLocaleString()}`} 
          sub="比上月 +12.5%" 
          icon={DollarSign} 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="新增客戶" 
          value="24" 
          sub="活躍中 188 位" 
          icon={Users} 
          color="bg-indigo-500" 
        />
        <StatCard 
          title="包租代管" 
          value={dashboardData.rentalsCount.toString()} 
          sub="入住率 94%" 
          icon={TrendingUp} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="合約提醒" 
          value={dashboardData.expiringContractsCount.toString()} 
          sub="30天內即將到期" 
          icon={AlertCircle} 
          color="bg-orange-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">營收趨勢分析</h3>
            <select className="text-xs border rounded px-2 py-1 outline-none">
              <option>過去 6 個月</option>
              <option>過去一年</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar dataKey="income" name="收入" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="支出" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Section */}
        <div className="bg-gradient-to-br from-indigo-700 to-violet-800 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles size={20} className="text-indigo-200" />
            <h3 className="font-bold">AI 經營洞察摘要</h3>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-h-[200px] text-sm leading-relaxed border border-white/20">
            {loadingAi ? (
              <div className="flex flex-col items-center justify-center h-full space-y-3">
                <Loader2 className="animate-spin text-white/50" />
                <p className="text-indigo-100">AI 正在分析您的營運數據...</p>
              </div>
            ) : (
              <p className="whitespace-pre-line">{aiSummary}</p>
            )}
          </div>
          
          <button 
            onClick={fetchAiInsight}
            disabled={loadingAi}
            className="mt-4 w-full py-2 bg-white text-indigo-700 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {/* Fix: BrainCircuit is now imported */}
            <BrainCircuit size={16} />
            <span>重新生成洞察</span>
          </button>
        </div>
      </div>

      {/* Bottom Section: Expiration Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 flex items-center space-x-2">
              <Calendar size={18} className="text-orange-500" />
              <span>合約即將到期提醒</span>
            </h3>
            {/* Fix: Link is now imported */}
            <Link to="/rentals" className="text-xs text-indigo-600 font-medium hover:underline">查看全部</Link>
          </div>
          <div className="space-y-4">
            <AlertItem title="台北市信義區莊敬路透天" date="2024/05/15" type="租約" daysLeft={12} />
            <AlertItem title="新北市板橋區縣民大道公寓" date="2024/05/20" type="租約" daysLeft={17} />
            <AlertItem title="台中市西屯區河南路華廈" date="2024/06/02" type="管理" daysLeft={30} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">最新成交動態</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <div>
                <p className="font-semibold">林大華 (承租人) - 民生社區套房</p>
                <p className="text-slate-500 text-xs">經辦經紀人：張小明</p>
              </div>
              <p className="font-bold text-indigo-600">成交 $25,000/月</p>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <div>
                <p className="font-semibold">王美玲 (買方) - 永和區預售屋</p>
                <p className="text-slate-500 text-xs">經辦經紀人：李美珍</p>
              </div>
              <p className="font-bold text-indigo-600">成交 $18,500,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
    <div>
      <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-400 mt-1">{sub}</p>
    </div>
    <div className={`p-3 rounded-lg ${color} text-white`}>
      <Icon size={24} />
    </div>
  </div>
);

const AlertItem = ({ title, date, type, daysLeft }: any) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
    <div className="flex items-center space-x-3">
      <div className={`w-2 h-2 rounded-full ${daysLeft < 15 ? 'bg-red-500' : 'bg-orange-400'}`}></div>
      <div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <p className="text-xs text-slate-500">{type} • {date}</p>
      </div>
    </div>
    <span className={`px-2 py-1 rounded text-[10px] font-bold ${daysLeft < 15 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
      剩餘 {daysLeft} 天
    </span>
  </div>
);

export default Dashboard;
