import React, { useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../../Assets/images/avatar.png';
import SearchIcon from '../../Assets/icons/search.svg';
import { Drawer, message, Popover } from 'antd';
import DrawerLogo from '../../Assets/images/loginLogo.png';
import Quality from '../../Assets/images/quality.svg';
import Product from '../../Assets/images/product.svg';
import Configuration from '../../Assets/images/configuration.svg';
// import HeaderLogo from '../../Assets/images/iThreadLogo.png';
import HeaderLogo from '../../Assets/images/brand-logo.png';
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
  const [shProfileCard, setshProfileCard] = useState(false);
  const [searchclass, setsearchclass] = useState("");
  const [userApps, setUserApps] = useState([]);

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

  useEffect(() => {
    ItrApiService.userProfile().then(res => {
      console.log(res, 'profile')
      if (res.Success == true) {
        setUserProfile(res.data);
      }
      else {
        message.warning(res.message);
      }
    });

    let secTimer = setInterval(() => { setDt(new Date().toLocaleString()) }, 1000)
    return () => clearInterval(secTimer);

  }, []);

  const SearchBox_Event = name => (e) => {
    let value = e.target.value;
    if(value.length > 0) setsearchclass("search-box-forms");
    else setsearchclass("");
  }

  const logOut = async () => {
    let result = await ItrAuthService.logout();
    if (result.Success == true) {
      sessionStorage.clear();
      window.location.href = configUrl.appUrl;
      message.success('Logout Successfully');
    }
    else if (result.Success == false) {
      message.success(result.message);
    }
  }

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
                {/* <div class="dropdown-menu">
                <div class="main-header-profile p-3">

                  <a class="dropdown-item" href="#">Masters</a>
                  <a class="dropdown-item" href="#">Product Development</a>
                  <a class="dropdown-item" href="#">Administrator</a>
                  <a class="dropdown-item" href="#">Bootstrap</a>


                </div>
              </div> */}
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
                  <a class="dropdown-item" ><i class="bx bx-user-circle"></i>Profile</a>
                  <a class="dropdown-item" ><i class="bx bx-cog"></i> Edit Profile</a>
                  <a class="dropdown-item" ><i class="bx bxs-inbox"></i>Inbox</a>
                  <a class="dropdown-item" ><i class="bx bx-envelope"></i>Messages</a>
                  <a class="dropdown-item" ><i class="bx bx-slider-alt"></i>
                    Account Settings
                  </a>
                  <a class="dropdown-item pos-relative t-siz">
                    <img src="assets/img/textaa.svg" /> Text size <span class="w-cv"> <span class="s-but">A</span> <span class="n-but">A</span> <span class="l-but">A</span></span></a>
                  <a class="dropdown-item" onClick={logOut}>
                    <i class="bx bx-log-out"></i>
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
  )
}
