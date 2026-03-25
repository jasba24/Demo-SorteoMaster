
"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserData } from '@/lib/types';
import { User, Mail, CreditCard, MapPin, ArrowRight, Phone } from 'lucide-react';

const formSchema = z.object({
  firstName: z.string().min(2, "Nombre es muy corto"),
  lastName: z.string().min(2, "Apellido es muy corto"),
  idNumber: z.string().min(6, "Cédula inválida"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(10, "Número de celular inválido (mínimo 10 dígitos)"),
  address: z.string().min(5, "Dirección es muy corta"),
});

interface CheckoutFormProps {
  onSubmit: (data: UserData) => void;
  onBack: () => void;
  total: number;
  ticketCount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, onBack, total, ticketCount }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      idNumber: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in-up">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-headline font-bold text-gray-900">Datos de Contacto</h2>
          <p className="text-gray-500">Completa la información para generar tus boletos digitales.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="Ej. Juan" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cédula / Identificación</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Ej. 123456789" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input type="email" placeholder="juan@ejemplo.com" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular / Teléfono</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input type="tel" placeholder="Ej. 3001234567" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección de Residencia</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Calle 123 #45-67" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm text-gray-500">Resumen de compra ({ticketCount} boletas)</p>
                <p className="text-xl font-bold text-primary">${total.toLocaleString()} COP</p>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="ghost" onClick={onBack}>
                  Atrás
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white gap-2">
                  Continuar al pago <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CheckoutForm;
