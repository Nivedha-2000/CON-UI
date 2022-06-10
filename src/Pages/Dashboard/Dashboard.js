import React, { useEffect } from 'react';
import './Dashboard.css';
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Dashboard() {

  const fin = async () => {
    const q = await window.cookieStore.get('user');
    const q1 = await window.cookieStore.get('applicationConf');
    console.log("------------------>", q)
    console.log("------------------>", q1)
    if (!q) {
      window.location.replace('http://localhost');
    }
  }

  useEffect(() => {
    fin();
  }, []);

  return (
    <div className='dashboard-layout-main'>
      <Header />
      <Sidebar />
    </div>
  )
}
