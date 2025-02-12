'use client';
import styles from './CartUser.module.css';
import { useEffect, useState } from 'react';
import DeleteCartButton from '../DeleteCartButton/DeleteCartButton';
import CartItem from '../CartItem/CartItem';
import Loader from "../Loader/Loader";

const UserCart = ({ setIsOpen }) => {
  const [cartItems, setCartItems] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [totalBill, setTotalBill] = useState('0');
  const [name,setName] = useState('');
  const [tel,setTel] = useState('');
  const [comment,setComment] = useState('');
  const [loading,setLoading] = useState(false);
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          setLoading(true);
          const responce = await fetch('api/sendToTelegram',{
              method: 'POST',
              headers: { 
                  'Content-Type': 'application/json',
                  'X-User-ID': userId,
               },
              body: JSON.stringify({
                  name: name,
                  phone: tel,
                  comment: comment})
          })
          if (responce.ok) {
              setName('');
              setTel('')
              setComment('');
              setLoading(false);
              setIsOpen(false);
          }
      } catch (error) {
          console.error('Ошибка:', error);
          alert('Ошибка отправки');
          setLoading(false);
      }
  }
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }

        const response = await fetch('/api/cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-User-ID': userId,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const itemsData = data.items || [];
          setTotalBill(data.totalBill)
          setCartItems(itemsData);
        } 
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCart();
  }, [updateData]);


  if (cartItems.length === 0) {
    return (
      <div className={styles.overlay} onClick={() => setIsOpen(false)}>
        <div className={styles.wrap} onClick={(e) => e.stopPropagation()}>
          <h3 className={styles.title}>Your cart is empty.</h3>
          <button className={styles.closeButton} onClick={() => setIsOpen(false)}>X</button>
        </div>
      </div>
    );
  }



  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
        <div className={styles.wrap} onClick={(e) => e.stopPropagation()}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Your cart</h2>
            <h3>{userId}</h3>
            <button className={styles.closeButton} onClick={() => setIsOpen(false)}>X</button>
          <div className='flex flex-col'>
          <label className={styles.label}> Enter your name
                <input
                maxLength={20} 
                placeholder="Name"
                className={styles.input}
                type="text"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                required
                >
                </input>
            </label>
            <label className={styles.label}> Enter your phone
                <input 
                maxLength={10}
                placeholder="Phone"
                className={styles.input}                
                type="tel"
                value={tel}
                onChange={(e)=>{setTel(e.target.value)}}
                required
                ></input>
            </label>
          <div className={styles.cart}>
              <ul className={styles.cart_list}>
                {cartItems.map((item) => (<CartItem key={item.id} item={item} setUpdateData={setUpdateData}></CartItem>))}
              </ul>
              <span className={styles.totalBill}> Total: {totalBill}$</span>
              <label className={styles.label}> Comment
                <textarea
                
                placeholder="Comment"
                className={styles.input} 
                value={comment}
                onChange={(e)=>{setComment(e.target.value)}}
                ></textarea>
            </label>
            <div className={styles.buttons}>
              <DeleteCartButton setIsOpen={setIsOpen}/>
              <button className={styles.button} type="submit"> {(loading) ? <Loader></Loader> : 'Make an order'  }</button>
            </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCart;
