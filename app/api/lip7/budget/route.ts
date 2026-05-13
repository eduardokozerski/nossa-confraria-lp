import { NextResponse } from "next/server";
// @ts-ignore
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

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
  if (digitsOnly.length === 10 || digitsOnly.length === 11)
    return `55${digitsOnly}`;
  return digitsOnly;
}

function parseBoolean(value: string | undefined): boolean | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (normalized === "true" || normalized === "1" || normalized === "yes")
    return true;
  if (normalized === "false" || normalized === "0" || normalized === "no")
    return false;
  return null;
}

function buildEmailText(payload: z.infer<typeof budgetPayloadSchema>): string {
  const lines = [
    "Novo pedido de orçamento",
    "",
    `Nome: ${payload.name}`,
    `Telefone: ${normalizePhoneNumber(payload.phone)}`,
    "",
    `Tipo de evento: ${payload.event.type}`,
    `Data do evento: ${payload.event.date}`,
    `Horário de início: ${payload.event.startTime}`,
    `Convidados: ${payload.guests}`,
    `Local: ${payload.location}`,
    "",
    `Buffet: ${payload.buffet.type}`,
    `Cerveja: ${payload.beer}`,
    `Serviço adicional: ${payload.additionalService}`,
  ];

  if (payload.notes?.trim()) {
    lines.push("", "Observações:", payload.notes.trim());
  }

  return lines.join("\n");
}

export async function POST(request: Request) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPortRaw = process.env.SMTP_PORT;
  const smtpSecureRaw = process.env.SMTP_SECURE;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const mailFrom = process.env.MAIL_FROM;
  const mailTo = process.env.MAIL_TO;
  const mailReplyTo = process.env.MAIL_REPLY_TO;

  const smtpPort = smtpPortRaw ? Number(smtpPortRaw) : null;
  const smtpSecure = parseBoolean(smtpSecureRaw);

  if (
    !smtpHost ||
    !smtpPort ||
    Number.isNaN(smtpPort) ||
    smtpSecure === null ||
    !smtpUser ||
    !smtpPass ||
    !mailFrom ||
    !mailTo
  ) {
    return NextResponse.json(
      { error: "E-mail não configurado." },
      { status: 500 },
    );
  }

  const rawBody = await request.json().catch(() => null);
  const parsed = budgetPayloadSchema.safeParse(rawBody);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const payload = parsed.data;
  const subject = `Novo orçamento - ${payload.name}`;
  const text = buildEmailText(payload);

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: mailReplyTo,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível enviar suas informações. Tente novamente." },
      { status: 502 },
    );
  }
}
