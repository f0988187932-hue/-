
import React, { useState } from 'react';
import { Search, Plus, Eye, MoreHorizontal, Phone, Mail } from 'lucide-react';
import { Customer, CustomerRole } from '../types';

const CustomerPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const customers: Customer[] = [
    { id: '1', name: '王小明', role: 'Tenant', status: 'Closed', phone: '0912-345-678', email: 'ming@example.com', relatedProperty: '忠孝東路大樓', source: '591', createdAt: '2024-04-10', viewingCount: 3, lastViewingStatus: '考慮中，回訪意願高' },
    { id: '2', name: '李美華', role: 'Landlord', status: 'Closed', phone: '0922-111-222', email: 'hua@example.com', relatedProperty: '民生東路套房', source: 'FB', createdAt: '2024-03-15', viewingCount: 0, lastViewingStatus: '直接委託' },
    { id: '4', name: '趙子龍', role: 'Prospect', status: 'Developing', phone: '0988-777-666', email: 'long@example.com', source: '電話開發', createdAt: '2024-04-20', viewingCount: 5, lastViewingStatus: '已看過三間，偏好捷運周邊' },
  ];

  const getRoleBadge = (role: CustomerRole) => {
    switch (role) {
      case 'Landlord': return <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[10px] font-bold">房東</span>;
      case 'Tenant': return <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">承租人</span>;
      default: return <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">潛在客</span>;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">客戶 CRM 系統</h2>
          <p className="text-xs md:text-sm text-slate-500">管理帶看進度與成交客</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl flex items-center justify-center space-x-2 hover:bg-indigo-700 transition shadow-md font-bold text-sm w-full md:w-auto">
          <Plus size={18} />
          <span>新增客戶</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="搜尋姓名、電話、帶看狀況..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 電腦版表格 */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black border-b tracking-widest">
            <tr>
              <th className="px-6 py-4">客戶名稱</th>
              <th className="px-6 py-4">身份</th>
              <th className="px-6 py-4 text-center">帶看次數</th>
              <th className="px-6 py-4">最新帶看狀況</th>
              <th className="px-6 py-4">聯絡資訊</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-bold text-slate-800">{customer.name}</td>
                <td className="px-6 py-4">{getRoleBadge(customer.role)}</td>
                <td className="px-6 py-4 text-center font-black text-indigo-600">{customer.viewingCount}</td>
                <td className="px-6 py-4 text-xs text-slate-500 max-w-[200px] truncate">{customer.lastViewingStatus}</td>
                <td className="px-6 py-4 text-xs font-mono">{customer.phone}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-indigo-600"><MoreHorizontal size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 手機版卡片 */}
      <div className="md:hidden space-y-3">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm">
                    {customer.name.charAt(0)}
                </div>
                <div>
                    <p className="font-bold text-slate-800 text-base">{customer.name}</p>
                    <div className="flex gap-1 mt-0.5">{getRoleBadge(customer.role)}</div>
                </div>
              </div>
              <div className="bg-indigo-50 px-2 py-1 rounded-lg text-center">
                  <p className="text-[9px] text-indigo-400 font-black uppercase">帶看</p>
                  <p className="text-sm font-black text-indigo-600">{customer.viewingCount}</p>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
                <p className="text-[10px] text-slate-400 font-black uppercase mb-1">最新進度回報</p>
                <p className="text-xs text-slate-600 leading-relaxed italic">{customer.lastViewingStatus}</p>
            </div>
            <div className="flex gap-2 pt-1">
                <a href={`tel:${customer.phone}`} className="flex-1 bg-white border border-slate-200 py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-slate-600">
                    <Phone size={14} className="text-indigo-500" /> 撥打電話
                </a>
                <button className="flex-1 bg-white border border-slate-200 py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-slate-600">
                    <Mail size={14} className="text-indigo-500" /> 發送郵件
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerPage;
