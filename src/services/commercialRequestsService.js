// File: src/services/commercialRequestsService.js

export async function getCommercialRequests() {
  const data = [
    {
      id: '1',
      code: 'CR-1042',
      client: 'Acme Corp',
      title: 'Evaluación de migración a la nube',
      requestType: 'Evaluación',
      priority: 'Alta',
      status: 'En progreso',
      dueDate: '2025-02-05',
    },
    {
      id: '2',
      code: 'CR-1043',
      client: 'Globex',
      title: 'Propuesta de servicios gestionados',
      requestType: 'Propuesta',
      priority: 'Media',
      status: 'Abierta',
      dueDate: '2025-02-12',
    },
    {
      id: '3',
      code: 'CR-1044',
      client: 'Innotech',
      title: 'Optimización de costos cloud',
      requestType: 'Consultoría',
      priority: 'Alta',
      status: 'Completada',
      dueDate: '2025-01-28',
    },
    {
      id: '4',
      code: 'CR-1045',
      client: 'Wayne Enterprises',
      title: 'Modernización de aplicaciones',
      requestType: 'Proyecto',
      priority: 'Alta',
      status: 'En progreso',
      dueDate: '2025-03-08',
    },
    {
      id: '5',
      code: 'CR-1046',
      client: 'Stark Industries',
      title: 'Implementación de SOC',
      requestType: 'Propuesta',
      priority: 'Baja',
      status: 'Abierta',
      dueDate: '2025-02-20',
    },
    {
      id: '6',
      code: 'CR-1047',
      client: 'Umbrella Corp',
      title: 'Evaluación de continuidad de negocio',
      requestType: 'Evaluación',
      priority: 'Media',
      status: 'Rechazada',
      dueDate: '2025-01-15',
    },
    {
      id: '7',
      code: 'CR-1048',
      client: 'Hooli',
      title: 'Migración de data warehouse',
      requestType: 'Proyecto',
      priority: 'Alta',
      status: 'Abierta',
      dueDate: '2025-03-18',
    },
    {
      id: '8',
      code: 'CR-1049',
      client: 'Vehement Capital',
      title: 'Assessment de seguridad',
      requestType: 'Consultoría',
      priority: 'Media',
      status: 'Completada',
      dueDate: '2025-01-30',
    },
  ]

  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 300)
  })
}
