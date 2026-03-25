
"use client"

import React from 'react';
import { PurchaseRecord } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Share2, Calendar, Hash, User, ShieldCheck, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DigitalTicketProps {
  record: PurchaseRecord;
  onReset: () => void;
}

const DigitalTicket: React.FC<DigitalTicketProps> = ({ record, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-headline font-black text-gray-900 tracking-tight">¡Compra Exitosa!</h2>
        <p className="text-gray-500 text-lg">Tus números de la suerte han sido generados.</p>
      </div>

      <Card className="overflow-hidden border-none shadow-2xl bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-8 border-r-2 border-dashed border-gray-200 relative">
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-2 py-1 rounded">Boleto Digital Oficial</span>
                <h3 className="text-2xl md:text-3xl font-headline font-black text-gray-900 tracking-tight mt-2">GRAN SORTEO DE LUJO</h3>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-widest">Referencia</span>
                <span className="font-mono font-bold text-sm bg-slate-50 px-2 py-1 rounded">{record.transactionId}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <User className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Participante</span>
                </div>
                <p className="font-bold text-xl text-gray-800 leading-none">{record.userData.firstName} {record.userData.lastName}</p>
                <p className="text-sm text-gray-500">{record.userData.idNumber}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Fecha Compra</span>
                </div>
                <p className="font-bold text-xl text-gray-800 leading-none">{format(record.timestamp, "dd 'de' MMMM", { locale: es })}</p>
                <p className="text-sm text-gray-500">{format(record.timestamp, "yyyy • HH:mm:ss")}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 border-b pb-2">
                <div className="flex items-center gap-2 text-gray-400">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Tus Números de la Suerte ({record.numbers.length})</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {record.numbers.map((num) => (
                  <div key={num} className="bg-primary text-white font-mono font-black py-2 rounded-xl text-center text-xl shadow-md border border-primary/20 transform hover:scale-105 transition-transform">
                    {num}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute top-1/2 -right-4 w-8 h-8 bg-background rounded-full -translate-y-1/2 z-10 hidden md:block border-l-2 border-gray-100"></div>
          </div>

          <div className="w-full md:w-72 bg-slate-50 p-8 flex flex-col justify-between items-center text-center relative">
            <div className="space-y-4">
              <div className="w-32 h-32 bg-white p-3 rounded-2xl shadow-inner mx-auto">
                <div className="w-full h-full bg-black flex items-center justify-center rounded-lg overflow-hidden">
                   <div className="grid grid-cols-6 gap-0.5 p-1 w-full h-full">
                     {Array.from({length: 36}).map((_, i) => (
                       <div key={i} className={`w-full h-full ${Math.random() > 0.4 ? 'bg-white' : 'bg-black'}`}></div>
                     ))}
                   </div>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 font-mono font-bold tracking-tighter">TICKET ID: {record.id.toUpperCase()}</p>
            </div>

            <div className="w-full space-y-2 py-6">
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Inversión Total</p>
              <p className="text-3xl font-black text-primary">${record.totalAmount.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-gray-400">PESOS COLOMBIANOS</p>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-green-600 font-black bg-green-50 px-4 py-2 rounded-full border border-green-100">
              <ShieldCheck className="w-4 h-4" />
              VERIFICADO POR SORTEOMASTER
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button variant="outline" className="h-12 px-6 gap-2 font-bold rounded-xl border-2">
          <Download className="w-4 h-4" /> Descargar PDF
        </Button>
        <Button variant="outline" className="h-12 px-6 gap-2 font-bold rounded-xl border-2">
          <Share2 className="w-4 h-4" /> Compartir
        </Button>
        <Button onClick={onReset} className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20">
          Comprar más combos
        </Button>
      </div>
    </div>
  );
};

export default DigitalTicket;
