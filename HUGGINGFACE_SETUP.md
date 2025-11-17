# 🤗 Guía Rápida: Configurar Hugging Face API (GRATIS)

## ✨ ¿Por qué Hugging Face?

- ✅ **100% GRATUITO** (con límites generosos)
- ✅ **No requiere tarjeta de crédito**
- ✅ **Modelos de código abierto**
- ✅ **Miles de modelos disponibles**
- ✅ **Fácil de configurar**

---

## 🚀 Paso 1: Crear Cuenta en Hugging Face

1. Ve a: **https://huggingface.co/join**
2. Regístrate con tu email o GitHub
3. **¡Es completamente gratis!**

---

## 🔑 Paso 2: Obtener tu API Key (Token)

### Opción A: Desde la web

1. Inicia sesión en Hugging Face
2. Ve a: **https://huggingface.co/settings/tokens**
3. Haz clic en **"New token"**
4. Configura:
   - **Name:** `cafeteria-gonzalez-chatbot`
   - **Type:** Selecciona **"Read"** (es suficiente)
5. Haz clic en **"Generate token"**
6. **Copia el token** (empieza con `hf_...`)

### Opción B: Instrucciones visuales

```
1. Settings (arriba derecha) → Access Tokens
2. Create new token → Read access
3. Copy el token: hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 📝 Paso 3: Configurar el Token en el Proyecto

### 3.1 Abre el archivo `.env`

```bash
nano .env
```

O ábrelo con tu editor de texto favorito.

### 3.2 Pega tu token

```env
HUGGINGFACE_API_KEY=hf_TU_TOKEN_COPIADO_AQUI
```

**Ejemplo:**
```env
HUGGINGFACE_API_KEY=hf_abc123def456ghi789jkl012mno345pqr678stu
```

### 3.3 Guarda el archivo

- **nano:** Ctrl+O → Enter → Ctrl+X
- **VS Code:** Cmd+S o Ctrl+S

---

## 📦 Paso 4: Instalar Dependencias

```bash
npm install
```

Esto instalará:
- `@huggingface/inference` - SDK de Hugging Face
- `express` - Servidor web
- `cors` - Permite peticiones desde el navegador
- `dotenv` - Maneja variables de entorno

---

## 🎯 Paso 5: Iniciar el Chatbot

### 5.1 Iniciar el servidor

```bash
npm start
```

Deberías ver:
```
🚀 Servidor corriendo en http://localhost:3000
🤗 Usando Hugging Face con modelo: mistralai/Mistral-7B-Instruct-v0.2
📝 API key configurada: SÍ ✅
```

### 5.2 Abrir el chatbot

- Abre en tu navegador: `chatbot.html`
- O haz doble clic en el archivo

---

## 💬 ¡Listo para Chatear!

Ya puedes hacer preguntas como:
- "¿Cómo preparar un espresso perfecto?"
- "Dame una receta de capuchino"
- "¿Cuál es la diferencia entre latte y flat white?"
- "Necesito consejos para preparar café en casa"

---

## 🎨 Modelos Alternativos (Opcionales)

Puedes cambiar el modelo en `server.js` línea 17:

### Modelos recomendados:

```javascript
// Mistral - Rápido y bueno (RECOMENDADO)
const MODEL = 'mistralai/Mistral-7B-Instruct-v0.2';

// Meta Llama - Muy bueno en español
const MODEL = 'meta-llama/Meta-Llama-3-8B-Instruct';

// Google Gemma - Rápido
const MODEL = 'google/gemma-7b-it';

// Microsoft Phi - Pequeño y rápido
const MODEL = 'microsoft/phi-2';

// Zephyr - Conversacional
const MODEL = 'HuggingFaceH4/zephyr-7b-beta';
```

---

## 🐛 Solución de Problemas

### Error: "API key no configurada"

```bash
# Verifica que el archivo .env existe
ls -la .env

# Verifica que tiene contenido
cat .env
```

Debe mostrar:
```
HUGGINGFACE_API_KEY=hf_tu_token_aqui
```

### Error: "Cannot find module '@huggingface/inference'"

```bash
# Reinstala las dependencias
rm -rf node_modules
npm install
```

### Error: "Model is loading" o demora mucho

- Algunos modelos tardan en cargar la primera vez
- Espera 1-2 minutos
- Usa un modelo más pequeño como `microsoft/phi-2`

### Error: "Rate limit exceeded"

- Hugging Face tiene límites gratuitos
- Espera unos minutos y vuelve a intentar
- Considera usar un modelo menos popular

---

## 📊 Límites del Plan Gratuito

Hugging Face GRATIS incluye:

- ✅ **1,000 requests por día** (más que suficiente para testing)
- ✅ **Acceso a miles de modelos**
- ✅ **Sin tarjeta de crédito requerida**
- ✅ **Sin fecha de expiración**

Si necesitas más:
- Plan Pro: $9/mes (30,000 requests/día)
- Plan Enterprise: Custom

---

## 🔒 Seguridad

### ✅ Buenas prácticas:

- ✅ API key en `.env` (NO en el código)
- ✅ `.env` en `.gitignore` (NO se sube a GitHub)
- ✅ Servidor backend protege la API key
- ✅ Frontend NO puede ver la API key

### ❌ NUNCA hagas esto:

- ❌ Subir `.env` a GitHub
- ❌ Compartir tu API key en chats/emails
- ❌ Hardcodear la API key en el código
- ❌ Exponer la API key en el frontend

---

## 📚 Recursos

- **Hugging Face Hub:** https://huggingface.co/models
- **Documentación:** https://huggingface.co/docs
- **API Inference:** https://huggingface.co/docs/api-inference
- **Tokens:** https://huggingface.co/settings/tokens

---

## 🎉 ¡Disfruta tu Chatbot IA GRATIS!

Ahora tienes un chatbot con IA completamente funcional usando Hugging Face.

**¿Preguntas?** Revisa la documentación o pregúntame.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
