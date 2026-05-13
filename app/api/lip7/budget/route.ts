import { NextResponse } from "next/server";
import { z } from "zod";

const budgetPayloadSchema = z.object({
  name: z.string().trim().min(1),
  phone: z.string().trim().min(1),
  event: z.object({
    type: z.string().trim().min(1),
    date: z.string().trim().min(1),
    startTime: z.string().trim().min(1),
  }),
  buffet: z.object({
    type: z.string().trim().min(1),
  }),
  guests: z.number().int().positive(),
  location: z.string().trim().min(1),
  beer: z.string().trim().min(1),
  additionalService: z.string().trim().min(1),
  notes: z.string().trim().optional(),
});

function normalizePhoneNumber(rawPhoneNumber: string): string {
  const digitsOnly = rawPhoneNumber.replace(/\D/g, "");
  if (!digitsOnly) return "";
  if (digitsOnly.startsWith("55")) return digitsOnly;
  if (digitsOnly.length === 10 || digitsOnly.length === 11) return `55${digitsOnly}`;
  return digitsOnly;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.LIP7_WEBHOOK_URL;
  const webhookApiKey = process.env.LIP7_WEBHOOK_API_KEY;

  if (!webhookUrl || !webhookApiKey) {
    return NextResponse.json(
      { error: "Integração indisponível no momento." },
      { status: 500 }
    );
  }

  const rawBody = await request.json().catch(() => null);
  const parsed = budgetPayloadSchema.safeParse(rawBody);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const payload = parsed.data;

  const webhookBody = {
    phoneNumber: normalizePhoneNumber(payload.phone),
    username: payload.name,
    userMessage: "Pedido de orçamento via landing page",
    variables: {
      beer: payload.beer,
      notes: payload.notes ?? "",
      guests: payload.guests,
      eventDate: payload.event.date,
      date_time: payload.event.date,
      eventStartTime: payload.event.startTime,
      buffetType: payload.buffet.type,
      eventLocation: payload.location,
      eventType: payload.event.type,
      additionalService: payload.additionalService,
    },
  };

  const upstreamResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": webhookApiKey,
    },
    body: JSON.stringify(webhookBody),
    cache: "no-store",
  });

  if (upstreamResponse.ok) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { error: "Não foi possível enviar suas informações. Tente novamente." },
    { status: 502 }
  );
}

