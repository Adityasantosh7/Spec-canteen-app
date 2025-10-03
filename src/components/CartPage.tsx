import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onUpdateNotes: (itemId: string, notes: string) => void;
  onProceedToCheckout: () => void;
  onBackToMenu: () => void;
}

export default function CartPage({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateNotes,
  onProceedToCheckout,
  onBackToMenu,
}: CartPageProps) {
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
          <button
            onClick={onBackToMenu}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-red-900">Your Cart</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-red-700 rounded-full mt-2"></div>
        </div>

        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-6 animate-slide-up hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <p className="text-red-600 font-semibold text-xl mt-1">
                    ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-bold text-gray-800 min-w-[3rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <textarea
                value={item.notes || ''}
                onChange={(e) => onUpdateNotes(item.id, e.target.value)}
                placeholder="Add special instructions (optional)"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none resize-none"
                rows={2}
              />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 sticky bottom-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-gray-800">Total Amount:</span>
            <span className="text-3xl font-bold text-red-600">₹{totalAmount}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onBackToMenu}
              className="bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Add More Items
            </button>
            <button
              onClick={onProceedToCheckout}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
