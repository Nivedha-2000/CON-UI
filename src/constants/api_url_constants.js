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
    GET_LOCATION_MASTER_LIST:"LocationMaster/GetAllLocCode",


    //GET_LOCATION_MASTER_LIST:"LocationMaster/GetAllLocCode", //Nalla
    GET_LOCATION_MASTER_BY_ID: "LocationMaster/GetLocCode", //Nalla
   // GET_LOCATION_MASTER_BY_ID: "LocationMaster/GetLocCodeByLocCode", //Nalla
    SAVE_LOCATION_MASTER: "LocationMaster/SaveLocationMaster", //Nalla
    GET_MATERIALTYPE_MASTER_LIST: "MatTypeMaster/GetAllMattype", //Nalla
    SAVE_MATERIALTYPE_MASTER: "MatTypeMaster/SaveMatTypeMaster", //Nalla
    GET_MATERIALTYPE_BY_ID: "MatTypeMaster/GetMattypeByMattype", //Nalla

    GET_PRODUCTTYPE_MASTER_LIST: "ProdTypeMaster/GetAllProdType", //Nalla
    SAVE_PRODUCTTYPE_MASTER_LIST: "ProdTypeMaster/SaveProdTypeMaster", //Nalla
    GET_PRODUCTTYPE_BY_ID: "ProdTypeMaster/GetProdTypeByProdType", //Nalla

    GET_UDTYPE_MASTER_LIST: "UDMasterType/GetAllMiscType", //Nalla
    SAVE_UDTYPE_MASTER: "UDMasterType/SaveUDMasterType", //Nalla
    GET_UDTYPEMASTER_BY_ID: "UDMasterType/GetMiscTypeByMiscType", //Nalla


    GET_BUYERDIVISION_MASTER_LIST: "BuyerDivMaster/GetAllBuyerDivInfo", //Nalla
    SAVE_BUYERDIVISION_MASTER: "BuyerDivMaster/SaveBuyerDivMaster", //Nalla
    GET_BUYERDIVISIONEMASTER_BY_ID: "BuyerDivMaster/GetBuyerDivInfoByBuyerDivCode" ,//Nalla
   // GET_BUYERDIVISION_MASTER_LIST: "BuyerDivMaster/GetAllBuyerDivInfo", //Nalla

   GET_BUSINESS_GROUP_MASTER_LIST:"BGcodeMaster/GetAllBGcode", //Nalla
   GET_BUSINESS_GROUP_MASTER_BY_ID: "BGcodeMaster/GetBGcode", //Nalla
   SAVE_BUSINESS_GROUP_MASTER: "BGcodeMaster/SaveBGcodeMaster", //Nalla
    

   GET_CORPORATE_GROUP_MASTER_LIST:"CGcodeMaster/GetAllCGcode", //Nalla
   GET_CORPORATE_GROUP_MASTER_BY_ID: "CGcodeMaster/GetCGcode", //Nalla
   SAVE_CORPORATE_GROUP_MASTER: "CGcodeMaster/SaveCGcodeMaster", //Nalla

   GET_VERTICAL_GROUP_MASTER_LIST:"VGcodeMaster/GetAllVGcode", //Nalla
   GET_VERTICAL_GROUP_MASTER_BY_ID: "VGcodeMaster/GetVGcode", //Nalla
   SAVE_VERTICAL_GROUP_MASTER: "VGcodeMaster/SaveVGcodeMaster", //Nalla

   GET_PROJECT_MASTER_LIST:"PJMaster/GetAllPJMaster", //Nalla
   GET_PROJECT_MASTER_BY_ID: "PJMaster/GetPJMaster", //Nalla
   SAVE_PROJECT_MASTER: "PJMaster/SavePJMaster", //Nalla


   GET_SEASON_MASTER_LIST:"SeasonMaster/GetAllSeason", //Nalla
   GET_SEASON_MASTER_BY_ID: "SeasonMaster/GetSeasonBySeasonCode", //Nalla
   SAVE_SEASON_MASTER: "SeasonMaster/SaveSeasonMaster", //Nalla
    

   GET_STYLEDIV_MASTER_LIST:"StyleDivMaster/GetAllStyleDivMaster", //Nalla
   GET_STYLEDIV_MASTER_BY_ID: "StyleDivMaster/GetStyleDivMasterByFashionGroupProductTypStyleDivisioneSubProductType", //Nalla
   SAVE_STYLEDIV_MASTER: "StyleDivMaster/SaveStyleDivMaster", //Nalla

   GET_UD_MASTER_LIST:"UDMaster/GetAllUDMaster", //Nalla
   GET_UD_MASTER_BY_ID: "UDMaster/GetUDMasterByType", //Nalla
   SAVE_UD_MASTER: "UDMaster/SaveUDMaster", //Nalla

   GET_LINECOST_MASTER_LIST:"LineCostMaster/GetAllLineCostMaster", //Nalla
   GET_LINECOST_MASTER_BY_ID: "LineCostMaster/LineCostMaster/GetLineCostMasterByTransMonthTransYearLocCodeFactCodeLineGroup", //Nalla
   SAVE_LINECOST_MASTER: "LineCostMaster/SaveLineCostMasterList", //Nalla

   
   GET_SUPPLIER_MASTER_LIST:"SupplierMaster/GetAllSupplier", //Nalla
   GET_SUPPLIER_MASTER_BY_ID: "SupplierMaster/GetSupplier", //Nalla
   SAVE_SUPPLIER_MASTER: "SupplierMaster/SaveSupplierMaster" //Nalla

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