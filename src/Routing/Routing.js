import React, { useState } from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Scheduler from '../Screens/Scheduler/Scheduler';
import SchedulerTwo from '../Screens/SchedulerTwo/SchedulerTwo';
import Home from '../Screens/Home/Home';
import ExternalAudit from '../Screens/ExternalAudit/ExternalAudit';
import Reports from '../Screens/Reports/Reports';
import Defects from '../Screens/Quality/Defects/Defects';
import DefectMaster from '../Pages/Masters/DefectMasters/DefectMasters';
import OperationMaster from '../Pages/Masters/OperationMaster/OperationMaster';
import SewingLineMaster from '../Pages/Masters/SewingLineMaster/SewingLineMaster';
import AqlMaster from '../Pages/Masters/AqlMaster/AqlMaster';
import PartsMasters from '../Pages/Masters/PartsMaster/PartsMaster';
import DefectMasters from '../Pages/Masters/DefectMasters/DefectMasters';
import FTDOperationMaster from '../Pages/Masters/FTDOperationMaster';
import StitchTypeMaster from '../Pages/Masters/StitchTypeMaster';
import ShipmentTolerance from "../Pages/Masters/ShipmentTolerance";
import PackTypeMaster from '../Pages/Masters/PackTypeMaster';
import TransitMaster from '../Pages/Masters/TransitMaster';

// import DefectMasters1 from '../Testing/DefectMasters/DefectMasters1';

export default function Routing() {

  const [checkUser, setCheckUser] = useState(null);

  return (
    <Routes>
      <Route index path='/' element={ <Navigate replace to="/masters/defect-master" /> } />
      <Route path='/' element={<Dashboard />}>
        <Route index path='quality' element={<Home />} />
        <Route path='scheduler' element={<SchedulerTwo />} />
        <Route path='external-audit' element={<ExternalAudit />} />
        <Route path='reports' element={<Reports />} />
        <Route path='quality/defects' element={<Defects />} />
        <Route path='masters/defect-master' element={<DefectMaster />} />
        <Route path='masters/parts-master' element={<PartsMasters />} />
        <Route path='masters/operation-master' element={<OperationMaster />} />
        <Route path='masters/ftd-operation-master' element={<FTDOperationMaster name="FTD Operation Master" />} />
        <Route path='masters/pack-type-master' element={<PackTypeMaster name="Pack Type Master" />} />
        <Route path='masters/stitch-type-master' element={<StitchTypeMaster name="StitchType Master" />} />
        <Route path='masters/shipment-tolerance-master' element={<ShipmentTolerance name="Shipment Tolerance Master" />} />
        <Route path='masters/sewingline-master' element={<SewingLineMaster />} />
        <Route path='masters/aql-master' element={<AqlMaster />} />
        <Route path='masters/transit-master' element={<TransitMaster name="Transit Master" />}/>
        {/* <Route path='scheduler-01' element={<Scheduler />} /> */}
      </Route>
    </Routes>
  )
}
// "homepage": "/ConfigurationManagement",