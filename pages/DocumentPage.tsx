
import React, { useState } from 'react';
import { FileText, Upload, Folder, Search, MoreVertical, FileCode, FileImage } from 'lucide-react';

const DocumentPage: React.FC = () => {
  const [activeFolder, setActiveFolder] = useState('All');
  
  const folders = [
    { name: '買賣合約', count: 12 },
    { name: '租賃契約', count: 48 },
    { name: '代管協議', count: 24 },
    { name: '身份證件', count: 156 },
    { name: '物件照片', count: 342 },
  ];

  const files = [
    { name: '113年信義區案合約.pdf', type: 'PDF', size: '2.4 MB', date: '2024-04-15' },
    { name: '租客入房切結書_王先生.docx', type: 'Word', size: '1.1 MB', date: '2024-04-12' },
    { name: '物件環境照片_A12.zip', type: 'Archive', size: '15.8 MB', date: '2024-04-10' },
    { name: '委託管理合約範本.pdf', type: 'PDF', size: '0.8 MB', date: '2024-03-20' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">表單與文件中心</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition">
          <Upload size={18} />
          <span>上傳新文件</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Folders */}
        <div className="w-full lg:w-64 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">分類資料夾</h3>
            <div className="space-y-1">
              <button 
                onClick={() => setActiveFolder('All')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
                  activeFolder === 'All' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                   <Folder size={18} />
                   <span>所有文件</span>
                </div>
                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400">582</span>
              </button>
              {folders.map((f) => (
                <button 
                  key={f.name}
                  onClick={() => setActiveFolder(f.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
                    activeFolder === f.name ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                     <Folder size={18} />
                     <span>{f.name}</span>
                  </div>
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400">{f.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="在所有文件中搜尋..." 
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-100 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400">排序：</span>
              <select className="text-xs border-none bg-transparent font-semibold text-slate-700 outline-none cursor-pointer">
                <option>最新日期</option>
                <option>檔案大小</option>
                <option>檔案名稱</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {files.map((file, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                   <div className={`p-2 rounded-lg ${
                     file.type === 'PDF' ? 'bg-rose-50 text-rose-600' :
                     file.type === 'Word' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                   }`}>
                      <FileText size={24} />
                   </div>
                   <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={18} />
                   </button>
                </div>
                <h4 className="text-sm font-bold text-slate-800 line-clamp-1 mb-1">{file.name}</h4>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                   <span>{file.size}</span>
                   <span>{file.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
