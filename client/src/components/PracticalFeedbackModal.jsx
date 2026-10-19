import React, { useState } from 'react';
import { X, MessageSquareShare, Star, CheckCircle2, ShieldCheck } from 'lucide-react';
import { submitPracticalFeedback } from '../services/api';

export default function PracticalFeedbackModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [courseCode, setCourseCode] = useState('INT219');
  const [hardwareRating, setHardwareRating] = useState(5);
  const [facultyRating, setFacultyRating] = useState(5);
  const [experimentRating, setExperimentRating] = useState(4);
  const [comments, setComments] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await submitPracticalFeedback(courseCode, { hardwareRating, facultyRating, experimentRating }, comments);
    setSubmitting(false);
    alert("Practical Lab Feedback recorded anonymously. Thank you for your feedback!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <MessageSquareShare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Practical & Lab Feedback</h3>
              <p className="text-xs text-slate-400">Continuous Curriculum Quality Evaluation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto flex-1 space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Select Practical Lab
            </label>
            <select
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
            >
              <option value="INT219">INT219 - Full Stack Web Lab (Room 38-502 Mac Lab)</option>
              <option value="MEC136">MEC136 - Engineering Graphics CAD Workshop (Room 28-503)</option>
              <option value="CSE316">CSE316 - Operating Systems Lab (Block 34 Room 601)</option>
            </select>
          </div>

          {/* Rating 1 */}
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-750 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
              <span>Lab Hardware & Software Availability</span>
              <span className="text-amber-400 font-bold">{hardwareRating} / 5</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setHardwareRating(star)}
                  className={`flex-1 py-1 rounded-lg text-xs font-bold ${
                    hardwareRating >= star ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  ★ {star}
                </button>
              ))}
            </div>
          </div>

          {/* Rating 2 */}
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-750 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
              <span>Faculty Explanation & Live Demonstration</span>
              <span className="text-amber-400 font-bold">{facultyRating} / 5</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setFacultyRating(star)}
                  className={`flex-1 py-1 rounded-lg text-xs font-bold ${
                    facultyRating >= star ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  ★ {star}
                </button>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Suggestions & Comments
            </label>
            <textarea
              rows={3}
              placeholder="Any issues with machines, projector or code environment..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none"
            />
          </div>

          {/* Anonymous toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 border border-teal-500/30">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <div>
                <div className="text-xs font-bold text-white">Submit Anonymously</div>
                <div className="text-[10px] text-slate-400">Your registration ID will be completely masked</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 accent-teal-500 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-xs shadow-md"
          >
            {submitting ? 'Submitting...' : 'Submit Practical Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}
