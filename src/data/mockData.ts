import { DepartmentMatrix, TrainingCourse, TrainingRequest, CertificateItem, StarMaker } from '../types';

export const INITIAL_DEPARTMENTS: DepartmentMatrix[] = [
  {
    id: 'tech',
    name: 'Tecnologia & Produto',
    description: 'Engenharia de software, dados, arquitetura em nuvem e design de produtos digitais.',
    roles: [
      {
        roleId: 'dev-fullstack',
        roleName: 'Desenvolvedor(a) Full Stack',
        competencies: [
          {
            id: 'c1',
            name: 'Arquitetura de APIs e Microsserviços',
            category: 'Tecnologia',
            type: 'Técnica',
            description: 'Desenho escalável de endpoints RESTful, GraphQL e mensageria assíncrona.',
            targetLevel: 4,
            currentLevel: 3,
            recommendedTraining: 'Bootcamp Avançado de Microsserviços & Kafka'
          },
          {
            id: 'c2',
            name: 'Cloud Native & Kubernetes',
            category: 'Tecnologia',
            type: 'Técnica',
            description: 'Gerenciamento de containers, pipelines CI/CD e infraestrutura como código.',
            targetLevel: 4,
            currentLevel: 2,
            recommendedTraining: 'Imersão Kubernetes na Prática'
          },
          {
            id: 'c3',
            name: 'Comunicação Interdisciplinar',
            category: 'Comportamental',
            type: 'Comportamental',
            description: 'Capacidade de traduzir desafios técnicos para stakeholders de negócios e produto.',
            targetLevel: 4,
            currentLevel: 4,
            recommendedTraining: 'Comunicação Assertiva para Times de Tecnologia'
          },
          {
            id: 'c4',
            name: 'Resolução Complexa de Problemas',
            category: 'Comportamental',
            type: 'Comportamental',
            description: 'Depuração crítica sob pressão e condução de post-mortems construtivos.',
            targetLevel: 5,
            currentLevel: 3,
            recommendedTraining: 'Metodologias Ágeis & Root Cause Analysis'
          },
          {
            id: 'c5',
            name: 'Segurança da Informação (DevSecOps)',
            category: 'Tecnologia',
            type: 'Técnica',
            description: 'Práticas de OWASP, proteção de dados (LGPD) e testes automatizados de vulnerabilidade.',
            targetLevel: 4,
            currentLevel: 2,
            recommendedTraining: 'DevSecOps & Boas Práticas de Segurança em Código'
          }
        ]
      },
      {
        roleId: 'product-manager',
        roleName: 'Product Manager (PM)',
        competencies: [
          {
            id: 'c6',
            name: 'Descoberta de Produto (Product Discovery)',
            category: 'Negócios',
            type: 'Técnica',
            description: 'Pesquisas qualitativas, testes de hipótese e validação de protótipos com usuários.',
            targetLevel: 5,
            currentLevel: 4,
            recommendedTraining: 'Masterclass de Continuous Discovery Habits'
          },
          {
            id: 'c7',
            name: 'Análise de Métricas & Indicadores (Product Analytics)',
            category: 'Tecnologia',
            type: 'Técnica',
            description: 'Acompanhamento de conversão, retenção (cohort), LTV e painéis em SQL/PowerBI.',
            targetLevel: 4,
            currentLevel: 3,
            recommendedTraining: 'Data Analytics para Gestores de Produto'
          },
          {
            id: 'c8',
            name: 'Negociação e Gestão de Stakeholders',
            category: 'Liderança',
            type: 'Comportamental',
            description: 'Alinhamento de expectativas, priorização de backlog e gestão de conflitos de escopo.',
            targetLevel: 5,
            currentLevel: 4,
            recommendedTraining: 'Negociação Estratégica & Gestão de Conflitos'
          }
        ]
      }
    ]
  },
  {
    id: 'sales',
    name: 'Vendas & Negócios',
    description: 'Prospecção estratégica, negociação consultiva, gestão de contas e sucesso do cliente.',
    roles: [
      {
        roleId: 'exec-contas',
        roleName: 'Executivo(a) de Contas Enterprise',
        competencies: [
          {
            id: 's1',
            name: 'Venda Consultiva (Metodologia SPIN & MEDDIC)',
            category: 'Negócios',
            type: 'Técnica',
            description: 'Mapeamento de dores estratégicas, qualificação rigorosa de tomadores de decisão.',
            targetLevel: 5,
            currentLevel: 4,
            recommendedTraining: 'Aceleração Enterprise: Framework MEDDPICC'
          },
          {
            id: 's2',
            name: 'Negociação de Alto Valor e Contratos',
            category: 'Negócios',
            type: 'Técnica',
            description: 'Construção de propostas de ROI comercial, superação de objeções e fechamento de grandes contas.',
            targetLevel: 5,
            currentLevel: 3,
            recommendedTraining: 'Técnicas Avançadas de Negociação & Precificação'
          },
          {
            id: 's3',
            name: 'Inteligência Emocional & Resiliência',
            category: 'Comportamental',
            type: 'Comportamental',
            description: 'Autogestão de pressão por metas, relacionamento interpessoal e empatia ativa.',
            targetLevel: 4,
            currentLevel: 3,
            recommendedTraining: 'Inteligência Emocional Aplicada ao B2B'
          }
        ]
      }
    ]
  },
  {
    id: 'leadership',
    name: 'Liderança & Gestão de Pessoas',
    description: 'Desenvolvimento de líderes, cultura de feedback, gestão de metas e desenvolvimento de talentos.',
    roles: [
      {
        roleId: 'coord-gestor',
        roleName: 'Líder / Coordenador(a) de Equipe',
        competencies: [
          {
            id: 'l1',
            name: 'Gestão de Desempenho & Feedforward',
            category: 'Liderança',
            type: 'Comportamental',
            description: 'Realização de 1-on-1s produtivos, avaliação contínua e planos de desenvolvimento.',
            targetLevel: 5,
            currentLevel: 3,
            recommendedTraining: 'Liderança Humanizada & Cultura de Feedback'
          },
          {
            id: 'l2',
            name: 'Segurança Psicológica e Inclusão',
            category: 'Liderança',
            type: 'Comportamental',
            description: 'Criação de ambientes seguros para inovação, erros construtivos e diversidade.',
            targetLevel: 4,
            currentLevel: 3,
            recommendedTraining: 'Segurança Psicológica na Gestão de Times de Alta Performance'
          },
          {
            id: 'l3',
            name: 'Gestão por OKRs e Metas Ágeis',
            category: 'Operações',
            type: 'Técnica',
            description: 'Desdobramento de metas estratégicas em resultados-chave mensuráveis.',
            targetLevel: 4,
            currentLevel: 4,
            recommendedTraining: 'OKRs na Prática: Alinhamento Estratégico'
          }
        ]
      }
    ]
  },
  {
    id: 'ops',
    name: 'Operações & Finanças',
    description: 'Eficiência de processos, gestão de custos, controladoria e excelência operacional.',
    roles: [
      {
        roleId: 'analista-ops',
        roleName: 'Analista de Operações & Processos',
        competencies: [
          {
            id: 'o1',
            name: 'Mapeamento de Processos (BPMN)',
            category: 'Operações',
            type: 'Técnica',
            description: 'Modelagem de fluxos ponta a ponta e identificação de gargalos operacionais.',
            targetLevel: 4,
            currentLevel: 4,
            recommendedTraining: 'Lean Six Sigma & Otimização de Processos'
          },
          {
            id: 'o2',
            name: 'Automação Low-Code / No-Code',
            category: 'Tecnologia',
            type: 'Técnica',
            description: 'Criação de fluxos automatizados com Make, Power Automate e integrações via webhook.',
            targetLevel: 4,
            currentLevel: 2,
            recommendedTraining: 'Automação Corporativa & Low-Code'
          },
          {
            id: 'o3',
            name: 'Orientação a Resultados & Pensamento Analítico',
            category: 'Comportamental',
            type: 'Comportamental',
            description: 'Capacidade de priorizar entregas de maior alavancagem para a sustentabilidade financeira.',
            targetLevel: 4,
            currentLevel: 3,
            recommendedTraining: 'Tomada de Decisão Baseada em Dados'
          }
        ]
      }
    ]
  }
];

export const INITIAL_TRAININGS: TrainingCourse[] = [
  {
    id: 'tr-01',
    title: 'Liderança Humanizada & Cultura de Feedback',
    category: 'Liderança',
    modality: 'Online Ao Vivo',
    durationHours: 16,
    instructor: 'Carlos Menezes',
    isStarMaker: true,
    date: '24 e 25 de Outubro · 09h às 18h',
    seatsTotal: 25,
    seatsAvailable: 6,
    level: 'Intermediário',
    description: 'Desenvolva conversas difíceis, planos de desenvolvimento individual (PDI) e técnicas para engajar equipes sob alta demanda.'
  },
  {
    id: 'tr-02',
    title: 'Arquitetura de Microsserviços & Cloud Native',
    category: 'Tecnologia',
    modality: 'Híbrido',
    durationHours: 24,
    instructor: 'Ana Paula Rocha',
    isStarMaker: true,
    date: '04 a 06 de Novembro · 14h às 18h',
    seatsTotal: 20,
    seatsAvailable: 4,
    level: 'Avançado',
    description: 'Da decomposição de monólitos a mensageria com Apache Kafka e deploy resiliente em Kubernetes.'
  },
  {
    id: 'tr-03',
    title: 'Inteligência Artificial Generativa para Produtividade',
    category: 'Inovação',
    modality: 'Online Ao Vivo',
    durationHours: 8,
    instructor: 'Mariana Duarte',
    isStarMaker: true,
    date: '12 de Novembro · 14h às 18h',
    seatsTotal: 40,
    seatsAvailable: 15,
    level: 'Iniciante',
    description: 'Engenharia de prompts para redação executiva, síntese de documentos e aceleração de rotinas administrativas.'
  },
  {
    id: 'tr-04',
    title: 'Negociação Estratégica & Framework MEDDPICC',
    category: 'Vendas',
    modality: 'Presencial',
    durationHours: 12,
    instructor: 'Consultoria Externa Alpha Growth',
    isStarMaker: false,
    date: '18 de Novembro · São Paulo - Sede',
    seatsTotal: 18,
    seatsAvailable: 2,
    level: 'Avançado',
    description: 'Técnicas de qualificação de negócios de alto valor agregado com diretores e comitês de compras.'
  },
  {
    id: 'tr-05',
    title: 'Data Analytics & Storytelling com Dados',
    category: 'Dados & BI',
    modality: 'E-learning',
    durationHours: 20,
    instructor: 'Plataforma Alura Corporativo',
    isStarMaker: false,
    date: 'Acesso imediato · Trilha autoinstrucional',
    seatsTotal: 100,
    seatsAvailable: 68,
    level: 'Intermediário',
    description: 'Aprenda a transformar tabelas complexas em narrativas visuais com Power BI e gráficos de impacto.'
  }
];

export const INITIAL_REQUESTS: TrainingRequest[] = [
  {
    id: 'req-01',
    protocol: 'SOL-2026-0812',
    employeeName: 'Beatriz Silveira',
    employeeEmail: 'beatriz.silveira@empresa.com.br',
    department: 'Tecnologia & Produto',
    role: 'Engenheira de Dados Plena',
    managerName: 'Roberto Albuquerque',
    trainingTitle: 'Certificação Google Cloud Professional Data Engineer',
    provider: 'Coursera / Google Cloud',
    modality: 'Online Ao Vivo',
    type: 'Externo Especializado',
    durationHours: 40,
    estimatedCost: 1850.00,
    costCenter: 'CC-4010 Engenharia de Dados',
    targetAudience: 'Individual',
    businessObjective: 'Capacitar a profissional para a migração dos pipelines de Big Data para o BigQuery e Dataproc com segurança.',
    justification: 'Acelera em 3 meses a entrega do novo Data Lake corporativo, reduzindo custos de licença on-premise.',
    status: 'Em Análise T&D',
    submittedAt: '12/10/2026',
    timeline: [
      { status: 'Pendente Gestor', date: '10/10/2026', note: 'Solicitação criada pela colaboradora.' },
      { status: 'Em Análise T&D', date: '12/10/2026', note: 'Aprovado pelo gestor Roberto Albuquerque. Encaminhado para comitê orçamentário de T&D.' }
    ]
  },
  {
    id: 'req-02',
    protocol: 'SOL-2026-0803',
    employeeName: 'Diego Fernandes',
    employeeEmail: 'diego.fernandes@empresa.com.br',
    department: 'Vendas & Negócios',
    role: 'Coordenador Comercial',
    managerName: 'Juliana Prado',
    trainingTitle: 'Workshop Interno de Negociação Consultiva',
    provider: 'Star Maker: Carlos Menezes',
    modality: 'Presencial',
    type: 'Interno (Star Makers)',
    durationHours: 8,
    estimatedCost: 0,
    costCenter: 'CC-2020 Comercial',
    targetAudience: 'Equipe Direta',
    businessObjective: 'Capacitar os 8 novos SDRs e BDRs contratados no último quarter sobre o playbook de objeções.',
    justification: 'Utilização do multiplicador interno sem custo financeiro externo, acelerando a taxa de conversão em 15%.',
    status: 'Aprovado',
    submittedAt: '05/10/2026',
    timeline: [
      { status: 'Pendente Gestor', date: '03/10/2026', note: 'Solicitação registrada.' },
      { status: 'Em Análise T&D', date: '04/10/2026', note: 'Aprovado pela liderança.' },
      { status: 'Aprovado', date: '05/10/2026', note: 'T&D agendou a sala de treinamento e reservou agenda com o Star Maker Carlos Menezes.' }
    ]
  },
  {
    id: 'req-03',
    protocol: 'SOL-2026-0791',
    employeeName: 'Camila Zanin',
    employeeEmail: 'camila.zanin@empresa.com.br',
    department: 'Liderança & Gestão de Pessoas',
    role: 'Business Partner de RH',
    managerName: 'Patrícia Fontes',
    trainingTitle: 'Imersão em People Analytics e People Science',
    provider: 'FIA Business School',
    modality: 'Online Ao Vivo',
    type: 'Externo Especializado',
    durationHours: 32,
    estimatedCost: 3200.00,
    costCenter: 'CC-1010 Recursos Humanos',
    targetAudience: 'Individual',
    businessObjective: 'Implantar modelos preditivos de turnover e engajamento para áreas críticas da empresa.',
    justification: 'Subsídio direto para as ações de retenção de talentos previstas no plano estratégico 2027.',
    status: 'Concluído',
    submittedAt: '15/09/2026',
    timeline: [
      { status: 'Pendente Gestor', date: '15/09/2026', note: 'Abertura do formulário.' },
      { status: 'Aprovado', date: '18/09/2026', note: 'Verba aprovada pela diretoria de DHO.' },
      { status: 'Concluído', date: '08/10/2026', note: 'Treinamento concluído e certificado entregue com sucesso.' }
    ]
  }
];

export const INITIAL_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-1',
    code: 'TD-2026-8841-BR',
    trainingTitle: 'Liderança Humanizada & Cultura de Feedback',
    participantName: 'Lucas Oliveira Santos',
    participantCpfMasked: '***.492.188-**',
    completionDate: '15 de Setembro de 2026',
    durationHours: 16,
    instructorName: 'Carlos Menezes',
    instructorRole: 'Star Maker Gold & Diretor de Operações',
    institution: 'Academia Corporativa de Treinamento & Desenvolvimento',
    skillsAcquired: [
      'Comunicação Assertiva',
      'Estruturação de Feedforward',
      'Gestão de Segurança Psicológica',
      'Condução de Reuniões 1-on-1'
    ],
    status: 'Emitido',
    isExternal: false
  },
  {
    id: 'cert-2',
    code: 'TD-2026-9104-BR',
    trainingTitle: 'Arquitetura de Microsserviços e APIs Resilientes',
    participantName: 'Lucas Oliveira Santos',
    participantCpfMasked: '***.492.188-**',
    completionDate: '02 de Agosto de 2026',
    durationHours: 24,
    instructorName: 'Ana Paula Rocha',
    instructorRole: 'Star Maker Diamond & Staff Engineer',
    institution: 'Academia Corporativa de Treinamento & Desenvolvimento',
    skillsAcquired: [
      'Design Patterns de Microsserviços',
      'Apache Kafka & Event-Driven Architecture',
      'Observabilidade com OpenTelemetry',
      'Circuit Breakers & Resiliência'
    ],
    status: 'Emitido',
    isExternal: false
  },
  {
    id: 'cert-3',
    code: 'TD-2026-7512-BR',
    trainingTitle: 'Segurança da Informação e Compliance LGPD',
    participantName: 'Lucas Oliveira Santos',
    participantCpfMasked: '***.492.188-**',
    completionDate: '18 de Junho de 2026',
    durationHours: 10,
    instructorName: 'Mariana Duarte',
    instructorRole: 'Star Maker Silver & DPO Corporativo',
    institution: 'Academia Corporativa de Treinamento & Desenvolvimento',
    skillsAcquired: [
      'Princípios da Lei Geral de Proteção de Dados',
      'Tratamento Seguro de Dados Sensíveis',
      'Prevenção a Ataques de Phishing e Engenharia Social'
    ],
    status: 'Emitido',
    isExternal: false
  }
];

export const INITIAL_STAR_MAKERS: StarMaker[] = [
  {
    id: 'sm-01',
    name: 'Ana Paula Rocha',
    role: 'Staff Software Architect',
    department: 'Tecnologia & Inovação',
    tier: 'Diamond',
    specialties: ['Arquitetura em Nuvem', 'Kubernetes', 'Microsserviços', 'Boas Práticas de Engenharia'],
    hoursTaught: 112,
    classesCount: 14,
    studentRating: 4.95,
    totalStudents: 280,
    bio: 'Apaixonada por compartilhar engenharia de software de ponta. Criou a guilda de arquitetura interna e já capacitou mais de 280 colegas em padrões distribuídos.',
    avatarColor: 'from-blue-600 to-indigo-700',
    kudos: [
      {
        author: 'Guilherme Siqueira',
        authorRole: 'Engenheiro de Software Júnior',
        message: 'A didática da Ana transforma tópicos ultra complexos como Kafka em algo simples e aplicável no nosso dia a dia!',
        date: 'Há 5 dias'
      },
      {
        author: 'Vanessa Pires',
        authorRole: 'Tech Lead',
        message: 'Treinamento indispensável para todos que entram na nossa área. Referência técnica máxima.',
        date: 'Há 2 semanas'
      }
    ]
  },
  {
    id: 'sm-02',
    name: 'Carlos Menezes',
    role: 'Gerente Sênior de Operações',
    department: 'Operações & Logística',
    tier: 'Gold',
    specialties: ['Liderança Humanizada', 'Gestão de Crises', 'Metodologias Ágeis', 'Comunicação Assertiva'],
    hoursTaught: 68,
    classesCount: 9,
    studentRating: 4.90,
    totalStudents: 165,
    bio: 'Mais de 12 anos liderando times de alta pressão. No programa Star Makers, ensina como gerir com empatia, foco em metas e inteligência emocional.',
    avatarColor: 'from-amber-600 to-orange-700',
    kudos: [
      {
        author: 'Aline Barros',
        authorRole: 'Coordenadora de Atendimento',
        message: 'O módulo sobre feedback mudou completamente minha relação com meu time. Resultados visíveis na primeira semana!',
        date: 'Ontem'
      }
    ]
  },
  {
    id: 'sm-03',
    name: 'Mariana Duarte',
    role: 'Product Designer & Especialista IA',
    department: 'Design & Produto',
    tier: 'Silver',
    specialties: ['IA Generativa', 'Design Thinking', 'Facilitação de Workshops', 'Product Discovery'],
    hoursTaught: 36,
    classesCount: 5,
    studentRating: 4.88,
    totalStudents: 95,
    bio: 'Entusiasta de novas tecnologias que aceleram o trabalho criativo e de negócios. Facilita sessões práticas de aceleração com ferramentas de IA.',
    avatarColor: 'from-emerald-600 to-teal-700',
    kudos: [
      {
        author: 'Thiago Nogueira',
        authorRole: 'Analista de Marketing',
        message: 'Prático, direto ao ponto e sem enrolação. Comecei a usar os prompts no mesmo dia para nossos relatórios.',
        date: 'Há 1 semana'
      }
    ]
  },
  {
    id: 'sm-04',
    name: 'Rodrigo Vasconcelos',
    role: 'Head de Negócios B2B',
    department: 'Vendas Corporativas',
    tier: 'Bronze',
    specialties: ['Prospecção Outbound', 'Pitch Comercial', 'Gestão de Pipeline'],
    hoursTaught: 18,
    classesCount: 3,
    studentRating: 4.82,
    totalStudents: 48,
    bio: 'Especialista em grandes contas comerciais. Adora preparar novos talentos comerciais para reuniões executivas e propostas de valor.',
    avatarColor: 'from-purple-600 to-pink-700',
    kudos: [
      {
        author: 'Felipe Ramos',
        authorRole: 'Inside Sales',
        message: 'O workshop de contorno de objeções destravou várias negociações da minha carteira este mês!',
        date: 'Há 3 semanas'
      }
    ]
  }
];
