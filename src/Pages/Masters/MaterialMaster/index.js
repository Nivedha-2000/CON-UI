import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import '../DefectMasters/DefectMasters.css';
// import { Drawer, message, Spin, Switch } from 'antd';
import { Tag, Drawer, Switch, Pagination, Spin, message, Select } from 'antd';
import { ItrApiService } from '@afiplfeed/itr-ui';
import ApiCall from "../../../services";
import { API_URLS, MISCELLANEOUS_TYPES } from "../../../constants/api_url_constants";
import { getHostName, validateInputOnKeyup } from "../../../helpers";
import CustomTableContainer from "../../../components/Table/alter/AlterMIUITable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, FormGroup, Label, Input, FormText, Col, FormFeedback } from 'reactstrap';
// import '../../../Assets/style.css'
import bootstrap from 'bootstrap/dist/js/bootstrap'
// import '../../../Assets/bootstrapstyle.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
//assets/img/delete-tbl.svg
import deletetbl from '../../../Assets/images/style/delete-tbl.svg'
import breadcrumbIcon from '../../../Assets/images/style/bred-icon.svg'
import '../../../Assets/sumoselect.css'
import Checkbox from '@material-ui/core/Checkbox';
import jquery from '../../../Assets/js/jquerymin'
var arrFab = [];
var arrThd = [];
var arrTrims = [];
var arrPur = [];
var arrApproved = [];

let count = 0;
let count1 = 0;
const MatmastrequiredFields = ["parentGroup", "matType", "matGroup", "matSubGroup", "sysMatCode", "matCode", "matDesc", "buyDivcode", "approved", "approvedBy", "active"],
    fabrequiredFields = ["fibreContent", "fabricType", "fabWeave", "dyeProcess", "yarnWarp", "yarnWeft", "warpYarnBlend", "weftYarnBlend", "endsPerInch", "pickPerInch", "shrinkWarp", "shrinkWeft", "washMethod", "fabWt_BW", "fabWt_AW", "weightUom", "actualWidth", "cutWidth", "widthUom", "physicalFinish", "chemicalFinish"],
    TrimsrequiredFields = ["articleNo", "product", "finish", "remarks"],
    ThreadrequiredFields = ["quality", "tex", "tkt"],
    PurchaserequiredFields = ["matCode", "supcode", "supplierId", "supRefNo", "brand", "moq", "moqUom", "multiples", "leadtime", "color", "size", "fromDt", "toDt", "price", "curCode", "binCode", "purdesc", "remarks"],

    initialErrorMessages = {
        id: 0,
        parentGroup: "",
        matType: "",
        matGroup: "",
        matSubGroup: "",
        sysMatCode: "DADAS",
        matCode: "",
        matDesc: "",
        buyDivcode: "",
        approved: "N",
        approvedBy: "sdds",
        approvedDt: Date.UTC,
        active: 'Y',
        hostName: "",
        createdDate: "2022-08-22",
        createdBy: "AD",
        modifiedDate: "2022-08-22",
        modifiedBy: "",
        isActive: false,
        matMastFBRModels: [{
            id: 0,
            matMast_ID: 0,
            fibre: "",
            Content: 0,
            fibreContent: "",
            fabricType: "",
            fabWeave: "",
            dyeProcess: "",
            yarnWarp: "",
            yarnWeft: "",
            warpYarnBlend: "",
            weftYarnBlend: "",
            endsPerInch: "",
            pickPerInch: "",
            shrinkWarp: 0.00,
            shrinkWeft: 0.00,
            washMethod: "",
            fabWt_BW: 0.00,
            fabWt_AW: 0.00,
            weightUom: "",
            yarnWarp: "",
            actualWidth: 0,
            cutWidth: 0,
            widthUom: "",
            physicalFinish: "",
            chemicalFinish: "",
            hostName: "",
            createdDate: "2022-08-22",
            createdBy: "AD",
            modifiedDate: "2022-08-22",
            modifiedBy: "",
            isActive: false
        }],
        matMastThreadModels: [{
            id: 0,
            matMast_ID: 0,
            quality: "",
            tex: "",
            tkt: "",
            noOfMtr: 0,
            hostName: "",
            createdDate: "2022-08-22",
            createdBy: "AD",
            modifiedDate: "2022-08-22",
            modifiedBy: "",
            isActive: false
        }],
        matMastTrimsModels: [{
            id: 0,
            matMast_ID: 0,
            articleNo: "",
            product: "",
            finish: "",
            hostName: "",
            createdDate: "2022-08-22",
            createdBy: "AD",
            modifiedDate: "2022-08-22",
            modifiedBy: "",
            isActive: false
        }],
        matMastPurchaseModels: [
            {
                id: 0,
                matMast_ID: 0,
                matCode: "",
                supcode: "",
                supplierId: 0,
                supRefNo: "",
                brand: "",
                moq: 0,
                moqUom: "",
                multiples: 0,
                leadtime: 0,
                color: "",
                size: "",
                fromDt: Date.UTC,
                toDt: Date.UTC,
                price: 0.00,
                curCode: "",
                binCode: "",
                purdesc: "",
                remarks: "",
                active: 'Y',
                hostName: "",
                createdDate: "2022-08-22",
                createdBy: "AD",
                modifiedDate: "2022-08-22",
                modifiedBy: "",
                isActive: false
            }
        ]

    },
    initialFieldValues = {
        id: 0,
        parentGroup: "",
        matType: "",
        matGroup: "",
        matSubGroup: "",
        sysMatCode: "ddda",
        matCode: "",
        matDesc: "",
        buyDivcode: "",
        approved: "N",
        approvedBy: "sdds",
        approvedDt: "2022-09-27T11:50:04.3451877Z",
        active: 'Y',
        hostName: "",
        createdDate: "2022-08-22",
        createdBy: "AD",
        modifiedDate: "2022-08-22",
        modifiedBy: "",
        BuyDivArr: [],
        isActive: false,
        matMastFBRModels: arrFab,
        matMastThreadModels: arrThd,
        matMastTrimsModels: arrTrims,
        matMastPurchaseModels: arrPur
    },
    MatmastFabinitialValues = {
        id: 0,
        matMast_ID: 0,
        fibre: "",
        Content: 0,
        fibreContent: "",
        fabricType: "",
        fabWeave: "",
        dyeProcess: "",
        yarnWarp: "",
        yarnWeft: "",
        warpYarnBlend: "",
        weftYarnBlend: "",
        endsPerInch: "",
        pickPerInch: "",
        shrinkWarp: 0.00,
        shrinkWeft: 0.00,
        washMethod: "",
        fabWt_BW: 0.00,
        fabWt_AW: 0.00,
        weightUom: "",
        actualWidth: 0,
        cutWidth: 0,
        widthUom: "",
        physicalFinish: "",
        chemicalFinish: "",
        hostName: "",
        createdDate: "2022-08-22",
        createdBy: "AD",
        modifiedDate: "2022-08-22",
        modifiedBy: "",
        isActive: false
    },
    MatmastThreadinitialValues = {
        id: 0,
        matMast_ID: 0,
        quality: "",
        tex: "",
        tkt: "",
        noOfMtr: 0,
        hostName: "",
        createdDate: "2022-08-22",
        createdBy: "AD",
        modifiedDate: "2022-08-22",
        modifiedBy: "",
        isActive: false
    },
    MatmastTrimsinitialValues = {
        id: 0,
        matMast_ID: 0,
        articleNo: "",
        product: "",
        finish: "",
        remarks: "",
        hostName: "",
        createdDate: "2022-08-22",
        createdBy: "AD",
        modifiedDate: "2022-08-22",
        modifiedBy: "",
        isActive: false
    },
    MatmastPurchaseinitialValues = {
        id: 0,
        matMast_ID: 0,
        matCode: "",
        supcode: "",
        supplierId: 0,
        supRefNo: "",
        brand: "",
        moq: 0,
        moqUom: "",
        multiples: 0,
        leadtime: 0,
        color: "",
        size: "",
        fromDt: Date.UTC,
        toDt: Date.UTC,
        price: 0.00,
        curCode: "",
        binCode: "",
        purdesc: "",
        remarks: "",
        active: 'Y',
        hostName: "",
        createdDate: "2022-08-22",
        createdBy: "AD",
        modifiedDate: "2022-08-22",
        modifiedBy: "",
        isActive: false
    };
// initialFieldValues = {
//     id: 0,
//     entityID: "",
//     eCode: "",
//     eName: "",
//     address1: "",
//     address2: "",
//     address3: "",
//     city: "",
//     pinCode: "",
//     country: "",
//     tngstNo: "",
//     tinNo: "",
//     tanNo: "",
//     cinNo: "",
//     cstNo: "",
//     cstDate: Date.UTC,
//     panNo: "",
//     stNo: "",
//     areaCode: "",
//     emailId: "",
//     contPerson1: "",
//     contPerson2: "",
//     contNo: "",
//     gstNo: "",
//     active: 'Y',
//     hostName: "",
//     createdDate: "2022-08-22",
//     createdBy: "AD",
//     modifiedDate: "2022-08-22",
//     modifiedBy: "",
//     isActive: false
// };

function MaterialMaster({ name }) {
    const [visible, setVisible] = useState(false);
    const [Approvedvisible, setApprovedvisible] = React.useState(false);
    const [addvisible, setaddvisible] = React.useState(true);

    const [countryList, setcountryList] = useState([]);
    const [mattypeList, setmattypeList] = useState([]);
    const [matgroupList, setmatgroupList] = useState([]);
    const [matsubgroupList, setmatsubgroupList] = useState([]);
    const [buyerdivcodelist, setbuyerdivcodelist] = useState([]);
    const [fbrlist, setfbrList] = useState([]);
    const [fbrtypelist, setfbrtypeList] = useState([]);
    const [fbrweavelist, setfbrweaveList] = useState([]);
    const [fbrdyedlist, setfbrdyedList] = useState([]);
    const [fbrwashlist, setfbrwashList] = useState([]);
    const [uomlist, setuomList] = useState([]);
    const [phyFinishlist, setPhyFinishList] = useState([]);
    const [cheFinishlist, setCheFinishList] = useState([]);
    const [currencyList, setCurrencyList] = useState([]);
    const [trimsadd, setTrimsadd] = React.useState(false);
    const [EditDVisible, setEditDVisible] = React.useState(false);
    const [UpDVisible, setEditUpDVisible] = React.useState(true);
    const [suplierlist, setsuplierlist] = useState([]);
    // const [matSubGrouplist, setmatSubGrouplist] = useState([]);
    const [showAddtolist, setShowAddtolist] = React.useState(true);
    const [cloneSave, setCloneSave] = React.useState(false);
    const [showUpdatetolist, setShowUpdatetolist] = React.useState(false);

    const [showResults, setShowResults] = React.useState(false);
    const [showForm, setShowForm] = React.useState(true);
    const [showitemLists, setShowitemLists] = React.useState(false);
    const [showApprovallist, setShowApprovallist] = React.useState(false);
    //const [showFabricTab, setshowFabricTab] = React.useState(true);

    const [showFabricTab, setshowFabricTab] = React.useState(false);
    const [showThredTab, setshowThredTab] = React.useState(false);
    const [showTrimsTab, setshowTrimsTab] = React.useState(false);
    const [showPurchaseTab, setshowPurchaseTab] = React.useState(false);

    const [entityVisible, setEntityVisible] = useState(true);
    const [Savevisible, setSavevisible] = React.useState(true);
    const [updatevisible, setUpdatevisible] = React.useState(false);

    const [Threadvisible, setThreadvisible] = React.useState(true);
    const [Fabricvisible, setFabricvisible] = React.useState(true);
    const [Trimsvisible, setTrimsvisible] = React.useState(true);
    const [Purchasevisible, setPurchasevisible] = React.useState(true);
    //const [Purchasevisible, setPurchasevisible] = React.useState(false);


    // const [Threadvisible, setThreadvisible] = React.useState(false);
    // const [Fabricvisible, setFabricvisible] = React.useState(false);
    // const [Trimsvisible, setTrimsvisible] = React.useState(false);
    // const [Purchasevisible, setPurchasevisible] = React.useState(false);
    const [trimsGridfields, setrimsGridFields] = useState([]);
    const [fields, setFields] = useState({
        ...initialFieldValues
    });
    const [fabricfields, setFabricFields] = useState({
        ...MatmastFabinitialValues
    });
    const [threadfields, setThreadFields] = useState({
        ...MatmastThreadinitialValues
    });
    const [trimsfields, setTrimsFields] = useState({
        ...MatmastTrimsinitialValues
    });
    const [purchasefields, setPurchaseFields] = useState({
        ...MatmastPurchaseinitialValues
    });
    const [listLoading, setListLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    // const [list, setList] = useState([]);
    const [approvedlist, setApprovedList] = useState([]);
    const [pendinglist, setPendingList] = useState([]);
    const [pendinglist1, setPendingList1] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    })
    const { Option } = Select;
    const clearFields = () => {
        // setFields({ ...fields, matMastTrimsModels: [], matMastPurchaseModels: [] });
        setFields({
            ...initialFieldValues, matMastTrimsModels: [], matMastPurchaseModels: []
        });
        setFabricFields({
            ...MatmastFabinitialValues
        });
        setThreadFields({
            ...MatmastThreadinitialValues
        });
        setTrimsFields({
            ...MatmastTrimsinitialValues
        });
        setPurchaseFields({
            ...MatmastPurchaseinitialValues
        });
        setshowFabricTab(false);
        setshowThredTab(false);
        setshowTrimsTab(false);
        setshowPurchaseTab(false);
        setThreadvisible(true);
        setFabricvisible(true);
        setTrimsvisible(true);
        setPurchasevisible(true);
        //setFields({ ...fields, matMastTrimsModels: [], matMastPurchaseModels: [] });
        //setFields.matMastTrimsModels([])
        //setFields.matMastPurchaseModels([])
        setErrors({ ...initialErrorMessages });
    }
    const clearTrimsFields = () => {
        setTrimsFields({
            ...MatmastTrimsinitialValues
        });
        setErrors({ ...initialErrorMessages });
    }
    const clearPurchaseFields = () => {
        setPurchaseFields({
            ...MatmastPurchaseinitialValues
        });
        setErrors({ ...initialErrorMessages });
    }
    // const clearFields = () => {
    //     setFields({
    //         ...initialFieldValues
    //     });
    //     setErrors({ ...initialErrorMessages });
    // }

    const onClose = () => {
        clearFields()
        setVisible(false);
    };

    const showDrawer = () => {
        setVisible(true);
    };

    const allCheck = (pendinglist.length > 0 ? (pendinglist.length == pendinglist.filter(f => f.approved == "Y").length) : false);

    const pageSize = 10;

    // for-list-pagination
    const [pagination, setPagination] = useState({
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0
    });

    useEffect(() => {
        //getDatas();
        getPendingDatas();
        getApprovedDatas();
        getParentGroup();
        // getMatType();
        getActiveSuplier();
        // getMatSubGroup();
        getBuyerDivCode();
        getFiber();
        getFiberType();
        getFiberWeave();
        getFibDyed();
        getWashMethod();
        getUom();
        getPhisicalFinish();
        getChemicalFinish();
        getCurrency();
    }, []);

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

    // const getOrginLocationType = () => {
    //     ApiCall({
    //         path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.COUNTRY
    //     }).then(resp => {
    //         // try {
    //         setcountryList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
    //         // } catch (e) {
    //         //     message.error("response is not as expected")
    //         // }
    //     }).catch(err => {
    //         message.error(err.message || err)
    //     })
    // }

    const getParentGroup = () => {

        ItrApiService.GET({
            url: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.PARENTGRP,
            appCode: "CNF"
        }).then(resp => {
            setcountryList(resp.data.filter(q => q.active == 'Y').map(d => ({ code: d.code, codeDesc: d.codeDesc })))
        });
    }

    const getMatType = () => {

        ItrApiService.GET({
            url: API_URLS.GET_MATERIALTYPE_MASTER_LIST,
            appCode: "CNF"
        }).then(resp => {
            setmattypeList(resp.data.filter(q => q.active == 'Y').map(d => ({ code: d.mattype, codeDesc: d.matDesc })))
        });
    }

    const getActiveSuplier = () => {

        ItrApiService.GET({
            url: API_URLS.GET_ACTIVE_SUPPLIER_MASTER_DD,
            appCode: "CNF"
        }).then(resp => {
            setsuplierlist(resp.data.map(d => ({ id: d.supplierId, code: d.supCode, codeDesc: d.supName })))
        });
    }

    // const getMatSubGroup = () => {

    //     ItrApiService.GET({
    //         url: API_URLS.GET_MATERIALGROUP_MASTER_LIST,
    //         appCode: "CNF"
    //     }).then(resp => {
    //         setmatsubgroupList(resp.data.map(d => ({ code: d.matSubGroup, codeDesc: d.matSubGroup })))
    //     });
    // }

    const getBuyerDivCode = () => {
        ApiCall({
            path: API_URLS.GET_BUYDIVCODE_DROPDOWN
        }).then(resp => {
            //  setbuyerdivcodelist(resp.data.map(d => ({ code: d.buyDivCode, codeDesc: d.buyDivCode })))
            // try {
            setbuyerdivcodelist(resp.data.filter(q => q.active == 'Y').map(d => ({ code: d.buyDivCode, codeDesc: d.buyDivCode })))
            // } catch (e) {
            //     message.error("response is not as expected")
            // }
        }).catch(err => {
            message.error(err.message || err)
        })
    }


    const getFiber = () => {

        ItrApiService.GET({
            url: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.FBRCONTENT,
            appCode: "CNF"
        }).then(resp => {
            setfbrList(resp.data.filter(q => q.active == 'Y').map(d => ({ code: d.code, codeDesc: d.codeDesc })))
        });
    }


    const getFiberType = () => {

        ItrApiService.GET({
            url: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.FABTYPE,
            appCode: "CNF"
        }).then(resp => {
            setfbrtypeList(resp.data.filter(q => q.active == 'Y').map(d => ({ code: d.code, codeDesc: d.codeDesc })))
        });
    }

    const getFiberWeave = () => {

        ItrApiService.GET({
            url: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.FBRWeave,
            appCode: "CNF"
        }).then(resp => {
            setfbrweaveList(resp.data.filter(q => q.active == 'Y').map(d => ({ code: d.code, codeDesc: d.codeDesc })))
        });
    }

    const getFibDyed = () => {

        ItrApiService.GET({
            url: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.FBRDyed,
            appCode: "CNF"
        }).then(resp => {
            setfbrdyedList(resp.data.filter(q => q.active == 'Y').map(d => ({ code: d.code, codeDesc: d.codeDesc })))
        });
    }

    const getWashMethod = () => {

        ItrApiService.GET({
            url: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.WASH,
            appCode: "CNF"
        }).then(resp => {
            setfbrwashList(resp.data.filter(q => q.active == 'Y').map(d => ({ code: d.code, codeDesc: d.codeDesc })))
        });
    }
    const getUom = () => {

        ItrApiService.GET({
            url: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.UOM,
            appCode: "CNF"
        }).then(resp => {
            setuomList(resp.data.filter(q => q.active == 'Y').map(d => ({ code: d.code, codeDesc: d.codeDesc })))
        });
    }

    const getPhisicalFinish = () => {

        ItrApiService.GET({
            url: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.FBRPhyFin,
            appCode: "CNF"
        }).then(resp => {
            setPhyFinishList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
        });
    }
    const getChemicalFinish = () => {

        ItrApiService.GET({
            url: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.FBRCheFin,
            appCode: "CNF"
        }).then(resp => {
            setCheFinishList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
        });
    }

    const getCurrency = () => {

        ItrApiService.GET({
            url: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.CUR,
            appCode: "CNF"
        }).then(resp => {
            setCurrencyList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
        });
    }
    // const getDatas = () => {
    //     setListLoading(true)
    //     ApiCall({
    //         path: API_URLS.GET_ALL_MATERIAL_LIST

    //     }).then(resp => {
    //         setListLoading(false)
    //         if (Array.isArray(resp.data)) {
    //             setList(resp.data)
    //         } else {
    //             message.error("Response data is expected as array")
    //         }
    //     }).catch(err => {
    //         setListLoading(false)
    //         message.error(err.message || err)
    //     })


    // }
    const getPendingDatas = () => {
        setListLoading(true)
        ApiCall({
            path: API_URLS.GET_ALL_MATERIAL_PENDING_LIST

        }).then(resp => {
            setListLoading(false)
            if (Array.isArray(resp.data)) {
                setPendingList(resp.data)
                setPendingList1(resp.data)
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            setListLoading(false)
            message.error(err.message || err)
        })


    }
    const getApprovedDatas = () => {
        setListLoading(true)
        ApiCall({
            path: API_URLS.GET_ALL_MATERIAL_APPROVED_LIST

        }).then(resp => {
            setListLoading(false)
            if (Array.isArray(resp.data)) {
                setApprovedList(resp.data)
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            setListLoading(false)
            message.error(err.message || err)
        })


    }
    const NUMBER_IS_FOCUS_IN_ZERO = name => (e) => {
        if (e.target.value == "0" || e.target.value == "" || e.target.value == undefined) {
            //    setprofitPercentList({ ...profitPercentList, [name]: "" });
            // setFields({ ...AddTnamodels, [name]: "" })
            setFabricFields({ ...fabricfields, [name]: '' });
        }
    }
    const NUMBER_IS_FOCUS_OUT_ZERO = name => (e) => {
        if (e.target.value == "" || e.target.value == undefined) {
            // setFields({ ...AddTnamodels, [name]: 0 })
            setFabricFields({ ...fabricfields, [name]: 0 });
        }
    }

    const NUMBER_IS_FOCUS_IN_ZERO_THD = name => (e) => {
        if (e.target.value == "0" || e.target.value == "" || e.target.value == undefined) {
            //    setprofitPercentList({ ...profitPercentList, [name]: "" });
            // setFields({ ...AddTnamodels, [name]: "" })
            // setThredFields({ ...thredfields, [name]: 0 });
            setThreadFields({ ...threadfields, [name]: '' })
        }
    }
    const NUMBER_IS_FOCUS_OUT_ZERO_THD = name => (e) => {
        if (e.target.value == "" || e.target.value == undefined) {
            // setFields({ ...AddTnamodels, [name]: 0 })           
            setThreadFields({ ...threadfields, [name]: 0 })
        }
    }

    const NUMBER_IS_FOCUS_IN_ZERO_PUR = name => (e) => {
        if (e.target.value == "0" || e.target.value == "" || e.target.value == undefined) {
            //    setprofitPercentList({ ...profitPercentList, [name]: "" });
            // setFields({ ...AddTnamodels, [name]: "" })
            // setThredFields({ ...thredfields, [name]: 0 });
            setThreadFields({ ...threadfields, [name]: '' })
        }
    }
    const NUMBER_IS_FOCUS_OUT_ZERO_PUR = name => (e) => {
        if (e.target.value == "" || e.target.value == undefined) {
            // setFields({ ...AddTnamodels, [name]: 0 })           
            setPurchaseFields({ ...purchasefields, [name]: 0 })
        }
    }
    const onClick = () => {
        setShowResults(false)
        setShowForm(true)
        setShowApprovallist(false);
        setShowitemLists(false);
        setEditDVisible(false);
        setEditUpDVisible(true);
        count = 0;
        count1 = 0;
    }
    const onClickList = () => {
        setShowResults(true)
        setShowForm(false)
        setShowApprovallist(true);
        setShowitemLists(false);
    }
    const onClickPending = () => {
        setShowResults(true)
        setShowForm(false)
        setShowApprovallist(false);
        setShowitemLists(true);
    }
    const close = () => {
        clearFields()
        setShowResults(true)
        setShowForm(false)
        setSavevisible(true)
        setUpdatevisible(false)
        setEntityVisible(false);

        setshowFabricTab(false);
        setshowTrimsTab(false);
        setshowPurchaseTab(false);
        setshowThredTab(false);
        onClickList();
        // setShowApprovallist(true);
        // setShowitemLists(false);
    }

    // const ChangeEvent = (e) => {
    //     debugger;
    //     this.setState({ [e.target.name]: e.target.value });
    //     // this.setstatevaluedropdownfunction(e.target.name, e.target.value);
    // }

    const inputOnChange = name => e => {
        debugger;
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'matType') {


            // setshowTrimsTab(false);
            // setshowPurchaseTab(false);
            // setshowThredTab(false);
            // setThreadvisible(false);
            // setFabricvisible(false);
            // setshowFabricTab(false);
            // setTrimsvisible(false);
            // setPurchasevisible(false);
            debugger;
            // alert(e.target.value);
            // alert([name]);
            // edit(AddTnamodels.buyCode, AddTnamodels.buydivCode, AddTnamodels.deptcode, AddTnamodels.locCode, e.target.value, 'edit')
            //setAddTnamodels({ ...AddTnamodels, [name]: value })
            if (e.target.value === 'FBR') {

                setshowTrimsTab(true);
                setshowPurchaseTab(false);
                setshowThredTab(false);
                setThreadvisible(true);
                setFabricvisible(false);
                setshowFabricTab(true);
                setTrimsvisible(false);
                setPurchasevisible(true);
                //("home-tab")

            }
            else if (e.target.value === 'FTD') {
                setshowFabricTab(false);
                setshowTrimsTab(true);
                setshowPurchaseTab(false);
                setshowThredTab(true);
                setFabricvisible(true);
                setThreadvisible(false);
                setTrimsvisible(false);
                setPurchasevisible(true);
            }
            else {
                setshowFabricTab(false);
                setshowTrimsTab(true);
                setshowPurchaseTab(false);
                setshowThredTab(false);
                setFabricvisible(true);
                setThreadvisible(true);
                setTrimsvisible(false);
                setPurchasevisible(true);
            }
            GetmatGroupDropDown(e.target.value);
            setFields({ ...fields, [name]: value.toUpperCase() })
            //setFields({ ...fields, ['matCode']: value })
            //setFields({ ...fields, ['matType']: value })

        }
        else if (name === 'parentGroup') {
            debugger;
            getMatType();
            // GetmatSubGroupDropDown(fields.matType, e.target.value);
            setFields({ ...fields, [name]: value.toUpperCase() })
        }
        else if (name === 'matCode') {
            setFields({ ...fields, [name]: value.toUpperCase() })
            setPurchaseFields({ ...purchasefields, [name]: value.toUpperCase() })

        }
        else if (name === 'matGroup') {

            //let f = fields.matCode
            //let mattp = fields.matType
            //setFields({ ...fields, ['matCode']: f + value.toUpperCase() })

            debugger;
            GetmatSubGroupDropDown(fields.matType, e.target.value);
            setFields({ ...fields, [name]: value.toUpperCase() })


        }
        else {
            setFields({ ...fields, [name]: value })
        }


    }
    const inputOnChangeFab = name => e => {
        debugger;
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'Content') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                //alert(e.target.value);
                setFabricFields({ ...fabricfields, [name]: value });
                err['Content'] = ''
                setErrors({ ...initialErrorMessages, ...err })
            }
            else {
                message.error(typeof err == "string" ? err : "Please enter numbers only");
                value == 0;
                setFabricFields({ ...fabricfields, [name]: value });
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'shrinkWarp' || name === 'shrinkWeft' || name === 'fabWt_BW' || name === 'fabWt_AW') {
            const re = /^[.0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFabricFields({ ...fabricfields, [name]: value });
                err['shrinkWarp'] = ''
                err['shrinkWeft'] = ''
                err['fabWt_BW'] = ''
                err['fabWt_AW'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['shrinkWarp'] = "Please enter numbers only"
                err['shrinkWeft'] = "Please enter numbers only"
                err['fabWt_BW'] = "Please enter numbers only"
                err['fabWt_AW'] = "Please enter numbers only"

                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'actualWidth' || name === 'cutWidth') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFabricFields({ ...fabricfields, [name]: value });
                err['actualWidth'] = ''
                err['cutWidth'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['actualWidth'] = "Please enter numbers only"
                err['cutWidth'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else {
            setFabricFields({ ...fabricfields, [name]: value });
        }

    }
    // const inputOnChangeFabs = name => e => {
    //     debugger;
    //     let err = {}, validation = true
    //     let value = e.target.value
    //     if (name === 'Content') {
    //         const re = /^[0-9\b]+$/;
    //         // alert(re);   /^[+-]?\d*(?:[.,]\d*)?$/
    //         debugger;
    //         if (e.target.value === '' || re.test(e.target.value)) {
    //             //alert(e.target.value);
    //             setFabricFields({ ...fabricfields, [name]: value });
    //             err['Content'] = ''
    //             setErrors({ ...initialErrorMessages, ...err })
    //         }
    //         else {
    //             debugger;
    //             message.error(typeof err == "string" ? err : "Please enter numbers only");
    //             value == 0;
    //             //setFabricFields({ ...fabricfields.Content == 0 });
    //             setFabricFields({ ...fabricfields, [name]: value });
    //             // setFabricFields({ ...fabricfields, [name]: '' })
    //             // err['Content'] = "Please enter numbers only"
    //             validation = false
    //             setErrors({ ...errors, ...err })

    //             // // setErrors({ ...errors, ...err })
    //             // message.error(typeof err == "string" ? err : "Please enter numbers only");
    //             // setFabricFields({ ...fabricfields, [name]: '' });
    //             // setErrors({ ...errors, ...err })
    //         }
    //     }
    //     // if (name === 'entityID' || name === 'eCode' || name === 'eName') {
    //     //     setFabricFields({ ...fabricfields, [name]: value.toUpperCase() })
    //     // }
    //     // else {
    //     //     setFabricFields({ ...fabricfields, [name]: value })
    //     // }

    // }
    const inputOnChangeThread = name => e => {
        debugger;
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'entityID' || name === 'eCode' || name === 'eName') {
            setThreadFields({ ...threadfields, [name]: value.toUpperCase() })
        }
        else if (name === 'noOfMtr') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setThreadFields({ ...threadfields, [name]: value.toUpperCase() })
                err['noOfMtr'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['noOfMtr'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else {
            setThreadFields({ ...threadfields, [name]: value })
        }

    }
    const inputOnChangeTrims = name => e => {
        debugger;
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'entityID' || name === 'eCode' || name === 'eName') {
            setTrimsFields({ ...trimsfields, [name]: value.toUpperCase() })
        }
        else {
            setTrimsFields({ ...trimsfields, [name]: value })
        }

    }
    const inputOnChangePurchase = name => e => {
        debugger;
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'supcode') {
            debugger;
            // let sid = value.split('|')[0]
            // let scode = value.split('|')[1]
            let bin = purchasefields.matCode + '' + value

            // setPurchaseFields({ ...purchasefields, ['supcode']: scode.toUpperCase() })

            setPurchaseFields({ ...purchasefields, [name]: value, ['binCode']: bin })

            //setPurchaseFields({ ...purchasefields, ['supcode']: scode.toUpperCase(),['supplierId']: sid.toUpperCase(),['binCode']: bin.toUpperCase() })

            // setPurchaseFields({ ...purchasefields, ['supplierId']: sid.toUpperCase() })

            // setPurchaseFields({ ...purchasefields, ['binCode']: bin.toUpperCase() })


        }
        else {
            setPurchaseFields({ ...purchasefields, [name]: value })
        }
        //setPurchaseFields({ ...purchasefields, ['binCode']: bin.toUpperCase() })

    }
    const GetmatGroupDropDown = (mattype) => {
        //alert(API_URLS.GET_MATERIALGROUP_DROPDOWN + "?mattype=" + mattype);
        ApiCall({
            path: API_URLS.GET_MATERIALGROUP_DROPDOWN + "?mattype=" + mattype,
        }).then(resp => {
            try {
                // alert(resp.data);
                setmatgroupList(resp.data)
                console.log(resp.data)
            } catch (er) {
                message.error("Response data is not as expected")
            }
        })
            .catch(err => {
                message.error(err.message || err)
            })

    }

    const GetmatSubGroupDropDown = (mattype, matgroup) => {
        // alert(API_URLS.GET_MATERIAL_SUBGROUP_DROPDOWN + "?mattype=" + mattype + "&MatGroup=" + matgroup);
        ApiCall({
            path: API_URLS.GET_MATERIAL_SUBGROUP_DROPDOWN + "?mattype=" + mattype + "&MatGroup=" + matgroup,
        }).then(resp => {
            try {
                // alert(resp.data);
                setmatsubgroupList(resp.data)
                console.log(resp.data)
            } catch (er) {
                message.error("Response data is not as expected")
            }
        })
            .catch(err => {
                message.error(err.message || err)
            })

    }

    // let count = 0;
    // let count1 = 0;

    function AddContent() {
        let fibcon = '';
        let final = '';
        let fib = fabricfields.fibre === "" ? "" : fabricfields.fibre;
        let con = fabricfields.Content === "" ? 0 : fabricfields.Content;
        //count = count1 + con
        count = parseInt(count1) + parseInt(con);

        fibcon = con + ' % ' + fib
        if (count <= 100) {
            let fibcons = fabricfields.fibreContent
            if (fabricfields.Content != 0 && fabricfields.fibre != '') {
                if (fabricfields.fibreContent == '') {
                    final = fibcon
                    fibcon = ''
                }
                else {
                    final = fibcons + ' + ' + fibcon
                }
                count1 = parseInt(count);
                setFabricFields({ ...fabricfields, ['fibreContent']: final })
                setFields({ ...fields, ['matDesc']: final })
                //setFabricFields({ ...fabricfields, ['fibre']: '' })
                //setFabricFields({ ...fabricfields, ['Content']: '' })

            }
        }
        else {
            message.error("Content Should Not more than 100")
        }
    }
    function AddYarnWarp() {
        debugger;
        let YarnW = fabricfields.yarnWarp
        setFabricFields({ ...fabricfields, ['warpYarnBlend']: YarnW })
        //setFabricFields({ ...fabricfields, ['yarnWarp']: '32342324324' })
        //setFabricFields({ ...fabricfields, ['warpYarnBlend']: YarnW })
        //setFabricFields({ ...fabricfields, yarnWarp: ''});
        //fabricfields.yarnWarp = "";

    }
    function AddYarnWeft() {
        debugger;
        let YarnF = fabricfields.yarnWeft
        setFabricFields({ ...fabricfields, ['weftYarnBlend']: YarnF })
        // setFabricFields({ ...fabricfields, ['yarnWeft']: '' })
        //fabricfields.yarnWeft = "";
        //setFabricFields({ ...fabricfields, yarnWeft: ""});



    }
    const Approved = async (id) => {
        // function Approved() {
        // checked={true};
    }
    function AddTrims() {
        // alert("ADD");
        debugger;
        //  let c = 0;
        let err = {}, validation = true
        TrimsrequiredFields.forEach(f => {
            if (trimsfields[f] === "") {
                err[f] = "This field is required"
                validation = false
                //   ++c;
            } else {
                validation = true
            }
        })
        setErrors({ ...initialErrorMessages, ...err })
        debugger;
        console.log(trimsfields);
        setEditDVisible(false);
        setEditUpDVisible(true);
        //fields.push(AddTnamodels)
        //clearFieldsVisualSam();
        debugger;
        if (validation == true) {
            //alert(AddTnamodels.id);
            if (trimsfields.id == 0) {
                debugger;
                //setTrimsFields([...fields.matMastTrimsModels, trimsfields])
                fields.matMastTrimsModels.push(trimsfields);
                clearTrimsFields();
                //  fields.matMastTrimsModels.push(trimsfields);
                // Clear();
                // clearFields();
            }
            else {
                fields.matMastTrimsModels.push(trimsfields);
                clearTrimsFields();
                debugger;
                //alert(AddTnamodels.id);
                // setShowAddtolist(true);
                // setShowUpdatetolist(false);
                // //GetdependActCodeDropDown(AddTnamodels.buyCode, AddTnamodels.buydivCode, AddTnamodels.deptcode, AddTnamodels.locCode, AddTnamodels.activityType);
                // //onChange={inputOnChange("activityType")};
                // // let toUpdateData = fields.filter(q => q.id == AddTnamodels.id)
                // //console.log(toUpdateData);
                // let toUpdateData = trimsfields.map((item) => {
                //     if (item.matMast_ID === trimsfields.matMast_ID) {
                //         item.buyCode = trimsfields.buyCode,
                //             //item.articleNo = trimsfields.articleNo,
                //             item.articleNo = trimsfields.articleNo,
                //             item.product = trimsfields.product,
                //             item.finish = trimsfields.finish,
                //             item.remarks = trimsfields.remarks,
                //             item.hostName = trimsfields.hostName,
                //             item.createdDate = trimsfields.createdDate,
                //             item.createdBy = trimsfields.createdBy,
                //             item.modifiedDate = trimsfields.modifiedDate,
                //             item.modifiedBy = trimsfields.modifiedBy,
                //             item.isActive = trimsfields.isActive
                //     }
                //     return item;
                // });
                // trimsfields.articleNo = 0;
                // trimsfields.product = "",
                // trimsfields.finish = "",
                // trimsfields.remarks = "",
                // trimsfields.id = 0,
                // //trimsfields.activity = "",

                //     //this.setState({ TaskData: toUpdateData });
                //     setTrimsFields(toUpdateData);

                //Clear();
                //clearFields();
                //onClose();
                // alert(AddTnamodels.id);
            }

            //  fields.push(AddTnamodels)
            //ClearDetails();
        }

    }
    function AddPurchase() {
        // alert("ADD");
        debugger;
        //  let c = 0;
        let err = {}, validation = true
        PurchaserequiredFields.forEach(f => {
            if (purchasefields[f] === "") {
                err[f] = "This field is required"
                validation = false
                //   ++c;
            } else {
                validation = true
            }
        })
        setErrors({ ...initialErrorMessages, ...err })
        debugger;
        console.log(purchasefields);
        //fields.push(AddTnamodels)
        //clearFieldsVisualSam();
        debugger;
        if (validation == true) {
            //alert(AddTnamodels.id);
            if (purchasefields.id == 0) {
                debugger;
                //setTrimsFields([...fields.matMastTrimsModels, trimsfields])
                fields.matMastPurchaseModels.push(purchasefields);
                clearPurchaseFields();
                //  fields.matMastTrimsModels.push(trimsfields);
                // Clear();
                // clearFields();
            } else {
                fields.matMastPurchaseModels.push(purchasefields);
                clearPurchaseFields();
                debugger;
                // alert(AddTnamodels.id);
                // setShowAddtolist(true);
                // setShowUpdatetolist(false);
                // GetdependActCodeDropDown(AddTnamodels.buyCode, AddTnamodels.buydivCode, AddTnamodels.deptcode, AddTnamodels.locCode, AddTnamodels.activityType);
                // //onChange={inputOnChange("activityType")};
                // // let toUpdateData = fields.filter(q => q.id == AddTnamodels.id)
                // //console.log(toUpdateData);
                // let toUpdateData = fields.map((item) => {
                //     if (item.id === AddTnamodels.id) {
                //         item.buyCode = AddTnamodels.buyCode,
                //             item.buydivCode = AddTnamodels.buydivCode,
                //             item.deptcode = AddTnamodels.deptcode,
                //             item.locCode = AddTnamodels.locCode,
                //             item.activityType = AddTnamodels.activityType,
                //             item.mActive = AddTnamodels.mActive,
                //             item.orderCategory = AddTnamodels.orderCategory,
                //             item.stage = AddTnamodels.stage,
                //             item.fit = AddTnamodels.fit,
                //             item.actCode = AddTnamodels.actCode,
                //             item.activity = AddTnamodels.activity,
                //             item.subActivity = AddTnamodels.subActivity,
                //             item.criticalActivity = AddTnamodels.criticalActivity,
                //             item.tnaSeqNo = AddTnamodels.tnaSeqNo,
                //             item.duration = AddTnamodels.duration,
                //             item.dependActCode = AddTnamodels.dependActCode,
                //             item.dependDeptCode = AddTnamodels.dependDeptCode,
                //             item.dependActvity = AddTnamodels.dependActvity,
                //             item.dependSubActvity = AddTnamodels.dependSubActvity,
                //             item.preNotifyDays = AddTnamodels.preNotifyDays,
                //             item.notifyRoleId = AddTnamodels.notifyRoleId,
                //             item.l1EscalateDays = AddTnamodels.l1EscalateDays,
                //             item.l1EscalateRole = AddTnamodels.l1EscalateRole,
                //             item.l2EscalateDays = AddTnamodels.l2EscalateDays,
                //             item.l2EscalateRole = AddTnamodels.l2EscalateRole,
                //             item.category = AddTnamodels.category,
                //             item.valueAddtype = AddTnamodels.valueAddtype,
                //             item.weightage = AddTnamodels.weightage,
                //             item.skipped = AddTnamodels.skipped,
                //             item.remarks = AddTnamodels.remarks,
                //             item.cancel = AddTnamodels.cancel,
                //             item.active = AddTnamodels.active,
                //             item.hostName = AddTnamodels.hostName,
                //             item.createdDate = AddTnamodels.createdDate,
                //             item.createdBy = AddTnamodels.createdBy,
                //             item.modifiedDate = AddTnamodels.modifiedDate,
                //             item.modifiedBy = AddTnamodels.modifiedBy,
                //             item.isActive = AddTnamodels.isActive
                //     }
                //     return item;
                // });
                // AddTnamodels.id = 0;
                // AddTnamodels.orderCategory = "",
                //     AddTnamodels.stage = "",
                //     AddTnamodels.fit = "",
                //     AddTnamodels.actCode = 0,
                //     AddTnamodels.activity = "",
                //     AddTnamodels.subActivity = "",
                //     AddTnamodels.criticalActivity = "",
                //     AddTnamodels.tnaSeqNo = 0,
                //     AddTnamodels.duration = 0,
                //     AddTnamodels.dependActCode = 0,
                //     AddTnamodels.dependDeptCode = "",
                //     AddTnamodels.dependActvity = "",
                //     AddTnamodels.dependSubActvity = "",
                //     AddTnamodels.preNotifyDays = 0,
                //     AddTnamodels.notifyRoleId = "",
                //     AddTnamodels.l1EscalateDays = 0,
                //     AddTnamodels.l1EscalateRole = "",
                //     AddTnamodels.l2EscalateDays = 0,
                //     AddTnamodels.l2EscalateRole = "",
                //     AddTnamodels.category = "NA",
                //     AddTnamodels.valueAddtype = "",
                //     AddTnamodels.weightage = 0,
                //     AddTnamodels.skipped = "N",
                //     AddTnamodels.remarks = "",
                //     AddTnamodels.cancel = "Y",
                //     AddTnamodels.active = 'Y',
                //this.setState({ TaskData: toUpdateData });
                //setFields(toUpdateData);

                //Clear();
                //clearFields();
                //onClose();
                // alert(AddTnamodels.id);
            }

            //  fields.push(AddTnamodels)
            //ClearDetails();
        }

    }
    const Save = async (entityID, eCode, eName, type) => {
        debugger;
        //  alert(buyCode, buyDivCode, productType, type);
        if (loader) return
        let err = {}, validation = true
        debugger;
        MatmastrequiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            }
        })
        setErrors({ ...initialErrorMessages, ...err })
        if (type === "update") {

            if (validation) {
                setLoader(true)

                ApiCall({
                    method: "POST",
                    path: API_URLS.SAVE_MATERIAL_MASTER,
                    data: {
                        ...fields,
                        hostName: getHostName()
                    }
                }).then(resp => {
                    setLoader(false)
                    message.success(resp.message)
                    onClose()
                    //getDatas()
                    setSavevisible(true)
                    setUpdatevisible(false)
                    setEntityVisible(false);
                    setShowResults(true)
                    setShowForm(false)
                    setShowApprovallist(false);
                    setShowitemLists(true);
                }).catch(err => {
                    setLoader(false)
                    setFields({
                        ...initialFieldValues, matMastTrimsModels: [], matMastPurchaseModels: []
                    });
                    //  fields['ftdOprName'] = tempOprName
                    setFields({ ...fields })
                    setErrors({ ...initialErrorMessages })
                    message.error(err.message || err)
                })
            }
        }
        else {
            if (fields.matType === 'FBR') {
                fabrequiredFields.forEach(f => {
                    if (fabricfields[f] === "") {
                        err[f] = "This field is required"
                        validation = false
                    }
                })
                setErrors({ ...initialErrorMessages, ...err })
                if (fields.matMastTrimsModels == "") {
                    message.error("Atleast Add One Row in Details Tab")
                    return
                }// trimsfields.length == 0) 
                else {
                    if (validation) {
                        arrThd = null;
                        arrPur = null;
                        fields.matMastFBRModels.push(fabricfields);
                        //fields.matMastTrimsModels.push(trimsfields);
                    }
                    //fields.matMastTrimsModels.push(trimsfields);
                }

                //fields.matMastThreadModels.null;
                //setFields({ ...fields, aqlvmDetlModels: toUpdateData1 });
                //setFields({ ...fields, aqlvmDetlModels: toUpdateData1 });

                //fields.matMastPurchaseModels.null;
                debugger;
            }
            else if (fields.matType === 'FTD') {
                ThreadrequiredFields.forEach(f => {
                    if (threadfields[f] === "") {
                        err[f] = "This field is required"
                        validation = false
                    }
                })
                setErrors({ ...initialErrorMessages, ...err })
                if (fields.matMastTrimsModels == "") {
                    message.error("Atleast Add One Row in Details Tab")
                    return

                }
                else {
                    if (validation) {
                        arrFab = null;
                        arrPur = null;
                        fields.matMastThreadModels.push(threadfields);
                        //fields.matMastTrimsModels.push(trimsfields);
                    }
                    //fields.matMastTrimsModels.push(trimsfields);
                }


            }
            else {
                if (fields.matType === '') {
                    message.error("Please Fill The Header")
                    return
                    // setErrors({ ...initialErrorMessages, ...err })

                }
                else {
                    if (fields.matMastTrimsModels == "") {
                        message.error("Atleast Add One Row in Details Tab")
                        return
                    }
                    else {
                        if (validation) {
                            arrFab = null;
                            arrPur = null;
                            arrThd = null;
                            //fields.matMastTrimsModels.push(trimsfields);
                        }
                        //fields.matMastTrimsModels.push(trimsfields);
                    }
                }
            }
            console.log(fields);
            setErrors({ ...initialErrorMessages, ...err })
            if (validation) {
                setLoader(true)

                ApiCall({
                    method: "POST",
                    path: API_URLS.SAVE_MATERIAL_MASTER,
                    data: {
                        ...fields,
                        hostName: getHostName()
                    }
                }).then(resp => {
                    setLoader(false)
                    message.success(resp.message)
                    onClose()
                    //getDatas()
                    setSavevisible(true)
                    setUpdatevisible(false)
                    setEntityVisible(false);
                    setShowResults(true)
                    setShowForm(false)
                    setShowApprovallist(false);
                    setShowitemLists(true);
                }).catch(err => {
                    setLoader(false)
                    setFields({
                        ...initialFieldValues, matMastTrimsModels: [], matMastPurchaseModels: []
                    });
                    //  fields['ftdOprName'] = tempOprName
                    setFields({ ...fields })
                    setErrors({ ...initialErrorMessages })
                    message.error(err.message || err)
                })
            }
        }

    }

    const ApprovalSave = async (status, id, eName, type) => {
        debugger;
        var arr = [];       
        if (pendinglist1.length > 0) {
            let allbuyerrightss = pendinglist1.map(item => {
                if (item.approved == 'Y') {

                    //arr += arrApproved + item.id + ','
                    arrApproved.push(item.id);
                    //item.approved = 'Y'; else item.approved = 'N';
                    return item;
                }

                /// arrApproved = arr;
                //arr = [];
                // arr1 = arrApproved;
            });
            // alert(arr1);
            //setPendingList({ arrApproved });
        }



        // let allbuyerrightses = arrApproved.map(item => {
        //     if (item.id == 'Y') {


        //         return item;
        //     }

        //     arrApproved = arr;
        //     //arr = [];
        //     arr1 = arrApproved;
        // });
        //alert(pendinglist.id);
        // pendinglist1.forEach(f => {
        //     if (pendinglist1.approved == "Y") {

        //         arrApproved = + pendinglist1.id + ','
        //         //err[f] = "This field is required"
        //         //validation = false
        //     }
        // })

        // pendinglist1.forEach(f => {
        //     if (pendinglist1[f] === "approved") {
        //         id = pendinglist1.id;
        //         arrApproved = + pendinglist1.id + ','
        //     }
        // })        
        status = 'Y';
        // alert(API_URLS.SAVE_MATERIAL_APPROVAL_LIST + "?Status=" + status,)
        if (arrApproved != "") {
            setLoader(true)

            ApiCall({
                method: "POST",
                path: API_URLS.SAVE_MATERIAL_APPROVAL_LIST + "?Status=" + status,
                data: arrApproved


            }).then(resp => {
                //alert(resp)
                setLoader(false)
                message.success(resp.message)
                getPendingDatas();
                setShowResults(true)
                setShowForm(false)
                setShowApprovallist(true);
                setShowitemLists(false);
                arrApproved = [];
            }).catch(err => {
                setLoader(false)
                setFields({
                    ...initialFieldValues, matMastTrimsModels: [], matMastPurchaseModels: []
                });
                //  fields['ftdOprName'] = tempOprName
                setFields({ ...fields })
                setErrors({ ...initialErrorMessages })
                message.error(err.message || err)
            })
        }
        else {

            setLoader(false);
            // if (buyCode.toUpperCase() === res.data.buyCode.toUpperCase()) {
            err = "Please Select Atleast One Row"
            message.error(err)
            // }
        }
        // if (validation) {
        //     if (type === "update") {
        //         if (validation) {
        //             setLoader(true)

        //             ApiCall({
        //                 method: "POST",
        //                 path: API_URLS.SAVE_MATERIAL_MASTER,
        //                 data: {
        //                     ...fields,
        //                     hostName: getHostName()
        //                 }
        //             }).then(resp => {
        //                 setLoader(false)
        //                 message.success(resp.message)
        //                 onClose()
        //                 getDatas()
        //                 setSavevisible(true)
        //                 setUpdatevisible(false)
        //                 setEntityVisible(false);
        //                 setShowResults(true)
        //                 setShowForm(false)
        //             }).catch(err => {
        //                 setLoader(false)

        //                 //  fields['ftdOprName'] = tempOprName
        //                 setFields({ ...fields })
        //                 setErrors({ ...initialErrorMessages })
        //                 message.error(err.message || err)
        //             })
        //         }
        //     }
        //     else {
        //         ItrApiService.GET({
        //             url: API_URLS.GET_COMPANY_MASTER_BY_ID + "/" + entityID + "/" + eCode + "/" + eName,
        //             appCode: "CNF"
        //         }).then(res => {
        //             //  alert(res.Success);
        //             if (res.Success == false) {
        //                 if (validation) {
        //                     setLoader(true)

        //                     ApiCall({
        //                         method: "POST",
        //                         path: API_URLS.SAVE_MATERIAL_MASTER,
        //                         data: {
        //                             ...fields,
        //                             hostName: getHostName()
        //                         }
        //                     }).then(resp => {
        //                         setLoader(false)
        //                         message.success(resp.message)
        //                         onClose()
        //                         getDatas()
        //                         setSavevisible(true)
        //                         setUpdatevisible(false)
        //                         setEntityVisible(false);
        //                         setShowResults(true)
        //                         setShowForm(false)
        //                     }).catch(err => {
        //                         setLoader(false)
        //                         setFields({ ...fields })
        //                         setErrors({ ...initialErrorMessages })
        //                         message.error(err.message || err)
        //                     })
        //                 }
        //             }
        //             else {

        //                 setLoader(false);
        //                 // if (buyCode.toUpperCase() === res.data.buyCode.toUpperCase()) {
        //                 err = "Company Details Already Available"
        //                 message.error(err)
        //                 // }
        //             }
        //         });


        //     }

        // }
    }
    const [ApptableProps, setappTableProps] = useState({
        page: 0,
        rowsPerPage: 10,
        sortOrder: {
            name: 'buyDivCode',
            direction: 'asc'
        }
    })

    const updateappTableProps = appprops => {
        setappTableProps({
            ...ApptableProps,
            ...appprops
        })
    }

    const [PentableProps, setpenTableProps] = useState({
        page: 0,
        rowsPerPage: 10,
        sortOrder: {
            name: 'buyDivCode',
            direction: 'asc'
        }
    })

    const updatepenTableProps = penprops => {
        setpenTableProps({
            ...PentableProps,
            ...penprops
        })
    }


    const pendingtableColumns = [

        {
            name: "id",
            label: "ID",
        },
        {
            name: "matType",
            label: "matType",
        },
        {
            name: "matGroup",
            label: "matGroup",
        },
        {
            name: "matSubGroup",
            label: "matSubGroup",
        },
        {
            name: "matCode",
            label: "matCode",
        },
        {
            name: "matDesc",
            label: "matDesc",
        },
        // {
        //     name: "address3",
        //     label: "address3",
        // },

        {
            name: "active",
            label: "Active",
            options: {
                customBodyRender: (value, tm) => {
                    return <div>
                        {value === "Y" ? "Yes" : "No"}
                    </div>
                }
            }
        }

    ]
    const ApprovaltableColumns = [
        {
            name: "id",
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div onClick={() => edit(tm.rowData[1], 'edit')}>
                                <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                            </div>
                            {/* <div onClick={() => edit(value, 'clone')}>
                                <FontAwesomeIcon icon={faCopy} color="#919191" />
                            </div> */}
                        </div>

                    )
                }
            }
        },

        {
            name: "id",
            label: "ID",
        },
        {
            name: "matType",
            label: "matType",
        },
        {
            name: "matGroup",
            label: "matGroup",
        },
        {
            name: "matSubGroup",
            label: "matSubGroup",
        },
        {
            name: "matCode",
            label: "matCode",
        },
        {
            name: "matDesc",
            label: "matDesc",
        },
        // {
        //     name: "address3",
        //     label: "address3",
        // },

        {
            name: "active",
            label: "Active",
            options: {
                customBodyRender: (value, tm) => {
                    return <div>
                        {value === "Y" ? "Yes" : "No"}
                    </div>
                }
            }
        }

    ]
    const getDataById = (id) => {
        // alert(API_URLS.GET_MATERIAL_MASTER_EDIT_BY_ID + "/" + id);
        return ApiCall({
            path: API_URLS.GET_MATERIAL_MASTER_EDIT_BY_ID + "/" + id,

        })
    }
    const add = async () => {
        try {
            setLoader(true)
            setVisible(true);
            clearFields();
            setLoader(false);
            // setShowResults(false)
            // setShowForm(true)
            // setShowApprovallist(false);
            // setShowitemLists(false);
        } catch (err) {
            setLoader(false);
            message.error(typeof err == "string" ? err : "data not found")
        }
    };

    const editRow = async (id, type) => {
        //this.setState({ edit_add: true });
        ApiCall({
            path: API_URLS.GET_TNA_MASTER_EDIT_BY_ID + "/" + id
        }).then(response => {
            try {
                debugger;
                let dataval = response.data;
                setAddTnamodels(response.data);
                setShowAddtolist(false);
                setShowUpdatetolist(true);

                // setFields({
                //     id: dataval.id,
                //     buyCode: dataval.buyCode,
                //     buydivCode: dataval.buydivCode,
                //     deptcode: dataval.deptcode,
                //     locCode: dataval.locCode,
                //     activityType: dataval.activityType, 
                //     orderCategory: dataval.orderCategory,
                //     mActive: dataval.mActive,                   
                //     stage: dataval.stage,
                //     activityType: dataval.activityType,                   
                //     fit: dataval.fit,
                //     actCode: dataval.actCode,
                //     activity: dataval.activity,
                //     subActivity: dataval.subActivity,
                //     criticalActivity: dataval.criticalActivity,
                //     tnaSeqNo: dataval.tnaSeqNo,
                //     duration: dataval.duration,
                //     dependActCode: dataval.dependActCode,
                //     dependDeptCode: dataval.dependDeptCode,
                //     dependActvity: dataval.dependActvity,
                //     dependSubActvity: dataval.dependSubActvity,
                //     preNotifyDays: dataval.preNotifyDays,
                //     notifyRoleId: dataval.notifyRoleId,
                //     l1EscalateDays: dataval.l1EscalateDays,
                //     l1EscalateRole:dataval.l1EscalateRole,
                //     l2EscalateDays: dataval.l2EscalateDays,
                //     l2EscalateRole: dataval.l2EscalateRole,
                //     category: dataval.category,
                //     valueAddtype: dataval.valueAddtype,
                //     weightage: dataval.weightage,
                //     skipped: dataval.skipped,
                //     remarks: dataval.remarks,
                //     cancel: dataval.cancel,
                //     active: dataval.active,
                //     hostName: dataval.hostName,
                //     createdDate: dataval.createdDate,
                //     createdBy: dataval.createdBy,
                //     modifiedDate: dataval.modifiedDate,
                //     modifiedBy:dataval.modifiedBy,
                //     isActive: dataval.isActive,                   
                //     active: data.active
                // })
                // alert(dataval.parentMenuName);
                console.log(response.data);
                // this.setState({
                //     module: [{ value: dataval.appName, label: dataval.appName }]
                //     , parent_menu_id: [{
                //         value: dataval.parantMenuId, label:
                //             (dataval.parantMenuId == 0 ? dataval.menuName : this.state.menulists.filter(f => f.menuId == dataval.parantMenuId).map(d => d.menuName)[0])
                //     }],
                //     //  parentmenutypedropdown.push({ value: item.menuId, label: item.menuName });
                //     menu_type: [{ value: dataval.menuType, label: dataval.menuType }],
                //     menuname: dataval.menuName, menuurl: dataval.menuUrl,
                //     menudesc: dataval.menuDescription, displayindex: dataval.displayIndex,
                //     menuId: dataval.menuId, active_status: dataval.active, menu_visible: dataval.menuVisible
                // });

            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const edit = async (id) => {
        debugger;
        try {
            setLoader(true);
            setVisible(true);
            setShowResults(false);
            setShowForm(true);
            setEditDVisible(true);
            setEditUpDVisible(false);

            let { data } = (id && await getDataById(id))
            debugger;
            console.log(data);
            //alert(data);
            if (!data) {
                message.error("Data not found")
                return
            }

            // const tableId = type === 'clone' ? 0 : 0 matMastFBRModels matMastThreadModels matMastTrimsModels matMastPurchaseModels
            setFields(data)
            setFabricFields(data.matMastFBRModels[0]);
            setThreadFields(data.matMastThreadModels[0]);
            setTrimsFields(data.matMastTrimsModels);
            setPurchaseFields(data.matMastPurchaseModels);
            getMatType();
            GetmatGroupDropDown(data.matType);
            GetmatSubGroupDropDown(data.matType, data.matGroup);
            debugger;
            if (data.matType === 'FBR') {

                setshowTrimsTab(true);
                setshowPurchaseTab(true);
                setshowThredTab(false);
                setThreadvisible(true);
                setFabricvisible(false);
                setshowFabricTab(true);
                setTrimsvisible(false);
                setPurchasevisible(false);
                clearPurchaseFields();
                //("home-tab")    
            }
            else if (data.matType === 'FTD') {
                setshowFabricTab(false);
                setshowTrimsTab(true);
                setshowPurchaseTab(true);
                setshowThredTab(true);
                setFabricvisible(true);
                setThreadvisible(false);
                setTrimsvisible(false);
                setPurchasevisible(false);
                clearPurchaseFields();
            }
            else {
                setshowFabricTab(false);
                setshowTrimsTab(true);
                setshowPurchaseTab(true);
                setshowThredTab(false);
                setFabricvisible(true);
                setThreadvisible(true);
                setTrimsvisible(false);
                setPurchasevisible(false);
                clearPurchaseFields();
            }

            //setFields({ ...fields, [name]: value.toUpperCase() })


            // else if (name === 'parentGroup') {
            //     debugger;
            //     getMatType();
            //     // GetmatSubGroupDropDown(fields.matType, e.target.value);
            //     setFields({ ...fields, [name]: value.toUpperCase() })
            // }
            // else if (name === 'matGroup') { 
            //     GetmatSubGroupDropDown(fields.matType, e.target.value);
            //     setFields({ ...fields, [name]: value.toUpperCase() })
            // }           
            setShowResults(false)
            setShowForm(true)
            setEntityVisible(true);
            setSavevisible(false);
            setUpdatevisible(true);
            setShowApprovallist(false);
            setShowitemLists(false);
            setLoader(false)
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    }
    // handleChangecheckbox(event, index, e) {
    //     if (event.approved == 'Y') {
    //         event.approved = 'N';
    //         const { pendinglist } = this.state;
    //         approvedlist[index] = event;
    //         this.setState({ pendinglist });
    //     } else {
    //         event.approved = 'Y';
    //         const { pendinglist } = this.state;
    //         pendinglist[index] = event;
    //         this.setState({ pendinglist });
    //     }
    // }

    // handleChangecheckboxall(event) {
    //     if (this.state.pendinglist.length > 0) {
    //         let allbuyerrights = this.state.pendinglist.map(item => {
    //             if (event.target.checked) item.approved = 'Y'; else item.approved = 'N';
    //             return item;
    //         });
    //         this.setState({ pendinglist: allbuyerrights });
    //     }
    // }
    console.log(fields)

    return (
        <>

            {showResults &&


                <div className='defect-master-main'>
                    <div className='m-3'>
                        <h6 className='m-0 p-0'>{name}</h6>

                        <div className='row align-items-center mt-2'>
                            {/* <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mt-1'>
                            </div> */}
                            <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 mt-1'>
                                <button className='btn-sm btn defect-master-add' onClick={onClickList} onClose={onClose} visible={visible} maskClosable={false}> Item List </button>
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-1 col-xl-1 mt-1'>
                                <button className='btn-sm btn defect-master-add' onClick={onClickPending} onClose={onClose} visible={visible} maskClosable={false}> Approval </button>
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 mt-1'>
                            </div>
                            {addvisible &&
                                < div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                                    <button className='btn-sm btn defect-master-add' onClick={onClick} onClose={onClose} visible={visible} maskClosable={false}> + Add New </button>
                                </div>
                            }
                            {Approvedvisible &&
                                <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                                    <button className='btn-sm btn defect-master-add' onClick={ApprovalSave} onClose={onClose} visible={Approvedvisible} maskClosable={false}> Approved </button>
                                </div>
                            }
                        </div>
                    </div>

                    {/* <div>
                        <CustomTableContainer
                            columns={tableColumns}
                            data={list}
                            options={{
                                download: !1,
                                print: !1,
                                filter: !1,
                                viewColumns: !1,
                                jumpToPage: !0,
                                selectableRows: "none",
                                rowsPerPageOptions: [10, 25, 50, 100],
                                rowsPerPage: tableProps.rowsPerPage,
                                page: tableProps.page,
                                count: list.length,
                                sortOrder: tableProps.sortOrder,
                                onTableChange: (action, tableState) => {
                                    if (!["changePage", "search", "changeRowsPerPage", "sort"].includes(action)) return
                                    const { page, rowsPerPage, sortOrder } = tableState
                                    updateTableProps({
                                        page, rowsPerPage, sortOrder
                                    })
                                }
                            }}
                        />
                    </div>
                    {listLoading && <div className='text-center'>
                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                    </div>} */}

                    {/* <div>
                        <CustomTableContainer
                            columns={tableColumns}
                            data={approvedlist}
                            options={{
                                download: !1,
                                print: !1,
                                filter: !1,
                                viewColumns: !1,
                                jumpToPage: !0,
                                selectableRows: "none",
                                rowsPerPageOptions: [10, 25, 50, 100],
                                rowsPerPage: tableProps.rowsPerPage,
                                page: tableProps.page,
                                count: approvedlist.length,
                                sortOrder: tableProps.sortOrder,
                                onTableChange: (action, tableState) => {
                                    if (!["changePage", "search", "changeRowsPerPage", "sort"].includes(action)) return
                                    const { page, rowsPerPage, sortOrder } = tableState
                                    updateTableProps({
                                        page, rowsPerPage, sortOrder
                                    })
                                }
                            }}
                        />
                    </div>
                    {listLoading && <div className='text-center'>
                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                    </div>}

                    <div>
                        <CustomTableContainer
                            columns={tableColumns}
                            data={pendinglist}
                            options={{
                                download: !1,
                                print: !1,
                                filter: !1,
                                viewColumns: !1,
                                jumpToPage: !0,
                                selectableRows: "none",
                                rowsPerPageOptions: [10, 25, 50, 100],
                                rowsPerPage: tableProps.rowsPerPage,
                                page: tableProps.page,
                                count: pendinglist.length,
                                sortOrder: tableProps.sortOrder,
                                onTableChange: (action, tableState) => {
                                    if (!["changePage", "search", "changeRowsPerPage", "sort"].includes(action)) return
                                    const { page, rowsPerPage, sortOrder } = tableState
                                    updateTableProps({
                                        page, rowsPerPage, sortOrder
                                    })
                                }
                            }}
                        />
                    </div>
                    {listLoading && <div className='text-center'>
                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                    </div>} */}

                </div >
            }

            {
                showitemLists &&

                <div className='defect-master-main'>
                    <div>
                        <CustomTableContainer
                            columns={pendingtableColumns}
                            data={pendinglist}                          
                            options={{
                                download: !1,
                                print: !1,
                                filter: !1,
                                viewColumns: !1,
                                jumpToPage: !0,
                                selectableRows: true,
                                rowsPerPageOptions: [10, 25, 50, 100],
                                rowsPerPage: PentableProps.rowsPerPage,
                                page: PentableProps.page,
                                count: pendinglist.length,
                                sortOrder: PentableProps.sortOrder,
                                onTableChange: (action, tableState) => {
                                    debugger;
                                    if (!["changePage", "search", "changeRowsPerPage", "sort"].includes(action)) return
                                    const { page, rowsPerPage, sortOrder } = tableState
                                    updatepenTableProps({
                                        page, rowsPerPage, sortOrder
                                    })
                                },
                              
                                onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {

                                    //  alert(pendinglist.approved = 'Y');
                                    debugger;
                                    console.log(currentRowsSelected, allRowsSelected, rowsSelected);
                                    if (pendinglist1.length > 0) {
                                        if (currentRowsSelected.length == 0) {
                                            let allbuyerrights = pendinglist1.map(item => {
                                                item.approved = 'N';
                                                // arrApproved = item.id;
                                                arrApproved = [];
                                                return item;
                                            });
                                            setPendingList1(allbuyerrights)
                                            setApprovedvisible(false);
                                            setaddvisible(true);
                                        }
                                        else if (currentRowsSelected.length == 1) {
                                            var valCheck = allRowsSelected.filter(f => f.index == currentRowsSelected[0].index).length > 0 ? 'Y' : 'N';
                                            pendinglist1[currentRowsSelected[0].index].approved = valCheck;
                                            // arrApproved = pendinglist1[currentRowsSelected[0].index].id;
                                            if (valCheck == 'N') {
                                                setApprovedvisible(false);
                                                setaddvisible(true);
                                            }
                                            else {
                                                setApprovedvisible(true);
                                                setaddvisible(false);
                                            }
                                            //alert((pendinglist1.approved == 'Y').length)
                                            setPendingList1(pendinglist1)


                                        }
                                        else if (currentRowsSelected.length > 1) {
                                            let allbuyerrights = pendinglist1.map(item => {
                                                item.approved = 'Y';

                                                // arrApproved = item.id;
                                                return item;
                                            });

                                            // alert((allbuyerrights.approved == 'Y').count())
                                            setApprovedvisible(true);
                                            setaddvisible(false);

                                            setPendingList1(allbuyerrights)


                                        }




                                    }
                                    //alert(arrApproved);
                                    // console.log('checkall', currentRowsSelected, allRowsSelected, rowsSelected)
                                    // const result = allRowsSelected.map(item => { return data.at(item.index) });
                                    // const selectedIds = result.map(item => {
                                    //     return item.id;
                                    // });
                                }

                                //onRowClick: (rowData, rowMeta) => console.log('onRowsSelect.', rowData, rowMeta),
                                // onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
                                //     debugger;
                                //     // if (pendinglist.length > 0) {
                                //     //     let allbuyerrights = pendinglist.map(item => {
                                //     //         if (event.target.checked) item.approved = 'Y'; else item.approved = 'N';
                                //     //         return item;
                                //     //     });
                                //     //     setPendingList(allbuyerrights)
                                //     // }
                                //     // console.log('checkall', currentRowsSelected, allRowsSelected, rowsSelected)
                                //     // const result = allRowsSelected.map(item => { return data.at(item.index) });
                                //     // const selectedIds = result.map(item => {
                                //     //     return item.id;
                                //     // });
                                // }
                            }}
                        />
                    </div>
                    {listLoading && <div className='text-center'>
                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                    </div>}

                </div >
            }
            {
                showApprovallist &&


                <div className='defect-master-main'>

                    <div>
                        {/* <table className="table">
                            <thead className="thead-light">
                                <th align='center' style={{ textAlign: "center" }}>
                                    <Checkbox color="primary" onClick={(e) => this.handleChangecheckboxall(e)} title={"select all buyer"} checked={allCheck} />
                                </th>
                                <th>Buyer</th>
                                <th>Buyer Division</th>
                                <th>Division Name</th>
                            </thead>
                            <tbody>
                                {
                                    pendinglist.map((n, index) => (
                                        <tr>
                                            <td className='' align='center'>
                                                <Checkbox color="primary" onClick={(e) => this.handleChangecheckbox(n, index, e)} checked={n.notify == 'Y' ? true : false} />
                                            </td>
                                            <td>{n.buyCode}</td>
                                            <td>{n.buyDivCode}</td>
                                            <td>{n.divName}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table> */}
                    </div>
                    <div>
                        <CustomTableContainer
                            columns={ApprovaltableColumns}
                            data={approvedlist}
                            options={{
                                download: !1,
                                print: !1,
                                filter: !1,
                                viewColumns: !1,
                                jumpToPage: !0,
                                selectableRows: "none",
                                rowsPerPageOptions: [10, 25, 50, 100],
                                rowsPerPage: ApptableProps.rowsPerPage,
                                page: ApptableProps.page,
                                count: approvedlist.length,
                                sortOrder: ApptableProps.sortOrder,
                                onTableChange: (action, tableState) => {
                                    if (!["changePage", "search", "changeRowsPerPage", "sort"].includes(action)) return
                                    const { page, rowsPerPage, sortOrder } = tableState
                                    updateappTableProps({
                                        page, rowsPerPage, sortOrder
                                    })
                                }
                            }}
                        />
                    </div>
                    {listLoading && <div className='text-center'>
                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                    </div>}
                </div >
            }

            {
                showForm &&
                <div class="container-fluid">
                    {/* <!-- breadcrumb --> */}
                    <div class="breadcrumb-header justify-content-between bread-list">
                        <div class="w-100">
                            <div class="d-flex border-bottom pb-15">
                                <div class="me-auto ">
                                    <a href="#myCollapse" data-bs-toggle="collapse" aria-expanded="true" class="text-black">
                                        <h4 class="content-title float-start pr-20 border-0"><span class="pr-10"><img
                                            src={breadcrumbIcon} alt="" /></span> Material Master</h4>
                                    </a>
                                    <div id="myCollapse" class="collapse w-100 float-start pl-35 ">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><a href="#">Breadcrumb One</a></li>
                                                <li class="breadcrumb-item"><a href="#">Breadcrumb Two</a></li>
                                                <li class="breadcrumb-item active text-primary" aria-current="page">Item
                                                    Creations</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>

                                <div class="pt-15">

                                </div>
                            </div>



                            <div class="col-lg">

                            </div>


                        </div>
                    </div>
                    {/* <!-- breadcrumb -->
        <!-- row opened--> */}
                    <div class="clear"></div>


                    <div class="row mt-15 dis-sel mt-20">
                        <div class="col-lg-3">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Parent Group<span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{fields.parentGroup === '' ? errors.parentGroup : ''}</small>
                            </div>
                            <div class="main-select">
                                <select name="somename" className='form-control form-control-sm mt-1'
                                    required
                                    value={fields.parentGroup}
                                    onChange={inputOnChange("parentGroup")}                                >
                                    <option value=""> Select Parent Group</option>
                                    {countryList.map((v, index) => {
                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Material Type<span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{fields.matType === '' ? errors.matType : ''}</small>
                            </div>
                            <div class="main-select">
                                <select name="somename" className='form-control form-control-sm mt-1'
                                    required
                                    value={fields.matType}
                                    onChange={inputOnChange("matType")}                                >
                                    <option value=""> Select Material Type</option>
                                    {mattypeList.map((v, index) => {
                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                    })}
                                </select>
                            </div>
                        </div>

                        <div class="col-lg-3">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Material Group<span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{fields.matGroup === '' ? errors.matGroup : ''}</small>
                            </div>
                            <div class="main-select">
                                <select name="somename" className='form-control form-control-sm mt-1'
                                    required
                                    value={fields.matGroup}
                                    onChange={inputOnChange("matGroup")}                                >
                                    <option value=""> Select Material Group</option>
                                    {matgroupList.map((v, index) => {
                                        return <option key={index} value={v}>{v}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Material Sub Group<span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{fields.matSubGroup === '' ? errors.matSubGroup : ''}</small>
                            </div>
                            <div class="main-select">
                                <select name="somename" className='form-control form-control-sm mt-1'
                                    required
                                    value={fields.matSubGroup}
                                    onChange={inputOnChange("matSubGroup")}                                >
                                    <option value=""> Select Material Sub Group</option>
                                    {matsubgroupList.map((v, index) => {
                                        return <option key={index} value={v}>{v}</option>
                                    })}
                                </select>
                            </div>
                            {/* <input className='form-control form-control-sm mt-1' placeholder='Enter Entity ID'
                                value={fields.matSubGroup} minLength="1" maxLength="3"
                                onChange={inputOnChange("matSubGroup")} disabled={entityVisible}
                            /> */}
                        </div>
                        <div class="col-lg-3">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Material Code<span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{fields.matCode === '' ? errors.matCode : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter Material Code'
                                value={fields.matCode} minLength="1" maxLength="20"
                                onChange={inputOnChange("matCode")}
                            />
                        </div>

                        {/* <div class="col-lg-3">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Buyer Division<span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{fields.buyDivcode === '' ? errors.buyDivcode : ''}</small>
                            </div>
                            <div class="main-select">
                                <select name="somename" className='form-control form-control-sm mt-1'
                                    required
                                    value={fields.buyDivcode}
                                    onChange={inputOnChange("buyDivcode")}
                                                          
                                >
                                    <option value=""> Select Buyer Division</option>
                                    {buyerdivcodelist.map((v, index) => {
                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                    })}
                                </select>
                            </div>
                          
                        </div> */}
                        {UpDVisible &&
                            <div class="col-lg-3">
                                <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                    <label>Buyer Division<span className='text-danger'>*  </span> </label>
                                    <small className='text-danger'>{fields.buyDivcode === '' ? errors.buyDivcode : ''}</small>
                                </div>
                                <Select mode="multiple" className='form-control form-control-sm mt-1' style={{ width: '100%' }} placeholder="Select Buyer Division" required
                                    value={fields.BuyDivArr}
                                    // value={AddTnamodels.id !== 0 ? errors.notifyRoleId : AddTnamodels.NotroleArr}
                                    onChange={(e) => {
                                        setFields({
                                            ...fields, buyDivcode: e.join(','),
                                            BuyDivArr: [...e]
                                        })
                                    }} >
                                    {buyerdivcodelist.map((v, index) => {
                                        return <Option key={index} value={v.code}>{v.code}</Option>
                                    })}
                                </Select>
                            </div>
                        }
                        {EditDVisible &&
                            <div class="col-lg-3">
                                <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                    <label>Buyer Division<span className='text-danger'>*  </span> </label>
                                    <small className='text-danger'>{fields.buyDivcode === '' ? errors.buyDivcode : ''}</small>
                                </div>
                                <Select mode="multiple" className='form-control form-control-sm mt-1' style={{ width: '100%' }} placeholder="Select Buyer Division" required
                                    value={fields.buyDivcode.split(',')}
                                    // value={AddTnamodels.id !== 0 ? errors.notifyRoleId : AddTnamodels.NotroleArr}
                                    onChange={(e) => {
                                        setFields({
                                            ...fields, buyDivcode: e.join(','),
                                            BuyDivArr: [...e]
                                        })
                                    }} >
                                    {buyerdivcodelist.map((v, index) => {
                                        return <Option key={index} value={v.code}>{v.code}</Option>
                                    })}
                                </Select>
                            </div>
                        }
                        <div class="col-lg-3">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Material Description<span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{fields.matDesc === '' ? errors.matDesc : ''}</small>
                            </div>
                            <textarea className='form-control form-control-sm mt-1' placeholder='Enter Material Description'
                                value={fields.matDesc} minLength="1" maxLength="150"
                                onChange={inputOnChange("matDesc")}
                            />
                            {/* <textarea>
                                Hello there, this is some text in a text area
                            </textarea> */}
                        </div>
                        <div className='col-lg-3'>
                            <label>{fields.active === 'Y' ? 'Active' : 'In Active'}</label>
                            <div className='mt-1'>
                                <Switch size='default'
                                    checked={fields.active === 'Y'}
                                    onChange={(e) => setFields({ ...fields, active: e ? 'Y' : 'N' })} />
                            </div>
                        </div>
                    </div>

                    <div class="row mt-25 main-tab pl-15 pr-15">
                        <ul class="nav nav-tabs p-15 pl-15" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" disabled={Fabricvisible} id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                    type="button" role="tab" aria-controls="home" aria-selected="true">Fabric</button>
                            </li>

                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                                    type="button" role="tab" disabled={Threadvisible} aria-controls="profile" aria-selected="false">Thread </button>
                            </li>

                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="profile-tab" disabled={Trimsvisible} data-bs-toggle="tab" data-bs-target="#profile1"
                                    type="button" role="tab" aria-controls="profile1" aria-selected="false">Details</button>
                            </li>

                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="profile-tab" disabled={Purchasevisible} data-bs-toggle="tab" data-bs-target="#profile2"
                                    type="button" role="tab" aria-controls="profile2" aria-selected="false">Purchase Info</button>
                            </li>
                            {/* <li class="nav-item" role="presentation">
                                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact"
                                    type="button" role="tab" aria-controls="contact" aria-selected="false">Purchase
                                    Info</button>
                            </li> */}
                        </ul>
                        <div class="tab-content p-15 mb-80" id="myTabContent">
                            {showFabricTab &&
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="row mt-15">
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Fiber<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fields.fibre === '' ? errors.fibre : ''}</small>
                                            </div>
                                            <div class="main-select">
                                                <select name="somename" className='form-control form-control-sm mt-1'
                                                    required
                                                    value={fabricfields.fibre}
                                                    onChange={inputOnChangeFab("fibre")}                                >
                                                    <option value=""> Select fibre Content</option>
                                                    {fbrlist.map((v, index) => {
                                                        return <option key={index} value={v.codeDesc}>{v.codeDesc}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-1">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Content<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.Content === '' ? errors.Content : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter Content'
                                                value={fabricfields.Content} minLength="1" maxLength="100"
                                                numeric={true}
                                                onFocus={NUMBER_IS_FOCUS_IN_ZERO("Content")}
                                                onBlur={NUMBER_IS_FOCUS_OUT_ZERO("Content")}
                                                onChange={inputOnChangeFab("Content")}
                                            />
                                        </div>
                                        <div class="col-lg-1">
                                            <button type="button" className='btn-sm btn defect-master-save mt-4' onClick={(e) => AddContent()}> + </button>
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Fabric Content<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.fibreContent === '' ? errors.fibreContent : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Fabric Content'
                                                value={fabricfields.fibreContent} minLength="1" maxLength="100"
                                                onChange={inputOnChangeFab("fibreContent")} disabled={entityVisible}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Fabric Type<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.fabricType === '' ? errors.fabricType : ''}</small>
                                            </div>
                                            <div class="main-select">
                                                <select name="somename" className='form-control form-control-sm mt-1'
                                                    required
                                                    value={fabricfields.fabricType}
                                                    onChange={inputOnChangeFab("fabricType")}                                >
                                                    <option value=""> Select fibre Type</option>
                                                    {fbrtypelist.map((v, index) => {
                                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Fab Weave<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.fabWeave === '' ? errors.fabWeave : ''}</small>
                                            </div>
                                            <div class="main-select">
                                                <select name="somename" className='form-control form-control-sm mt-1'
                                                    required
                                                    value={fabricfields.fabWeavefabWeave}
                                                    onChange={inputOnChangeFab("fabWeave")}                                >
                                                    <option value=""> Select fab Weave</option>
                                                    {fbrweavelist.map((v, index) => {
                                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Dye Process <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.dyeProcess === '' ? errors.dyeProcess : ''}</small>
                                            </div>
                                            {/* <label>Country</label>
                                        <small className='text-danger'>{fields.country === '' ? errors.country : ''}</small> */}
                                            <div class="main-select">
                                                <select name="somename" className='form-control form-control-sm mt-1'
                                                    required
                                                    value={fabricfields.dyeProcess}
                                                    onChange={inputOnChangeFab("dyeProcess")}
                                                >
                                                    <option value=""> Select Dye Process</option>
                                                    {fbrdyedlist.map((v, index) => {
                                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                    })}

                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-lg-1">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>YarnWarp<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.yarnWarp === '' ? errors.yarnWarp : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter YarnWarp'
                                                value={fabricfields.yarnWarp} minLength="1" maxLength="20"
                                                onChange={inputOnChangeFab("yarnWarp")}
                                            />
                                        </div>
                                        <div class="col-lg-1">
                                            <button type="button" className='btn-sm btn defect-master-save mt-4' onClick={(e) => AddYarnWarp()}> + </button>
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Warp YarnBlend<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.warpYarnBlend === '' ? errors.warpYarnBlend : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter warpYarnBlend'
                                                value={fabricfields.warpYarnBlend} minLength="1" maxLength="50"
                                                onChange={inputOnChangeFab("warpYarnBlend")} disabled={entityVisible}
                                            />
                                        </div>
                                        <div class="col-lg-1">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>YarnWeft<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.yarnWeft === '' ? errors.yarnWeft : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter yarnWeft'
                                                value={fabricfields.yarnWeft} minLength="1" maxLength="20"
                                                onChange={inputOnChangeFab("yarnWeft")}
                                            />
                                        </div>
                                        <div class="col-lg-1">
                                            <button type="button" className='btn-sm btn defect-master-save mt-4' onClick={(e) => AddYarnWeft()}> + </button>
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Weft YarnBlend<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.weftYarnBlend === '' ? errors.weftYarnBlend : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter weftYarnBlend'
                                                value={fabricfields.weftYarnBlend} minLength="1" maxLength="50"
                                                onChange={inputOnChangeFab("weftYarnBlend")} disabled={entityVisible}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Ends PerInch<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.endsPerInch === '' ? errors.endsPerInch : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter endsPerInch'
                                                value={fabricfields.endsPerInch} minLength="1" maxLength="50"
                                                onChange={inputOnChangeFab("endsPerInch")}
                                            />
                                        </div>

                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Pick PerInch <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.pickPerInch === '' ? errors.pickPerInch : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter pickPerInch'
                                                value={fabricfields.pickPerInch} minLength="1" maxLength="50"
                                                onChange={inputOnChangeFab("pickPerInch")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Shrink Warp<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.shrinkWarp === '' ? errors.shrinkWarp : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter shrinkWarp'
                                                value={fabricfields.shrinkWarp} minLength="1" maxLength="3"
                                                onFocus={NUMBER_IS_FOCUS_IN_ZERO("shrinkWarp")}
                                                onBlur={NUMBER_IS_FOCUS_OUT_ZERO("shrinkWarp")}
                                                onChange={inputOnChangeFab("shrinkWarp")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Shrink Weft<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.shrinkWeft === '' ? errors.shrinkWeft : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter shrinkWeft'
                                                value={fabricfields.shrinkWeft} minLength="1" maxLength="3"
                                                onFocus={NUMBER_IS_FOCUS_IN_ZERO("shrinkWeft")}
                                                onBlur={NUMBER_IS_FOCUS_OUT_ZERO("shrinkWeft")}
                                                onChange={inputOnChangeFab("shrinkWeft")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Wash Method<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.washMethod === '' ? errors.washMethod : ''}</small>
                                            </div>
                                            <div class="main-select">
                                                <select name="somename" className='form-control form-control-sm mt-1'
                                                    required
                                                    value={fabricfields.washMethod}
                                                    onChange={inputOnChangeFab("washMethod")}
                                                >
                                                    <option value=""> Select Wash Method</option>
                                                    {fbrwashlist.map((v, index) => {
                                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                    })}

                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>FabWt_BW<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.fabWt_BW === '' ? errors.fabWt_BW : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter fabWt_BW'
                                                value={fabricfields.fabWt_BW} minLength="1" maxLength="3"
                                                onFocus={NUMBER_IS_FOCUS_IN_ZERO("fabWt_BW")}
                                                onBlur={NUMBER_IS_FOCUS_OUT_ZERO("fabWt_BW")}
                                                onChange={inputOnChangeFab("fabWt_BW")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>FabWt_AW<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.fabWt_AW === '' ? errors.fabWt_AW : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter fabWt_AW'
                                                value={fabricfields.fabWt_AW} minLength="1" maxLength="3"
                                                onFocus={NUMBER_IS_FOCUS_IN_ZERO("fabWt_AW")}
                                                onBlur={NUMBER_IS_FOCUS_OUT_ZERO("fabWt_AW")}
                                                onChange={inputOnChangeFab("fabWt_AW")}
                                            />
                                        </div>

                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Weight Uom <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.weightUom === '' ? errors.weightUom : ''}</small>
                                            </div>
                                            {/* <label>Country</label>
                                        <small className='text-danger'>{fields.country === '' ? errors.country : ''}</small> */}
                                            <div class="main-select">
                                                <select name="somename" className='form-control form-control-sm mt-1'
                                                    required
                                                    value={fabricfields.weightUom}
                                                    onChange={inputOnChangeFab("weightUom")}
                                                >
                                                    <option value=""> Select weightUom</option>
                                                    {uomlist.map((v, index) => {
                                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                    })}

                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Actual Width<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.actualWidth === '' ? errors.actualWidth : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter actualWidth'
                                                value={fabricfields.actualWidth} minLength="1" maxLength="3"
                                                onFocus={NUMBER_IS_FOCUS_IN_ZERO("actualWidth")}
                                                onBlur={NUMBER_IS_FOCUS_OUT_ZERO("actualWidth")}
                                                onChange={inputOnChangeFab("actualWidth")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Cuttable Width<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.cutWidth === '' ? errors.cutWidth : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter cutWidth'
                                                value={fabricfields.cutWidth} minLength="1" maxLength="3"
                                                onFocus={NUMBER_IS_FOCUS_IN_ZERO("cutWidth")}
                                                onBlur={NUMBER_IS_FOCUS_OUT_ZERO("cutWidth")}
                                                onChange={inputOnChangeFab("cutWidth")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Width Uom<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.widthUom === '' ? errors.widthUom : ''}</small>
                                            </div>
                                            <div class="main-select">
                                                <select name="somename" className='form-control form-control-sm mt-1'
                                                    required
                                                    value={fabricfields.widthUom}
                                                    onChange={inputOnChangeFab("widthUom")}
                                                >
                                                    <option value=""> Select widthUom</option>
                                                    {uomlist.map((v, index) => {
                                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                    })}

                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Physical Finish<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.physicalFinish === '' ? errors.physicalFinish : ''}</small>
                                            </div>
                                            <div class="main-select">
                                                <select name="somename" className='form-control form-control-sm mt-1'
                                                    required
                                                    value={fabricfields.physicalFinish}
                                                    onChange={inputOnChangeFab("physicalFinish")}
                                                >
                                                    <option value=""> Select Physical Finish</option>
                                                    {phyFinishlist.map((v, index) => {
                                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                    })}

                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Chemical Finish<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.chemicalFinish === '' ? errors.chemicalFinish : ''}</small>
                                            </div>
                                            <div class="main-select">
                                                <select name="somename" className='form-control form-control-sm mt-1'
                                                    required
                                                    value={fabricfields.chemicalFinish}
                                                    onChange={inputOnChangeFab("chemicalFinish")}
                                                >
                                                    <option value=""> Select Chemical Finish</option>
                                                    {cheFinishlist.map((v, index) => {
                                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                    })}

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="home-tab">
                                {showThredTab &&
                                    <div class="row mt-15">
                                        <div className='col-lg-3'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Quality <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{threadfields.quality === '' ? errors.quality : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter quality'
                                                value={threadfields.quality} minLength="1" maxLength="30"
                                                onChange={inputOnChangeThread("quality")}
                                            />
                                        </div>
                                        <div className='col-lg-3'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Tex<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{threadfields.tex === '' ? errors.tex : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter tex'
                                                value={threadfields.tex} minLength="1" maxLength="10"
                                                onChange={inputOnChangeThread("tex")}
                                            />
                                        </div>
                                        <div className='col-lg-3'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Tkt<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{threadfields.tkt === '' ? errors.tkt : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter tkt'
                                                value={threadfields.tkt} minLength="1" maxLength="10"
                                                onChange={inputOnChangeThread("tkt")}
                                            />
                                        </div>


                                        <div className='col-lg-3'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>No Of Meter <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{threadfields.noOfMtr === '' ? errors.noOfMtr : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter NoOfMtr'
                                                value={threadfields.noOfMtr} minLength="1" maxLength="5"
                                                onFocus={NUMBER_IS_FOCUS_IN_ZERO_THD("noOfMtr")}
                                                onBlur={NUMBER_IS_FOCUS_OUT_ZERO_THD("noOfMtr")}
                                                onChange={inputOnChangeThread("noOfMtr")}
                                            />
                                        </div>

                                    </div>
                                }
                            </div>

                            <div class="tab-pane fade" id="profile1" role="tabpanel" aria-labelledby="profile-tab">
                                {showTrimsTab &&
                                    <div class="row mt-15">

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Article No <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{trimsfields.articleNo === '' ? errors.articleNo : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter articleNo'
                                                value={trimsfields.articleNo} minLength="1" maxLength="30"
                                                onChange={inputOnChangeTrims("articleNo")}
                                            />
                                        </div>
                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Product<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{trimsfields.product === '' ? errors.product : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter product'
                                                value={trimsfields.product} minLength="1" maxLength="30"
                                                onChange={inputOnChangeTrims("product")}
                                            />
                                        </div>
                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Finish<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{trimsfields.finish === '' ? errors.finish : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter finish'
                                                value={trimsfields.finish} minLength="1" maxLength="30"
                                                onChange={inputOnChangeTrims("finish")}
                                            />
                                        </div>


                                        <div className='col-lg-4'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Remarks <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.remarks === '' ? errors.remarks : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter Remarks'
                                                value={trimsfields.remarks} minLength="1" maxLength="100"
                                                onChange={inputOnChangeTrims("remarks")}
                                            />
                                        </div>
                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>   <span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{purchasefields.remarks === '' ? errors.remarks : ''}</small>
                                            </div>
                                            <div class="clear"></div>
                                            <div class="clear"></div>
                                            <div class="clear"></div>
                                            {/* <button type="button" className='btn-sm btn defect-master-save mt-1' onClick={(e) => ClearDetails()}>Clear</button> */}
                                            {showAddtolist && <button type="button" className='btn-sm btn defect-master-save mt-4' onClick={(e) => AddTrims()}>Add To List</button>}
                                            {showUpdatetolist && <button disabled={loader} className='btn-sm btn defect-master-save mt-4' onClick={(e) => AddTrims()}> Update To List</button>}
                                            {/* <button disabled={loader} className='btn-sm btn defect-master-save mt-1 ' onClick={save}> {fields.id === 0 ? "Save" : "Update"} </button> */}

                                        </div>

                                        <div class="clear"></div>
                                        <div class="clear"></div>
                                        <div class="clear"></div>
                                        <div id="table-scroll" class="table-scroll l-tb-1 m-fixx pt-15">
                                            <div class="table-wrap">


                                                <table id="example" class="table table-striped edit-np f-l1">
                                                    <thead>
                                                        <tr>
                                                            <th>ACTION</th>
                                                            {/* <th class="">SLNO</th> */}
                                                            <th class="">GROUP ARTICLE NUMBER</th>
                                                            <th class="">PRODUCT</th>
                                                            <th>FINISH	</th>
                                                            <th>REMARKS</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* if(visible=="True") */}
                                                        {

                                                            fields.matMastTrimsModels.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td align='center'>
                                                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                                            <div className='text-center' onClick={() => { editRow(row?.id) }}>
                                                                                <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                                                            </div>

                                                                        </div>
                                                                    </td>
                                                                    {/* <td align='center'> {index + 1} </td> */}
                                                                    <td align='center'>{row.articleNo}</td>
                                                                    <td align='center'>{row.product}</td>
                                                                    <td align='center'>{row.finish}</td>
                                                                    <td align='center'>{row.remarks}</td>
                                                                </tr>
                                                            ))

                                                            //     trimsGridfields.map((row, index) => (
                                                            // <tr key={index}>
                                                            //     <td align='center'>
                                                            //         <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                            //             <div className='text-center'>
                                                            //                 <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                                            //             </div>
                                                            //         </div>
                                                            //     </td>
                                                            //     <td align='center'> {index + 1} </td>
                                                            //     <td align='center'>{row.articleNo}</td>
                                                            //     <td align='center'>{row.product}</td>
                                                            //     <td align='center'>{row.finish}</td>
                                                            //     <td align='center'>{row.Remarks}</td>

                                                            // </tr>
                                                            // ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                }
                            </div>

                            <div class="tab-pane fade" id="profile2" role="tabpanel" aria-labelledby="home-tab">
                                {showPurchaseTab &&
                                    <div class="row mt-15">
                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Material Code <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.matCode === '' ? errors.matCode : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter matCode'
                                                value={purchasefields.matCode} minLength="1" maxLength="20"
                                                onChange={inputOnChangePurchase("matCode")}
                                            />
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Supplier <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.supcode === '' ? errors.supcode : ''}</small>
                                            </div>
                                            <div class="main-select">
                                                <select name="somename" className='form-control form-control-sm mt-1'
                                                    required
                                                    value={purchasefields.supcode}
                                                    onChange={inputOnChangePurchase("supcode")}
                                                >
                                                    <option value=""> Select Supplier</option>
                                                    {suplierlist.map((v, index) => {
                                                        //return <option key={index} value={v.id + "|" + v.code}>{v.id + "|" + v.code + "|" + v.codeDesc}</option>
                                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                    })}

                                                </select>
                                            </div>
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Supplier Reference No <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.supRefNo === '' ? errors.supRefNo : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter supRefNo'
                                                value={purchasefields.supRefNo} minLength="1" maxLength="30"
                                                onChange={inputOnChangePurchase("supRefNo")}
                                            />
                                        </div>

                                        {/* <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.contNo === '' ? errors.contNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact No'
                                            value={purchasefields.contNo} minLength="1" maxLength="25"
                                            onChange={inputOnChangePurchase("contNo")}
                                        />
                                    </div> */}

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Brand <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.brand === '' ? errors.brand : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter brand'
                                                value={purchasefields.brand} minLength="1" maxLength="30"
                                                onChange={inputOnChangePurchase("brand")}
                                            />
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>MOQ <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.moq === '' ? errors.moq : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter moq'
                                                value={purchasefields.moq} minLength="1" maxLength="25"
                                                onFocus={NUMBER_IS_FOCUS_IN_ZERO_PUR("moq")}
                                                onBlur={NUMBER_IS_FOCUS_OUT_ZERO_PUR("moq")}
                                                onChange={inputOnChangePurchase("moq")}
                                            />
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>MOQUOM <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.moqUom === '' ? errors.moqUom : ''}</small>
                                            </div>
                                            <div class="main-select">
                                                <select name="somename" className='form-control form-control-sm mt-1'
                                                    required
                                                    value={purchasefields.moqUom}
                                                    onChange={inputOnChangePurchase("moqUom")}                                                >
                                                    <option value=""> Select MOQ UOM</option>
                                                    {uomlist.map((v, index) => {
                                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                    })}

                                                </select>
                                            </div>
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Multiples <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.multiples === '' ? errors.multiples : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter multiples'
                                                value={purchasefields.multiples} minLength="1" maxLength="50"
                                                onFocus={NUMBER_IS_FOCUS_IN_ZERO_PUR("multiples")}
                                                onBlur={NUMBER_IS_FOCUS_OUT_ZERO_PUR("multiples")}
                                                onChange={inputOnChangePurchase("multiples")}
                                            />
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Lead time <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.leadtime === '' ? errors.leadtime : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter leadtime'
                                                value={purchasefields.leadtime} minLength="1" maxLength="50"
                                                onFocus={NUMBER_IS_FOCUS_IN_ZERO_PUR("leadtime")}
                                                onBlur={NUMBER_IS_FOCUS_OUT_ZERO_PUR("leadtime")}
                                                onChange={inputOnChangePurchase("leadtime")}
                                            />
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Color <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.contPerson2 === '' ? errors.color : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter color'
                                                value={purchasefields.color} minLength="1" maxLength="20"
                                                onChange={inputOnChangePurchase("color")}
                                            />
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Size <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.size === '' ? errors.size : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter Contact No'
                                                value={purchasefields.size} minLength="1" maxLength="20"
                                                onChange={inputOnChangePurchase("size")}
                                            />
                                        </div>
                                        <div className='col-lg-2'>

                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>From Date <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.fromDt === '' ? errors.fromDt : ''}</small>
                                            </div>
                                            <Input type="date" name="fromDt" className="form-control form-control-sm mt-1" id="fromDt" placeholder="From Date" value={purchasefields.fromDt} onChange={inputOnChangePurchase("fromDt")} />
                                            {/* <input className='form-control form-control-sm mt-1' placeholder='Enter fromDt'
                                            value={purchasefields.fromDt} minLength="1" maxLength="25"
                                            onChange={inputOnChangePurchase("fromDt")}
                                        /> */}
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>To Date <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.toDt === '' ? errors.toDt : ''}</small>
                                            </div>
                                            <Input type="date" name="toDt" className="form-control form-control-sm mt-1" id="toDt" placeholder="To Date" value={purchasefields.toDt} onChange={inputOnChangePurchase("toDt")} />

                                            {/* <input className='form-control form-control-sm mt-1' placeholder='Enter toDt'
                                            value={purchasefields.toDt} minLength="1" maxLength="25"
                                            onChange={inputOnChangePurchase("toDt")}
                                        /> */}
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Price <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.price === '' ? errors.price : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter price'
                                                value={purchasefields.price} minLength="1" maxLength="30"
                                                onFocus={NUMBER_IS_FOCUS_IN_ZERO_PUR("price")}
                                                onBlur={NUMBER_IS_FOCUS_OUT_ZERO_PUR("price")}
                                                onChange={inputOnChangePurchase("price")}
                                            />
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Currency <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.curCode === '' ? errors.curCode : ''}</small>
                                            </div>
                                            <div class="main-select">
                                                <select name="somename" className='form-control form-control-sm mt-1'
                                                    required
                                                    value={purchasefields.curCode}
                                                    onChange={inputOnChangePurchase("curCode")}
                                                >
                                                    <option value=""> Select Currency</option>
                                                    {currencyList.map((v, index) => {
                                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                    })}

                                                </select>
                                            </div>
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Bin Code<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.binCode === '' ? errors.binCode : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter binCode'
                                                value={purchasefields.binCode} minLength="1" maxLength="30"
                                                onChange={inputOnChangePurchase("binCode")} disabled={entityVisible}
                                            />
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Description <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.purdesc === '' ? errors.purdesc : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter purdesc'
                                                value={purchasefields.purdesc} minLength="1" maxLength="150"
                                                onChange={inputOnChangePurchase("purdesc")}
                                            />
                                        </div>

                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Remarks<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{purchasefields.remarks === '' ? errors.remarks : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter remarks'
                                                value={purchasefields.remarks} minLength="1" maxLength="200"
                                                onChange={inputOnChangePurchase("remarks")}
                                            />
                                        </div>
                                        <div className='col-lg-2'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>   <span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{purchasefields.remarks === '' ? errors.remarks : ''}</small>
                                            </div>
                                            <div class="clear"></div>
                                            <div class="clear"></div>
                                            <div class="clear"></div>
                                            {/* <button type="button" className='btn-sm btn defect-master-save mt-1' onClick={(e) => ClearDetails()}>Clear</button> */}
                                            {showAddtolist && <button type="button" className='btn-sm btn defect-master-save mt-4' onClick={(e) => AddPurchase()}>Add To List</button>}
                                            {showUpdatetolist && <button disabled={loader} className='btn-sm btn defect-master-save mt-4' onClick={(e) => AddPurchase()}> Update To List</button>}
                                            {/* <button disabled={loader} className='btn-sm btn defect-master-save mt-1 ' onClick={save}> {fields.id === 0 ? "Save" : "Update"} </button> */}

                                        </div>
                                        {/* <div className='col-lg-3'>
                                        <label>{fields.active === 'Y' ? 'Active' : 'In Active'}</label>
                                        <div className='mt-1'>
                                            <Switch size='default'
                                                checked={fields.active === 'Y'}
                                                onChange={(e) => setFields({ ...fields, active: e ? 'Y' : 'N' })} />
                                        </div>
                                    </div> */}


                                        <div class="clear"></div>
                                        <div class="clear"></div>
                                        <div class="clear"></div>
                                        <div id="table-scroll" class="table-scroll l-tb-1 m-fixx pt-15">
                                            <div class="table-wrap">


                                                <table id="example" class="table table-striped edit-np f-l1">
                                                    <thead>
                                                        <tr>
                                                            <th>ACTION</th>
                                                            {/* <th class="">SLNO</th> */}
                                                            <th class="">MATERIAL CODE</th>
                                                            <th class="">SUPPLIER</th>
                                                            <th>SUPPLIER REFERENCE	</th>
                                                            <th>BRAND	</th>
                                                            <th>DESCRIPTION	</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* if(visible=="True") */}
                                                        {


                                                            fields.matMastPurchaseModels.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td align='center'>
                                                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                                            <div className='text-center' onClick={() => { editRow(row?.id) }}>
                                                                                <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                                                            </div>
                                                                            {/* <div onClick={() => edit(value, 'clone')}>onClick={() => { editRow(row?.id) }}
                                                                    <FontAwesomeIcon icon={faCopy} color="#919191" />
                                                                </div> */}
                                                                        </div>
                                                                    </td>
                                                                    {/* <td align='center'> {index + 1} </td> */}
                                                                    <td align='center'>{row.matCode}</td>
                                                                    <td align='center'>{row.supcode}</td>
                                                                    <td align='center'>{row.supRefNo}</td>
                                                                    <td align='center'>{row.brand}</td>
                                                                    <td align='center'>{row.purdesc}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        {/* <div class="clear"></div>
                        <div class="clear"></div>
                        <div class="clear"></div>
                        <div class="clear"></div>
                        <div class="clear"></div>
                        <div class="clear"></div> */}
                        <div class="d-flex align-content-center pt-20 pb-20 justify-content-center sticky-bottom">

                            <div class=" ">
                                <button class="btn btn-primary search-btn btn-block ml-10" onClick={close}>View List</button>
                            </div>
                            {/* <div class=" ">
                    <button class="btn btn-primary search-btn btn-block ml-10">Cancel</button>
                </div> */}
                            {/* <div>
                                <button className='btn btn-primary search-btn btn-block ml-10' onClick={(e) => { add() }}> Cancel </button>
                            </div> */}
                            <div>
                                <button className='btn btn-primary search-btn btn-block ml-10' onClick={(e) => {
                                    let _id = Number(fields.id)
                                    if (_id === 0) add()
                                    else edit(fields.entityID, fields.eCode, fields.eName)
                                }}> Clear </button>
                            </div>
                            <div class="">
                                {Savevisible && <button class="btn btn-success search-btn btn-block ml-10" disabled={loader} onClick={() => Save(fields.entityID, fields.eCode, fields.eName, 'save')}>Save</button>}
                                {updatevisible && <button class="btn btn-success search-btn btn-block ml-10" disabled={loader} onClick={() => Save(fields.entityID, fields.eCode, fields.eName, 'update')}>Update</button>}
                                {/* <button class="btn btn-success search-btn btn-block ml-10" onClick={save}>Save</button> */}
                            </div>
                            {/* <button disabled={loader} className='btn-sm btn defect-master-save mt-1 w-100' onClick={save}> {fields.id === 0 ? "Save" : "Update"} </button> */}

                        </div>
                    </div>
                    <div class="row mt-25 main-tab pl-15 pr-15">
                    </div>
                    <div class="row mt-25 main-tab pl-15 pr-15">
                    </div>
                    <div class="row mt-25 main-tab pl-15 pr-15">
                    </div>
                    <div class="row mt-25 main-tab pl-15 pr-15">
                    </div>
                    <div class="row mt-25 main-tab pl-15 pr-15">
                    </div>
                    {/* <!--row closed--> */}
                </div>
            }

        </>
    )
}

MaterialMaster.propTypes = {
    name: PropTypes.string
}

export default MaterialMaster;