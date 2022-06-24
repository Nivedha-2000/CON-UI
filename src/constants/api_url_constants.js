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
    SAVE_PACK_TYPE_MASTER: "PackTypeMaster/SavePackTypeMaster",
    GET_TRANSIT_MASTER_LIST: "TransitMaster/GetAllTransitMaster",
    GET_TRANSIT_MASTER_BY_ID:"TransitMaster/GetTransitMasterById",
    SAVE_TRANSIT_MASTER: "TransitMaster/SaveTransitMaster",

    // LOCATIONMASTER
    GET_LOCATION_MASTER_LIST:"LocationMaster/GetAllLocCode",
    GET_LOCATION_MASTER_BY_ID: "LocationMaster/GetLocCode", 
    SAVE_LOCATION_MASTER: "LocationMaster/SaveLocationMaster", 

    // MERIAATL TYPE MASTER
    GET_MERIAATLTYPE_MASTER_LIST: "MatTypeMaster/GetAllMattype", 
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
    GET_BUYERDIVISIONEMASTER_BY_ID: "BuyerDivMaster/GetBuyerDivInfoByBuyerDivCode" ,
   // GET_BUYERDIVISION_MASTER_LIST: "BuyerDivMaster/GetAllBuyerDivInfo", 

   // BUSINESS GROUP MASTER
   GET_BUSINESS_GROUP_MASTER_LIST:"BGcodeMaster/GetAllBGcode", 
   GET_BUSINESS_GROUP_MASTER_BY_ID: "BGcodeMaster/GetBGcode", 
   SAVE_BUSINESS_GROUP_MASTER: "BGcodeMaster/SaveBGcodeMaster", 
    
    // CORPORATE GROUP MASTER
   GET_CORPORATE_GROUP_MASTER_LIST:"CGcodeMaster/GetAllCGcode", 
   GET_CORPORATE_GROUP_MASTER_BY_ID: "CGcodeMaster/GetCGcode", 
   SAVE_CORPORATE_GROUP_MASTER: "CGcodeMaster/SaveCGcodeMaster", 

   // VERTICAL GROUP MASTER
   GET_VERTICAL_GROUP_MASTER_LIST:"VGcodeMaster/GetAllVGcode", 
   GET_VERTICAL_GROUP_MASTER_BY_ID: "VGcodeMaster/GetVGcode", 
   SAVE_VERTICAL_GROUP_MASTER: "VGcodeMaster/SaveVGcodeMaster", 

    // PROJECTMASTER
   GET_PROJECT_MASTER_LIST:"PJMaster/GetAllPJMaster", 
   GET_PROJECT_MASTER_BY_ID: "PJMaster/GetPJMaster", 
   SAVE_PROJECT_MASTER: "PJMaster/SavePJMaster", 

    // SEASON MASTER
   GET_SEASON_MASTER_LIST:"SeasonMaster/GetAllSeason", 
   GET_SEASON_MASTER_BY_ID: "SeasonMaster/GetSeasonBySeasonCode", 
   SAVE_SEASON_MASTER: "SeasonMaster/SaveSeasonMaster", 
    
    // STYLE DIVMASTER
   GET_STYLEDIV_MASTER_LIST:"StyleDivMaster/GetAllStyleDivMaster", 
   GET_STYLEDIV_MASTER_BY_ID: "StyleDivMaster/GetStyleDivMasterByFashionGroupProductTypStyleDivisioneSubProductType", 
   SAVE_STYLEDIV_MASTER: "StyleDivMaster/SaveStyleDivMaster", 

   // UD MASTER
   GET_UD_MASTER_LIST:"UDMaster/GetAllUDMaster", 
   GET_UD_MASTER_BY_ID: "UDMaster/GetUDMasterByType", 
   SAVE_UD_MASTER: "UDMaster/SaveUDMaster", 

   // INECOST MASTER
   GET_LINECOST_MASTER_LIST:"LineCostMaster/GetAllLineCostMaster", 
   GET_LINECOST_MASTER_BY_ID: "LineCostMaster/LineCostMaster/GetLineCostMasterByTransMonthTransYearLocCodeFactCodeLineGroup", 
   SAVE_LINECOST_MASTER: "LineCostMaster/SaveLineCostMasterList", 

   // SUPPLIER MASTER
   GET_SUPPLIER_MASTER_LIST:"SupplierMaster/GetAllSupplier", 
   GET_SUPPLIER_MASTER_BY_ID: "SupplierMaster/GetSupplier", 
   SAVE_SUPPLIER_MASTER: "SupplierMaster/SaveSupplierMaster" 

}

export const MISCELLANEOUS_TYPES = {
    FTD_OPERATION_TYPE: "FTDOPRTYPE",
    UOM: 'UOM',
    THICKNESS: 'FABTHICK',
    MARKET: 'MARKET',
    WASH: 'WASH',
    COUNTRY: 'COUNTRY',
    SHIPMODE:'SMODE',
    MatType:'MatType',
    FASHIONGROUP:'FASHIONGRP',
    MiscType:'MiscType',
    SUPPLIERCATE:'SUPCAT',
}