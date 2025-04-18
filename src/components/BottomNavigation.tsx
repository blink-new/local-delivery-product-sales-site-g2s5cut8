
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, Clock } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const BottomNavigation = () => {
  const location = useLocation();
  const cartItems = useCartStore((state) => state.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bottom-nav bg-white">
      <Link to="/" className={`flex flex-col items-center p-1 ${isActive('/') ? 'text-primary-600' : 'text-gray-500'}`}>
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link to="/cart" className={`flex flex-col items-center p-1 relative ${isActive('/cart') ? 'text-primary-600' : 'text-gray-500'}`}>
        <ShoppingCart size={20} />
        {cartItemCount > 0 && (
          <span className="cart-badge">{cartItemCount}</span>
        )}
        <span className="text-xs mt-1">Cart</span>
      </Link>
      
      <Link to="/orders" className={`flex flex-col items-center p-1 ${isActive('/orders') ? 'text-primary-600' : 'text-gray-500'}`}>
        <Clock size={20} />
        <span className="text-xs mt-1">Orders</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;