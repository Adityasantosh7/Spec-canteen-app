import { useState, useEffect } from 'react';
import { QrCode, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { OrderContributor } from '../types';

interface PaymentPageProps {
  contributors: OrderContributor[];
  totalAmount: number;
  onPaymentComplete: () => void;
}

export default function PaymentPage({ contributors, totalAmount, onPaymentComplete }: PaymentPageProps) {
  const [currentContributorIndex, setCurrentContributorIndex] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'checking' | 'success' | 'failed'>('pending');
  const [paidContributors, setPaidContributors] = useState<Set<string>>(new Set());
  const [hasRedirected, setHasRedirected] = useState(false);

  const canteenUpiId = 'stpeters.canteen@paytm';
  const currentContributor = contributors[currentContributorIndex];

  const generateUpiLink = (amount: number, note: string) => {
    return `upi://pay?pa=${canteenUpiId}&pn=St.Peters Canteen&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  };

  useEffect(() => {
    if (!hasRedirected && currentContributor) {
      const upiLink = generateUpiLink(
        currentContributor.amount,
        `Order payment - ${currentContributor.name}`
      );

      setTimeout(() => {
        window.location.href = upiLink;
        setHasRedirected(true);
        setPaymentStatus('checking');
      }, 1000);
    }
  }, [currentContributor, hasRedirected]);

  const handlePaymentConfirm = (success: boolean) => {
    if (success) {
      const newPaid = new Set(paidContributors);
      newPaid.add(currentContributor.id);
      setPaidContributors(newPaid);

      if (currentContributorIndex < contributors.length - 1) {
        setCurrentContributorIndex(currentContributorIndex + 1);
        setPaymentStatus('pending');
        setHasRedirected(false);
      } else {
        setPaymentStatus('success');
      }
    } else {
      setPaymentStatus('failed');
    }
  };

  const handleRetryPayment = () => {
    setPaymentStatus('pending');
    setHasRedirected(false);
  };

  const allPaid = contributors.every((c) => paidContributors.has(c.id));

  if (allPaid && paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Payment Confirmed!</h1>
              <p className="text-green-100">All payments have been successfully completed</p>
            </div>

            <div className="p-8">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Summary</h3>
                <div className="space-y-3">
                  {contributors.map((contributor) => (
                    <div key={contributor.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{contributor.name}</span>
                      </div>
                      <span className="font-semibold text-gray-800">₹{contributor.amount}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t-2 border-green-200 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total Paid:</span>
                    <span className="text-3xl font-bold text-green-600">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onPaymentComplete}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-[1.02]"
              >
                Continue to Order Confirmation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

        {contributors.length > 1 && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Payment Progress</span>
              <span className="text-sm text-gray-600">
                {paidContributors.size} of {contributors.length} completed
              </span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(paidContributors.size / contributors.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {contributors.length > 1
                  ? `${currentContributor.name}'s Payment`
                  : 'Your Payment'}
              </h3>
              <p className="text-gray-600 text-sm mt-1">UPI ID: {currentContributor.upiId}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-red-600">₹{currentContributor.amount}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Pay to Canteen UPI ID:</p>
            <p className="text-lg font-mono font-bold text-gray-800 bg-white px-3 py-2 rounded border-2 border-gray-200">
              {canteenUpiId}
            </p>
          </div>

          {paymentStatus === 'pending' && (
            <div className="text-center py-4">
              <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-700 font-semibold mb-2">Redirecting to UPI app...</p>
              <p className="text-sm text-gray-600">Please complete the payment in your UPI app</p>
            </div>
          )}

          {paymentStatus === 'checking' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                <p className="text-blue-800 font-semibold mb-2">Did you complete the payment?</p>
                <p className="text-sm text-blue-700">Please confirm your payment status below</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handlePaymentConfirm(true)}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Payment Confirmed</span>
                </button>

                <button
                  onClick={() => handlePaymentConfirm(false)}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center space-x-2"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Payment Failed</span>
                </button>
              </div>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className="space-y-4">
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
                <XCircle className="w-12 h-12 text-red-600 mx-auto mb-2" />
                <p className="text-red-800 font-semibold mb-2">Payment Failed</p>
                <p className="text-sm text-red-700">
                  The payment could not be completed. Please try again.
                </p>
              </div>

              <button
                onClick={handleRetryPayment}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all"
              >
                Retry Payment
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm text-center">
            <strong>Note:</strong> You will be redirected to your UPI app automatically. Complete
            the payment and return to confirm.
          </p>
        </div>
      </div>
    </div>
  );
}
