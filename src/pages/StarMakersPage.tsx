import React, { useState } from 'react';
import { StarMaker, PageId } from '../types';
import { 
  Sparkles, 
  Award, 
  Star, 
  Users, 
  Clock, 
  Heart, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Filter, 
  Search,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface StarMakersPageProps {
  starMakers: StarMaker[];
  onApplyToBeStarMaker: (newMaker: Omit<StarMaker, 'id' | 'hoursTaught' | 'classesCount' | 'studentRating' | 'totalStudents' | 'kudos' | 'avatarColor'>) => void;
  onSendKudos: (makerId: string, author: string, authorRole: string, message: string) => void;
  onInviteToTrain: (makerName: string, specialty: string) => void;
  onNavigate: (page: PageId) => void;
}

export const StarMakersPage: React.FC<StarMakersPageProps> = ({
  starMakers,
  onApplyToBeStarMaker,
  onSendKudos,
  onInviteToTrain,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'facilitators' | 'apply' | 'kudos'>('facilitators');
  const [tierFilter, setTierFilter] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Apply Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('Tecnologia & Inovação');
  const [specialtiesText, setSpecialtiesText] = useState('');
  const [bio, setBio] = useState('');
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  // Kudos Form State
  const [selectedMakerForKudos, setSelectedMakerForKudos] = useState<string>(starMakers[0]?.id || '');
  const [kudosAuthor, setKudosAuthor] = useState('');
  const [kudosAuthorRole, setKudosAuthorRole] = useState('');
  const [kudosMessage, setKudosMessage] = useState('');
  const [kudosSentSuccess, setKudosSentSuccess] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !specialtiesText.trim()) return;

    const specs = specialtiesText.split(',').map((s) => s.trim()).filter(Boolean);

    onApplyToBeStarMaker({
      name: name.trim(),
      role: role.trim() || 'Colaborador(a)',
      department,
      tier: 'Bronze',
      specialties: specs.length > 0 ? specs : ['Conhecimento Geral & Mentoria'],
      bio: bio.trim() || 'Novo multiplicador de conhecimento comprometido com o crescimento contínuo da equipe.'
    });

    setApplicationSuccess(true);
    setName('');
    setRole('');
    setSpecialtiesText('');
    setBio('');
    setActiveTab('facilitators');
  };

  const handleSendKudosSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kudosAuthor.trim() || !kudosMessage.trim()) return;

    onSendKudos(selectedMakerForKudos, kudosAuthor.trim(), kudosAuthorRole.trim() || 'Colega de Equipe', kudosMessage.trim());
    setKudosSentSuccess(true);
    setKudosAuthor('');
    setKudosAuthorRole('');
    setKudosMessage('');
    setTimeout(() => setKudosSentSuccess(false), 4000);
  };

  const filteredMakers = starMakers.filter((m) => {
    const matchesTier = tierFilter === 'Todos' || m.tier === tierFilter;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTier && matchesSearch;
  });

  const getTierBadge = (tier: StarMaker['tier']) => {
    switch (tier) {
      case 'Diamond':
        return 'text-sky-700 bg-sky-50 border-sky-200';
      case 'Gold':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Silver':
        return 'text-slate-700 bg-slate-100 border-slate-300';
      case 'Bronze':
        return 'text-orange-700 bg-orange-50 border-orange-200';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <section className="bg-linear-to-r from-[#380E16] via-[#4E1721] to-[#380E16] text-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#5A1D27] shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-semibold mb-4 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span>Programa Oficial de Multiplicadores Internos</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            Star Makers: Conhecimento que se Multiplica
          </h1>

          <p className="text-sm sm:text-base text-[#EADCCF] leading-relaxed mb-6 font-editorial italic">
            O programa Star Makers reconhece e empodera os colaboradores que compartilham seu conhecimento e experiência prática através de oficinas, bootcamps e mentorias.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('apply')}
              className="px-6 py-2.5 text-xs font-bold text-[#3E1219] bg-[#FAF7F2] hover:bg-white rounded-full transition-colors flex items-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#7D2436]" />
              <span>Quero ser um Star Maker</span>
            </button>

            <button
              onClick={() => setActiveTab('kudos')}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-colors flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-rose-300" />
              <span>Enviar Elogio a um Facilitador</span>
            </button>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Tier Explanation Guide Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <h3 className="text-xs font-bold text-slate-900">Bronze Maker</h3>
          </div>
          <p className="text-xs text-slate-500">10h+ ministradas · 1 a 2 turmas formadas. Início da jornada de facilitação.</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-slate-400" />
            <h3 className="text-xs font-bold text-slate-900">Silver Maker</h3>
          </div>
          <p className="text-xs text-slate-500">30h+ ministradas · 3 a 5 turmas com avaliação média superior a 4.7 ⭐.</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <h3 className="text-xs font-bold text-slate-900">Gold Maker</h3>
          </div>
          <p className="text-xs text-slate-500">60h+ ministradas · Atua como mentor de novos multiplicadores internos.</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-sky-500" />
            <h3 className="text-xs font-bold text-slate-900">Diamond Master</h3>
          </div>
          <p className="text-xs text-slate-500">100h+ ministradas · Mais de 200 alunos impactados e referência técnica corporativa.</p>
        </div>
      </section>

      {/* Tabs Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('facilitators')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'facilitators'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Facilitadores Ativos ({starMakers.length})
          </button>
          <button
            onClick={() => setActiveTab('apply')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'apply'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Candidatura de Instrutor
          </button>
          <button
            onClick={() => setActiveTab('kudos')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'kudos'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mural de Reconhecimento
          </button>
        </div>
      </div>

      {applicationSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="font-bold text-sm">Parabéns! Sua candidatura como Star Maker foi registrada.</p>
              <p className="text-slate-600">Seu perfil já está visível na rede e o time de T&D entrará em contato para apoiar o planejamento do seu primeiro workshop.</p>
            </div>
          </div>
          <button onClick={() => setApplicationSuccess(false)} className="text-xs font-semibold text-emerald-800">
            Dispensar
          </button>
        </div>
      )}

      {/* TAB 1: FACILITADORES EM DESTAQUE */}
      {activeTab === 'facilitators' && (
        <div className="space-y-6">
          {/* Filters and search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {['Todos', 'Diamond', 'Gold', 'Silver', 'Bronze'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setTierFilter(tier)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    tierFilter === tier
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tier === 'Todos' ? 'Todos os Níveis' : `${tier} Maker`}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por facilitador ou especialidade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMakers.map((maker) => (
              <div
                key={maker.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      {/* Styled avatar container with initials and gradient */}
                      <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${maker.avatarColor || 'from-indigo-600 to-slate-800'} text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-sm border border-white/20`}>
                        {maker.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900">{maker.name}</h3>
                        <p className="text-xs text-slate-500">{maker.role}</p>
                        <p className="text-[11px] text-slate-400">{maker.department}</p>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border shrink-0 ${getTierBadge(maker.tier)}`}>
                      {maker.tier} Maker
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{maker.bio}</p>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-4 gap-2 py-3 px-3.5 bg-slate-50 rounded-lg border border-slate-100 text-center mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Horas</span>
                      <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">{maker.hoursTaught}h</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Turmas</span>
                      <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">{maker.classesCount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Alunos</span>
                      <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">{maker.totalStudents}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Nota Média</span>
                      <span className="text-sm font-bold text-amber-600 font-mono tabular-nums flex items-center justify-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{maker.studentRating.toFixed(2)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Temas que Ministra:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {maker.specialties.map((spec, idx) => (
                        <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Latest Kudos from Student */}
                  {maker.kudos && maker.kudos.length > 0 && (
                    <div className="p-3 bg-indigo-50/40 rounded-lg border border-indigo-100/60 mb-4 text-xs">
                      <div className="flex items-center gap-1.5 text-indigo-950 font-semibold mb-1">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
                        <span>Elogio de {maker.kudos[0].author} ({maker.kudos[0].authorRole}):</span>
                      </div>
                      <p className="text-slate-600 italic">"{maker.kudos[0].message}"</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onInviteToTrain(maker.name, maker.specialties[0] || 'Workshop')}
                    className="flex-1 py-2 text-xs font-semibold text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Convidar para Workshop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedMakerForKudos(maker.id);
                      setActiveTab('kudos');
                    }}
                    className="py-2 px-3 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Elogiar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CANDIDATURA "QUERO SER UM STAR MAKER" */}
      {activeTab === 'apply' && (
        <form onSubmit={handleApply} className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">
              Formulário de Inscrição no Programa Star Makers
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Compartilhe seu domínio em ferramentas, metodologias ou liderança com colegas da empresa. O time de T&D fornece metodologia e suporte na criação dos materiais.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Lucas Oliveira Santos"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Seu Cargo Atual *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Engenheiro de Software Sênior ou Analista de Dados"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Departamento *
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Tecnologia & Inovação">Tecnologia & Inovação</option>
                  <option value="Operações & Logística">Operações & Logística</option>
                  <option value="Vendas & Negócios">Vendas & Negócios</option>
                  <option value="Design & Produto">Design & Produto</option>
                  <option value="Pessoas & Cultura (DHO)">Pessoas & Cultura (DHO)</option>
                  <option value="Controladoria & Finanças">Controladoria & Finanças</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Temas que Deseja Ensinar (separados por vírgula) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Python para Negócios, Gestão Ágil, Power BI, Feedback"
                  value={specialtiesText}
                  onChange={(e) => setSpecialtiesText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Mini Biografia & O Que te Motiva a Compartilhar Conhecimento *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Conte um pouco sobre sua trajetória profissional e porque você quer apoiar o desenvolvimento de outros colegas na empresa..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('facilitators')}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-2 shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Concluir Cadastro de Star Maker</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: MURAL DE RECONHECIMENTO (KUDOS) */}
      {activeTab === 'kudos' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kudos Form */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 h-fit">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="text-base font-bold text-slate-900">
                Enviar Elogio (Kudos)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Reconheça a dedicação de um facilitador interno que fez a diferença no seu aprendizado.
            </p>

            {kudosSentSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Seu elogio foi publicado no mural com sucesso!</span>
              </div>
            )}

            <form onSubmit={handleSendKudosSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Facilitador Star Maker
                </label>
                <select
                  value={selectedMakerForKudos}
                  onChange={(e) => setSelectedMakerForKudos(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {starMakers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.tier} Maker)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Beatriz Silveira"
                  value={kudosAuthor}
                  onChange={(e) => setKudosAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Seu Cargo / Área
                </label>
                <input
                  type="text"
                  placeholder="Ex: Desenvolvedora Plena"
                  value={kudosAuthorRole}
                  onChange={(e) => setKudosAuthorRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Mensagem de Agradecimento *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Conte como o workshop ou mentoria te ajudou a destravar um desafio..."
                  value={kudosMessage}
                  onChange={(e) => setKudosMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Publicar Elogio no Mural</span>
              </button>
            </form>
          </div>

          {/* Kudos Feed */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Depoimentos e Reconhecimentos Recentes
            </h3>

            <div className="space-y-4">
              {starMakers.flatMap((m) =>
                m.kudos.map((k, idx) => (
                  <div
                    key={`${m.id}-${idx}`}
                    className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5 fill-rose-500" />
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900">{k.author}</span>
                        <span className="text-slate-500">({k.authorRole})</span>
                        <span className="text-slate-400">reconheceu</span>
                        <span className="font-semibold text-indigo-700">{m.name}</span>
                        <span className="text-slate-400 font-mono text-[11px]">· {k.date}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed text-sm pt-1">
                        "{k.message}"
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
