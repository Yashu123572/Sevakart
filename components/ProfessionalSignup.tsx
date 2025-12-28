
import React, { useState } from 'react';
import { User, Phone, Briefcase, FileText, Camera, CreditCard, ChevronRight, CheckCircle2, ShieldCheck, X, ArrowLeft, Upload } from 'lucide-react';
import CameraCapture from './CameraCapture';

const ProfessionalSignup: React.FC<{ onComplete: () => void, onCancel: () => void }> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electrician',
    phone: '',
    aadhaar: null as string | null,
    pan: null as string | null,
    livePhoto: null as string | null
  });

  const categories = ["Electrician", "Plumber", "AC Repair", "Cleaning", "Carpenter", "Painter", "Tech Support"];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'aadhaar' | 'pan') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="space-y-4">
        <div className="group">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
          <div className="relative mt-1.5">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              placeholder="आपका पूरा नाम"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>
        
        <div className="group">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Work Category</label>
          <div className="relative mt-1.5">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-10 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all appearance-none"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="group">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">WhatsApp Phone</label>
          <div className="relative mt-1.5">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              placeholder="WhatsApp नंबर"
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>
      </div>
      <button 
        onClick={nextStep}
        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        Continue to Documents
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
          <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-blue-900">Security Verification</h4>
            <p className="text-xs text-blue-700/70">Please upload valid IDs to join SevaKart Ghazipur verified list.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Aadhaar Card</label>
            <div 
              className={`relative border-2 border-dashed rounded-2xl h-32 flex flex-col items-center justify-center cursor-pointer transition-all ${formData.aadhaar ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-slate-50 hover:border-blue-300'}`}
              onClick={() => document.getElementById('aadhaar-upload')?.click()}
            >
              {formData.aadhaar ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-slate-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500">Front Side</span>
                </>
              )}
              <input 
                id="aadhaar-upload" type="file" className="hidden" accept="image/*"
                onChange={e => handleFileUpload(e, 'aadhaar')}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">PAN Card</label>
            <div 
              className={`relative border-2 border-dashed rounded-2xl h-32 flex flex-col items-center justify-center cursor-pointer transition-all ${formData.pan ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-slate-50 hover:border-blue-300'}`}
              onClick={() => document.getElementById('pan-upload')?.click()}
            >
              {formData.pan ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <>
                  <FileText className="w-8 h-8 text-slate-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500">Scan Copy</span>
                </>
              )}
              <input 
                id="pan-upload" type="file" className="hidden" accept="image/*"
                onChange={e => handleFileUpload(e, 'pan')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={prevStep} className="flex-1 py-4 text-sm font-bold text-slate-500 bg-slate-100 rounded-2xl">Back</button>
        <button 
          onClick={nextStep}
          className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
        >
          Verify with Live Photo
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-800">Live Face Verification</h3>
        <p className="text-sm text-slate-500">Please stay in a well-lit area and capture your face clearly.</p>
      </div>
      
      <CameraCapture onCapture={img => setFormData({ ...formData, livePhoto: img })} />

      <div className="flex gap-3">
        <button onClick={prevStep} className="flex-1 py-4 text-sm font-bold text-slate-500 bg-slate-100 rounded-2xl">Back</button>
        <button 
          disabled={!formData.livePhoto}
          onClick={nextStep}
          className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black uppercase tracking-tighter text-blue-400">Registration Fee</p>
            <h3 className="text-3xl font-black mt-1">₹499</h3>
            <p className="text-xs text-slate-400 mt-2">One-time verification and <br/>platform setup fee.</p>
          </div>
          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md">
            <CreditCard className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-bold text-slate-400 uppercase text-center">Select Payment Method</p>
        <div className="space-y-3">
          {['PhonePe / Google Pay (UPI)', 'Credit or Debit Card', 'Net Banking'].map((m, i) => (
            <button key={m} className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${i === 0 ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100' : 'border-slate-100 bg-slate-50'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                <span className="text-sm font-semibold text-slate-700">{m}</span>
              </div>
              {i === 0 && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={onComplete}
        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        Pay & Complete Registration
      </button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
      <div className="bg-slate-50 p-6 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h2 className="font-black text-slate-800">Professional Signup</h2>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className={`h-1 w-6 rounded-full ${s <= step ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
              ))}
            </div>
          </div>
        </div>
        <button onClick={onCancel} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-8">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>

      <div className="p-6 bg-slate-50/50 flex items-center justify-center gap-2 border-t border-slate-100">
        <ShieldCheck className="w-4 h-4 text-green-600" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ghazipur Verified Partner Program</span>
      </div>
    </div>
  );
};

export default ProfessionalSignup;
