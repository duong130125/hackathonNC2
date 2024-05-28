import React from 'react';
import CartsItem from './CartsItem';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ListCartProps {
  cartItems: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setNotification: React.Dispatch<React.SetStateAction<Notification | null>>;
}

interface Notification {
  message: string;
  type: 'success' | 'warning' | 'danger';
}

const ListCart = ({ cartItems, setCart, setNotification }: ListCartProps) => {

  const editCartItem = (id: number, quantity: number) => {
    setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
  };

  const updateCartItem = (id: number, quantity: number) => {
    editCartItem(id, quantity);
    setNotification({ message: 'Update successfully', type: 'warning' });
    setTimeout(() => setNotification(null), 2000);
  };

  const deleteCartItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    setNotification({ message: 'Delete successfully', type: 'danger' });
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <>
      <div className="panel-body">
        {cartItems.length === 0 ? (
          <div>Chưa có sản phẩm trong giỏ hàng</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="my-cart-body">
              {cartItems.map((item) => (
                <CartsItem
                  key={item.id}
                  item={item}
                  editCartItem={editCartItem}
                  updateCartItem={updateCartItem}
                  deleteCartItem={deleteCartItem}
                />
              ))}
            </tbody>
            <tfoot id="my-cart-footer">
              <tr>
                <td colSpan={4}>
                  There are <b>{cartItems.length}</b> items in your shopping cart.
                </td>
                <td colSpan={2} className="total-price text-left">
                  {cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )} USD
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </>
  );
};

export default ListCart;
