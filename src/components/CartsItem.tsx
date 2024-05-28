import React from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartItemProps {
  item: CartItem;
  editCartItem: (id: number, quantity: number) => void;
  updateCartItem: (id: number, quantity: number) => void;
  deleteCartItem: (id: number) => void;
}

const CartItem = ({ item, editCartItem, updateCartItem, deleteCartItem }: CartItemProps) => {
  return (
    <tr>
      <th scope="row">1</th>
      <td>{item.name}</td>
      <td>{item.price} USD</td>
      <td>
        <input
          name={`cart-item-quantity-${item.id}`}
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => editCartItem(item.id, parseInt(e.target.value))}
        />
      </td>
      <td>
        <a
          className="label label-info update-cart-item"
          onClick={() => updateCartItem(item.id, item.quantity)}
        >
          Update
        </a>
        <a
          className="label label-danger delete-cart-item"
          onClick={() => deleteCartItem(item.id)}
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

export default CartItem;
