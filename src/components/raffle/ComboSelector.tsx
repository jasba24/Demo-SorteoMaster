
"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Star } from 'lucide-react';

interface ComboOption {
  quantity: number;
  label: string;
  price: number;
  isPopular?: boolean;
}

const COMBOS: ComboOption[] = [
  { quantity: 5, label: "Combo Básico", price: 50000 },
  { quantity: 10, label: "Combo Plata", price: 100000 },
  { quantity: 20, label: "Combo Diamante", price: 200000, isPopular: true },
];

interface ComboSelectorProps {
  selectedQuantity: number;
  onSelect: (qty: number) => void;
}

const ComboSelector: React.FC<ComboSelectorProps> = ({ selectedQuantity, onSelect }) => {
  return (
    <div className="space-y-4">
      <div className="text-center md:text-left mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Elige tu Pack de la Suerte</h2>
        <p className="text-gray-500">Tus números se asignarán automáticamente al pagar.</p>
      </div>

      <div className="flex flex-col gap-3">
        {COMBOS.map((combo) => (
          <button
            key={combo.quantity}
            onClick={() => onSelect(combo.quantity)}
            className={cn(
              "relative w-full p-5 rounded-2xl border-2 transition-all flex items-center justify-between text-left",
              selectedQuantity === combo.quantity 
                ? "border-primary bg-primary/5 shadow-md" 
                : "border-gray-100 bg-white hover:border-gray-200"
            )}
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{combo.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-gray-900">{combo.quantity} Boletas</span>
                {combo.isPopular && (
                  <span className="bg-accent text-white text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> POPULAR
                  </span>
                )}
              </div>
              <span className="text-lg font-bold text-primary">${combo.price.toLocaleString()} COP</span>
            </div>
            
            <div className={cn(
              "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors",
              selectedQuantity === combo.quantity 
                ? "bg-primary border-primary text-white" 
                : "border-gray-100 text-transparent"
            )}>
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ComboSelector;
