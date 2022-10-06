export const API_URLS = {
  GET_FTD_OPERATION_MASTER_LIST: "FTDOprMast/GetAllFTPOprMaster",
  GET_FTD_OPERATION_BY_ID: "FTDOprMast/GetFTPOprMasterById",
  GET_FTD_OPERATION_INDEX_CODE: "FTDOprMast/GetShortname",
  SAVE_FTD_OPERATION_MASTER: "FTDOprMast/SaveFTDOprMaster",
  GET_MISCELLANEOUS_DROPDOWN: "UDMaster/GetUDMasterByType/",
  FTD_MASTER: "FTDOprMast/GetAllFTPOprMaster",
  STITCH_SAVE_MASTER: "StitchTypeMaster/SaveStitchTypeMaster",
  GET_STITCH_MASTER: "StitchTypeMaster/GetAllStitchTypeMaster",
  GET_STITCH_MASTER_BY_ID: "StitchTypeMaster/GetStitchTypeMasterById",
  GET_PACK_TYPE_MASTER: "PackTypeMaster/GetAllPackTypeMaster",
  GET_PACK_TYPE_MASTER_BY_ID: "PackTypeMaster/GetPackTypeMasterBasedID",
  GET_BUYER_DROPDOWN: "BuyerMaster/GetAllBuyerInfo",
  GET_BUYER_DIVISION_DROPDOWN: "BuyerDivMaster/GetAllBuyerDivCodeBybuyercode",
  SAVE_PACK_TYPE_MASTER: "PackTypeMaster/SavePackTypeMaster",
  SAVE_SHIP_TOLERANCE_MASTER: "ShipToleranceMaster/SaveShipToleranceMaster",
  GET_SHIP_TOLERANCE_MASTER: "ShipToleranceMaster/GetAllShipToleranceMaster",
  GET_SHIP_TOLERANCE_MASTER_BY_ID: "ShipToleranceMaster/GetShipToleranceMasterById",
  // SAVE_PACK_TYPE_MASTER: "PackTypeMaster/SavePackTypeMaster",
  GET_TRANSIT_MASTER_LIST: "TransitMaster/GetAllTransitMaster",
  GET_TRANSIT_MASTER_BY_ID: "TransitMaster/GetTransitMasterById",
  SAVE_TRANSIT_MASTER: "TransitMaster/SaveTransitMaster",

  // LOCATIONMASTER
  GET_LOCATION_MASTER_LIST: "LocationMaster/GetAllLocCode",
  GET_LOCATION_MASTER_BY_ID: "LocationMaster/GetLocCode",
  SAVE_LOCATION_MASTER: "LocationMaster/SaveLocationMaster",

  // MERIAATL TYPE MASTER
  GET_MATERIALTYPE_MASTER_LIST: "MatTypeMaster/GetAllMattype",
  SAVE_MATERIALTYPE_MASTER: "MatTypeMaster/SaveMatTypeMaster",
  GET_MATERIALTYPE_BY_ID: "MatTypeMaster/GetMattypeByMattype",

  // PRODUCT TYPE MASTER
  GET_PRODUCTTYPE_MASTER_LIST: "ProdTypeMaster/GetAllProdType",
  SAVE_PRODUCTTYPE_MASTER_LIST: "ProdTypeMaster/SaveProdTypeMaster",
  GET_PRODUCTTYPE_BY_ID: "ProdTypeMaster/GetProdTypeByProdType",

  // UD TYPE MASTER
  GET_UDTYPE_MASTER_LIST: "UDMasterType/GetAllMiscType",
  SAVE_UDTYPE_MASTER: "UDMasterType/SaveUDMasterType",
  GET_UDTYPEMASTER_BY_ID: "UDMasterType/GetMiscTypeByMiscType",

  // BUYER DIVISION MASTER
  GET_BUYERDIVISION_MASTER_LIST: "BuyerDivMaster/GetAllBuyerDivInfo",
  SAVE_BUYERDIVISION_MASTER: "BuyerDivMaster/SaveBuyerDivMaster",
  GET_BUYERDIVISIONEMASTER_BY_ID: "BuyerDivMaster/GetBuyerDivInfoByBuyerDivCode",
  // GET_BUYERDIVISION_MASTER_LIST: "BuyerDivMaster/GetAllBuyerDivInfo", 

  // BUSINESS GROUP MASTER
  GET_BUSINESS_GROUP_MASTER_LIST: "BGcodeMaster/GetAllBGcode",
  GET_BUSINESS_GROUP_MASTER_BY_ID: "BGcodeMaster/GetBGcode",
  SAVE_BUSINESS_GROUP_MASTER: "BGcodeMaster/SaveBGcodeMaster",

  // CORPORATE GROUP MASTER
  GET_CORPORATE_GROUP_MASTER_LIST: "CGcodeMaster/GetAllCGcode",
  GET_CORPORATE_GROUP_MASTER_BY_ID: "CGcodeMaster/GetCGcode",
  SAVE_CORPORATE_GROUP_MASTER: "CGcodeMaster/SaveCGcodeMaster",

  // VERTICAL GROUP MASTER
  GET_VERTICAL_GROUP_MASTER_LIST: "VGcodeMaster/GetAllVGcode",
  GET_VERTICAL_GROUP_MASTER_BY_ID: "VGcodeMaster/GetVGcode",
  SAVE_VERTICAL_GROUP_MASTER: "VGcodeMaster/SaveVGcodeMaster",

  // PROJECTMASTER
  GET_PROJECT_MASTER_LIST: "PJMaster/GetAllPJMaster",
  GET_PROJECT_MASTER_BY_ID: "PJMaster/GetPJMaster",
  SAVE_PROJECT_MASTER: "PJMaster/SavePJMaster",

  // SEASON MASTER
  GET_SEASON_MASTER_LIST: "SeasonMaster/GetAllSeason",
  GET_SEASON_MASTER_BY_ID: "SeasonMaster/GetSeasonBySeasonCode",
  SAVE_SEASON_MASTER: "SeasonMaster/SaveSeasonMaster",

  // STYLE DIVMASTER
  GET_STYLEDIV_MASTER_LIST: "StyleDivMaster/GetAllStyleDivMaster",
  GET_STYLEDIV_MASTER_BY_ID: "StyleDivMaster/GetStyleDivMasterByFashionGroupProductTypStyleDivisioneSubProductType",
  SAVE_STYLEDIV_MASTER: "StyleDivMaster/SaveStyleDivMaster",

  // UD MASTER
  GET_UD_MASTER_LIST: "UDMaster/GetAllUDMaster",
  GET_UD_MASTER_BY_ID: "UDMaster/GetUDMasterByType",
  SAVE_UD_MASTER: "UDMaster/SaveUDMaster",

  // LINECOST MASTER
  GET_LINECOST_MASTER_LIST: "LineCostMaster/GetLineCostMaster",
  GET_LINECOST_MASTER_BY_ID: "LineCostMaster/LineCostMaster/GetLineCostMasterByTransMonthTransYearLocCodeFactCodeLineGroup",
  GET_FINYEAR_MASTER_LIST: "FinYearMaster/GetAllFinYearMaster",
  GET_LINECOST_MONTHWISE_LIST: "LineCostMaster/GetFinYearMaster",
  SAVE_LINECOST_MASTER: "LineCostMaster/SaveLineCostMasterList",
  GET_LINECOST_MASTER_LOCCODEFACTORY_LIST: "LineCostMaster/GetFinYearMasterLocCodeFactCode",
  GET_LINECOST_LINEGROUB: "LineCostMaster/GetLineGroupOnLineCostMasterLocCodeFactCode",
  GET_LINECOST_OPERATORE: "LineCostMaster/GetOperatorsOnLineCostMasterLocCodeFactCodeLineGroup",
  GET_LINECOST_WORKINGHRS: "LineCostMaster/GetWorkingHrsOnLineCostMasterLocCodeFactCodeLineGroupOperators",

  // PDC MASTER
  GET_PDC_MONTHWISE_LIST: "PDCostMaster/GetPDCostMasterByFinYearMaster",
  SAVE_PDC_MASTER: "PDCostMaster/SavePDCostMasterList",


  // SUPPLIER MASTER
  GET_SUPPLIER_MASTER_LIST: "SupplierMaster/GetAllSupplier",
  GET_SUPPLIER_MASTER_BY_ID: "SupplierMaster/GetSupplier",
  SAVE_SUPPLIER_MASTER: "SupplierMaster/SaveSupplierMaster",
  GET_ACTIVE_SUPPLIER_MASTER_DD: "SupplierMaster/GetSupplierIdSupCodeSupNameActiveSupplier",


  GET_LOCATION_MASTER_LIST: "LocationMaster/GetAllLocCode",
  //MatGroupMaster
  GET_MATERIALGROUP_MASTER_LIST: "MatGroupMaster/GetAllMatGroupMaster",
  GET_MATERIALGROUP_MASTER_BY_ID: "MatGroupMaster/GetMatGroupMasterByEntityID",
  SAVE_MATERIALGROUP_MASTER: "MatGroupMaster/SaveMatGroupMaster",
  GET_MATERIALTYPE_DROPDOWN: "MatTypeMaster/GetAllMattype",
  GET_MATERIALGROUP_DROPDOWN: "MatGroupMaster/GetMatGroupMasterBymattype",
  GET_MATERIAL_SUBGROUP_DROPDOWN: "MatGroupMaster/GetMatGroupMasterBymattypeMatGroup",

  ///BuyProdTypeMaster
  GET_BUYPRODTYPE_MASTER_LIST: "BuyProdTypeMaster/GetAllBuyProdType",
  GET_BUYPRODTYPE_MASTER_BY_ID: "BuyProdTypeMaster/GetBuyProdTypeByBuyCode",
  SAVE_BUYPRODTYPE_MASTER: "BuyProdTypeMaster/SaveBuyProdTypeMaster",
  GET_BUYCODE_DROPDOWN: "BuyerMaster/GetAllBuyerCode",
  GET_BUYDIVCODE_DROPDOWN: "BuyerDivMaster/GetAllBuyerDivInfo",
  GET_PRODUCT_TYPE_DROPDOWN: "ProdTypeMaster/GetAllProdType",
  //SizeMaster
  GET_SIZE_MASTER_LIST: "SizeMaster/GetAllSizeMaster",
  GET_SIZE_MASTER_BY_ID: "SizeMaster/GetSizeMasterByBuyDivCodeProductTypeFitGenderSizecode",
  SAVE_SIZE_MASTER: "SizeMaster/SaveSizeMaster",
  //RoleMaster
  GET_ROLE_MASTER_LIST: "RoleMaster/GetAllRole",
  GET_ROLE_MASTER_BY_ID: "RoleMaster/GetRole",
  SAVE_ROLE_MASTER: "RoleMaster/SaveRoleMaster",
  //HANDOVERTASK
  GET_HO_MASTER_LIST: "HOTaskMaster/GetAllHOTask",
  GET_HO_MASTER_BY_ID: "HOTaskMaster/GetHOTask",
  SAVE_HO_MASTER: "HOTaskMaster/SaveHOTaskMaster",
  //UnitMaster
  GET_UNIT_MASTER_LIST: "UnitMaster/GetAllUCode",
  GET_UNIT_MASTER_BY_ID: "UnitMaster/GetUCode",
  SAVE_UNIT_MASTER: "UnitMaster/SaveUnitMaster",
  GET_ALLFACTORY_LIST: "UnitMaster/GetAllActiveFactory",
  //CompanyMaster
  GET_COMPANY_MASTER_LIST: "LEMaster/GetAllLEMaster",
  GET_COMPANY_MASTER_BY_ID: "LEMaster/GetLEMaster",
  SAVE_COMPANY_MASTER: "LEMaster/SaveLEMaster",
  //BuyerMaster
  GET_BUYER_MASTER_LIST: "BuyerMaster/GetAllBuyerInfo",
  GET_BUYER_MASTER_BY_ID: "BuyerMaster/GetBuyerInfoById",
  SAVE_BUYER_MASTER: "BuyerMaster/SaveBuyerMaster",
  //BUYER_RIGHTS_MASTER
  GET_USER_BUYER_RIGHTS_MASTER_ENS: "User/GetAll",
  GET_USER_BUYER_RIGHTS_MASTER_BY_ID: "UserBuyerRights/GetBuyerListByuser",
  SAVE_USER_BUYER_RIGHTS_MASTER: "UserBuyerRights/SaveUserBuyerRights",
  //ROLE_MENU_RIGHTS_MASTER
  GET_MODULE_DROPDOWN: "CourierDispatch/GetUDMasterTypeValAll",
  GET_ROlE_BASED_LIST: "RoleMenuRights/GetRoleMenuRights",
  SAVE_ROLE_MENU_RIGHTS_MASTER: "RoleMenuRights/SaveRoleMenuRightsList",
  SAVE_ROLE_MENU_RIGHTS_LIST_MASTER: "RoleMenuRights/SaveRoleMenuRightsList",
  //MENU_MASTER
  GET_MENU_MASTER_LIST: "MenuMaster/GetAllMenuMaster",
  GET_MENU_MASTER_EDIT_BY_ID: "MenuMaster/GetMenuMasterByMenuId",
  SAVE_MENU_MASTER: "MenuMaster/SaveMenuMaster",
  //ROLE_MENU_RIGHTS_MASTER
  GET_PURPOSE_MASTER_LIST: "PPRPurposeMaster/GetAllPPRPurpose",
  GET_PURPOSE_MASTER_EDIT_BY_ID: "PPRPurposeMaster/GetPPRPurpose",
  SAVE_PURPOSE_MASTER_LIST_MASTER: "PPRPurposeMaster/SavePPRPurposeMaster",

  //AQL_MASTER
  GET_AQLMASTERADD_LIST: "AQLHead/GetAQLHeadByparams",
  POST_AQLMASTER: "AQLHead/SaveAQLHead",

  //ProductivityMaster
  SAVE_PRODUCTIVITY_MASTER: "Productivity/SaveProductivityList",
  //GetProductivityListByStartdateEnddateParamerters:"Productivity/GetProductivityListByStartdateEnddateParamerters",
  GetProductivityListByStartdateEnddateParamerters: "Productivity/GetProductivityByStartdateEnddateParamertersListwithStatus",
  GetProductivityList: "Productivity/GetProductivityListByLocCodeFactCodeLineGroup",


  //TNA_MASTER 
  SAVE_TNA_MASTER_LIST: "TNAMaster/SaveTNAMasterList",
  SAVE_TNA_MASTER: "TNAMaster/SaveTNAMaster",
  GET_TNA_MASTER_EDIT_BY_ID: "TNAMaster/GetTNAMaster",
  GET_ACTIVE_LOCATION_MASTER: "LocationMaster/GetAllActiveLocation",
  GET_ALL_TNA_LIST: "TNAMaster/GetAllTNAMaster",
  GET_ALL_TNA_DISTINCT_LIST: "TNAMaster/GetTNAMasterBy5ParamsDistinctList",
  GET_ALL_TNA_LIST_WITH_PARAMS: "TNAMaster/GetTNAMasterBy5Params",
  GET_ALL_TNA_DPND_CODE_PARAMS: "TNAMaster/GetTNAMasterSeqNoBy5Params",
  GET_ALL_TNA_DPND_ACTIVITY_PARAMS: "TNAMaster/GetTNAMasterByDeptcode",
  GET_ALL_TNA_DPND_SUB_ACTIVITY_PARAMS: "TNAMaster/GetTNAMasterByDeptcodeActivity",

//MATERIAL_MASTER 
SAVE_MATERIAL_MASTER: "MatMast/SaveMatMast",
GET_MATERIAL_MASTER_EDIT_BY_ID: "MatMast/GetMatMast",
GET_ALL_MATERIAL_LIST: "MatMast/GetAllMatMast",
GET_ALL_MATERIAL_APPROVED_LIST: "MatMast/GetAllMatMastByApproved",
GET_ALL_MATERIAL_PENDING_LIST: "MatMast/GetAllMatMastByPending",


}

export const MISCELLANEOUS_TYPES = {
  FTD_OPERATION_TYPE: "FTDOPRTYPE",
  UOM: 'UOM',
  THICKNESS: 'FABTHICK',
  MARKET: 'MARKET',
  WASH: 'WASH',
  COUNTRY: 'COUNTRY',
  SHIPMODE: 'SMODE',
  MatType: 'MatType',
  FASHIONGROUP: 'FASHIONGRP',
  MiscType: 'MiscType',
  SUPPLIERCATE: 'SUPCAT',
  HANDOVERTYPE: 'HOTYPE',
  HANDOVERTASK: 'HOTASK',
  GUIDETYPE: 'GUIDETYPE',
  SOURCEFROM: 'SOURCEFROM',
  FIT: 'FIT',
  GENDER: 'GENDER',
  Catalog: 'Catalog',
  MODULE: 'MODULE',
  MENUTYPE: 'MENUTYPE',
  PPRTYPE: 'PPRTYPE',
  AQLTYPE: 'AQLTYPE',
  AUDFORMAT: 'AUDFORMAT',
  FABTYPE: 'FABTYPE',
  DLEVEL: 'DLEVEL',
  DEPT:'DEPT',
  ORDSTAGE:'ORDSTAGE',
  ORDCATE:'ORDCATE',
  ACTTYPE:'ACTTYPE',
  INDDEPT:'INDDEPT',
  VALUEADD:'VALUEADD',
  
  PARENTGRP:'PARENTGRP',
  FBRCONTENT:'FBRCONTENT',
  FABTYPE:'FABTYPE',
  FBRWeave:'FBRWeave',
  FBRDyed:'FBRDyed',
  WASH:'WASH',
  UOM:'UOM',
  FBRPhyFin:'FBRPhyFin',
  FBRCheFin:'FBRCheFin',
  CUR:'CUR',
}