
import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import OfferBanner from './components/OfferBanner';
import ServiceGrid, { SERVICES } from './components/ServiceGrid';
import ImageEditor from './components/ImageEditor';
import ServiceAreaMap from './components/ServiceAreaMap';
import BookingForm from './components/BookingForm';
import ProfessionalSignup from './components/ProfessionalSignup';
import CheckoutPage from './components/CheckoutPage';
import { searchGhazipurServices } from './services/geminiService';
import { Service, BookingDetails } from './types';
import { Search, Loader2, Sparkles, X, Globe, Calendar, Clock, MapPin, CheckCircle, Home, Map as MapIcon, UserCircle, Briefcase, ChevronRight, Info, TrendingUp, IndianRupee, Heart, User } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'map' | 'pro-signup' | 'pro-success' | 'checkout'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<{ text: string, sources: any[] } | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [tempBookingDetails, setTempBookingDetails] = useState<BookingDetails | null>(null);
  const [showPartnerEarnings, setShowPartnerEarnings] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setIsSearching(true);
    setShowAIModal(true);
    try {
      const result = await searchGhazipurServices(query);
      setSearchResult(result);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleBookingFormConfirm = (details: BookingDetails) => {
    setTempBookingDetails(details);
    setCurrentView('checkout');
  };

  const handleFinalOrderPlaced = () => {
    setSelectedService(null);
    setTempBookingDetails(null);
    setCurrentView('pro-success');
    setTimeout(() => setCurrentView('home'), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <Header 
        onJoinAsPro={() => setCurrentView('pro-signup')} 
        onHomeClick={() => setCurrentView('home')} 
      />
      
      {currentView === 'home' && (
        <main className="max-w-4xl mx-auto px-4 mt-6 space-y-8 pb-32">
          {/* Search Section */}
          <section className="animate-in fade-in slide-in-from-top-4 duration-500">
            <SearchBar onSearch={handleSearch} />
          </section>

          {/* Special Offers Banner */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                Exclusive Offers
              </h2>
            </div>
            <OfferBanner />
          </section>

          {/* Pricing & Earnings Table */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">Pricing & Earnings</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ghazipur Partner Program</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPartnerEarnings(!showPartnerEarnings)}
                className="text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
              >
                {showPartnerEarnings ? 'Hide Details' : 'View Breakdown'}
              </button>
            </div>

            <div className="overflow-hidden transition-all">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Service</th>
                    <th className="py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Price</th>
                    {showPartnerEarnings && (
                      <>
                        <th className="py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner Gets</th>
                        <th className="py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Commission</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {SERVICES.slice(0, 5).map((s) => (
                    <tr key={s.id} className="group">
                      <td className="py-4 text-xs font-bold text-slate-700">{s.name}</td>
                      <td className="py-4 text-sm font-black text-blue-600">₹{s.price}</td>
                      {showPartnerEarnings && (
                        <>
                          <td className="py-4 text-sm font-black text-green-600">₹{s.mechanicGets}</td>
                          <td className="py-4 text-sm font-black text-slate-400 text-right">₹{s.profit}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {!showPartnerEarnings && (
              <p className="mt-4 text-center text-[10px] text-slate-400 font-medium">
                Transparent pricing for all users in Ghazipur District.
              </p>
            )}
          </section>

          {/* Home Services Grid */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                Ghazipur Home Services
              </h2>
            </div>
            <ServiceGrid onServiceSelect={handleServiceClick} />
          </section>

          {/* AI Decor Section */}
          <section className="bg-slate-900 rounded-3xl p-6 text-white shadow-2xl overflow-hidden relative group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold tracking-tight">AI Decor Visualizer</h3>
              </div>
              <ImageEditor />
            </div>
          </section>

          {/* Founder Section */}
          <section className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-100 border-4 border-white">
              <User className="w-10 h-10 text-white" />
            </div>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">Message from Founder</p>
            <h3 className="text-2xl font-black text-slate-800 mb-3">Ashu</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto italic">
              "SevaKart is built with a vision to empower Ghazipur. We bring reliable, high-quality home services to your doorstep while ensuring fair earnings for our local professionals."
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400">
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              Made with Love for Ghazipur
            </div>
          </section>

          <footer className="text-center py-6">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2025 SevaKart • Founded by Ashu</p>
          </footer>
        </main>
      )}

      {currentView === 'map' && (
        <main className="h-[calc(100vh-64px)] w-full">
          <ServiceAreaMap />
        </main>
      )}

      {currentView === 'checkout' && selectedService && tempBookingDetails && (
        <main className="max-w-4xl mx-auto px-4 mt-8 pb-32">
          <CheckoutPage 
            service={selectedService} 
            details={tempBookingDetails} 
            onConfirm={handleFinalOrderPlaced}
            onBack={() => setCurrentView('home')}
          />
        </main>
      )}

      {currentView === 'pro-signup' && (
        <main className="max-w-4xl mx-auto px-4 mt-8 pb-32">
          <ProfessionalSignup 
            onComplete={() => setCurrentView('pro-success')} 
            onCancel={() => setCurrentView('home')} 
          />
        </main>
      )}

      {currentView === 'pro-success' && (
        <main className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-8 text-center">
           <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
              <CheckCircle className="w-16 h-16 text-green-600" />
           </div>
           <h2 className="text-3xl font-black text-slate-800 mb-2">Success!</h2>
           <p className="text-slate-500 max-w-sm">
             Your request has been processed. Our verified professional will reach your location in Ghazipur shortly.
           </p>
           <button 
             onClick={() => setCurrentView('home')}
             className="mt-8 text-blue-600 font-bold bg-blue-50 px-8 py-3 rounded-full hover:bg-blue-100 transition-all"
           >
             Continue Shopping
           </button>
        </main>
      )}

      {selectedService && currentView !== 'checkout' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-12 duration-300">
            <div className="relative h-28 bg-blue-600 p-6 flex items-center">
               <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 bg-black/10 text-white hover:bg-black/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-xl">
                  <selectedService.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Book Appointment</p>
                  <h3 className="text-xl font-bold text-white leading-none">{selectedService.name}</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <BookingForm 
                serviceName={selectedService.name} 
                onConfirm={handleBookingFormConfirm} 
                onCancel={() => setSelectedService(null)} 
              />
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-slate-100 flex items-center gap-2 p-2 rounded-2xl z-40 shadow-2xl">
        <button 
          onClick={() => setCurrentView('home')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${currentView === 'home' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:text-blue-600'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs font-bold">Services</span>
        </button>
        <button 
          onClick={() => setCurrentView('map')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${currentView === 'map' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:text-blue-600'}`}
        >
          <MapIcon className="w-5 h-5" />
          <span className="text-xs font-bold">Area Map</span>
        </button>
        <div className="w-px h-6 bg-slate-100 mx-1"></div>
        <button 
          onClick={() => setCurrentView('pro-signup')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${currentView === 'pro-signup' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:text-blue-600'}`}
        >
          <UserCircle className="w-5 h-5" />
          <span className="text-xs font-bold">Join </span>
        </button>
      </nav>
    </div>
  );
};

export default App;
