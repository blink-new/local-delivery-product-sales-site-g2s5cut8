
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products, categories } from '../data/products';
import { useCartStore } from '../store/cartStore';
import CartPreview from '../components/CartPreview';
import { toast } from 'react-hot-toast';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCartPreview, setShowCartPreview] = useState(false);
  const { addItem, items } = useCartStore();
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const filteredProducts = products
    .filter(product => 
      activeCategory === 'all' || product.category === activeCategory
    )
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleAddToCart = (product: typeof products[0]) => {
    addItem(product);
    toast.success(`Added ${product.name} to cart`);
    setShowCartPreview(true);
    
    // Auto-hide cart preview after 4 seconds
    setTimeout(() => {
      setShowCartPreview(false);
    }, 4000);
  };

  return (
    <div className="page-container">
      <header className="mb-6 relative">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-700 mb-2">Local Fresh Market</h1>
          
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
        <p className="text-gray-600">Fresh products delivered to your door</p>
        
        <div className="relative mt-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </header>

      <div className="categories-scroll mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-2 w-max">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={`whitespace-nowrap ${
                activeCategory === category.id 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700'
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <ShoppingBag className="mx-auto text-gray-300" size={48} />
          <p className="mt-4 text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <Link to={`/product/${product.id}`}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-image w-full"
                />
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{product.name}</h3>
                  <p className="text-primary-600 font-bold mt-1">${product.price.toFixed(2)}</p>
                </div>
              </Link>
              <div className="px-3 pb-3">
                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full text-xs bg-primary-600 hover:bg-primary-700"
                  size="sm"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <CartPreview 
        show={showCartPreview} 
        onClose={() => setShowCartPreview(false)} 
      />
    </div>
  );
};

export default HomePage;