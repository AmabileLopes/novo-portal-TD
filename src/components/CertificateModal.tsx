import React from 'react';
import { CertificateItem } from '../types';
import { Award, CheckCircle, Download, Printer, X, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden my-8 border border-slate-200">
        {/* Modal Toolbar (hidden when printing) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-sm">Visualização do Certificado Oficial</span>
            <span className="text-xs text-slate-400 font-mono">[{certificate.code}]</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-8 sm:p-12 bg-white certificate-print-sheet">
          <div className="border-4 border-double border-slate-700 p-8 sm:p-10 relative bg-linear-to-b from-amber-50/20 via-white to-slate-50/30">
            {/* Corner Ornaments */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-slate-600" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-slate-600" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-slate-600" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-slate-600" />

            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 text-amber-400 mb-3 shadow-md">
                <Award className="w-8 h-8" />
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-1">
                {certificate.institution}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
                Certificado de Conclusão
              </h2>
              <div className="w-24 h-0.5 bg-amber-500 mx-auto mt-2" />
            </div>

            {/* Body Text */}
            <div className="text-center space-y-4 max-w-2xl mx-auto my-6">
              <p className="text-sm text-slate-600">
                Certificamos para os devidos fins que
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-indigo-950 font-serif border-b border-slate-200 pb-2">
                {certificate.participantName}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Documento de Identificação: {certificate.participantCpfMasked}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed pt-2">
                concluiu com êxito o programa de capacitação profissional em{' '}
                <strong className="text-slate-900 font-semibold">{certificate.trainingTitle}</strong>,
                ministrado em conformidade com as diretrizes do Programa de Desenvolvimento e Educação Corporativa, com carga horária total de{' '}
                <strong className="text-slate-900 font-semibold tabular-nums">{certificate.durationHours} horas</strong>.
              </p>
            </div>

            {/* Competencies Acquired */}
            {certificate.skillsAcquired && certificate.skillsAcquired.length > 0 && (
              <div className="my-6 max-w-2xl mx-auto p-4 bg-slate-50 rounded-lg border border-slate-200/80">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2 text-center">
                  Competências e Habilidades Desenvolvidas:
                </p>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-700">
                  {certificate.skillsAcquired.map((skill, index) => (
                    <span key={index} className="inline-flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Date and Signatures */}
            <div className="grid grid-cols-2 gap-8 pt-8 mt-6 border-t border-slate-200 text-center">
              <div>
                <div className="h-10 flex items-end justify-center mb-1">
                  <span className="font-serif italic text-base text-slate-800">
                    {certificate.instructorName}
                  </span>
                </div>
                <div className="w-48 mx-auto border-t border-slate-400" />
                <p className="text-xs font-semibold text-slate-900 mt-1">{certificate.instructorName}</p>
                <p className="text-[11px] text-slate-500">{certificate.instructorRole}</p>
              </div>

              <div>
                <div className="h-10 flex items-end justify-center mb-1">
                  <span className="font-serif italic text-base text-slate-800">
                    Helena Drummond
                  </span>
                </div>
                <div className="w-48 mx-auto border-t border-slate-400" />
                <p className="text-xs font-semibold text-slate-900 mt-1">Helena Drummond</p>
                <p className="text-[11px] text-slate-500">Diretoria de Desenvolvimento Humano e Organizacional</p>
              </div>
            </div>

            {/* Footer validation code */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Autenticidade garantida pelo Sistema T&D</span>
              </div>
              <div className="font-mono tabular-nums">
                Data de Conclusão: {certificate.completionDate}
              </div>
              <div className="font-mono bg-slate-100 px-2.5 py-0.5 rounded text-slate-700">
                Código Verificador: {certificate.code}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="no-print px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Baixar / Imprimir Certificado</span>
          </button>
        </div>
      </div>
    </div>
  );
};
