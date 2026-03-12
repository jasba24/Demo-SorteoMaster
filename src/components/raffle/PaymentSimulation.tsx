
"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';

interface PaymentSimulationProps {
  total: number;
  onComplete: () => void;
}

const PaymentSimulation: React.FC<PaymentSimulationProps> = ({ total, onComplete }) => {
  const [step, setStep] = useState<'redirecting' | 'gateway' | 'processing'>('redirecting');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step === 'redirecting') {
      const timer = setTimeout(() => setStep('gateway'), 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handlePay = () => {
    setStep('processing');
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 100);
  };

  if (step === 'redirecting') {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-6 animate-pulse">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <div className="text-center">
          <h3 className="text-xl font-bold">Redirigiendo a PSE</h3>
          <p className="text-gray-500">Estamos conectando con tu pasarela de pagos segura...</p>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">Procesando Transacción</h3>
          <p className="text-gray-500">Por favor no cierres esta ventana.</p>
        </div>
        <div className="w-full max-w-md space-y-2">
          <Progress value={progress} className="h-3" />
          <p className="text-right text-sm font-medium text-primary">{progress}%</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Pago encriptado y seguro</span>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden shadow-2xl border-none">
      <div className="bg-[#1C2C5E] p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1C2C5E] font-bold text-xs italic">PSE</div>
          <span className="text-white font-medium text-sm">Pago Seguro Electrónico</span>
        </div>
        <span className="text-white/60 text-xs">V. 2.0</span>
      </div>
      <CardContent className="p-8 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-gray-500">Comercio</span>
            <span className="font-bold">RaffleLink SAS</span>
          </div>
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-gray-500">Valor a pagar</span>
            <span className="font-bold text-primary">${total.toLocaleString()} COP</span>
          </div>
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-gray-500">Referencia</span>
            <span className="font-mono text-xs">RL-{Math.random().toString(36).substring(7).toUpperCase()}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700">Selecciona tu banco</h4>
          <div className="p-3 border rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-red-600 rounded flex items-center justify-center text-white text-[8px] font-bold uppercase">Banco</div>
              <span className="text-sm font-medium">Bancolombia Personas</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <Button onClick={handlePay} className="w-full bg-[#1C2C5E] hover:bg-[#1C2C5E]/90 text-white h-12 text-lg">
          Pagar Ahora
        </Button>
        
        <p className="text-[10px] text-center text-gray-400">
          Al hacer clic en "Pagar Ahora" aceptas los términos y condiciones de ACH Colombia.
        </p>
      </CardContent>
    </Card>
  );
};

export default PaymentSimulation;
