
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductById } from '../data/products';
import { useCartStore } from '../store/cartStore';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addItem);

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
    addToCart(product, quantity);
    navigate('/cart');
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
      <Link to="/" className="inline-block mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="-ml-2 text-gray-600"
        >
          <ChevronLeft size={20} />
          Back to Products
        </Button>
      </Link>

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
          
          <Button 
            className="w-full mt-6 bg-primary-600 hover:bg-primary-700"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2" size={18} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;