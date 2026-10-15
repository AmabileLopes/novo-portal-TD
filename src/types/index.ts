export type PageId = 'home' | 'competencies' | 'training-request' | 'certificates' | 'star-makers';

export type CompetencyLevel = 1 | 2 | 3 | 4 | 5;

export interface CompetencyItem {
  id: string;
  name: string;
  category: 'Tecnologia' | 'Liderança' | 'Negócios' | 'Operações' | 'Comportamental';
  type: 'Técnica' | 'Comportamental';
  description: string;
  targetLevel: CompetencyLevel;
  currentLevel: CompetencyLevel;
  recommendedTraining?: string;
}

export interface DepartmentMatrix {
  id: string;
  name: string;
  description: string;
  roles: {
    roleId: string;
    roleName: string;
    competencies: CompetencyItem[];
  }[];
}

export interface TrainingCourse {
  id: string;
  title: string;
  category: string;
  modality: 'Presencial' | 'Online Ao Vivo' | 'E-learning' | 'Híbrido';
  durationHours: number;
  instructor: string;
  isStarMaker: boolean;
  date: string;
  seatsTotal: number;
  seatsAvailable: number;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  description: string;
}

export type RequestStatus = 'Pendente Gestor' | 'Em Análise T&D' | 'Aprovado' | 'Recusado' | 'Concluído';

export interface TrainingRequest {
  id: string;
  protocol: string;
  employeeName: string;
  employeeEmail: string;
  department: string;
  role: string;
  managerName: string;
  trainingTitle: string;
  provider: string;
  modality: 'Presencial' | 'Online Ao Vivo' | 'E-learning' | 'Híbrido';
  type: 'Interno (Star Makers)' | 'Externo Especializado';
  durationHours: number;
  estimatedCost: number;
  costCenter: string;
  targetAudience: 'Individual' | 'Equipe Direta' | 'Turma Corporativa';
  businessObjective: string;
  justification: string;
  status: RequestStatus;
  submittedAt: string;
  timeline: {
    status: RequestStatus;
    date: string;
    note: string;
  }[];
}

export interface CertificateItem {
  id: string;
  code: string;
  trainingTitle: string;
  participantName: string;
  participantCpfMasked: string;
  completionDate: string;
  durationHours: number;
  instructorName: string;
  instructorRole: string;
  institution: string;
  skillsAcquired: string[];
  status: 'Emitido' | 'Pendente de Emissão' | 'Em Análise de Comprovante';
  isExternal: boolean;
}

export interface StarMaker {
  id: string;
  name: string;
  role: string;
  department: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
  specialties: string[];
  hoursTaught: number;
  classesCount: number;
  studentRating: number;
  totalStudents: number;
  bio: string;
  avatarColor: string;
  kudos: {
    author: string;
    authorRole: string;
    message: string;
    date: string;
  }[];
}
