import { useAuth } from '../../context/AuthContext';
import { Users, Briefcase, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ leads: 0, services: 0, projects: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [leadsRes, servicesRes, projectsRes] = await Promise.all([
          api.get('/leads'),
          api.get('/services'),
          api.get('/projects')
        ]);
        
        setStats({
          leads: leadsRes.data.length || 0,
          services: servicesRes.data.length || 0,
          projects: projectsRes.data.length || 0
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome back, {user?.name}!</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Metric Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Leads</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {loading ? '...' : stats.leads}
            </h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Services</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {loading ? '...' : stats.services}
            </h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <Image size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Portfolio Projects</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {loading ? '...' : stats.projects}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
        <div className="flex gap-4">
          <Link to="/admin/leads" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors border">
            View Recent Inquiries
          </Link>
          <Link to="/admin/services" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors border border-blue-100">
            + Add New Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
