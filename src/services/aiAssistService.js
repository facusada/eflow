// File: src/services/aiAssistService.js

function delay(result) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result), 600)
  })
}

export async function generateDescription(context) {
  const { client, title, shortDescription, requestType, serviceType, priority, isStrategic } = context
  const strategicNote = isStrategic ? 'El cliente considera esta iniciativa como estratégica y prioritaria.' : ''

  const description = [
    'Contexto:',
    `- Cliente: ${client || 'No especificado'}`,
    `- Título: ${title || 'Sin título'}`,
    `- Resumen: ${shortDescription || 'Pendiente de completar'}`,
    `- Tipo de solicitud: ${requestType || 'No definido'}`,
    `- Tipo de servicio: ${serviceType || 'No definido'}`,
    `- Prioridad: ${priority || 'Pendiente'}`,
    strategicNote && `- Nota estratégica: ${strategicNote}`,
    '',
    'Objetivos:',
    '- Entregar una propuesta comercial clara, destacando beneficios de negocio y viabilidad técnica.',
    '- Alinear expectativas de tiempos, dependencias y equipo requerido.',
    '',
    'Alcance (Scope):',
    '- Relevamiento de requerimientos funcionales y técnicos.',
    '- Diseño de arquitectura propuesta y estimación de esfuerzo.',
    '- Identificación de riesgos, supuestos y dependencias.',
    '',
    'Fuera de alcance (Out of Scope):',
    '- Implementación completa de la solución.',
    '- Actividades de soporte productivo posterior al proyecto.',
  ]
    .filter(Boolean)
    .join('\n')

  return delay(description)
}

export async function refineDescription(text) {
  const refined = `${text}\n\nDetalles técnicos adicionales:\n- Rendimiento: considerar dimensionamiento para picos de carga y pruebas de estrés.\n- Seguridad: incluir controles de acceso, cifrado en tránsito y en reposo.\n- Integraciones: validar compatibilidad con sistemas existentes y APIs expuestas.\n- Operación: plan de monitoreo, registros y alertas tempranas.`
  return delay(refined)
}
