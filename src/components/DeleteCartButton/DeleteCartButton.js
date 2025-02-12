'use client';
import styles from './DeleteCartButton.module.css'

import { useState } from "react";

const DeleteCartButton = ({setIsOpen}) => {
  const [isDisabled, setisDisabled] = useState(false)
  const [buttonText, setbuttonText] = useState('Delete all cart')  
  const handleDeleteCart = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    try {
      setisDisabled(true)
      setbuttonText('Deletion')
      const response = await fetch('api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': userId,
        },
        body: JSON.stringify({deleteAll: true})
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Cart deleted: ', data);
        setisDisabled(false)
        setbuttonText('Delete cart');
        setIsOpen(false)
      } else {
        const errorData = await response.json();
        console.error('Failed to delete cart:', errorData);
      }
    } catch (error) {
      console.error('Error delition cart:', error);
    }
  };

  return <button className={styles.button} disabled={isDisabled} onClick={handleDeleteCart}>{buttonText}</button>;
};

export default DeleteCartButton;
