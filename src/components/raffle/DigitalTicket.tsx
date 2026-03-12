
"use client"

import React from 'react';
import { PurchaseRecord } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Share2, Calendar, MapPin, Hash, User, ShieldCheck } from 'lucide-react';
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
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-headline font-bold text-gray-900">¡Compra Exitosa!</h2>
        <p className="text-gray-500">Tus boletos han sido generados y enviados a su correo.</p>
      </div>

      <Card className="overflow-hidden border-none shadow-2xl bg-white">
        <div className="flex flex-col md:flex-row">
          {/* Main Ticket Side */}
          <div className="flex-1 p-8 border-r-2 border-dashed border-gray-200 relative">
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Boleto Digital Oficial</span>
                <h3 className="text-2xl font-headline font-black text-gray-900 tracking-tight">GRAN SORTEO DE LUJO</h3>
              </div>
              <div className="text-right">
                <span className="block text-xs text-gray-400 uppercase">Referencia</span>
                <span className="font-mono font-bold text-sm">{record.transactionId}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400">
                  <User className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Participante</span>
                </div>
                <p className="font-semibold text-gray-800">{record.userData.firstName} {record.userData.lastName}</p>
                <p className="text-xs text-gray-500">{record.userData.idNumber}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Fecha Compra</span>
                </div>
                <p className="font-semibold text-gray-800">{format(record.timestamp, "dd 'de' MMMM, yyyy", { locale: es })}</p>
                <p className="text-xs text-gray-500">{format(record.timestamp, "HH:mm:ss")}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Hash className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Tus Números Seleccionados</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {record.numbers.map((num) => (
                  <div key={num} className="bg-primary text-white font-bold px-3 py-1.5 rounded-md text-lg shadow-sm border border-primary/20">
                    {num.toString().padStart(3, '0')}
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative holes for ticket look */}
            <div className="absolute top-1/2 -right-4 w-8 h-8 bg-background rounded-full -translate-y-1/2 z-10 hidden md:block"></div>
          </div>

          {/* Ticket Stub Side */}
          <div className="w-full md:w-64 bg-slate-50 p-8 flex flex-col justify-between items-center text-center relative">
            <div className="space-y-4">
              <div className="w-24 h-24 bg-white p-2 rounded-lg shadow-inner mx-auto">
                <div className="w-full h-full bg-black flex items-center justify-center">
                   {/* Simulating QR Code with CSS */}
                   <div className="grid grid-cols-4 gap-0.5 p-1 w-full h-full">
                     {Array.from({length: 16}).map((_, i) => (
                       <div key={i} className={`w-full h-full ${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`}></div>
                     ))}
                   </div>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 font-mono">SCANNED SECURE TICKET</p>
            </div>

            <div className="w-full space-y-1">
              <p className="text-xs text-gray-400 uppercase">Total Pagado</p>
              <p className="text-2xl font-black text-primary">${record.totalAmount.toLocaleString()} COP</p>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <ShieldCheck className="w-3 h-3" />
              VERIFICADO POR RAFFLELINK
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Descargar PDF
        </Button>
        <Button variant="outline" className="gap-2">
          <Share2 className="w-4 h-4" /> Compartir
        </Button>
        <Button onClick={onReset} className="bg-primary hover:bg-primary/90 text-white">
          Comprar más boletas
        </Button>
      </div>
    </div>
  );
};

export default DigitalTicket;
