import React from 'react';
import { X, Database, AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';

interface ProvenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProvenanceModal: React.FC<ProvenanceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#24113F]/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#DCCEFF] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          id="close-provenance-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#29252F]/60 hover:text-[#24113F] p-1.5 rounded-lg hover:bg-[#F8F6FC] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-xs font-mono-stat uppercase tracking-wider text-[#6C3BFF] font-semibold mb-2">
          <Database className="w-4 h-4 text-[#6C3BFF]" />
          <span>Research Data Provenance Disclosure</span>
        </div>

        <h3 className="font-editorial text-2xl font-bold text-[#24113F] mb-3">
          50,000-Row Working Dataset Specification
        </h3>

        <div className="space-y-4 text-xs text-[#29252F] leading-relaxed">
          <div className="p-4 bg-[#F8F6FC] rounded-xl border border-[#DCCEFF]">
            <div className="flex items-start space-x-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[#24113F] font-medium leading-relaxed">
                <strong className="text-[#24113F]">Mandatory Research Caution:</strong> The supplied 50,000-row CSV file does not contain embedded collection date, institutional provenance, or geographic sampling metadata.
                Per Assignment 1 guidelines, it must be treated as a <em>supplied/synthetic exploratory research model</em> rather than an unverified empirical census of a real-world student population.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#24113F] mb-1.5 text-sm">
              Quality Audit Findings:
            </h4>
            <ul className="space-y-1.5 pl-4 list-disc text-[#29252F]">
              <li><strong>Zero missing values</strong> across all 16 original variables.</li>
              <li><strong>Zero duplicate records</strong> or duplicate <code className="font-mono-stat text-[#6C3BFF] font-semibold">student_id</code> fields.</li>
              <li>Pre- and post-semester GPA strictly bounded within the 1.0 to 4.0 scale.</li>
              <li>Perceived dependency and exam anxiety strictly bounded within 1 to 10.</li>
              <li>Weekly GenAI hours bounded between 0 and 40 hours/week.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#24113F] mb-1.5 text-sm">
              Triangulation with Real-World Benchmarks:
            </h4>
            <p className="text-[#29252F] mb-1.5">
              To ensure external validity, findings from the 50,000-student dataset are systematically triangulated with:
            </p>
            <ul className="space-y-1 pl-4 list-disc text-[#29252F]">
              <li><strong>HEPI 2026 / 2025:</strong> 1,054 UK undergraduate survey conducted by Savanta.</li>
              <li><strong>Jisc 2025:</strong> 1,274 FE/HE survey responses + 173 discussion-group students.</li>
              <li><strong>Assam &amp; Gujarat 2025:</strong> 200 university students in Northeast &amp; Western India.</li>
              <li><strong>EY-Parthenon &amp; FICCI 2025:</strong> 30 leading Indian higher education institutions.</li>
            </ul>
          </div>

          <div className="pt-3 border-t border-[#DCCEFF] flex justify-end">
            <button
              id="dismiss-provenance-btn"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#24113F] text-[#C7F36B] font-bold text-xs hover:bg-[#6C3BFF] hover:text-white transition-all cursor-pointer shadow-xs"
            >
              Acknowledge &amp; Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
