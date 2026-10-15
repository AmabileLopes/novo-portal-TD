import React from 'react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#380E16] text-[#EADCCF] text-sm mt-20 border-t border-[#4E1721] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <span className="text-white font-black text-2xl tracking-tight block mb-3 font-sans">
              t&amp;d
            </span>
            <p className="text-xs text-[#D8C5B6] leading-relaxed max-w-xs font-editorial italic text-sm">
              Um time especializado em cultura de aprendizagem, capacitação contínua e desenvolvimento de talentos.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-3">
              Navegação do Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Comece por Aqui (Início)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('competencies')}
                  className="hover:text-white transition-colors"
                >
                  Matriz de Competências &amp; Gaps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('training-request')}
                  className="hover:text-white transition-colors"
                >
                  Solicitação de Treinamentos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('certificates')}
                  className="hover:text-white transition-colors"
                >
                  Certificados Oficiais
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('star-makers')}
                  className="hover:text-white transition-colors"
                >
                  Programa Star Makers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-3">
              Diretrizes de T&amp;D
            </h4>
            <ul className="space-y-2 text-xs text-[#D8C5B6]">
              <li>Cultura de Aprendizagem Contínua</li>
              <li>Manual do Multiplicador Star Maker</li>
              <li>Diagnóstico &amp; Avaliação de Competências</li>
              <li>Política de Reembolso e Cursos Externos</li>
              <li>Segurança e Privacidade de Dados</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-3">
              Atendimento T&amp;D
            </h4>
            <p className="text-xs text-[#D8C5B6] leading-relaxed mb-2">
              Dúvidas sobre turmas, matrizes de competência ou programas de mentoria:
            </p>
            <p className="text-xs text-white font-semibold">ted@empresa.com.br</p>
            <p className="text-xs text-[#D8C5B6] mt-1">Intranet Corporativa · Polo de Educação</p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#4E1721] flex flex-col sm:flex-row items-center justify-between text-xs text-[#C2AEA0] gap-4">
          <p>© 2026 Portal T&amp;D. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Cultura de Aprendizagem</span>
            <span aria-hidden="true">·</span>
            <span>Educação Corporativa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

