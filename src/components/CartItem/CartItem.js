'use client';
import styles from './CartItem.module.css';
import { useState } from 'react';

const CartItem = ({ item, setUpdateData }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(item.quantity);

  const updateQuantity = async (quantityChange) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    try {
      setIsDisabled(true);

      const method = quantityChange > 0 ? 'POST' : 'DELETE';

      const response = await fetch('https://yakzh-cafe.vercel.app/api/cart', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': userId,
        },
        body: JSON.stringify( {itemId: item.id} ),
      });

      if (response.ok) {
        setItemQuantity((prevQuantity) => prevQuantity + quantityChange);
        const data = await response.json();
        console.log('Cart updated:', data);
      } else {
        const errorData = await response.json();
        console.error('Failed to update cart:', errorData);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setUpdateData((prev) => !prev);
      setIsDisabled(false);
    }
  };

  return (
    <li className={styles.cartItem}>
      <span className={styles.name}>{item.name}</span>
      <span className={styles.price}>{item.price}$</span>
      <div className={styles.counter}>
        <button className={styles.minus} onClick={() => updateQuantity(-1)} disabled={isDisabled}>
          -
        </button>

        <span>{itemQuantity}</span>
        <button className={styles.plus} onClick={() => updateQuantity(1)} disabled={isDisabled}>
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
