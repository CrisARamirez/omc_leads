import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

type OpenAIError = {
  status?: number;
  code?: string;
  message?: string;
};

@Injectable()
export class AiService {
  private client: OpenAI;
  private readonly logger = new Logger(AiService.name);

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateLeadSummary(leads: unknown[]): Promise<string> {
    const prompt = `
Eres un analista de negocios experto en marketing y ventas.

Analiza estos leads y genera un resumen ejecutivo:

${JSON.stringify(leads, null, 2)}

Incluye:
- análisis general
- fuente principal
- comportamiento de presupuesto
- recomendaciones
    `.trim();

    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0.5,
        messages: [
          {
            role: 'system',
            content: 'Eres un analista senior de marketing y ventas.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      return response.choices[0]?.message?.content ?? '';
    } catch (error: unknown) {
      const err = error as OpenAIError;

      if (err.status === 429 || err.code === 'insufficient_quota') {
        this.logger.warn('OpenAI quota/rate limit reached (429). Using fallback mock.');

        return this.mockSummary(leads);
      }

      this.logger.error(`OpenAI unexpected error: ${err?.message}`, err);

      return this.mockSummary(leads);
    }
  }

  private mockSummary(leads: unknown[]) {
    const total = leads.length;

    this.logger.log(`Generating mock AI summary for ${total} leads`);

    return `
📊 RESUMEN EJECUTIVO (MODO FALLBACK)

- Total de leads: ${total}
- Fuente principal: instagram (estimado)
- Presupuesto promedio: $1200 (simulado)

📌 INSIGHT:
El servicio de IA no está disponible actualmente,
pero el sistema sigue funcionando en modo degradado.

🚀 RECOMENDACIÓN:
- Revisar plan de OpenAI
- Optimizar consumo de tokens
- Implementar caching de respuestas IA
    `.trim();
  }
}
