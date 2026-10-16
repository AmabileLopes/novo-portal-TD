import React, { useState } from 'react';
import { PageId, TrainingCourse } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  Search, 
  Clock, 
  Users, 
  Award, 
  FileText, 
  Heart,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  trainings: TrainingCourse[];
  onEnrollTraining: (training: TrainingCourse) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  trainings,
  onEnrollTraining
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');
  const [enrollSuccessMessage, setEnrollSuccessMessage] = useState<string | null>(null);
  const [selectedTrainingModal, setSelectedTrainingModal] = useState<TrainingCourse | null>(null);

  // Featured training (Destaque do Mês)
  const featuredTraining = trainings[0] || {
    id: 'tr-destaque',
    title: 'Diagnóstico & Liderança Humanizada',
    category: 'Liderança',
    modality: 'Online Ao Vivo',
    durationHours: 16,
    instructor: 'Carlos Menezes',
    isStarMaker: true,
    date: '24 e 25 de Outubro · 09h às 18h',
    seatsTotal: 25,
    seatsAvailable: 6,
    level: 'Intermediário',
    description: 'Mapear performance, engajamento e prioridades estratégicas com base em dados estruturados.'
  };

  // Recent releases (Últimos lançados matching Pagina 2.png structure)
  const recentReleases = [
    {
      id: 'rec-1',
      title: 'Mapa de Sucessão',
      subtitle: 'Identifique posições críticas e sucessores com base em dados de performance e potencial, não em opinião isolada.',
      category: 'Liderança & Carreira',
      hours: '16h',
      highlighted: false,
      tag: 'Novo',
      courseRefId: 'tr-01'
    },
    {
      id: 'rec-2',
      title: 'Elogios',
      subtitle: 'Reconhecimento público que fortalece a cultura, complementando o feedback privado com valorização visível para todo o time.',
      category: 'Star Makers',
      hours: 'Comunidade',
      highlighted: true, // Soft blush card as in Pagina 2.png
      tag: 'Cultura',
      actionPage: 'star-makers' as PageId
    },
    {
      id: 'rec-3',
      title: 'Objetivos e Metas',
      subtitle: 'OKRs ou metas tradicionais, desdobrados da estratégia até cada colaborador, com acompanhamento contínuo em dashboard.',
      category: 'Estratégia & OKRs',
      hours: '12h',
      highlighted: false,
      tag: 'Turma Aberta'
    },
    {
      id: 'rec-4',
      title: 'Assessment',
      subtitle: 'Avalie competências, comportamentos e potencial com metodologia, para decisões de carreira e sucessão mais consistentes.',
      category: 'Diagnóstico de Gaps',
      hours: '8h',
      highlighted: false,
      tag: 'Matriz',
      actionPage: 'competencies' as PageId
    },
    {
      id: 'rec-5',
      title: 'IA Generativa Aplicada',
      subtitle: 'Engenharia de prompts para redação executiva, análise de dados e automação prática de rotinas corporativas.',
      category: 'Inovação & Produtividade',
      hours: '8h',
      highlighted: false,
      tag: 'Star Maker Mariana'
    },
    {
      id: 'rec-6',
      title: 'Cloud & Microsserviços',
      subtitle: 'Da decomposição de monólitos a mensageria assíncrona com Apache Kafka e deploy seguro em Kubernetes.',
      category: 'Tecnologia & Produto',
      hours: '24h',
      highlighted: false,
      tag: 'Star Maker Ana Paula'
    }
  ];

  const handleEnroll = (training: TrainingCourse) => {
    onEnrollTraining(training);
    setEnrollSuccessMessage(`Inscrição confirmada com sucesso em "${training.title}"! Os detalhes foram enviados ao seu e-mail corporativo.`);
    setSelectedTrainingModal(null);
    setTimeout(() => {
      setEnrollSuccessMessage(null);
    }, 5000);
  };

  return (
    <div className="space-y-16 pb-20 text-[#4A151E]">
      {/* =========================================================================
          BLOCO 1: REPLICAÇÃO DA "PÁGINA 1" (Olá, somos o T&D)
          - Fundo creme, letras bordô, círculo rosa/blush, tipografia serifada elegante
         ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 flex flex-col items-center justify-center text-center">
        {/* Soft pink / blush circle from pagina 1.png */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 max-w-5xl mx-auto w-full px-4">
          {/* Blush circular shape */}
          <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full bg-[#F5A8B8] shrink-0 shadow-sm transition-transform hover:scale-105 duration-500" />

          {/* Headline & Subtitle */}
          <div className="text-center md:text-left space-y-5 max-w-xl">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#3E1219] leading-[1.05]">
              Olá, somos <br />
              o T&amp;D.
            </h1>

            <p className="font-editorial italic text-2xl sm:text-3xl lg:text-4xl text-[#581C26] font-normal leading-snug">
              Um estúdio especializado em cultura <br className="hidden sm:inline" />
              de aprendizagem.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold">
              <button
                onClick={() => onNavigate('competencies')}
                className="px-5 py-2.5 rounded-full bg-[#581C26] text-[#FFFDFB] hover:bg-[#3E1219] transition-colors shadow-xs"
              >
                diagnóstico de competências
              </button>
              <button
                onClick={() => onNavigate('training-request')}
                className="px-5 py-2.5 rounded-full border border-[#581C26] text-[#581C26] hover:bg-[#581C26] hover:text-[#FFFDFB] transition-colors"
              >
                solicitar capacitação
              </button>
              <button
                onClick={() => onNavigate('star-makers')}
                className="px-4 py-2.5 rounded-full text-[#7A2434] hover:text-[#3E1219] underline underline-offset-4"
              >
                conhecer star makers →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Notification Alert */}
      {enrollSuccessMessage && (
        <div className="p-4 bg-[#F2E8E9] border border-[#E0C7CB] rounded-2xl text-[#4A151E] text-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#7D2436] shrink-0" />
            <span className="font-semibold">{enrollSuccessMessage}</span>
          </div>
          <button
            onClick={() => setEnrollSuccessMessage(null)}
            className="text-xs font-bold text-[#581C26] hover:underline"
          >
            Dispensar
          </button>
        </div>
      )}

      {/* =========================================================================
          BLOCO 2: REPLICAÇÃO DA "PÁGINA 2"
          - Imagem maior com o treinamento destaque do mês (à esquerda)
          - Blocos com os últimos lançados (à direita, em grid 2 colunas com o card 'Elogios' destacado em tom suave)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#EADCCF] pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#8C3B4B] block mb-1">
              portfólio &amp; lançamentos
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E1219] tracking-tight">
              Treinamento Destaque &amp; Últimos Lançados
            </h2>
          </div>
          <span className="text-xs text-[#7A2838]">
            Ciclo Atual · Atualizado semanalmente pela equipe de T&amp;D
          </span>
        </div>

        {/* Bento Grid: 1 Destaque Maior à Esquerda + 4 Menores em Grid 2x2 à Direita no formato da imagem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card Maior Destaque do Mês (Left column - 6 cols) com cantos arredondados diagonalmente (top-left e bottom-right) */}
          <div className="lg:col-span-6 rounded-tl-[48px] sm:rounded-tl-[72px] lg:rounded-tl-[88px] rounded-br-[48px] sm:rounded-br-[72px] lg:rounded-br-[88px] rounded-tr-none rounded-bl-none overflow-hidden relative min-h-[460px] lg:min-h-[520px] h-full flex flex-col justify-end p-8 sm:p-10 text-white shadow-md group border border-[#EADCCF]">
            {/* Rich Photographic Background with dark gradient scrim */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80')`
              }}
            />
            {/* Gradient Scrim ensuring legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

            {/* Content over scrim */}
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Destaque do Mês</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Diagnóstico &amp; Liderança
              </h3>

              <p className="text-sm text-slate-200 leading-relaxed max-w-md">
                Mapear performance, engajamento e prioridades estratégicas com base em dados estruturados.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>24 e 25 de Outubro</span>
                </span>
                <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>16 horas · Star Maker Carlos</span>
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleEnroll(featuredTraining)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold text-[#3E1219] bg-white hover:bg-slate-100 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Garantir Vaga no Destaque</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid de 4 Cards Menores (Right column - 6 cols em 2x2) com cantos arredondados diagonalmente */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
            {recentReleases.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.actionPage) {
                    onNavigate(item.actionPage);
                  } else {
                    const match = trainings.find((t) => t.title.toLowerCase().includes(item.title.toLowerCase()));
                    if (match) {
                      setSelectedTrainingModal(match);
                    } else {
                      setSelectedTrainingModal({
                        id: item.id,
                        title: item.title,
                        category: item.category,
                        modality: 'Online Ao Vivo',
                        durationHours: parseInt(item.hours) || 12,
                        instructor: 'Equipe T&D / Star Makers',
                        isStarMaker: true,
                        date: 'Próxima turma aberta no mês',
                        seatsTotal: 30,
                        seatsAvailable: 8,
                        level: 'Intermediário',
                        description: item.subtitle
                      });
                    }
                  }
                }}
                className={`p-6 sm:p-7 rounded-tl-[36px] sm:rounded-tl-[48px] rounded-br-[36px] sm:rounded-br-[48px] rounded-tr-none rounded-bl-none border transition-all cursor-pointer flex flex-col justify-between hover:shadow-md hover:-translate-y-1 ${
                  item.highlighted
                    ? 'bg-[#EFE5EB] border-[#E2CED7] text-[#4A151E]' // Card destacado como "Elogios"
                    : 'bg-[#FFFDFB] border-[#EADCCF] hover:border-[#8C3B4B] text-[#4A151E]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-2.5 text-[#7A2838]">
                    <span>{item.category}</span>
                    <span className="font-mono text-[11px] bg-white/70 px-2 py-0.5 rounded-full border border-[#EADCCF]/70">
                      {item.hours}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-[#3E1219] mb-2 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-[#5C232E] leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#EADCCF]/40 flex items-center justify-between text-xs font-bold text-[#7A2434]">
                  <span>
                    {item.actionPage ? 'acessar área →' : 'ver ementa e detalhes →'}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          NOVO BLOCO INTERMEDIÁRIO: PILARES DO T&D (ESTILO PÁGINA 1 & PÁGINA 2)
          - Blocos alternados (foto/texto e texto/foto)
          - Títulos em bordô vibrante, seções NECESSIDADE e INTERVENÇÃO
          - Botões customizados direcionando diretamente para cada funcionalidade
         ========================================================================= */}
      <section className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#EADCCF] pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#8C3B4B] block mb-1">
              pilares &amp; ferramentas do portal
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E1219] tracking-tight">
              Como o T&amp;D Transforma o Desenvolvimento da Empresa
            </h2>
          </div>
          <span className="text-xs text-[#7A2838]">
            Da identificação de gaps à cultura colaborativa de aprendizagem
          </span>
        </div>

        {/* 1º Item: MATRIZ DE COMPETÊNCIAS (Foto à Esquerda, Texto à Direita) */}
        <div className="bg-[#FFFDFB] rounded-3xl border border-[#EADCCF] overflow-hidden shadow-xs hover:border-[#8C3B4B] transition-all grid grid-cols-1 lg:grid-cols-2">
          {/* Foto à Esquerda */}
          <div className="relative min-h-[340px] sm:min-h-[420px] lg:h-full overflow-hidden bg-[#FAF7F2]">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"
              alt="Análise de Matriz de Competências corporativa"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Texto à Direita */}
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-[#FFFDFB]">
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#A22345] tracking-tight leading-[1.08] mb-2">
                Matriz <br />
                de competências
              </h3>
              <p className="text-xs sm:text-sm text-[#7A2838] leading-relaxed mb-6 font-medium">
                mapeamento estruturado de hard e soft skills, régua de proficiência 1 a 5 e geração de PDI
              </p>

              {/* NECESSIDADE */}
              <div className="mb-6">
                <h4 className="text-sm sm:text-base font-black text-[#1F0A11] uppercase tracking-wider mb-1.5">
                  NECESSIDADE:
                </h4>
                <p className="text-xs sm:text-sm text-[#3D141C] leading-relaxed">
                  Gaps técnicos invisíveis na rotina, planos de carreira indefinidos e decisões de promoção baseadas em impressões isoladas, sem clareza sobre o nível de maturidade esperado para cada posição na organização.
                </p>
              </div>

              {/* INTERVENÇÃO */}
              <div className="mb-6">
                <h4 className="text-sm sm:text-base font-black text-[#1F0A11] uppercase tracking-wider mb-1.5">
                  INTERVENÇÃO:
                </h4>
                <p className="text-xs sm:text-sm text-[#3D141C] leading-relaxed">
                  Estruturamos matrizes oficiais por departamento e senioridade. Diagnosticamos os gaps da equipe em tempo real e geramos automaticamente o Plano de Desenvolvimento Individual (PDI) com treinamentos recomendados para sanar cada defasagem.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('competencies')}
              className="px-8 py-3.5 rounded-xl sm:rounded-2xl bg-[#A22345] hover:bg-[#851A30] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2 self-start sm:self-end mt-4 cursor-pointer"
            >
              <span>Acessar Matriz de Competências</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2º Item: STAR MAKERS (Texto à Esquerda, Foto à Direita) */}
        <div className="bg-[#FFFDFB] rounded-3xl border border-[#EADCCF] overflow-hidden shadow-xs hover:border-[#8C3B4B] transition-all grid grid-cols-1 lg:grid-cols-2">
          {/* Texto à Esquerda */}
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-[#FFFDFB] order-2 lg:order-1">
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#A22345] tracking-tight leading-[1.08] mb-2">
                Star <br />
                Makers
              </h3>
              <p className="text-xs sm:text-sm text-[#7A2838] leading-relaxed mb-6 font-medium">
                programa corporativo de multiplicadores internos e facilitação colaborativa de conhecimento
              </p>

              {/* NECESSIDADE */}
              <div className="mb-6">
                <h4 className="text-sm sm:text-base font-black text-[#1F0A11] uppercase tracking-wider mb-1.5">
                  NECESSIDADE:
                </h4>
                <p className="text-xs sm:text-sm text-[#3D141C] leading-relaxed">
                  Conhecimento prático e estratégico retido em silos departamentais. Falta de protagonismo e de espaços formais para colaboradores experientes compartilharem suas melhores práticas, gerando dependência excessiva de consultorias externas.
                </p>
              </div>

              {/* INTERVENÇÃO */}
              <div className="mb-6">
                <h4 className="text-sm sm:text-base font-black text-[#1F0A11] uppercase tracking-wider mb-1.5">
                  INTERVENÇÃO:
                </h4>
                <p className="text-xs sm:text-sm text-[#3D141C] leading-relaxed">
                  Capacitamos e reconhecemos profissionais da empresa como instrutores oficiais nos níveis Bronze, Silver, Gold e Diamond. Estimulamos a cultura peer-to-peer onde quem ensina consolida liderança e quem aprende evolui com a realidade do nosso negócio.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('star-makers')}
              className="px-8 py-3.5 rounded-xl sm:rounded-2xl bg-[#A22345] hover:bg-[#851A30] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2 self-start sm:self-end mt-4 cursor-pointer"
            >
              <span>Conhecer os Star Makers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Foto à Direita */}
          <div className="relative min-h-[340px] sm:min-h-[420px] lg:h-full overflow-hidden bg-[#FAF7F2] order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
              alt="Facilitadoras internas do programa Star Makers compartilhando conhecimento"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* 3º Item: SOLICITAÇÃO DE TREINAMENTOS (Foto à Esquerda, Texto à Direita) */}
        <div className="bg-[#FFFDFB] rounded-3xl border border-[#EADCCF] overflow-hidden shadow-xs hover:border-[#8C3B4B] transition-all grid grid-cols-1 lg:grid-cols-2">
          {/* Foto à Esquerda */}
          <div className="relative min-h-[340px] sm:min-h-[420px] lg:h-full overflow-hidden bg-[#FAF7F2]">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80"
              alt="Alinhamento estratégico de orçamento e capacitação corporativa"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Texto à Direita */}
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-[#FFFDFB]">
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#A22345] tracking-tight leading-[1.08] mb-2">
                Solicitação <br />
                de treinamentos
              </h3>
              <p className="text-xs sm:text-sm text-[#7A2838] leading-relaxed mb-6 font-medium">
                fluxo online estruturado com aprovação da liderança, controle de verba e justificativa de ROI
              </p>

              {/* NECESSIDADE */}
              <div className="mb-6">
                <h4 className="text-sm sm:text-base font-black text-[#1F0A11] uppercase tracking-wider mb-1.5">
                  NECESSIDADE:
                </h4>
                <p className="text-xs sm:text-sm text-[#3D141C] leading-relaxed">
                  Demandas de treinamento dispersas em e-mails e conversas informais, sem rastreabilidade de centro de custo, gerando contratações pontuais sem conexão comprovada com as metas e indicadores do time.
                </p>
              </div>

              {/* INTERVENÇÃO */}
              <div className="mb-6">
                <h4 className="text-sm sm:text-base font-black text-[#1F0A11] uppercase tracking-wider mb-1.5">
                  INTERVENÇÃO:
                </h4>
                <p className="text-xs sm:text-sm text-[#3D141C] leading-relaxed">
                  Centralizamos todas as solicitações corporativas em um fluxo com protocolo único. Colaborador e gestor alinham justificativa, investimento e impacto de negócio, com aprovação transparente e linha do tempo em tempo real.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('training-request')}
              className="px-8 py-3.5 rounded-xl sm:rounded-2xl bg-[#A22345] hover:bg-[#851A30] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2 self-start sm:self-end mt-4 cursor-pointer"
            >
              <span>Abrir Solicitação de Treinamento</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4º Item: ENVIO & EMISSÃO DE CERTIFICADOS (Texto à Esquerda, Foto à Direita) */}
        <div className="bg-[#FFFDFB] rounded-3xl border border-[#EADCCF] overflow-hidden shadow-xs hover:border-[#8C3B4B] transition-all grid grid-cols-1 lg:grid-cols-2">
          {/* Texto à Esquerda */}
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-[#FFFDFB] order-2 lg:order-1">
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#A22345] tracking-tight leading-[1.08] mb-2">
                Envio &amp; emissão <br />
                de certificados
              </h3>
              <p className="text-xs sm:text-sm text-[#7A2838] leading-relaxed mb-6 font-medium">
                acreditação profissional oficial, histórico de horas e validador público de autenticidade
              </p>

              {/* NECESSIDADE */}
              <div className="mb-6">
                <h4 className="text-sm sm:text-base font-black text-[#1F0A11] uppercase tracking-wider mb-1.5">
                  NECESSIDADE:
                </h4>
                <p className="text-xs sm:text-sm text-[#3D141C] leading-relaxed">
                  Dificuldade dos colaboradores em comprovar a conclusão de capacitações, perda de comprovantes físicos e ausência de uma base centralizada de dados para auditorias corporativas e comitês de promoção.
                </p>
              </div>

              {/* INTERVENÇÃO */}
              <div className="mb-6">
                <h4 className="text-sm sm:text-base font-black text-[#1F0A11] uppercase tracking-wider mb-1.5">
                  INTERVENÇÃO:
                </h4>
                <p className="text-xs sm:text-sm text-[#3D141C] leading-relaxed">
                  Disponibilizamos certificados oficiais assinados pela diretoria de DHO e instrutores, prontos para download em alta resolução e impressão A4, com código verificador exclusivo para validação imediata de autenticidade no portal.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('certificates')}
              className="px-8 py-3.5 rounded-xl sm:rounded-2xl bg-[#A22345] hover:bg-[#851A30] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2 self-start sm:self-end mt-4 cursor-pointer"
            >
              <span>Consultar e Emitir Certificados</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Foto à Direita */}
          <div className="relative min-h-[340px] sm:min-h-[420px] lg:h-full overflow-hidden bg-[#FAF7F2] order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
              alt="Colaboradores celebrando conquista de certificação profissional e formatura corporativa"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOCO 3: CALENDÁRIO COMPLETO & INDICADORES INTEGRADOS
         ========================================================================= */}
      <section className="bg-[#FFFDFB] rounded-3xl border border-[#EADCCF] p-6 sm:p-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EADCCF]">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#8C3B4B] block mb-1">
              agenda do trimestre
            </span>
            <h3 className="text-2xl font-bold text-[#3E1219]">
              Grade de Treinamentos Corporativos
            </h3>
            <p className="text-xs text-[#6A2834] mt-1">
              Capacitações com inscrições abertas para colaboradores de todos os departamentos.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#8C3B4B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar curso ou instrutor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#EADCCF] rounded-full focus:outline-none focus:ring-2 focus:ring-[#581C26]/20 focus:border-[#581C26] text-[#4A151E]"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs font-semibold">
          {['todos', 'Liderança', 'Tecnologia', 'Inovação', 'Vendas', 'Dados & BI'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                selectedFilter === cat
                  ? 'bg-[#581C26] text-[#FFFDFB]'
                  : 'bg-[#FAF7F2] text-[#581C26] hover:bg-[#EED8DC]'
              }`}
            >
              {cat === 'todos' ? 'todas as turmas' : cat}
            </button>
          ))}
        </div>

        {/* Trainings List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainings
            .filter((t) => {
              const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    t.instructor.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesCat = selectedFilter === 'todos' || t.category === selectedFilter;
              return matchesSearch && matchesCat;
            })
            .map((course) => (
              <div
                key={course.id}
                className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EADCCF] flex flex-col justify-between hover:border-[#8C3B4B] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#7A2838] mb-2 font-medium">
                    <span className="font-bold text-[#581C26]">{course.category}</span>
                    <span className="font-mono tabular-nums">{course.durationHours}h</span>
                  </div>

                  <h4 className="text-lg font-bold text-[#3E1219] mb-2 leading-snug">
                    {course.title}
                  </h4>

                  <p className="text-xs text-[#5C232E] leading-relaxed mb-4 line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EADCCF] space-y-3">
                  <div className="text-xs text-[#7A2838] flex items-center justify-between">
                    <span>Instrutor: <strong>{course.instructor}</strong></span>
                    <span className="font-semibold">{course.seatsAvailable} vagas</span>
                  </div>

                  <button
                    onClick={() => handleEnroll(course)}
                    className="w-full py-2.5 rounded-full text-xs font-bold text-[#FFFDFB] bg-[#581C26] hover:bg-[#3E1219] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Inscrever-se Nesta Turma</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>


      {/* Course Detail Modal */}
      {selectedTrainingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FFFDFB] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EADCCF] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#EADCCF] pb-3">
              <span className="text-xs font-bold text-[#8C3B4B] uppercase tracking-wider">
                {selectedTrainingModal.category}
              </span>
              <button
                onClick={() => setSelectedTrainingModal(null)}
                className="text-xs font-semibold text-[#581C26] hover:opacity-70"
              >
                ✕ Fechar
              </button>
            </div>

            <h3 className="text-2xl font-bold text-[#3E1219]">
              {selectedTrainingModal.title}
            </h3>

            <p className="text-xs text-[#5C232E] leading-relaxed">
              {selectedTrainingModal.description}
            </p>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#EADCCF] text-xs">
              <div>
                <span className="text-[#8C3B4B] block text-[11px]">Carga Horária:</span>
                <span className="font-bold text-[#3E1219]">{selectedTrainingModal.durationHours} horas</span>
              </div>
              <div>
                <span className="text-[#8C3B4B] block text-[11px]">Modalidade:</span>
                <span className="font-bold text-[#3E1219]">{selectedTrainingModal.modality}</span>
              </div>
              <div>
                <span className="text-[#8C3B4B] block text-[11px]">Instrutor:</span>
                <span className="font-bold text-[#3E1219]">{selectedTrainingModal.instructor}</span>
              </div>
              <div>
                <span className="text-[#8C3B4B] block text-[11px]">Vagas Restantes:</span>
                <span className="font-bold text-[#3E1219]">{selectedTrainingModal.seatsAvailable} de {selectedTrainingModal.seatsTotal}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedTrainingModal(null)}
                className="px-4 py-2 text-xs font-semibold text-[#581C26]"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleEnroll(selectedTrainingModal)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#581C26] hover:bg-[#3E1219] transition-colors"
              >
                Confirmar Inscrição
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
