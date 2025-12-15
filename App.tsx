import React, { useState } from 'react';
import { ViewState, CompanyData } from './types';
import { INITIAL_COMPANY_DATA } from './constants';
import Dashboard from './components/Dashboard';
import StrategyChat from './components/StrategyChat';
import DecisionSimulator from './components/DecisionSimulator';
import MarketingCommandCenter from './components/MarketingCommandCenter';
import { LayoutDashboard, MessageSquare, Briefcase, Zap, Settings, LogOut, BrainCircuit } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [companyData, setCompanyData] = useState<CompanyData>(INITIAL_COMPANY_DATA);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard data={companyData} />;
      case ViewState.MARKETING_COMMAND:
        return <MarketingCommandCenter companyData={companyData} />;
      case ViewState.STRATEGY_CHAT:
        return <StrategyChat companyData={companyData} />;
      case ViewState.SCENARIO_SIMULATOR:
        return <DecisionSimulator companyData={companyData} />;
      default:
        return <Dashboard data={companyData} />;
    }
  };

  const NavItem = ({ view, icon, label }: { view: ViewState; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        currentView === view 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="text-indigo-500" fill="currentColor" />
            <h1 className="text-xl font-bold tracking-tight text-white">ExecAI Suite</h1>
          </div>
          <p className="text-xs text-slate-500">Autonomous Management</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 px-4 mt-2">Overview</div>
          <NavItem view={ViewState.DASHBOARD} icon={<LayoutDashboard size={18} />} label="Board Dashboard" />
          
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-6 mb-2 px-4">Marketing 5.0</div>
          <NavItem view={ViewState.MARKETING_COMMAND} icon={<BrainCircuit size={18} className="text-pink-500" />} label="Intelligence Hub" />

          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-6 mb-2 px-4">Executive Actions</div>
          <NavItem view={ViewState.STRATEGY_CHAT} icon={<MessageSquare size={18} />} label="CEO Strategy Chat" />
          <NavItem view={ViewState.SCENARIO_SIMULATOR} icon={<Briefcase size={18} />} label="Decision Simulator" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white w-full transition-colors">
            <Settings size={20} />
            <span>Settings</span>
          </button>
           <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900 font-bold">
              AI
            </div>
            <div className="flex-1">
               <p className="text-sm font-medium text-white">AI Executive</p>
               <p className="text-xs text-emerald-400">Online • Active</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 z-10 shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {currentView === ViewState.DASHBOARD && 'Executive Overview'}
              {currentView === ViewState.MARKETING_COMMAND && 'Marketing 5.0 Intelligence'}
              {currentView === ViewState.STRATEGY_CHAT && 'Strategy & Directives'}
              {currentView === ViewState.SCENARIO_SIMULATOR && 'Risk & Opportunity Simulation'}
            </h2>
            <p className="text-xs text-slate-500">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-xs text-slate-400">Company Valuation</span>
                <span className="text-sm font-bold text-emerald-400">$12.5M <span className="text-emerald-500/50 text-[10px]">▲ 2.1%</span></span>
             </div>
             <button className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white border border-slate-700">
               <LogOut size={18} />
             </button>
          </div>
        </header>

        {/* Dynamic View */}
        <div className="flex-1 overflow-hidden p-8 relative">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
