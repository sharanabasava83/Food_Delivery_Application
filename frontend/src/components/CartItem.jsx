import React from 'react';

/**
 * CartItem Component
 * Renders a single row in the shopping cart table.
 * 
 * Props:
 * - item: { id, foodId, name, price, quantity }
 * - onUpdateQty: function(itemId, newQty)
 * - onRemove: function(itemId)
 */
function CartItem({ item, onUpdateQty, onRemove }) {
  const lineTotal = item.price * item.quantity;

  return (
    <tr id={`cart-row-${item.id}`}>
      <td>
        <strong>{item.name}</strong>
      </td>
      <td>₹{Number(item.price).toFixed(2)}</td>
      <td>
        <div className="quantity-control">
          <button
            className="qty-btn"
            onClick={() => onUpdateQty(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="qty-val">{item.quantity}</span>
          <button
            className="qty-btn"
            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </td>
      <td>
        <strong>₹{lineTotal.toFixed(2)}</strong>
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
