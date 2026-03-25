
"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Star, CheckCircle2 } from 'lucide-react';

interface ComboOption {
  id: number;
  quantity: number;
  label: string;
  isPopular?: boolean;
}

const COMBOS: ComboOption[] = [
  { id: 1, quantity: 5, label: "Combo Bronce" },
  { id: 2, quantity: 10, label: "Combo Plata" },
  { id: 3, quantity: 15, label: "Combo Oro" },
  { id: 4, quantity: 20, label: "Combo Diamante", isPopular: true },
];

interface ComboSelectorProps {
  selectedQuantity: number;
  onSelect: (qty: number) => void;
  pricePerTicket: number;
}

const ComboSelector: React.FC<ComboSelectorProps> = ({ selectedQuantity, onSelect, pricePerTicket }) => {
  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-headline font-black text-gray-900">Selecciona tu Combo</h2>
        <p className="text-gray-500">Tus números serán asignados aleatoriamente al finalizar la compra.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {COMBOS.map((combo) => (
          <Card 
            key={combo.id}
            onClick={() => onSelect(combo.quantity)}
            className={cn(
              "relative cursor-pointer transition-all duration-300 border-2 overflow-hidden",
              selectedQuantity === combo.quantity 
                ? "border-primary bg-primary/5 shadow-xl scale-[1.02]" 
                : "border-gray-100 hover:border-primary/30 hover:bg-slate-50"
            )}
          >
            {combo.isPopular && (
              <div className="absolute top-0 right-0">
                <div className="bg-accent text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Más Popular
                </div>
              </div>
            )}
            
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{combo.label}</span>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-black text-gray-900">{combo.quantity}</h3>
                  <span className="text-sm font-bold text-gray-500 uppercase">Boletas</span>
                </div>
                <p className="text-lg font-bold text-primary">
                  ${(combo.quantity * pricePerTicket).toLocaleString()} <span className="text-xs opacity-60">COP</span>
                </p>
              </div>
              
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                selectedQuantity === combo.quantity 
                  ? "bg-primary text-white scale-110" 
                  : "bg-slate-100 text-slate-300"
              )}>
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <Zap className="w-5 h-5 text-accent" />
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong>Asignación Automática:</strong> Al elegir un combo, el sistema generará números únicos de 4 cifras para ti. ¡Más boletas, más oportunidades de ganar!
        </p>
      </div>
    </div>
  );
};

export default ComboSelector;
