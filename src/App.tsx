/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, TrainingCourse, TrainingRequest, CertificateItem, StarMaker, RequestStatus } from './types';
import { 
  INITIAL_DEPARTMENTS, 
  INITIAL_TRAININGS, 
  INITIAL_REQUESTS, 
  INITIAL_CERTIFICATES, 
  INITIAL_STAR_MAKERS 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CertificateModal } from './components/CertificateModal';
import { HomePage } from './pages/HomePage';
import { CompetencyMatrixPage } from './pages/CompetencyMatrixPage';
import { TrainingRequestPage } from './pages/TrainingRequestPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { StarMakersPage } from './pages/StarMakersPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Application Data with localStorage persistence
  const [departments] = useState(INITIAL_DEPARTMENTS);

  const [trainings, setTrainings] = useState<TrainingCourse[]>(() => {
    try {
      const saved = localStorage.getItem('portal_td_trainings');
      return saved ? JSON.parse(saved) : INITIAL_TRAININGS;
    } catch {
      return INITIAL_TRAININGS;
    }
  });

  const [requests, setRequests] = useState<TrainingRequest[]>(() => {
    try {
      const saved = localStorage.getItem('portal_td_requests');
      return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  });

  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    try {
      const saved = localStorage.getItem('portal_td_certificates');
      return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
    } catch {
      return INITIAL_CERTIFICATES;
    }
  });

  const [starMakers, setStarMakers] = useState<StarMaker[]>(() => {
    try {
      const saved = localStorage.getItem('portal_td_starmakers');
      return saved ? JSON.parse(saved) : INITIAL_STAR_MAKERS;
    } catch {
      return INITIAL_STAR_MAKERS;
    }
  });

  // Modal State
  const [activeCertificateModal, setActiveCertificateModal] = useState<CertificateItem | null>(null);

  // Prefill State for Training Request
  const [prefilledTrainingTitle, setPrefilledTrainingTitle] = useState('');
  const [prefilledCompetency, setPrefilledCompetency] = useState('');

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portal_td_trainings', JSON.stringify(trainings));
    } catch (e) {
      console.error(e);
    }
  }, [trainings]);

  useEffect(() => {
    try {
      localStorage.setItem('portal_td_requests', JSON.stringify(requests));
    } catch (e) {
      console.error(e);
    }
  }, [requests]);

  useEffect(() => {
    try {
      localStorage.setItem('portal_td_certificates', JSON.stringify(certificates));
    } catch (e) {
      console.error(e);
    }
  }, [certificates]);

  useEffect(() => {
    try {
      localStorage.setItem('portal_td_starmakers', JSON.stringify(starMakers));
    } catch (e) {
      console.error(e);
    }
  }, [starMakers]);

  // Handlers
  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnrollTraining = (training: TrainingCourse) => {
    setTrainings((prev) =>
      prev.map((t) =>
        t.id === training.id ? { ...t, seatsAvailable: Math.max(0, t.seatsAvailable - 1) } : t
      )
    );
  };

  const handleRequestSpecificTraining = (trainingTitle: string, competencyName: string) => {
    setPrefilledTrainingTitle(trainingTitle);
    setPrefilledCompetency(competencyName);
    setCurrentPage('training-request');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInviteStarMakerToTrain = (makerName: string, specialty: string) => {
    setPrefilledTrainingTitle(`Oficina Prática de ${specialty}`);
    setPrefilledCompetency(`Capacitação com facilitador interno: ${makerName}`);
    setCurrentPage('training-request');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitRequest = (
    newReqData: Omit<TrainingRequest, 'id' | 'protocol' | 'submittedAt' | 'timeline' | 'status'>
  ) => {
    const today = new Date().toLocaleDateString('pt-BR');
    const randomProtocol = `SOL-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRequest: TrainingRequest = {
      ...newReqData,
      id: `req-${Date.now()}`,
      protocol: randomProtocol,
      status: 'Pendente Gestor',
      submittedAt: today,
      timeline: [
        {
          status: 'Pendente Gestor',
          date: today,
          note: 'Solicitação registrada pelo colaborador no Portal T&D.'
        }
      ]
    };

    setRequests((prev) => [newRequest, ...prev]);
  };

  const handleUpdateStatus = (id: string, newStatus: RequestStatus, note: string) => {
    const today = new Date().toLocaleDateString('pt-BR');
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        return {
          ...r,
          status: newStatus,
          timeline: [...r.timeline, { status: newStatus, date: today, note }]
        };
      })
    );
  };

  const handleRequestNewCertificate = (newCertData: Omit<CertificateItem, 'id' | 'code'>) => {
    const randomCode = `TD-2026-${Math.floor(1000 + Math.random() * 9000)}-BR`;
    const newCert: CertificateItem = {
      ...newCertData,
      id: `cert-${Date.now()}`,
      code: randomCode
    };

    setCertificates((prev) => [newCert, ...prev]);
  };

  const handleApplyToBeStarMaker = (
    newMakerData: Omit<
      StarMaker,
      'id' | 'hoursTaught' | 'classesCount' | 'studentRating' | 'totalStudents' | 'kudos' | 'avatarColor'
    >
  ) => {
    const newMaker: StarMaker = {
      ...newMakerData,
      id: `sm-${Date.now()}`,
      hoursTaught: 0,
      classesCount: 0,
      studentRating: 5.0,
      totalStudents: 0,
      avatarColor: 'from-violet-600 to-indigo-800',
      kudos: [
        {
          author: 'Coordenação de T&D',
          authorRole: 'Gestão de Educação Corporativa',
          message: 'Boas-vindas ao programa de multiplicadores! Estamos empolgados com sua iniciativa.',
          date: 'Hoje'
        }
      ]
    };

    setStarMakers((prev) => [newMaker, ...prev]);
  };

  const handleSendKudos = (makerId: string, author: string, authorRole: string, message: string) => {
    setStarMakers((prev) =>
      prev.map((m) => {
        if (m.id !== makerId) return m;
        return {
          ...m,
          kudos: [{ author, authorRole, message, date: 'Agora mesmo' }, ...m.kudos]
        };
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar Navigation Contract */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onRequestTrainingClick={() => {
          setPrefilledTrainingTitle('');
          setPrefilledCompetency('');
          handleNavigate('training-request');
        }}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            trainings={trainings}
            onEnrollTraining={handleEnrollTraining}
          />
        )}

        {currentPage === 'competencies' && (
          <CompetencyMatrixPage
            departments={departments}
            onNavigate={handleNavigate}
            onRequestSpecificTraining={handleRequestSpecificTraining}
          />
        )}

        {currentPage === 'training-request' && (
          <TrainingRequestPage
            requests={requests}
            onSubmitRequest={handleSubmitRequest}
            onUpdateStatus={handleUpdateStatus}
            prefilledTitle={prefilledTrainingTitle}
            prefilledCompetency={prefilledCompetency}
          />
        )}

        {currentPage === 'certificates' && (
          <CertificatesPage
            certificates={certificates}
            onRequestNewCertificate={handleRequestNewCertificate}
            onOpenCertificateModal={(cert) => setActiveCertificateModal(cert)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'star-makers' && (
          <StarMakersPage
            starMakers={starMakers}
            onApplyToBeStarMaker={handleApplyToBeStarMaker}
            onSendKudos={handleSendKudos}
            onInviteToTrain={handleInviteStarMakerToTrain}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Printable Certificate Modal */}
      <CertificateModal
        certificate={activeCertificateModal}
        onClose={() => setActiveCertificateModal(null)}
      />

      {/* Corporate Clean Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
