import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { CompanyData } from '../types';
import { TrendingUp, TrendingDown, DollarSign, Users, Activity } from 'lucide-react';

interface DashboardProps {
  data: CompanyData;
}

const KPICard: React.FC<{ title: string; value: string; trend?: string; icon: React.ReactNode; positive?: boolean }> = ({ title, value, trend, icon, positive }) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-700/50 rounded-lg text-slate-300">
        {icon}
      </div>
      {trend && (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const lastMonth = data.history[data.history.length - 1];
  const prevMonth = data.history[data.history.length - 2];

  const revGrowth = ((lastMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100;
  const profitMargin = ((lastMonth.revenue - lastMonth.expenses) / lastMonth.revenue) * 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Monthly Revenue" 
          value={`$${lastMonth.revenue.toLocaleString()}`} 
          trend={`${revGrowth > 0 ? '+' : ''}${revGrowth.toFixed(1)}%`}
          positive={revGrowth > 0}
          icon={<DollarSign size={20} />}
        />
        <KPICard 
          title="Active Users" 
          value={lastMonth.users.toLocaleString()} 
          trend="+12.5%" 
          positive={true}
          icon={<Users size={20} />}
        />
        <KPICard 
          title="Burn Rate" 
          value={`$${data.burnRate.toLocaleString()}`} 
          trend="Stable"
          positive={true}
          icon={<Activity size={20} />}
        />
        <KPICard 
          title="Runway" 
          value={`${data.runwayMonths} Months`} 
          trend={data.runwayMonths < 6 ? "Critical" : "Healthy"}
          positive={data.runwayMonths >= 12}
          icon={<TrendingUp size={20} />} // Using TrendingUp generic for runway
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6">Financial Performance</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.history}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRev)" name="Revenue" />
                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" fillOpacity={1} fill="url(#colorExp)" name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6">Growth & Churn</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis yAxisId="left" stroke="#94a3b8" />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="users" fill="#10b981" name="Active Users" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="churn" fill="#fbbf24" name="Churn Rate (%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
