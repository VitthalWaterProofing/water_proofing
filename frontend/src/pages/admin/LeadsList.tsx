import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Mail, Phone, Calendar, RefreshCw } from 'lucide-react';

interface Lead {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceRequested: string;
  message: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'Closed';
  createdAt: string;
}

const LeadsList = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await api.get('/leads');
      setLeads(response.data);
      setError('');
    } catch {
      setError('Failed to load leads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.put(`/leads/${id}/status`, { status: newStatus });
      // Optimistically update the local state
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setLeads(leads.map(lead => lead._id === id ? { ...lead, status: newStatus as any } : lead));
    } catch {
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Quoted': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Closed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Customer Inquiries</h2>
        <button 
          onClick={fetchLeads}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Contact Info</th>
                <th className="p-4 font-semibold">Service Details</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No leads found. When customers fill out the contact form, they will appear here.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 align-top">
                      <div className="font-medium text-gray-900">{lead.customerName}</div>
                      <div className="flex items-center text-xs text-gray-500 mt-1 gap-1">
                        <Calendar size={12} />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="space-y-1">
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                          <Mail size={14} className="text-gray-400" />
                          {lead.email}
                        </a>
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                          <Phone size={14} className="text-gray-400" />
                          {lead.phone}
                        </a>
                      </div>
                    </td>
                    <td className="p-4 align-top max-w-xs">
                      <div className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium mb-2">
                        {lead.serviceRequested}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2" title={lead.message}>
                        {lead.message}
                      </p>
                    </td>
                    <td className="p-4 align-top">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`text-sm rounded-full px-3 py-1 border font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 appearance-none cursor-pointer ${getStatusColor(lead.status)}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadsList;
