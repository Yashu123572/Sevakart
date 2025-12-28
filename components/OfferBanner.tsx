
import React from 'react';
import { Offer } from '../types';

const OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Professional Deep Cleaning',
    discount: 'Upto 40% OFF',
    imageUrl: 'https://picsum.photos/seed/clean/600/300',
    code: 'CLEAN40'
  },
  {
    id: '2',
    title: 'AC Servicing Special',
    discount: 'Flat ₹200 OFF',
    imageUrl: 'https://picsum.photos/seed/ac/600/300',
    code: 'COOL200'
  },
  {
    id: '3',
    title: 'First Plumber Booking',
    discount: '10% Cashback',
    imageUrl: 'https://picsum.photos/seed/plumber/600/300',
    code: 'SAVE10'
  }
];

const OfferBanner: React.FC = () => {
  return (
    <div className="relative">
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-2">
        {OFFERS.map((offer) => (
          <div 
            key={offer.id}
            className="flex-shrink-0 w-[85%] sm:w-[450px] snap-center relative rounded-2xl overflow-hidden shadow-md group cursor-pointer"
          >
            <img 
              src={offer.imageUrl} 
              alt={offer.title}
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
              <p className="text-yellow-400 font-bold text-xs uppercase tracking-widest">{offer.discount}</p>
              <h3 className="text-white font-bold text-lg leading-tight">{offer.title}</h3>
              <div className="mt-2 inline-flex items-center">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded border border-white/30 font-mono">
                  CODE: {offer.code}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferBanner;
