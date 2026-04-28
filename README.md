# 🎓 Asistente Académico UDP

Chatbot de inteligencia artificial para estudiantes de la Universidad Diego Portales. Responde preguntas sobre procesos académicos, administrativos y de bienestar estudiantil basándose **exclusivamente en información oficial verificada**.

> Si no tiene la respuesta, indica exactamente a qué unidad contactar. Nunca inventa información.

---

## 📁 Estructura del proyecto

```
udp-bot/
├── api/
│   └── chat.js          # Serverless function — proxy seguro a Anthropic API
├── public/
│   └── index.html       # Interfaz del chatbot
├── vercel.json          # Configuración de rutas Vercel
├── package.json
└── .gitignore
```

---

## 🚀 Deploy en Vercel

### 1. Clona o sube el repositorio a GitHub

```bash
git init
git add .
git commit -m "init: asistente udp"
git remote add origin https://github.com/TU_USUARIO/asistente-udp.git
git push -u origin main
```

### 2. Importa el proyecto en Vercel

- Entra a [vercel.com](https://vercel.com)
- **Add New Project** → importa el repo de GitHub
- No cambies nada en Build Settings, Vercel lo detecta automáticamente

### 3. Agrega la variable de entorno

En tu proyecto de Vercel → **Settings → Environment Variables**:

| Variable | Valor |
|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...` |

Obtén tu API Key en [console.anthropic.com](https://console.anthropic.com)

### 4. Deploy

Haz click en **Deploy**. Vercel genera una URL del tipo:

```
https://asistente-udp.vercel.app
```

---

## 🛠️ Desarrollo local

```bash
npm install -g vercel
vercel dev
```

Crea un archivo `.env` en la raíz:

```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## 🧠 Cómo funciona

```
Usuario → /public/index.html → POST /api/chat → Anthropic API (Claude Haiku)
                                      ↑
                              ANTHROPIC_API_KEY
                           (solo en servidor, nunca expuesta al cliente)
```

El bot opera con una **base de conocimiento curada** definida en `api/chat.js`. Cubre:

- Registro Curricular (inscripción, retiro, convalidaciones)
- DAE (becas, FUAS, CAE, psicología)
- Tesorería (pagos, convenios, bloqueos)
- Biblioteca (préstamos, bases de datos, VPN)
- DTAI (correo institucional, WiFi, Microsoft 365)
- Reglamento académico
- Titulación y práctica profesional
- Calendario académico 2026
- Intercambio estudiantil

---

## ✏️ Actualizar la base de conocimiento

Toda la información está en `api/chat.js` en la constante `KNOWLEDGE_BASE`. Es texto plano con formato Markdown — editable sin conocimientos técnicos.

```js
const KNOWLEDGE_BASE = `
## NOMBRE DE SECCIÓN
- Dato 1
- Dato 2
- Contacto: unidad@mail.udp.cl
`;
```

---

## 💰 Costos estimados (anuales)

| Ítem | Costo |
|---|---|
| Claude Haiku API | ~$55.000 CLP |
| Hosting (Vercel free tier) | $0 |
| Dominio | ~$12.000 CLP |
| **Total operativo** | **~$67.000 CLP** |

---

## 📌 Contexto

Proyecto desarrollado para **Fondos Concursables Impacta UDP 2026**.  
Escuela de Informática & Telecomunicaciones — Universidad Diego Portales.

---

## 📄 Licencia

MIT
