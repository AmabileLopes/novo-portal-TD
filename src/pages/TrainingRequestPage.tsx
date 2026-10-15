import React, { useState } from 'react';
import { TrainingRequest, RequestStatus } from '../types';
import { 
  FileText, 
  Send, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  Building2, 
  User, 
  DollarSign, 
  Calendar, 
  Sparkles,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface TrainingRequestPageProps {
  requests: TrainingRequest[];
  onSubmitRequest: (newReq: Omit<TrainingRequest, 'id' | 'protocol' | 'submittedAt' | 'timeline' | 'status'>) => void;
  onUpdateStatus: (id: string, newStatus: RequestStatus, note: string) => void;
  prefilledTitle?: string;
  prefilledCompetency?: string;
}

export const TrainingRequestPage: React.FC<TrainingRequestPageProps> = ({
  requests,
  onSubmitRequest,
  onUpdateStatus,
  prefilledTitle = '',
  prefilledCompetency = ''
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'tracking'>('form');

  // Form State
  const [employeeName, setEmployeeName] = useState('Lucas Oliveira Santos');
  const [employeeEmail, setEmployeeEmail] = useState('lucas.santos@empresa.com.br');
  const [department, setDepartment] = useState('Tecnologia & Produto');
  const [role, setRole] = useState('Desenvolvedor(a) Full Stack');
  const [managerName, setManagerName] = useState('Roberto Albuquerque');

  const [trainingTitle, setTrainingTitle] = useState(prefilledTitle || '');
  const [provider, setProvider] = useState('');
  const [modality, setModality] = useState<'Presencial' | 'Online Ao Vivo' | 'E-learning' | 'Híbrido'>('Online Ao Vivo');
  const [type, setType] = useState<'Interno (Star Makers)' | 'Externo Especializado'>('Externo Especializado');
  const [durationHours, setDurationHours] = useState<number>(24);
  const [estimatedCost, setEstimatedCost] = useState<number>(1500);
  const [costCenter, setCostCenter] = useState('CC-4010 Engenharia de Software');
  const [targetAudience, setTargetAudience] = useState<'Individual' | 'Equipe Direta' | 'Turma Corporativa'>('Individual');
  const [businessObjective, setBusinessObjective] = useState(
    prefilledCompetency ? `Desenvolvimento focado na competência: ${prefilledCompetency}` : ''
  );
  const [justification, setJustification] = useState('');
  const [submittedSuccessProtocol, setSubmittedSuccessProtocol] = useState<string | null>(null);

  // Tracking Filter State
  const [trackingSearch, setTrackingSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [selectedRequestForDetail, setSelectedRequestForDetail] = useState<TrainingRequest | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainingTitle.trim() || !justification.trim()) return;

    onSubmitRequest({
      employeeName,
      employeeEmail,
      department,
      role,
      managerName,
      trainingTitle: trainingTitle.trim(),
      provider: provider.trim() || (type === 'Interno (Star Makers)' ? 'Multiplicador Interno Star Makers' : 'Instituição Parceira'),
      modality,
      type,
      durationHours: Number(durationHours) || 8,
      estimatedCost: type === 'Interno (Star Makers)' ? 0 : Number(estimatedCost) || 0,
      costCenter,
      targetAudience,
      businessObjective: businessObjective.trim() || 'Aperfeiçoamento contínuo de competências críticas.',
      justification: justification.trim()
    });

    const protocol = `SOL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedSuccessProtocol(protocol);
    setActiveTab('tracking');

    // Reset some form fields
    setTrainingTitle('');
    setJustification('');
    setBusinessObjective('');
    setProvider('');
  };

  const filteredRequests = requests.filter((r) => {
    const matchesSearch = r.trainingTitle.toLowerCase().includes(trackingSearch.toLowerCase()) ||
                          r.employeeName.toLowerCase().includes(trackingSearch.toLowerCase()) ||
                          r.protocol.toLowerCase().includes(trackingSearch.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title & Navigation Tabs */}
      <div className="bg-[#FFFDFB] p-6 sm:p-8 rounded-2xl border border-[#EADCCF]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EADCCF]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8C3B4B] font-semibold mb-1">
              <span>Fluxo de Aprovação Corporativo</span>
              <span aria-hidden="true">·</span>
              <span>Comitê de Treinamento &amp; DHO</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3E1219] tracking-tight">
              Solicitação Online de Treinamentos
            </h1>
            <p className="text-xs sm:text-sm text-[#5C232E] mt-1 max-w-2xl leading-relaxed">
              Submeta solicitações para capacitações individuais ou em equipe, acompanhe o fluxo de aprovação com a liderança e gerencie o histórico de pedidos.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF7F2] rounded-full shrink-0 border border-[#EADCCF]">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                activeTab === 'form'
                  ? 'bg-[#581C26] text-[#FFFDFB] shadow-xs'
                  : 'text-[#6A2834] hover:text-[#3E1219]'
              }`}
            >
              Novo Formulário
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                activeTab === 'tracking'
                  ? 'bg-[#581C26] text-[#FFFDFB] shadow-xs'
                  : 'text-[#6A2834] hover:text-[#3E1219]'
              }`}
            >
              Acompanhar Solicitações ({requests.length})
            </button>
          </div>
        </div>

        {submittedSuccessProtocol && (
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-sm">Solicitação registrada com sucesso!</p>
                <p className="text-slate-600 mt-0.5">
                  Protocolo gerado: <strong className="font-mono text-emerald-800">{submittedSuccessProtocol}</strong>. O pedido foi enviado para validação inicial da sua liderança imediata.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSubmittedSuccessProtocol(null)}
              className="text-xs font-semibold text-emerald-800 hover:underline"
            >
              Fechar
            </button>
          </div>
        )}
      </div>

      {/* VIEW 1: ONLINE FORM */}
      {activeTab === 'form' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Dados do Solicitante */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                1. Identificação do Solicitante
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  E-mail Corporativo *
                </label>
                <input
                  type="email"
                  required
                  value={employeeEmail}
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Departamento / Área *
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Tecnologia & Produto">Tecnologia & Produto</option>
                  <option value="Vendas & Negócios">Vendas & Negócios</option>
                  <option value="Liderança & Gestão de Pessoas">Liderança & Gestão de Pessoas</option>
                  <option value="Operações & Finanças">Operações & Finanças</option>
                  <option value="Marketing & Comunicação">Marketing & Comunicação</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Cargo Atual
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Gestor(a) Imediato(a) para Aprovação *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nome do líder direto"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Centro de Custo
                </label>
                <input
                  type="text"
                  value={costCenter}
                  onChange={(e) => setCostCenter(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Detalhes do Treinamento */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <FileText className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                2. Especificações do Treinamento
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs mb-4">
              <div className="sm:col-span-2">
                <label className="block font-medium text-slate-700 mb-1">
                  Nome do Curso ou Workshop Desejado *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Formação Executiva em Gestão Ágil ou Curso de Arquitetura em Nuvem"
                  value={trainingTitle}
                  onChange={(e) => setTrainingTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Instituição / Instrutor Fornecedor
                </label>
                <input
                  type="text"
                  placeholder="Ex: Alura, FGV, Coursera ou Star Maker Interno"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Tipo de Capacitação *
                </label>
                <select
                  value={type}
                  onChange={(e) => {
                    const newType = e.target.value as any;
                    setType(newType);
                    if (newType === 'Interno (Star Makers)') {
                      setEstimatedCost(0);
                    }
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Externo Especializado">Externo Especializado (Instituição)</option>
                  <option value="Interno (Star Makers)">Interno (Facilitador Star Maker)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Modalidade de Ensino *
                </label>
                <select
                  value={modality}
                  onChange={(e) => setModality(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Online Ao Vivo">Online Ao Vivo</option>
                  <option value="Presencial">Presencial</option>
                  <option value="E-learning">E-learning / Assíncrono</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Carga Horária Estimada (Horas) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="360"
                  required
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Público Alvo do Treinamento
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Individual">Individual (Apenas para mim)</option>
                  <option value="Equipe Direta">Equipe Direta (Para o time)</option>
                  <option value="Turma Corporativa">Turma Corporativa (Vários departamentos)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Investimento Previsto (R$)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  disabled={type === 'Interno (Star Makers)'}
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-500"
                />
                {type === 'Interno (Star Makers)' && (
                  <span className="text-[11px] text-amber-700 mt-0.5 block">
                    Custo R$ 0,00 — conduzido por multiplicador interno.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Justificativa de Negócio e ROI */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                3. Justificativa Estratégica & Impacto
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Objetivo de Aprendizagem & Competência a Sanar
                </label>
                <input
                  type="text"
                  placeholder="Ex: Sanar gap diagnosticado na Matriz de Competências em Arquitetura de Microsserviços"
                  value={businessObjective}
                  onChange={(e) => setBusinessObjective(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Justificativa de Negócio & Retorno Esperado (ROI) *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explique detalhadamente como este treinamento impactará as metas do time, a qualidade das entregas ou a redução de custos/riscos operacionais..."
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 max-w-md">
                Ao enviar este formulário, uma notificação automática será enviada ao seu gestor imediato para validação antes do envio à área de T&D.
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Solicitação de Treinamento</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* VIEW 2: TRACKING & APPROVAL STATUS */}
      {activeTab === 'tracking' && (
        <div className="space-y-6">
          {/* Search & Status Filters */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              {['Todos', 'Pendente Gestor', 'Em Análise T&D', 'Aprovado', 'Concluído'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    statusFilter === st
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por protocolo, colaborador ou curso..."
                value={trackingSearch}
                onChange={(e) => setTrackingSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Requests List */}
          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
                <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-medium">Nenhuma solicitação encontrada para os filtros selecionados.</p>
              </div>
            ) : (
              filteredRequests.map((req) => {
                const isSelected = selectedRequestForDetail?.id === req.id;

                const getStatusColor = (status: RequestStatus) => {
                  switch (status) {
                    case 'Aprovado':
                    case 'Concluído':
                      return 'text-emerald-700 bg-emerald-50 border-emerald-200';
                    case 'Pendente Gestor':
                      return 'text-amber-700 bg-amber-50 border-amber-200';
                    case 'Em Análise T&D':
                      return 'text-blue-700 bg-blue-50 border-blue-200';
                    case 'Recusado':
                      return 'text-rose-700 bg-rose-50 border-rose-200';
                    default:
                      return 'text-slate-700 bg-slate-50 border-slate-200';
                  }
                };

                return (
                  <div
                    key={req.id}
                    className="p-5 sm:p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <span className="font-mono font-semibold text-slate-800">{req.protocol}</span>
                          <span aria-hidden="true">·</span>
                          <span>{req.department}</span>
                          <span aria-hidden="true">·</span>
                          <span>Submetido em {req.submittedAt}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900">{req.trainingTitle}</h3>
                        <p className="text-xs text-slate-600 mt-1">
                          Solicitante: <strong>{req.employeeName}</strong> ({req.role}) · Gestor: <strong>{req.managerName}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>

                        <button
                          onClick={() => setSelectedRequestForDetail(isSelected ? null : req)}
                          className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          {isSelected ? 'Ocultar Detalhes' : 'Ver Linha do Tempo'}
                        </button>
                      </div>
                    </div>

                    {/* Quick Metadata Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 pt-3 border-t border-slate-100 bg-slate-50/50 p-3 rounded-lg">
                      <div>
                        <span className="text-[11px] text-slate-400 block">Tipo & Fornecedor</span>
                        <span className="font-medium text-slate-800">{req.type}</span>
                        <p className="text-[11px] text-slate-500">{req.provider}</p>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Modalidade & Duração</span>
                        <span className="font-medium text-slate-800">{req.modality}</span>
                        <p className="text-[11px] text-slate-500 font-mono tabular-nums">{req.durationHours} horas</p>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Investimento Previsto</span>
                        <span className="font-medium text-slate-800 font-mono tabular-nums">
                          {req.estimatedCost === 0 ? 'Gratuito (Interno)' : `R$ ${req.estimatedCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        </span>
                        <p className="text-[11px] text-slate-500">{req.costCenter}</p>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Público Alvo</span>
                        <span className="font-medium text-slate-800">{req.targetAudience}</span>
                      </div>
                    </div>

                    {/* Expanded Detail and Approval Simulation */}
                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                        <div className="text-xs text-slate-700 space-y-2">
                          <p>
                            <strong>Objetivo Estratégico:</strong> {req.businessObjective}
                          </p>
                          <p>
                            <strong>Justificativa de Negócio:</strong> {req.justification}
                          </p>
                        </div>

                        {/* Approval Timeline */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                            Linha do Tempo de Aprovação
                          </h4>
                          <div className="space-y-3">
                            {req.timeline.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-3 text-xs">
                                <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-900">{step.status}</span>
                                    <span className="text-slate-400 font-mono">({step.date})</span>
                                  </div>
                                  <p className="text-slate-600 mt-0.5">{step.note}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Simulation Controls for Approvals */}
                        <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-1.5 text-indigo-900">
                            <ShieldAlert className="w-4 h-4 text-indigo-600" />
                            <span>Simular Ação da Liderança / Comitê de T&D:</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {req.status === 'Pendente Gestor' && (
                              <button
                                onClick={() =>
                                  onUpdateStatus(
                                    req.id,
                                    'Em Análise T&D',
                                    'Aprovado pelo gestor imediato. Encaminhado para comitê orçamentário de T&D.'
                                  )
                                }
                                className="px-3 py-1 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                              >
                                Aprovar como Gestor
                              </button>
                            )}

                            {req.status === 'Em Análise T&D' && (
                              <button
                                onClick={() =>
                                  onUpdateStatus(
                                    req.id,
                                    'Aprovado',
                                    'Verba liberada e inscrição autorizada pela área de Treinamento e Desenvolvimento.'
                                  )
                                }
                                className="px-3 py-1 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors"
                              >
                                Aprovar Orçamento (T&D)
                              </button>
                            )}

                            {req.status === 'Aprovado' && (
                              <button
                                onClick={() =>
                                  onUpdateStatus(
                                    req.id,
                                    'Concluído',
                                    'Capacitação realizada pelo colaborador. Certificado emitido.'
                                  )
                                }
                                className="px-3 py-1 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                              >
                                Marcar como Concluído
                              </button>
                            )}

                            {req.status !== 'Recusado' && req.status !== 'Concluído' && (
                              <button
                                onClick={() =>
                                  onUpdateStatus(
                                    req.id,
                                    'Recusado',
                                    'Solicitação não aprovada devido a restrições orçamentárias no período.'
                                  )
                                }
                                className="px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-md hover:bg-rose-100 transition-colors"
                              >
                                Recusar
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
