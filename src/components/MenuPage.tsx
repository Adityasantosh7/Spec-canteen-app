import { useState, useEffect } from 'react';
import { Plus, UtensilsCrossed } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { menuData, categories } from '../menuData';

interface MenuPageProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuPage({ cart, onAddToCart }: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredItems = menuData.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-white rounded-lg shadow-md p-2 mb-6 overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-3xl font-bold text-red-900">{selectedCategory}</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-red-700 rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              const cartItem = cart.find((ci) => ci.id === item.id);
              const quantity = cartItem?.quantity || 0;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden animate-slide-up relative`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute top-2 right-2 opacity-10">
                    <UtensilsCrossed className="w-12 h-12 text-red-600" />
                  </div>
                  <div className="p-6 relative">
                    <div className="flex items-start space-x-2 mb-2">
                      <span className="text-2xl mt-1">🍽️</span>
                      <h3 className="text-lg font-bold text-gray-800 flex-1">
                        {item.name}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-red-600">
                        ₹{item.price}
                      </span>
                      <button
                        onClick={() => onAddToCart(item)}
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white p-2 rounded-full hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-110 active:scale-95 shadow-lg"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    {quantity > 0 && (
                      <div className="mt-3 bg-red-100 text-red-800 text-center py-2 rounded-lg font-semibold animate-scale-pulse">
                        {quantity} in cart
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
