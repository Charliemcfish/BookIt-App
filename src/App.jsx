import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plane, Search, MapPin, Star, ChevronLeft, Wifi, Coffee, Tv, Wind, 
  CreditCard, CheckCircle, User, Bell, Heart, Calendar as CalendarIcon, 
  Filter, X, ArrowRight, Briefcase, Home, Map as MapIcon, List, Minus, 
  Plus, Settings, LogOut, ChevronRight, Clock, Shield, Smartphone, Moon, 
  Sun, Globe, Wallet, Car, Camera, Zap, Tag, Info, MoreVertical, 
  Navigation, Sparkles, Palmtree, Mountain, Building, Sunset, Utensils
} from 'lucide-react';

/* --- STYLES --- */
const GlobalStyles = () => (
  <style>{`
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #18181b; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 4px; }
    
    @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    
    @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .animate-slide-down { animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
    
    @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .animate-pulse-slow { animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    
    @keyframes super-pulse { 
      0%, 100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 2px rgba(16, 185, 129, 0.5)); } 
      50% { opacity: 0.8; transform: scale(1.2); filter: drop-shadow(0 0 8px rgba(16, 185, 129, 1)); } 
    }
    .animate-super-pulse { animation: super-pulse 2s infinite ease-in-out; }
    
    @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

    @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
    .animate-pop { animation: pop 0.2s ease-out; }

    @keyframes flyOff {
      0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
      20% { transform: translate(-10px, 10px) scale(0.9) rotate(-5deg); opacity: 1; }
      100% { transform: translate(200px, -200px) scale(0.5) rotate(45deg); opacity: 0; }
    }
    .animate-fly-off { animation: flyOff 1.2s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards; }

    @keyframes radarSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .animate-radar-spin { animation: radarSpin 2s linear infinite; }

    .glass-panel {
      background: rgba(24, 24, 27, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
  `}</style>
);

/* --- MOCK DATA --- */
const AIRLINES = [
  { name: 'Delta', color: 'bg-[#E3132C]', text: 'text-white', code: 'DL', logo: 'D' },
  { name: 'Emirates', color: 'bg-[#D71921]', text: 'text-white', code: 'EK', logo: 'E' },
  { name: 'British Airways', color: 'bg-[#075AAA]', text: 'text-white', code: 'BA', logo: 'B' },
  { name: 'Lufthansa', color: 'bg-[#FFAE00]', text: 'text-zinc-900', code: 'LH', logo: 'L' },
  { name: 'JAL', color: 'bg-[#CC0000]', text: 'text-white', code: 'JL', logo: 'J' }
];

const CARS = [
    { id: 'c1', name: 'Tesla Model 3', type: 'Electric', price: 85, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop', seats: 5, bags: 3, rating: 4.9 },
    { id: 'c2', name: 'Range Rover Sport', type: 'Luxury SUV', price: 150, image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2069&auto=format&fit=crop', seats: 5, bags: 4, rating: 4.8 },
    { id: 'c3', name: 'Ford Mustang', type: 'Convertible', price: 110, image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=2070&auto=format&fit=crop', seats: 4, bags: 2, rating: 4.7 }
];

const EXPERIENCES = [
    { id: 'e1', name: 'Scuba Diving', location: 'Bali, Indonesia', price: 120, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop', duration: '4 Hours', rating: 4.9 },
    { id: 'e2', name: 'Louvre Private Tour', location: 'Paris, France', price: 85, image: 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?q=80&w=2071&auto=format&fit=crop', duration: '3 Hours', rating: 4.8 },
    { id: 'e3', name: 'Helicopter Ride', location: 'New York, USA', price: 250, image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?q=80&w=2070&auto=format&fit=crop', duration: '45 Mins', rating: 5.0 }
];

const CITIES = [
  { 
    id: 'paris', name: 'Paris', country: 'France', 
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
    hotels: [
      { id: 'p1', name: 'The Ritz Paris', rating: 4.9, reviews: 1204, price: 850, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', desc: 'World-renowned luxury overlooking the Place Vendôme.', amenities: ['wifi', 'coffee', 'tv'], coords: { top: '30%', left: '40%' } },
      { id: 'p2', name: 'Le Meurice', rating: 4.8, reviews: 850, price: 620, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop', desc: 'A historic palace hotel located in the center of Paris.', amenities: ['wifi', 'wind'], coords: { top: '50%', left: '60%' } },
    ],
    flights: [
      { id: 'f1', airline: 'Delta', time: '08:00 - 11:30', duration: '3h 30m', price: 620, stops: 'Direct', code: 'CDG' },
      { id: 'f2', airline: 'British Airways', time: '13:00 - 17:00', duration: '4h 00m', price: 540, stops: '1 Stop', code: 'ORY' }
    ]
  },
  { 
    id: 'bali', name: 'Bali', country: 'Indonesia', 
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop',
    hotels: [
      { id: 'b1', name: 'Ayana Resort', rating: 4.9, reviews: 3100, price: 280, image: 'https://images.unsplash.com/photo-1571896349842-68cfd420d098?q=80&w=2070&auto=format&fit=crop', desc: 'Cliff-top luxury resort with world-famous Rock Bar.', amenities: ['wifi', 'coffee', 'wind', 'tv'], coords: { top: '40%', left: '30%' } }
    ],
    flights: [ { id: 'f4', airline: 'Emirates', time: '06:00 - 22:00', duration: '16h 00m', price: 950, stops: '1 Stop (DXB)', code: 'DPS' } ]
  },
  { 
    id: 'nyc', name: 'New York', country: 'USA', 
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop',
    hotels: [
      { id: 'n1', name: 'The Plaza', rating: 4.7, reviews: 5000, price: 950, image: 'https://images.unsplash.com/photo-1522771753037-6333616235df?q=80&w=2070&auto=format&fit=crop', desc: 'The most famous hotel in New York.', amenities: ['wifi', 'coffee', 'tv', 'wind'], coords: { top: '45%', left: '50%' } }
    ],
    flights: [ { id: 'f6', airline: 'Delta', time: '07:00 - 09:30', duration: '2h 30m', price: 220, stops: 'Direct', code: 'JFK' } ]
  },
  {
    id: 'tokyo', name: 'Tokyo', country: 'Japan',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2070&auto=format&fit=crop',
    hotels: [ { id: 't1', name: 'Aman Tokyo', rating: 5.0, reviews: 800, price: 1200, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop', desc: 'Sanctuary at the top of the Otemachi Tower.', amenities: ['wifi', 'coffee', 'tv', 'wind'], coords: { top: '20%', left: '50%' } } ],
    flights: [ { id: 'f8', airline: 'Lufthansa', time: '11:00 - 15:00(+1)', duration: '12h 00m', price: 1100, stops: 'Direct', code: 'HND' } ]
  }
];

const PRE_BOOKED_TRIPS = [
  { 
    id: 't3', 
    city: 'Tokyo', 
    country: 'Japan', 
    date: 'Nov 10 - Nov 14', 
    status: 'Upcoming', 
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1994&auto=format&fit=crop', 
    hotel: 'Aman Tokyo', 
    rating: 5.0,
    bookingRef: 'BK-9928',
    flight: { out: 'JAL 006', time: '11:00 AM', seat: '4A' },
    car: 'Tesla Model 3'
  },
  { id: 't1', city: 'London', country: 'UK', date: 'Sep 12 - Sep 15', status: 'Completed', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop', hotel: 'The Savoy' },
  { id: 't2', city: 'Dubai', country: 'UAE', date: 'Aug 04 - Aug 10', status: 'Completed', image: 'https://images.unsplash.com/photo-1512453979798-5ea936a7fe63?q=80&w=2070&auto=format&fit=crop', hotel: 'Burj Al Arab' }
];

const NOTIFICATIONS = [
  { id: 1, title: 'Price Drop Alert', desc: 'Flights to Tokyo are 20% off today.', time: '2m ago', type: 'offer' },
  { id: 2, title: 'Check-in Reminder', desc: 'Your stay at The Ritz Paris is coming up.', time: '1h ago', type: 'reminder' },
  { id: 3, title: 'Welcome Gift', desc: 'You have earned Gold Status!', time: '1d ago', type: 'reward' }
];

const AI_VIBES = [
  { id: 'relax', label: 'Relaxing', icon: Palmtree, color: 'bg-teal-500' },
  { id: 'adventure', label: 'Adventurous', icon: Mountain, color: 'bg-orange-500' },
  { id: 'romance', label: 'Couples', icon: Heart, color: 'bg-pink-500' },
  { id: 'city', label: 'City Break', icon: Building, color: 'bg-blue-500' },
  { id: 'luxury', label: 'Luxury', icon: Star, color: 'bg-yellow-500' },
  { id: 'beach', label: 'Beach', icon: Sunset, color: 'bg-cyan-500' }
];

const AI_PACKAGES = {
  relax: [
    {
      id: 'ai1',
      name: 'Amalfi Coast Retreat',
      dest: 'Positano, Italy',
      price: 3200,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2069&auto=format&fit=crop',
      flight: { code: 'AZ 609', time: '09:30 AM', origin: 'JFK', dest: 'NAP' },
      hotel: { name: 'Le Sirenuse', room: 'Sea View Suite', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop' },
      activity: { name: 'Private Boat Tour', desc: 'Sunset Cruise • Day 2' }
    },
    {
      id: 'ai2',
      name: 'Bali Wellness',
      dest: 'Ubud, Indonesia',
      price: 2100,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop',
      flight: { code: 'GA 880', time: '11:00 AM', origin: 'JFK', dest: 'DPS' },
      hotel: { name: 'Como Shambhala', room: 'Retreat Villa', image: 'https://images.unsplash.com/photo-1571896349842-68cfd420d098?q=80&w=2070&auto=format&fit=crop' },
      activity: { name: 'Yoga Session', desc: 'Private Class • Day 1' }
    }
  ],
  adventure: [
    {
      id: 'ai3',
      name: 'Swiss Alps Expedition',
      dest: 'Zermatt, Switzerland',
      price: 2800,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=2065&auto=format&fit=crop',
      flight: { code: 'LX 015', time: '06:45 PM', origin: 'JFK', dest: 'ZRH' },
      hotel: { name: 'The Omnia', room: 'Mountain Lodge', image: 'https://images.unsplash.com/photo-1585544314038-a0d07e69bf0e?q=80&w=2070&auto=format&fit=crop' },
      activity: { name: 'Matterhorn Hike', desc: 'Guided Trek • Day 3' }
    },
    {
      id: 'ai4',
      name: 'Patagonia Trek',
      dest: 'El Chaltén, Argentina',
      price: 3100,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1534234828569-1f272b17d05e?q=80&w=2070&auto=format&fit=crop',
      flight: { code: 'AR 130', time: '08:00 PM', origin: 'JFK', dest: 'FTE' },
      hotel: { name: 'Don Los Cerros', room: 'Suite', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop' },
      activity: { name: 'Glacier Walk', desc: 'Full Day • Day 2' }
    }
  ],
  romance: [
    {
      id: 'ai5',
      name: 'Kyoto Sanctuary',
      dest: 'Kyoto, Japan',
      price: 3450,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
      flight: { code: 'JL 005', time: '11:00 AM', origin: 'JFK', dest: 'KIX' },
      hotel: { name: 'Aman Kyoto', room: 'Garden Pavilion', image: 'https://images.unsplash.com/photo-1601999207869-930d7b270729?q=80&w=2070&auto=format&fit=crop' },
      activity: { name: 'Tea Ceremony', desc: 'Private Session • Day 2' }
    },
    {
      id: 'ai6',
      name: 'Parisian Escape',
      dest: 'Paris, France',
      price: 2900,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
      flight: { code: 'AF 023', time: '05:30 PM', origin: 'JFK', dest: 'CDG' },
      hotel: { name: 'Le Meurice', room: 'Park View', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop' },
      activity: { name: 'Seine Dinner', desc: 'Cruise • Day 1' }
    }
  ],
  // Fallback
  default: [
    {
      id: 'ai7',
      name: 'Maldives Paradise',
      dest: 'Male, Maldives',
      price: 4500,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop',
      flight: { code: 'EK 650', time: '02:00 AM', origin: 'JFK', dest: 'MLE' },
      hotel: { name: 'Soneva Jani', room: 'Water Villa', image: 'https://images.unsplash.com/photo-1571896349842-68cfd420d098?q=80&w=2070&auto=format&fit=crop' },
      activity: { name: 'Dolphin Cruise', desc: 'Sunset • Day 2' }
    }
  ]
};

/* --- SHARED COMPONENTS --- */
const Logo = ({ size = 'normal', animate = false }) => (
  <div className="flex items-center gap-2 select-none">
    <div className={animate ? 'animate-fly-off' : ''}>
       <Plane className={`text-white fill-white ${size === 'large' ? 'w-12 h-12' : 'w-6 h-6'}`} />
    </div>
    <h1 className={`${size === 'large' ? 'text-4xl' : 'text-xl'} font-bold tracking-tight`}>
      <span className="text-emerald-500">Book</span><span className="text-white">It</span>
    </h1>
  </div>
);

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, icon: Icon }) => {
  const base = "w-full py-4 rounded-2xl font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-emerald-500 text-white shadow-lg shadow-emerald-900/50 hover:bg-emerald-400",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    outline: "border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    gradient: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
  };
  return (
    <button disabled={disabled} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

const Skeleton = ({ className }) => <div className={`bg-zinc-800/50 animate-pulse-slow rounded-xl ${className}`} />;

/* --- SCREEN COMPONENTS --- */

const SplashScreen = ({ isTakingOff }) => (
  <div className="h-full flex flex-col items-center justify-center bg-zinc-950 z-50 animate-fade-in relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-zinc-950 to-zinc-950"></div>
    <div className="scale-150">
      <Logo size="large" animate={isTakingOff} />
    </div>
  </div>
);

const LoginScreen = ({ onLogin }) => (
  <div className="flex flex-col h-full justify-center px-8 relative animate-fade-in bg-zinc-950">
    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-emerald-900/20 to-transparent pointer-events-none" />
    <div className="mb-12 relative z-10">
      <Logo size="large" />
      <h2 className="text-white text-3xl font-light mt-8">Explore the world <br/>with confidence.</h2>
    </div>
    <div className="space-y-4 relative z-10">
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 flex flex-col focus-within:border-emerald-500 transition-colors">
         <label className="text-xs text-zinc-400 uppercase font-bold mb-1">Email</label>
         <input type="email" defaultValue="demo@bookit.com" className="bg-transparent text-white focus:outline-none" />
      </div>
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 flex flex-col focus-within:border-emerald-500 transition-colors">
         <label className="text-xs text-zinc-400 uppercase font-bold mb-1">Password</label>
         <input type="password" defaultValue="password123" className="bg-transparent text-white focus:outline-none" />
      </div>
      
      <div className="flex justify-between items-center text-sm pt-2">
        <label className="flex items-center gap-2 text-zinc-400 cursor-pointer group">
          <div className="w-5 h-5 rounded border border-zinc-600 bg-zinc-800 flex items-center justify-center text-emerald-500 group-hover:border-emerald-500 transition-colors">
             <CheckCircle className="w-3.5 h-3.5" />
          </div>
          Remember me
        </label>
        <button className="text-emerald-500 font-medium">Forgot Password?</button>
      </div>

      <Button onClick={onLogin} className="mt-4">Log In</Button>
      <Button variant="outline">Create Account</Button>
    </div>
  </div>
);

const AIPlannerScreen = ({ step, setStep, prefs, setPrefs, scanProgress, results, selectedResult, setSelectedResult, formatDate }) => {
  // Step 1: Dates
  if (step === 1) {
    return (
      <div className="h-full flex flex-col pt-14 px-6 bg-zinc-950 animate-slide-up">
         <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setStep(0)} className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-white"><ChevronLeft className="w-5 h-5" /></button>
            <h2 className="text-white font-bold text-lg">When are you going?</h2>
         </div>
         
         <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-8 flex-1">
            <h3 className="text-white font-bold mb-4 text-center text-lg">November 2026</h3>
            <div className="grid grid-cols-7 gap-2">
               {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-zinc-500 text-center text-xs mb-2">{d}</span>)}
               {[...Array(30)].map((_, i) => (
                  <button key={i} onClick={() => {
                     const d = new Date(2026, 10, i+1);
                     const { start, end } = prefs.dates;
                     if(!start || (start && end)) setPrefs(p => ({...p, dates: {start: d, end: null}}));
                     else setPrefs(p => ({...p, dates: d > start ? {start, end: d} : {start: d, end: null}}));
                  }} className={`h-10 w-10 rounded-full text-sm font-medium flex items-center justify-center transition-all ${
                     (prefs.dates.start?.getDate() === i+1 || prefs.dates.end?.getDate() === i+1) ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 
                     (prefs.dates.start && prefs.dates.end && i+1 > prefs.dates.start.getDate() && i+1 < prefs.dates.end.getDate()) ? 'bg-emerald-500/20 text-emerald-500' : 'text-zinc-400 hover:bg-zinc-800'
                  }`}>
                     {i+1}
                  </button>
               ))}
            </div>
         </div>
         
         <div className="pb-8">
           <div className="flex justify-between items-center mb-6 px-2">
             <div>
               <span className="text-zinc-500 text-xs uppercase block">Leave</span>
               <span className="text-white font-bold">{prefs.dates.start ? formatDate(prefs.dates.start) : '-'}</span>
             </div>
             <ArrowRight className="text-zinc-600 w-5 h-5" />
             <div className="text-right">
               <span className="text-zinc-500 text-xs uppercase block">Return</span>
               <span className="text-white font-bold">{prefs.dates.end ? formatDate(prefs.dates.end) : '-'}</span>
             </div>
           </div>
           <Button onClick={() => setStep(2)} disabled={!prefs.dates.end}>Next Step</Button>
         </div>
      </div>
    );
  }

  // Step 2: Vibe
  if (step === 2) {
    return (
      <div className="h-full flex flex-col pt-14 px-6 bg-zinc-950 animate-slide-up">
         <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setStep(1)} className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-white"><ChevronLeft className="w-5 h-5" /></button>
            <h2 className="text-white font-bold text-lg">What's your vibe?</h2>
         </div>
         
         <div className="grid grid-cols-2 gap-4 mb-8">
            {AI_VIBES.map(v => (
              <button 
                key={v.id} 
                onClick={() => setPrefs(p => ({...p, vibe: v}))}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
                  prefs.vibe?.id === v.id ? 'bg-emerald-500/10 border-emerald-500' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center ${v.color} text-white shadow-lg`}>
                    <v.icon className="w-6 h-6" />
                 </div>
                 <span className={`font-medium ${prefs.vibe?.id === v.id ? 'text-emerald-500' : 'text-zinc-300'}`}>{v.label}</span>
              </button>
            ))}
         </div>
         
         <div className="mt-auto pb-8">
           <Button onClick={() => setStep(3)} disabled={!prefs.vibe} variant="gradient" icon={Sparkles}>Curate My Trip</Button>
         </div>
      </div>
    );
  }

  // Step 3: Scanning
  if (step === 3) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-8 bg-zinc-950 relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950 to-zinc-950"></div>
         
         {/* Radar Effect */}
         <div className="relative w-64 h-64 flex items-center justify-center mb-12 overflow-hidden rounded-full border border-emerald-500/30">
            {/* Ping Ring */}
            <div className="absolute inset-0 rounded-full border border-emerald-500/10 animate-ping"></div>
            
            {/* Rotating Beam */}
            <div className="absolute inset-2 rounded-full overflow-hidden opacity-50">
               <div className="w-full h-full animate-radar-spin" 
                    style={{ 
                      background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(16, 185, 129, 0.5) 360deg)'
                    }}>
               </div>
            </div>

            {/* Center Circle */}
            <div className="w-48 h-48 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center relative z-10 shadow-2xl">
               <Sparkles className="w-16 h-16 text-emerald-500 animate-pulse" />
            </div>
         </div>

         <div className="relative z-10 bg-black/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">Designing your escape...</h2>
            <p className="text-zinc-300 text-sm">Scanning 450+ flights and hotels based on your {prefs.vibe?.label.toLowerCase()} preference.</p>
         </div>
         
         <div className="w-64 h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-8 relative z-10">
            <div className="h-full bg-emerald-500 transition-all duration-100 ease-linear" style={{width: `${scanProgress}%`}}></div>
         </div>
      </div>
    );
  }

  // Step 4: Results List
  if (step === 4) {
    return (
      <div className="h-full flex flex-col pt-14 px-6 bg-zinc-950 animate-slide-up">
         <div className="flex items-center gap-4 mb-4">
            <button onClick={() => setStep(0)} className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-white"><X className="w-5 h-5"/></button>
            <h2 className="text-white font-bold text-lg">AI Matches Found</h2>
         </div>
         <p className="text-zinc-400 text-sm mb-6">Based on your vibe, we found these perfect escapes.</p>

         <div className="flex-1 overflow-y-auto custom-scrollbar -mx-6 px-6 pb-20 space-y-6">
            {results.map((pkg) => (
               <div key={pkg.id} onClick={() => { setSelectedResult(pkg); setStep(5); }} className="relative h-64 rounded-3xl overflow-hidden cursor-pointer group shadow-xl border border-zinc-800 active:scale-[0.98] transition-all">
                  <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={pkg.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                     <Sparkles className="w-3 h-3"/> 98% Match
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                     <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
                     <div className="flex justify-between items-end">
                        <div className="flex items-center gap-1.5 text-zinc-300 text-sm font-medium">
                           <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {pkg.dest}
                        </div>
                        <span className="text-white font-bold text-lg">${pkg.price}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    );
  }

  // Step 5: Result Detail
  if (step === 5 && selectedResult) {
    const pkg = selectedResult;
    return (
      <div className="h-full flex flex-col bg-zinc-950 animate-fade-in relative overflow-y-auto custom-scrollbar">
         <div className="h-[45%] relative flex-shrink-0">
            <img src={pkg.image} className="w-full h-full object-cover" alt={pkg.name} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950" />
            <button onClick={() => setStep(4)} className="absolute top-14 left-6 p-2 bg-black/30 backdrop-blur rounded-full text-white"><ChevronLeft className="w-5 h-5"/></button>
            <div className="absolute bottom-6 left-6 right-6">
               <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded w-fit mb-2 flex items-center gap-1"><Sparkles className="w-3 h-3"/> PERFECT MATCH</div>
               <h1 className="text-3xl font-bold text-white mb-1">{pkg.name}</h1>
               <p className="text-zinc-300 flex items-center gap-1"><MapPin className="w-4 h-4 text-emerald-500"/> {pkg.dest}</p>
            </div>
         </div>

         <div className="px-6 -mt-4 relative z-10 flex-1 pb-24">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6 shadow-xl">
               <div className="flex justify-between items-center mb-6">
                  <div>
                     <span className="text-zinc-400 text-xs uppercase">Total Package</span>
                     <span className="text-3xl font-bold text-white block">${pkg.price}</span>
                  </div>
                  <Button className="w-auto px-6 py-2 h-10 text-sm" variant="primary">Book All</Button>
               </div>
               
               {/* Timeline */}
               <div className="space-y-6 relative">
                  <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-zinc-800"></div>
                  
                  {/* Flight */}
                  <div className="flex gap-4 relative">
                     <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white z-10"><Plane className="w-4 h-4"/></div>
                     <div className="flex-1">
                        <h4 className="text-white font-bold text-sm">Outbound Flight</h4>
                        <p className="text-zinc-400 text-xs">{pkg.flight.code} • {pkg.flight.time}</p>
                        <p className="text-zinc-500 text-[10px] uppercase mt-1">{pkg.flight.origin} &rarr; {pkg.flight.dest}</p>
                     </div>
                  </div>

                  {/* Hotel */}
                  <div className="flex gap-4 relative">
                     <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white z-10"><Home className="w-4 h-4"/></div>
                     <div className="flex-1">
                        <h4 className="text-white font-bold text-sm">4 Nights Stay</h4>
                        <p className="text-zinc-400 text-xs">{pkg.hotel.name} • {pkg.hotel.room}</p>
                        <img src={pkg.hotel.image} className="w-full h-24 object-cover rounded-xl mt-2 border border-zinc-800" alt={pkg.hotel.name} />
                     </div>
                  </div>

                  {/* Experience */}
                  <div className="flex gap-4 relative">
                     <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white z-10"><Camera className="w-4 h-4"/></div>
                     <div className="flex-1">
                        <h4 className="text-white font-bold text-sm">{pkg.activity.name}</h4>
                        <p className="text-zinc-400 text-xs">{pkg.activity.desc}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    );
  }

  return null;
};

const HomeScreen = ({ 
  isSearching, setIsSearching, searchQuery, setSearchQuery, 
  recentSearches, setRecentSearches, mode, setMode, setSelectedCity, 
  pushScreen, setNotificationsOpen, setAiPlannerStep, 
  showGuestSelector, setShowGuestSelector, guests, setGuests, dates 
}) => {
    
  const filteredCities = CITIES.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="h-full flex flex-col pt-14 px-6 pb-24 overflow-hidden relative animate-fade-in bg-zinc-950">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <div className="flex flex-col">
          <span className="text-zinc-400 text-sm">Welcome back</span>
          <span className="text-white font-semibold text-xl">Alex Johnson</span>
        </div>
        <button onClick={() => setNotificationsOpen(true)} className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-full relative cursor-pointer hover:bg-zinc-800 transition-colors">
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border border-zinc-900"></span>
        </button>
      </div>

      {/* Search & Params */}
      <div className="mb-8 relative z-30 space-y-3 flex-shrink-0">
        <div className={`bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3 shadow-lg transition-all ${isSearching ? 'ring-2 ring-emerald-500 border-transparent' : ''}`}>
          <Search className="w-5 h-5 text-zinc-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearching(true)}
            placeholder={`Search ${mode}...`} 
            className="bg-transparent text-white w-full focus:outline-none placeholder:text-zinc-500 font-medium"
          />
          {isSearching && <button onClick={() => { setIsSearching(false); setSearchQuery(''); }}><X className="w-4 h-4 text-zinc-400" /></button>}
        </div>

        <div className="flex gap-3">
           <button onClick={() => setShowGuestSelector(!showGuestSelector)} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center justify-center gap-2 text-zinc-300 text-sm hover:bg-zinc-800 transition-colors">
             <User className="w-4 h-4" /> {guests} Guests
           </button>
           <button className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center justify-center gap-2 text-zinc-300 text-sm hover:bg-zinc-800 transition-colors">
             <CalendarIcon className="w-4 h-4" /> {dates.start ? 'Dates Set' : 'Any Dates'}
           </button>
        </div>

        {/* Guest Selector Popover */}
        {showGuestSelector && (
          <div className="absolute top-full left-0 mt-2 bg-zinc-800 border border-zinc-700 rounded-xl p-4 shadow-xl w-48 z-40 animate-scale-in">
             <div className="flex items-center justify-between">
               <span className="text-white font-medium">Guests</span>
               <div className="flex items-center gap-3">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))} className="p-1 bg-zinc-700 rounded-full text-white"><Minus className="w-4 h-4" /></button>
                  <span className="text-white font-bold w-4 text-center">{guests}</span>
                  <button onClick={() => setGuests(Math.min(10, guests + 1))} className="p-1 bg-emerald-500 rounded-full text-white"><Plus className="w-4 h-4" /></button>
               </div>
             </div>
          </div>
        )}

        {/* Search Dropdown */}
        {isSearching && (
          <div className="absolute top-16 left-0 w-full bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-slide-up z-50">
            {searchQuery.length === 0 ? (
              // Recent Searches
              <div className="p-4">
                <h4 className="text-zinc-500 text-xs font-bold uppercase mb-3 px-2">Recent Searches</h4>
                {recentSearches.map((term, i) => (
                  <div key={i} onClick={() => setSearchQuery(term)} className="flex items-center gap-3 p-2 hover:bg-zinc-800 rounded-lg cursor-pointer text-zinc-300">
                     <Clock className="w-4 h-4 text-zinc-500" /> {term}
                  </div>
                ))}
              </div>
            ) : (
              // Results
              filteredCities.map(city => (
                <div key={city.id} onClick={() => { setSelectedCity(city); pushScreen('results'); if(!recentSearches.includes(city.name)) setRecentSearches([city.name, ...recentSearches]); }} className="p-4 flex items-center gap-3 hover:bg-zinc-800 cursor-pointer border-b border-zinc-800/50">
                  <img src={city.image} className="w-10 h-10 rounded-lg object-cover" alt={city.name} />
                  <div><h4 className="text-white font-medium">{city.name}</h4><p className="text-zinc-500 text-xs">{city.country}</p></div>
                  <ArrowRight className="w-4 h-4 text-emerald-500 ml-auto" />
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Overlay */}
      {isSearching && <div className="absolute inset-0 bg-black/80 z-20 backdrop-blur-sm" onClick={() => setIsSearching(false)} />}

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar -mx-6 px-6 flex-shrink-0">
        {['Hotels', 'Flights', 'Cars', 'Experience'].map((cat) => (
          <button 
            key={cat} 
            onClick={() => { setMode(cat); setSelectedCity(null); }} 
            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-all ${mode === cat ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/20' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar -mx-6 px-6 pb-20">
        
        {/* AI Holiday Package Booker Banner */}
        <div onClick={() => setAiPlannerStep(1)} className="mb-8 rounded-[2rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-6 relative overflow-hidden shadow-2xl cursor-pointer group flex-shrink-0">
           <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-emerald-500/10 rounded-l-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
           <div className="absolute -right-4 -bottom-4 w-32 h-32 text-zinc-800/50 group-hover:text-emerald-500/20 transition-colors duration-700 transform rotate-12">
              <Sparkles className="w-full h-full animate-super-pulse text-emerald-500" />
           </div>
           
           <div className="relative z-10">
             <div className="flex items-center gap-2 mb-3">
                <div className="bg-emerald-500/20 p-1.5 rounded-lg">
                   <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                </div>
                <span className="text-emerald-500 text-xs font-bold tracking-wider uppercase">New Feature</span>
             </div>
             <h3 className="text-white font-bold text-2xl leading-tight mb-2">AI Holiday Package Booker</h3>
             <p className="text-zinc-400 text-sm mb-4 max-w-[200px]">Let our AI curate your perfect escape in seconds.</p>
             <button className="bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full hover:scale-105 transition-transform flex items-center gap-2">
                Launch Planner <ArrowRight className="w-3 h-3"/>
             </button>
           </div>
        </div>

        {/* Trending Section */}
        <div className="mb-6">
           <h2 className="text-white text-md font-bold mb-3">Trending for You</h2>
           <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6">
              {[
                { title: 'Santorini', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2029&auto=format&fit=crop' },
                { title: 'Maldives', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop' },
                { title: 'Kyoto', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop' }
              ].map((item, i) => (
                <div key={i} className="min-w-[120px] h-32 relative rounded-2xl overflow-hidden cursor-pointer group flex-shrink-0">
                   <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title} />
                   <div className="absolute inset-0 bg-black/30" />
                   <span className="absolute bottom-2 left-3 font-bold text-white text-sm">{item.title}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Dynamic List Content */}
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-white text-lg font-bold">
            {mode === 'Cars' ? 'Top Rental Cars' : mode === 'Experience' ? 'Top Experiences' : 'Popular Destinations'}
          </h2>
          <span className="text-emerald-500 text-sm font-medium cursor-pointer">See All</span>
        </div>

        <div className="space-y-6">
          {mode === 'Cars' ? (
             CARS.map((car) => (
               <div key={car.id} onClick={() => { setSelectedItem(car); pushScreen('detail'); }} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden cursor-pointer shadow-lg active:scale-[0.98] transition-transform">
                  <div className="h-40 relative">
                     <img src={car.image} className="w-full h-full object-cover" alt={car.name} />
                     <div className="absolute top-3 right-3 bg-zinc-900/80 backdrop-blur px-2 py-1 rounded-lg text-white text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500"/> {car.rating}
                     </div>
                  </div>
                  <div className="p-4">
                     <div className="flex justify-between items-start mb-2">
                        <div>
                           <h3 className="text-white font-bold text-lg">{car.name}</h3>
                           <span className="text-zinc-500 text-xs">{car.type}</span>
                        </div>
                        <div className="text-right">
                           <span className="text-emerald-500 font-bold text-lg">${car.price}</span>
                           <span className="text-zinc-600 text-xs block">/ day</span>
                        </div>
                     </div>
                     <div className="flex gap-4 mt-2">
                        <div className="flex items-center gap-1 text-zinc-400 text-xs"><User className="w-3 h-3"/> {car.seats} Seats</div>
                        <div className="flex items-center gap-1 text-zinc-400 text-xs"><Briefcase className="w-3 h-3"/> {car.bags} Bags</div>
                        <div className="flex items-center gap-1 text-zinc-400 text-xs"><Zap className="w-3 h-3"/> Automatic</div>
                     </div>
                  </div>
               </div>
             ))
          ) : mode === 'Experience' ? (
             EXPERIENCES.map((exp) => (
               <div key={exp.id} onClick={() => { setSelectedItem(exp); pushScreen('detail'); }} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden cursor-pointer shadow-lg active:scale-[0.98] transition-transform flex h-32">
                  <div className="w-32 relative">
                     <img src={exp.image} className="w-full h-full object-cover" alt={exp.name} />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                     <div>
                        <div className="flex justify-between items-start">
                           <h3 className="text-white font-bold leading-tight">{exp.name}</h3>
                           <span className="text-emerald-500 font-bold">${exp.price}</span>
                        </div>
                        <div className="flex items-center gap-1 text-zinc-500 text-xs mt-1">
                           <MapPin className="w-3 h-3" /> {exp.location}
                        </div>
                     </div>
                     <div className="flex items-center gap-3 text-xs text-zinc-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {exp.duration}</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500"/> {exp.rating}</span>
                     </div>
                  </div>
               </div>
             ))
          ) : (
             CITIES.map((city) => (
              <div key={city.id} onClick={() => { setSelectedCity(city); pushScreen('results'); }} className="relative h-64 rounded-3xl overflow-hidden cursor-pointer group shadow-lg ring-1 ring-white/5 active:scale-[0.98] transition-all">
                <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <h3 className="text-2xl font-bold text-white mb-1">{city.name}</h3>
                  <div className="flex items-center gap-1.5 text-zinc-300 text-sm font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {city.country}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const ResultsScreen = ({ 
  mode, selectedCity, priceRange, setPriceRange, minRating, setMinRating, 
  amenityFilters, setAmenityFilters, dates, setFilterModalOpen, filterModalOpen, 
  popScreen, setSelectedItem, pushScreen, setFavorites, favorites 
}) => {
  const [viewMode, setViewMode] = useState('List'); 
  const [loading, setLoading] = useState(true);
  const [previewItem, setPreviewItem] = useState(null); 
  
  useEffect(() => { setTimeout(() => setLoading(false), 800); }, []);

  // Filter Logic
  const items = useMemo(() => {
    const allItems = mode === 'Hotels' ? (selectedCity ? selectedCity.hotels : []) : (selectedCity ? selectedCity.flights : []);
    return allItems.filter(item => {
      if(item.price > priceRange) return false;
      if(mode === 'Hotels' && item.rating < minRating) return false;
      if(mode === 'Hotels' && amenityFilters.length > 0) {
        const hasAll = amenityFilters.every(a => item.amenities.includes(a.toLowerCase()));
        if(!hasAll) return false;
      }
      return true;
    });
  }, [mode, selectedCity, priceRange, minRating, amenityFilters]);

  return (
    <div className="h-full flex flex-col pt-14 px-6 bg-zinc-950 overflow-hidden animate-fade-in relative">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-6 z-20 relative">
        <button onClick={popScreen} className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-full text-white hover:bg-zinc-800 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
        <div className="text-center">
          <h2 className="text-white font-bold text-lg">{mode} in {selectedCity?.name}</h2>
          <span className="text-zinc-500 text-xs font-medium">{items.length} results • {dates.start ? `${formatDate(dates.start)}` : 'Any Dates'}</span>
        </div>
        <button onClick={() => setViewMode(v => v === 'List' ? 'Map' : 'List')} className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-full text-emerald-500 hover:bg-zinc-800 transition-colors">
          {viewMode === 'List' ? <MapIcon className="w-5 h-5" /> : <List className="w-5 h-5" />}
        </button>
      </div>

      {/* Content */}
      {viewMode === 'List' ? (
        <>
          {/* Filter Pill Row */}
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar flex-shrink-0">
            <button onClick={() => setFilterModalOpen(true)} className="flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 rounded-full text-sm font-medium border border-zinc-700">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <div className="h-8 w-[1px] bg-zinc-800 mx-1"></div>
            {['Price', 'Rating', 'Amenities'].map(f => (
              <button key={f} onClick={() => setFilterModalOpen(true)} className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                 {f}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pb-24 -mx-6 px-6">
            {loading ? (
              <div className="space-y-4">
                {[1,2,3].map(i => <div key={i}><Skeleton className="h-48 w-full mb-3"/><div className="flex justify-between"><Skeleton className="h-6 w-32"/><Skeleton className="h-6 w-16"/></div></div>)}
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-20 text-center">
                 <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4"><Search className="text-zinc-600 w-8 h-8" /></div>
                 <h3 className="text-white font-bold text-lg">No Results Found</h3>
                 <p className="text-zinc-500 text-sm mb-4">Try adjusting your filters.</p>
                 <Button variant="secondary" onClick={() => { setPriceRange(1500); setMinRating(0); setAmenityFilters([]); }}>Clear Filters</Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} onClick={() => { setSelectedItem(item); pushScreen('detail'); }} className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 mb-5 cursor-pointer active:scale-[0.98] transition-all shadow-xl">
                  {mode === 'Hotels' ? (
                    <>
                      <div className="relative h-48 overflow-hidden">
                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                        <button onClick={(e) => { e.stopPropagation(); setFavorites(p => p.includes(item.id) ? p.filter(x => x!==item.id) : [...p,item.id]); }} className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-2 rounded-full hover:bg-black/60 transition-colors">
                          <Heart className={`w-5 h-5 transition-colors ${favorites.includes(item.id) ? 'text-red-500 fill-red-500 animate-pop' : 'text-white'}`} />
                        </button>
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 border border-white/10">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /><span className="text-xs font-bold text-white">{item.rating}</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-white">{item.name}</h3>
                          <div className="text-right">
                            <span className="text-emerald-500 font-bold text-lg">${item.price}</span>
                            <p className="text-zinc-500 text-[10px] font-medium uppercase">/ night</p>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-3">{item.amenities.slice(0,3).map(am => <span key={am} className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-1 rounded-md capitalize">{am}</span>)}</div>
                      </div>
                    </>
                  ) : (
                    <div className="p-5 relative overflow-hidden bg-zinc-900">
                       {/* Header: Airline Info & Price */}
                       <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-3">
                             {(() => {
                                const airline = AIRLINES.find(a => a.name === item.airline);
                                return (
                                  <div className={`w-10 h-10 rounded-lg ${airline?.color} flex items-center justify-center shadow-lg`}>
                                      <span className={`font-bold ${airline?.text} text-sm`}>{airline?.logo}</span>
                                  </div>
                                );
                             })()}
                             <div>
                                <h3 className="text-white font-bold">{item.airline}</h3>
                                <span className="text-zinc-500 text-xs flex items-center gap-1"><Shield className="w-3 h-3"/> Economy Flex</span>
                             </div>
                          </div>
                          <span className="text-emerald-500 font-bold text-xl">${item.price}</span>
                       </div>
                       
                       {/* Flight Segment UI */}
                       <div className="flex items-center justify-between px-2">
                          <div className="text-center">
                             <span className="text-2xl font-light text-white block">NYC</span>
                             <span className="text-zinc-500 text-xs font-mono">{item.time.split('-')[0]}</span>
                          </div>
                          
                          <div className="flex-1 px-4 flex flex-col items-center">
                             <span className="text-zinc-500 text-[10px] mb-1">{item.duration}</span>
                             <div className="w-full h-[1px] bg-zinc-700 relative flex items-center justify-center">
                                <div className="absolute left-0 w-1.5 h-1.5 bg-zinc-500 rounded-full"></div>
                                <div className="absolute right-0 w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                <Plane className="w-4 h-4 text-emerald-500 absolute rotate-90 bg-zinc-900 px-0.5" />
                             </div>
                             <span className="text-emerald-500 text-[10px] mt-1">{item.stops}</span>
                          </div>
                          
                          <div className="text-center">
                             <span className="text-2xl font-light text-white block">{item.code}</span>
                             <span className="text-zinc-500 text-xs font-mono">{item.time.split('-')[1]}</span>
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div className="absolute inset-0 top-0 bg-zinc-900 z-10 animate-fade-in">
           <div className="w-full h-full relative bg-[#1a1a1a] overflow-hidden" onClick={() => setPreviewItem(null)}>
              {/* Map Grid Pattern */}
              <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
              
              {/* Markers */}
              {items.map((h, i) => (
                 <div key={h.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 group" style={{top: h.coords?.top || '50%', left: h.coords?.left || '50%'}} onClick={(e) => { e.stopPropagation(); setPreviewItem(h); }}>
                    <div className={`text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl transition-all cursor-pointer flex items-center gap-1 border ${previewItem?.id === h.id ? 'bg-white text-black scale-110 border-white' : 'bg-emerald-500 text-white border-emerald-400 hover:scale-110'}`}>
                      ${h.price}
                    </div>
                    <div className={`w-2 h-2 rotate-45 mx-auto -mt-1 ${previewItem?.id === h.id ? 'bg-white' : 'bg-emerald-500'}`}></div>
                 </div>
              ))}

              {/* Map Preview Card */}
              {previewItem && (
                <div className="absolute bottom-24 left-4 right-4 animate-slide-up" onClick={() => { setSelectedItem(previewItem); pushScreen('detail'); }}>
                  <div className="bg-zinc-900 p-3 rounded-2xl flex gap-3 border border-zinc-800 shadow-2xl">
                     <img src={previewItem.image} className="w-20 h-20 rounded-xl object-cover" />
                     <div className="flex-1 py-1">
                        <h3 className="text-white font-bold">{previewItem.name}</h3>
                        <div className="flex gap-1 items-center mt-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500"/><span className="text-xs text-zinc-300">{previewItem.rating}</span></div>
                        <div className="mt-2 text-emerald-500 font-bold">${previewItem.price}<span className="text-zinc-600 text-[10px] font-normal"> / night</span></div>
                     </div>
                  </div>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

const DetailScreen = ({ mode, selectedItem, selectedCity, popScreen, pushScreen }) => {
  // Determine type of selected item
  const isHotel = mode === 'Hotels' && selectedItem?.amenities;
  const isCar = mode === 'Cars' && selectedItem?.type;
  const isExp = mode === 'Experience' && selectedItem?.duration;
  
  // Flight check
  const isFlight = mode === 'Flights' || (!isHotel && !isCar && !isExp);

  const getImage = () => {
    if(isHotel || isCar || isExp) return selectedItem?.image;
    return selectedCity?.image;
  }

  if (!selectedItem) return null;

  return (
    <div className="h-full relative bg-zinc-950 overflow-y-auto no-scrollbar pb-32 animate-fade-in">
      <div className="h-[50%] relative">
         <img src={getImage()} className="w-full h-full object-cover" alt="" />
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-zinc-950" />
         <button onClick={popScreen} className="absolute top-14 left-6 p-2.5 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-black/40"><ChevronLeft className="w-5 h-5" /></button>
      </div>

      <div className="px-6 -mt-20 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-white leading-tight w-3/4">
             {isHotel ? selectedItem.name : isCar ? selectedItem.name : isExp ? selectedItem.name : `Flight to ${selectedCity?.name || 'Destination'}`}
          </h1>
          <div className="bg-zinc-900/90 backdrop-blur border border-zinc-800 px-3 py-1.5 rounded-lg text-emerald-500 font-bold text-lg shadow-xl">${selectedItem.price}</div>
        </div>
        
        <div className="flex items-center gap-4 mb-8 text-sm">
           {(isHotel || isExp) && (
             <div className="flex items-center gap-1.5 text-zinc-300"><MapPin className="w-4 h-4 text-emerald-500" /> {isHotel ? selectedCity.country : selectedItem.location}</div>
           )}
           {(isHotel || isExp || isCar) && (
             <div className="flex items-center gap-1.5 text-zinc-300"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {selectedItem.rating}</div>
           )}
           {isCar && <div className="flex items-center gap-1.5 text-zinc-300"><Car className="w-4 h-4 text-emerald-500" /> {selectedItem.type}</div>}
        </div>

        <h3 className="text-white font-semibold mb-3">Description</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
           {isHotel ? selectedItem.desc : 
            isCar ? `Drive in style with this ${selectedItem.name}. Features include autopilot, premium sound system, and leather seats.` :
            isExp ? `Enjoy a ${selectedItem.duration} ${selectedItem.name} experience. Includes guide, equipment, and refreshments.` :
            `Direct flight with ${selectedItem.airline}. Includes one carry-on bag and a personal item. Enjoy complimentary beverages and in-flight entertainment.`}
        </p>

        <h3 className="text-white font-semibold mb-3">{isCar ? 'Features' : isExp ? 'Includes' : 'Amenities'}</h3>
        <div className="grid grid-cols-2 gap-3 mb-8">
           {isCar ? (
              <>
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-3 rounded-xl"><User className="w-4 h-4 text-emerald-500"/><span className="text-zinc-300 text-xs">{selectedItem.seats} Seats</span></div>
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-3 rounded-xl"><Briefcase className="w-4 h-4 text-emerald-500"/><span className="text-zinc-300 text-xs">{selectedItem.bags} Bags</span></div>
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-3 rounded-xl"><Zap className="w-4 h-4 text-emerald-500"/><span className="text-zinc-300 text-xs">{selectedItem.type === 'Electric' ? 'Electric' : 'Gasoline'}</span></div>
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-3 rounded-xl"><Shield className="w-4 h-4 text-emerald-500"/><span className="text-zinc-300 text-xs">Insurance</span></div>
              </>
           ) : (isHotel ? selectedItem.amenities : ['Wifi', 'Meal', 'Entertainment', 'Power']).map(am => (
              <div key={am} className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
                 {am === 'wifi' && <Wifi className="w-4 h-4 text-emerald-500" />}
                 {am === 'coffee' && <Coffee className="w-4 h-4 text-emerald-500" />}
                 {am === 'tv' && <Tv className="w-4 h-4 text-emerald-500" />}
                 {am === 'wind' && <Wind className="w-4 h-4 text-emerald-500" />}
                 <span className="text-zinc-300 text-xs font-medium capitalize">{am}</span>
              </div>
           ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pointer-events-none z-20">
         <div className="pointer-events-auto max-w-[400px] mx-auto">
           <Button onClick={() => pushScreen('booking')}>Book Now for ${selectedItem.price}</Button>
         </div>
      </div>
    </div>
  );
};

const BookingScreen = ({ popScreen, pushScreen, setTrips, mode, selectedItem, selectedCity, guests, dates, setDates }) => {
  const [processing, setProcessing] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  // Determine item type for summary
  const isHotel = mode === 'Hotels' && selectedItem?.amenities;
  const isCar = mode === 'Cars' && selectedItem?.type;
  const isExp = mode === 'Experience' && selectedItem?.duration;
  
  const handleBook = () => {
     if (!dates.start) return alert("Please select dates");
     setProcessing(true);
     setTimeout(() => {
        setTrips(prev => [{
          id: Date.now(),
          city: isHotel || !selectedCity ? selectedItem.name : selectedCity.name,
          country: selectedCity?.country || 'Unknown',
          date: `${formatDate(dates.start)} - ${formatDate(dates.end || dates.start)}`,
          status: 'Upcoming',
          image: isHotel || isCar || isExp ? selectedItem.image : selectedCity.image,
          hotel: isHotel ? selectedItem.name : isCar ? selectedItem.name : isExp ? selectedItem.name : selectedItem.airline
        }, ...prev]);
        setProcessing(false);
        pushScreen('success');
     }, 2000);
  };

  if (!selectedItem) return null;

  return (
    <div className="h-full flex flex-col pt-14 px-6 bg-zinc-950 overflow-y-auto custom-scrollbar pb-10">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={popScreen} className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-white"><ChevronLeft className="w-5 h-5" /></button>
        <h2 className="text-white font-bold text-lg">Checkout</h2>
      </div>

      {/* Product Summary */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex gap-4 mb-8">
        <img src={isHotel || isCar || isExp ? selectedItem.image : selectedCity?.image} className="w-20 h-20 rounded-xl object-cover" alt="" />
        <div>
          <h3 className="text-white font-bold">{isHotel ? selectedItem.name : isCar ? selectedItem.name : isExp ? selectedItem.name : selectedItem.airline}</h3>
          <div className="text-emerald-500 text-xs font-bold mt-1 mb-2">Non-refundable</div>
          <div className="flex gap-2 text-zinc-500 text-xs"><User className="w-3 h-3" /> {guests} Guests</div>
        </div>
      </div>

      {/* Date Selector */}
      <div onClick={() => setCalendarOpen(true)} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex justify-between items-center mb-6 cursor-pointer hover:bg-zinc-800 transition-colors">
         <div className="flex items-center gap-3">
           <div className="bg-zinc-800 p-2 rounded-lg"><CalendarIcon className="w-5 h-5 text-zinc-400" /></div>
           <div>
             <p className="text-zinc-500 text-xs uppercase font-bold">Dates</p>
             <p className="text-white font-medium">{dates.start ? `${formatDate(dates.start)} - ${formatDate(dates.end || dates.start)}` : 'Select Dates'}</p>
           </div>
         </div>
         <span className="text-emerald-500 text-sm font-bold">Edit</span>
      </div>

      {/* Traveler Form */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
         <h3 className="text-white font-bold mb-4">Traveler Details</h3>
         <div className="space-y-3">
            <input placeholder="Full Name" className="w-full bg-zinc-800 p-3 rounded-lg text-white text-sm focus:outline-none border border-transparent focus:border-emerald-500" defaultValue="Alex Johnson" />
            <input placeholder="Phone Number" className="w-full bg-zinc-800 p-3 rounded-lg text-white text-sm focus:outline-none border border-transparent focus:border-emerald-500" />
         </div>
      </div>

      {/* Payment Mock */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-8">
         <div className="flex justify-between items-center mb-4">
           <h3 className="text-white font-bold">Payment</h3>
           <button className="text-emerald-500 text-xs font-bold">Change</button>
         </div>
         <div className="flex items-center gap-3">
            <div className="bg-zinc-800 p-2 rounded-lg"><CreditCard className="w-5 h-5 text-white" /></div>
            <div><p className="text-white font-medium text-sm">Apple Pay</p><p className="text-zinc-500 text-xs">Default method</p></div>
         </div>
      </div>

      {/* Totals */}
      <div className="mt-auto space-y-3 mb-6">
         <div className="flex justify-between text-zinc-400 text-sm"><span>Subtotal</span><span>${selectedItem.price}</span></div>
         <div className="flex justify-between text-zinc-400 text-sm"><span>Taxes & Fees</span><span>$45</span></div>
         <div className="h-px bg-zinc-800 my-2" />
         <div className="flex justify-between text-white text-xl font-bold"><span>Total</span><span>${selectedItem.price + 45}</span></div>
      </div>
      
      <Button onClick={handleBook} disabled={processing || !dates.start}>
         {processing ? 'Confirming...' : 'Swipe to Pay'}
      </Button>

      {/* Simple Calendar Modal */}
      {calendarOpen && (
         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in" onClick={() => setCalendarOpen(false)}>
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-3xl p-6" onClick={e => e.stopPropagation()}>
               <h3 className="text-white font-bold text-center mb-6">Select Dates</h3>
               <div className="grid grid-cols-7 gap-2 mb-6">
                  {[...Array(30)].map((_, i) => (
                     <button key={i} onClick={() => {
                        const d = new Date(2023, 9, i+1);
                        if(!dates.start || (dates.start && dates.end)) setDates({start:d, end:null});
                        else setDates(d > dates.start ? {...dates, end:d} : {start:d, end:null});
                     }} className={`h-9 w-9 rounded-full text-sm font-medium flex items-center justify-center transition-colors ${
                        (dates.start?.getDate() === i+1 || dates.end?.getDate() === i+1) ? 'bg-emerald-500 text-white' : 
                        (dates.start && dates.end && i+1 > dates.start.getDate() && i+1 < dates.end.getDate()) ? 'bg-emerald-500/20 text-emerald-500' : 'text-zinc-400 hover:bg-zinc-800'
                     }`}>
                        {i+1}
                     </button>
                  ))}
               </div>
               <Button onClick={() => setCalendarOpen(false)}>Confirm Dates</Button>
            </div>
         </div>
      )}
    </div>
  );
};

const SuccessScreen = ({ resetToHome, setActiveTab }) => (
  <div className="h-full flex flex-col items-center justify-center px-8 text-center bg-zinc-950 animate-fade-in">
     <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/30 animate-scale-in">
       <CheckCircle className="w-10 h-10 text-white" />
     </div>
     <h2 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h2>
     <p className="text-zinc-400 mb-8 max-w-[200px]">Order #882910 confirmed. We sent an email to alex@example.com</p>
     <Button variant="secondary" onClick={() => { resetToHome(); setActiveTab('Trips'); }}>View My Trips</Button>
  </div>
);

const TripsScreen = ({ trips, setSelectedTrip, pushScreen }) => {
  const [filter, setFilter] = useState('Upcoming');
  const displayTrips = trips.filter(t => t.status === filter);

  return (
    <div className="h-full flex flex-col pt-14 px-6 bg-zinc-950">
       <h1 className="text-3xl font-bold text-white mb-6">My Trips</h1>
       <div className="bg-zinc-900 p-1 rounded-xl flex mb-6">
          {['Upcoming', 'Completed'].map(f => (
             <button key={f} onClick={() => setFilter(f)} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${filter === f ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500'}`}>{f}</button>
          ))}
       </div>
       <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pb-24">
          {displayTrips.length === 0 ? (
             <div className="text-center text-zinc-500 mt-20"><Plane className="w-12 h-12 mx-auto mb-4 opacity-20" /><p>No {filter.toLowerCase()} trips.</p></div>
          ) : displayTrips.map(trip => (
             <div key={trip.id} onClick={() => { setSelectedTrip(trip); pushScreen('trip-detail'); }} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex shadow-lg cursor-pointer hover:bg-zinc-800 transition-colors">
                <div className="w-24 bg-zinc-800 relative">
                   <img src={trip.image} className="w-full h-full object-cover opacity-80" alt="" />
                </div>
                <div className="p-4 flex-1">
                   <div className="flex justify-between items-start mb-1">
                      <h3 className="text-white font-bold">{trip.city}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${trip.status === 'Upcoming' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-zinc-700 text-zinc-400'}`}>{trip.status}</span>
                   </div>
                   <p className="text-zinc-500 text-xs mb-3">{trip.date}</p>
                   <div className="flex items-center gap-2 text-zinc-400 text-xs">
                      <Home className="w-3 h-3" /> {trip.hotel}
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

const TripDetailScreen = ({ selectedTrip, popScreen }) => (
  <div className="h-full flex flex-col pt-14 px-6 bg-zinc-950 animate-slide-up overflow-y-auto custom-scrollbar">
     <div className="flex items-center justify-between mb-6">
        <button onClick={popScreen} className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-white"><ChevronLeft className="w-5 h-5" /></button>
        <div className="flex gap-2">
           <button className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-white"><MoreVertical className="w-5 h-5" /></button>
        </div>
     </div>
     
     <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-1">Trip to {selectedTrip?.city}</h2>
        <p className="text-zinc-400">{selectedTrip?.date}</p>
     </div>

     {selectedTrip?.status === 'Upcoming' && (
       <div className="space-y-6 pb-20">
          {/* Flight */}
          <div className="flex gap-4">
             <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-zinc-900"><Plane className="w-4 h-4" /></div>
                <div className="w-0.5 h-full bg-zinc-800 my-2"></div>
             </div>
             <div className="flex-1 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                <div className="flex justify-between mb-2">
                   <span className="text-white font-bold">{selectedTrip?.flight?.out}</span>
                   <span className="text-emerald-500 font-mono">{selectedTrip?.flight?.time}</span>
                </div>
                <div className="flex justify-between text-xs text-zinc-400">
                   <span>NYC &rarr; NRT</span>
                   <span>Seat {selectedTrip?.flight?.seat}</span>
                </div>
             </div>
          </div>

          {/* Car */}
          <div className="flex gap-4">
             <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"><Car className="w-4 h-4" /></div>
                <div className="w-0.5 h-full bg-zinc-800 my-2"></div>
             </div>
             <div className="flex-1 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                <h4 className="text-white font-bold mb-1">Car Rental</h4>
                <p className="text-zinc-400 text-sm mb-2">{selectedTrip?.car}</p>
                <span className="bg-zinc-800 text-xs px-2 py-1 rounded text-zinc-300">Confirmation: #CR-8892</span>
             </div>
          </div>

          {/* Hotel */}
          <div className="flex gap-4">
             <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white"><Home className="w-4 h-4" /></div>
             </div>
             <div className="flex-1 bg-zinc-900 border border-zinc-800 p-0 rounded-2xl overflow-hidden">
                <img src={selectedTrip?.image} className="w-full h-32 object-cover" alt={selectedTrip?.hotel} />
                <div className="p-4">
                   <h4 className="text-white font-bold mb-1">{selectedTrip?.hotel}</h4>
                   <div className="flex items-center gap-1 text-zinc-400 text-xs">
                      <MapPin className="w-3 h-3" /> {selectedTrip?.city}, {selectedTrip?.country}
                   </div>
                </div>
             </div>
          </div>
       </div>
     )}
  </div>
);

const ProfileScreen = ({ trips, setSelectedTrip, pushScreen, setHistory, favorites, upcomingTrip }) => {
   return (
     <div className="h-full flex flex-col pt-14 px-6 bg-zinc-950 overflow-y-auto custom-scrollbar pb-24">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-xl">AJ</div>
              <div><h2 className="text-white font-bold text-xl">Alex Johnson</h2><p className="text-zinc-500 text-sm">Gold Member</p></div>
           </div>
           <button onClick={() => pushScreen('settings')} className="p-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-white"><Settings className="w-5 h-5" /></button>
        </div>
        
        {upcomingTrip && (
           <div onClick={() => { setSelectedTrip(upcomingTrip); pushScreen('trip-detail'); }} className="mb-8 cursor-pointer">
              <h3 className="text-zinc-400 text-xs font-bold uppercase mb-3 tracking-wider">Next Adventure</h3>
              <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700 p-5 rounded-3xl relative overflow-hidden group">
                 <div className="absolute right-0 top-0 w-32 h-full opacity-20"><img src={upcomingTrip.image} className="w-full h-full object-cover mask-image-linear" alt={upcomingTrip.city} /></div>
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <span className="text-emerald-500 font-bold text-lg block">{upcomingTrip.city}</span>
                          <span className="text-zinc-400 text-xs">{upcomingTrip.country}</span>
                       </div>
                       <div className="bg-zinc-800 p-2 rounded-lg border border-zinc-700">
                          <Plane className="w-5 h-5 text-white" />
                       </div>
                    </div>
                    <div className="flex gap-6">
                       <div><span className="text-zinc-500 text-[10px] uppercase block">Date</span><span className="text-white font-medium text-sm">{upcomingTrip.date.split('-')[0]}</span></div>
                       <div><span className="text-zinc-500 text-[10px] uppercase block">Flight</span><span className="text-white font-medium text-sm">{upcomingTrip.flight?.time}</span></div>
                       <div><span className="text-zinc-500 text-[10px] uppercase block">Gate</span><span className="text-white font-medium text-sm">A12</span></div>
                    </div>
                 </div>
              </div>
           </div>
        )}
        
        <div className="space-y-2">
           <button onClick={() => pushScreen('wallet')} className="w-full flex items-center justify-between bg-zinc-900 border border-zinc-800 p-4 rounded-xl hover:bg-zinc-800 transition-colors group">
               <div className="flex items-center gap-3 text-zinc-300 group-hover:text-white"><Wallet className="w-5 h-5" /><span className="font-medium">Wallet</span></div><ChevronRight className="w-4 h-4 text-zinc-600" />
           </button>
           <button className="w-full flex items-center justify-between bg-zinc-900 border border-zinc-800 p-4 rounded-xl hover:bg-zinc-800 transition-colors group">
               <div className="flex items-center gap-3 text-zinc-300 group-hover:text-white"><Heart className="w-5 h-5" /><span className="font-medium">Favorites</span></div><div className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">{favorites.length}</div>
           </button>
           
           <button onClick={() => { setHistory(['login']); }} className="w-full flex items-center gap-3 p-4 rounded-xl text-red-500 mt-4 hover:bg-zinc-900 transition-colors">
              <LogOut className="w-5 h-5" /><span className="font-medium">Log Out</span>
           </button>
        </div>
     </div>
   );
};

// ... (Rest of the component definitions: WalletScreen, SettingsScreen, etc.) ...
// To ensure everything is complete, I will include WalletScreen and SettingsScreen here as well.

const WalletScreen = ({ popScreen }) => (
  <div className="h-full flex flex-col pt-14 px-6 bg-zinc-950 animate-slide-up">
    <div className="flex items-center gap-4 mb-8">
        <button onClick={popScreen} className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-white"><ChevronLeft className="w-5 h-5" /></button>
        <h2 className="text-white font-bold text-lg">My Wallet</h2>
    </div>
    <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 text-white mb-6 shadow-2xl">
       <div className="flex justify-between items-start mb-8">
          <span className="font-mono text-sm opacity-80">BookIt Pay</span>
          <Wallet className="w-6 h-6" />
       </div>
       <div className="font-mono text-xl tracking-wider mb-2">**** **** **** 4242</div>
       <div className="text-xs opacity-70">Expires 12/25</div>
    </div>
    <h3 className="text-white font-bold mb-4">Payment Methods</h3>
    <div className="space-y-3">
       <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3"><CreditCard className="text-white"/> <span className="text-zinc-300 text-sm">Visa ending in 8832</span></div>
          <span className="text-emerald-500 text-xs">Default</span>
       </div>
       <Button variant="outline" className="border-dashed">Add New Card</Button>
    </div>
  </div>
);

const SettingsScreen = ({ popScreen }) => (
  <div className="h-full flex flex-col pt-14 px-6 bg-zinc-950 animate-slide-up">
     <div className="flex items-center gap-4 mb-8">
        <button onClick={popScreen} className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-white"><ChevronLeft className="w-5 h-5" /></button>
        <h2 className="text-white font-bold text-lg">Settings</h2>
    </div>
    <div className="space-y-4">
       {[
         { icon: Bell, label: 'Notifications', type: 'toggle', active: true },
         { icon: Moon, label: 'Dark Mode', type: 'toggle', active: true },
         { icon: Globe, label: 'Language', val: 'English (US)' },
         { icon: Shield, label: 'Privacy Policy' }
       ].map((s,i) => (
         <div key={i} className="flex justify-between items-center p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <div className="flex items-center gap-3 text-white"><s.icon className="w-5 h-5 text-zinc-400"/> {s.label}</div>
            {s.type === 'toggle' ? (
              <div className={`w-10 h-6 rounded-full relative ${s.active ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${s.active ? 'left-5' : 'left-1'}`}></div>
              </div>
            ) : <span className="text-zinc-500 text-sm">{s.val || <ChevronRight className="w-4 h-4"/>}</span>}
         </div>
       ))}
    </div>
  </div>
);

/* --- MAIN APPLICATION --- */

export default function BookItApp() {
  const [history, setHistory] = useState(['splash']);
  const currentScreen = history[history.length - 1];
  
  // App Global State
  const [activeTab, setActiveTab] = useState('Home');
  const [mode, setMode] = useState('Hotels');
  const [favorites, setFavorites] = useState(['p1']); 
  const [trips, setTrips] = useState(PRE_BOOKED_TRIPS);
  const [recentSearches, setRecentSearches] = useState(['Kyoto, Japan', 'Rome, Italy']);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isTakingOff, setIsTakingOff] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null); 
  const [isSearching, setIsSearching] = useState(false); // Added missing state
  const [showGuestSelector, setShowGuestSelector] = useState(false); // Added missing state
  
  // AI Planner State
  const [aiPlannerStep, setAiPlannerStep] = useState(0); 
  const [aiPreferences, setAiPreferences] = useState({ dates: { start: null, end: null }, vibe: null });
  const [scanProgress, setScanProgress] = useState(0);
  const [aiResults, setAiResults] = useState([]);
  const [selectedAiPackage, setSelectedAiPackage] = useState(null);
  
  // Selection State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [dates, setDates] = useState({ start: null, end: null });
  const [guests, setGuests] = useState(2);
  
  // Filter State
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(1500);
  const [minRating, setMinRating] = useState(0);
  const [amenityFilters, setAmenityFilters] = useState([]);

  // Helpers
  const pushScreen = (screen) => setHistory(prev => [...prev, screen]);
  const popScreen = () => setHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  const resetToHome = () => { 
    setHistory(['home']); 
    setActiveTab('Home'); 
    setAiPlannerStep(0); 
  };
  const formatDate = (date) => date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
  
  // Effects
  useEffect(() => { 
    setTimeout(() => setIsTakingOff(true), 1500);
    setTimeout(() => pushScreen('login'), 2500); 
  }, []);

  // AI Scanner Effect
  useEffect(() => {
    if (aiPlannerStep === 3) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Prepare results
            const vibeId = aiPreferences.vibe?.id || 'relax';
            const results = AI_PACKAGES[vibeId] || AI_PACKAGES.default;
            setAiResults(results);
            setAiPlannerStep(4);
            return 100;
          }
          return prev + 0.5; 
        });
      }, 20); 
      return () => clearInterval(interval);
    } else {
      setScanProgress(0);
    }
  }, [aiPlannerStep]);

  /* --- TOOLTIPS --- */
  const renderTooltips = () => {
    if(currentScreen === 'splash') return null;

    const tooltips = [];
    
    // Home Screen Tooltips
    if (currentScreen === 'home' && activeTab === 'Home' && aiPlannerStep === 0) {
       tooltips.push(
          <div key="t1" className="absolute top-[320px] -right-64 w-56 flex items-center gap-4 animate-fade-in bg-zinc-900 border border-zinc-700 p-4 rounded-xl shadow-2xl z-50">
             <div className="w-3 h-3 bg-emerald-500 rounded-full relative flex-shrink-0"><div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div></div>
             <div>
                <h4 className="text-white font-bold text-sm mb-1">AI Planner</h4>
                <p className="text-zinc-300 text-xs leading-relaxed">Try our new AI-powered trip curator here.</p>
             </div>
          </div>
       );
       tooltips.push(
          <div key="t2" className="absolute top-12 -right-64 w-56 flex items-center gap-4 animate-fade-in bg-zinc-900 border border-zinc-700 p-4 rounded-xl shadow-2xl z-50">
             <div className="w-3 h-3 bg-emerald-500 rounded-full relative flex-shrink-0"><div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div></div>
             <div>
                <h4 className="text-white font-bold text-sm mb-1">Search</h4>
                <p className="text-zinc-300 text-xs leading-relaxed">Find your next destination.</p>
             </div>
          </div>
       );
       tooltips.push(
          <div key="t3" className="absolute bottom-12 -left-64 w-56 flex items-center justify-end gap-4 animate-fade-in bg-zinc-900 border border-zinc-700 p-4 rounded-xl shadow-2xl z-50 text-right">
             <div>
                <h4 className="text-white font-bold text-sm mb-1">Easy Navigation</h4>
                <p className="text-zinc-300 text-xs leading-relaxed">Access your trips and profile with a single tap.</p>
             </div>
             <div className="w-3 h-3 bg-emerald-500 rounded-full relative flex-shrink-0"><div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div></div>
          </div>
       );
    }
    return tooltips;
  };

  const showBottomNav = (['home', 'trips', 'profile'].includes(currentScreen.toLowerCase()) || (currentScreen === 'home' && ['Home', 'Trips', 'Profile'].includes(activeTab))) && aiPlannerStep === 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-200 py-10 font-sans selection:bg-emerald-500 selection:text-white relative">
      <GlobalStyles />
      
      <div className="relative w-[360px] h-[740px] bg-black rounded-[55px] shadow-[0_0_0_12px_#1a1a1a,0_20px_50px_-10px_rgba(0,0,0,0.5)] overflow-visible border-[8px] border-zinc-900 ring-1 ring-white/10 z-10">
        
        {renderTooltips()}

        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[20px] z-50 flex justify-center items-center pointer-events-none">
             <div className="w-2/3 h-2/3 flex justify-end items-center pr-2 gap-2"><div className="w-2 h-2 rounded-full bg-[#1a1a1a]"></div><div className="w-1.5 h-1.5 rounded-full bg-[#0f0f0f]"></div></div>
        </div>

        {/* Status Bar */}
        <div className="absolute top-3 left-8 right-8 flex justify-between z-40 text-white text-xs font-medium pointer-events-none">
            <span>9:41</span>
            <div className="flex gap-1.5"><div className="w-4"><Wifi size={14} /></div><div className="w-4"><div className="w-4 h-2.5 border border-white/40 rounded-sm relative"><div className="absolute inset-0.5 bg-white rounded-[1px] w-[70%]"></div></div></div></div>
        </div>

        {/* Main Content Area */}
        <div className="bg-zinc-950 h-full w-full text-white relative rounded-[45px] overflow-hidden">
           {/* Rendering Logic Inline to simplify passing state */}
           {aiPlannerStep > 0 ? (
             <AIPlannerScreen 
               step={aiPlannerStep} setStep={setAiPlannerStep} 
               prefs={aiPreferences} setPrefs={setAiPreferences} 
               scanProgress={scanProgress} results={aiResults} 
               selectedResult={selectedAiPackage} setSelectedResult={setSelectedAiPackage}
               formatDate={formatDate}
             />
           ) : (
             <>
               {currentScreen === 'splash' && <SplashScreen isTakingOff={isTakingOff} />}
               {currentScreen === 'login' && <LoginScreen onLogin={() => resetToHome()} />}
               {currentScreen === 'home' && activeTab === 'Home' && (
                 <HomeScreen 
                   isSearching={isSearching} setIsSearching={setIsSearching} 
                   searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                   recentSearches={recentSearches} setRecentSearches={setRecentSearches}
                   mode={mode} setMode={setMode} setSelectedCity={setSelectedCity}
                   pushScreen={pushScreen} setNotificationsOpen={setNotificationsOpen}
                   setAiPlannerStep={setAiPlannerStep} showGuestSelector={showGuestSelector}
                   setShowGuestSelector={setShowGuestSelector} guests={guests}
                   setGuests={setGuests} dates={dates}
                 />
               )}
               {currentScreen === 'results' && (
                 <ResultsScreen 
                    mode={mode} selectedCity={selectedCity} 
                    priceRange={priceRange} setPriceRange={setPriceRange}
                    minRating={minRating} setMinRating={setMinRating}
                    amenityFilters={amenityFilters} setAmenityFilters={setAmenityFilters}
                    dates={dates} filterModalOpen={filterModalOpen}
                    setFilterModalOpen={setFilterModalOpen} popScreen={popScreen}
                    setSelectedItem={setSelectedItem} pushScreen={pushScreen}
                    setFavorites={setFavorites} favorites={favorites}
                 />
               )}
               {currentScreen === 'detail' && (
                 <DetailScreen 
                    mode={mode} selectedItem={selectedItem} 
                    selectedCity={selectedCity} popScreen={popScreen} 
                    pushScreen={pushScreen} 
                 />
               )}
               {currentScreen === 'booking' && (
                 <BookingScreen 
                    popScreen={popScreen} pushScreen={pushScreen} 
                    setTrips={setTrips} mode={mode} selectedItem={selectedItem}
                    selectedCity={selectedCity} guests={guests} dates={dates} setDates={setDates}
                 />
               )}
               {currentScreen === 'success' && <SuccessScreen resetToHome={resetToHome} setActiveTab={setActiveTab} />}
               {activeTab === 'Trips' && currentScreen === 'home' && <TripsScreen trips={trips} setSelectedTrip={setSelectedTrip} pushScreen={pushScreen} />}
               {activeTab === 'Profile' && currentScreen === 'home' && <ProfileScreen trips={trips} setSelectedTrip={setSelectedTrip} pushScreen={pushScreen} setHistory={setHistory} favorites={favorites} upcomingTrip={trips.find(t => t.status === 'Upcoming')} />}
               {currentScreen === 'trip-detail' && <TripDetailScreen selectedTrip={selectedTrip} popScreen={popScreen} />}
               {currentScreen === 'wallet' && <WalletScreen popScreen={popScreen} />}
               {currentScreen === 'settings' && <SettingsScreen popScreen={popScreen} />}
             </>
           )}
        </div>

        {/* Persistent Bottom Navigation */}
        {showBottomNav && (
           <div className="absolute bottom-6 left-6 right-6 h-16 glass-panel rounded-3xl flex items-center justify-around px-2 z-40 animate-slide-up shadow-2xl">
              {[
                 { id: 'Home', icon: Search },
                 { id: 'Trips', icon: Briefcase },
                 { id: 'Profile', icon: User }
              ].map(tab => (
                 <button key={tab.id} onClick={() => { setActiveTab(tab.id); setHistory(['home']); }} className={`p-3 rounded-full transition-all duration-300 ${activeTab === tab.id ? 'bg-zinc-800 text-emerald-500 scale-110' : 'text-zinc-500 hover:text-white'}`}>
                    <tab.icon className="w-6 h-6" strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                 </button>
              ))}
           </div>
        )}

        {/* Overlays */}
        {notificationsOpen && (
           <>
              <div className="absolute inset-0 bg-black/60 z-50 backdrop-blur-sm rounded-[45px]" onClick={() => setNotificationsOpen(false)} />
              <div className="absolute top-16 right-6 left-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-5 z-50 animate-slide-down shadow-2xl">
                 <div className="flex justify-between items-center mb-4"><h3 className="text-white font-bold">Notifications</h3><button onClick={() => setNotificationsOpen(false)}><X className="w-5 h-5 text-zinc-500"/></button></div>
                 <div className="space-y-4">
                    {NOTIFICATIONS.map(n => (
                       <div key={n.id} className="flex gap-3 items-start border-b border-zinc-800 pb-3 last:border-0 last:pb-0">
                          <div className={`w-2 h-2 rounded-full mt-1.5 ${n.type === 'offer' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                          <div>
                             <h4 className="text-white text-sm font-medium">{n.title}</h4>
                             <p className="text-zinc-400 text-xs mt-1">{n.desc}</p>
                             <span className="text-zinc-600 text-[10px] mt-1 block">{n.time}</span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </>
        )}
      </div>
    </div>
  );
}