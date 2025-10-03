import { CheckCircle, Home } from 'lucide-react';
import { CartItem } from '../types';

interface ConfirmationPageProps {
  orderId: string;
  cart: CartItem[];
  totalAmount: number;
  onNewOrder: () => void;
}

export default function ConfirmationPage({
  orderId,
  cart,
  totalAmount,
  onNewOrder,
}: ConfirmationPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
            <p className="text-green-100">Your order has been successfully placed</p>
          </div>

          <div className="p-8">
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 mb-6 text-center">
              <p className="text-red-100 text-sm mb-2">Your Order ID</p>
              <p className="text-5xl font-bold text-white tracking-wider font-mono">
                {orderId}
              </p>
              <p className="text-red-100 text-sm mt-4">
                Please note this ID for counter pickup
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-700">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                        {item.notes && ` • ${item.notes}`}
                      </p>
                    </div>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">Total Paid:</span>
                  <span className="text-3xl font-bold text-red-600">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-blue-900 mb-2">What's Next?</h4>
              <ul className="space-y-2 text-blue-800 text-sm">
                <li className="flex items-start">
                  <span className="font-bold mr-2">1.</span>
                  <span>Wait for your order ID to be announced at the counter</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2.</span>
                  <span>Show your Order ID ({orderId}) when collecting</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">3.</span>
                  <span>Enjoy your meal from St. Peter's Canteen!</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onNewOrder}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Place New Order</span>
            </button>
          </div>
        </div>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Thank you for ordering from St. Peter's Canteen
        </p>
      </div>
    </div>
  );
}
