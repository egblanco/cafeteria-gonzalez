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

// Modelo a usar - Meta Llama 3 (gratis en Hugging Face)
const MODEL = 'meta-llama/Meta-Llama-3-8B-Instruct';

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

        // Construir mensajes para Llama 3 con base de conocimientos completa
        const messages = [
            {
                role: 'system',
                content: `Eres un asistente experto en café de la Cafetería González. Responde en español de manera amigable y profesional.

BASE DE CONOCIMIENTOS - GUÍA COMPLETA DE CAFÉ:

🔸 ESPRESSO
- Ingredientes: Café molido
- Proporción: 7-9g café / 25-30ml agua
- Preparación: 1) Muele café fino. 2) Compacta en portafiltro. 3) Extrae 25-30ml en 25-30 segundos.
- Trucos: Taza caliente. La crema dorada indica extracción correcta. No lleva leche.

🔸 CAFÉ CON LECHE
- Ingredientes: Espresso + Leche
- Proporción: 50% café / 50% leche
- Preparación: 1) Prepara espresso. 2) Calienta y espuma leche. 3) Mezcla en taza grande.
- Latte Art: Vierte lentamente para integrar café y leche.
- Trucos: Usa leche fresca. Taza caliente mejora sabor.

🔸 CAPUCHINO
- Ingredientes: Espresso + Leche + Espuma
- Proporción: 1/3 cada uno
- Preparación: 1) Prepara espresso. 2) Espuma leche (microespuma). 3) Vierte leche espumada sobre café.
- Latte Art: Dibujo simple: corazón o línea.
- Trucos: Microespuma cremosa. Golpecitos para eliminar burbujas grandes.

🔸 LATTE MACCHIATO
- Ingredientes: Leche + Espresso
- Proporción: Mayoría leche / 1 shot espresso
- Preparación: 1) Llena vaso alto con leche espumada. 2) Vierte espresso lentamente sobre leche.
- Latte Art: Capas visibles: leche, espuma y café.
- Trucos: Usa vaso transparente. Vertido lento y controlado.

🔸 BOMBÓN
- Ingredientes: Leche condensada + Espresso (+ espuma opcional)
- Proporción: 2-3 cucharadas leche condensada + 1 shot espresso
- Preparación: 1) Pon leche condensada en taza. 2) Añade espresso. 3) Opcional: espuma encima.
- Trucos: No mezclar al principio. Capas visibles dan efecto profesional.

🔸 MOCHA
- Ingredientes: Chocolate + Espresso + Leche + Espuma
- Proporción: 1-2 cucharadas cacao + 1 shot espresso + leche
- Preparación: 1) Mezcla cacao con leche caliente. 2) Añade espresso. 3) Espuma leche encima.
- Latte Art: Dibujo simple si deseas.
- Trucos: Espolvorea cacao o chocolate rallado para aroma extra.

🔸 FLAT WHITE
- Ingredientes: Espresso doble + Leche
- Proporción: 1 shot doble + leche microespumada
- Preparación: 1) Prepara espresso doble. 2) Espuma leche cremosa. 3) Vierte lentamente sobre espresso.
- Latte Art: Dibujo simple: corazón o línea.
- Trucos: Menos espuma = dibujo más definido. Microespuma fina.

🔸 CORTADO
- Ingredientes: Espresso + Leche
- Proporción: 2/3 espresso / 1/3 leche
- Preparación: 1) Prepara espresso. 2) Añade un toque de leche caliente.
- Trucos: Servir en vaso pequeño. Mantener temperatura.

🔸 ESPECIAL CON MIEL
- Ingredientes: Café/Latte + Miel + Canela
- Proporción: 1 shot espresso + leche + 1 cucharadita miel
- Preparación: 1) Prepara café y leche como latte o capuchino. 2) Añade miel antes de espumar. 3) Espolvorea canela.
- Latte Art: Dibujo simple: corazón o línea.
- Trucos: Mezcla miel con leche caliente antes de espumar. Aroma y presentación profesional.

🔹 TRUCOS GENERALES DE BARISTA:
• Microespuma perfecta: cremosa y sin burbujas grandes
• Leche fría al empezar: facilita control y textura
• Tazas precalentadas: mantienen temperatura ideal
• Latte Art básico:
  - Altura de vertido: 3-4cm para llenar, 1cm para dibujar
  - Velocidad: lenta para dibujo, rápida al final
  - Dibujos fáciles: corazón, línea, roseta simple
• Capas visibles: especialmente en latte macchiato y bombón
• Chocolate o canela: espolvorear sobre mocha o especial con miel
• Golpecitos al jarro: eliminan burbujas grandes
• Practica constante: ajustar leche, café y vertido hasta lograr consistencia y color crema ideal

INSTRUCCIONES DE RESPUESTA:
- Responde de forma DIRECTA y CONCISA
- Si te piden "dime un café" o "qué cafés tienen", lista las opciones brevemente
- Si te preguntan cómo preparar algo, da los pasos específicos del PDF
- NO hagas preguntas de seguimiento sobre pedidos
- Sé amigable pero ve al grano
- Usa la información exacta del PDF cuando sea aplicable

Ejemplo bueno:
Usuario: "dime un café"
Respuesta: "Tenemos estos cafés: Espresso, Café con leche, Capuchino, Latte Macchiato, Bombón, Mocha, Flat White, Cortado y nuestro Especial con miel. ¿Sobre cuál quieres saber más?"

Usuario: "cómo se hace un capuchino"
Respuesta: "Para un capuchino necesitas 1/3 espresso + 1/3 leche + 1/3 espuma. Prepara el espresso, espuma la leche hasta lograr microespuma cremosa, y vierte sobre el café. Truco: da golpecitos al jarro para eliminar burbujas grandes."`
            }
        ];

        // Agregar historial
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

        // Llamar a la API de Hugging Face
        const response = await hf.chatCompletion({
            model: MODEL,
            messages: messages,
            max_tokens: 300,
            temperature: 0.7
        });

        // Extraer respuesta
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
        hasApiKey: !!process.env.HUGGINGFACE_API_KEY,
        model: MODEL,
        provider: 'Hugging Face'
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
        console.warn('   Obtén una en: https://huggingface.co/settings/tokens');
    }
});
