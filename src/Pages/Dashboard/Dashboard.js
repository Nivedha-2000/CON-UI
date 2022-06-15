import React, { useEffect } from 'react';
import './Dashboard.css';
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar';
import Cookies from 'js-cookie';
import { configUrl } from '../../config';
export default function Dashboard() {

  const fin = () => {
    const q = Cookies.get('user');
    if (!q) {
      window.location.replace(configUrl.appUrl);
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
