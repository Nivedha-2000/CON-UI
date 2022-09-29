import React, { useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faArrowLeft, faSignOut, faCog, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../../Assets/images/avatar.png';
import SearchIcon from '../../Assets/icons/search.svg';
import { Drawer, message, Popover } from 'antd';
import DrawerLogo from '../../Assets/images/loginLogo.png';
import Quality from '../../Assets/images/quality.svg';
import Product from '../../Assets/images/product.svg';
import Configuration from '../../Assets/images/configuration.svg';
import HeaderLogo from '../../Assets/images/iThreadLogo.png';
import QualityLogo from '../../Assets/images/QualityLogo.png';
import ConfigurationLogo from '../../Assets/images/ConfigurationApp.png';
import { useEffect } from 'react';
import { ItrApiService, ItrAuthService } from '@afiplfeed/itr-ui';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { configUrl } from '../../config';


export default function Header() {

  const navigate = useNavigate();


  const [visible, setVisible] = useState(false);
  const [userApps, setUserApps] = useState([]);
  const [shProfileCard, setshProfileCard] = useState(false);
  const [searchclass, setsearchclass] = useState("");

  const showhideProfileCard = async () => {
    setshProfileCard(value => !value);
  }


  const showDrawer = () => {
    setVisible(true);
    ItrApiService.userApp().then(res => {
      if (res.Success == true) {
        setUserApps(res.data);
      }
      else {
        message.warning(res.message);
      }
    })
  };
  const onClose = () => {
    setVisible(false);
  };

  const [userProfile, setUserProfile] = useState({});

  const userAppIcons = {
    icons: Product,
    icons: Configuration,
    icons: Quality
  }

  const [dt, setDt] = useState(new Date().toLocaleString());

  // get-parts-name
  const [LocationData, setLocationData] = useState([]);
  const [locationCode, setLocationCode] = useState();

  const getUserLocations = () => {
    ItrApiService.UserLocation({
      url: 'Platform/UserLocations',
      appCode: 'ENAPP004'
    }).then(res => {
      if (res.Success == true) {
        setLocationData(res.data);
      }
    })
  }

  const [appCode, setAppCode] = useState('');
  const changeLocation = (code) => {
    ItrApiService
    ItrApiService.UserLocationChange({
      data: {
        locationCode: code
      },
      appCode: appCode,
    }).then(res => {
      if (res.Success == true) {
        message.success('Location Changed Successfully');
      }
      else {
      }
    })
  }

  useEffect(() => {
    const myTimeout = setTimeout(() => {

      let getAppCode = sessionStorage.getItem('appCode');
      setAppCode(getAppCode);
      getUserLocations();
      ItrApiService.userProfile().then(res => {
        console.log(res);
        if (res.Success == true) {
          setLocationCode(res.data.locationCode);
          setUserProfile(res.data);
        }
        else {
          message.warning(res.message);
        }
      });

      let secTimer = setInterval(() => {
        setDt(new Date().toLocaleString())
      }, 1000);

      return () => clearInterval(secTimer);
    }, 2000)

  }, []);


  const SearchBox_Event = name => (e) => {
    let value = e.target.value;
    if (value.length > 0) setsearchclass("search-box-forms");
    else setsearchclass("");
  }

  const logOut = async () => {
    let result = await ItrAuthService.logout();
    if (result.Success == true) {
      sessionStorage.clear();
      window.location.href = configUrl().appUrl;
      message.success('Logout Successfully');
    }
    else if (result.Success == false) {
      message.success(result.message);
      // sessionStorage.clear();
    }
  }

  // const [swi,setSwi] = useState(true);

  return (

    <>
      <div class="main-header sticky side-header nav nav-item">
        <div class="container-fluid">
          <div class="main-header-left ">
            <ul class="nav nav-item  navbar-nav-right ms-auto" style={{ "width": "250px" }}>
              <li class="dropdown main-profile-menu nav nav-item nav-link">
                <a class="profile-user d-flex">
                  <img src={HeaderLogo} alt="" onClick={showDrawer} />
                  <div class="ms-2 my-auto">
                    <h6>iThred</h6>
                    <span>Configuration</span>
                  </div>
                  <i class="angle fe fe-chevron-down"></i>
                </a>
              </li>
            </ul>
            <div class="main-header-center ms-4 d-sm-none d-md-none d-lg-block">
              <input class={`form-control ${searchclass}`} placeholder="Search With Keywords" type="search" name='search' onChange={SearchBox_Event("search")} />
              <button class="btn">
                <i class="fas fa-search d-none d-md-block"></i>
              </button>
            </div>
          </div>
          <div class="main-header-right">

            <div className='col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5'>
              <div className='search-box'>
                <select className='form-select form-select-sm' value={locationCode} onChange={(e) => { setLocationCode(e.target.value); changeLocation(e.target.value) }} >
                  <option value=""> Select Location</option>
                  {
                    LocationData.map((data, index) => {
                      return <option key={index} value={data.locationCode}>{data.locationCode}</option>
                    })
                  }
                </select>
              </div>
            </div>

            <ul class="nav nav-item  navbar-nav-right ms-auto">
              <li class="dropdown main-profile-menu nav nav-item nav-link">
                <a class="profile-user d-flex" onClick={showhideProfileCard} >
                  <img alt="" src={Avatar} />
                  <div class="ms-2 my-auto">
                    <h6>{userProfile.displayName}</h6>
                    <span>{userProfile.userType}</span>
                  </div>
                  <i class="angle fe fe-chevron-down"></i>
                </a>
                <div class="dropdown-menu" style={{ "display": (shProfileCard ? "block" : "none") }}>
                  <a class="dropdown-item" >
                    <FontAwesomeIcon icon={faCircleUser} size="lg" style={{ "fontSize": "20px", "marginRight": "10px", "width": "24px", "textAlign": "center" }} />
                    Profile
                  </a>
                  <a class="dropdown-item" >
                    <FontAwesomeIcon icon={faCog} size="lg" style={{ "fontSize": "20px", "marginRight": "10px", "width": "24px", "textAlign": "center" }} />
                    Edit Profile
                  </a>
                  <a class="dropdown-item" onClick={logOut}>
                    <FontAwesomeIcon icon={faSignOut} size="lg" style={{ "fontSize": "20px", "marginRight": "10px", "width": "24px", "textAlign": "center" }} />
                    Sign Out
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Drawer className="drawer-main" closable={false} title={
        <div className='drawer-header'>
          {/* <img src={DrawerLogo} width="25" /> */}
          <p className='px-2 menu-back-button' onClick={onClose}>
            <span>
              <FontAwesomeIcon icon={faArrowLeft} />
            </span>  Back
          </p>
        </div>
      } placement="left" onClose={onClose} visible={visible}>
        <div className='drawer-body-main mt-3'>
          {/* header */}
          <div className='drawer-body-header '>
            <div className='header-img p-1'>
              <img src={DrawerLogo} width="40" />
            </div>
            <div className='header-title px-3'>
              <h6>Garmenting <br /> Enterprise Apps</h6>
            </div>
          </div>

          {/* menu-items */}
          <div className='drawer-body-container mt-4'>
            <div className='row'>
              {userApps.map((apps, index) => {
                return <div key={index} className='col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4 menu-items' onClick={() => window.location.href = `http://${apps.hostUIURL}/`}>
                  <div className='menu-list '>
                    <div className='menu-img'>
                      <img src={userAppIcons.icons} width="40" />
                    </div>
                    <div className='menu-title px-2'>
                      <h6 id={apps.serviceCode}> {apps.serviceName} </h6>
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </Drawer>
    </>
    // <div className='header-main'>
    //   <div className='row header align-items-center'>
    //     <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 left'>
    //       <div className='left-menu'>
    //         <div className='profile-card' onClick={showDrawer}>
    //           <img src={ConfigurationLogo} width="100%" />
    //         </div>
    //         <div className='profile-names'>
    //           <h6>Configuration Management</h6>
    //         </div>
    //       </div>
    //     </div>
    // <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
    //   <div className='search-box'>
    //     <select className='form-select form-select-sm' value={locationCode} onChange={(e) => { setLocationCode(e.target.value); changeLocation(e.target.value) }} >
    //       <option value=""> Select Location</option>
    //       {
    //         LocationData.map((data, index) => {
    //           return <option key={index} value={data.locationCode}>{data.locationCode}</option>
    //         })
    //       }
    //     </select>
    //   </div>
    // </div>

    //     <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 right'>
    //       <Popover placement="bottomRight" title="" content={
    //         <button className='btn btn-sm text-danger px-4 py-0' onClick={logOut}>Logout</button>
    //       }>
    //         <div className='right-menu'>
    //           <div className='profile-right-card'>
    //             <img src={Avatar} width="100%" />
    //           </div>
    //           <div className='profile-right-names'>
    //             <h6> {userProfile.firstName} {userProfile.lastName} </h6>
    //             <p> {dt} </p>
    //           </div>
    //           <div className='right-arrow-down'>
    //             <FontAwesomeIcon icon={faChevronDown} color="white" size="xs" />
    //           </div>
    //         </div>
    //       </Popover>
    //     </div>
    //   </div>

    //   <Drawer className="drawer-main" closable={false} title={
    //     <div className='drawer-header'>
    //       <p className='px-2 menu-back-button' onClick={onClose}>
    //         <span>
    //           <FontAwesomeIcon icon={faArrowLeft} />
    //         </span>  Back
    //       </p>
    //     </div>
    //   } placement="left" onClose={onClose} visible={visible}>
    //     <div className='drawer-body-main mt-3'>
    //       {/* header */}
    //       <div className='drawer-body-header '>
    //         <div className='header-img p-1'>
    //           <img src={DrawerLogo} width="40" />
    //         </div>
    //         <div className='header-title px-3'>
    //           <h6>Garmenting <br /> Enterprise Apps</h6>
    //         </div>
    //       </div>

    //       {/* menu-items */}
    //       <div className='drawer-body-container mt-4'>
    //         <div className='row'>
    //           {userApps.map((apps, index) => {
    //             return <div key={index} className='col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4 menu-items'
    //               onClick={() => window.location.href = `http://${apps.hostUIURL}/`}>
    //               <div className='menu-list '>
    //                 <div className='menu-img'>
    //                   <img src={userAppIcons.icons} width="40" />
    //                 </div>
    //                 <div className='menu-title px-2'>
    //                   <h6 id={apps.serviceCode}> {apps.serviceName} </h6>
    //                 </div>
    //               </div>
    //             </div>
    //           })}             

    //         </div>
    //       </div>
    //     </div>
    //   </Drawer>
    // </div>
  )
}