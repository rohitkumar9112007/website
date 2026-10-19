import React, { useState, useEffect } from 'react';
import { X, CheckSquare, UploadCloud, Clock, CheckCircle2, FileText, AlertCircle } from 'lucide-react';
import { fetchAssignments, submitAssignment } from '../services/api';

export default function AssignmentsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [selectedAsg, setSelectedAsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    loadAssignments();
  }, [isOpen]);

  const loadAssignments = async () => {
    const res = await fetchAssignments();
    if (res && res.assignments) setAssignments(res.assignments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAsg) return;
    setSubmitting(true);
    const fileName = uploadedFile ? uploadedFile.name : `${selectedAsg.courseCode}_Submission.pdf`;
    await submitAssignment(selectedAsg.id, fileName);
    setSubmitting(false);
    setSelectedAsg(null);
    setUploadedFile(null);
    loadAssignments();
    alert("Assignment submitted successfully to faculty portal!");
  };

  const filtered = assignments.filter((a) => {
    if (filter === 'ALL') return true;
    return a.status === filter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Course Assignments</h3>
              <p className="text-xs text-slate-400">Continuous Assessment & Submissions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter chips */}
        <div className="px-4 py-2 border-b border-slate-800/80 flex gap-1.5 bg-slate-950/40">
          {['ALL', 'PENDING', 'SUBMITTED', 'GRADED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                filter === f ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-750 hover:border-slate-700 space-y-2.5 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-700">
                    {item.courseCode}
                  </span>
                  <span className="text-xs font-bold text-white line-clamp-1">{item.title}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.status === 'PENDING' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  item.status === 'SUBMITTED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {item.status}
                </span>
              </div>

              <p className="text-[11px] text-slate-300 leading-snug">{item.description}</p>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-750">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Due: <strong className="text-slate-200">{item.dueDate}</strong>
                </span>

                {item.status === 'PENDING' ? (
                  <button
                    onClick={() => setSelectedAsg(item)}
                    className="px-3 py-1 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    Submit Work
                  </button>
                ) : item.grade ? (
                  <span className="font-mono font-bold text-emerald-400 text-xs">
                    Score: {item.grade}
                  </span>
                ) : (
                  <span className="text-blue-400 text-xs font-semibold">
                    Submitted: {item.submittedAt}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* SUBMIT WORK POPUP */}
        {selectedAsg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 animate-fadeIn">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">{selectedAsg.courseCode}</span>
                  <h4 className="text-sm font-bold text-white">{selectedAsg.title}</h4>
                </div>
                <button onClick={() => setSelectedAsg(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Upload area */}
              <label className="border-2 border-dashed border-slate-750 hover:border-cyan-500/60 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-950/60 transition">
                <UploadCloud className="w-8 h-8 text-cyan-400 mb-1" />
                <span className="text-xs font-semibold text-slate-200">
                  {uploadedFile ? uploadedFile.name : 'Click to select or drop assignment PDF'}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">PDF, DOCX up to 25MB</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setUploadedFile(e.target.files[0])}
                />
              </label>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs shadow-md"
              >
                {submitting ? 'Uploading to UMS...' : 'Confirm Submission'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
