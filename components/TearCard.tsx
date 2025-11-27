import React, { useMemo } from 'react';
import { Tear, StatusTear } from '../types';
import { Clock, Activity, Settings, AlertOctagon, User, FileText, Hash, Info, Flag } from 'lucide-react';

interface TearCardProps {
  tear: Tear;
  onClick: (tear: Tear) => void;
}

const TearCard: React.FC<TearCardProps> = ({ tear, onClick }) => {
  const statusColors = {
    [StatusTear.OPERACIONAL]: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    [StatusTear.PARADO]: 'bg-red-50 border-red-200 text-red-800',
    [StatusTear.MANUTENCAO]: 'bg-amber-50 border-amber-200 text-amber-800',
    [StatusTear.SETUP]: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const statusIcons = {
    [StatusTear.OPERACIONAL]: <Activity className="w-5 h-5" />,
    [StatusTear.PARADO]: <AlertOctagon className="w-5 h-5" />,
    [StatusTear.MANUTENCAO]: <Settings className="w-5 h-5" />,
    [StatusTear.SETUP]: <Clock className="w-5 h-5" />,
  };

  const timeLeft = useMemo(() => {
    const end = new Date(tear.fimPrevisto).getTime();
    const now = new Date().getTime();
    const diff = end - now;

    if (diff <= 0) return "Concluído";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }, [tear.fimPrevisto]);

  return (
    <div 
      onClick={() => onClick(tear)}
      className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg cursor-pointer hover:scale-[1.02] flex flex-col justify-between min-h-[220px] ${statusColors[tear.status]} ${tear.prioritario ? 'ring-2 ring-red-400 ring-offset-1' : ''}`}
    >
      <div>
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold text-lg">{tear.nome}</h3>
          <span className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wider bg-white/50 px-2 py-1 rounded-md">
            {statusIcons[tear.status]}
            {tear.status}
          </span>
        </div>

        {/* Priority Indicator - Below Status */}
        {tear.prioritario && (
          <div className="mb-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide bg-red-100 text-red-700 border border-red-200">
            <Flag className="w-3 h-3 fill-current" />
            Prioridade Alta
          </div>
        )}
        
        {/* Spacer if no priority, to keep alignment if needed, or just let it collapse */}
        {!tear.prioritario && <div className="mb-3"></div>}

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 opacity-80">
            <User className="w-4 h-4 shrink-0" />
            <span className="truncate font-medium">{tear.cliente}</span>
          </div>
          <div className="flex items-center gap-2 opacity-80">
            <FileText className="w-4 h-4 shrink-0" />
            <span className="truncate">{tear.tipoArtigo}</span>
          </div>
          <div className="flex items-center gap-2 opacity-80">
            <Hash className="w-4 h-4 shrink-0" />
            <span>{tear.numeroInterno}</span>
          </div>
        </div>

        {tear.descricao && (
          <div className="mt-3 p-2 bg-black/5 rounded-lg border-l-4 border-current text-xs italic leading-tight flex gap-2 items-start">
            <Info className="w-3 h-3 mt-0.5 shrink-0" />
            <span className="line-clamp-3">{tear.descricao}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-black/10 flex justify-between items-center">
        <div className="text-xs font-medium uppercase tracking-wide opacity-70">
          Previsto
        </div>
        <div className="font-mono font-bold text-lg flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {timeLeft}
        </div>
      </div>
      
      {/* Progress Bar Visual for "Article Completion" */}
      {tear.status === StatusTear.OPERACIONAL && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10 rounded-b-xl overflow-hidden">
          <div 
            className="h-full bg-current opacity-50" 
            style={{ width: `${Math.min(100, Math.max(0, 100 - (new Date(tear.fimPrevisto).getTime() - Date.now()) / (1000 * 60 * 60)))}%` }} 
          />
        </div>
      )}
    </div>
  );
};

export default TearCard;