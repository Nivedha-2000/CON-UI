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
  faBarcode, faShuttleVan, faLanguage, faA, faAddressCard
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
            <Menu defaultSelectedKeys={['1']} defaultActiveFirst={true} mode="inline" className='mb-5' >
              <SubMenu key="1" title="Administrator" icon={<img src={production} width="20" />} >
                <Menu.Item key="1-1" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/user-buyer-rights-master">
                    <span className='mx-2'> User Buyer Rights Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="1-2" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/menu-rights-master">
                    <span className='mx-2'> Menu Rights Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="1-3" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/menu-master">
                    <span className='mx-2'> Menu Master</span>
                  </NavLink>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="2" title="Quality Assurance" icon={<img src={QualityLogo} width="20" />} >
                <Menu.Item key="2-1" icon={<FontAwesomeIcon icon={faA} size="lg" />}>
                  <NavLink to="masters/audit-master">
                    <span className='mx-2'> Audit Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="2-2" icon={<FontAwesomeIcon icon={faAddressCard} size="lg" />}>
                  <NavLink to="masters/assignment-master">
                    <span className='mx-2'> Assignment Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="2-3" icon={<FontAwesomeIcon icon={faLanguage} size="lg" />}>
                  <NavLink to="masters/language-master">
                    <span className='mx-2'> Language Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="2-4" icon={<FontAwesomeIcon icon={faLanguage} size="lg" />}>
                  <NavLink to="masters/translation-master">
                    <span className='mx-2'> Defect Translation Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="1-5" icon={<FontAwesomeIcon icon={faShield} size="lg" />}>
                  <NavLink to="masters/defect-master">
                    <span className='mx-2'> Defect Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="1-6" icon={<FontAwesomeIcon icon={faToolbox} size="lg" />}>
                  <NavLink to="masters/parts-master">
                    <span className='mx-2'> Parts Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="1-7" icon={<FontAwesomeIcon icon={faHandHoldingHeart} size="lg" />}>
                  <NavLink to="masters/operation-master">
                    <span className='mx-2'> Operation Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="1-8" icon={<FontAwesomeIcon icon={faArrowsLeftRight} size="lg" />}>
                  <NavLink to="masters/sewingline-master">
                    <span className='mx-2'> Sewing Line Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="1-9" icon={<FontAwesomeIcon icon={faFlagCheckered} size="lg" />}>
                  <NavLink to="masters/aql-master">
                    <span className='mx-2'>AQL Master</span>
                  </NavLink>
                </Menu.Item>
                {/* <Menu.Item key="1-10" icon={<FontAwesomeIcon icon={faFlagCheckered} size="lg" />}>
                  <NavLink to="masters/aql-master-old">
                    <span className='mx-2'> AQL Master</span>
                  </NavLink>
                </Menu.Item> */}
                <Menu.Item key="1-11" icon={<FontAwesomeIcon icon={faFlagCheckered} size="lg" />}>
                  <NavLink to="masters/measurement-defects">
                    <span className='mx-2'>Measurement Defects</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="1-12" icon={<FontAwesomeIcon icon={faFlagCheckered} size="lg" />}>
                  <NavLink to="masters/session-master">
                    <span className='mx-2'>Session Master</span>
                  </NavLink>
                </Menu.Item>
               
              </SubMenu>

              <SubMenu key="3" title="Pre-Production " icon={<img src={production} width="20" />} >
                <Menu.Item key="3-1" icon={<FontAwesomeIcon icon={faHandHolding} size="lg" />}>
                  <NavLink to="masters/ftd-operation-master">
                    <span className='mx-2'> FTD Operation Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="3-2" icon={<FontAwesomeIcon icon={faBarcode} size="lg" />}>
                  <NavLink to="masters/stitch-type-master">
                    <span className='mx-2'> Stitch Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="3-3" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/pack-type-master">
                    <span className='mx-2'> Pack Type Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="3-4" icon={<FontAwesomeIcon icon={faShuttleVan} size="lg" />}>
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

              <SubMenu key="4" title="Product Development" icon={<img src={production} width="20" />} >
                <Menu.Item key="4-1" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/material-type-master">
                    <span className='mx-2'> Material Type Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-2" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/product-type-master">
                    <span className='mx-2'> Product Type Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-3" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/buyer-division-master">
                    <span className='mx-2'> Buyer Division Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-4" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/user-defined-type-master">
                    <span className='mx-2'> User Defined Type Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-5" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/user-defined-master">
                    <span className='mx-2'> User Defined Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-6" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/season-master">
                    <span className='mx-2'> Season Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-7" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/style-division-master">
                    <span className='mx-2'> Style Division Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-8" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/supplier-master-new">
                    <span className='mx-2'> Supplier Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-9" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/line-cost-master">
                    <span className='mx-2'> Line Cost Master</span>
                  </NavLink>
                </Menu.Item>

                <Menu.Item key="4-10" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/pdc-master">
                    <span className='mx-2'> PDC Master</span>
                  </NavLink>
                </Menu.Item>

                <Menu.Item key="4-11" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/material-group-master">
                    <span className='mx-2'> Material Group Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-12" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/buyer-product-type-master">
                    <span className='mx-2'> Buyer Product Type Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-13" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/size-master">
                    <span className='mx-2'> Size Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-14" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/role-master">
                    <span className='mx-2'> Role Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-15" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/hand-over-task-master">
                    <span className='mx-2'> HandOver Task Master</span>
                  </NavLink>
                </Menu.Item>

                <Menu.Item key="4-16" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/buyer-master">
                    <span className='mx-2'> Buyer Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-17" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/tna-master">
                    <span className='mx-2'> T&A Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-18" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/purpose-master">
                    <span className='mx-2'> Purpose Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-19" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/productivity-master">
                    <span className='mx-2'> Productivity Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-20" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/material-master">
                    <span className='mx-2'> Material Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-21" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/HSN">
                    <span className='mx-2'> HSN Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-22" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/material-group-master1">
                    <span className='mx-2'> Material Group Master</span>
                  </NavLink>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="5" title="Corporate Group" icon={<img src={production} width="20" />} >
                <Menu.Item key="5-1" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/location-master">
                    <span className='mx-2'> Location Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="5-2" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/business-group-master">
                    <span className='mx-2'> Business Group Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="5-3" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/corporate-group-master">
                    <span className='mx-2'> Corporate Group  Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="5-4" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/vertical-group-master">
                    <span className='mx-2'> Vertical Group  Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="5-5" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/project-master">
                    <span className='mx-2'> Project  Master</span>
                  </NavLink>
                </Menu.Item>

                <Menu.Item key="4-6" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/unit-master">
                    <span className='mx-2'> Unit Master</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4-7" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/company-master">
                    <span className='mx-2'> Company Master</span>
                  </NavLink>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="6" title="Production" className='mb-5' icon={<img src={production} width="20" />} >
                <Menu.Item key="6-1" icon={<FontAwesomeIcon icon={faFile} size="lg" />}>
                  <NavLink to="masters/off-standard-master">
                    <span className='mx-2'> OFF-Standard Master </span>
                  </NavLink>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content>
              <div className="site-layout-background" style={{ padding: '10px 10px' }}>
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    </>
  )
}
