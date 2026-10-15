import React, { useState } from 'react';
import { CertificateItem, PageId } from '../types';
import { 
  Award, 
  Search, 
  CheckCircle2, 
  Printer, 
  ShieldCheck, 
  Plus, 
  Copy, 
  FileCheck, 
  Clock, 
  Upload, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface CertificatesPageProps {
  certificates: CertificateItem[];
  onRequestNewCertificate: (newCert: Omit<CertificateItem, 'id' | 'code'>) => void;
  onOpenCertificateModal: (cert: CertificateItem) => void;
  onNavigate: (page: PageId) => void;
}

export const CertificatesPage: React.FC<CertificatesPageProps> = ({
  certificates,
  onRequestNewCertificate,
  onOpenCertificateModal,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'my-certs' | 'request-cert' | 'validator'>('my-certs');

  // Form State for Requesting Certificate
  const [trainingTitle, setTrainingTitle] = useState('');
  const [participantName, setParticipantName] = useState('Lucas Oliveira Santos');
  const [participantCpf, setParticipantCpf] = useState('***.492.188-**');
  const [durationHours, setDurationHours] = useState<number>(16);
  const [completionDate, setCompletionDate] = useState('14 de Outubro de 2026');
  const [instructorName, setInstructorName] = useState('Mariana Duarte');
  const [instructorRole, setInstructorRole] = useState('Star Maker & Especialista de IA');
  const [skillsText, setSkillsText] = useState('Design Thinking, Facilitação Ágil, Inteligência Artificial');
  const [simulatedFile, setSimulatedFile] = useState<string | null>(null);
  const [requestSubmittedSuccess, setRequestSubmittedSuccess] = useState(false);

  // Validator state
  const [validationCodeInput, setValidationCodeInput] = useState('');
  const [validationResult, setValidationResult] = useState<CertificateItem | null | 'not_found'>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainingTitle.trim() || !participantName.trim()) return;

    const skillsArray = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onRequestNewCertificate({
      trainingTitle: trainingTitle.trim(),
      participantName: participantName.trim(),
      participantCpfMasked: participantCpf,
      completionDate,
      durationHours: Number(durationHours) || 8,
      instructorName: instructorName.trim() || 'Equipe Corporativa T&D',
      instructorRole: instructorRole.trim() || 'Facilitador Corporativo',
      institution: 'Academia Corporativa de Treinamento & Desenvolvimento',
      skillsAcquired: skillsArray.length > 0 ? skillsArray : ['Desenvolvimento Profissional Contínuo'],
      status: 'Emitido',
      isExternal: false
    });

    setRequestSubmittedSuccess(true);
    setActiveTab('my-certs');
    setTrainingTitle('');
    setSimulatedFile(null);
  };

  const handleValidateCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = validationCodeInput.trim().toUpperCase();
    if (!cleanInput) return;

    const found = certificates.find((c) => c.code.toUpperCase() === cleanInput);
    if (found) {
      setValidationResult(found);
    } else {
      setValidationResult('not_found');
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Bar */}
      <div className="bg-[#FFFDFB] p-6 sm:p-8 rounded-2xl border border-[#EADCCF]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EADCCF]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8C3B4B] font-semibold mb-1">
              <span>Certificação &amp; Acreditação Profissional</span>
              <span aria-hidden="true">·</span>
              <span>Registros Oficiais T&amp;D</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3E1219] tracking-tight">
              Certificados de Conclusão &amp; Validação
            </h1>
            <p className="text-xs sm:text-sm text-[#5C232E] mt-1 max-w-2xl leading-relaxed">
              Emita, visualize e imprima seus certificados corporativos oficiais com autenticação por código verificador, ou solicite a 2ª via de treinamentos concluídos.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF7F2] rounded-full shrink-0 border border-[#EADCCF]">
            <button
              onClick={() => setActiveTab('my-certs')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
                activeTab === 'my-certs'
                  ? 'bg-[#581C26] text-[#FFFDFB] shadow-xs'
                  : 'text-[#6A2834] hover:text-[#3E1219]'
              }`}
            >
              Meus Certificados ({certificates.length})
            </button>
            <button
              onClick={() => setActiveTab('request-cert')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
                activeTab === 'request-cert'
                  ? 'bg-[#581C26] text-[#FFFDFB] shadow-xs'
                  : 'text-[#6A2834] hover:text-[#3E1219]'
              }`}
            >
              Solicitar Emissão
            </button>
            <button
              onClick={() => setActiveTab('validator')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
                activeTab === 'validator'
                  ? 'bg-[#581C26] text-[#FFFDFB] shadow-xs'
                  : 'text-[#6A2834] hover:text-[#3E1219]'
              }`}
            >
              Validar Autenticidade
            </button>
          </div>
        </div>

        {requestSubmittedSuccess && (
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-sm">Certificado gerado com sucesso!</p>
                <p className="text-slate-600 mt-0.5">
                  O documento foi registrado no sistema e já está disponível para impressão e download no padrão oficial.
                </p>
              </div>
            </div>
            <button
              onClick={() => setRequestSubmittedSuccess(false)}
              className="text-xs font-semibold text-emerald-800 hover:underline"
            >
              Fechar
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: MEUS CERTIFICADOS */}
      {activeTab === 'my-certs' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all relative overflow-hidden group"
              >
                {/* Decorative border line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600" />

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">
                      {cert.code}
                    </span>
                    <span className="tabular-nums font-mono font-medium text-slate-700">
                      {cert.durationHours} horas
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {cert.trainingTitle}
                  </h3>

                  <p className="text-xs text-slate-500 mb-4">
                    Instrutor: <strong className="text-slate-700">{cert.instructorName}</strong> ({cert.instructorRole})
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Aluno(a):</span>
                      <span className="font-medium text-slate-800">{cert.participantName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Data de Conclusão:</span>
                      <span className="font-medium text-slate-800">{cert.completionDate}</span>
                    </div>
                  </div>

                  {cert.skillsAcquired && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Competências Acreditadas:
                      </span>
                      <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                        {cert.skillsAcquired.map((skill, idx) => (
                          <span key={idx} className="bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenCertificateModal(cert)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Award className="w-4 h-4" />
                    <span>Visualizar Certificado</span>
                  </button>

                  <button
                    onClick={() => handleCopyCode(cert.code)}
                    title="Copiar Código Verificador"
                    className="p-2 text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                  >
                    {copiedCode === cert.code ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SOLICITAR EMISSÃO */}
      {activeTab === 'request-cert' && (
        <form onSubmit={handleRequestSubmit} className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">
              Formulário de Solicitação de Certificado ou 2ª Via
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Informe os dados da capacitação concluída para emissão imediata e validação no sistema.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Nome do Treinamento Concluído *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Formação em Comunicação Não-Violenta e Feedforward"
                value={trainingTitle}
                onChange={(e) => setTrainingTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Nome Completo do Aluno(a) *
                </label>
                <input
                  type="text"
                  required
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  CPF (com máscara)
                </label>
                <input
                  type="text"
                  value={participantCpf}
                  onChange={(e) => setParticipantCpf(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Carga Horária Total (Horas) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="400"
                  required
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Data de Conclusão *
                </label>
                <input
                  type="text"
                  required
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  placeholder="Ex: 14 de Outubro de 2026"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Nome do(a) Instrutor(a) ou Instituição *
                </label>
                <input
                  type="text"
                  required
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Cargo / Função do(a) Instrutor(a)
                </label>
                <input
                  type="text"
                  value={instructorRole}
                  onChange={(e) => setInstructorRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Habilidades Desenvolvidas (separadas por vírgula)
              </label>
              <input
                type="text"
                placeholder="Ex: Liderança Ativa, Gestão de Tempo, Metodologias Ágeis"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Simulated file upload */}
            <div className="pt-2">
              <label className="block font-medium text-slate-700 mb-1">
                Comprovante de Conclusão ou Lista de Presença (Opcional)
              </label>
              <div className="p-4 border-2 border-dashed border-slate-200 rounded-lg text-center bg-slate-50 hover:bg-slate-100/50 transition-colors cursor-pointer">
                <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
                {simulatedFile ? (
                  <p className="text-xs font-semibold text-emerald-700 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Arquivo selecionado: {simulatedFile}</span>
                  </p>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => setSimulatedFile('comprovante_presenca_treinamento.pdf')}
                      className="text-xs text-indigo-600 hover:underline font-semibold"
                    >
                      Clique para simular anexo de arquivo PDF ou foto
                    </button>
                    <p className="text-[11px] text-slate-400 mt-0.5">PDF, PNG ou JPG de até 10MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('my-certs')}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
            >
              Emitir Certificado Oficial
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: VALIDADOR DE AUTENTICIDADE */}
      {activeTab === 'validator' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">
                Validador Público de Autenticidade de Certificados
              </h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Todos os certificados expedidos pela Academia Corporativa de T&D possuem um código verificador exclusivo com registro de autenticidade criptográfica. Digite o código abaixo para validar sua legitimidade.
            </p>

            <form onSubmit={handleValidateCode} className="flex gap-2">
              <input
                type="text"
                placeholder="Ex: TD-2026-8841-BR"
                value={validationCodeInput}
                onChange={(e) => setValidationCodeInput(e.target.value)}
                className="flex-1 px-4 py-2 text-xs uppercase font-mono tracking-wider border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
              />
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shrink-0"
              >
                Verificar
              </button>
            </form>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <span>Sugestão para teste rápido:</span>
              <button
                type="button"
                onClick={() => setValidationCodeInput('TD-2026-8841-BR')}
                className="font-mono text-indigo-600 hover:underline"
              >
                TD-2026-8841-BR
              </button>
              <span>ou</span>
              <button
                type="button"
                onClick={() => setValidationCodeInput('TD-2026-9104-BR')}
                className="font-mono text-indigo-600 hover:underline"
              >
                TD-2026-9104-BR
              </button>
            </div>
          </div>

          {/* Validation Result Box */}
          {validationResult === 'not_found' && (
            <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-2">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Certificado Não Encontrado</span>
              </div>
              <p className="text-rose-700">
                O código informado não consta na base de dados de certificados autenticados do Portal T&D. Verifique se digitou o código exatamente como expresso no rodapé do documento.
              </p>
            </div>
          )}

          {validationResult && validationResult !== 'not_found' && (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-sm text-emerald-950">
                    Certificado Autêntico & Válido
                  </span>
                </div>
                <span className="font-mono text-xs font-semibold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                  {validationResult.code}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[11px]">Curso Concluído:</span>
                  <span className="font-bold text-slate-900">{validationResult.trainingTitle}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Aluno Titular:</span>
                  <span className="font-bold text-slate-900">{validationResult.participantName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Carga Horária Registrada:</span>
                  <span className="font-semibold text-slate-900 font-mono tabular-nums">{validationResult.durationHours} horas</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Data de Emissão:</span>
                  <span className="font-semibold text-slate-900">{validationResult.completionDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Instrutor / Facilitador:</span>
                  <span className="font-semibold text-slate-900">{validationResult.instructorName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Status no Registro:</span>
                  <span className="font-bold text-emerald-700">Ativo & Auditado</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenCertificateModal(validationResult)}
                  className="w-full py-2 text-xs font-semibold text-emerald-900 bg-emerald-200/60 hover:bg-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-emerald-800" />
                  <span>Abrir Documento Oficial para Impressão</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
