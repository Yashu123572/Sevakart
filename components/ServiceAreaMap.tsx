
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Search, MapPin, Navigation, Info, ChevronRight, X, Globe, Star } from 'lucide-react';

// Fix for default marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const areaIcon = L.divIcon({
  html: `<div class="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2">
          <div class="w-2 h-2 bg-white rounded-full"></div>
         </div>`,
  className: '',
  iconSize: [32, 32],
});

const GHAZIPUR_CENTER: [number, number] = [25.5840, 83.5770];

const SERVICE_AREAS = [
  { id: '1', name: 'Zamania', coords: [25.4300, 83.5600] as [number, number], villages: ['Zamania Station', 'Deoria', 'Bara', 'Burhadih'] },
  { id: '2', name: 'Saidpur', coords: [25.5400, 83.1900] as [number, number], villages: ['Saidpur City', 'Aunrihar', 'Dhuriyapar'] },
  { id: '3', name: 'Mohammadabad', coords: [25.6100, 83.7500] as [number, number], villages: ['Yusufpur', 'Kundesar', 'Gondaur'] },
  { id: '4', name: 'Ghazipur City', coords: [25.5840, 83.5770] as [number, number], villages: ['Rauza', 'Laldarwaza', 'Mishrabazar', 'Gora Bazar'] },
];

const ServiceAreaMap: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<typeof SERVICE_AREAS[0] | null>(null);
  const [showVillageList, setShowVillageList] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-200">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-lg">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-1 flex items-center gap-2">
          <div className="pl-4">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search any village in Ghazipur..."
            className="flex-grow py-3 text-sm focus:outline-none placeholder:text-slate-400"
          />
          <button className="bg-blue-600 text-white p-2.5 rounded-xl">
            <Navigation className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <MapContainer center={GHAZIPUR_CENTER} zoom={11} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {SERVICE_AREAS.map((area) => (
          <Marker 
            key={area.id} 
            position={area.coords} 
            icon={areaIcon}
            eventHandlers={{
              click: () => setSelectedArea(area),
            }}
          >
            <Popup>
              <div className="p-1">
                <h4 className="font-bold text-blue-600">{area.name}</h4>
                <p className="text-[10px]">Serving {area.villages.length}+ major areas</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Village Availability List */}
      <button 
        onClick={() => setShowVillageList(true)}
        className="absolute bottom-32 left-4 z-[1000] bg-white px-4 py-2.5 rounded-full shadow-xl border border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-600"
      >
        <Globe className="w-4 h-4" />
        See All Covered Villages
      </button>

      {showVillageList && (
        <div className="absolute inset-0 z-[1100] bg-white/95 backdrop-blur-md p-6 overflow-y-auto animate-in fade-in slide-in-from-bottom-8">
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-800">SevaKart Coverage</h2>
                <p className="text-sm text-slate-500">We reach every corner of Ghazipur District</p>
              </div>
              <button onClick={() => setShowVillageList(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-8">
              {SERVICE_AREAS.map(area => (
                <div key={area.id} className="space-y-3">
                  <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                    {area.name} Tehsil
                    <span className="flex-grow h-px bg-blue-100"></span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {area.villages.map(v => (
                      <div key={v} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-semibold text-slate-700">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 bg-blue-600 rounded-3xl text-white text-center">
              <h4 className="font-bold mb-1">Village Not Listed?</h4>
              <p className="text-xs text-blue-100 mb-4">Don't worry, we serve all areas within 50km of Ghazipur city.</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-full text-xs font-black">Call Support</button>
            </div>
          </div>
        </div>
      )}

      {selectedArea && !showVillageList && (
        <div className="absolute bottom-32 right-4 w-72 z-[1000] animate-in slide-in-from-right-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
              <span className="font-bold">{selectedArea.name}</span>
              <button onClick={() => setSelectedArea(null)}><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4">
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Popular Villages</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedArea.villages.map(v => (
                  <span key={v} className="text-[9px] bg-slate-100 px-2 py-1 rounded-md text-slate-600">{v}</span>
                ))}
              </div>
              <button className="w-full bg-slate-900 text-white mt-4 py-2.5 rounded-xl text-[10px] font-bold">Book Here</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceAreaMap;
