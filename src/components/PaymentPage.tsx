import { useState, useEffect } from 'react';
import { QrCode, ExternalLink, CheckCircle } from 'lucide-react';
import { OrderContributor } from '../types';

interface PaymentPageProps {
  contributors: OrderContributor[];
  totalAmount: number;
  onPaymentComplete: () => void;
}

export default function PaymentPage({ contributors, totalAmount, onPaymentComplete }: PaymentPageProps) {
  const [paidContributors, setPaidContributors] = useState<Set<string>>(new Set());

  const canteenUpiId = 'stpeters.canteen@paytm';

  const generateUpiLink = (amount: number, note: string) => {
    return `upi://pay?pa=${canteenUpiId}&pn=St.Peters Canteen&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  };

  const togglePaid = (contributorId: string) => {
    const newPaid = new Set(paidContributors);
    if (newPaid.has(contributorId)) {
      newPaid.delete(contributorId);
    } else {
      newPaid.add(contributorId);
    }
    setPaidContributors(newPaid);
  };

  const allPaid = contributors.every((c) => paidContributors.has(c.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-red-900">Payment</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-red-700 rounded-full mt-2"></div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-lg p-6 mb-6">
          <div className="text-center">
            <p className="text-red-100 mb-2">Total Order Amount</p>
            <p className="text-5xl font-bold">₹{totalAmount}</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {contributors.map((contributor, index) => {
            const isPaid = paidContributors.has(contributor.id);
            const upiLink = generateUpiLink(
              contributor.amount,
              `Order payment - ${contributor.name}`
            );

            return (
              <div
                key={contributor.id}
                className="bg-white rounded-xl shadow-lg p-6 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {contributors.length > 1 ? `${contributor.name}'s Payment` : 'Your Payment'}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">UPI ID: {contributor.upiId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-red-600">₹{contributor.amount}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Pay to Canteen UPI ID:</p>
                  <p className="text-lg font-mono font-bold text-gray-800 bg-white px-3 py-2 rounded border-2 border-gray-200">
                    {canteenUpiId}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <a
                    href={upiLink}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Pay with UPI App</span>
                  </a>

                  <button
                    onClick={() => togglePaid(contributor.id)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                      isPaid
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>{isPaid ? 'Payment Confirmed' : 'Mark as Paid'}</span>
                  </button>
                </div>

                {isPaid && (
                  <div className="mt-4 bg-green-50 border-2 border-green-200 rounded-lg p-3 text-center">
                    <p className="text-green-700 font-semibold">Payment marked as complete</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-4">
            <QrCode className="w-12 h-12 text-red-600 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">
              Scan QR code from your UPI app or click the payment button above
            </p>
          </div>

          <button
            onClick={onPaymentComplete}
            disabled={!allPaid}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
              allPaid
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transform hover:scale-[1.02]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {allPaid ? 'Confirm Order' : 'Mark all payments as complete to proceed'}
          </button>
        </div>

        <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm text-center">
            <strong>Note:</strong> Please complete the payment before confirming. Your order will be
            processed once payment is verified.
          </p>
        </div>
      </div>
    </div>
  );
}
