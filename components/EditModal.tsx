import React, { useState, useEffect } from 'react';
import { Tear, StatusTear } from '../types';
import { X, Save, Flag } from 'lucide-react';

interface EditModalProps {
  tear: Tear | null;
  onClose: () => void;
  onSave: (updatedTear: Tear) => void;
}

const EditModal: React.FC<EditModalProps> = ({ tear, onClose, onSave }) => {
  const [formData, setFormData] = useState<Tear | null>(null);

  useEffect(() => {
    if (tear) {
      setFormData({ ...tear });
    }
  }, [tear]);

  if (!tear || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert local datetime-local to ISO string
    const date = new Date(e.target.value);
    setFormData({ ...formData, fimPrevisto: date.toISOString() });
  };

  // Convert ISO string to datetime-local format for input
  const localDateValue = new Date(formData.fimPrevisto).toISOString().slice(0, 16);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">Editar {formData.nome}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status Operacional</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as StatusTear})}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {Object.values(StatusTear).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
              <input
                type="checkbox"
                id="prioritario"
                checked={formData.prioritario}
                onChange={(e) => setFormData({...formData, prioritario: e.target.checked})}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
              />
              <label htmlFor="prioritario" className="flex items-center gap-2 text-sm font-bold text-red-800 cursor-pointer select-none">
                <Flag className="w-4 h-4 fill-red-600" />
                Marcar como Prioridade Alta
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
              <input
                type="text"
                value={formData.cliente}
                onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nº Interno</label>
              <input
                type="text"
                value={formData.numeroInterno}
                onChange={(e) => setFormData({...formData, numeroInterno: e.target.value})}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Artigo</label>
            <input
              type="text"
              value={formData.tipoArtigo}
              onChange={(e) => setFormData({...formData, tipoArtigo: e.target.value})}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Previsão de Término</label>
            <input
              type="datetime-local"
              value={localDateValue}
              onChange={handleDateChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observações / Situação</label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 min-h-[100px] resize-y"
              placeholder="Descreva a situação atual do tear, problemas técnicos, ou notas importantes..."
            />
          </div>
          
          <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white border-t border-gray-100 mt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;