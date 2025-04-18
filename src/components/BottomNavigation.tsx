
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, Clock } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Badge } from '@/components/ui/badge';

const BottomNavigation = () => {
  const location = useLocation();
  const cartItems = useCartStore((state) => state.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bottom-nav bg-white">
      <Link to="/" className={`flex flex-col items-center p-1 ${isActive('/') ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link to="/cart" className={`flex flex-col items-center p-1 relative ${isActive('/cart') ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
        <div className="relative">
          <ShoppingCart size={20} />
          {cartItemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center p-0 text-[10px] bg-primary-600">
              {cartItemCount}
            </Badge>
          )}
        </div>
        <span className="text-xs mt-1">
          {cartItemCount > 0 ? `$${cartTotal}` : 'Cart'}
        </span>
      </Link>
      
      <Link to="/orders" className={`flex flex-col items-center p-1 ${isActive('/orders') ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
        <Clock size={20} />
        <span className="text-xs mt-1">Orders</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;