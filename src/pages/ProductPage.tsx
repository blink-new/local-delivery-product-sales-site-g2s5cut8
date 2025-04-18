
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductById } from '../data/products';
import { useCartStore } from '../store/cartStore';
import CartPreview from '../components/CartPreview';
import { toast } from 'react-hot-toast';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const [quantity, setQuantity] = useState(1);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const { addItem, items } = useCartStore();
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  if (!product) {
    return (
      <div className="page-container text-center py-10">
        <p className="text-gray-500">Product not found</p>
        <Button 
          onClick={() => navigate('/')}
          className="mt-4"
          variant="outline"
        >
          Back to Home
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
    setShowCartPreview(true);
    
    // Auto-hide cart preview after 4 seconds
    setTimeout(() => {
      setShowCartPreview(false);
    }, 4000);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="page-container slide-up">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="inline-block">
          <Button 
            variant="ghost" 
            size="sm" 
            className="-ml-2 text-gray-600"
          >
            <ChevronLeft size={20} />
            Back
          </Button>
        </Link>
        
        {cartItemCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative text-primary-600"
            onClick={() => setShowCartPreview(!showCartPreview)}
          >
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover"
        />
        
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-bold text-primary-600 mt-2">${product.price.toFixed(2)}</p>
          
          <div className="mt-4">
            <h2 className="text-sm font-medium text-gray-900">Description</h2>
            <p className="mt-1 text-gray-600">{product.description}</p>
          </div>
          
          <div className="mt-6 flex items-center">
            <span className="text-sm font-medium text-gray-900 mr-4">Quantity</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-gray-500"
                onClick={decreaseQuantity}
              >
                <Minus size={16} />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-gray-500"
                onClick={increaseQuantity}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2 mt-6">
            <Button 
              className="flex-1 bg-primary-600 hover:bg-primary-700"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2" size={18} />
              Add to Cart
            </Button>
            
            <Button 
              variant="outline"
              className="flex-1 border-primary-600 text-primary-600"
              onClick={() => navigate('/cart')}
            >
              View Cart
            </Button>
          </div>
        </div>
      </div>
      
      <CartPreview 
        show={showCartPreview} 
        onClose={() => setShowCartPreview(false)} 
      />
    </div>
  );
};

export default ProductPage;