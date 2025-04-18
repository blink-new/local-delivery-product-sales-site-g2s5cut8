
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'out-for-delivery' | 'delivered';
  total: number;
  items: number;
}

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching orders
    const savedOrders = localStorage.getItem('orders');
    
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    
    setLoading(false);
  }, []);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'out-for-delivery':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="page-container text-center py-10">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="page-container text-center py-10">
        <Package className="mx-auto text-gray-300" size={64} />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">No orders yet</h2>
        <p className="mt-2 text-gray-500">Your order history will appear here</p>
        <Button 
          onClick={() => navigate('/')}
          className="mt-6 bg-primary-600 hover:bg-primary-700"
        >
          <ShoppingBag className="mr-2" size={18} />
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Order #{order.id}</p>
                <p className="font-medium mt-1">{order.date}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status.replace(/-/g, ' ')}
              </span>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
              <div>
                <p className="text-sm text-gray-500">{order.items} items</p>
                <p className="font-bold text-primary-700">${order.total.toFixed(2)}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs"
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;