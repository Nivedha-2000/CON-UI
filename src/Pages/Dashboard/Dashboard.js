import React from 'react';
import './Dashboard.css';
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Dashboard() {

  return (
    <div className='dashboard-layout-main'>
      <Header />
      <Sidebar />
    </div>
  )
}
