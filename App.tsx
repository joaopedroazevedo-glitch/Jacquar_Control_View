import React, { useState, useEffect } from 'react';
import { Tear, StatusTear } from './types';
import { INITIAL_TEARES } from './constants';
import TearCard from './components/TearCard';
import EditModal from './components/EditModal';
import { 
  LayoutDashboard, 
  BarChart3,
  Factory,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

// Colors for the chart
const CHART_COLORS = {
  [StatusTear.OPERACIONAL]: '#10B981', // Emerald 500
  [StatusTear.PARADO]: '#EF4444', // Red 500
  [StatusTear.MANUTENCAO]: '#F59E0B', // Amber 500
  [StatusTear.SETUP]: '#3B82F6', // Blue 500
};

const App: React.FC = () => {
  const [teares, setTeares] = useState<Tear[]>(INITIAL_TEARES);
  const [selectedTear, setSelectedTear] = useState<Tear | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Force re-render every minute to update timers
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSaveTear = (updatedTear: Tear) => {
    setTeares(prev => prev.map(t => t.id === updatedTear.id ? updatedTear : t));
    setSelectedTear(null);
  };

  // Stats for the chart
  const statsData = [
    { name: StatusTear.OPERACIONAL, value: teares.filter(t => t.status === StatusTear.OPERACIONAL).length },
    { name: StatusTear.PARADO, value: teares.filter(t => t.status === StatusTear.PARADO).length },
    { name: StatusTear.MANUTENCAO, value: teares.filter(t => t.status === StatusTear.MANUTENCAO).length },
    { name: StatusTear.SETUP, value: teares.filter(t => t.status === StatusTear.SETUP).length },
  ].filter(d => d.value > 0);

  const activeCount = teares.filter(t => t.status === StatusTear.OPERACIONAL).length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">Jacquard Control Pro</h1>
              <p className="text-xs text-gray-500 mt-1">Gestão de Produção em Tempo Real</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-600">Ativos: <span className="text-gray-900 font-bold">{activeCount}/10</span></span>
                </div>
                <div className="text-sm text-gray-400 hidden sm:block">
                    Atualizado: {lastUpdated.toLocaleTimeString()}
                </div>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Loom Grid */}
            <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <LayoutDashboard className="w-5 h-5 text-gray-500" />
                        Visão Geral dos Teares
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {teares.map(tear => (
                    <TearCard 
                    key={tear.id} 
                    tear={tear} 
                    onClick={setSelectedTear} 
                    />
                ))}
                </div>
            </div>

            {/* Sidebar / Stats */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-gray-500" />
                        Distribuição
                    </h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={CHART_COLORS[entry.name as StatusTear]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Status Summary */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-bold mb-4 text-gray-700">Estado Rápido</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                <span className="font-medium text-emerald-900">Produtivos</span>
                            </div>
                            <span className="text-xl font-bold text-emerald-700">{activeCount}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                                <span className="font-medium text-red-900">Parados</span>
                            </div>
                            <span className="text-xl font-bold text-red-700">
                                {teares.filter(t => t.status === StatusTear.PARADO).length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>

      {/* Edit Modal */}
      {selectedTear && (
        <EditModal 
          tear={selectedTear} 
          onClose={() => setSelectedTear(null)} 
          onSave={handleSaveTear} 
        />
      )}
    </div>
  );
};

export default App;