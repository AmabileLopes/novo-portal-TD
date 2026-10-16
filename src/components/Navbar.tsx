import React from 'react';
import { PageId } from '../types';
import { NddLogo } from './NddLogo';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onRequestTrainingClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onRequestTrainingClick
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#EADCCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Official NDD Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center shrink-0 hover:opacity-85 transition-opacity text-left cursor-pointer"
            aria-label="NDD - Início"
          >
            <NddLogo className="h-8 sm:h-9 w-auto" textColor="#4A151E" />
          </button>

          {/* Zone 2: Navigation links in clean bordeaux typography */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A151E]">
            <button
              onClick={() => onNavigate('home')}
              className={`whitespace-nowrap shrink-0 py-1 transition-all ${
                currentPage === 'home'
                  ? 'font-bold border-b-2 border-[#4A151E]'
                  : 'hover:opacity-75'
              }`}
            >
              comece por aqui
            </button>
            <button
              onClick={() => onNavigate('competencies')}
              className={`whitespace-nowrap shrink-0 py-1 transition-all ${
                currentPage === 'competencies'
                  ? 'font-bold border-b-2 border-[#4A151E]'
                  : 'hover:opacity-75'
              }`}
            >
              matriz de competências
            </button>
            <button
              onClick={() => onNavigate('training-request')}
              className={`whitespace-nowrap shrink-0 py-1 transition-all ${
                currentPage === 'training-request'
                  ? 'font-bold border-b-2 border-[#4A151E]'
                  : 'hover:opacity-75'
              }`}
            >
              solicitação de treinamentos
            </button>
            <button
              onClick={() => onNavigate('certificates')}
              className={`whitespace-nowrap shrink-0 py-1 transition-all ${
                currentPage === 'certificates'
                  ? 'font-bold border-b-2 border-[#4A151E]'
                  : 'hover:opacity-75'
              }`}
            >
              certificados
            </button>
            <button
              onClick={() => onNavigate('star-makers')}
              className={`whitespace-nowrap shrink-0 py-1 transition-all ${
                currentPage === 'star-makers'
                  ? 'font-bold border-b-2 border-[#4A151E]'
                  : 'hover:opacity-75'
              }`}
            >
              star makers
            </button>
          </nav>

          {/* Zone 3: 1 clean primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onRequestTrainingClick}
              className="px-4 py-2 text-xs font-semibold text-[#FFFDFB] bg-[#581C26] rounded-full hover:bg-[#43141C] transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              solicitar treinamento
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation strip */}
        <div className="md:hidden flex items-center gap-4 py-2.5 overflow-x-auto text-xs font-medium border-t border-[#EADCCF]/60 no-scrollbar text-[#4A151E]">
          <button
            onClick={() => onNavigate('home')}
            className={`whitespace-nowrap shrink-0 px-2 py-1 ${currentPage === 'home' ? 'font-bold underline' : 'opacity-80'}`}
          >
            início
          </button>
          <button
            onClick={() => onNavigate('competencies')}
            className={`whitespace-nowrap shrink-0 px-2 py-1 ${currentPage === 'competencies' ? 'font-bold underline' : 'opacity-80'}`}
          >
            matriz
          </button>
          <button
            onClick={() => onNavigate('training-request')}
            className={`whitespace-nowrap shrink-0 px-2 py-1 ${currentPage === 'training-request' ? 'font-bold underline' : 'opacity-80'}`}
          >
            solicitações
          </button>
          <button
            onClick={() => onNavigate('certificates')}
            className={`whitespace-nowrap shrink-0 px-2 py-1 ${currentPage === 'certificates' ? 'font-bold underline' : 'opacity-80'}`}
          >
            certificados
          </button>
          <button
            onClick={() => onNavigate('star-makers')}
            className={`whitespace-nowrap shrink-0 px-2 py-1 ${currentPage === 'star-makers' ? 'font-bold underline' : 'opacity-80'}`}
          >
            star makers
          </button>
        </div>
      </div>
    </header>
  );
};

