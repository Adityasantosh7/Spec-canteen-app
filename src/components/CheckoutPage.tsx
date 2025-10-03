import { useState } from 'react';
import { Users, Plus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem, OrderContributor } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  onProceedToPayment: (contributors: OrderContributor[]) => void;
  onBackToCart: () => void;
}

export default function CheckoutPage({ cart, onProceedToPayment, onBackToCart }: CheckoutPageProps) {
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [enableSplit, setEnableSplit] = useState(false);
  const [contributors, setContributors] = useState<OrderContributor[]>([
    {
      id: '1',
      name: '',
      amount: totalAmount,
      upiId: '',
      paid: false,
    },
  ]);

  const handleAddContributor = () => {
    const newContributor: OrderContributor = {
      id: Date.now().toString(),
      name: '',
      amount: 0,
      upiId: '',
      paid: false,
    };
    setContributors([...contributors, newContributor]);
  };

  const handleRemoveContributor = (id: string) => {
    if (contributors.length > 1) {
      setContributors(contributors.filter((c) => c.id !== id));
    }
  };

  const handleUpdateContributor = (id: string, field: keyof OrderContributor, value: string | number) => {
    setContributors(
      contributors.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      )
    );
  };

  const totalSplitAmount = contributors.reduce((sum, c) => sum + Number(c.amount), 0);
  const isValidSplit = Math.abs(totalSplitAmount - totalAmount) < 0.01;

  const handleProceed = () => {
    if (!enableSplit) {
      onProceedToPayment([{ ...contributors[0], amount: totalAmount }]);
    } else if (isValidSplit) {
      onProceedToPayment(contributors);
    }
  };

  const canProceed = enableSplit
    ? isValidSplit && contributors.every((c) => c.name && c.upiId && c.amount > 0)
    : contributors[0].name && contributors[0].upiId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-red-900">Checkout</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-red-700 rounded-full mt-2"></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-700">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">Total:</span>
              <span className="text-3xl font-bold text-red-600">₹{totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-bold text-gray-800">Group Ordering</h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableSplit}
                onChange={(e) => {
                  setEnableSplit(e.target.checked);
                  if (!e.target.checked) {
                    setContributors([contributors[0]]);
                  }
                }}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="space-y-4">
            {contributors.map((contributor, index) => (
              <div
                key={contributor.id}
                className="border-2 border-gray-200 rounded-lg p-4 animate-slide-up"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-gray-700">
                    {enableSplit ? `Contributor ${index + 1}` : 'Your Details'}
                  </span>
                  {enableSplit && contributors.length > 1 && (
                    <button
                      onClick={() => handleRemoveContributor(contributor.id)}
                      className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={contributor.name}
                    onChange={(e) =>
                      handleUpdateContributor(contributor.id, 'name', e.target.value)
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="UPI ID (e.g., user@paytm)"
                    value={contributor.upiId}
                    onChange={(e) =>
                      handleUpdateContributor(contributor.id, 'upiId', e.target.value)
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                  />
                  {enableSplit && (
                    <input
                      type="number"
                      placeholder="Amount to pay"
                      value={contributor.amount || ''}
                      onChange={(e) =>
                        handleUpdateContributor(contributor.id, 'amount', Number(e.target.value))
                      }
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                    />
                  )}
                </div>
              </div>
            ))}

            {enableSplit && (
              <>
                <button
                  onClick={handleAddContributor}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Contributor</span>
                </button>

                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700">Total Split Amount:</span>
                    <span className={`font-bold ${isValidSplit ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{totalSplitAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Order Total:</span>
                    <span className="font-bold text-gray-800">₹{totalAmount.toFixed(2)}</span>
                  </div>
                  {!isValidSplit && (
                    <p className="text-red-600 text-sm mt-2 font-semibold">
                      Split amounts must equal the total order amount
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onBackToCart}
            className="bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Back to Cart
          </button>
          <button
            onClick={handleProceed}
            disabled={!canProceed}
            className={`py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
              canProceed
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Proceed to Payment</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
