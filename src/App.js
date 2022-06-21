import { useEffect } from 'react';
import './App.css';
import Routing from './Routing/Routing';
import '@progress/kendo-theme-default/dist/all.css';
import { ItrApiService, ItrAuthService } from '@afiplfeed/itr-ui';
import './Assets/index.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { configUrl } from './config';


function App() {

  let navigate = useNavigate();

  useEffect(async () => {
    // const delQuery = new URLSearchParams(location.search);

    const { react_app_baseurl, react_app_env, react_app_site } = process.env
    // ItrApiService.CONFIG(react_app_env, "http://gateway01.ithred.info/api/", react_app_site);
    await ItrApiService.CONFIG("prod", "http://172.16.9.253:5002/api/", react_app_site).then(res => {
      if (res.directLogin == true && res.tokenState == true) {
        navigate('/masters/defect-master');
      }
      else {
        window.location.replace(configUrl.appUrl);
      }
    });



    // ItrApiService.CONFIG("prod", "http://gateway01.ithred.info/api/", react_app_site);
    // ItrApiService.CONFIG("prod", "http://172.16.9.253:5002/api/",react_app_site);
    // ItrAuthService.Login({
    //   data: {
    //     userName: 'mathankumar@ambattur.com',
    //     password: 'password123'
    //   }
    // }).then((res) => console.log(res.data));
    // ItrApiService.userApp().then(res => console.log(res.data,'userApps'));
  }, []);

  return (
    <div >
      <Routing />
    </div>
  );
}

export default App;
