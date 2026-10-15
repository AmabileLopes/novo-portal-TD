import React, { useState } from 'react';
import { DepartmentMatrix, CompetencyItem, CompetencyLevel, PageId } from '../types';
import { 
  Compass, 
  Search, 
  Filter, 
  Plus, 
  Check, 
  AlertCircle, 
  BookOpen, 
  Award, 
  HelpCircle,
  FileCheck2,
  ChevronDown
} from 'lucide-react';

interface CompetencyMatrixPageProps {
  departments: DepartmentMatrix[];
  onNavigate: (page: PageId) => void;
  onRequestSpecificTraining: (trainingTitle: string, competencyName: string) => void;
}

export const CompetencyMatrixPage: React.FC<CompetencyMatrixPageProps> = ({
  departments,
  onNavigate,
  onRequestSpecificTraining
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>(departments[0]?.id || 'tech');
  const currentDept = departments.find((d) => d.id === selectedDeptId) || departments[0];

  const [selectedRoleId, setSelectedRoleId] = useState<string>(currentDept?.roles[0]?.roleId || '');
  const currentRole = currentDept?.roles.find((r) => r.roleId === selectedRoleId) || currentDept?.roles[0];

  const [filterType, setFilterType] = useState<'Todos' | 'Técnica' | 'Comportamental'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProficiencyGuide, setShowProficiencyGuide] = useState(false);

  // Local state for interactive self-assessment / adjustments
  const [competenciesState, setCompetenciesState] = useState<Record<string, CompetencyItem[]>>(() => {
    const map: Record<string, CompetencyItem[]> = {};
    departments.forEach((dept) => {
      dept.roles.forEach((role) => {
        map[role.roleId] = [...role.competencies];
      });
    });
    return map;
  });

  // Modal to add custom competency
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCompName, setNewCompName] = useState('');
  const [newCompType, setNewCompType] = useState<'Técnica' | 'Comportamental'>('Técnica');
  const [newCompCategory, setNewCompCategory] = useState<'Tecnologia' | 'Liderança' | 'Negócios' | 'Operações' | 'Comportamental'>('Tecnologia');
  const [newCompDesc, setNewCompDesc] = useState('');
  const [newCompTarget, setNewCompTarget] = useState<CompetencyLevel>(4);
  const [newCompCurrent, setNewCompCurrent] = useState<CompetencyLevel>(2);
  const [newCompTraining, setNewCompTraining] = useState('');

  const currentRoleCompetencies = competenciesState[currentRole?.roleId || ''] || currentRole?.competencies || [];

  const handleLevelChange = (competencyId: string, newCurrentLevel: CompetencyLevel) => {
    if (!currentRole) return;
    setCompetenciesState((prev) => {
      const roleId = currentRole.roleId;
      const updated = (prev[roleId] || []).map((c) =>
        c.id === competencyId ? { ...c, currentLevel: newCurrentLevel } : c
      );
      return { ...prev, [roleId]: updated };
    });
  };

  const handleAddCompetency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim() || !currentRole) return;

    const newItem: CompetencyItem = {
      id: `custom-${Date.now()}`,
      name: newCompName.trim(),
      type: newCompType,
      category: newCompCategory,
      description: newCompDesc.trim() || 'Descrição dos comportamentos e entregas esperadas.',
      targetLevel: newCompTarget,
      currentLevel: newCompCurrent,
      recommendedTraining: newCompTraining.trim() || 'Workshop Especializado de Aperfeiçoamento'
    };

    setCompetenciesState((prev) => {
      const roleId = currentRole.roleId;
      return {
        ...prev,
        [roleId]: [...(prev[roleId] || []), newItem]
      };
    });

    setIsAddModalOpen(false);
    setNewCompName('');
    setNewCompDesc('');
    setNewCompTraining('');
  };

  // Calculations for Gap Analysis
  const filteredCompetencies = currentRoleCompetencies.filter((c) => {
    const matchesFilter = filterType === 'Todos' || c.type === filterType;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalCompetencies = currentRoleCompetencies.length;
  const competenciesWithGap = currentRoleCompetencies.filter((c) => c.currentLevel < c.targetLevel);
  const totalTargetPoints = currentRoleCompetencies.reduce((acc, c) => acc + c.targetLevel, 0);
  const totalCurrentPoints = currentRoleCompetencies.reduce((acc, c) => acc + c.currentLevel, 0);
  const adherenceRate = totalTargetPoints > 0 ? Math.round((totalCurrentPoints / totalTargetPoints) * 100) : 100;

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title Bar */}
      <div className="bg-[#FFFDFB] p-6 sm:p-8 rounded-2xl border border-[#EADCCF]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8C3B4B] font-semibold mb-1">
              <span>Gestão de Desempenho e Carreira</span>
              <span aria-hidden="true">·</span>
              <span>Matriz Oficial Corporativa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3E1219] tracking-tight">
              Matriz de Competências &amp; Diagnóstico de Gaps
            </h1>
            <p className="text-xs sm:text-sm text-[#5C232E] mt-1 max-w-3xl leading-relaxed">
              Consulte a régua de proficiência técnica e comportamental por cargo, avalie a maturidade atual frente ao nível esperado e identifique os treinamentos recomendados para o seu Plano de Desenvolvimento Individual (PDI).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowProficiencyGuide(!showProficiencyGuide)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#581C26] bg-[#FAF7F2] hover:bg-[#EED8DC] border border-[#EADCCF] rounded-full transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-[#8C3B4B]" />
              <span>Régua de Níveis 1 a 5</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#FFFDFB] bg-[#581C26] hover:bg-[#3E1219] rounded-full transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Competência</span>
            </button>
          </div>
        </div>

        {/* Proficiency Levels Accordion/Drawer */}
        {showProficiencyGuide && (
          <div className="mt-6 pt-6 border-t border-[#EADCCF] grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs bg-[#FAF7F2] p-4 rounded-xl">
            <div className="p-3 bg-white rounded-lg border border-[#EADCCF]">
              <span className="font-bold text-[#3E1219] block mb-1">Nível 1 · Básico</span>
              <p className="text-[#6A2834]">Compreensão teórica e conceitual. Necessita de suporte constante para executar.</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-[#EADCCF]">
              <span className="font-bold text-[#3E1219] block mb-1">Nível 2 · Prático</span>
              <p className="text-[#6A2834]">Executa tarefas rotineiras com supervisão pontual. Reconhece boas práticas.</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-[#EADCCF]">
              <span className="font-bold text-[#581C26] block mb-1">Nível 3 · Autônomo</span>
              <p className="text-[#6A2834]">Entrega de ponta a ponta com total independência e qualidade esperada para a posição.</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-[#EADCCF]">
              <span className="font-bold text-[#7A2434] block mb-1">Nível 4 · Avançado</span>
              <p className="text-[#6A2834]">Domínio profundo. Orienta outros profissionais e atua como multiplicador interno.</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-[#EADCCF]">
              <span className="font-bold text-[#8C3B4B] block mb-1">Nível 5 · Especialista</span>
              <p className="text-[#6A2834]">Referência corporativa e de mercado. Cria novos padrões e metodologias.</p>
            </div>
          </div>
        )}
      </div>

      {/* Department & Role Selector Tabs */}
      <div className="space-y-4">
        {/* Department Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => {
                setSelectedDeptId(dept.id);
                if (dept.roles.length > 0) {
                  setSelectedRoleId(dept.roles[0].roleId);
                }
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                selectedDeptId === dept.id
                  ? 'bg-[#581C26] text-[#FFFDFB] shadow-xs'
                  : 'bg-[#FFFDFB] text-[#581C26] hover:bg-[#EED8DC] border border-[#EADCCF]'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {/* Roles for current department */}
        <div className="p-4 bg-[#FFFDFB] rounded-2xl border border-[#EADCCF] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#8C3B4B] uppercase tracking-wider">
              Cargo Selecionado:
            </span>
            <div className="flex items-center gap-2">
              {currentDept?.roles.map((role) => (
                <button
                  key={role.roleId}
                  onClick={() => setSelectedRoleId(role.roleId)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                    selectedRoleId === role.roleId
                      ? 'bg-[#EFE5EB] text-[#4A151E] border border-[#E2CED7]'
                      : 'text-[#6A2834] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {role.roleName}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#7A2838]">
            <span>{currentDept?.description}</span>
          </div>
        </div>
      </div>

      {/* Score & Diagnostic Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 block mb-1">Índice Geral de Aderência ao Cargo</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tabular-nums">{adherenceRate}%</span>
            <span className="text-xs text-slate-500">
              ({totalCurrentPoints} de {totalTargetPoints} pontos)
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                adherenceRate >= 90 ? 'bg-emerald-500' : adherenceRate >= 70 ? 'bg-indigo-600' : 'bg-amber-500'
              }`}
              style={{ width: `${Math.min(adherenceRate, 100)}%` }}
            />
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 block mb-1">Competências com Gap Identificado</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600 tabular-nums">
              {competenciesWithGap.length}
            </span>
            <span className="text-xs text-slate-500">de {totalCompetencies} competências</span>
          </div>
          <p className="text-xs text-slate-600 mt-2">
            {competenciesWithGap.length === 0
              ? 'Parabéns! Todas as competências atingem ou superam o nível alvo.'
              : 'Oportunidades de desenvolvimento prioritárias recomendadas abaixo.'}
          </p>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-500 block mb-1">Plano de Desenvolvimento Sugerido</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Existem <strong>{competenciesWithGap.length} capacitações</strong> mapeadas no catálogo para zerar esses gaps.
            </p>
          </div>
          <button
            onClick={() => onNavigate('training-request')}
            className="w-full mt-3 py-1.5 px-3 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors text-center"
          >
            Abrir Solicitação para Minha Equipe
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-lg w-fit">
          {(['Todos', 'Técnica', 'Comportamental'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterType === type
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {type === 'Todos' ? 'Todas as Competências' : `${type}s`}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar competência ou treinamento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Competencies Table / Matrix Cards */}
      <div className="space-y-4">
        {filteredCompetencies.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
            <Compass className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium">Nenhuma competência encontrada para os filtros selecionados.</p>
          </div>
        ) : (
          filteredCompetencies.map((comp) => {
            const hasGap = comp.currentLevel < comp.targetLevel;
            const gapAmount = comp.targetLevel - comp.currentLevel;

            return (
              <div
                key={comp.id}
                className="p-5 sm:p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-indigo-700">{comp.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-600">{comp.type}</span>
                      {hasGap ? (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-700 font-medium">
                            Gap de {gapAmount} {gapAmount === 1 ? 'nível' : 'níveis'}
                          </span>
                        </>
                      ) : (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 font-medium">Alvo Atingido</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{comp.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{comp.description}</p>
                  </div>

                  {/* Level Controls & Visualizer */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 shrink-0 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {/* Target Level */}
                    <div className="text-center">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        Nível Alvo
                      </span>
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-sm tabular-nums">
                        {comp.targetLevel}
                      </span>
                    </div>

                    {/* Interactive Level Slider/Buttons */}
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        Seu Nível Atual (1 a 5)
                      </span>
                      <div className="flex items-center gap-1">
                        {([1, 2, 3, 4, 5] as CompetencyLevel[]).map((level) => {
                          const isCurrent = comp.currentLevel === level;
                          const isTarget = comp.targetLevel === level;

                          return (
                            <button
                              key={level}
                              onClick={() => handleLevelChange(comp.id, level)}
                              title={`Nível ${level}`}
                              className={`w-7 h-7 rounded-md text-xs font-semibold transition-all ${
                                isCurrent
                                  ? 'bg-indigo-600 text-white shadow-xs'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                              } ${isTarget && !isCurrent ? 'ring-2 ring-slate-400 ring-offset-1' : ''}`}
                            >
                              {level}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended Training Banner (if gap exists) */}
                {comp.recommendedTraining && (
                  <div className={`mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${hasGap ? 'bg-amber-50/50 p-3 rounded-lg border-amber-100' : ''}`}>
                    <div className="flex items-center gap-2">
                      <BookOpen className={`w-4 h-4 shrink-0 ${hasGap ? 'text-amber-600' : 'text-slate-400'}`} />
                      <span className="text-slate-600">
                        Capacitação Recomendada no Catálogo:
                      </span>
                      <span className="font-semibold text-slate-900">{comp.recommendedTraining}</span>
                    </div>

                    <button
                      onClick={() => onRequestSpecificTraining(comp.recommendedTraining!, comp.name)}
                      className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-white border border-indigo-200 rounded-md hover:bg-indigo-50 transition-colors whitespace-nowrap self-start sm:self-auto"
                    >
                      Solicitar Este Treinamento
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Add Competency to Role */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Adicionar Nova Competência
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Cargo alvo: <strong>{currentRole?.roleName}</strong> ({currentDept?.name})
            </p>

            <form onSubmit={handleAddCompetency} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Nome da Competência *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Arquitetura de Eventos ou Gestão de Conflitos"
                  value={newCompName}
                  onChange={(e) => setNewCompName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tipo</label>
                  <select
                    value={newCompType}
                    onChange={(e) => setNewCompType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Técnica">Técnica (Hard Skill)</option>
                    <option value="Comportamental">Comportamental (Soft Skill)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Categoria</label>
                  <select
                    value={newCompCategory}
                    onChange={(e) => setNewCompCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Liderança">Liderança</option>
                    <option value="Negócios">Negócios</option>
                    <option value="Operações">Operações</option>
                    <option value="Comportamental">Comportamental</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Descrição & Comportamentos Esperados
                </label>
                <textarea
                  rows={2}
                  placeholder="Explique o que o profissional deve saber ou demonstrar..."
                  value={newCompDesc}
                  onChange={(e) => setNewCompDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Nível Alvo Requerido (1 a 5)</label>
                  <select
                    value={newCompTarget}
                    onChange={(e) => setNewCompTarget(Number(e.target.value) as CompetencyLevel)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value={1}>1 - Básico</option>
                    <option value={2}>2 - Prático</option>
                    <option value={3}>3 - Autônomo</option>
                    <option value={4}>4 - Avançado</option>
                    <option value={5}>5 - Especialista</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Nível Atual Diagnosticado</label>
                  <select
                    value={newCompCurrent}
                    onChange={(e) => setNewCompCurrent(Number(e.target.value) as CompetencyLevel)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value={1}>1 - Básico</option>
                    <option value={2}>2 - Prático</option>
                    <option value={3}>3 - Autônomo</option>
                    <option value={4}>4 - Avançado</option>
                    <option value={5}>5 - Especialista</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Treinamento Recomendado para Sanar Gap
                </label>
                <input
                  type="text"
                  placeholder="Ex: Curso Especializado de Arquitetura de Software"
                  value={newCompTraining}
                  onChange={(e) => setNewCompTraining(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Salvar Competência
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
