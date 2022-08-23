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

    // const { react_app_baseurl, react_app_env, react_app_site } = process.env
    // await ItrApiService.CONFIG(react_app_env, "http://gateway01.ithred.info/api/", react_app_site).then(res => {
    //   // debugger
    //   console.log(res);
    //   if (res.directLogin == true && res.tokenState == true) {
    //     navigate('/masters/defect-master');
    //   }
    //   else {
    //     window.location.replace(configUrl.appUrl);
    //   }
    // });



    ItrApiService.CONFIG("prod", "http://gateway01.ithred.info/api/", "app").then(th => {
      ItrAuthService.Login({
        data: {
          userName: 'mathankumar@ambattur.com',
          password: 'Mathan@123'
        }
      }).then((res) => {
        ItrApiService.userApp().then(res => console.log(res.data, 'userApps'));
        console.log(res.data);
      });
    });


  }, []);

  return (
    <div >
      <Routing />
    </div>
  );
}

export default App;
