
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cartStore';

interface CartPreviewProps {
  show: boolean;
  onClose: () => void;
}

const CartPreview = ({ show, onClose }: CartPreviewProps) => {
  const navigate = useNavigate();
  const { items } = useCartStore();
  const [isVisible, setIsVisible] = useState(false);

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible) return null;

  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <div 
      className={`fixed inset-x-0 bottom-16 p-4 transition-all duration-300 z-50 ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-900 flex items-center">
              <ShoppingCart size={18} className="mr-2 text-primary-600" />
              Your Cart ({items.reduce((total, item) => total + item.quantity, 0)} items)
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="max-h-48 overflow-y-auto">
            {items.slice(0, 3).map((item) => (
              <div key={item.product.id} className="flex items-center py-2 border-b border-gray-100 last:border-0">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-12 h-12 object-cover rounded-md mr-3"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                  <p className="text-xs text-gray-500">{item.quantity} × ${item.product.price.toFixed(2)}</p>
                </div>
                <p className="text-sm font-bold text-primary-600 ml-2">
                  ${(item.quantity * item.product.price).toFixed(2)}
                </p>
              </div>
            ))}
            
            {items.length > 3 && (
              <p className="text-xs text-center text-gray-500 mt-2">
                +{items.length - 3} more items
              </p>
            )}
            
            {items.length === 0 && (
              <p className="text-sm text-center text-gray-500 py-4">
                Your cart is empty
              </p>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">Subtotal:</span>
                <span className="text-base font-bold text-primary-700">${totalPrice.toFixed(2)}</span>
              </div>
              
              <Button 
                onClick={handleViewCart}
                className="w-full bg-primary-600 hover:bg-primary-700"
              >
                View Cart & Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPreview;