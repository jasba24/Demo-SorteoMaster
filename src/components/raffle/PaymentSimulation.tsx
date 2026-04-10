
"use client"

import React, { useState, useEffect } from 'react';
import { Loader2, ShieldCheck, ChevronRight } from 'lucide-react';

interface Props {
  total: number;
  onComplete: () => void;
}

const PaymentSimulation: React.FC<Props> = ({ total, onComplete }) => {
  const [step, setStep] = useState<'redirecting' | 'gateway' | 'processing'>('redirecting');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step === 'redirecting') {
      setTimeout(() => setStep('gateway'), 1000);
    }
  }, [step]);

  const handlePay = () => {
    setStep('processing');
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 50);
  };

  if (step === 'redirecting') {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse text-center px-4">
        <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
        <h3 className="text-xl font-bold">Redirigiendo a PSE...</h3>
        <p className="text-gray-400">Preparando conexión segura.</p>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h3 className="text-2xl font-black mb-6">Confirmando Pago</h3>
        <div className="w-full max-w-xs bg-gray-100 h-3 rounded-full overflow-hidden mb-2">
          <div className="bg-primary h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-primary font-bold">{progress}%</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-fade-in-up">
      <div className="bg-[#1C2C5E] p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2 font-bold italic">PSE</div>
        <span className="text-xs opacity-50 font-bold">PAGO SEGURO</span>
      </div>
      <div className="p-8 space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-400">Valor</span>
            <span className="font-bold text-lg">${total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-400">Referencia</span>
            <span className="font-mono text-xs">REF-{Math.random().toString(36).slice(-6).toUpperCase()}</span>
          </div>
        </div>

        <button 
          onClick={handlePay}
          className="w-full bg-[#1C2C5E] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#15234d] transition-colors"
        >
          Confirmar y Pagar <ChevronRight className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold">
          <ShieldCheck className="w-4 h-4" /> TRASACCIÓN CIFRADA SSL
        </div>
      </div>
    </div>
  );
};

export default PaymentSimulation;
