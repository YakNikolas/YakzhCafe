'use client'
import { useEffect } from 'react';

const UserId = () => {
  useEffect(() => {
    const initializeUser = () => {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem('userId', userId);
        console.log('New User ID Generated:', userId);
      } else {
        console.log('Existing User ID Found:', userId);
      }
    };

    initializeUser();
  }, []);

  return null;
};

export default UserId;
