import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import LanguageMaster from '../Pages/Masters/LanguageMaster/LanguageMaster';
import AuditMaster from '../Pages/Masters/AuditMaster/AuditMaster';
import AssignmentMaster from '../Pages/Masters/AssignmentMaster/AssignmentMaster';

import LocationMaster from '../Pages/Masters/LocationMaster';
import MaterialTypeMaster from '../Pages/Masters/MaterialTypeMaster';
import ProductTypeMaster from '../Pages/Masters/ProductTypeMaster';
import SubProductTypeMaster from '../Pages/Masters/SubProductTypeMaster';
import UserDefinedTypeMaster from '../Pages/Masters/UserDefinedTypeMaster';
import BuyerDivisionMaster from '../Pages/Masters/BuyerDivisionMaster';
import BusinessGroupMaster from '../Pages/Masters/BusinessGroupMaster';
import CorporateGroupMaster from '../Pages/Masters/CorporateGroupMaster';
import VerticalGroupMaster from '../Pages/Masters/VerticalGroupMaster';
import ProjectMaster from '../Pages/Masters/ProjectMaster';
import LineCostMaster from '../Pages/Masters/LineCostMaster';
import SeasonMaster from '../Pages/Masters/SeasonMaster';
import StyleDivisionMaster from '../Pages/Masters/StyleDivisionMaster';
import UserDefinedMaster from '../Pages/Masters/UserDefinedMaster';
import HSCodeMaster from '../Pages/Masters/HSCodeMaster';
import SupplierMaster from '../Pages/Masters/SupplierMaster';
import PDCMaster from '../Pages/Masters/PDCMaster';

import MaterialGroupMaster from '../Pages/Masters/MaterialGroupMaster';
import BuyerProductTypeMaster from '../Pages/Masters/BuyerProductTypeMaster';
import SizeMaster from '../Pages/Masters/SizeMaster';
import RoleMaster from '../Pages/Masters/RoleMaster';
import HandOverTaskMaster from '../Pages/Masters/HandOverTaskMaster';
import UnitMaster from '../Pages/Masters/UnitMaster';
import CompanyMaster from '../Pages/Masters/CompanyMaster';
import BuyerMaster from '../Pages/Masters/BuyerMaster';

import UserbuyerrightsElement from '../Pages/Masters/UserBuyerRights';
import MenurightsElement from '../Pages/Masters/MenuRightsMaster';
import MenuElement from '../Pages/Masters/MenuMaster';
import PurposeMaster from '../Pages/Masters/PurposeMaster';

import ProductivityMasters from '../Pages/Masters/ProductivityMasterNew';
import ProductivityMaster from '../Pages/Masters/ProductivityMaster';


import TabTest from '../Pages/Masters/TabTest'
import SupplierMasterNew from '../Pages/Masters/SupplierMasterNew/sup_index';
import TranslationMaster from '../Pages/Masters/TranslationMaster/TranslationMaster';
import DefectTranslationMaster from '../Pages/Masters/DefectTranslationMaster/DefectTranslationMaster';
import OffStdMaster from '../Pages/Masters/OffStdMaster/OffStdMaster';
import TNAMaster from '../Pages/Masters/TNAMaster';
// import DefectMasters1 from '../Testing/DefectMasters/DefectMasters1';

export default function Routing() {

  const [checkUser, setCheckUser] = useState(null);

  return (
    <Routes>
      {/* <Route index path='/' element={ <Navigate replace to="/masters/defect-master" /> } /> */}
      <Route path='' element={<Dashboard />}>
        <Route index path='quality' element={<Home />} />
        <Route path='scheduler' element={<SchedulerTwo />} />
        <Route path='external-audit' element={<ExternalAudit />} />
        <Route path='reports' element={<Reports />} />
        <Route path='quality/defects' element={<Defects />} />
        <Route path='masters/audit-master' element={<AuditMaster />} />
        <Route path='masters/assignment-master' element={<AssignmentMaster />} />
        <Route path='masters/language-master' element={<LanguageMaster />} />
        <Route path='masters/defect-master' element={<DefectMaster />} />
        <Route path='masters/parts-master' element={<PartsMasters />} />
        <Route path='masters/operation-master' element={<OperationMaster />} />
        <Route path='masters/sewingline-master' element={<SewingLineMaster />} />
        <Route path='masters/aql-master' element={<AqlMaster />} />
        <Route path='masters/language-master' element={<LanguageMaster />} />
        <Route path='masters/defect-translation-master' element={<TranslationMaster />} />
        <Route path='masters/translation-master' element={<DefectTranslationMaster />} />
        <Route path='masters/off-standard-master' element={<OffStdMaster />} />



        <Route path='masters/shipment-tolerance-master' element={<ShipmentTolerance name="Shipment Tolerance Master" />} />
        <Route path='masters/stitch-type-master' element={<StitchTypeMaster name="StitchType Master" />} />
        <Route path='masters/pack-type-master' element={<PackTypeMaster name="Pack Type Master" />} />
        <Route path='masters/ftd-operation-master' element={<FTDOperationMaster name="FTD Operation Master" />} />
        <Route path='masters/transit-master' element={<TransitMaster name="Transit Master" />} />
        <Route path='masters/location-master' element={<LocationMaster name="Location Master" />} />
        <Route path='masters/material-type-master' element={<MaterialTypeMaster name="Material Type Master" />} />
        <Route path='masters/product-type-master' element={<ProductTypeMaster name="Product Type Master" />} />
        <Route path='masters/sub-product-type-master' element={<SubProductTypeMaster name="sub Product Type Master" />} />
        <Route path='masters/user-defined-type-master' element={<UserDefinedTypeMaster name="User Defined Type Master" />} />
        <Route path='masters/buyer-division-master' element={<BuyerDivisionMaster name="Buyer Division Master" />} />
        <Route path='masters/business-group-master' element={<BusinessGroupMaster name="Business Group Master" />} />
        <Route path='masters/corporate-group-master' element={<CorporateGroupMaster name="Corporate Group Master" />} />
        <Route path='masters/vertical-group-master' element={<VerticalGroupMaster name="Vertical Group Master" />} />
        <Route path='masters/project-master' element={<ProjectMaster name="Project Master" />} />
        <Route path='masters/line-cost-master' element={<LineCostMaster name="Line Cost Master" />} />
        <Route path='masters/season-master' element={<SeasonMaster name="Season Master" />} />
        <Route path='masters/style-division-master' element={<StyleDivisionMaster name="Style Division Master" />} />
        <Route path='masters/user-defined-master' element={<UserDefinedMaster name="User Defined Master" />} />
        <Route path='masters/hs-code-master' element={<HSCodeMaster name="Hs Code Master" />} />
        <Route path='masters/supplier-master' element={<SupplierMaster name="Supplier Master" />} />
        <Route path='masters/supplier-master-new' element={<SupplierMasterNew name="Supplier Master" />} />
        <Route path='masters/pdc-master' element={<PDCMaster name="PDC Master" />} />
        <Route path='masters/material-group-master' element={<MaterialGroupMaster name="Material Group Master" />} />
        <Route path='masters/buyer-product-type-master' element={<BuyerProductTypeMaster name="Buyer Product Type Master" />} />
        <Route path='masters/size-master' element={<SizeMaster name="Size Master" />} />
        <Route path='masters/role-master' element={<RoleMaster name='Role Master' />} />
        <Route path='masters/hand-over-task-master' element={<HandOverTaskMaster name='Hand Over Task Master' />} />
        <Route path='masters/unit-master' element={<UnitMaster name='Unit Master' />} />
        <Route path='masters/company-master' element={<CompanyMaster name='Company Master' />} />
        <Route path='masters/buyer-master' element={<BuyerMaster name='Buyer Master' />} />
        <Route path='masters/tab-test' element={<TabTest name='Tab Test' />}></Route>
        <Route path='masters/user-buyer-rights-master' element={<UserbuyerrightsElement name='User Buyer Rights Master' />} />
        <Route path='masters/menu-rights-master' element={<MenurightsElement name='Menu Rights Master' />} />
        <Route path='masters/menu-master' element={<MenuElement name='Menu Master' />} />
        <Route path='masters/purpose-master' element={<PurposeMaster name='Purpose Master' />} />
        <Route path='masters/productivity-master' element={<ProductivityMasters name='Productivity Master' />} />
        <Route path='masters/tna-master' element={<TNAMaster name='TNA Master'/>}/>
        {/* <Route path='scheduler-01' element={<Scheduler />} /> */}
      </Route>
    </Routes>
  )
}
// "homepage": "/ConfigurationManagement",