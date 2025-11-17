const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// IMPORTANTE: La API key debe estar en el archivo .env, NO aquí
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Modelo a usar - Groq ofrece modelos muy rápidos y gratuitos
const MODEL = 'llama-3.1-8b-instant';

// Endpoint para el chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'El mensaje es requerido' });
        }

        // Verificar que la API key esté configurada
        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({
                error: 'API key no configurada. Por favor configura GROQ_API_KEY en el archivo .env'
            });
        }

        // Construir mensajes para la API de Groq
        const messages = [
            {
                role: 'system',
                content: `Eres un asistente experto en café de la Cafetería González. Tienes conocimiento profundo sobre:
- Tipos de café y sus preparaciones
- Recetas de bebidas de café
- Historia y cultura del café
- Técnicas de barista
- Maridajes y recomendaciones

Responde de manera amigable, informativa y profesional en español. Sé conciso pero completo.`
            }
        ];

        // Agregar historial de conversación
        history.forEach(msg => {
            messages.push({
                role: msg.role,
                content: msg.content
            });
        });

        // Agregar mensaje actual
        messages.push({
            role: 'user',
            content: message
        });

        // Llamar a la API de Groq
        const response = await groq.chat.completions.create({
            model: MODEL,
            messages: messages,
            max_tokens: 500,
            temperature: 0.7,
            top_p: 0.9
        });

        // Extraer el texto de la respuesta
        const assistantMessage = response.choices[0].message.content.trim();

        res.json({
            response: assistantMessage,
            model: MODEL
        });

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);

        if (error.status === 401 || error.message?.includes('401')) {
            res.status(401).json({
                error: 'API key inválida. Por favor verifica tu configuración.'
            });
        } else if (error.status === 429) {
            res.status(429).json({
                error: 'Límite de uso excedido. Por favor intenta en unos minutos.'
            });
        } else {
            res.status(500).json({
                error: 'Error al procesar tu mensaje. Por favor intenta de nuevo.',
                details: error.message
            });
        }
    }
});

// Endpoint de salud
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Servidor de chatbot funcionando correctamente',
        hasApiKey: !!process.env.GROQ_API_KEY,
        model: MODEL,
        provider: 'Groq'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`⚡ Usando Groq con modelo: ${MODEL}`);
    console.log(`📝 API key configurada: ${process.env.GROQ_API_KEY ? 'SÍ ✅' : 'NO ❌'}`);

    if (!process.env.GROQ_API_KEY) {
        console.warn('⚠️  ADVERTENCIA: No se encontró GROQ_API_KEY en el archivo .env');
        console.warn('   Por favor crea un archivo .env con tu API key de Groq');
        console.warn('   Obtén una GRATIS en: https://console.groq.com/keys');
    }
});
