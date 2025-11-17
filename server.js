const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// IMPORTANTE: La API key debe estar en el archivo .env, NO aquí
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// Endpoint para el chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'El mensaje es requerido' });
        }

        // Verificar que la API key esté configurada
        if (!process.env.ANTHROPIC_API_KEY) {
            return res.status(500).json({
                error: 'API key no configurada. Por favor configura ANTHROPIC_API_KEY en el archivo .env'
            });
        }

        // Construir mensajes incluyendo historial
        const messages = [
            ...history,
            { role: 'user', content: message }
        ];

        // Llamar a la API de Claude
        const response = await anthropic.messages.create({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 1024,
            system: `Eres un asistente experto en café de la Cafetería González.
                    Tienes conocimiento profundo sobre:
                    - Tipos de café y sus preparaciones
                    - Recetas de bebidas de café
                    - Historia y cultura del café
                    - Técnicas de barista
                    - Maridajes y recomendaciones

                    Responde de manera amigable, informativa y profesional.
                    Si no sabes algo, sé honesto al respecto.`,
            messages: messages
        });

        // Extraer el texto de la respuesta
        const assistantMessage = response.content[0].text;

        res.json({
            response: assistantMessage,
            usage: response.usage
        });

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);

        if (error.status === 401) {
            res.status(401).json({
                error: 'API key inválida. Por favor verifica tu configuración.'
            });
        } else {
            res.status(500).json({
                error: 'Error al procesar tu mensaje. Por favor intenta de nuevo.'
            });
        }
    }
});

// Endpoint de salud
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Servidor de chatbot funcionando correctamente',
        hasApiKey: !!process.env.ANTHROPIC_API_KEY
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📝 API key configurada: ${process.env.ANTHROPIC_API_KEY ? 'SÍ ✅' : 'NO ❌'}`);

    if (!process.env.ANTHROPIC_API_KEY) {
        console.warn('⚠️  ADVERTENCIA: No se encontró ANTHROPIC_API_KEY en el archivo .env');
        console.warn('   Por favor crea un archivo .env con tu API key de Anthropic');
    }
});
