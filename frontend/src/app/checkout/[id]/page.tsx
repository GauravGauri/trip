'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShieldCheck, CreditCard, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const date = searchParams.get('date');
  const guests = parseInt(searchParams.get('guests') || '1');
  const tripPrice = 8500; // Mock price
  const totalAmount = tripPrice * guests * 1.05;

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to complete booking');
      router.push(`/login?redirect=/checkout/${params.id}`);
    }
  }, [isAuthenticated, router, params.id]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsProcessing(false);
    setIsSuccess(true);
    toast.success('Payment successful! Booking confirmed.');
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-md w-full">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold font-heading text-slate-900 mb-4">Payment Successful!</h2>
          <p className="text-slate-600 mb-8">Your booking for Kedarkantha Trek has been confirmed. You will be redirected to your dashboard.</p>
          <div className="animate-pulse flex space-x-2 justify-center">
            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Trip Details
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Payment Form */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold font-heading text-slate-900 mb-8">Complete your Booking</h1>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8">
              <h2 className="text-xl font-bold font-heading text-slate-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-rose-500" /> Payment Details
              </h2>
              
              <form onSubmit={handlePayment} className="space-y-6">
                <Input label="Cardholder Name" placeholder="John Doe" required />
                <Input label="Card Number" placeholder="0000 0000 0000 0000" maxLength={19} required />
                
                <div className="grid grid-cols-2 gap-6">
                  <Input label="Expiry Date" placeholder="MM/YY" maxLength={5} required />
                  <Input label="CVV" placeholder="123" type="password" maxLength={3} required />
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-4 rounded-xl">
                  <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <p>Your payment information is securely encrypted and processed by Stripe/Razorpay.</p>
                </div>
                
                <Button type="submit" size="lg" className="w-full h-14 text-lg" isLoading={isProcessing}>
                  Pay ₹{totalAmount.toLocaleString('en-IN')}
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-28">
              <h2 className="text-xl font-bold font-heading text-slate-900 mb-6">Order Summary</h2>
              
              <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Trek" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight mb-1">Kedarkantha Trek</h3>
                  <p className="text-sm text-slate-500">{guests} Guests • 6 Days</p>
                  <p className="text-sm text-slate-500">{date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select Date'}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-slate-600">
                  <span>₹8,500 x {guests} adults</span>
                  <span>₹{(tripPrice * guests).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Taxes (5%)</span>
                  <span>₹{((tripPrice * guests) * 0.05).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6 mb-6">
                <div className="flex justify-between items-center font-bold text-xl text-slate-900">
                  <span>Total (INR)</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm">
                <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />
                <p><strong>Safe and secure payment.</strong> Free cancellation up to 30 days before the trip starts.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
