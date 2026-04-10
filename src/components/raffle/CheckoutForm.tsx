
"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserData } from '@/lib/types';
import { ArrowRight, User, Mail, CreditCard, Phone } from 'lucide-react';

const schema = z.object({
  firstName: z.string().min(2, "Nombre requerido"),
  idNumber: z.string().min(6, "Cédula inválida"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Celular inválido"),
});

interface Props {
  onSubmit: (data: UserData) => void;
  onBack: () => void;
  total: number;
}

const CheckoutForm: React.FC<Props> = ({ onSubmit, onBack, total }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserData>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-2">Datos de Registro</h2>
      <p className="text-gray-500 mb-8 text-sm">Tus boletos se enviarán a este correo.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nombre Completo</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
            <input 
              {...register("firstName")}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors"
              placeholder="Juan Pérez"
            />
          </div>
          {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Cédula</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
            <input 
              {...register("idNumber")}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors"
              placeholder="123456789"
            />
          </div>
          {errors.idNumber && <span className="text-red-500 text-xs">{errors.idNumber.message}</span>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Correo Electrónico</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
            <input 
              type="email"
              {...register("email")}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors"
              placeholder="juan@ejemplo.com"
            />
          </div>
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Celular</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
            <input 
              type="tel"
              {...register("phone")}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors"
              placeholder="3001234567"
            />
          </div>
          {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
        </div>

        <div className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-xs text-gray-400 font-bold uppercase">Total a Pagar</p>
            <p className="text-3xl font-black text-primary">${total.toLocaleString()}</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              type="button" 
              onClick={onBack}
              className="flex-1 md:flex-none px-6 py-3 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
            >
              Atrás
            </button>
            <button 
              type="submit"
              className="flex-1 md:flex-none bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Pagar Ahora <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
