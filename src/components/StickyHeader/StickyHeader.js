'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import UserCart from '../CartUser/CartUser';
import styles from './StickyHeader.module.css';
import { useState } from 'react';
import Link from 'next/link';

const StickyHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.wrap}>
          <button onClick={toggleCart} className={styles.cart}>
            Cart <FontAwesomeIcon icon={faCartShopping} /> 
          </button>
          
          <nav className={styles.navigation}>
            <Link href='/'>Main</Link>
            <Link href='/menu'>Menu</Link>
            <Link href='/about'>About me</Link>
          </nav>
        </div>
      </div>
      {isOpen && <UserCart setIsOpen={setIsOpen}/>}
    </header>
  );
};

export default StickyHeader;
