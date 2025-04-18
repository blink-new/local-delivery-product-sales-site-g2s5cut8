
import { Product } from '../store/cartStore';

export const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Organic Vegetables Box',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'A selection of fresh, locally grown organic vegetables. Perfect for a healthy week of meals.',
    category: 'vegetables'
  },
  {
    id: '2',
    name: 'Artisan Sourdough Bread',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Freshly baked artisan sourdough bread made with organic flour and traditional methods.',
    category: 'bakery'
  },
  {
    id: '3',
    name: 'Free-Range Eggs (Dozen)',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Farm-fresh free-range eggs from locally raised hens fed with organic feed.',
    category: 'dairy'
  },
  {
    id: '4',
    name: 'Organic Honey (16oz)',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Pure, unfiltered local honey harvested from our own beehives. Rich in flavor and nutrients.',
    category: 'pantry'
  },
  {
    id: '5',
    name: 'Fresh Berries Mix',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1563746924237-f81657aaf4af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'A delicious mix of fresh seasonal berries - strawberries, blueberries, and raspberries.',
    category: 'fruits'
  },
  {
    id: '6',
    name: 'Grass-Fed Ground Beef (1lb)',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Premium grass-fed ground beef from local farms. No antibiotics or hormones.',
    category: 'meat'
  },
  {
    id: '7',
    name: 'Organic Avocados (4 pack)',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Perfectly ripe organic avocados, ready to eat or use in your favorite recipes.',
    category: 'fruits'
  },
  {
    id: '8',
    name: 'Artisan Cheese Selection',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'A selection of handcrafted artisan cheeses from local dairies. Perfect for a cheese board.',
    category: 'dairy'
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'fruits', name: 'Fruits' },
  { id: 'bakery', name: 'Bakery' },
  { id: 'dairy', name: 'Dairy' },
  { id: 'meat', name: 'Meat' },
  { id: 'pantry', name: 'Pantry' }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === 'all') return products;
  return products.filter(product => product.category === categoryId);
};