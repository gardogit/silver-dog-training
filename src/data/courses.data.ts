export interface Package {
    title: string;
    description: string;
    features: string[];
}

export interface K9Data {
    title: string;
    description: string[];
    specialties: string[];
}

export interface CourseData {
    personalizado: {
        title: string;
        description: string;
        packages: Package[];
    };
    grupal: {
        title: string;
        description: string;
        packages: Package[];
    };
    k9: {
        title: string;
        description: string;
        content: K9Data;
    };
}

// Información de los cursos
export const coursesData: CourseData = {
    personalizado: {
        title: 'Entrenamiento Personalizado',
        description: 'Entrenamientos enfocados en las necesidades específicas del perro: educación, modificación de conductas y contracondicionamiento. El avance depende del compromiso y la constancia de cada equipo.',
        packages: [
            {
                title: 'Fundamentos Caninos',
                description: 'Aprende los comandos esenciales para una convivencia feliz y segura.',
                features: [
                    'Comando: Sentarse',
                    'Comando: Echarse',
                    'Comando: Esperar',
                    'Control de impulsos y paciencia'
                ]
            },
            {
                title: 'Vínculo y Obediencia',
                description: 'Amplía las habilidades de tu perro para paseos y llamados más seguros.',
                features: [
                    'Habilidad: Caminar al lado',
                    'Habilidad: Acudir al llamado',
                    'Truco: Dar la pata',
                    'Paseos seguros y relajados'
                ]
            },
            {
                title: 'Maestría Canina',
                description: 'Domina habilidades de alto nivel para un control y una conexión excepcionales.',
                features: [
                    'Órdenes verbales y con señas',
                    'Trucos avanzados: hacerse el muerto, dar vueltas',
                    'Habilidad: Ir a casa bajo orden',
                    'Hacer necesidades en un punto específico'
                ]
            }
        ]
    },
    grupal: {
        title: 'Clases Grupales',
        description: 'Nos enfocamos en la socialización, el contracondicionamiento y la obediencia básica, dándote las herramientas para que tu perro se comporte de forma educada dentro y fuera de casa.',
        packages: [
            {
                title: 'Paquete Pomeranian',
                description: 'Ideal para empezar y mantener la consistencia mensual.',
                features: [
                    'Acceso a todas las clases de un mes',
                    'Asesoramiento continuo online'
                ]
            },
            {
                title: 'Paquete Border Collie',
                description: 'Un paquete trimestral para un compromiso a medio plazo.',
                features: [
                    'Acceso a todas las clases de un trimestre',
                    'Asesoramiento continuo online',
                    'Participación en una rifa especial'
                ]
            },
            {
                title: 'Paquete Belga Malinois',
                description: 'El paquete más completo con beneficios exclusivos.',
                features: [
                    'Acceso a todas las clases de un trimestre',
                    'Asesoramiento continuo online',
                    'Participación en una rifa especial',
                    '35% de descuento en futuros cursos',
                    'Incluye una consulta veterinaria'
                ]
            }
        ]
    },
    k9: {
        title: 'Entrenamiento K9',
        description: 'Un programa de élite, totalmente personalizado y a convenir. Está diseñado para perros de trabajo que requieren habilidades de alto rendimiento en detección o protección.',
        content: {
            title: 'Entrenamiento K9 Especializado',
            description: [
                'Este no es un paquete estándar, es un programa de formación a medida diseñado para cumplir objetivos específicos y de alta exigencia. Trabajamos uno a uno para desarrollar el máximo potencial de tu perro en disciplinas profesionales.',
                'El proceso comienza con una evaluación exhaustiva para determinar la aptitud del perro y definir un plan de trabajo detallado. Es ideal para agencias de seguridad o particulares que buscan un nivel superior de adiestramiento.'
            ],
            specialties: [
                'Detección de sustancias específicas',
                'Técnicas de protección y defensa',
                'Obediencia avanzada para misiones',
                'Búsqueda y rescate',
                'Preparación para certificación profesional'
            ]
        }
    }
};