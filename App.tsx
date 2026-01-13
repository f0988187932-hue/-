
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BadgeCheck, Home, Banknote, 
  BarChart3, FileText, Bell, Menu, X, Database, Save, UploadCloud 
} from 'lucide-react';

import Dashboard from './pages/Dashboard';
import CustomerPage from './pages/CustomerPage';
import TransactionPage from './pages/TransactionPage';
import RentalPage from './pages/RentalPage';
import PayrollPage from './pages/PayrollPage';
import FinancePage from './pages/FinancePage';
import DocumentPage from './pages/DocumentPage';
import PropertyPage from './pages/PropertyPage';

const NavItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link
    to={to}
    className={`flex flex-col items-center justify-center py-2 px-1 transition-all ${
      active ? 'text-indigo-600' : 'text-slate-400'
    }`}
  >
    <Icon size={20} className={active ? 'scale-110' : ''} />
    <span className="text-[10px] mt-1 font-bold">{label}</span>
  </Link>
);

const SidebarLink = ({ to, icon: Icon, label, active, isSidebarOpen }: { to: string, icon: any, label: string, active: boolean, isSidebarOpen: boolean }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
    }`}
  >
    <Icon size={20} />
    {isSidebarOpen && <span className="font-medium whitespace-nowrap">{label}</span>}
  </Link>
);

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('/');

  const handleExportData = () => {
    const data = localStorage.getItem('estate_master_data');
    if (!data) { alert('目前尚無資料可導出'); return; }
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EstateMaster_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        localStorage.setItem('estate_master_data', JSON.stringify(json));
        alert('資料導入成功！');
        window.location.reload();
      } catch (err) { alert('導入失敗，請確認檔案。'); }
    };
    reader.readAsText(file);
  };

  return (
    <Router>
      <div className="flex h-screen bg-slate-50 overflow-hidden font-['Noto_Sans_TC']">
        {/* 電腦版 Sidebar (md以上顯示) */}
        <aside className={`hidden md:flex ${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex-col z-20 shadow-xl`}>
          <div className="p-6 flex items-center justify-between">
            {isSidebarOpen ? <h1 className="font-black text-xl text-indigo-700 tracking-tighter">ESTATE<span className="text-slate-400">MASTER</span></h1> : <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">E</div>}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-100 rounded-md text-slate-400">
              {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto no-scrollbar">
            <SidebarLink to="/" icon={LayoutDashboard} label="儀表板總覽" active={activeTab === '/'} isSidebarOpen={isSidebarOpen} />
            <SidebarLink to="/properties" icon={Database} label="物件資料庫" active={activeTab === '/properties'} isSidebarOpen={isSidebarOpen} />
            <SidebarLink to="/customers" icon={Users} label="客戶 CRM" active={activeTab === '/customers'} isSidebarOpen={isSidebarOpen} />
            <SidebarLink to="/transactions" icon={BadgeCheck} label="成交紀錄" active={activeTab === '/transactions'} isSidebarOpen={isSidebarOpen} />
            <SidebarLink to="/rentals" icon={Home} label="包租代管" active={activeTab === '/rentals'} isSidebarOpen={isSidebarOpen} />
            <div className="pt-4"><SidebarLink to="/payroll" icon={Banknote} label="員工薪資" active={activeTab === '/payroll'} isSidebarOpen={isSidebarOpen} /></div>
          </nav>
          <div className="p-4 border-t border-slate-100 space-y-2">
            <button onClick={handleExportData} className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 rounded-lg transition"><Save size={16} />{isSidebarOpen && <span>備份資料</span>}</button>
            <label className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-bold text-amber-600 hover:bg-amber-50 rounded-lg transition cursor-pointer"><UploadCloud size={16} />{isSidebarOpen && <span>導入資料</span>}<input type="file" accept=".json" onChange={handleImportData} className="hidden" /></label>
          </div>
        </aside>

        {/* 主內容區 */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Header */}
          <header className="h-14 md:h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center space-x-2">
                <div className="md:hidden w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xs">E</div>
                <div className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest truncate max-w-[150px]">
                    <span className="hidden md:inline">ESTATE MASTER / </span>
                    <span className="text-indigo-600">
                        {activeTab === '/' ? 'DASHBOARD' : 
                        activeTab === '/properties' ? 'PROPERTIES' :
                        activeTab === '/customers' ? 'CRM' :
                        activeTab === '/transactions' ? 'DEALS' :
                        activeTab === '/rentals' ? 'RENTAL' : 'PAYROLL'}
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-3">
               <div className="hidden sm:flex bg-slate-100 rounded-full px-2 py-1 items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[9px] font-black text-slate-500">同步中</span>
               </div>
               <button className="p-2 text-slate-400 hover:text-indigo-600"><Bell size={18} /></button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/30 pb-24 md:pb-8">
             <TabListener setActiveTab={setActiveTab} />
             <Routes>
               <Route path="/" element={<Dashboard />} />
               <Route path="/properties" element={<PropertyPage />} />
               <Route path="/customers" element={<CustomerPage />} />
               <Route path="/transactions" element={<TransactionPage />} />
               <Route path="/rentals" element={<RentalPage />} />
               <Route path="/payroll" element={<PayrollPage />} />
             </Routes>
          </div>

          {/* 手機版底部導覽列 (md以下顯示) */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-1 flex justify-between items-center z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
            <NavItem to="/" icon={LayoutDashboard} label="儀表" active={activeTab === '/'} />
            <NavItem to="/properties" icon={Database} label="物件" active={activeTab === '/properties'} />
            <NavItem to="/customers" icon={Users} label="客戶" active={activeTab === '/customers'} />
            <NavItem to="/transactions" icon={BadgeCheck} label="成交" active={activeTab === '/transactions'} />
            <NavItem to="/rentals" icon={Home} label="代管" active={activeTab === '/rentals'} />
            <NavItem to="/payroll" icon={Banknote} label="薪資" active={activeTab === '/payroll'} />
          </nav>
        </main>
      </div>
    </Router>
  );
};

const TabListener = ({ setActiveTab }: { setActiveTab: (t: string) => void }) => {
  const location = useLocation();
  useEffect(() => { setActiveTab(location.pathname); }, [location, setActiveTab]);
  return null;
};

export default App;
