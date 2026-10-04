import React, { useState } from 'react';
import { ShieldCheck, Search, Clock, FileText, UserCheck, Activity } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';

export const ActivityLogsView: React.FC = () => {
  const { auditLogs } = useDatabase();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(l => 
    l.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">
            Audit Activity & Security Logs
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Immutable log of all administrative actions, bookings modifications, and system configuration updates
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 font-mono">
          {auditLogs.length} Logged Events
        </div>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search audit trail by admin, action, module, record..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Admin User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-semibold text-white">
                    {log.adminName}
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px] text-emerald-400 uppercase">
                    {log.role}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-300">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px]">
                      {log.module}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-white">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 text-slate-300 max-w-md truncate">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
