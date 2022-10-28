import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import '../DefectMasters/DefectMasters.css';
import { Drawer, message, Spin, Switch } from 'antd';
import { ItrApiService } from '@afiplfeed/itr-ui';
import ApiCall from "../../../services";
import { API_URLS, MISCELLANEOUS_TYPES } from "../../../constants/api_url_constants";
import { getHostName, validateInputOnKeyup } from "../../../helpers";
import CustomTableContainer from "../../../components/Table/alter/AlterMIUITable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select1 from "react-dropdown-select";


import '../../../Assets/style.css'
import bootstrap from 'bootstrap/dist/js/bootstrap'
// import '../../../Assets/bootstrapstyle.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
//assets/img/delete-tbl.svg
import deletetbl from '../../../Assets/images/style/delete-tbl.svg'
import breadcrumbIcon from '../../../Assets/images/style/bred-icon.svg'
import '../../../Assets/sumoselect.css'
import jquery from '../../../Assets/js/jquerymin'

// "buyCode", "buydivCode", "orderCategory", "mActive", "deptcode", "stage", "activityType", "locCode", "fit", "actCode", "activity", "subActivity",
//     "criticalActivity", "tnaSeqNo", "duration", "dependActCode", "dependDeptCode", "dependActvity", "dependSubActvity", "preNotifyDays", "notifyRoleId", "l1EscalateDays", "l1EscalateRole", "l2EscalateDays", "l2EscalateRole", "category",
//     "valueAddtype", "weightage", "skipped", "remarks", "cancel", "active"


const requiredFields = ["buyCode", "buydivCode", "mActive", "deptcode", "activityType", "locCode", "activity", "duration", "preNotifyDays", "notifyRoleId"],
    initialErrorMessages = {
        id: 0,
        buyCode: "",
        buydivCode: "",
        orderCategory: "",
        mActive: "",
        deptcode: "",
        stage: "",
        activityType: "",
        locCode: "",
        fit: "",
        actCode: 0,
        activity: "",
        subActivity: "",
        criticalActivity: "",
        tnaSeqNo: 0,
        duration: 0,
        dependActCode: 0,
        dependDeptCode: "",
        dependActvity: "",
        dependSubActvity: "",
        preNotifyDays: 0,
        notifyRoleId: "",
        l1EscalateDays: 0,
        l1EscalateRole: "",
        l2EscalateDays: 0,
        l2EscalateRole: "",
        category: "",
        valueAddtype: "",
        weightage: 0,
        skipped: "",
        remarks: "",
        cancel: "",
        active: 'Y',
        hostName: ":.",
        createdDate: "2022-08-22",
        createdBy: "AD",
        modifiedDate: "2022-08-22",
        modifiedBy: "",
        isActive: false
    },
    initialFieldValues = {
        // id: 0,
        // buyCode: "",
        // buydivCode: "",
        // orderCategory: "",
        // mActive: "",
        // deptcode: "",
        // stage: "",
        // activityType: "",
        // locCode: "",
        // fit: "",
        // actCode: 0,
        // activity: "",
        // subActivity: "",
        // criticalActivity: "",
        // tnaSeqNo: 0,
        // duration: 0,
        // dependActCode: 0,
        // dependDeptCode: "",
        // dependActvity: "",
        // dependSubActvity: "",
        // preNotifyDays: 0,
        // notifyRoleId: "",
        // l1EscalateDays: 0,
        // l1EscalateRole: "",
        // l2EscalateDays: 0,
        // l2EscalateRole: "",
        // category: "",
        // valueAddtype: "",
        // weightage: 0,
        // skipped: "",
        // remarks: "",
        // cancel: "",
        // active: 'Y',
        // hostName: ":.",
        // createdDate: "2022-08-22",
        // createdBy: "AD",
        // modifiedDate: "2022-08-22",
        // modifiedBy: "",
        // isActive: false
    },

    TnaModels = {
        id: 0,
        buyCode: "",
        buydivCode: "",
        orderCategory: "",
        mActive: "Y",
        deptcode: "",
        stage: "",
        activityType: "",
        locCode: "",
        fit: "",
        actCode: 0,
        activity: "",
        subActivity: "",
        criticalActivity: "",
        tnaSeqNo: 0,
        duration: 0,
        dependActCode: 0,
        dependDeptCode: "",
        dependActvity: "",
        dependSubActvity: "",
        preNotifyDays: 0,
        notifyRoleId: "",
        l1EscalateDays: 0,
        l1EscalateRole: "",
        l2EscalateDays: 0,
        l2EscalateRole: "",
        category: "NA",
        valueAddtype: "",
        weightage: 0,
        skipped: "N",
        remarks: "",
        cancel: "N",
        active: 'Y',
        hostName: "",
        createdDate: "2022-08-22",
        createdBy: "AD",
        modifiedDate: "2022-08-22",
        modifiedBy: "",
        isActive: false
    };

function TNAMaster({ name }) {
    const [visible, setVisible] = useState(false);
    const [locationName, setLocationName] = useState([]);
    const [buyerList, setBuyerList] = useState([]);
    const [buyerDivisionList, setBuyerDivisionList] = useState([]);
    const [dependActCodeList, setdependActCodeList] = useState([]);
    const [dependActivityList, setdependActivityList] = useState([]);
    const [dependSubActivityList, setdependSubActivityList] = useState([]);
    // const [buyerdivcodelist, setbuyerdivcodelist] = useState([]);
    const [ProductTypeList, setProductTypeList] = useState([]);
    const [orderCatList, SetOrderCatList] = useState([]);
    const [activityList, SetActivityList] = useState([]);

    const [departmentList, DepartmentList] = useState([]);
    const [StageList, SetStageList] = useState([]);
    const [showResults, setShowResults] = React.useState(true);
    const [showForm, setShowForm] = React.useState(false);
    const [showAddtolist, setShowAddtolist] = React.useState(true);
    const [cloneSave, setCloneSave] = React.useState(false);
    const [showUpdatetolist, setShowUpdatetolist] = React.useState(false);
    // const [GenderList, setGenderList] = useState([]);
    const [deptList, SetdeptList] = useState([]);
    const [fitList, setFitList] = useState([]);
    const [valueaddList, setValueAdd] = useState([]);
    const [packQtyvisible, setPackQtyVisible] = useState(false);
    const [OGvisible, setOGVisible] = useState(true);

    const [buyerTypeVisible, setBuyerTypeVisible] = useState(false);
    const [EditVisible, setEditVisible] = useState(false);
    const [fields, setFields] = useState([
    ]);
    // const [field, setField] = useState({
    //     ...TnaModels
    // });
    const [AddTnamodels, setAddTnamodels] = useState({
        ...TnaModels
    });
    // const [fields, setFields] = useState({
    //     ...TnaModels
    // });
    const [listLoading, setListLoading] = useState(false);
    const [tnaListLoading, settnaListLoading] = useState([]);
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    })

    const clearFields = () => {
        setAddTnamodels({
            ...TnaModels
        });
        // setAddTnamodels([])
        setErrors({ ...initialErrorMessages });
    }

    const onClose = () => {
        clearFields();
        setVisible(false);

    };
    const onClick = () => {
        setShowResults(false)
        setShowForm(true)
    }

    const close = () => {
        //clearFields()
        setShowResults(true)
        setShowForm(false)
        setEditVisible(false);
        setPackQtyVisible(false);
        setBuyerTypeVisible(false);
        setCloneSave(true);
        onClose()
        getDatas()
        setFields([])
        setShowAddtolist(true);
        setShowUpdatetolist(false);
        // setAddTnamodels({
        //     ...TnaModels
        // });
    }
    const showDrawer = () => {
        setVisible(true);
    };


    const pageSize = 10;
    // for-list-pagination
    const [pagination, setPagination] = useState({
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0
    });
    useEffect(() => {
        if (AddTnamodels.buyCode) {
            getBuyerDivisionDropDown()
        }
    }, [AddTnamodels.buyCode])

    useEffect(() => {
        getDatas();
        //getBuyerDivCode();
        getProductType();
        getDeptCode();
        //getGender();
        getFit();
        getBuyerList();
        getLocation();
        getStage();
        getOrderCategory();
        getActivityType();
        getdept();
        getValueAdd();
        gettnaDatas();
        //gettnaDatas();
    }, []);

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

    const getBuyerList = () => {
        ApiCall({
            path: API_URLS.GET_BUYER_DROPDOWN
        }).then(resp => {
            if (Array.isArray(resp.data)) {
                setBuyerList(resp.data)
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getBuyerDivisionDropDown = () => {
        // setAddTnamodels({ ...AddTnamodels, buydivCode: AddTnamodels.id == 0 ? "" : AddTnamodels.buydivCode })
        if (AddTnamodels.buyCode) {
            ApiCall({
                path: API_URLS.GET_BUYER_DIVISION_DROPDOWN + `/${AddTnamodels.buyCode}`
            }).then(resp => {
                try {
                    setBuyerDivisionList(resp.data)
                } catch (er) {
                    message.error("Response data is not as expected")
                }
            })
                .catch(err => {
                    message.error(err.message || err)
                })
        } else {
            setBuyerDivisionList([])
        }
    }

    const GetdependActCodeDropDown = (buyCode, buydivCode, deptcode, locCode, activityType) => {
        // alert(API_URLS.GET_ALL_TNA_DPND_CODE_PARAMS + "?BuyCode=" + buyCode + "&BuydivCode=" + buydivCode + "&Deptcode=" + deptcode + "&LocCode=" + locCode + "&ActivityType=" + activityType);
        // alert(API_URLS.GET_ALL_TNA_DPND_CODE_PARAMS + "?BuyCode=" + AddTnamodels.buyCode + "&BuydivCode=" + AddTnamodels.buydivCode + "&Deptcode=" + AddTnamodels.deptcode + "&LocCode=" + AddTnamodels.locCode + "&ActivityType=" + value);       
        ApiCall({
            path: API_URLS.GET_ALL_TNA_DPND_CODE_PARAMS + "?BuyCode=" + buyCode + "&BuydivCode=" + buydivCode + "&Deptcode=" + deptcode + "&LocCode=" + locCode + "&ActivityType=" + activityType,
        }).then(resp => {
            try {
                // alert(resp.data);
                setdependActCodeList(resp.data)
                console.log(resp.data)
            } catch (er) {
                message.error("Response data is not as expected")
            }
        })
            .catch(err => {
                message.error(err.message || err)
            })

    }

    const GetdependActivityDropDown = (value) => {
        //alert(API_URLS.GET_ALL_TNA_DPND_ACTIVITY_PARAMS + "?BuyCode=" + AddTnamodels.buyCode + "&BuydivCode=" + AddTnamodels.buydivCode + "&Deptcode=" + value);
        ApiCall({
            path: API_URLS.GET_ALL_TNA_DPND_ACTIVITY_PARAMS + "?BuyCode=" + AddTnamodels.buyCode + "&BuydivCode=" + AddTnamodels.buydivCode + "&Deptcode=" + value,
        }).then(resp => {
            try {
                setdependActivityList(resp.data)
                console.log(resp.data)
            } catch (er) {
                message.error("Response data is not as expected")
            }
        })
            .catch(err => {
                message.error(err.message || err)
            })

    }

    const GetdependSubActivityDropDown = (value) => {
        // alert(API_URLS.GET_ALL_TNA_DPND_SUB_ACTIVITY_PARAMS + "?BuyCode=" + AddTnamodels.buyCode + "&BuydivCode=" + AddTnamodels.buydivCode + "&Deptcode=" + AddTnamodels.dependDeptCode + "&Activity=" + value);
        ApiCall({
            path: API_URLS.GET_ALL_TNA_DPND_SUB_ACTIVITY_PARAMS + "?BuyCode=" + AddTnamodels.buyCode + "&BuydivCode=" + AddTnamodels.buydivCode + "&Deptcode=" + AddTnamodels.dependDeptCode + "&Activity=" + value,
        }).then(resp => {
            try {
                setdependSubActivityList(resp.data)
                console.log(resp.data)
            } catch (er) {
                message.error("Response data is not as expected")
            }
        })
            .catch(err => {
                message.error(err.message || err)
            })

    }

    const getDeptCode = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.DEPT
        }).then(resp => {
            try {
                DepartmentList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }
    const getStage = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.ORDSTAGE
        }).then(resp => {
            try {
                SetStageList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }
    const getOrderCategory = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.ORDCATE
        }).then(resp => {
            try {
                SetOrderCatList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }
    const getActivityType = () => {
        // alert(API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.ACTTYPE);INDDEPT
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.ACTTYPE
        }).then(resp => {
            try {
                SetActivityList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getdept = () => {
        // alert(API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.ACTTYPE);
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.INDDEPT
        }).then(resp => {
            try {
                SetdeptList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getLocation = () => {
        // alert(API_URLS.GET_ACTIVE_LOCATION_MASTER);
        ApiCall({

            path: API_URLS.GET_ACTIVE_LOCATION_MASTER
        }).then(resp => {
            try {
                setLocationName(resp.data)
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getProductType = () => {
        ApiCall({
            path: API_URLS.GET_PRODUCT_TYPE_DROPDOWN
        }).then(resp => {
            try {
                setProductTypeList(resp.data.map(d => ({ code: d.productType, codeDesc: d.productType })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getFit = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.FIT
        }).then(resp => {
            try {
                setFitList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getValueAdd = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.VALUEADD
        }).then(resp => {
            try {
                setValueAdd(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }


    const getDatas = () => {
        setListLoading(true)
        ApiCall({
            path: API_URLS.GET_ALL_TNA_DISTINCT_LIST
        }).then(resp => {
            setListLoading(false)
            if (Array.isArray(resp.data)) {
                setList(resp.data)
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            setListLoading(false)
            message.error(err.message || err)
        })
    }


    const gettnaDatas = () => {
        setListLoading(true)
        ApiCall({
            path: API_URLS.GET_ALL_TNA_LIST
        }).then(resp => {
            setListLoading(false)
            if (Array.isArray(resp.data)) {
                settnaListLoading(resp.data)
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            setListLoading(false)
            message.error(err.message || err)
        })
    }
    // const handleChangecheckboxall = (event) => {
    //     if (this.state.buyerrightlists.length > 0) {
    //         let allbuyerrights = this.state.buyerrightlists.map(item => {
    //             if (event.target.checked) item.notify = 'Y'; else item.notify = 'N';
    //             return item;
    //         });
    //         this.setState({ buyerrightlists: allbuyerrights });
    //     }
    // }

    // const handleChangesingledropdown = name => e => {
    //     AddTnamodels({ [name]: (e.target.checked == "N" ? "Y" : "N") });
    //     //alert(({ [name]: (e.target.checked == "N" ? "Y" : "N") }));
    //     // if (e.target.checked == true) {
    //     //     alert();
    //     //     this.setAddTnamodels({ [name]: (e.target.value == "Y") });
    //     //     alert(setAddTnamodels.mActive);
    //     // }
    //     // else {
    //     //     this.setAddTnamodels({ [name]: (e.target.value == "N") });
    //     //     alert(setAddTnamodels.mActive);
    //     // }
    //     // this.setState({ [name]: (e.target.checked == "N" ? "Y" : "N") });
    //     // alert(this.setState);
    // };
    const inputOnChange = name => e => {
        let err = {}, validation = true
        let value = e.target.value//.||name === 'weightage'||name === 'preNotifyDays'||name === 'l1EscalateDays'||name === 'l2EscalateDays'
        if (name === 'weightage' || name === 'preNotifyDays' || name === 'l1EscalateDays' || name === 'l2EscalateDays') {
            const re = /^[0-9\b]+$/;
            // alert(re);   /^[+-]?\d*(?:[.,]\d*)?$/
            debugger;
            if (e.target.value === '' || re.test(e.target.value)) {
                //alert(e.target.value);
                setAddTnamodels({ ...AddTnamodels, [name]: value });
                err['weightage'] = ''
                err['preNotifyDays'] = ''
                err['l1EscalateDays'] = ''
                err['l2EscalateDays'] = ''
                setErrors({ ...initialErrorMessages, ...err })
            }
            else {
                // alert(e.target.value);
                err[name] = "Please enter numbers only"
                validation = false
                // setErrors({ ...errors, ...err })
                message.error(typeof err == "string" ? err : "Please enter numbers only");
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'duration') {
            const re = /^[-0-9\b]+$/;
            // alert(re);   /^[+-]?\d*(?:[.,]\d*)?$/
            debugger;
            if (e.target.value === '' || re.test(e.target.value)) {
                //alert(e.target.value);
                setAddTnamodels({ ...AddTnamodels, [name]: value });
                err['duration'] = ''
                setErrors({ ...initialErrorMessages, ...err })
            }
            else {
                // alert(e.target.value);
                err[name] = "Please enter numbers only"
                validation = false
                // setErrors({ ...errors, ...err })
                message.error(typeof err == "string" ? err : "Please enter numbers only");
                setErrors({ ...errors, ...err })
            }
        }
        // else {
        //     setAddTnamodels({ ...AddTnamodels, [name]: value })

        //     // alert(AddTnamodels.buyCode);
        //     //alert(AddTnamodels.buyCode);
        // }

        // if (name === 'weightage'){
        //     const re = /^[0-9\b]+$/;
        //     if (e.target.value === '' || re.test(e.target.value)) {
        //         setFields({ ...fields, [name]: value });
        //         err['weightage'] =  ''
        //         setErrors({ ...errors, ...err })
        //     }
        //     else {
        //         err['weightage'] = "Please enter numbers only"
        //         validation = false
        //         setErrors({ ...errors, ...err })
        //     }
        // }  else {
        //     setFields({ ...fields, [name]: value })
        // }
        // if (name === 'dependActCode') {
        //     //alert(name);
        //     if (e.target.value === 0) {
        //         // setPackQtyVisible(true);
        //         // setBuyerTypeVisible(true);
        //     }
        //     else {
        //         // setPackQtyVisible(true);
        //         // setBuyerTypeVisible(true);
        //     }
        // }
        else if (name === 'dependDeptCode') {
            GetdependActivityDropDown(e.target.value);
            setAddTnamodels({ ...AddTnamodels, [name]: value })
        }
        else if (name === 'dependActvity') {
            GetdependSubActivityDropDown(e.target.value);
            setAddTnamodels({ ...AddTnamodels, [name]: value })
        }
        else if (name === 'stage') {
            if (e.target.value === 'CONFIRMED') {
                setOGVisible(false);
            }
            else
            {
                setOGVisible(true);
            }
            setAddTnamodels({ ...AddTnamodels, [name]: value })
        }
        else if (name === 'activityType') {
            debugger;
            // alert(e.target.value);
            // alert([name]); setOGVisible
            edit(AddTnamodels.buyCode, AddTnamodels.buydivCode, AddTnamodels.deptcode, AddTnamodels.locCode, e.target.value, 'edit')
            setAddTnamodels({ ...AddTnamodels, [name]: value })
            if (e.target.value === 'SOP') {
                setPackQtyVisible(true);
                setBuyerTypeVisible(true);
                setOGVisible(true);
            }
            else if (e.target.value === 'BUYER') {
                setPackQtyVisible(true);
                setBuyerTypeVisible(false);
                setOGVisible(true);
            }
            else if (e.target.value === 'INTERNAL') {
                setPackQtyVisible(false);
                setBuyerTypeVisible(false);
            }
            GetdependActCodeDropDown(AddTnamodels.buyCode, AddTnamodels.buydivCode, AddTnamodels.deptcode, AddTnamodels.locCode, e.target.value);
        }
        else {
            setAddTnamodels({ ...AddTnamodels, [name]: value })
        }

    }

    function AddTna() {
        // alert("ADD");
        debugger;
        //  let c = 0;
        let err = {}, validation = true
        requiredFields.forEach(f => {
            if (AddTnamodels[f] === "") {
                err[f] = "This field is required"
                validation = false
                //   ++c;
            } else {
                validation = true
            }
        })
        setErrors({ ...initialErrorMessages, ...err })
        debugger;
        console.log(AddTnamodels);
        //fields.push(AddTnamodels)
        //clearFieldsVisualSam();
        debugger;
        if (validation == true) {
            //alert(AddTnamodels.id);
            if (AddTnamodels.id == 0) {
                setFields([...fields, AddTnamodels])
                // Clear();
                // clearFields();
            } else {
                debugger;
                // alert(AddTnamodels.id);
                setShowAddtolist(true);
                setShowUpdatetolist(false);
                GetdependActCodeDropDown(AddTnamodels.buyCode, AddTnamodels.buydivCode, AddTnamodels.deptcode, AddTnamodels.locCode, AddTnamodels.activityType);
                //onChange={inputOnChange("activityType")};
                // let toUpdateData = fields.filter(q => q.id == AddTnamodels.id)
                //console.log(toUpdateData);
                let toUpdateData = fields.map((item) => {
                    if (item.id === AddTnamodels.id) {
                        item.buyCode = AddTnamodels.buyCode,
                            item.buydivCode = AddTnamodels.buydivCode,
                            item.deptcode = AddTnamodels.deptcode,
                            item.locCode = AddTnamodels.locCode,
                            item.activityType = AddTnamodels.activityType,
                            item.mActive = AddTnamodels.mActive,
                            item.orderCategory = AddTnamodels.orderCategory,
                            item.stage = AddTnamodels.stage,
                            item.fit = AddTnamodels.fit,
                            item.actCode = AddTnamodels.actCode,
                            item.activity = AddTnamodels.activity,
                            item.subActivity = AddTnamodels.subActivity,
                            item.criticalActivity = AddTnamodels.criticalActivity,
                            item.tnaSeqNo = AddTnamodels.tnaSeqNo,
                            item.duration = AddTnamodels.duration,
                            item.dependActCode = AddTnamodels.dependActCode,
                            item.dependDeptCode = AddTnamodels.dependDeptCode,
                            item.dependActvity = AddTnamodels.dependActvity,
                            item.dependSubActvity = AddTnamodels.dependSubActvity,
                            item.preNotifyDays = AddTnamodels.preNotifyDays,
                            item.notifyRoleId = AddTnamodels.notifyRoleId,
                            item.l1EscalateDays = AddTnamodels.l1EscalateDays,
                            item.l1EscalateRole = AddTnamodels.l1EscalateRole,
                            item.l2EscalateDays = AddTnamodels.l2EscalateDays,
                            item.l2EscalateRole = AddTnamodels.l2EscalateRole,
                            item.category = AddTnamodels.category,
                            item.valueAddtype = AddTnamodels.valueAddtype,
                            item.weightage = AddTnamodels.weightage,
                            item.skipped = AddTnamodels.skipped,
                            item.remarks = AddTnamodels.remarks,
                            item.cancel = AddTnamodels.cancel,
                            item.active = AddTnamodels.active,
                            item.hostName = AddTnamodels.hostName,
                            item.createdDate = AddTnamodels.createdDate,
                            item.createdBy = AddTnamodels.createdBy,
                            item.modifiedDate = AddTnamodels.modifiedDate,
                            item.modifiedBy = AddTnamodels.modifiedBy,
                            item.isActive = AddTnamodels.isActive
                    }
                    return item;
                });
                AddTnamodels.id = 0;
                AddTnamodels.orderCategory = "",
                    AddTnamodels.stage = "",
                    AddTnamodels.fit = "",
                    AddTnamodels.actCode = 0,
                    AddTnamodels.activity = "",
                    AddTnamodels.subActivity = "",
                    AddTnamodels.criticalActivity = "",
                    AddTnamodels.tnaSeqNo = 0,
                    AddTnamodels.duration = 0,
                    AddTnamodels.dependActCode = 0,
                    AddTnamodels.dependDeptCode = "",
                    AddTnamodels.dependActvity = "",
                    AddTnamodels.dependSubActvity = "",
                    AddTnamodels.preNotifyDays = 0,
                    AddTnamodels.notifyRoleId = "",
                    AddTnamodels.l1EscalateDays = 0,
                    AddTnamodels.l1EscalateRole = "",
                    AddTnamodels.l2EscalateDays = 0,
                    AddTnamodels.l2EscalateRole = "",
                    AddTnamodels.category = "NA",
                    AddTnamodels.valueAddtype = "",
                    AddTnamodels.weightage = 0,
                    AddTnamodels.skipped = "N",
                    AddTnamodels.remarks = "",
                    AddTnamodels.cancel = "Y",
                    AddTnamodels.active = 'Y',
                    //this.setState({ TaskData: toUpdateData });
                    setFields(toUpdateData);

                //Clear();
                //clearFields();
                //onClose();
                // alert(AddTnamodels.id);
            }
            //  fields.push(AddTnamodels)
            //ClearDetails();
        }

    }
    function ClearDetails() {
        AddTnamodels.id = 0,
            AddTnamodels.orderCategory = "",
            AddTnamodels.stage = "",
            AddTnamodels.fit = "",
            AddTnamodels.actCode = 0,
            AddTnamodels.activity = "",
            AddTnamodels.subActivity = "",
            AddTnamodels.criticalActivity = "",
            AddTnamodels.tnaSeqNo = 0,
            AddTnamodels.duration = 0,
            AddTnamodels.dependActCode = 0,
            AddTnamodels.dependDeptCode = "",
            AddTnamodels.dependActvity = "",
            AddTnamodels.dependSubActvity = "",
            AddTnamodels.preNotifyDays = 0,
            AddTnamodels.notifyRoleId = "",
            AddTnamodels.l1EscalateDays = 0,
            AddTnamodels.l1EscalateRole = "",
            AddTnamodels.l2EscalateDays = 0,
            AddTnamodels.l2EscalateRole = "",
            AddTnamodels.category = "NA",
            AddTnamodels.valueAddtype = "",
            AddTnamodels.weightage = 0,
            AddTnamodels.skipped = "N",
            AddTnamodels.remarks = "",
            AddTnamodels.cancel = "Y",
            AddTnamodels.active = 'Y',
            AddTnamodels.hostName = "",
            AddTnamodels.createdDate = "2022-08-22",
            AddTnamodels.createdBy = "AD",
            AddTnamodels.modifiedDate = "2022-08-22",
            AddTnamodels.modifiedBy = "",
            AddTnamodels.isActive = false

    }
    const save = () => {
        debugger;
        // alert('Hai save');
        // if (loader) return
        let a = {}, validation = true
        // debugger;
        // fields.forEach(weightage => {
        //     if (AddTnamodels[weightage] !== "") {

        //         a[weightage]++// = "This field is required"
        //         // validation  = false
        //     }
        // })
        // if (fields.weightage == 0) {
        //     err['transitdays'] = "Should be greater than zero."
        //     validation = false
        // }

        //  setErrors({ ...initialErrorMessages, ...err })
        // alert(fields.length);
        if (fields.length == 0) {
            message.error(typeof err == "string" ? err : "Atleast Add one row");
            return
        }
        {
            if (showUpdatetolist) {
                message.error(typeof err == "string" ? err : "Update to list then Save");
                return
            }
            {
                console.log(cloneSave)
                if (cloneSave) {
                    //alert('cloned')
                    let toUpdateData = fields.map((item) => {
                        if (fields) {
                            item.id = 0,
                                item.buyCode = item.buyCode,
                                item.buydivCode = item.buydivCode,
                                item.deptcode = item.deptcode,
                                item.locCode = item.locCode,
                                item.activityType = item.activityType,
                                item.mActive = item.mActive,
                                item.orderCategory = item.orderCategory,
                                item.stage = item.stage,
                                item.fit = item.fit,
                                item.actCode = item.actCode,
                                item.activity = item.activity,
                                item.subActivity = item.subActivity,
                                item.criticalActivity = item.criticalActivity,
                                item.tnaSeqNo = 0,
                                item.duration = item.duration,
                                item.dependActCode = item.dependActCode,
                                item.dependDeptCode = item.dependDeptCode,
                                item.dependActvity = item.dependActvity,
                                item.dependSubActvity = item.dependSubActvity,
                                item.preNotifyDays = item.preNotifyDays,
                                item.notifyRoleId = item.notifyRoleId,
                                item.l1EscalateDays = item.l1EscalateDays,
                                item.l1EscalateRole = item.l1EscalateRole,
                                item.l2EscalateDays = item.l2EscalateDays,
                                item.l2EscalateRole = item.l2EscalateRole,
                                item.category = item.category,
                                item.valueAddtype = item.valueAddtype,
                                item.weightage = item.weightage,
                                item.skipped = item.skipped,
                                item.remarks = item.remarks,
                                item.cancel = item.cancel,
                                item.active = item.active,
                                item.hostName = item.hostName,
                                item.createdDate = item.createdDate,
                                item.createdBy = item.createdBy,
                                item.modifiedDate = item.modifiedDate,
                                item.modifiedBy = item.modifiedBy,
                                item.isActive = item.isActive
                        }
                        return item;
                    });

                    setFields(toUpdateData);

                    console.log(fields);
                    setLoader(true)
                    //  alert(API_URLS.SAVE_TNA_MASTER_LIST);
                    ApiCall({
                        method: "POST",
                        path: API_URLS.SAVE_TNA_MASTER_LIST,
                        data: fields
                    }).then(resp => {
                        setLoader(false)
                        message.success(resp.message)
                        onClose()
                        getDatas()
                        setShowResults(true)
                        setShowForm(false)
                        setCloneSave(false);
                    }).catch(err => {

                        //console.log('CATCH');
                        setLoader(false)
                        //  fields['ftdOprName'] = tempOprName
                        //setFields([...fields, AddTnamodels])
                        setErrors({ ...initialErrorMessages })
                        message.error(err.message || err)
                    })

                }
                else {
                    console.log(fields);
                    //if (validation) {
                    setLoader(true)
                    //  alert(API_URLS.SAVE_TNA_MASTER_LIST);
                    ApiCall({
                        method: "POST",
                        path: API_URLS.SAVE_TNA_MASTER_LIST,
                        data: fields
                    }).then(resp => {
                        setLoader(false)
                        message.success(resp.message)
                        onClose()
                        getDatas()
                        setShowResults(true)
                        setShowForm(false)
                    }).catch(err => {

                        //console.log('CATCH');
                        setLoader(false)

                        //  fields['ftdOprName'] = tempOprName
                        //setFields([...fields, AddTnamodels])
                        setErrors({ ...initialErrorMessages })
                        message.error(err.message || err)
                    })
                }
            }
        }
    }
    // const sampleaddmoresave = () => {

    //     const manditoryFields = [
    //         "buyer",
    //         "buyerdiv",
    //         "stage",
    //         "ordercategory",
    //         "department",
    //         "activitytype",
    //         "location",
    //         "fit",
    //         "activity",
    //         "weightage",
    //         "DpndCode",
    //         // "DpndOnAct",
    //         "CriticalActivity",
    //         "days",
    //         "PreNotifydays",
    //         "NotifyRoleId",
    //         "valueadd"
    //     ]

    //     let errors = {}
    //     let flags = manditoryFields.map(f => {
    //         let val = this.state[f]
    //         let d = {
    //             field: f,
    //             val,
    //             flag: (val && Array.isArray(val) && val.length == 0) || (["string", "number"].includes(typeof val) && val === "")
    //         }
    //         if (f == "PreNotifydays" && val <= 0) {
    //             d.flag = true
    //             errors[f] = "PreNotifydays should be greater than zero"
    //         }
    //         if (f == "fit") {
    //             d.flag = false
    //             if (this.state.activitytype.length && ["INTERNAL", "SOP"].includes(this.state.activitytype[0].value) && val.length == 0) {
    //                 d.flag = true
    //                 errors[f] = "Fields is manditory"
    //             }
    //         }
    //         if (d.flag) errors[f] = "Fields is manditory"
    //         return d
    //     })
    //     this.setState({ errors })
    //     if (flags.filter(f => f.flag).length > 0) {
    //         const [buyerdiv] = this.state.buyerdiv
    //         debugger
    //         return
    //     }

    //     const { rowIndex } = this.state;
    //     var tamasteraddmoredata = this.state.tamasteraddmoredata

    //     if (tamasteraddmoredata.filter(d => (d.activity == this.state.activity && d.subActivity == this.state.subactivity) && !d.isEdit).length) {
    //         toastr.error("Activity/Sub activity combo should be unique")
    //         return
    //     }

    //     let DpndDept = "";
    //     let DpndDeptlabel = "";
    //     if (this.state.DpndDept.length > 0) {
    //         DpndDept = this.state.DpndDept[0].value;
    //         DpndDeptlabel = this.state.DpndDept[0].label;
    //     }

    //     let DpndOnAct = "";
    //     let DpndOnActlabel = "";
    //     if (this.state.DpndOnAct.length > 0) {
    //         DpndOnAct = this.state.DpndOnAct[0].value;
    //         DpndOnActlabel = this.state.DpndOnAct[0].label;
    //     }

    //     let DpndOnSubAct = "";
    //     let DpndOnSubActlabel = "";
    //     if (this.state.DpndOnSubAct.length > 0) {
    //         DpndOnSubAct = this.state.DpndOnSubAct[0].value;
    //         DpndOnSubActlabel = this.state.DpndOnSubAct[0].label;
    //     }


    //     let category = "";
    //     let categorylabel = "";
    //     if (this.state.category.length > 0) {
    //         category = this.state.category[0].value;
    //         categorylabel = this.state.category[0].label;
    //     }

    //     let valueadd = "";
    //     let valueaddlabel = "";
    //     if (this.state.valueadd.length > 0) {
    //         valueadd = this.state.valueadd[0].value;
    //         valueaddlabel = this.state.valueadd[0].label;
    //     }

    //     let DpndCode = 0;
    //     let DpndCodelabel = "";
    //     if (this.state.DpndCode.length > 0) {
    //         DpndCode = this.state.DpndCode[0].value;
    //         DpndCodelabel = this.state.DpndCode[0].label;
    //     }


    //     let activitytype = "";
    //     if (this.state.activitytype.length > 0) {
    //         activitytype = this.state.activitytype[0].value;
    //     }

    //     let department = "";
    //     if (this.state.department.length > 0) {
    //         department = this.state.department[0].value;
    //     }

    //     let stage = "";
    //     if (this.state.stage.length > 0) {
    //         stage = this.state.stage[0].value;
    //     }

    //     let NotifyRoleId = this.state.NotifyRoleId.map(d => d.value).join(',');
    //     let NotifyRoleIdlabel = this.state.NotifyRoleId.map(d => d.label).join(',');

    //     let L1EscalateRole = this.state.L1EscalateRole.map(d => d.value).join(',');
    //     let L1EscalateRolelabel = this.state.L1EscalateRole.map(d => d.label).join(',');

    //     let L2EscalateRole = this.state.L2EscalateRole.map(d => d.value).join(',');
    //     let L2EscalateRolelabel = this.state.L2EscalateRole.map(d => d.label).join(',');

    //     let fit = "";
    //     let fitlabel = "";
    //     if (this.state.fit.length > 0) {
    //         fit = this.state.fit[0].value;
    //         fitlabel = this.state.fit[0].label;
    //     }
    //     let id = 0;
    //     if (this.state.edit_add != false) {
    //         id = this.state.hid;
    //     }
    //     if (this.state.edit_add == false) {
    //         id = 0;
    //     }
    //     let CriticalActivity = "";
    //     if (this.state.CriticalActivity.length > 0) {
    //         CriticalActivity = this.state.CriticalActivity[0].value;
    //     }
    //     let location = "";
    //     let locationname = "";
    //     if (this.state.location.length > 0) {
    //         location = this.state.location[0].value;
    //         locationname = this.state.location[0].label;
    //     }
    //     if (this.state.buyer.length > 0 && this.state.buyerdiv.length > 0 && this.state.ordercategory.length > 0) {
    //         debugger
    //         let data = {
    //             "id": this.state.hid,
    //             "buyCode": this.state.buyer[0].value,
    //             "buyName": this.state.buyer[0].label,
    //             "buydivCode": this.state.buyerdiv[0].value,
    //             "buydivName": this.state.buyerdiv[0].label,
    //             "orderCategory": this.state.ordercategory[0].value,
    //             "deptcode": department,
    //             "stage": stage,
    //             "activityType": activitytype,
    //             "fit": fit,
    //             "fitName": fitlabel,
    //             "actCode": 0,
    //             "activity": this.state.activity,
    //             "subActivity": this.state.subactivity,
    //             "tnaSeqNo": this.state.hid == 0 ? (this.state.edit_add ? Math.max(...tamasteraddmoredata.map(dd => dd.tnaSeqNo)) + 1 : 0) : this.state.tnaSeqNo,
    //             "duration": this.state.days || 0,
    //             "dependActCode": DpndCode,//0,//DpndOnAct,
    //             "dependDeptCode": DpndDept,
    //             "dependDeptCodeName": DpndDeptlabel,
    //             "dependActvity1": DpndOnAct,
    //             "dependActvity": DpndOnActlabel,
    //             "dependActvityName": DpndOnActlabel,
    //             "dependSubActvity1": DpndOnSubAct,
    //             "dependSubActvity": DpndOnSubActlabel,
    //             "dependSubActvityName": DpndOnSubActlabel,
    //             "category": category,
    //             "valueAddtype": valueadd,
    //             "skipped": this.state.alowskipflag,
    //             "active": this.state.activeflag,
    //             "createdBy": "string",
    //             "modifyBy": "string",
    //             "hostname": "string",
    //             "mActive": this.state.mactiveflag,
    //             "criticalActivity": CriticalActivity,
    //             "location": location,
    //             "locCode": location,
    //             "locationName": locationname,
    //             "preNotifyDays": this.state.PreNotifydays,
    //             "weightage": this.state.weightage,
    //             "notifyRoleId": NotifyRoleId,//this.state.NotifyRoleId,
    //             "notifyRoleDesc": NotifyRoleIdlabel,
    //             "l1EscalateDays": this.state.L1EscalateDays,
    //             "l1EscalateRole": L1EscalateRole,//this.state.L1EscalateRole,
    //             "l1EscalateRoleDesc": L1EscalateRolelabel,
    //             "l2EscalateDays": this.state.L2EscalateDays,
    //             "l2EscalateRole": L2EscalateRole,//this.state.L2EscalateRole,
    //             "l2EscalateRoleDesc": L2EscalateRolelabel,
    //             "remarks": this.state.remarks,
    //             "cancel": "N",
    //         }
    //         if (rowIndex == -1) tamasteraddmoredata.push(data);
    //         else tamasteraddmoredata[rowIndex] = data
    //         this.setState({ tamasteraddmoredata: tamasteraddmoredata.map(d => ({ ...d, mActive: this.state.mactiveflag })), rowIndex: -1 });
    //         // var sum = 0;
    //         // for (const item of this.state.tamasteraddmoredata) {
    //         //     sum = Number(sum)+Number(item.weightage);   
    //         // }
    //         // console.log(sum,'=====================')
    //         var dpndCode = data.tnaSeqNo ? data.tnaSeqNo : tamasteraddmoredata.length
    //         this.setState({
    //             // stage: [], 
    //             hid: 0,
    //             activitytype: [], fit: [], activity: '',
    //             NotifyRoleId: [],
    //             L1EscalateRole: [],
    //             L2EscalateRole: [], PreNotifydays: 0, weightage: 0,
    //             L1EscalateDays: 0, remarks: "",
    //             L2EscalateDays: 0,
    //             CriticalActivity: [],
    //             subactivity: '', days: '', DpndCode: [{ value: dpndCode, label: dpndCode }], DpndDept: [], DpndOnAct: [], DpndOnSubAct: [], category: [], valueadd: [], mactiveflag: this.state.mactiveflag, activeflag: "Y", alowskipflag: "N"
    //         })

    //     } else {
    //         toastr.error('Please Enter all values');
    //     }
    // }

    const NUMBER_IS_FOCUS_IN_ZERO = name => (e) => {
        if (e.target.value == "0" || e.target.value == "" || e.target.value == undefined) {
            //    setprofitPercentList({ ...profitPercentList, [name]: "" });
            // setFields({ ...AddTnamodels, [name]: "" })
            setAddTnamodels({ ...AddTnamodels, [name]: "" });
        }
    }
    const NUMBER_IS_FOCUS_OUT_ZERO = name => (e) => {
        if (e.target.value == "" || e.target.value == undefined) {
            // setFields({ ...AddTnamodels, [name]: 0 })
            setAddTnamodels({ ...AddTnamodels, [name]: 0 });
        }
    }

    const [tableProps, setTableProps] = useState({
        page: 0,
        rowsPerPage: 10,
        sortOrder: {
            name: 'buydivCode',
            direction: 'asc'
        }
    })

    const updateTableProps = props => {
        setTableProps({
            ...tableProps,
            ...props
        })
    }

    const tableColumns = [
        {
            name: "buyCode",
            label: "buyCode",
        },
        {
            name: "buydivCode",
            label: "buydivCode",
        },
        {
            name: "deptcode",
            label: "deptcode",
        },
        {
            name: "locCode",
            label: "locCode",
        },
        {
            name: "activityType",
            label: "activityType",
        }
        // },

        // {
        //     name: "activityType",
        //     label: "activityType",
        // },
        // {
        //     name: "address3",
        //     label: "address3",
        // },
        // {
        //     name: "city",
        //     label: "city",
        // },
        // {
        //     name: "pinCode",
        //     label: "pinCode",
        // },

        // {
        //     name: "country",
        //     label: "country",
        // },
        // {
        //     name: "emailId",
        //     label: "emailId",
        // },
        // {
        //     name: "contPerson1",
        //     label: "contPerson1",
        // },
        // {
        //     name: "contPerson2",
        //     label: "contPerson2",
        // },
        // {
        //     name: "contNo",
        //     label: "contNo",
        // },
        // {
        //     name: "imageFileName",
        //     label: "imageFileName",
        // }
        ,
        {
            name: "mActive",
            label: "M.Active",
            options: {
                customBodyRender: (value, tm) => {
                    return <div>
                        {value === "Y" ? "Yes" : "Yes"}
                    </div>
                }
            }
        },
        {
            name: "buyCode",
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div onClick={() => edit(tm.rowData[0], tm.rowData[1], tm.rowData[2], tm.rowData[3], tm.rowData[4], 'edit')}>
                                <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                            </div>
                            <div onClick={() => edit(tm.rowData[0], tm.rowData[1], tm.rowData[2], tm.rowData[3], tm.rowData[4], 'clone')}>
                                <FontAwesomeIcon icon={faCopy} color="#919191" />
                            </div>
                            {/* <div onClick={() => edit(value, 'clone')}>
                                <FontAwesomeIcon icon={faCopy} color="#919191" />
                            </div> */}
                        </div>

                    )
                }
            }
        }
    ]

    const getDataById = (buyCode, buydivCode, deptcode, locCode, activityType) => {
        return ApiCall({
            path: API_URLS.GET_ALL_TNA_LIST_WITH_PARAMS + "?BuyCode=" + buyCode + "&BuydivCode=" + buydivCode + "&Deptcode=" + deptcode + "&LocCode=" + locCode + "&ActivityType=" + activityType,
        })
    }
    const add = async () => {
        try {
            setLoader(true)
            setVisible(true);
            clearFields();
            setLoader(false);
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
    const edit = async (buyCode, buydivCode, deptcode, locCode, activityType, type) => {
        try {
            // alert(type);
            setLoader(true)
            setVisible(true);
            setShowResults(false)
            setShowForm(true)
            //  clearFields();
            let { data } = (buyCode && await getDataById(buyCode, buydivCode, deptcode, locCode, activityType))
            debugger;
            if (!data) {
                message.error("Data not found")
                return
            }
            else {
                if (type === 'clone') {
                    // alert(e.target.value);
                    // alert([name]);
                    //setAddTnamodels({ ...AddTnamodels, [name]: value })

                    // GetdependActCodeDropDown(data[0].activityType);
                }
                else {
                    if (data[0].activityType === 'SOP') {
                        setPackQtyVisible(true);
                        setBuyerTypeVisible(true);
                        setOGVisible(true);
                    }
                    else if (data[0].activityType === 'BUYER') {
                        setPackQtyVisible(true);
                        setBuyerTypeVisible(false);
                        setOGVisible(true);
                    }
                    else if (data[0].activityType === 'INTERNAL') {
                        setPackQtyVisible(false);
                        setBuyerTypeVisible(false);
                    }
                    //alert();
                    // GetdependActCodeDropDown(data[0].buyCode, data[0].buydivCode, data[0].deptcode, data[0].locCode,data[0].activityType);
                }
                //  alert(data);
                console.log(data)
                if (type === 'clone') {
                    //alert(type);
                    setFields(data);
                    setAddTnamodels({
                        ...TnaModels
                    });
                    // setAddTnamodels({
                    //     id: 0,
                    //     buyCode: data[0].buyCode,
                    //     buydivCode: data[0].buydivCode,
                    //     deptcode: data[0].deptcode,
                    //     locCode: data[0].locCode,
                    //     activityType: data[0].activityType,
                    //     mActive: data[0].mActive,
                    //     stage: "",
                    //     orderCategory: "",
                    //     fit: "",
                    //     actCode: 0,
                    //     activity: "",
                    //     subActivity: "",
                    //     criticalActivity: "",
                    //     tnaSeqNo: 0,
                    //     duration: 0,
                    //     dependActCode: 0,
                    //     dependDeptCode: "",
                    //     dependActvity: "",
                    //     dependSubActvity: "",
                    //     preNotifyDays: 0,
                    //     notifyRoleId: "",
                    //     l1EscalateDays: 0,
                    //     l1EscalateRole: "",
                    //     l2EscalateDays: 0,
                    //     l2EscalateRole: "",
                    //     category: "NA",
                    //     valueAddtype: "",
                    //     weightage: 0,
                    //     skipped: "N",
                    //     remarks: "",
                    //     cancel: "N",
                    //     active: 'Y',
                    //     hostName: "",
                    //     createdDate: "2022-08-22",
                    //     createdBy: "AD",
                    //     modifiedDate: "2022-08-22",
                    //     modifiedBy: "",
                    //     isActive: false
                    //     // orderCategory: data[0].orderCategory,
                    //     // stage: data[0].stage,
                    //     // fit: data[0].fit,
                    //     // actCode: data[0].actCode,
                    //     // activity: data[0].activity,
                    //     // subActivity: data[0].subActivity,
                    //     // criticalActivity: data[0].criticalActivity,
                    //     // tnaSeqNo: data[0].tnaSeqNo,
                    //     // duration: data[0].duration,
                    //     // dependActCode: data[0].dependActCode,
                    //     // dependDeptCode: data[0].dependDeptCode,
                    //     // dependActvity: data[0].dependActvity,
                    //     // dependSubActvity: data[0].dependSubActvity,
                    //     // preNotifyDays: data[0].preNotifyDays,
                    //     // notifyRoleId: data[0].notifyRoleId,
                    //     // l1EscalateDays: data[0].l1EscalateDays,
                    //     // l1EscalateRole: data[0].l1EscalateRole,
                    //     // l2EscalateDays: data[0].l2EscalateDays,
                    //     // l2EscalateRole: data[0].l2EscalateRole,
                    //     // category: data[0].category,
                    //     // valueAddtype: data[0].valueAddtype,
                    //     // weightage: data[0].weightage,
                    //     // skipped: data[0].skipped,
                    //     // remarks: data[0].remarks,
                    //     // cancel: data[0].cancel,
                    //     // active: data[0].active,
                    //     // hostName: data[0].hostName,
                    //     // createdDate: data[0].createdDate,
                    //     // createdBy: data[0].createdBy,
                    //     // modifiedDate: data[0].modifiedDate,
                    //     // modifiedBy: data[0].modifiedBy,
                    //     // isActive: data[0].isActive,
                    //     //active: data[0].active
                    // })
                    setEditVisible(false);
                    setCloneSave(true);
                }
                else {
                    setFields(data);
                    setAddTnamodels({
                        id: 0,
                        buyCode: data[0].buyCode,
                        buydivCode: data[0].buydivCode,
                        deptcode: data[0].deptcode,
                        locCode: data[0].locCode,
                        activityType: data[0].activityType,
                        mActive: data[0].mActive,
                        stage: "",
                        orderCategory: "",
                        fit: "",
                        actCode: 0,
                        activity: "",
                        subActivity: "",
                        criticalActivity: "",
                        tnaSeqNo: 0,
                        duration: 0,
                        dependActCode: 0,
                        dependDeptCode: "",
                        dependActvity: "",
                        dependSubActvity: "",
                        preNotifyDays: 0,
                        notifyRoleId: "",
                        l1EscalateDays: 0,
                        l1EscalateRole: "",
                        l2EscalateDays: 0,
                        l2EscalateRole: "",
                        category: "NA",
                        valueAddtype: "",
                        weightage: 0,
                        skipped: "N",
                        remarks: "",
                        cancel: "N",
                        active: 'Y',
                        hostName: "",
                        createdDate: "2022-08-22",
                        createdBy: "AD",
                        modifiedDate: "2022-08-22",
                        modifiedBy: "",
                        isActive: false
                    })
                    setEditVisible(true);
                    GetdependActCodeDropDown(data[0].buyCode, data[0].buydivCode, data[0].deptcode, data[0].locCode, data[0].activityType);

                }

            }


            // const tableId = type === 'clone' ? 0 : 0

            // setAddTnamodels({
            //     // id: tableId,                    
            //     buyCode: data.buyCode,
            //     buydivCode: data.buydivCode,
            //     locCode: data.locCode,
            //     deptcode: data.deptcode,
            //     activityType: data.activityType,
            //     address3: data.address3,
            //     city: data.city,
            //     pinCode: data.pinCode,
            //     country: data.country,
            //     emailId: data.emailId,
            //     contPerson1: data.contPerson1,
            //     contPerson2: data.contPerson2,
            //     contNo: data.contNo,
            //     imageFileName: data.imageFileName,
            //     active: data.active
            // })
            //GetdependActCodeDropDown(data[0].activityType);
            setLoader(false)

        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    }

    console.log(fields)

    return (
        <>


            {showResults &&
                <div className='defect-master-main'>
                    <div className='m-3'>
                        <h6 className='m-0 p-0'>{name}</h6>

                        <div className='row align-items-center mt-2'>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mt-1'>
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                                <button className='btn-sm btn defect-master-add' onClick={onClick} onClose={onClose} visible={visible} maskClosable={false}> + Add New </button>
                            </div>
                        </div>
                    </div>

                    <div>
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
                    </div>}

                    {/* Add */}
                    {/* <Drawer footer={
                <>
                    <div>
                        {
                            !loader ?
                                <button disabled={loader} className='btn-sm btn defect-master-save mt-1 w-100' onClick={save}> {fields.id === 0 ? "Save" : "Update"} </button>
                                : (
                                    <div className="text-center">
                                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                                    </div>
                                )
                        }
                    </div>
                    <div>
                        <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={(e) => {
                            let _id = Number(fields.id)
                            if(_id === 0)add()
                            else edit(_id)
                        }}> Cancel </button>
                    </div>
                </>
            } title={< h6 className='m-0' > {`${fields.id === 0 ? "Add New" : "Edit"} Buyer`}</h6 >} placement="right" onClose={() => {
                clearFields();
                onClose();
            }} visible={visible} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Buy Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.buyCode === '' ? errors.buyCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Buy Code'
                               value={fields.buyCode} minLength="1" maxLength="10"
                               onChange={inputOnChange("buyCode")}                            
                        />
                    </div>
                             
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Buy Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.buyName === '' ? errors.buyName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Buy Name'
                               value={fields.buyName} minLength="1" maxLength="10"
                               onChange={inputOnChange("buyName")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>buyType <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.buyType === '' ? errors.buyType : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter buyType'
                               value={fields.buyType} minLength="1" maxLength="10"
                               onChange={inputOnChange("address1")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>address1 <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.address1 === '' ? errors.address1 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter address1'
                               value={fields.address1} minLength="1" maxLength="10"
                               onChange={inputOnChange("address1")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>address2 <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.address2 === '' ? errors.address2 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter address2'
                               value={fields.address2} minLength="1" maxLength="10"
                               onChange={inputOnChange("address2")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>address3 </label>
                            <small className='text-danger'>{errors.address3 ? errors.address3 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter address3'
                               value={fields.address3} minLength="1" maxLength="10"
                               onChange={inputOnChange("address3")}                            
                        />
                    </div>      

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>city </label>
                            <small className='text-danger'>{errors.city ? errors.city : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter city'
                               value={fields.city} minLength="1" maxLength="15"
                               onChange={inputOnChange("city")}                            
                        />
                    </div>           
           
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>pinCode </label>
                            <small className='text-danger'>{errors.pinCode ? errors.pinCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter pinCode'
                               value={fields.pinCode} minLength="1" maxLength="5"
                               onChange={inputOnChange("pinCode")}                            
                        />
                    </div>     

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>country <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.country === '' ? errors.country : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter country'
                               value={fields.country} minLength="1" maxLength="10"
                               onChange={inputOnChange("country")}                            
                        />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>emailId <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.emailId === '' ? errors.emailId : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter emailId'
                               value={fields.emailId} minLength="1" maxLength="50"
                               onChange={inputOnChange("emailId")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>contPerson1 <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.contPerson1 === '' ? errors.contPerson1 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter contPerson1'
                               value={fields.contPerson1} minLength="1" maxLength="10"
                               onChange={inputOnChange("contPerson1")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>contPerson2 </label>
                            <small className='text-danger'>{errors.contPerson2 ? errors.contPerson2 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter contPerson2'
                               value={fields.contPerson2} minLength="1" maxLength="10"
                               onChange={inputOnChange("contPerson2")}                            
                        />
                    </div>      

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>contNo </label>
                            <small className='text-danger'>{errors.contNo ? errors.contNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter contNo'
                               value={fields.contNo} minLength="1" maxLength="15"
                               onChange={inputOnChange("contNo")}                            
                        />
                    </div>           
           
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>imageFileName </label>
                            <small className='text-danger'>{errors.imageFileName ? errors.imageFileName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter imageFileName'
                               value={fields.imageFileName} minLength="1" maxLength="5"
                               onChange={inputOnChange("imageFileName")}                            
                        />
                    </div>   

                    <div className='mt-3'>
                        <label>{fields.active === 'Y' ? 'Active' : 'In Active'}</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                    checked={fields.active === 'Y'}
                                    onChange={(e) => setFields({ ...fields, active: e ? 'Y' : 'N' })} />
                        </div>
                    </div>
                </div>
            </Drawer> */}
                </div >
            }
            {showForm &&
                <div class="container-fluid">
                    {/* <!-- breadcrumb --> */}
                    <div class="breadcrumb-header justify-content-between bread-list">
                        <div class="w-100">
                            <div class="d-flex border-bottom pb-15">
                                <div class="me-auto ">
                                    <a href="#myCollapse" data-bs-toggle="collapse" aria-expanded="true" class="text-black">
                                        <h4 class="content-title float-start pr-20 border-0"><span class="pr-10"><img
                                            src={breadcrumbIcon} alt="" /></span> Header</h4>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- breadcrumb -->
        <!-- row opened--> */}
                    <div class="clear"></div>
                    <div class="row mt-15 dis-sel mt-20">
                        <div class="col-lg-2">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Buyer <span className='text-danger'>*  </span> </label>

                            </div>
                            <select disabled={EditVisible} className='form-control form-control-sm mt-1' id="buyer-code" value={AddTnamodels.buyCode} onChange={inputOnChange("buyCode")} required>
                                <option value="" hidden>Select Buyer Code</option>
                                {
                                    buyerList.filter(f => f.active == "Y").map((t, ind) => (
                                        <option key={ind} value={t.buyCode}>{t.buyCode}</option>
                                    ))
                                }
                            </select>
                            <small className='text-danger'>{AddTnamodels.buyCode === '' ? errors.buyCode : ''}</small>
                        </div>
                        <div class="col-lg-2">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Buyer Division<span className='text-danger'>*  </span> </label>
                            </div>
                            <select disabled={EditVisible} className='form-control form-control-sm mt-1' id="buyer-div-code" value={AddTnamodels.buydivCode} onChange={inputOnChange("buydivCode")} required>
                                <option value="" hidden>Select Buyer Division</option>
                                {
                                    buyerDivisionList.map((t, ind) => (
                                        <option key={ind} value={t.buyDivCode}>{t.buyDivCode}</option>
                                    ))
                                }
                            </select>
                            <small className='text-danger'>{AddTnamodels.buydivCode === '' ? errors.buydivCode : ''}</small>
                        </div>
                        <div class="col-lg-2">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Department<span className='text-danger'>*  </span> </label>

                            </div>
                            <select disabled={EditVisible} className='form-select form-select-sm mt-1' required
                                value={AddTnamodels.deptcode}
                                onChange={inputOnChange("deptcode")} >
                                <option value=""> Select Department</option>
                                {departmentList.map((v, index) => {
                                    return <option key={index} value={v.code}>{v.codeDesc}</option>
                                })}
                            </select>
                            <small className='text-danger'>{AddTnamodels.deptcode === '' ? errors.deptcode : ''}</small>
                        </div>
                        <div class="col-lg-2">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Location<span className='text-danger'>*  </span> </label>

                            </div>
                            <select disabled={EditVisible} className='form-select form-select-sm mt-1' required
                                value={AddTnamodels.locCode}
                                onChange={inputOnChange("locCode")}>
                                <option value=""> Select Location</option>
                                {locationName.map((v, index) => {
                                    return <option key={index} value={v.locCode}>{v.locName}</option>
                                })}
                            </select>
                            <small className='text-danger'>{AddTnamodels.locCode === '' ? errors.locCode : ''}</small>
                        </div>
                        <div class="col-lg-2">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Activity Type<span className='text-danger'>*  </span> </label>

                            </div>
                            <select disabled={EditVisible} className='form-select form-select-sm mt-1' required
                                value={AddTnamodels.activityType}
                                onChange={inputOnChange("activityType")} >
                                <option value=""> Select activityType</option>
                                {activityList.map((v, index) => {
                                    return <option key={index} value={v.code}>{v.codeDesc}</option>
                                })}
                            </select>
                            <small className='text-danger'>{AddTnamodels.activityType === '' ? errors.activityType : ''}</small>
                        </div>
                        {/* <div class="col-lg-2">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>M.Active<span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{AddTnamodels.mActive === '' ? errors.mActive : ''}</small>
                            </div>
                            <Checkbox color="primary" onChange={handleChangesingledropdown('mActive')} />
                          
                        </div> */}
                        {/* <FormControlLabel control={<Checkbox color="primary" checked={(this.mActive == "Y" ? true : false)} onChange={this.handleChangesingledropdown('mActive')} value={(this.mActive == "Y" ? "Y" : "N")} />} label="mActive" /> */}

                        <div className='col-lg-2'>
                            <label>{AddTnamodels.mActive === 'Y' ? 'M.Active' : 'M.Active'}</label>
                            <div className='mt-1'>
                                <Switch size='default'
                                    checked={AddTnamodels.mActive === 'Y'}
                                    onChange={(e) => setAddTnamodels({ ...AddTnamodels, mActive: e ? 'Y' : 'N' })} />
                            </div>
                        </div>
                        {/* <div className='col-lg-2'>
                            <label>{fields.mActive === 'Y' ? 'Active' : 'In Active'}</label>
                            <div className='mt-1'>
                                <Switch size='default'
                                    checked={fields.mActive === 'Y'}
                                    onChange={(e) => setFields({ ...fields, mActive: e ? 'Y' : 'N' })} />
                            </div>
                        </div> */}
                    </div>

                    {/* <div class="breadcrumb-header justify-content-between bread-list">
                        <div class="w-100">
                            <div class="d-flex border-bottom pb-15">
                                <div class="me-auto ">
                                    <a href="#myCollapse" data-bs-toggle="collapse" aria-expanded="true" class="text-black">
                                        <h6 class="content-title float-start pr-20 border-0"><span class="pr-10"><img
                                            src={breadcrumbIcon} alt="" /></span> Sub - Header</h6>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div> */}


                    <div class="row mt-25 main-tab pl-15 pr-15">
                        <ul class="nav nav-tabs p-25 pl-25" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                    type="button" role="tab" aria-controls="home" aria-selected="true">Sub Header</button>
                            </li>
                        </ul>
                        <div class="row mt-15 dis-sel mt-20">
                            <div class="col-lg-6">
                                <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                    <label>Stage<span className='text-danger'>  </span> </label>
                                    <small className='text-danger'>{AddTnamodels.stage === '' ? errors.stage : ''}</small>
                                </div>
                                <select className='form-select form-select-sm mt-1' required
                                    value={AddTnamodels.stage} disabled={packQtyvisible}
                                    onChange={inputOnChange("stage")} >
                                    <option value=""> Select Stage</option>
                                    {StageList.map((v, index) => {
                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                    })}
                                </select>
                            </div>
                            <div class="col-lg-6">
                                <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                    <label>Order Category<span className='text-danger'>  </span> </label>
                                    <small className='text-danger'>{AddTnamodels.orderCategory === '' ? errors.orderCategory : ''}</small>
                                </div>
                                <select className='form-select form-select-sm mt-1' required
                                    value={AddTnamodels.orderCategory} disabled={OGvisible}
                                    onChange={inputOnChange("orderCategory")} >
                                    <option value=""> Select orderCategory</option>
                                    {orderCatList.map((v, index) => {
                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <ul class="nav nav-tabs p-15 pl-15" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                    type="button" role="tab" aria-controls="home" aria-selected="true">Activity </button>
                            </li>
                        </ul>
                        <div class="tab-content p-15 mb-80" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div class="row mt-15">
                                    <div class="col-lg-3">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Activity<span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.activity === '' ? errors.activity : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Activity'
                                            value={AddTnamodels.activity} minLength="1" maxLength="100"
                                            onChange={inputOnChange("activity")}
                                        />
                                    </div>
                                    <div class="col-lg-2">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Sub Activity<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.subActivity === '' ? errors.subActivity : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Sub Activity'
                                            value={AddTnamodels.subActivity} minLength="1" maxLength="100"
                                            disabled={packQtyvisible}
                                            onChange={inputOnChange("subActivity")}
                                        />
                                    </div>
                                    <div class="col-lg-2">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Days<span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{errors.duration === '' ? errors.duration : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Days'
                                            value={AddTnamodels.duration} minLength="1" maxLength="3"
                                            onChange={inputOnChange("duration")}
                                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("duration")}
                                            onBlur={NUMBER_IS_FOCUS_OUT_ZERO("duration")}
                                        />
                                    </div>
                                    <div class="col-lg-2">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Weightage<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{errors.weightage === '' ? errors.weightage : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter weightage'
                                            value={AddTnamodels.weightage} minLength="1" maxLength="3"
                                            disabled={packQtyvisible}
                                            onChange={inputOnChange("weightage")}
                                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("weightage")}
                                            onBlur={NUMBER_IS_FOCUS_OUT_ZERO("weightage")}
                                        />
                                    </div>
                                    <div class="col-lg-3">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Depend ActCode<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.dependActCode === '' ? errors.dependActCode : ''}</small>
                                        </div>
                                        <select className='form-control form-control-sm mt-1' disabled={packQtyvisible} id="dependActCode" value={AddTnamodels.dependActCode} onChange={inputOnChange("dependActCode")} required>
                                            {/* <option value="" hidden> Select Depend Code</option>
                                            {
                                                dependActCodeList.map((t, ind) => (
                                                    <option key={ind} value={t}>{t}</option>
                                                ))
                                            } */}
                                            <option value="0">0 </option>
                                            {dependActCodeList.map((v, index) => {

                                                return <option key={index} value={v}>{v}</option>

                                            })}
                                        </select>
                                        {/* <input className='form-control form-control-sm mt-1' placeholder='Enter dependActCode'
                                            value={AddTnamodels.dependActCode} minLength="1" maxLength="15"
                                            onChange={inputOnChange("dependActCode")}
                                        /> */}
                                    </div>
                                    <div class="col-lg-3">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Depend DeptCode<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.dependDeptCode === '' ? errors.dependDeptCode : ''}</small>
                                        </div>
                                        <select className='form-select form-select-sm mt-1' required
                                            value={AddTnamodels.dependDeptCode}
                                            disabled={packQtyvisible}
                                            onChange={inputOnChange("dependDeptCode")} >
                                            <option value="">Select Department Code</option>
                                            {departmentList.map((v, index) => {
                                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div class="col-lg-2">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Depend Actvity<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.dependActvity === '' ? errors.dependActvity : ''}</small>
                                        </div>
                                        <select className='form-control form-control-sm mt-1' id="dependActvity" disabled={packQtyvisible} value={AddTnamodels.dependActvity} onChange={inputOnChange("dependActvity")} required>
                                            <option value="" hidden>Select Depend Actvity</option>
                                            {
                                                dependActivityList.map((t, ind) => (
                                                    <option key={ind} value={t.activity}>{t.activity}</option>
                                                ))
                                            }
                                        </select>
                                        {/* <input className='form-control form-control-sm mt-1' placeholder='Enter dependActvity' disabled={packQtyvisible}
                                            value={AddTnamodels.dependActvity} minLength="1" maxLength="100"
                                            onChange={inputOnChange("dependActvity")}
                                        /> */}
                                    </div>
                                    <div class="col-lg-2">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Depend SubActvity<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.dependSubActvity === '' ? errors.dependSubActvity : ''}</small>
                                        </div>
                                        <select className='form-control form-control-sm mt-1' id="dependSubActvity" disabled={packQtyvisible} value={AddTnamodels.dependSubActvity} onChange={inputOnChange("dependSubActvity")} required>
                                            <option value="" hidden>Select Depend SubActvity</option>
                                            {
                                                dependSubActivityList.map((t, ind) => (
                                                    <option key={ind} value={t.subActivity}>{t.subActivity}</option>
                                                ))
                                            }
                                        </select>
                                        {/* <input className='form-control form-control-sm mt-1' placeholder='Enter dependSubActvity' disabled={packQtyvisible}
                                            value={AddTnamodels.dependSubActvity} minLength="1" maxLength="100"
                                            onChange={inputOnChange("dependSubActvity")}
                                        /> */}
                                    </div>
                                    <div class="col-lg-2">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Fit<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.fit === '' ? errors.fit : ''}</small>
                                        </div>
                                        <select className='form-select form-select-sm mt-1' required
                                            value={AddTnamodels.fit}
                                            disabled={packQtyvisible}
                                            onChange={inputOnChange("fit")} >
                                            <option value=""> Select Fit</option>
                                            {fitList.map((v, index) => {
                                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                                            })}
                                        </select>
                                    </div>
                                    {/* <div class="col-lg-2">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between' >
                                            <label>skipped<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.skipped === '' ? errors.skipped : ''}</small>
                                        </div>
                                        <Checkbox color="primary" disabled={packQtyvisible} onChange={handleChangesingledropdown('skipped')} />

                                       
                                    </div> */}
                                    {/* <Checkbox color="primary" disabled={packQtyvisible} onClick={(e) => this.handleChangecheckboxall(e)} title={"select all buyer"} /> */}
                                    <div className='col-lg-2'>
                                        <label>{AddTnamodels.skipped === 'Y' ? 'Skipped' : 'Skipped'}</label>
                                        <div className='mt-1'>
                                            <Switch size='default'
                                                checked={AddTnamodels.skipped === 'Y'} disabled={packQtyvisible}
                                                onChange={(e) => setAddTnamodels({ ...AddTnamodels, skipped: e ? 'Y' : 'N' })} />
                                        </div>
                                    </div>

                                    {/* <div class="col-lg-3">
                            <label>Country</label>
                            <small className='text-danger'>{fields.country === '' ? errors.country : ''}</small>
                            <input type="text" class="form-control" placeholder="Country"/>
                        </div> */}

                                    {/* <div class="col-lg-3">
                                        <label>Country</label>
                                        <small className='text-danger'>{fields.country === '' ? errors.country : ''}</small>
                                        <div class="main-select">
                                            <select name="somename" class="form-control SlectBox main-select"
                                                required
                                                value={fields.country}
                                                onChange={inputOnChange("country")}
                                            >
                                                <option value=""> Select country</option>
                                                {countryList.map((v, index) => {
                                                    return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                })}

                                            </select>
                                        </div>
                                    </div> */}


                                    {/* <div class="col-lg-3">
                            <label>Enterprise</label>
                            <small className='text-danger'>{fields.enterprise === '' ? errors.enterprise : ''}</small>
                            <div class="main-select">
                            <select name="somename" class="form-control SlectBox main-select"
                            required
                            value={fields.enterprise}
                            onChange={inputOnChange("enterprise")}                
                            >
                            <option value=""> Select Enter prise</option>
                            <option data-group="M" value="NA">NA</option>
                            <option data-group="M" value="A-MICRO">A-MICRO</option>
                            <option data-group="M" value="B-SMALL">B-SMALL</option>
                            <option data-group="M" value="C-MEDIUM">C-MEDIUM</option>
                            <option data-group="S" value="NA">NA</option>
                            <option data-group="S" value="D-MICRO">D-MICRO</option>
                            <option data-group="S" value="E-SMALL">E-SMALL</option>
                            <option data-group="S" value="F-MEDIUM">F-MEDIUM</option>
                        </select>
                        </div>
                        </div> */}

                                </div>
                                <div class="row mt-15">
                                    <div class="col-lg-3">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Value Addtype<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.valueAddtype === '' ? errors.valueAddtype : ''}</small>
                                        </div>
                                        <select className='form-select form-select-sm mt-1' required
                                            value={AddTnamodels.valueAddtype}
                                            disabled={packQtyvisible}
                                            onChange={inputOnChange("valueAddtype")} >
                                            <option value=""> Select VAType</option>
                                            {valueaddList.map((v, index) => {
                                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                                            })}
                                        </select>
                                        {/* <input className='form-control form-control-sm mt-1' placeholder='Enter valueAddtype'
                                            value={fields.valueAddtype} minLength="1" maxLength="100"
                                            onChange={inputOnChange("valueAddtype")}
                                        /> */}
                                    </div>
                                    <div class="col-lg-2">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Key Activity<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.criticalActivity === '' ? errors.criticalActivity : ''}</small>
                                        </div>

                                        <select name="criticalActivity" className="form-select form-select-sm mt-1"
                                            required
                                            disabled={buyerTypeVisible}
                                            value={AddTnamodels.criticalActivity}
                                            onChange={inputOnChange("criticalActivity")}
                                        >
                                            <option value=""> Select Key Activity</option>
                                            <option data-group="Y" value="Y">Y</option>
                                            <option data-group="N" value="N">N</option>
                                        </select>
                                        {/* <inp    ut className='form-control form-control-sm mt-1' placeholder='Enter criticalActivity'
                                            value={fields.criticalActivity} minLength="1" maxLength="100"
                                            onChange={inputOnChange("criticalActivity")}
                                        /> */}
                                    </div>
                                    <div class="col-lg-4">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Remarks<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.remarks === '' ? errors.remarks : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter remarks'
                                            value={AddTnamodels.remarks} minLength="1" maxLength="100"
                                            onChange={inputOnChange("remarks")}
                                        />
                                    </div>

                                </div>
                                <ul class="nav nav-tabs p-15 pl-15" id="myTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                            type="button" role="tab" aria-controls="home" aria-selected="true">Notification TimeLine </button>
                                    </li>
                                </ul>
                                <div class="row mt-15">
                                    <div class="col-lg-3">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>PreNotify Days<span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{errors.preNotifyDays === '' ? errors.preNotifyDays : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter preNotifyDays'
                                            value={AddTnamodels.preNotifyDays} minLength="1" maxLength="2"
                                            onChange={inputOnChange("preNotifyDays")}
                                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("preNotifyDays")}
                                            onBlur={NUMBER_IS_FOCUS_OUT_ZERO("preNotifyDays")}
                                        />
                                    </div>
                                    <div class="col-lg-3">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Notify Role<span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.notifyRoleId === '' ? errors.notifyRoleId : ''}</small>
                                        </div>
                                        <select className='form-select form-select-sm mt-1' required
                                            value={AddTnamodels.notifyRoleId}
                                            onChange={inputOnChange("notifyRoleId")} >
                                            <option value=""> Select PreNotify Role</option>
                                            {deptList.map((v, index) => {
                                                return <option key={index} value={v.code}>{v.code}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div class="col-lg-2">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>L1Escalate Days<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{errors.l1EscalateDays === '' ? errors.l1EscalateDays : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter l1EscalateDays'
                                            value={AddTnamodels.l1EscalateDays} minLength="1" maxLength="1"
                                            onChange={inputOnChange("l1EscalateDays")}
                                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("l1EscalateDays")}
                                            onBlur={NUMBER_IS_FOCUS_OUT_ZERO("l1EscalateDays")}
                                        />
                                    </div>
                                    <div class="col-lg-2">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>L1Escalate Role<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.l1EscalateRole === '' ? errors.l1EscalateRole : ''}</small>
                                        </div>
                                        <select className='form-select form-select-sm mt-1' required
                                            value={AddTnamodels.l1EscalateRole}
                                            onChange={inputOnChange("l1EscalateRole")} >
                                            <option value=""> Select L1 Role</option>
                                            {deptList.map((v, index) => {
                                                return <option key={index} value={v.code}>{v.code}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div class="col-lg-2">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>L2Escalate Days<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{errors.l2EscalateDays === '' ? errors.l2EscalateDays : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter l2EscalateDays'
                                            value={AddTnamodels.l2EscalateDays} minLength="1" maxLength="1"
                                            onChange={inputOnChange("l2EscalateDays")}
                                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("l2EscalateDays")}
                                            onBlur={NUMBER_IS_FOCUS_OUT_ZERO("l2EscalateDays")}
                                        />
                                    </div>
                                    <div class="col-lg-3">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>L2Escalate Role<span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.l2EscalateRole === '' ? errors.l2EscalateRole : ''}</small>
                                        </div>
                                        <select mode="multiple" className='form-select form-select-sm mt-1' required
                                            value={AddTnamodels.l2EscalateRole}
                                            onChange={inputOnChange("l2EscalateRole")} >
                                            <option value=""> Select L2 Role</option>
                                            {deptList.map((v, index) => {
                                                return <option key={index} value={v.code}>{v.code}</option>
                                            })}
                                        </select>
                                    </div>

                                    {/* <div class="col-lg-3">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Active<span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.active === '' ? errors.active : ''}</small>
                                        </div>
                                        <Checkbox color="primary" onChange={handleChangesingledropdown('active')} />

                                      
                                    </div> */}
                                    {/* <Checkbox color="primary" onClick={(e) => this.handleChangecheckboxall(e)} title={"select Active"} /> */}
                                    <div className='col-lg-3'>
                                        <label>{AddTnamodels.active === 'Y' ? 'Active' : 'In Active'}</label>
                                        <div className='mt-1'>
                                            <Switch size='default'
                                                checked={AddTnamodels.active === 'Y'}
                                                onChange={(e) => setAddTnamodels({ ...AddTnamodels, active: e ? 'Y' : 'N' })} />
                                        </div>
                                    </div>
                                    {/* <div className="w-50 float-right pr-0 but-tp">
                                    <Form>
                                        {(() => {

                                            if (this.state.edit_add == false) {
                                                return (
                                                    <button className="col-sm-2 col-md-2 col-xl-2 p-0 defect-master-add" type="button" onClick={(e) => this.getMenusave()} ><span className="MuiButton-label">save <i className="zmdi zmdi-save"></i></span><span className="MuiTouchRipple-root"></span></button>
                                                )
                                            }
                                            if (this.state.edit_add != false) {
                                                return (<button className="col-sm-2 col-md-2 col-xl-2 p-0 defect-master-add" type="button" onClick={(e) => this.getMenuUpdate()} ><span className="MuiButton-label">Update <i className="zmdi zmdi-save"></i></span><span className="MuiTouchRipple-root"></span></button>
                                                )
                                            }
                                        })()}
                                        <button className="col-sm-2 col-md-2 col-xl-2 p-0 defect-master-add" type="button" onClick={(e) => this.getCancel()}><span className="MuiButton-label">Cancel <i className="zmdi zmdi-close"></i></span><span className="MuiTouchRipple-root"></span></button>
                                    </Form>
                                </div> */}
                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>  <span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.l2EscalateRole === '' ? errors.l2EscalateRole : ''}</small>
                                        </div>
                                        <div></div>
                                        <button class="btn btn-primary search-btn btn-block ml-10" onClick={close}>Back</button>
                                    </div>
                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label><span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.l2EscalateRole === '' ? errors.l2EscalateRole : ''}</small>
                                        </div>
                                        <div class="clear"></div>
                                        {/* <button type="button" className='btn-sm btn defect-master-save mt-1' onClick={(e) => ClearDetails()}>Clear</button> */}
                                        {showAddtolist && <button type="button" className='btn-sm btn defect-master-save mt-1' onClick={(e) => AddTna()}>Add To List</button>}
                                        {showUpdatetolist && <button disabled={loader} className='btn-sm btn defect-master-save mt-1' onClick={(e) => AddTna()}> Update To List</button>}
                                        {/* <button disabled={loader} className='btn-sm btn defect-master-save mt-1 ' onClick={save}> {fields.id === 0 ? "Save" : "Update"} </button> */}

                                    </div>
                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label><span className='text-danger'>  </span> </label>
                                            <small className='text-danger'>{AddTnamodels.l2EscalateRole === '' ? errors.l2EscalateRole : ''}</small>
                                        </div>
                                        <div class="clear"></div>
                                        {/* <button type="button" className='btn-sm btn defect-master-save mt-1' onClick={(e) => AddTna()}>Add</button> */}
                                        <button className='btn-sm btn defect-master-save mt-1 ' onClick={save}> Save </button>

                                        {/* <button type="button" className="col-sm-1 col-md-1 float-left col-xl-1 p-0 defect-master-add" onClick={(e) => this.sampleaddmoresave()}></button>  {AddTnamodels.id === 0 ? "Save" : "Update"}*/}

                                    </div>

                                </div>

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
                                                <th class="">SLNO</th>
                                                <th class="">STAGE</th>
                                                <th class="">ORDER CATEGORY</th>
                                                {/* <th class="">ACT TYPE</th>
                                                <th>LOCATION</th> */}
                                                <th>FIT	</th>
                                                <th>ACTIVITY</th>
                                                <th>SUB ACTIVITY</th>
                                                <th>KEY ACTIVITY</th>
                                                <th>TIMELINE DAYS</th>
                                                <th>WEIGHTAGE</th>
                                                <th class="">DPNDCODE</th>
                                                <th class="">DPNDDEPT</th>
                                                <th class="">DPNDONACT</th>
                                                <th class="">DPNDONS.ACT</th>
                                                <th>PRE NOTIFY DAYS</th>
                                                <th>NOTIFY ROLE	</th>
                                                <th>ESCALATION TIMELINE</th>
                                                <th>ESCALATION ROLE</th>
                                                <th>L2 ESCALATION TIMELINE</th>
                                                <th>L2 ESCALATION ROLE</th>
                                                <th>VALUEADD TYPE</th>
                                                <th>ACTIVE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* if(visible=="True") */}
                                            {

                                                fields.map((row, index) => (
                                                    <tr key={index}>
                                                        <td align='center'>
                                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                                <div className='text-center' onClick={() => { editRow(row?.id) }}>
                                                                    <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                                                </div>
                                                                {/* <div onClick={() => edit(value, 'clone')}>
                                                                    <FontAwesomeIcon icon={faCopy} color="#919191" />
                                                                </div> */}
                                                            </div>
                                                        </td>
                                                        <td align='center'> {index + 1} </td>
                                                        <td align='center'>{row.stage}</td>
                                                        <td align='center'>{row.orderCategory}</td>
                                                        {/* <td align='center'>{row.activityType}</td>
                                                        <td align='center'>{row.locCode}</td> */}
                                                        <td align='center'>{row.fit}</td>
                                                        <td align='center'>{row.activity}</td>
                                                        <td align='center'>{row.subActivity}</td>
                                                        <td align='center'>{row.criticalActivity}</td>
                                                        <td align='center'>{row.duration}</td>
                                                        <td align='center'>{row.weightage}</td>
                                                        <td align='center'>{row.dependActCode}</td>
                                                        <td align='center'>{row.dependDeptCode}</td>
                                                        <td align='center'>{row.dependActvity}</td>
                                                        <td align='center'>{row.dependSubActvity}</td>
                                                        <td align='center'>{row.preNotifyDays}</td>
                                                        <td align='center'>{row.notifyRoleId}</td>
                                                        <td align='center'>{row.l1EscalateDays}</td>
                                                        <td align='center'>{row.l1EscalateRole}</td>
                                                        <td align='center'>{row.l2EscalateDays}</td>
                                                        <td align='center'>{row.l2EscalateRole}</td>
                                                        <td align='center'>{row.valueAddtype}</td>
                                                        <td align='center'>{row.active}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <!--row closed--> */}
                </div>
            }


        </>
    )
}

TNAMaster.propTypes = {
    name: PropTypes.string
}

export default TNAMaster;