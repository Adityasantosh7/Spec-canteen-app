import { ArrowRight, Utensils } from 'lucide-react';

interface LandingPageProps {
  userName: string;
  onStartOrdering: () => void;
}

export default function LandingPage({ userName, onStartOrdering }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-950 overflow-hidden relative">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 animate-float">
          <Utensils className="w-16 h-16 text-red-300 opacity-20" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed">
          <Utensils className="w-12 h-12 text-red-300 opacity-20" />
        </div>
        <div className="absolute bottom-40 left-1/4 animate-float">
          <Utensils className="w-20 h-20 text-red-300 opacity-20" />
        </div>
        <div className="absolute bottom-20 right-1/3 animate-float-delayed">
          <Utensils className="w-14 h-14 text-red-300 opacity-20" />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-4xl">
          <div className="mb-8 animate-bounce-slow">
            <div className="inline-flex items-center justify-center space-x-4 mb-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transform rotate-12 animate-spin-slow">
                <span className="text-5xl">🍽️</span>
              </div>
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center animate-pulse">
                <span className="text-6xl">🍴</span>
              </div>
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transform -rotate-12 animate-spin-slow-reverse">
                <span className="text-5xl">🥄</span>
              </div>
            </div>
          </div>

          <h1 className="text-7xl font-bold text-white mb-4 animate-fade-in">
            Welcome to <span className="text-yellow-400">Bite</span>
          </h1>

          <p className="text-3xl text-red-100 mb-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Hello, <span className="font-bold text-white">{userName}</span>!
          </p>

          <p className="text-xl text-red-200 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            St. Peter's Engineering College Canteen
          </p>

          <div className="space-y-6 mb-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-center space-x-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform">
                <div className="text-5xl mb-2">🍕</div>
                <p className="text-white font-semibold">100+ Items</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform">
                <div className="text-5xl mb-2">⚡</div>
                <p className="text-white font-semibold">Quick Service</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform">
                <div className="text-5xl mb-2">💳</div>
                <p className="text-white font-semibold">UPI Payment</p>
              </div>
            </div>
          </div>

          <button
            onClick={onStartOrdering}
            className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 px-12 py-5 rounded-full text-2xl font-bold hover:from-yellow-300 hover:to-yellow-400 transition-all transform hover:scale-110 active:scale-95 shadow-2xl animate-slide-up flex items-center justify-center space-x-3 mx-auto"
            style={{ animationDelay: '0.8s' }}
          >
            <span>Start Ordering</span>
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>

          <div className="mt-12 animate-fade-in" style={{ animationDelay: '1s' }}>
            <p className="text-red-200 text-sm">
              Order your favorite meals with just a few clicks
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-32 text-red-950 opacity-50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64 C240,96 480,96 720,64 C960,32 1200,32 1200,64 L1200,120 L0,120 Z"
            fill="currentColor"
            className="animate-wave"
          />
        </svg>
      </div>
    </div>
  );
}
