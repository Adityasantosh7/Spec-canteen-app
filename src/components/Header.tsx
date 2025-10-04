import { ShoppingCart, LogOut, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  cartItemCount: number;
  onLogout: () => void;
  onCartClick: () => void;
}

export default function Header({ user, cartItemCount, onLogout, onCartClick }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center animate-spin-slow">
              <span className="text-2xl">🍴</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">Bite</h1>
                <span className="text-xl">🍽️</span>
              </div>
              <p className="text-xs text-red-100">St. Peter's Canteen</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-red-100">{user.rollNumber}</p>
            </div>

            <button
              onClick={onCartClick}
              className="relative bg-white text-red-600 p-3 rounded-full hover:bg-red-50 transition-all transform hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-scale-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={onLogout}
              className="bg-red-800 hover:bg-red-900 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
