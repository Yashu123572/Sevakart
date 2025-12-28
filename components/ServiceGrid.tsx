
import React from 'react';
import { Zap, Droplets, Wind, Eraser, Hammer, Paintbrush, ShieldCheck, MapPin } from 'lucide-react';
import { Service } from '../types';

interface ServiceGridProps {
  onServiceSelect?: (service: Service) => void;
}

export const SERVICES: Service[] = [
  { id: '1', name: 'Electrician (Minor)', icon: Zap, price: 199, mechanicGets: 159, profit: 40, description: 'Minor electrical repairs and installations.', color: 'bg-yellow-50 text-yellow-600', border: 'border-yellow-100', iconColor: 'text-yellow-600' },
  { id: '2', name: 'Plumbing (Tap Fix)', icon: Droplets, price: 249, mechanicGets: 199, profit: 50, description: 'Leaking taps, pipe repairs and basic plumbing.', color: 'bg-blue-50 text-blue-600', border: 'border-blue-100', iconColor: 'text-blue-600' },
  { id: '3', name: 'AC Service', icon: Wind, price: 599, mechanicGets: 479, profit: 120, description: 'Complete AC cleaning and performance check.', color: 'bg-cyan-50 text-cyan-600', border: 'border-cyan-100', iconColor: 'text-cyan-600' },
  { id: '4', name: 'Full House Cleaning', icon: Eraser, price: 1499, mechanicGets: 1199, profit: 300, description: 'Deep cleaning of all rooms and surfaces.', color: 'bg-green-50 text-green-600', border: 'border-green-100', iconColor: 'text-green-600' },
  { id: '5', name: 'Carpenter', icon: Hammer, price: 299, mechanicGets: 239, profit: 60, description: 'Furniture repair and woodwork.', color: 'bg-amber-50 text-amber-600', border: 'border-amber-100', iconColor: 'text-amber-600' },
  { id: '6', name: 'Painting', icon: Paintbrush, price: 999, mechanicGets: 799, profit: 200, description: 'Wall painting and touch-ups.', color: 'bg-purple-50 text-purple-600', border: 'border-purple-100', iconColor: 'text-purple-600' },
  { id: '10', name: 'Security Check', icon: ShieldCheck, price: 499, mechanicGets: 399, profit: 100, description: 'CCTV and lock system verification.', color: 'bg-red-50 text-red-600', border: 'border-red-100', iconColor: 'text-red-600' },
  { id: '13', name: 'Visiting Charge', icon: MapPin, price: 99, mechanicGets: 79, profit: 20, description: 'Professional inspection visit.', color: 'bg-slate-50 text-slate-600', border: 'border-slate-100', iconColor: 'text-slate-600' },
];

const ServiceGrid: React.FC<ServiceGridProps> = ({ onServiceSelect }) => {
  return (
    <div className="grid grid-cols-4 gap-x-2 gap-y-6 sm:gap-6">
      {SERVICES.map((service) => (
        <button 
          key={service.id} 
          onClick={() => onServiceSelect?.(service)}
          className="flex flex-col items-center group outline-none"
        >
          <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-[1.25rem] flex items-center justify-center border-2 ${service.border} ${service.color} transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-100 group-hover:-translate-y-1.5 group-active:scale-90 group-focus:ring-2 group-focus:ring-blue-400 group-focus:ring-offset-2`}>
            <service.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${service.iconColor}`} />
          </div>
          <span className="mt-2.5 text-[10px] sm:text-[11px] font-bold text-gray-700 text-center line-clamp-1 px-1">
            {service.name}
          </span>
          <span className="text-[9px] font-black text-blue-600 mt-0.5">₹{service.price}</span>
        </button>
      ))}
    </div>
  );
};

export default ServiceGrid;
