import { useState } from 'react';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import MenuPage from './components/MenuPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import PaymentPage from './components/PaymentPage';
import ConfirmationPage from './components/ConfirmationPage';
import { User, CartItem, MenuItem, OrderContributor } from './types';

type Page = 'landing' | 'menu' | 'cart' | 'checkout' | 'payment' | 'confirmation';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [contributors, setContributors] = useState<OrderContributor[]>([]);
  const [orderId, setOrderId] = useState<string>('');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('landing');
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setCurrentPage('landing');
    setContributors([]);
    setOrderId('');
  };

  const handleAddToCart = (item: MenuItem) => {
    const existingItem = cart.find((ci) => ci.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity } : item)));
  };

  const handleRemoveItem = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const handleUpdateNotes = (itemId: string, notes: string) => {
    setCart(cart.map((item) => (item.id === itemId ? { ...item, notes } : item)));
  };

  const handleProceedToCheckout = () => {
    setCurrentPage('checkout');
  };

  const handleProceedToPayment = (contributorsList: OrderContributor[]) => {
    setContributors(contributorsList);
    setCurrentPage('payment');
  };

  const handlePaymentComplete = () => {
    const newOrderId = `ORD${Date.now().toString().slice(-8)}`;
    setOrderId(newOrderId);
    setCurrentPage('confirmation');
  };

  const handleNewOrder = () => {
    setCart([]);
    setContributors([]);
    setOrderId('');
    setCurrentPage('landing');
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'confirmation' && currentPage !== 'landing' && (
        <Header
          user={user}
          cartItemCount={cartItemCount}
          onLogout={handleLogout}
          onCartClick={() => setCurrentPage('cart')}
        />
      )}

      {currentPage === 'landing' && (
        <LandingPage
          userName={user.name}
          onStartOrdering={() => setCurrentPage('menu')}
        />
      )}

      {currentPage === 'menu' && (
        <MenuPage cart={cart} onAddToCart={handleAddToCart} />
      )}

      {currentPage === 'cart' && (
        <CartPage
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onUpdateNotes={handleUpdateNotes}
          onProceedToCheckout={handleProceedToCheckout}
          onBackToMenu={() => setCurrentPage('menu')}
        />
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage
          cart={cart}
          onProceedToPayment={handleProceedToPayment}
          onBackToCart={() => setCurrentPage('cart')}
        />
      )}

      {currentPage === 'payment' && (
        <PaymentPage
          contributors={contributors}
          totalAmount={totalAmount}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {currentPage === 'confirmation' && (
        <ConfirmationPage
          orderId={orderId}
          cart={cart}
          totalAmount={totalAmount}
          onNewOrder={handleNewOrder}
        />
      )}
    </div>
  );
}

export default App;
