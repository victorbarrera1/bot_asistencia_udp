const KNOWLEDGE_BASE = `
# BASE DE CONOCIMIENTO OFICIAL UDP

## REGISTRO CURRICULAR
- Función: Gestión académica — inscripción, retiro, anulación de ramos, convalidaciones, historial académico, certificados.
- Inscripción de ramos: Portal intranet.udp.cl en períodos del calendario académico.
- Retiro de ramo: Hasta fecha del calendario sin registro. Después aparece como "Retirado".
- Anulación de semestre: Solicitar formalmente en Registro Curricular con justificación.
- Convalidaciones: Presentar programas de ramos cursados en otra institución en Registro Curricular.
- Contacto: registro.curricular@udp.cl

## DAE (Dirección de Asuntos Estudiantiles)
- Función: Becas internas, beneficios, orientación, apoyo psicológico, actividades extracurriculares.
- Becas internas UDP: Beca de Excelencia Académica, Beca Socioeconómica UDP. Postulación anual marzo-abril.
- FUAS: Se completa en beneficiosestudiantiles.cl. Requisito para becas del Estado (Beca Bicentenario, Juan Gómez Millas, etc.).
- CAE: Administrado por Ingresa. Consultas de pago al banco o a DAE.
- Psicología y orientación: Disponible sin costo para estudiantes.
- Deportes y cultura: Equipos deportivos, talleres culturales, actividades estudiantiles.
- Contacto: dae@udp.cl

## TESORERÍA / FINANZAS
- Pago de arancel: En línea por intranet.udp.cl o en cajas presenciales.
- Convenio de pago: Solicitar en Tesorería si hay deuda o dificultades para pagar.
- Bloqueo académico: Las deudas bloquean inscripción de ramos. Regularizar en Tesorería.
- Contacto: tesoreria@udp.cl

## BIBLIOTECA UDP
- Acceso: Automático con carnet universitario para alumnos activos.
- Préstamo: Hasta 5 libros por 7 días, renovables en línea.
- Bases de datos digitales: JSTOR, Scopus, ProQuest, ScienceDirect — acceso desde red UDP o VPN.
- VPN: Se descarga desde el portal DTAI para acceso remoto a bases de datos.
- Sala de estudio: Reserva previa por sistema de biblioteca.
- Contacto: biblioteca@udp.cl | Horario: lunes a viernes 8:30–20:30, sábados 9:00–14:00.

## DTAI (Dirección de Tecnologías)
- Función: Soporte técnico, cuentas institucionales, acceso a redes, laboratorios.
- Correo institucional: @mail.udp.cl, acceso por Gmail.
- WiFi UDP: Red "UDP" con credenciales institucionales.
- VPN: Para recursos de biblioteca desde fuera del campus.
- Microsoft 365: Gratuito para estudiantes con correo institucional.
- Contacto: dtai@udp.cl

## TITULACIÓN
- Requisitos: 100% de ramos aprobados, créditos mínimos, práctica profesional si aplica.
- Tramitación: Iniciar en Secretaría de Estudios de la Escuela correspondiente.
- Certificado de egreso: Se solicita en Registro Curricular.

## CALENDARIO ACADÉMICO 2026 (aproximado)
- Primer semestre: Inicio clases marzo 2026. Inscripción ramos febrero 2026. Exámenes julio 2026.
- Segundo semestre: Inicio agosto 2026. Exámenes diciembre 2026.
- Nota: Fechas exactas en udp.cl — siempre verificar allí.

## REGLAMENTO ACADÉMICO
- Asistencia: Mínimo 75% para rendir examen final (verificar por escuela).
- Escala de notas: 1.0 a 7.0. Aprobación: 4.0.
- Máximo de ramos: Generalmente 6–7 por semestre salvo autorización especial.

## PRÁCTICA PROFESIONAL
- Coordinación: Dirección de Prácticas o Secretaría de la Escuela.
- Formalización: Documentos antes, durante y después. Retirar formularios en la Escuela.

## SALUD ESTUDIANTIL
- SEMDA: Servicio Médico y Dental del Alumno para estudiantes UDP.
- Psicología: Disponible via DAE o clínica UDP.

## SISTEMAS DIGITALES
- Intranet: intranet.udp.cl — inscripción de ramos, notas, horarios, pago de aranceles.
- Correo: usuario@mail.udp.cl
- LMS: udp.instructure.com (Canvas) — clases online, materiales, tareas.

## INTERCAMBIO ESTUDIANTIL
- Gestión: Oficina de Relaciones Internacionales UDP.
- Requisitos: Buen rendimiento académico, nivel de idioma según destino.
- Contacto: internacional@udp.cl

## CONTACTOS GENERALES
- Web: www.udp.cl
- Intranet: intranet.udp.cl
- Registro Curricular: registro.curricular@udp.cl
- DAE: dae@udp.cl
- Tesorería: tesoreria@udp.cl
- Biblioteca: biblioteca@udp.cl
- DTAI: dtai@udp.cl
- Relaciones Internacionales: internacional@udp.cl
`;

const SYSTEM_PROMPT = `Eres el asistente académico oficial de la Universidad Diego Portales (UDP). Responde SOLO con información de la base de conocimiento provista.

REGLAS:
1. Solo usa información de la base de conocimiento. No inventes nada.
2. Si no puedes responder, di: "No tengo información verificada sobre eso. Te recomiendo contactar a [unidad más relevante] en [contacto si está disponible]."
3. Respuestas concisas, máximo 4-6 oraciones.
4. Siempre en español.
5. Incluye contacto relevante al final de tu respuesta cuando exista.
6. Nunca inventes fechas, montos ni procedimientos que no estén en la base de conocimiento.

BASE DE CONOCIMIENTO OFICIAL UDP:
${KNOWLEDGE_BASE}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    return res.status(200).json({ reply: data.content?.[0]?.text || '' });
  } catch (err) {
    return res.status(500).json({ error: 'Error al contactar la API.' });
  }
}
