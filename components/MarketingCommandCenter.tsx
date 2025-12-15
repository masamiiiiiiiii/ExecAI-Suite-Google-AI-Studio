import React, { useState, useEffect } from 'react';
import { CompanyData } from '../types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { generateNextBestActions } from '../services/geminiService';
import { Target, Zap, Heart, Share2, BrainCircuit, RefreshCw } from 'lucide-react';

interface MarketingCommandCenterProps {
  companyData: CompanyData;
}

const MarketingCommandCenter: React.FC<MarketingCommandCenterProps> = ({ companyData }) => {
  const [actions, setActions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Transform Brand Index for Radar Chart
  const radarData = [
    { subject: 'Physicality', A: companyData.brandIndex.physicality, fullMark: 100 },
    { subject: 'Intellect', A: companyData.brandIndex.intellect, fullMark: 100 },
    { subject: 'Sociability', A: companyData.brandIndex.sociability, fullMark: 100 },
    { subject: 'Emotionality', A: companyData.brandIndex.emotionality, fullMark: 100 },
    { subject: 'Personability', A: companyData.brandIndex.personability, fullMark: 100 },
    { subject: 'Morality', A: companyData.brandIndex.morality, fullMark: 100 },
  ];

  const fetchActions = async () => {
    setLoading(true);
    const results = await generateNextBestActions(companyData);
    setActions(results);
    setLoading(false);
  };

  useEffect(() => {
    fetchActions();
  }, []);

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BrainCircuit className="text-pink-500" />
            Marketing 5.0 Command Center
          </h2>
          <p className="text-slate-400 text-sm">Predictive. Contextual. Augmented. Agile.</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={fetchActions} 
             disabled={loading}
             className="px-4 py-2 bg-pink-600/20 text-pink-400 border border-pink-500/50 hover:bg-pink-600 hover:text-white rounded-lg transition-all flex items-center gap-2 text-sm font-medium"
           >
             <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
             Run "Next Best Action" Protocol
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Brand Humanity Index (Radar) */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-4">
             <h3 className="text-lg font-semibold text-white">Brand Humanity Index</h3>
             <Heart className="text-rose-500" size={20} />
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Brand Score"
                  dataKey="A"
                  stroke="#ec4899"
                  strokeWidth={2}
                  fill="#ec4899"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-400 mt-2">
            Measures your brand's ability to act like a human friend (Marketing 4.0/5.0).
            <br/>Current Weakness: <span className="text-rose-400">Emotionality</span>
          </p>
        </div>

        {/* Predictive Segments (Bar) */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg lg:col-span-2">
          <div className="w-full flex justify-between items-center mb-4">
             <h3 className="text-lg font-semibold text-white">Predictive Segment Value (CLV)</h3>
             <Target className="text-emerald-500" size={20} />
          </div>
           <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={companyData.marketingSegments} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" hide />
                <YAxis dataKey="name" type="category" stroke="#cbd5e1" width={100} tick={{fontSize: 12}} />
                <Tooltip 
                   cursor={{fill: '#1e293b'}}
                   contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                />
                <Bar dataKey="clv" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} name="Customer Lifetime Value ($)" />
                <Bar dataKey="sentiment" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} name="Sentiment Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {companyData.marketingSegments.map((seg, idx) => (
              <div key={idx} className="bg-slate-700/30 p-3 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-400">{seg.name} Interest</div>
                <div className="text-sm font-medium text-indigo-300">{seg.topInterest}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Best Actions (Generated by Gemini) */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
           <Zap className="text-yellow-400" />
           AI Suggested "Next Best Actions"
        </h3>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-40 bg-slate-800/50 animate-pulse rounded-xl border border-slate-700"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {actions.map((action, idx) => (
              <div key={idx} className="bg-slate-800 p-5 rounded-xl border-t-4 border-t-pink-500 border-x border-b border-slate-700 hover:transform hover:-translate-y-1 transition-all shadow-lg group">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">{action.target || "General"}</span>
                  <Share2 size={16} className="text-slate-500 group-hover:text-pink-400 transition-colors" />
                </div>
                <h4 className="font-bold text-white mb-2 line-clamp-2">{action.title || action.action}</h4>
                <p className="text-sm text-slate-400 mb-4 line-clamp-3">{action.impact || "Calculated to improve engagement by 15%."}</p>
                <div className="mt-auto pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-500">
                   <span>Via: {action.channel || "Omnichannel"}</span>
                   <button className="text-pink-400 hover:text-pink-300 font-medium">Execute &rarr;</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingCommandCenter;
