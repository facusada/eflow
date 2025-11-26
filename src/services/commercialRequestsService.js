// File: src/services/commercialRequestsService.js

const mockRequests = [
  {
    id: '1',
    code: 'CR-1042',
    client: 'Acme Corp',
    title: 'Evaluación de migración a la nube',
    requestType: 'Evaluación',
    priority: 'Alta',
    status: 'En progreso',
    dueDate: '2025-02-05',
    estimation: {
      currency: 'USD',
      totalHours: 210,
      totalAmount: 26880,
      phases: [
        { id: 1, name: 'Discovery & Analysis', role: 'Senior Consultant', rate: 120, hours: 40, amount: 4800 },
        { id: 2, name: 'Design & Blueprint', role: 'Solution Architect', rate: 140, hours: 32, amount: 4480 },
        { id: 3, name: 'Implementation', role: 'Consultant', rate: 110, hours: 96, amount: 10560 },
        { id: 4, name: 'Testing & Validation', role: 'QA Specialist', rate: 90, hours: 28, amount: 2520 },
        { id: 5, name: 'Handover & Training', role: 'Trainer', rate: 90, hours: 14, amount: 1260 },
      ],
    },
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
    estimation: {
      currency: 'USD',
      totalHours: 180,
      totalAmount: 22200,
      phases: [
        { id: 1, name: 'Discovery & Analysis', role: 'Senior Consultant', rate: 120, hours: 32, amount: 3840 },
        { id: 2, name: 'Design & Blueprint', role: 'Solution Architect', rate: 140, hours: 28, amount: 3920 },
        { id: 3, name: 'Implementation', role: 'Consultant', rate: 110, hours: 88, amount: 9680 },
        { id: 4, name: 'Testing & Validation', role: 'QA Specialist', rate: 90, hours: 20, amount: 1800 },
        { id: 5, name: 'Handover & Training', role: 'Trainer', rate: 90, hours: 12, amount: 1080 },
      ],
    },
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
    estimation: {
      currency: 'USD',
      totalHours: 160,
      totalAmount: 19200,
      phases: [
        { id: 1, name: 'Discovery & Analysis', role: 'Senior Consultant', rate: 120, hours: 28, amount: 3360 },
        { id: 2, name: 'Design & Blueprint', role: 'Solution Architect', rate: 140, hours: 24, amount: 3360 },
        { id: 3, name: 'Implementation', role: 'Consultant', rate: 110, hours: 78, amount: 8580 },
        { id: 4, name: 'Testing & Validation', role: 'QA Specialist', rate: 90, hours: 20, amount: 1800 },
        { id: 5, name: 'Handover & Training', role: 'Trainer', rate: 90, hours: 10, amount: 900 },
      ],
    },
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
    estimation: {
      currency: 'USD',
      totalHours: 240,
      totalAmount: 30000,
      phases: [
        { id: 1, name: 'Discovery & Analysis', role: 'Senior Consultant', rate: 120, hours: 42, amount: 5040 },
        { id: 2, name: 'Design & Blueprint', role: 'Solution Architect', rate: 140, hours: 36, amount: 5040 },
        { id: 3, name: 'Implementation', role: 'Consultant', rate: 110, hours: 110, amount: 12100 },
        { id: 4, name: 'Testing & Validation', role: 'QA Specialist', rate: 90, hours: 32, amount: 2880 },
        { id: 5, name: 'Handover & Training', role: 'Trainer', rate: 90, hours: 20, amount: 1800 },
      ],
    },
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
    estimation: {
      currency: 'USD',
      totalHours: 150,
      totalAmount: 18300,
      phases: [
        { id: 1, name: 'Discovery & Analysis', role: 'Senior Consultant', rate: 120, hours: 24, amount: 2880 },
        { id: 2, name: 'Design & Blueprint', role: 'Solution Architect', rate: 140, hours: 22, amount: 3080 },
        { id: 3, name: 'Implementation', role: 'Consultant', rate: 110, hours: 70, amount: 7700 },
        { id: 4, name: 'Testing & Validation', role: 'QA Specialist', rate: 90, hours: 20, amount: 1800 },
        { id: 5, name: 'Handover & Training', role: 'Trainer', rate: 90, hours: 14, amount: 1260 },
      ],
    },
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
    estimation: {
      currency: 'USD',
      totalHours: 120,
      totalAmount: 14400,
      phases: [
        { id: 1, name: 'Discovery & Analysis', role: 'Senior Consultant', rate: 120, hours: 22, amount: 2640 },
        { id: 2, name: 'Design & Blueprint', role: 'Solution Architect', rate: 140, hours: 18, amount: 2520 },
        { id: 3, name: 'Implementation', role: 'Consultant', rate: 110, hours: 56, amount: 6160 },
        { id: 4, name: 'Testing & Validation', role: 'QA Specialist', rate: 90, hours: 16, amount: 1440 },
        { id: 5, name: 'Handover & Training', role: 'Trainer', rate: 90, hours: 8, amount: 720 },
      ],
    },
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
    estimation: {
      currency: 'USD',
      totalHours: 230,
      totalAmount: 28360,
      phases: [
        { id: 1, name: 'Discovery & Analysis', role: 'Senior Consultant', rate: 120, hours: 40, amount: 4800 },
        { id: 2, name: 'Design & Blueprint', role: 'Solution Architect', rate: 140, hours: 34, amount: 4760 },
        { id: 3, name: 'Implementation', role: 'Consultant', rate: 110, hours: 108, amount: 11880 },
        { id: 4, name: 'Testing & Validation', role: 'QA Specialist', rate: 90, hours: 32, amount: 2880 },
        { id: 5, name: 'Handover & Training', role: 'Trainer', rate: 90, hours: 16, amount: 1440 },
      ],
    },
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
    estimation: {
      currency: 'USD',
      totalHours: 140,
      totalAmount: 16880,
      phases: [
        { id: 1, name: 'Discovery & Analysis', role: 'Senior Consultant', rate: 120, hours: 26, amount: 3120 },
        { id: 2, name: 'Design & Blueprint', role: 'Solution Architect', rate: 140, hours: 22, amount: 3080 },
        { id: 3, name: 'Implementation', role: 'Consultant', rate: 110, hours: 64, amount: 7040 },
        { id: 4, name: 'Testing & Validation', role: 'QA Specialist', rate: 90, hours: 18, amount: 1620 },
        { id: 5, name: 'Handover & Training', role: 'Trainer', rate: 90, hours: 10, amount: 900 },
      ],
    },
  },
]

function delay(result) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result), 300)
  })
}

export async function getCommercialRequests() {
  return delay([...mockRequests])
}

export async function getCommercialRequestById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = mockRequests.find((item) => String(item.id) === String(id))
      if (found) {
        resolve(found)
      } else {
        reject(new Error('Request not found'))
      }
    }, 300)
  })
}
