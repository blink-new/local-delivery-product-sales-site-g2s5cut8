
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cartStore';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity } = useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    updateQuantity(productId, newQuantity);
    
    // Simulate network delay for UI feedback
    setTimeout(() => {
      setIsUpdating(false);
    }, 300);
  };

  if (items.length === 0) {
    return (
      <div className="page-container text-center py-10">
        <ShoppingBag className="mx-auto text-gray-300" size={64} />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">Add some products to your cart to see them here</p>
        <Button 
          onClick={() => navigate('/')}
          className="mt-6 bg-primary-600 hover:bg-primary-700"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div 
            key={item.product.id} 
            className="bg-white rounded-lg p-4 flex items-start gap-3 shadow-sm border border-gray-100"
          >
            <img 
              src={item.product.image} 
              alt={item.product.name} 
              className="w-20 h-20 object-cover rounded-md"
            />
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.product.name}</h3>
              <p className="text-primary-600 font-bold mt-1">${item.product.price.toFixed(2)}</p>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <button 
                    className="w-8 h-8 flex items-center justify-center rounded-l-md bg-gray-100 text-gray-600"
                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-50 text-sm">
                    {item.quantity}
                  </span>
                  <button 
                    className="w-8 h-8 flex items-center justify-center rounded-r-md bg-gray-100 text-gray-600"
                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  className="text-red-500 p-1"
                  onClick={() => removeItem(item.product.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">$3.99</span>
        </div>
        <div className="flex justify-between py-2 text-lg font-bold border-t border-gray-200 mt-2 pt-2">
          <span>Total</span>
          <span className="text-primary-700">${(totalPrice + 3.99).toFixed(2)}</span>
        </div>
      </div>
      
      <Button 
        className="w-full mt-6 bg-primary-600 hover:bg-primary-700"
        onClick={() => navigate('/checkout')}
        disabled={isUpdating}
      >
        Proceed to Checkout
        <ArrowRight className="ml-2" size={18} />
      </Button>
    </div>
  );
};

export default CartPage;