"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const questionnaireSchema = z
  .object({
    name: z.string().trim().min(1, "Informe como devemos te chamar."),
    phone: z.string().trim().min(1, "Informe um telefone para contato."),
    eventType: z.string().min(1, "Selecione o tipo de evento."),
    eventTypeOther: z.string().trim().optional(),
    eventDate: z.string().trim().optional(),
    eventStartTime: z.string().trim().optional(),
    buffetType: z.string().min(1, "Selecione o tipo de buffet."),
    buffetTypeOther: z.string().trim().optional(),
    guests: z.coerce
      .number({ invalid_type_error: "Informe o número de convidados." })
      .int("O número de convidados deve ser inteiro.")
      .positive("O número de convidados deve ser maior que zero."),
    eventLocation: z.string().min(1, "Selecione o local do evento."),
    eventLocationOther: z.string().trim().optional(),
    beer: z.string().min(1, "Selecione a cerveja desejada."),
    additionalService: z.string().min(1, "Selecione um serviço adicional."),
    additionalServiceOther: z.string().trim().optional(),
    notes: z.string().trim().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.eventType === "outro" && !values.eventTypeOther) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Descreva o tipo de evento.",
        path: ["eventTypeOther"],
      });
    }

    if (values.buffetType === "outro" && !values.buffetTypeOther) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Descreva o tipo de buffet.",
        path: ["buffetTypeOther"],
      });
    }

    if (values.eventLocation === "outro" && !values.eventLocationOther) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Descreva o local do evento.",
        path: ["eventLocationOther"],
      });
    }

    if (
      values.additionalService === "outro" &&
      !values.additionalServiceOther
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Descreva o serviço adicional.",
        path: ["additionalServiceOther"],
      });
    }
  });

type QuestionnaireFormValues = z.infer<typeof questionnaireSchema>;

type BudgetQuestionnairePayload = {
  name: string;
  phone: string;
  event: {
    type: string;
    date?: string;
    startTime?: string;
  };
  buffet: {
    type: string;
  };
  guests: number;
  location: string;
  beer: string;
  additionalService: string;
  notes?: string;
};

const eventTypeLabels: Record<string, string> = {
  casamento: "Casamento",
  noivado: "Noivado",
  formatura: "Formatura",
  aniversario: "Aniversário",
  aniversarioInfantil: "Aniversário Infantil",
};

const buffetTypeLabels: Record<string, string> = {
  tradicional: "Tradicional",
  churrasco: "Churrasco",
};

const eventLocationLabels: Record<string, string> = {
  nossaConfraria:
    "Nossa Confraria (Rua da Cerâmica 49, bairro Fortaleza, Ponte Nova - MG)",
};

const beerLabels: Record<string, string> = {
  original: "Original",
  spaten: "Spaten",
  heineken: "Heineken (adicional de R$ 12,00 por convidado)",
  semCerveja: "Sem cerveja",
};

const additionalServiceLabels: Record<string, string> = {
  mesaFrios: "Mesa de Frios e Antepasto (R$ 30,00 por convidado)",
  mesaMineira: "Mesa Mineira e petiscos (R$ 20,00 por convidado)",
  mesaFastFood: "Mesa de Fast Food (R$ 18,00 por convidado)",
};

function resolveSelectValue(
  value: string,
  other: string | undefined,
  labels: Record<string, string>,
): string {
  if (value === "outro") return other?.trim() ?? "";
  return labels[value] ?? value;
}

async function submitBudgetQuestionnaire(
  _payload: BudgetQuestionnairePayload,
): Promise<void> {
  await Promise.resolve();
}

export function Budget() {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success">("idle");
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const form = useForm<QuestionnaireFormValues>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      name: "",
      phone: "",
      eventType: "",
      eventTypeOther: "",
      eventDate: "",
      eventStartTime: "",
      buffetType: "",
      buffetTypeOther: "",
      guests: 0,
      eventLocation: "",
      eventLocationOther: "",
      beer: "",
      additionalService: "",
      additionalServiceOther: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const eventType = form.watch("eventType");
  const buffetType = form.watch("buffetType");
  const eventLocation = form.watch("eventLocation");
  const additionalService = form.watch("additionalService");

  const previousInfo = useMemo(
    () => [
      "O serviço padrão inclui 16 entradas volantes e 1 opção (almoço ou jantar).",
      "Duração do serviço: 6 horas, com possibilidade de contratar hora extra.",
      "Em aniversário infantil: 5 horas de serviço e sem jantar.",
      "Para pedidos personalizados, use o campo de observações.",
      "Dúvidas no WhatsApp: (31) 99805-2003.",
    ],
    [],
  );

  useEffect(() => {
    if (!isQuestionnaireOpen) return;
    const timeoutId = window.setTimeout(
      () => firstFieldRef.current?.focus(),
      50,
    );
    return () => window.clearTimeout(timeoutId);
  }, [isQuestionnaireOpen]);

  const onSubmit = async (values: QuestionnaireFormValues) => {
    const payload: BudgetQuestionnairePayload = {
      name: values.name,
      phone: values.phone,
      event: {
        type: resolveSelectValue(
          values.eventType,
          values.eventTypeOther,
          eventTypeLabels,
        ),
        date: values.eventDate || undefined,
        startTime: values.eventStartTime || undefined,
      },
      buffet: {
        type: resolveSelectValue(
          values.buffetType,
          values.buffetTypeOther,
          buffetTypeLabels,
        ),
      },
      guests: values.guests,
      location: resolveSelectValue(
        values.eventLocation,
        values.eventLocationOther,
        eventLocationLabels,
      ),
      beer: beerLabels[values.beer] ?? values.beer,
      additionalService: resolveSelectValue(
        values.additionalService,
        values.additionalServiceOther,
        additionalServiceLabels,
      ),
      notes: values.notes || undefined,
    };

    await submitBudgetQuestionnaire(payload);
    setSubmitState("success");
  };

  return (
    <section id="orcamento" className="py-32 bg-background">
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-6 transition-all duration-1000",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
      >
        <div className="text-center mb-14 space-y-4">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm">
            Faça seu orçamento
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-balance">
            Conte pra gente sobre o seu{" "}
            <span className="text-primary italic">evento</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Responda algumas perguntas rápidas para montarmos um orçamento mais
            preciso.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Button
            size="lg"
            onClick={() => {
              setSubmitState("idle");
              setIsQuestionnaireOpen((open) => !open);
              if (isQuestionnaireOpen) form.reset();
            }}
          >
            {isQuestionnaireOpen
              ? "Fechar questionário"
              : "Iniciar questionário"}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline">
                Informações prévias
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Informações prévias</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Antes de iniciar, considere os pontos abaixo:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  {previousInfo.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/5531998052003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary underline underline-offset-4"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isQuestionnaireOpen && (
          <div className="max-w-4xl mx-auto bg-card border border-border p-6 md:p-10">
            {submitState === "success" && (
              <div className="mb-8 border border-primary/30 bg-primary/5 p-4">
                <p className="text-foreground">
                  Recebemos suas informações. Em breve entraremos em contato.
                </p>
              </div>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Como devemos te chamar?*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          ref={(node) => {
                            field.ref(node);
                            firstFieldRef.current = node;
                          }}
                          placeholder="Seu nome"
                        />
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
                      <FormLabel>Telefone para contato*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="(00) 00000-0000"
                          inputMode="tel"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de evento*</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            if (value !== "outro")
                              form.setValue("eventTypeOther", "");
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="casamento">Casamento</SelectItem>
                            <SelectItem value="noivado">Noivado</SelectItem>
                            <SelectItem value="formatura">Formatura</SelectItem>
                            <SelectItem value="aniversario">
                              Aniversário
                            </SelectItem>
                            <SelectItem value="aniversarioInfantil">
                              Aniversário Infantil
                            </SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {eventType === "outro" && (
                  <FormField
                    control={form.control}
                    name="eventTypeOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descreva o evento*</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ex.: Confraternização"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data do evento</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventStartTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário de início</FormLabel>
                      <FormControl>
                        <Input {...field} type="time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="buffetType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de buffet almejado*</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            if (value !== "outro")
                              form.setValue("buffetTypeOther", "");
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tradicional">
                              Tradicional
                            </SelectItem>
                            <SelectItem value="churrasco">Churrasco</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {buffetType === "outro" && (
                  <FormField
                    control={form.control}
                    name="buffetTypeOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descreva o buffet*</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ex.: Coquetel" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de convidados estimados*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min={1}
                          placeholder="Ex.: 120"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Local do evento*</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            if (value !== "outro")
                              form.setValue("eventLocationOther", "");
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nossaConfraria">
                              Nossa Confraria (Rua da Cerâmica 49, bairro
                              Fortaleza, Ponte Nova - MG)
                            </SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {eventLocation === "outro" && (
                  <FormField
                    control={form.control}
                    name="eventLocationOther"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Descreva o local*</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ex.: Sítio, salão, endereço completo..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="beer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cerveja desejada*</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="original">Original</SelectItem>
                            <SelectItem value="spaten">Spaten</SelectItem>
                            <SelectItem value="heineken">
                              Heineken (adicional de R$ 12,00 por convidado)
                            </SelectItem>
                            <SelectItem value="semCerveja">
                              Sem cerveja
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalService"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contratação de serviço adicional*</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            if (value !== "outro")
                              form.setValue("additionalServiceOther", "");
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mesaFrios">
                              Mesa de Frios e Antepasto (R$ 30,00 por convidado)
                            </SelectItem>
                            <SelectItem value="mesaMineira">
                              Mesa Mineira e petiscos (R$ 20,00 por convidado)
                            </SelectItem>
                            <SelectItem value="mesaFastFood">
                              Mesa de Fast Food (R$ 18,00 por convidado)
                            </SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {additionalService === "outro" && (
                  <FormField
                    control={form.control}
                    name="additionalServiceOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descreva o serviço adicional*</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ex.: Bar de drinks" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>
                        Observações, solicitações ou dúvidas
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Escreva aqui qualquer detalhe que ajude no orçamento..."
                          className="min-h-28"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSubmitState("idle");
                      form.reset();
                      firstFieldRef.current?.focus();
                    }}
                  >
                    Limpar
                  </Button>
                  <Button type="submit">Enviar</Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </section>
  );
}
