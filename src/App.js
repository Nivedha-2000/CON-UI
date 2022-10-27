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

    const { react_app_baseurl, react_app_env, react_app_site, react_app_auth_mode, react_app_auth_redirection_type } = process.env
    await ItrApiService.CONFIG(react_app_env, react_app_baseurl, react_app_site).then(res => {
      if (react_app_auth_mode == "external") {

        if (res.directLogin == true && res.tokenState == true) {
          navigate('/masters/defect-master');
        }
        else {
          if (sessionStorage.getItem('userInfo') === null) {
            window.location.replace(configUrl().appUrl);
          }
        }

      }
      else {
        ItrAuthService.Login({
          data: {
            userName: 'santhosh_s@ambattur.com',
            password: 'Iamadmin@123'
          }
        }).then(() => {
          ItrApiService.userApp().then(res => console.log(res));
        });
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