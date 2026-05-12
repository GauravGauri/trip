'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, MapPin, Star, Filter, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function TripsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const allTrips = [
    { id: 1, title: 'Kedarkantha Trek', price: '₹8,500', days: '6 Days', rating: 4.9, image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', diff: 'Moderate', category: 'Winter Trek' },
    { id: 2, title: 'Hampta Pass Trek', price: '₹9,500', days: '5 Days', rating: 4.8, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', diff: 'Moderate', category: 'Summer Trek' },
    { id: 3, title: 'Kashmir Great Lakes', price: '₹14,500', days: '7 Days', rating: 5.0, image: 'https://images.unsplash.com/photo-1590457494191-8d2ef03dcb28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', diff: 'Difficult', category: 'Monsoon Trek' },
    { id: 4, title: 'Goechala Trek', price: '₹16,500', days: '11 Days', rating: 4.9, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', diff: 'Difficult', category: 'Spring Trek' },
    { id: 5, title: 'Buran Ghati Pass', price: '₹12,000', days: '7 Days', rating: 4.7, image: 'https://images.unsplash.com/photo-1521651201144-634f700b36ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', diff: 'Moderate-Difficult', category: 'Summer Trek' },
    { id: 6, title: 'Rupin Pass Trek', price: '₹13,500', days: '8 Days', rating: 4.8, image: 'https://images.unsplash.com/photo-1627896157734-4bc14930df30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', diff: 'Difficult', category: 'Summer Trek' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 mb-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Mountain Pattern" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">Find Your Next Adventure</h1>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">Browse our collection of expertly curated Himalayan treks and expeditions.</p>
            
            <div className="bg-white p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-xl">
              <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-3">
                <Search className="w-5 h-5 text-slate-400 mr-3" />
                <input 
                  type="text" 
                  placeholder="Search destinations, treks..." 
                  className="bg-transparent border-none outline-none w-full text-slate-900 placeholder:text-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="lg" className="px-8 shrink-0">Search</Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-28">
              <div className="flex items-center gap-2 font-bold font-heading text-slate-900 mb-6 text-lg border-b border-slate-100 pb-4">
                <Filter className="w-5 h-5 text-rose-500" />
                Filters
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 text-sm">Season</h4>
                  <div className="space-y-2">
                    {['Winter Treks', 'Summer Treks', 'Monsoon Treks', 'Autumn Treks'].map((season) => (
                      <label key={season} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-600 transition-colors" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{season}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 text-sm">Difficulty</h4>
                  <div className="space-y-2">
                    {['Easy', 'Moderate', 'Moderate-Difficult', 'Difficult'].map((diff) => (
                      <label key={diff} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-600 transition-colors" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{diff}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTrips.map((trek) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={trek.id} 
                className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden shrink-0">
                  <img src={trek.image} alt={trek.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {trek.rating}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-slate-900/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white border border-white/20">
                    {trek.diff}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-semibold text-rose-600 mb-1 block uppercase tracking-wider">{trek.category}</span>
                      <h3 className="text-lg font-bold font-heading text-slate-900 leading-tight">{trek.title}</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 mt-2 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {trek.days}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">From</p>
                      <p className="text-lg font-bold text-slate-900">{trek.price}</p>
                    </div>
                    <Link href={`/trips/${trek.id}`}>
                      <Button variant="primary" size="sm" className="rounded-full px-5">View</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
