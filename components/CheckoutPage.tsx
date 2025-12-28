
import React from 'react';
import { Service, BookingDetails } from '../types';
import { MapPin, ShieldCheck, ChevronRight, CreditCard, Wallet, Truck, CheckCircle2 } from 'lucide-react';

interface CheckoutPageProps {
  service: Service;
  details: BookingDetails;
  onConfirm: () => void;
  onBack: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ service, details, onConfirm, onBack }) => {
  const visitingCharge = 99;
  const discount = service.price > 500 ? 50 : 0;
  const total = service.price + visitingCharge - discount;

  return (
    <div className="max-w-md mx-auto space-y-4 animate-in fade-in slide-in-from-right-4">
      {/* Delivery Address Section */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            Service Location
          </h3>
          <button onClick={onBack} className="text-blue-600 text-[10px] font-bold uppercase tracking-wider">Change</button>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-700">{details.fullName}</p>
          <p className="text-xs text-slate-500 leading-relaxed">{details.address}</p>
          <p className="text-xs font-medium text-slate-600 mt-2">WhatsApp: {details.whatsappNumber}</p>
        </div>
      </div>

      {/* Service Details Section */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex gap-4">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 ${service.color}`}>
            <service.icon className="w-8 h-8" />
          </div>
          <div className="flex-grow">
            <h4 className="text-sm font-bold text-slate-800">{service.name}</h4>
            <p className="text-[10px] text-slate-500 mt-1">{service.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-600">
                <Truck className="w-3 h-3" />
                Slot: {details.timeSlot.split('(')[0]}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Details - Flipkart Style */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Price Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Service Price</span>
            <span className="text-slate-800 font-medium">₹{service.price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Visiting Charges</span>
            <span className="text-slate-800 font-medium">₹{visitingCharge}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Platform Discount</span>
              <span className="text-green-600 font-bold">- ₹{discount}</span>
            </div>
          )}
          <div className="pt-3 border-t border-dashed border-slate-200 flex justify-between">
            <span className="font-bold text-slate-800">Total Amount</span>
            <span className="font-black text-blue-600 text-lg">₹{total}</span>
          </div>
        </div>
        <div className="mt-4 p-2 bg-green-50 rounded-xl border border-green-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <p className="text-[10px] text-green-700 font-bold">Safe & Secure Payment</p>
        </div>
      </div>

      {/* Payment Selection */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Select Payment</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 border-2 border-blue-500 bg-blue-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-bold text-slate-700">Cash After Service</span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-center justify-between p-3 border border-slate-100 bg-slate-50 rounded-xl opacity-60">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-slate-400" />
              <span className="text-xs font-bold text-slate-500">Online Payment (UPI/Card)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Final Button */}
      <div className="pt-2">
        <button 
          onClick={onConfirm}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Place Order
          <ChevronRight className="w-5 h-5" />
        </button>
        <p className="text-[9px] text-center text-slate-400 mt-4">
          By placing order, you agree to SevaKart's Terms and Conditions
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;
