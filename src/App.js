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
    const delQuery = new URLSearchParams(window.location.search);
    const getAppCode = delQuery.get('appCode');
    sessionStorage.setItem('appCode', getAppCode);

    const { react_app_baseurl, react_app_env, react_app_site } = process.env
    await ItrApiService.CONFIG(react_app_env, react_app_baseurl, react_app_site).then(res => {
      // await ItrApiService.CONFIG("prod", "http://172.16.9.253:5002/api/", process.env.react_app_site).then(res => {
      // ItrAuthService.Login({
      //   data: {
      //     userName: 'mathankumar@ambattur.com',
      //     password: 'Mathan@123'
      //   }
      // });
      // ItrApiService.userApp().then(res => console.log(res));
      // debugger
      if (res.directLogin == true && res.tokenState == true) {
        navigate('/masters/defect-master');
      }
      else {
        if (sessionStorage.getItem('userInfo') === null) {
          window.location.replace(configUrl.appUrl);
        }
      }
    });
  }, []);

  return (
    <div >
      <Routing />
    </div>
  );
}

export default App;
