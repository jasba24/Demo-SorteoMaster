
# RaffleLink: Arquitectura Técnica Proyectada

Esta es la propuesta de arquitectura para la implementación completa de la plataforma.

## 1. Stack Tecnológico Sugerido
- **Frontend:** Next.js (React) + Tailwind CSS + Lucide Icons + ShadCN UI.
- **Backend:** Node.js (Serverless con Next.js Actions) o Express.js.
- **Base de Datos:** PostgreSQL (Relacional para transacciones críticas).
- **ORM:** Prisma o Drizzle.
- **Pagos:** Integración con API de PSE / Mercado Pago / Stripe.
- **Infraestructura:** Vercel (Frontend/API) + Supabase o AWS RDS (Base de Datos).

## 2. Esquema de Base de Datos (PostgreSQL)

### Tabla: `users`
Almacena la información de los participantes.
- `id`: UUID (PK)
- `first_name`: VARCHAR
- `last_name`: VARCHAR
- `email`: VARCHAR (Unique, Indexed)
- `id_number`: VARCHAR (Cédula)
- `address`: TEXT
- `created_at`: TIMESTAMP

### Tabla: `raffles`
Define los diferentes sorteos disponibles.
- `id`: UUID (PK)
- `title`: VARCHAR
- `description`: TEXT
- `ticket_price`: DECIMAL
- `max_tickets`: INTEGER
- `prize_value`: DECIMAL
- `draw_date`: TIMESTAMP
- `status`: ENUM ('active', 'completed', 'cancelled')

### Tabla: `tickets`
Gestiona el estado de cada número individual en un sorteo.
- `id`: UUID (PK)
- `raffle_id`: UUID (FK -> raffles)
- `number`: INTEGER
- `status`: ENUM ('available', 'reserved', 'sold')
- `purchase_id`: UUID (FK -> purchases, Nullable)

### Tabla: `purchases`
Registro histórico de transacciones exitosas.
- `id`: UUID (PK)
- `user_id`: UUID (FK -> users)
- `total_amount`: DECIMAL
- `transaction_reference`: VARCHAR (PSE Ref)
- `payment_status`: ENUM ('pending', 'completed', 'failed')
- `created_at`: TIMESTAMP

## 3. Flujo de Datos
1. El cliente selecciona números (`tickets.status = 'available'`).
2. Se reserva temporalmente (`tickets.status = 'reserved'`) durante el checkout.
3. Al recibir webhook de pago exitoso de PSE:
   - Se crea registro en `purchases`.
   - Se actualiza `tickets.status = 'sold'`.
   - Se vincula `tickets.purchase_id` con la nueva compra.
4. Se genera el Ticket Digital consultando el JOIN entre `purchases`, `users` y `tickets`.
