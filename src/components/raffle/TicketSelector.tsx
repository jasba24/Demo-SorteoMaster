
"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

interface TicketSelectorProps {
  selectedNumbers: number[];
  onToggle: (num: number) => void;
}

const TicketSelector: React.FC<TicketSelectorProps> = ({ selectedNumbers, onToggle }) => {
  // Simulating some numbers already sold
  const soldNumbers = [5, 12, 27, 44, 89, 102, 156];
  const totalTickets = 200;

  return (
    <Card className="w-full border-none shadow-xl bg-white overflow-hidden">
      <CardHeader className="bg-primary text-white border-b border-primary/10">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-headline font-bold">Selecciona tus números</CardTitle>
            <p className="text-primary-foreground/70 text-sm mt-1">Elige los números de la suerte para el gran sorteo.</p>
          </div>
          <Badge variant="outline" className="text-white border-white/30 text-lg py-1 px-3">
            {selectedNumbers.length} Seleccionados
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex gap-4 mb-6 text-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-white border border-gray-200"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-primary"></div>
            <span>Seleccionado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-gray-100"></div>
            <span>Vendido</span>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {Array.from({ length: totalTickets }, (_, i) => i + 1).map((num) => {
            const isSold = soldNumbers.includes(num);
            const isSelected = selectedNumbers.includes(num);

            return (
              <button
                key={num}
                disabled={isSold}
                onClick={() => onToggle(num)}
                className={cn(
                  "ticket-number",
                  isSold ? "sold" : isSelected ? "selected" : "available"
                )}
              >
                {num.toString().padStart(3, '0')}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-start gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <Info className="w-5 h-5 text-accent mt-0.5" />
          <p className="text-xs text-slate-600 leading-relaxed">
            Puedes seleccionar tantos números como desees. Cada boleta tiene un valor de <strong>$10.000 COP</strong>. Los resultados se publicarán el último domingo de cada mes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketSelector;
