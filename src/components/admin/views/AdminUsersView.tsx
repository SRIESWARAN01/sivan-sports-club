import React from 'react';
import { Shield, Check, X, UserCheck, Key, Lock } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import type { Role } from '../../../types/database';

export const AdminUsersView: React.FC = () => {
  const { adminUsers, currentAdminUser, loginAs } = useDatabase();

  const roleMatrix = [
    { module: 'Dashboard Overview', superAdmin: true, manager: true, staff: true, accounts: true },
    { module: 'Bookings Management', superAdmin: true, manager: true, staff: true, accounts: false },
    { module: 'Facilities Management', superAdmin: true, manager: true, staff: false, accounts: false },
    { module: 'Customer Management', superAdmin: true, manager: true, staff: true, accounts: false },
    { module: 'Gym Memberships', superAdmin: true, manager: true, staff: false, accounts: false },
    { module: 'Payments & Revenue', superAdmin: true, manager: false, staff: false, accounts: true },
    { module: 'Enquiries CRM', superAdmin: true, manager: true, staff: true, accounts: false },
    { module: 'Party Hall & Events', superAdmin: true, manager: true, staff: true, accounts: false },
    { module: 'Gallery Manager', superAdmin: true, manager: true, staff: false, accounts: false },
    { module: 'Website CMS', superAdmin: true, manager: false, staff: false, accounts: false },
    { module: 'Promotions / Coupons', superAdmin: true, manager: true, staff: false, accounts: false },
    { module: 'Review Moderation', superAdmin: true, manager: true, staff: false, accounts: false },
    { module: 'Business Reports', superAdmin: true, manager: true, staff: false, accounts: true },
    { module: 'System Settings', superAdmin: true, manager: false, staff: false, accounts: false },
    { module: 'Audit Activity Logs', superAdmin: true, manager: false, staff: false, accounts: false },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">
            Admin Users & Role-Based Access Control (RBAC)
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Configurable permissions for Super Admin, Operations Manager, Front-Desk Staff, and Accounts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Current Role:</span>
          <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase font-mono">
            {currentAdminUser?.role || 'SUPER_ADMIN'}
          </span>
        </div>
      </div>

      {/* Admin Users List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminUsers.map(user => {
          const isCurrent = currentAdminUser?.id === user.id;
          return (
            <div
              key={user.id}
              className={`p-5 rounded-3xl border flex flex-col justify-between space-y-4 ${
                isCurrent 
                  ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-950/30' 
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                    user.role === 'SUPER_ADMIN'
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      : user.role === 'MANAGER'
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : user.role === 'STAFF'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {user.role.replace('_', ' ')}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <UserCheck className="w-3 h-3" />
                      Active
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-sm text-white">{user.name}</h3>
                    <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => loginAs(user.role)}
                  className={`w-full py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    isCurrent
                      ? 'bg-slate-800 text-slate-400 cursor-default'
                      : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 border border-emerald-500/30'
                  }`}
                >
                  {isCurrent ? 'Currently Logged In' : `Simulate ${user.role.replace('_', ' ')}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Permission Matrix Table */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
        <h3 className="font-heading font-black text-lg text-white">
          Role Permission Security Matrix
        </h3>
        <p className="text-xs text-slate-400">
          Module-level access enforced on all admin routes and operations
        </p>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Module Name</th>
                <th className="py-2.5 px-3 text-center">Super Admin</th>
                <th className="py-2.5 px-3 text-center">Manager</th>
                <th className="py-2.5 px-3 text-center">Staff</th>
                <th className="py-2.5 px-3 text-center">Accounts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {roleMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-medium text-slate-200">{row.module}</td>
                  <td className="py-2.5 px-3 text-center">
                    {row.superAdmin ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {row.manager ? <Check className="w-4 h-4 text-cyan-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {row.staff ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {row.accounts ? <Check className="w-4 h-4 text-amber-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />}
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
