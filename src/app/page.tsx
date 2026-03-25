
"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ComboSelector from '@/components/raffle/ComboSelector';
import CheckoutForm from '@/components/raffle/CheckoutForm';
import PaymentSimulation from '@/components/raffle/PaymentSimulation';
import DigitalTicket from '@/components/raffle/DigitalTicket';
import { UserData, PurchaseRecord, RaffleState } from '@/lib/types';
import { ShoppingCart, Ticket, Shield, Trophy, ChevronRight, Zap } from 'lucide-react';

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
    const numbers = new Set<string>();
    while (numbers.size < quantity) {
      const num = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      numbers.add(num);
    }
    return Array.from(numbers).sort();
  };

  const heroImage = PlaceHolderImages.find(img => img.id === 'raffle-hero');

  const handleSelectCombo = (quantity: number) => {
    setState(prev => ({
      ...prev,
      selectedQuantity: quantity
    }));
  };

  const handleCheckoutSubmit = (userData: UserData) => {
    setState(prev => ({
      ...prev,
      userData,
      status: 'processing'
    }));
  };

  const handlePaymentComplete = () => {
    const transactionId = `TX-${Math.random().toString(36).substring(7).toUpperCase()}`;
    const generated = generateTickets(state.selectedQuantity);
    
    const record: PurchaseRecord = {
      id: Math.random().toString(36).substring(2),
      numbers: generated,
      userData: state.userData!,
      totalAmount: state.selectedQuantity * TICKET_PRICE,
      timestamp: new Date(),
      transactionId,
    };

    setState(prev => ({
      ...prev,
      status: 'success',
      purchaseRecord: record
    }));
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
    <div className="min-h-screen pb-20">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Ticket className="text-white w-6 h-6 transform -rotate-12" />
            </div>
            <span className="text-xl font-headline font-black tracking-tighter text-gray-900">
              Sorteo<span className="text-accent">Master</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">Sorteos</a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">Ganadores</a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">Ayuda</a>
          </div>
          <Button variant="outline" className="rounded-full font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
            Iniciar Sesión
          </Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 pt-8">
        
        {state.status === 'selecting' && (
          <div className="space-y-12 animate-fade-in-up">
            <section className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src={heroImage?.imageUrl || ""} 
                alt="Sorteo Banner" 
                fill 
                className="object-cover"
                priority
                data-ai-hint="luxury prize"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex items-center p-8 md:p-16">
                <div className="max-w-xl space-y-6">
                  <Badge className="bg-accent hover:bg-accent text-white border-none text-xs px-3 py-1 uppercase font-bold tracking-widest">
                    EVENTO ESPECIAL
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-headline font-black text-white leading-tight">
                    Gana una <br/> <span className="text-accent italic">Experiencia de Lujo</span>
                  </h1>
                  <p className="text-white/80 text-lg hidden sm:block">
                    Adquiere tus combos de la suerte. El sistema asignará números aleatorios de 4 cifras para el gran sorteo.
                  </p>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <ComboSelector 
                  selectedQuantity={state.selectedQuantity} 
                  onSelect={handleSelectCombo}
                  pricePerTicket={TICKET_PRICE}
                />
              </div>

              <div className="md:col-span-1">
                <Card className="md:sticky md:top-24 border-none shadow-xl bg-white overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6 bg-slate-50 border-b">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-primary" /> 
                        Tu Compra
                      </h3>
                    </div>
                    <div className="p-6 space-y-6">
                      {state.selectedQuantity === 0 ? (
                        <div className="py-12 text-center space-y-3">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                            <Zap className="w-8 h-8 text-slate-300" />
                          </div>
                          <p className="text-gray-400 text-sm">Selecciona un combo para participar.</p>
                        </div>
                      ) : (
                        <>
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-gray-500 uppercase">Cantidad:</span>
                              <Badge className="bg-primary">{state.selectedQuantity} Boletas</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-gray-500 uppercase">Precio Unitario:</span>
                              <span className="font-bold text-gray-700">${TICKET_PRICE.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="pt-6 border-t space-y-4">
                            <div className="flex justify-between items-center text-2xl font-black">
                              <span className="text-sm font-bold text-gray-500 uppercase">Total:</span>
                              <span className="text-primary">${total.toLocaleString()}</span>
                            </div>
                            <Button 
                              onClick={() => setState(prev => ({ ...prev, status: 'checkout' }))}
                              className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg rounded-xl shadow-lg shadow-primary/20 flex gap-2 items-center"
                            >
                              Finalizar Compra <ChevronRight className="w-5 h-5" />
                            </Button>
                            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                              <Shield className="w-3 h-3" /> Transacción 100% Segura
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {state.status === 'checkout' && (
          <CheckoutForm 
            total={total} 
            ticketCount={state.selectedQuantity}
            onBack={() => setState(prev => ({ ...prev, status: 'selecting' }))}
            onSubmit={handleCheckoutSubmit}
          />
        )}

        {state.status === 'processing' && (
          <PaymentSimulation 
            total={total} 
            onComplete={handlePaymentComplete}
          />
        )}

        {state.status === 'success' && state.purchaseRecord && (
          <DigitalTicket 
            record={state.purchaseRecord} 
            onReset={handleReset}
          />
        )}

      </main>

      <footer className="mt-20 py-10 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Ticket className="text-white w-5 h-5 transform -rotate-12" />
            </div>
            <span className="text-lg font-headline font-black tracking-tighter">
              Sorteo<span className="text-accent">Master</span>
            </span>
          </div>
          <p className="text-sm text-gray-400">© 2026 SorteoMaster. Todos los derechos reservados. Juega con responsabilidad.</p>
          <div className="flex gap-4">
             <div className="w-8 h-8 rounded-full bg-gray-50 border flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer">
               <Shield className="w-4 h-4 text-gray-400" />
             </div>
             <div className="w-8 h-8 rounded-full bg-gray-50 border flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer">
               <Trophy className="w-4 h-4 text-gray-400" />
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
