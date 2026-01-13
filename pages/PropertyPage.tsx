
import React, { useState } from 'react';
import { Plus, Search, Home, MapPin, Image as ImageIcon, Tag, Trash2, Camera, MoreVertical } from 'lucide-react';
import { Property, PropertyStatus } from '../types';

const PropertyPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // 模擬資料
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 'P1',
      address: '館前東路26號3樓',
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400'],
      type: '電梯華廈',
      ownerName: '鄭太太',
      status: 'Rented',
      price: 38000,
      description: '生活機能極佳，精緻裝潢',
      createdAt: '2024-02-15'
    },
    {
      id: 'P2',
      address: '中山路二段85號1樓',
      images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400'],
      type: '店面',
      ownerName: '林先生',
      status: 'Available',
      price: 60000,
      description: '黃金地段店面，大面寬',
      createdAt: '2024-03-01'
    },
    {
      id: 'P3',
      address: '信義路1樓',
      images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400'],
      type: '公寓',
      ownerName: '陳先生',
      status: 'Rented',
      price: 22500,
      description: '近捷運站，安靜巷弄',
      createdAt: '2024-01-10'
    }
  ]);

  const getStatusBadge = (status: PropertyStatus) => {
    switch(status) {
      case 'Available': return <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-[10px] font-black uppercase">待租中</span>;
      case 'Rented': return <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-[10px] font-black uppercase">已出租</span>;
      case 'Sold': return <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-[10px] font-black uppercase">已成交</span>;
      case 'Maintaining': return <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-[10px] font-black uppercase">維護中</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">物件圖庫資料庫</h2>
          <p className="text-sm text-slate-500">管理房屋地址、類型與現場照片</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl flex items-center space-x-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 font-bold">
          <Plus size={20} />
          <span>建置新物件</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="搜尋地址、屋主姓名、物件類型..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100">全部狀態</button>
            <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100">電梯大樓</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img 
                    src={property.images[0]} 
                    alt={property.address} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3">
                    {getStatusBadge(property.status)}
                </div>
                <div className="absolute bottom-3 right-3 flex gap-2">
                    <button className="p-2 bg-white/90 backdrop-blur rounded-lg shadow text-slate-600 hover:text-indigo-600">
                        <Camera size={16} />
                    </button>
                    <button className="p-2 bg-white/90 backdrop-blur rounded-lg shadow text-slate-600 hover:text-rose-600">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
            <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-800 line-clamp-1 flex-1">{property.address}</h3>
                    <button className="text-slate-300 hover:text-slate-600">
                        <MoreVertical size={16} />
                    </button>
                </div>
                <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400">
                    <span className="flex items-center gap-1"><Tag size={12} className="text-indigo-400" /> {property.type}</span>
                    <span className="flex items-center gap-1"><Home size={12} className="text-indigo-400" /> {property.ownerName}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 min-h-[32px]">
                    {property.description}
                </p>
                <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
                    <p className="text-lg font-black text-indigo-600 font-mono">${property.price.toLocaleString()}<span className="text-[10px] text-slate-400 ml-1">/月</span></p>
                    <span className="text-[10px] font-bold text-slate-300 uppercase">{property.createdAt}</span>
                </div>
            </div>
          </div>
        ))}
        
        {/* 新增物件占位卡片 */}
        <button className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-400 hover:text-indigo-500 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all min-h-[300px] group">
            <div className="p-4 bg-slate-50 rounded-full mb-4 group-hover:bg-white transition-colors">
                <Plus size={32} />
            </div>
            <span className="font-black text-sm uppercase tracking-widest">建置新物件</span>
            <span className="text-[10px] mt-1 opacity-60">ADD NEW PROPERTY</span>
        </button>
      </div>
    </div>
  );
};

export default PropertyPage;
