import React, { useState } from 'react';
import { CompanyData } from '../types';
import { simulateScenario } from '../services/geminiService';
import { Play, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

interface DecisionSimulatorProps {
  companyData: CompanyData;
}

const DecisionSimulator: React.FC<DecisionSimulatorProps> = ({ companyData }) => {
  const [scenario, setScenario] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    if (!scenario.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const analysis = await simulateScenario(companyData, scenario);
      setResult(analysis);
    } catch (e) {
      setResult("Simulation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="space-y-6">
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Play className="text-emerald-500" />
            Decision Simulator
          </h2>
          <p className="text-slate-400 mb-6">
            Input a strategic move (e.g., "Acquire competitor X", "Slash marketing budget by 50%", "Pivot to Enterprise"). 
            The AI CEO will run a predictive simulation based on current financials.
          </p>
          
          <textarea
            className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 resize-none mb-6"
            placeholder="Describe the strategic decision..."
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          />
          
          <button
            onClick={handleSimulate}
            disabled={loading || !scenario}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>Running Monte Carlo Simulations...</>
            ) : (
              <>
                Run Simulation <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>

        {/* Context Stats */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-dashed border-slate-700">
           <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Simulation Parameters</h3>
           <div className="flex justify-between items-center text-sm text-slate-300 mb-2">
             <span>Cash Constraints:</span>
             <span className="font-mono">${companyData.cashOnHand.toLocaleString()}</span>
           </div>
           <div className="flex justify-between items-center text-sm text-slate-300">
             <span>Market Tolerance (Churn):</span>
             <span className="font-mono">{companyData.history[companyData.history.length-1].churn}%</span>
           </div>
        </div>
      </div>

      <div className="h-full">
        {result ? (
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-lg h-full overflow-y-auto animate-in slide-in-from-right-10 duration-500">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-4">Simulation Results</h3>
            <div className="prose prose-invert prose-emerald max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-slate-300 leading-relaxed">
                {result}
              </pre>
            </div>
            <div className="mt-8 flex gap-4">
              <button onClick={() => {setResult(null); setScenario('')}} className="px-4 py-2 bg-slate-700 rounded-lg text-sm hover:bg-slate-600">New Simulation</button>
            </div>
          </div>
        ) : (
          <div className="h-full bg-slate-800/30 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
            {loading ? (
               <div className="animate-pulse flex flex-col items-center">
                 <div className="h-12 w-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                 <p>Analyzing projected outcomes...</p>
                 <p className="text-xs mt-2">Correlating historical data with market trends.</p>
               </div>
            ) : (
              <>
                <AlertTriangle size={48} className="mb-4 opacity-50" />
                <p className="text-lg">No simulation data generated.</p>
                <p className="text-sm mt-2">Submit a scenario to see the executive forecast.</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionSimulator;
