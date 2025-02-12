'use client';
import styles from './AddToCartButton.module.css'
import { useState } from "react";

const AddToCartButton = ({ itemId }) => {
  const [isDisabled, setisDisabled] = useState(false)
  const [buttonText, setbuttonText] = useState('Add in cart')  
  const handleAddToCart = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    try {
      setisDisabled(true)
      setbuttonText('Adding...')
      const response = await fetch('https://yakzh-cafe.vercel.app/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': userId,
        },
        body: JSON.stringify( {itemId: itemId} ),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Item added to cart:', data);
        setisDisabled(false)
        setbuttonText('Add in cart')
      } else {
        const errorData = await response.json();
        console.error('Failed to add item to cart:', errorData);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return <button className={styles.button} disabled={isDisabled} onClick={handleAddToCart}>{buttonText}</button>;
};

export default AddToCartButton;
