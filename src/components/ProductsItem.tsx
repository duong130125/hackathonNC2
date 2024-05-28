import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface Props {
  product: Product;
  selectedQuantity: number;
  handleQuantityChange: (productId: number, quantity: number) => void;
  addToCart: (product: Product) => void;
}

const ProductItem = ({ product, selectedQuantity, handleQuantityChange, addToCart }: Props) => {
  return (
    <div className="media product">
      <div className="media-left">
        <a href="#">
          <img className="media-object" src={product.imageUrl} alt={product.name} />
        </a>
      </div>
      <div className="media-body">
        <h4 className="media-heading">{product.name}</h4>
        <p>{product.description}</p>
        <input
          name={`quantity-product-${product.id}`}
          type="number"
          min={1}
          value={selectedQuantity}
          onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
        />
        <a onClick={() => addToCart(product)} className="price">
          {product.price} USD
        </a>
      </div>
    </div>
  );
};

export default ProductItem;
