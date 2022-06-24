import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import './Sidebar.css';
import MenuIcon from '../../Assets/icons/menu.png';
import { NavLink, Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import Dashboard from '../../Assets/icons/dashboard.png';
import ForeCasting from '../../Assets/icons/forecasting.png';
import Styling from '../../Assets/icons/styling.png';
import Tax from '../../Assets/icons/tax.png';
import ItemGrid from '../../Assets/icons/grid.png';
import ItemCreation from '../../Assets/icons/creation.png';
import Costing from '../../Assets/icons/costing.png';
import HandOver from '../../Assets/icons/handover.png';
import Scheduler from '../../Screens/Scheduler/Scheduler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressBook,
  faAbacus,
  faCalculator,
  faTableColumns,
  faBug,
  faChartLine,
  faFile,
  faShield,
  faToolbox,
  faHandHolding,
  faHandHoldingHeart,
  faArrowsLeftRight,
  faFlagCheckered,
  faBarcode, faShuttleVan
} from '@fortawesome/free-solid-svg-icons';
import QualityLogo from '../../Assets/images/QualityLogo.png';
import Configuration from '../../Assets/images/ConfigurationApp.png';
import production from '../../Assets/images/ProductDevelopment.png';


export default function Sidebar() {

  let navigate = useNavigate();

  const { Sider, Content } = Layout;
  const { SubMenu } = Menu;

  const [collapse, setCollapse] = useState(false);

  const onCollapse = () => {
    // if(!collapse){
    //   setCollapse(false);
    // }
    !collapse ? setCollapse(true) : setCollapse(false)
  }

  return (
    <>
      <div className='sidebar-main'>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapse} trigger={null} onCollapse={onCollapse} width="250">
            <div className='mx-4 my-3 logo' onClick={onCollapse}>
              <img src={MenuIcon} className="mx-1" width="25" />
              <span className='px-3'>Menu</span>
            </div>
            {/* <Menu className='mx-4 my-3 logo' onClick={onCollapse}>
              <Menu.Item icon={<img src={MenuIcon} className="mx-1" width="25"  />}>
                <NavLink to="/dashboard">
                  <span className='mx-2'>Menu</span>
                </NavLink>
              </Menu.Item>
            </Menu> */}
            <Menu defaultSelectedKeys={['1']} defaultActiveFirst={true} mode="inline" >
              <SubMenu key="1" title="Quality Assurance" icon={<img src={QualityLogo} width="20" />} >
                <Menu.Item key="1-1" icon={<FontAwesomeIcon icon={faShield} size="lg" />}>
                  <NavLink to="masters/defect-master">
                    <span className='mx-2'> Defect Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="1-2" icon={<FontAwesomeIcon icon={faToolbox} size="lg" />}>
                  <NavLink to="masters/parts-master">
                    <span className='mx-2'> Parts Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="1-3" icon={<FontAwesomeIcon icon={faHandHoldingHeart} size="lg" />}>
                  <NavLink to="masters/operation-master">
                    <span className='mx-2'> Operation Master</span>
                  </NavLink>
                </Menu.Item>
                {/* <Menu.Item key="1-31" icon={<FontAwesomeIcon icon={faHandHolding} size="lg" />}>
                  <NavLink to="masters/ftd-operation-master">
                    <span className='mx-2'> FTD Operation Master</span>
                  </NavLink>
                </Menu.Item> */}
                <Menu.Item key="1-4" icon={<FontAwesomeIcon icon={faArrowsLeftRight} size="lg" />}>
                  <NavLink to="masters/sewingline-master">
                    <span className='mx-2'> Sewing Line Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="1-5" icon={<FontAwesomeIcon icon={faFlagCheckered} size="lg" />}>
                  <NavLink to="masters/aql-master">
                    <span className='mx-2'> AQL Master</span>
                  </NavLink>
                </Menu.Item>
                 {/* <Menu.Item key="1-42" icon={<FontAwesomeIcon icon={faBarcode} size="lg" />}>
                  <NavLink to="masters/stitch-type-master">
                    <span className='mx-2'> Stitch Master</span>
                  </NavLink>
                </Menu.Item> */}
              </SubMenu>
              {/* <SubMenu key="4" icon={<FontAwesomeIcon icon={faFile} size="lg" />} title={
                <span className='mx-2'>Masters</span>
              }>
                <Menu.Item key="4-1" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/defect-master">
                    <span className='mx-2'> Defect Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-2" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/parts-master">
                    <span className='mx-2'> Parts Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-3" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/operation-master">
                    <span className='mx-2'> Operation Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-4" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/sewingline-master">
                    <span className='mx-2'> Sewing Line Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-5" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/aql-master">
                    <span className='mx-2'> AQL Master</span>
                  </NavLink>
                </Menu.Item>
              </SubMenu> */}
              {/* <Menu.Item key="1" icon={<FontAwesomeIcon icon={faTableColumns} />}>
                <NavLink to="home">
                  <span className='mx-2'>Quality</span>
                </NavLink>
              </Menu.Item> */}


              <SubMenu key="2" title="Pre-Production " icon={<img src={production} width="20" />} >
                <Menu.Item key="2-31" icon={<FontAwesomeIcon icon={faHandHolding} size="lg" />}>
                  <NavLink to="masters/ftd-operation-master">
                    <span className='mx-2'> FTD Operation Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="2-42" icon={<FontAwesomeIcon icon={faBarcode} size="lg" />}>
                  <NavLink to="masters/stitch-type-master">
                    <span className='mx-2'> Stitch Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="1-32" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/pack-type-master">
                    <span className='mx-2'> Pack Type Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="2-43" icon={<FontAwesomeIcon icon={faShuttleVan} size="lg" />}>
                  <NavLink to="masters/shipment-tolerance-master">
                    <span className='mx-2'> Shipment Tolerance Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="2-5" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/transit-master">
                    <span className='mx-2'> Transit Master</span>
                  </NavLink>
                </Menu.Item>
              </SubMenu>


              <SubMenu key="3" title="Product Development" icon={<img src={production} width="20" />} >
              <Menu.Item key="3-1" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/material-type-master">
                    <span className='mx-2'> Material Type Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="3-2" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/product-type-master">
                    <span className='mx-2'> Product Type Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="3-3" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/buyer-division-master">
                    <span className='mx-2'> Buyer Division Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="3-4" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/user-defined-type-master">
                    <span className='mx-2'> User Defined Type Master</span>
                  </NavLink>
                </Menu.Item>   
                <Menu.Item key="3-5" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/user-defined-master">
                    <span className='mx-2'> User Defined Master</span>
                  </NavLink>
                </Menu.Item>         
                <Menu.Item key="3-6" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/season-master">
                    <span className='mx-2'> Season Master</span>
                  </NavLink>
                </Menu.Item>     
                <Menu.Item key="3-7" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/style-division-master">
                    <span className='mx-2'> Style Division Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="3-8" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/supplier-master">
                    <span className='mx-2'> Supplier Master</span>
                  </NavLink>
                </Menu.Item> 
                <Menu.Item key="3-9" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/hs-code-master">
                    <span className='mx-2'> HS Code Master</span>
                  </NavLink>
                </Menu.Item> 
                <Menu.Item key="3-10" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/line-cost-master">
                    <span className='mx-2'> Line Cost Master</span>
                  </NavLink>
                </Menu.Item>             
                <Menu.Item key="3-11" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/sub-product-type-master">
                    <span className='mx-2'> Sub Product Type Master</span>
                  </NavLink>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="4" title="Corporate Group" icon={<img src={production} width="20" />} >
              <Menu.Item key="4-1" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/location-master">
                    <span className='mx-2'> Location Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-2" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/business-group-master">
                    <span className='mx-2'> Business Group Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-3" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/corporate-group-master">
                    <span className='mx-2'> Corporate Group  Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-4" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/vertical-group-master">
                    <span className='mx-2'> Vertical Group  Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-5" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="/dashboard/masters/project-master">
                    <span className='mx-2'> Project  Master</span>
                  </NavLink>
                </Menu.Item>
              </SubMenu>

              {/* <Menu.Item key="3" icon={<img src={production} alt="" width="20" />}>
                <NavLink to="/dashboard/external-audit">
                  <span className='mx-2'>Product Development</span>
                </NavLink>
              </Menu.Item> */}
              {/* <Menu.Item key="2" icon={
                <img src={Configuration} alt="" width="20" />
              }>
                <NavLink to="/dashboard/scheduler">
                  <span className='mx-1'>User Defined</span>
                </NavLink>
              </Menu.Item> */}

              {/* <Menu.Item key="3" icon={<img src={ForeCasting} alt="" width="25" />}>
                <NavLink to="/dashboard/scheduler-02">
                  <span className='mx-2'>Scheduler 02</span>
                </NavLink>
              </Menu.Item> */}
              {/* <Menu.Item key="2" icon={<img src={ForeCasting} width="25" />}>
      <span className='mx-2'>Forecasting</span>
    </Menu.Item>
    <Menu.Item key="3" icon={<img src={Styling} width="25" />}>
      <span className='mx-2'>Styling</span>
    </Menu.Item>
    <Menu.Divider />

    <SubMenu key="4" icon={<img src={Tax} width="25" />} title={
      <span className='mx-2'>T&A Information</span>
    }>

    </SubMenu> */}
              {/* <Menu.Item >
      <span className='mx-2'>T&A Information</span>
    </Menu.Item> */}
              {/* <Menu.Item key="5" icon={<img src={ItemGrid} width="25" />}>
      <span className='mx-2'>Item Master Grid</span>
    </Menu.Item>
    <Menu.Item key="6" icon={<img src={ItemCreation} width="25" />}>
      <span className='mx-2'>Item Creation</span>
    </Menu.Item>
    <Menu.Item key="7" icon={<img src={Costing} width="25" />}>
      <span className='mx-2'>Costing</span>
    </Menu.Item>
    <Menu.Item key="8" icon={<img src={HandOver} width="25" />}>
      <span className='mx-2'>Handover</span>
    </Menu.Item> */}
              {/* <SubMenu key="sub1" title="User">
      <Menu.Item key="3">Tom</Menu.Item>
      <Menu.Item key="4">Bill</Menu.Item>
      <Menu.Item key="5">Alex</Menu.Item>
    </SubMenu>
    <SubMenu key="sub2" title="Team">
      <Menu.Item key="6">Team 1</Menu.Item>
      <Menu.Item key="8">Team 2</Menu.Item>
    </SubMenu> */}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content>
              <div className="site-layout-background" style={{ padding: '10px 10px' }}>
                <Outlet />
                {/* <Routes>
                  <Route path="scheduler" element={<Scheduler />} />
                </Routes> */}
              </div>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
          </Layout>
        </Layout>
      </div>
    </>
  )
}
