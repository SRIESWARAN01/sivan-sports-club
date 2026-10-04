import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  ShieldAlert, 
  ShieldCheck, 
  Eye, 
  X,
  Calendar,
  IndianRupee,
  Clock
} from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import type { Customer } from '../../../types/database';

export const CustomersView: React.FC = () => {
  const { customers, bookings, payments, addCustomer, toggleBlockCustomer } = useDatabase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isNewCustModalOpen, setIsNewCustModalOpen] = useState(false);

  // New Customer Form
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('Cumbum');
  const [notes, setNotes] = useState('');

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile) return;

    addCustomer({
      name,
      mobile,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      address,
      membershipStatus: 'none',
      status: 'active',
      notes
    });

    setIsNewCustModalOpen(false);
    setName('');
    setMobile('');
    setEmail('');
    setNotes('');
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.mobile.includes(searchTerm) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const customerBookings = selectedCustomer 
    ? bookings.filter(b => b.customerId === selectedCustomer.id || b.customerName.toLowerCase() === selectedCustomer.name.toLowerCase())
    : [];

  const customerPayments = selectedCustomer
    ? payments.filter(p => p.customerId === selectedCustomer.id || p.customerName.toLowerCase() === selectedCustomer.name.toLowerCase())
    : [];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">
            Customer Directory & CRM
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Profiles, booking records, membership subscriptions and spending history
          </p>
        </div>

        <button
          onClick={() => setIsNewCustModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Customer</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by customer name, mobile, address, email..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="text-xs text-slate-400 font-mono">
          {filteredCustomers.length} Registered Members
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Membership</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCustomers.map(cust => (
                <tr key={cust.id} className="hover:bg-slate-800/30">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{cust.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{cust.id}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>{cust.mobile}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{cust.email}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {cust.address}
                  </td>
                  <td className="py-3 px-4">
                    {cust.membershipPlan ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {cust.membershipPlan}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[10px]">Pay per slot</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                    Rs. {cust.totalSpent.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      cust.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {cust.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1 text-[11px]"
                      >
                        <Eye className="w-3 h-3 text-emerald-400" />
                        <span>History</span>
                      </button>
                      <button
                        onClick={() => toggleBlockCustomer(cust.id)}
                        className={`p-1.5 rounded-lg text-xs transition-colors ${
                          cust.status === 'active'
                            ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white'
                            : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950'
                        }`}
                        title={cust.status === 'active' ? 'Block customer' : 'Unblock customer'}
                      >
                        {cust.status === 'active' ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer/Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-heading font-black text-2xl border border-emerald-500/30">
                {selectedCustomer.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-heading font-black text-2xl text-white">
                  {selectedCustomer.name}
                </h3>
                <div className="text-xs text-slate-400">
                  {selectedCustomer.mobile} • {selectedCustomer.email} • {selectedCustomer.address}
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400">Total Bookings</div>
                <div className="font-heading font-black text-lg text-white mt-0.5">{selectedCustomer.bookingCount}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400">Total Spent</div>
                <div className="font-heading font-black text-lg text-emerald-400 mt-0.5">Rs. {selectedCustomer.totalSpent}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400">Membership</div>
                <div className="font-heading font-bold text-xs text-cyan-400 mt-1 truncate">{selectedCustomer.membershipPlan || 'None'}</div>
              </div>
            </div>

            {/* Booking History */}
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-sm text-white">
                Booking History ({customerBookings.length})
              </h4>
              {customerBookings.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950/60 text-slate-500 text-xs text-center">
                  No booking history logged for this customer.
                </div>
              ) : (
                <div className="space-y-2">
                  {customerBookings.map(b => (
                    <div key={b.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-white">{b.facilityName}</div>
                        <div className="text-[10px] text-slate-400">{b.date} ({b.startTime} - {b.endTime})</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-emerald-400">Rs. {b.amount}</div>
                        <span className="text-[9px] uppercase font-bold text-slate-400">{b.bookingStatus}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedCustomer.notes && (
              <div className="mt-6 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <span className="font-bold text-slate-400">Staff Notes: </span>
                <span className="text-slate-300">{selectedCustomer.notes}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Customer Modal */}
      {isNewCustModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsNewCustModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-heading font-black text-xl text-white mb-1">
              Add New Customer
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              Register a customer record in Cumbum campus directory
            </p>

            <form onSubmit={handleCreateCustomer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Manikandan P."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  placeholder="e.g. 9842100000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Address / Area</label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="e.g. Near Thambis Theatre, Cumbum"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Badminton weekend preference"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewCustModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
