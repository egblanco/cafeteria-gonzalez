const express = require('express');
const cors = require('cors');
const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// IMPORTANTE: La API key debe estar en el archivo .env, NO aquí
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Modelo a usar (puedes cambiarlo por cualquier modelo de Hugging Face)
const MODEL = 'mistralai/Mistral-7B-Instruct-v0.2';

// Endpoint para el chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'El mensaje es requerido' });
        }

        // Verificar que la API key esté configurada
        if (!process.env.HUGGINGFACE_API_KEY) {
            return res.status(500).json({
                error: 'API key no configurada. Por favor configura HUGGINGFACE_API_KEY en el archivo .env'
            });
        }

        // Construir el prompt con historial y contexto
        let conversationContext = `Eres un asistente experto en café de la Cafetería González.
Tienes conocimiento profundo sobre:
- Tipos de café y sus preparaciones
- Recetas de bebidas de café
- Historia y cultura del café
- Técnicas de barista
- Maridajes y recomendaciones

Responde de manera amigable, informativa y profesional en español.
Si no sabes algo, sé honesto al respecto.

`;

        // Agregar historial de conversación
        history.forEach(msg => {
            if (msg.role === 'user') {
                conversationContext += `Usuario: ${msg.content}\n`;
            } else if (msg.role === 'assistant') {
                conversationContext += `Asistente: ${msg.content}\n`;
            }
        });

        // Agregar mensaje actual
        conversationContext += `Usuario: ${message}\nAsistente:`;

        // Llamar a la API de Hugging Face
        const response = await hf.textGeneration({
            model: MODEL,
            inputs: conversationContext,
            parameters: {
                max_new_tokens: 500,
                temperature: 0.7,
                top_p: 0.95,
                return_full_text: false
            }
        });

        // Extraer el texto de la respuesta
        const assistantMessage = response.generated_text.trim();

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
        hasApiKey: !!process.env.HUGGINGFACE_API_KEY,
        model: MODEL
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`🤗 Usando Hugging Face con modelo: ${MODEL}`);
    console.log(`📝 API key configurada: ${process.env.HUGGINGFACE_API_KEY ? 'SÍ ✅' : 'NO ❌'}`);

    if (!process.env.HUGGINGFACE_API_KEY) {
        console.warn('⚠️  ADVERTENCIA: No se encontró HUGGINGFACE_API_KEY en el archivo .env');
        console.warn('   Por favor crea un archivo .env con tu API key de Hugging Face');
        console.warn('   Obtén una gratis en: https://huggingface.co/settings/tokens');
    }
});
