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
    <div className='header-main'>
      {/* <Switch checked={swi} onChange={(e) => setSwi(e == true ? 'Y' : 'N')} /> */}
      {/* <h6> {swi == true ? 'Active' : 'Disable'} </h6> */}
      <div className='row header align-items-center'>
        <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 left'>
          <div className='left-menu'>
            <div className='profile-card' onClick={showDrawer}>
              <img src={ConfigurationLogo} width="100%" />
            </div>
            <div className='profile-names'>
              <h6>Configuration Management</h6>
            </div>
          </div>
        </div>

        {/* <div className='col-6 col-sm-4 col-md-4 col-lg-5 col-xl-5 middle'>
          <div className='search-box'>
            <input type="search" placeholder='Search With Keywords' className='form-control form-control-sm' />
            <img className='search-icon' src={SearchIcon} width="15" />
          </div>
        </div> */}

        <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <div className='search-box'>
            <select className='form-select form-select-sm'
              value={locationCode}
              onChange={(e) => {
                setLocationCode(e.target.value);
                changeLocation(e.target.value)
              }}
            >
              <option value=""> Select Location</option>
              {LocationData.map((data, index) => {
                return <option key={index} value={data.locationCode}>{data.locationCode}</option>
              })}
            </select>
          </div>
        </div>

        <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 right'>
          <Popover placement="bottomRight" title="" content={
            <button className='btn btn-sm text-danger px-4 py-0' onClick={logOut}>Logout</button>
          }>
            <div className='right-menu'>
              <div className='profile-right-card'>
                <img src={Avatar} width="100%" />
              </div>
              <div className='profile-right-names'>
                <h6> {userProfile.firstName} {userProfile.lastName} </h6>
                <p> {dt} </p>
                {/* <p>{moment(userProfile.createdDate).format("D/M/YYYY,h:mm")}</p> */}
              </div>
              <div className='right-arrow-down'>
                <FontAwesomeIcon icon={faChevronDown} color="white" size="xs" />
              </div>
            </div>
          </Popover>
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
                return <div key={index} className='col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4 menu-items'
                  onClick={() => window.location.href = `http://${apps.hostUIURL}/`}>
                  {/* onClick={() => apps.serviceCode == 'ENAPP002' ? window.location.href = 'http://localhost:82/' : apps.serviceCode == 'ENAPP003' ? window.location.href = 'http://localhost:82/' : apps.serviceCode == 'ENAPP001' ? window.location.href = 'http://localhost:83/' : window.location.href = 'http://localhost:83/'}> */}
                  {/* return <div key={index} className='col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4 menu-items' onClick={() => { apps.serviceCode == 'ENAPP002' ? window.location.href = '/ProductDevelopment' : apps.serviceCode == 'ENAPP003' ? window.location.href = '/ConfigurationManagement' : apps.serviceCode == 'ENAPP004' ? window.location.href = '/QualityAssurance' : window.location.href = '/PreProduction' }}> */}
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

              {/* <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4 menu-items' onClick={() => window.location.href = '/QualityManagement'}>
                <div className='menu-list '>
                  <div className='menu-img'>
                    <img src={Quality} width="40" />
                  </div>
                  <div className='menu-title px-2'>
                    <h6>Quality Management</h6>
                  </div>
                </div>
              </div>

              <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4 menu-items' onClick={() => window.location.href = '/ConfigurationManagement'}>
                <div className='menu-list '>
                  <div className='menu-img'>
                    <img src={Configuration} width="40" />
                  </div>
                  <div className='menu-title px-2'>
                    <h6>Configuration Management</h6>
                  </div>
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
