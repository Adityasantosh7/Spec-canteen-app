export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

export interface User {
  name: string;
  rollNumber: string;
  phone: string;
}

export interface OrderContributor {
  id: string;
  name: string;
  amount: number;
  upiId: string;
  paid: boolean;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  user: User;
  totalAmount: number;
  contributors: OrderContributor[];
  timestamp: number;
  status: 'pending' | 'confirmed';
}
