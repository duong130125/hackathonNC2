import React, { useState, useEffect } from 'react';
import ListCart from './ListCart';
import ProductsItem from './ProductsItem';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Notification {
  message: string;
  type: 'success' | 'warning' | 'danger';
}

export default function ListProducts() {
  const [products] = useState<Product[]>([
    {
        id: 1,
        name: 'Pizza',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
        imageUrl: './src/images/pizza.jpg',
        price: 30,
        quantity: 1,
      },
      {
        id: 2,
        name: 'Hamburger',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
        imageUrl: './src/images/Hamburger.jpg',
        price: 15,
        quantity: 1,
      },
      {
        id: 3,
        name: 'Bread',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
        imageUrl: './src/images/bread.jpg',
        price: 20,
        quantity: 1,
      },
      {
        id: 4,
        name: 'Cake',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
        imageUrl: './src/images/cake.jpg',
        price: 10,
        quantity: 1,
      },
  ]);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [notification, setNotification] = useState<Notification | null>(null);
  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleQuantityChange = (productId: number, quantity: number) => {
    setSelectedQuantities((prevQuantities) => ({ ...prevQuantities, [productId]: quantity }));
  };

  const addToCart = (product: Product) => {
    const quantity = selectedQuantities[product.id] || 1;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { id: product.id, name: product.name, price: product.price, quantity }];
      }
    });

    setNotification({ message: 'Add to cart successfully', type: 'success' });
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h1 className="panel-title">List Products</h1>
            </div>
            <div className="panel-body" id="list-product">
              <div>
                {products.map((product) => (
                  <ProductsItem
                    key={product.id}
                    product={product}
                    selectedQuantity={selectedQuantities[product.id] || product.quantity}
                    handleQuantityChange={handleQuantityChange}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h1 className="panel-title">Your Cart</h1>
            </div>
            <div className="panel-body">
              <ListCart cartItems={cart} setCart={setCart} setNotification={setNotification} />
            </div>
          </div>
          {notification && (
            <div className={`alert alert-${notification.type}`} role="alert">
              {notification.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
