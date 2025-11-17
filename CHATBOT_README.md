# 🤖 Chatbot IA - Cafetería González

Chatbot inteligente con IA usando la API de Claude (Anthropic) para responder preguntas sobre café, recetas, preparación y más.

## ⚠️ IMPORTANTE: Seguridad de API Keys

**NUNCA expongas tu API key públicamente**. Este proyecto usa un servidor backend para proteger tu API key.

## 🚀 Instalación

### 1. Instalar Node.js

Si no tienes Node.js instalado, descárgalo desde: https://nodejs.org/

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar API Key de Anthropic

1. **REVOCA inmediatamente** cualquier API key que hayas compartido públicamente
2. Ve a https://console.anthropic.com/settings/keys
3. Crea una nueva API key
4. Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

5. Edita el archivo `.env` y agrega tu API key:

```env
ANTHROPIC_API_KEY=sk-ant-api03-TU_API_KEY_REAL_AQUI
```

**NUNCA subas el archivo `.env` a Git** (ya está en `.gitignore`)

## 🎯 Uso

### 1. Iniciar el servidor backend

```bash
npm start
```

O para desarrollo con auto-reinicio:

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000`

### 2. Abrir el chatbot

Abre el archivo `chatbot.html` en tu navegador:

- Doble clic en el archivo, o
- Arrastra el archivo al navegador, o
- Usa un servidor local como Live Server en VS Code

## 📁 Estructura del Proyecto

```
cafeteria-gonzalez/
├── chatbot.html          # Interfaz del chatbot (frontend)
├── server.js             # Servidor backend con Express
├── package.json          # Dependencias del proyecto
├── .env.example          # Ejemplo de configuración
├── .env                  # Tu configuración (NO SUBIR A GIT)
├── .gitignore            # Archivos a ignorar en Git
└── CHATBOT_README.md     # Este archivo
```

## 🔒 Seguridad

### ✅ Buenas prácticas implementadas:

1. **API key en variables de entorno** (`.env`)
2. **Servidor backend** que protege la API key
3. **`.gitignore`** configurado para no subir `.env`
4. **Ejemplo de configuración** (`.env.example`) sin datos sensibles

### ❌ NUNCA hagas esto:

- ❌ NO hardcodees la API key en el código
- ❌ NO compartas tu API key en mensajes/chats
- ❌ NO subas el archivo `.env` a Git/GitHub
- ❌ NO expongas tu API key en el frontend

## 🛠️ Características

- ✅ Chat en tiempo real con IA
- ✅ Historial de conversación
- ✅ Interfaz responsive y moderna
- ✅ Indicador de escritura
- ✅ Manejo de errores
- ✅ API key protegida en el backend
- ✅ Configuración segura con variables de entorno

## 🎨 Personalización

### Cambiar el modelo de Claude

En `server.js`, línea 38:

```javascript
model: 'claude-3-5-sonnet-20241022',  // Modelo actual
```

Modelos disponibles:
- `claude-3-5-sonnet-20241022` - Más inteligente y rápido
- `claude-3-opus-20240229` - Más poderoso
- `claude-3-haiku-20240307` - Más rápido y económico

### Cambiar el prompt del sistema

En `server.js`, línea 41, modifica el `system` prompt:

```javascript
system: `Tu prompt personalizado aquí...`
```

## 🐛 Solución de Problemas

### Error: "API key no configurada"

- Asegúrate de haber creado el archivo `.env`
- Verifica que la API key esté correcta en `.env`
- Reinicia el servidor después de modificar `.env`

### Error: "No se puede conectar al servidor"

- Verifica que el servidor esté corriendo (`npm start`)
- Asegúrate de que esté en el puerto 3000
- Revisa la consola del servidor para errores

### Error: "API key inválida"

- La API key ha sido revocada o es incorrecta
- Genera una nueva API key en Anthropic Console
- Actualiza el archivo `.env` con la nueva key

## 📝 API Endpoints

### POST `/api/chat`

Envía un mensaje al chatbot.

**Request:**
```json
{
  "message": "¿Cómo preparar un espresso?",
  "history": []
}
```

**Response:**
```json
{
  "response": "Para preparar un espresso perfecto...",
  "usage": {
    "input_tokens": 123,
    "output_tokens": 456
  }
}
```

### GET `/api/health`

Verifica el estado del servidor.

**Response:**
```json
{
  "status": "ok",
  "message": "Servidor de chatbot funcionando correctamente",
  "hasApiKey": true
}
```

## 🌟 Mejoras Futuras

- [ ] Persistencia de conversaciones
- [ ] Múltiples usuarios/sesiones
- [ ] Integrar con el menú de la cafetería
- [ ] Agregar generación de imágenes
- [ ] Modo de voz (speech-to-text)
- [ ] Exportar conversaciones
- [ ] Temas personalizables
- [ ] Multi-idioma

## 📚 Recursos

- [Documentación de Anthropic](https://docs.anthropic.com/)
- [Claude API Reference](https://docs.anthropic.com/claude/reference/getting-started-with-the-api)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)

## 🤝 Soporte

Si tienes problemas:

1. Revisa la sección de "Solución de Problemas"
2. Verifica la consola del navegador (F12)
3. Verifica la consola del servidor
4. Revisa la documentación de Anthropic

---

**Recuerda: La seguridad de tus API keys es tu responsabilidad. Sigue siempre las mejores prácticas de seguridad.**

🤖 Generated with [Claude Code](https://claude.com/claude-code)
