
"use client"

import React, { useState, useEffect } from 'react';
import ComboSelector from '@/components/raffle/ComboSelector';
import CheckoutForm from '@/components/raffle/CheckoutForm';
import PaymentSimulation from '@/components/raffle/PaymentSimulation';
import DigitalTicket from '@/components/raffle/DigitalTicket';
import { UserData, PurchaseRecord, RaffleState } from '@/lib/types';
import { Ticket, ShoppingCart, ShieldCheck, Trash2 } from 'lucide-react';

const TICKET_PRICE = 10000;

export default function Home() {
  const [state, setState] = useState<RaffleState>({
    selectedQuantity: 0,
    userData: null,
    status: 'selecting',
    purchaseRecord: null,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.status]);

  const generateTickets = (quantity: number): string[] => {
    const nums = new Set<string>();
    while (nums.size < quantity) {
      const n = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      nums.add(n);
    }
    return Array.from(nums).sort();
  };

  const handleSelectCombo = (quantity: number) => {
    setState(prev => ({ ...prev, selectedQuantity: quantity }));
  };

  const handleCheckoutSubmit = (userData: UserData) => {
    setState(prev => ({ ...prev, userData, status: 'processing' }));
  };

  const handlePaymentComplete = async () => {
    const numbers = generateTickets(state.selectedQuantity);
    const transactionId = `SM-${Math.random().toString(36).substring(7).toUpperCase()}`;
    
    const record: PurchaseRecord = {
      id: Math.random().toString(36).substring(2),
      numbers,
      userData: state.userData!,
      totalAmount: state.selectedQuantity * TICKET_PRICE,
      timestamp: new Date(),
      transactionId,
    };

    setState(prev => ({ ...prev, status: 'success', purchaseRecord: record }));
  };

  const handleReset = () => {
    setState({
      selectedQuantity: 0,
      userData: null,
      status: 'selecting',
      purchaseRecord: null,
    });
  };

  const total = state.selectedQuantity * TICKET_PRICE;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="h-16 bg-white border-b flex items-center sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
              <Ticket className="w-6 h-6" />
            </div>
            <span className="text-xl font-black">Sorteo<span className="text-accent">Master</span></span>
          </div>
          <button className="text-sm font-bold text-primary hover:underline">Sorteos Activos</button>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:py-10 space-y-8">
        {state.status === 'selecting' && (
          <div className="flex flex-col gap-8 animate-fade-in-up">
            {/* Banner Full Width */}
            <section className="bg-primary p-8 md:p-12 rounded-[2rem] text-white relative overflow-hidden shadow-2xl w-full">
              <div className="relative z-10 max-w-2xl">
                <span className="text-[10px] font-black bg-accent px-3 py-1 rounded-full mb-4 inline-block tracking-widest">SORTEO EN VIVO</span>
                <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">Gana el Premio Mayor</h1>
                <p className="opacity-80 text-lg">Elige un combo y deja que la suerte haga el resto. Números automáticos de 4 cifras asignados al instante.</p>
              </div>
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute right-10 top-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl animate-pulse"></div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Carrito - Ahora debajo del banner y antes que el selector en móvil */}
              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800">
                      <ShoppingCart className="w-5 h-5 text-primary" /> Carrito de Compras
                    </h3>
                    {state.selectedQuantity > 0 && (
                      <button onClick={() => handleSelectCombo(0)} className="text-red-400 hover:text-red-500 transition-colors p-1">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {state.selectedQuantity === 0 ? (
                    <div className="py-12 text-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-2xl">
                      Selecciona un combo de boletas
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center border border-gray-100">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-400 uppercase">Seleccionado</span>
                          <span className="font-black text-gray-800 text-lg">{state.selectedQuantity} Boletas</span>
                        </div>
                        <span className="font-black text-primary text-xl">${total.toLocaleString()}</span>
                      </div>
                      <button 
                        onClick={() => setState(prev => ({ ...prev, status: 'checkout' }))}
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-lg"
                      >
                        Finalizar Compra
                      </button>
                      <div className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-green-500" /> Transacción Segura
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Selector de Combos */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <ComboSelector selectedQuantity={state.selectedQuantity} onSelect={handleSelectCombo} />
              </div>
            </div>
          </div>
        )}

        {state.status === 'checkout' && (
          <CheckoutForm total={total} onBack={() => setState(prev => ({ ...prev, status: 'selecting' }))} onSubmit={handleCheckoutSubmit} />
        )}

        {state.status === 'processing' && (
          <PaymentSimulation total={total} onComplete={handlePaymentComplete} />
        )}

        {state.status === 'success' && state.purchaseRecord && (
          <DigitalTicket record={state.purchaseRecord} onReset={handleReset} />
        )}
      </main>

      <footer className="bg-white border-t py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="text-xl font-black">Sorteo<span className="text-accent">Master</span></div>
          <p className="text-sm text-gray-400 font-medium">© 2026 SorteoMaster. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-50 border flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-gray-300" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
