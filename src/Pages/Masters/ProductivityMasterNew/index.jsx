import React, { useState, useEffect } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Drawer, Switch, Pagination, Spin, message, Tag, Radio } from 'antd';
import breadcrumbIcon from '../../../Assets/images/style/bred-icon.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { ItrApiService } from '@afiplfeed/itr-ui';
import PropTypes, { number } from 'prop-types';
import ApiCall from "../../../services";
import { API_URLS, MISCELLANEOUS_TYPES } from "../../../constants/api_url_constants";
import CustomTableContainer from "../../../components/Table/alter/AlterMIUITable";
import { Construction, Deblur } from '@mui/icons-material';
import { findDOMNode } from 'react-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Col, FormFeedback } from 'reactstrap';
import { filledInputClasses } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';

import ms from 'ms';


const requiredFields = ["locCode", "factCode", "productType", "startdate", "enddate"],
    addReq = ["scaleUpDay"],
    initialErrorMessages = {
        id: 0,
        locCode: "",
        factCode: "",
        lineGroup: "",
        productType: "",
        subProductType: "",
        noOfOperators: 0,
        plaidType: "NA",
        difficultyLevel: "",
        workingHrs: 0,
        scaleUpDay: 0,
        scaleUpEffPer: 0,
        peakEff: "N",
        startdate: Date.UTC,
        enddate: Date.UTC,
        createdDate: "2022-08-17T09:51:51.057Z",
        createdBy: "",
        modifiedDate: "2022-08-17T09:51:51.057Z",
        modifiedBy: "",
        hostName: "",

    },
    initialFieldValues = {
        id: 0,
        locCode: "",
        factCode: "",
        lineGroup: "",
        productType: "",
        subProductType: "",
        noOfOperators: "",
        plaidType: "NA",
        difficultyLevel: "",
        workingHrs: 0,
        scaleUpDay: 0,
        scaleUpEffPer: 0,
        peakEff: "N",
        startdate: "",//moment().format('YYYY-MM-DD'),
        enddate: "",
        createdDate: "2022-08-17T09:51:51.057Z",
        createdBy: "",
        modifiedDate: "2022-08-17T09:51:51.057Z",
        modifiedBy: "",
        hostName: "",
    },
    Test = {
        id: 0,
        locCodel: "",
        factCodel: "",
        lineGroupl: "",
    }

export default function ProductivityMasters() {
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    })
    const [fields, setFields] = useState({
        ...initialFieldValues
    });

    const [Prodfields, setProdFields] = useState({
        ...Test
    });

    const [LocationList, setLocationList] = useState([]);
    const [LocationList1, setLocationList1] = useState([]);
    const [Factoryist, setFactoryList] = useState([]);
    const [Factoryist1, setFactoryList1] = useState([]);
    const [OperatorList, setOperatorList] = useState([]);
    const [OperatorList1, setOperatorList1] = useState([]);

    const [OperatorListNew, setOperatorNewList] = useState([]);
    const [WorkingHrsList, setWorkingHrsList] = useState([]);
    const [ProductTypeList, setProductTypeList] = useState([]);
    const [FabTypeList, setFabTypeList] = useState([]);
    const [DifficultyLevelList, setDifficultyLevelList] = useState([]);
    const [selected, setselected] = useState(true);
    const [ProductivityList, setProductivityList] = useState([]);

    const [ProductivityListTemp, setProductivityListTemp] = useState([]);

    const [btnVisible, setBtnVisible] = useState(false);
    const [AddbtnVisible, setAddBtnVisible] = useState(false);
    const [btnSaveVisible, setBtnSaveVisible] = useState(false);
    const [backBtnVisible, setbackBtnVisible] = useState(false);
    const [viewBtnVisible, setviewBtnVisible] = useState(false);


    const [headerFleids, setheaderFleids] = useState(false);

    const [listLoading, setListLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [showResults, setShowResults] = React.useState(true);
    const [showForm, setShowForm] = React.useState(false);

    const minsec = ms('14d')



    const [minDate, setMinDate] = useState(null)
    const [maxDate, setMaxDate] = useState(null)



    useEffect(() => {
        getLocation();
        getProductType();
        getFabType();
        getDifficultyLevel();
        disableDate();
        getLocationList();
    }, []);

    useEffect(() => {
        if (fields.locCode) {
            getFactoryDropDown()
        }
    }, [fields.locCode])

    useEffect(() => {
        if (Prodfields.locCodel) {
            getFactoryDropDownList()
        }
    }, [Prodfields.locCodel])



    useEffect(() => {
        if (fields.factCode) {
            factCodeChangeHandle()
        }
    }, [fields.factCode])

    useEffect(() => {
        if (Prodfields.factCodel) {
            factCodeChangeHandleList()
        }
    }, [Prodfields.factCodel])

    useEffect(() => {
        if (fields.lineGroup) {
            lineGroupChangeHandle()

        }
    }, [fields.lineGroup])

    useEffect(() => {
        if (fields.noOfOperators) {
            OperatorsChangeHandle()
        }
    }, [fields.noOfOperators])



    const getLocation = () => {
        ApiCall({
            path: API_URLS.GET_LOCATION_MASTER_LIST
        }).then(response => {

            if (Array.isArray(response.data)) {
                setLocationList(response.data.filter(d => d.active == "Y"))
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }
    const getLocationList = () => {
        ApiCall({
            path: API_URLS.GET_LOCATION_MASTER_LIST
        }).then(response => {

            if (Array.isArray(response.data)) {
                setLocationList1(response.data.filter(d => d.active == "Y"))
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getProductType = () => {
        ApiCall({
            path: API_URLS.GET_PRODUCTTYPE_MASTER_LIST
        }).then(response => {

            if (Array.isArray(response.data)) {
                setProductTypeList(response.data.filter(d => d.active == "Y"))
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getFabType = () => {

        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.FABTYPE
        }).then(response => {

            //   console.log(response.data)
            try {
                setFabTypeList(response.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }

        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getDifficultyLevel = () => {

        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.DLEVEL
        }).then(response => {

            //    console.log(response.data)
            try {
                setDifficultyLevelList(response.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }

        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getFactoryDropDown = () => {
        setFields({ ...fields, factCode: fields.id == 0 ? "" : fields.factCode })
        if (fields.locCode) {
            ApiCall({
                path: API_URLS.GET_UNIT_MASTER_LIST
            }).then(resp => {
                try {
                    setFactoryList(resp.data.filter(f => f.loccode == fields.locCode))
                } catch (er) {
                    message.error("Response data is not as expected")
                }
            })
                .catch(err => {
                    message.error(err.message || err)
                })
        } else {
            setFactoryList([])
        }
    }

    const getFactoryDropDownList = () => {
        setProdFields({ ...Prodfields, factCodel: Prodfields.id == 0 ? "" : Prodfields.factCodel })
        if (Prodfields.locCodel) {
            ApiCall({
                path: API_URLS.GET_UNIT_MASTER_LIST
            }).then(resp => {
                try {
                    setFactoryList1(resp.data.filter(f => f.loccode == Prodfields.locCodel))
                } catch (er) {
                    message.error("Response data is not as expected")
                }
            })
                .catch(err => {
                    message.error(err.message || err)
                })
        } else {
            setFactoryList1([])
        }
    }

    const factCodeChangeHandle = () => {
        setFields({ ...fields, lineGroup: fields.id == 0 ? "" : fields.lineGroup })
        if (fields.factCode) {
            ApiCall({
                path: API_URLS.GET_LINECOST_LINEGROUB + "?LocCode=" + fields.locCode + "&FactCode=" + fields.factCode   //+ "&FromDate=" + fields.startdate + "&ToDate=" + "2023-08-25"
            }).then(resp => {
                try {

                    setOperatorList(resp.data)

                } catch (er) {
                    message.error("Response data is not as expected")
                }
            })
                .catch(err => {
                    message.error(err.message || err)
                })
        } else {
            setFactoryList([])
        }

    }

    const factCodeChangeHandleList = () => {
        debugger;
        setProdFields({ ...Prodfields, lineGroupl: Prodfields.id == 0 ? "" : Prodfields.lineGroupl })
        if (Prodfields.factCodel) {
            ApiCall({
                path: API_URLS.GET_LINECOST_LINEGROUB + "?LocCode=" + Prodfields.locCodel + "&FactCode=" + Prodfields.factCodel   //+ "&FromDate=" + fields.startdate + "&ToDate=" + "2023-08-25"
            }).then(resp => {
                try {
                    setOperatorList1(resp.data)
                } catch (er) {
                    message.error("Response data is not as expected")
                }
            })
                .catch(err => {
                    message.error(err.message || err)
                })
        } else {
            setFactoryList1([])
        }

    }

    const lineGroupChangeHandle = () => {
        debugger;

        setFields({ ...fields, operators: fields.id == 0 ? "" : fields.operators })
        if (fields.lineGroup) {
            ApiCall({
                path: API_URLS.GET_LINECOST_OPERATORE + "?LocCode=" + fields.locCode + "&FactCode=" + fields.factCode + "&LineGroup=" + fields.lineGroup //+ "&ToDate=" + "2023-08-25"
            }).then(resp => {
                try {
                    setOperatorNewList(resp.data)

                } catch (er) {
                    message.error("Response data is not as expected")
                }
            })
                .catch(err => {
                    message.error(err.message || err)
                })
        } else {
            setOperatorNewList([])
        }

    }

    const OperatorsChangeHandle = name => e => {
        debugger;
        let err = {}, validation = true
        let value = e.target.value
        setFields({ ...fields, noOfOperators: fields.id == 0 ? "" : fields.noOfOperators })
        setFields({ ...fields, [name]: value })

        //  console.log(API_URLS.GET_LINECOST_WORKINGHRS + "?LocCode=" + fields.locCode + "&FactCode=" + fields.factCode + "&LineGroup=" + fields.lineGroup + "&Operators=" + e.target.value);
        //     if (fields.noOfOperators) {
        ApiCall({
            path: API_URLS.GET_LINECOST_WORKINGHRS + "?LocCode=" + fields.locCode + "&FactCode=" + fields.factCode + "&LineGroup=" + fields.lineGroup + "&Operators=" + e.target.value//+ "&ToDate=" + "2023-08-25"
        }).then(resp => {

            setWorkingHrsList(resp.data)
        })
            .catch(err => {
                message.error(err.message || err)
            })
        // } else {
        //     setWorkingHrsList([])
        // }

    }

    function disableDate() {
        var today, dd, mm, yyyy;
        today = new Date();
        dd = today.getDate() + 1;
        mm = today.getMonth() + 1;
        yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }

    const inputOnChangeList = name => e => {
        let err = {}, validation = true
        let value = e.target.value
        setProdFields({ ...Prodfields, [name]: value })
    }

    const inputOnChange = name => e => {
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'scaleUpEffPer') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['scaleUpEffPer'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['scaleUpEffPer'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        } else {
            setFields({ ...fields, [name]: value })
        }
    }

    function ViewList() {
        let err = {}, validation = true

        requiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            }
            else {
                validation = true
            }
        })
        setErrors({ ...initialErrorMessages, ...err })

        ApiCall({
            path: API_URLS.GetProductivityListByStartdateEnddateParamerters + "?loccode=" + fields.locCode + "&factcode=" + fields.factCode + "&linegroup=" + fields.lineGroup + "&producttype=" + fields.productType + "&subproducttype=" + fields.subProductType + "&noofoperators=" + fields.noOfOperators + "&plaidtype=" + fields.plaidType + "&difficultylevel=" + fields.difficultyLevel + "&workinghrs=" + fields.workingHrs + "&Startdate=" + fields.startdate + "&Enddate=" + fields.enddate,
        }).then(resp => {

            // if (resp.data[0].data.length > 0) 
            // {
            const current = new Date(resp.data[0].lastSubmittedDate);
            const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
            //  const lastDt =new Intl.DateimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(resp.data[0].lastSubmittedDate);

            if (resp.data[0].data.length > 0 && resp.data[0].dateStatus == false && resp.data[0].dataStatus == true) {
                setProductivityList(resp.data[0].data)
                setBtnVisible(true);
                setheaderFleids(true);
                setBtnSaveVisible()
            } else if (resp.data[0].dateStatus == false && resp.data[0].dataStatus == false) {
                alert("already data is exists. please changes correct date & last Submitted Date is " + date)
                setProductivityList([]);
                setBtnVisible(false);

            } else if (resp.data[0].dateStatus == true && resp.data[0].dataStatus == true) {
                setProductivityList(resp.data[0].data)
                setBtnVisible(true);
                setheaderFleids(true);
                setBtnSaveVisible(false)
            } else {
                alert("Missing date please select correct date & last Submitted Date is " + date)
                setProductivityList([]);
                setBtnVisible(false);
            }
            //  }

        })

    }

    function AddProductivityList() {

        let err = {}, validation = true

        requiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            }
            else {
                validation = true
            }
        })
        setErrors({ ...initialErrorMessages, ...err })
        debugger;
        if (validation == true) {
            setAddBtnVisible(true)
            let len = ProductivityList.length;
            let len1 = Prodfields.length;
            fields.id = len + 1;
            if (ProductivityList.length > 0) {
                let count = ProductivityList.filter(a => a.peakEff == "Y").length;
                if (count > 0) {
                    message.error("Already this commination Peak Eff Closed..!")
                } else {
                    if (parseInt(fields.scaleUpEffPer) != 0 && parseInt(fields.scaleUpEffPer) != '') {
                        fields.scaleUpDay = len + 1;
                        if (fields.peakEff != 'Y') {
                            setFields({ ...fields, peakEff: 'N' })
                        }
                        setProductivityList([...ProductivityList, fields])
                        setFields({ ...fields, scaleUpEffPer: 0 })
                    } else {
                        message.error("Please enter scaleUp Qty....! ")
                    }
                }
            } else {
                if (parseInt(fields.scaleUpEffPer) != 0 && parseInt(fields.scaleUpEffPer) != '') {
                    debugger;
                    fields.scaleUpDay = len + 1;
                    if (fields.peakEff != 'Y') {
                        setFields({ ...fields, peakEff: 'N' })
                        //  setFields({  peakEff: 'N' })
                    }
                    setProductivityList([...ProductivityList, fields])
                    setFields({ ...fields, scaleUpEffPer: 0 })
                } else {
                    message.error("Please enter scaleUp Qty....! ")
                }
            }


            // fields.aqlvmDetlModels.push(visualSampling)
            // clearFieldsVisualSam();
        }
    }

    function ProductivityMastersave() {
        debugger;
        //console.log(fields.aqlpkDetlModels.filter(d=>d.noofCtnsFrom>0) && fields.aqlvmDetlModels.filter(a=>a.packQtyFrom>0));
        // console.log(ProductivityList);

        // if (loader) return
        let err = {}, validation = true
        debugger;
        requiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            }
        })
        setErrors({ ...initialErrorMessages, ...err })
        if (validation) {
            if (parseInt(ProductivityList.length) != 0) {
                debugger;
                let res = ProductivityList.filter(a => a.peakEff == "Y")
                if (parseInt(res.length) > 0) {
                    ApiCall({
                        method: "POST",
                        path: API_URLS.SAVE_PRODUCTIVITY_MASTER,
                        data: ProductivityList   //JSON.stringify(ProductivityList)

                    }).then(resp => {
                        setLoader(false)
                        message.success(resp.message)
                        onClose();
                        setAddBtnVisible(false)
                        setBtnVisible(false);
                        setheaderFleids(false);
                        setBtnSaveVisible(false)
                        setbackBtnVisible(true)
                        setviewBtnVisible(true);

                    }).catch(err => {
                        setLoader(false)
                        setFields({ ...fields })
                        setErrors({ ...initialErrorMessages })
                        message.error(err.message || err)
                    })
                } else {
                    message.error("Please close Peak Effits...!")
                }
            }

        }
    }

    function ProductivityMasterUpdate() {
        debugger;
        let toUpdateData = ProductivityList.map((item) => {
            if (item.locCode === fields.locCode && item.scaleUpDay === fields.scaleUpDay) {
                item.startdate = fields.startdate;
                item.enddate = fields.enddate;
                item.locCode = fields.locCode;
                item.factCode = fields.factCode;
                item.lineGroup = fields.lineGroup;
                item.noOfOperators = fields.noOfOperators;
                item.workingHrs = fields.workingHrs;
                item.plaidType = fields.plaidType;
                item.subProductType = fields.subProductType;
                item.productType = fields.productType;
                item.difficultyLevel = fields.difficultyLevel;
                item.scaleUpDay = fields.scaleUpDay;
                item.scaleUpEffPer = fields.scaleUpEffPer;
                item.peakEff = fields.peakEff;
                item.createdDate = fields.createdDate;
                item.createdBy = fields.createdBy;
                item.modifiedDate = fields.modifiedDate;
                item.modifiedBy = fields.modifiedBy;
                item.isActive = fields.isActive;
                item.hostName = fields.hostName;
            }
            return item;
        });

        setFields({ ...fields, peakEff: 'N', scaleUpEffPer: 0 })
        // setFields({ ...fields, scaleUpEffPer: 0 })
        setProductivityList(toUpdateData);
        setBtnVisible(true);
        setBtnSaveVisible(false);
        setbackBtnVisible(false)



    }
    const difficultyLevelOnChange = name => e => {
        let err = {}, validation = true
        let value = e.target.value
        setFields({ ...fields, [name]: value })

        //  console.log(fields.locCode, fields.factCode, fields.noOfOperators, fields.productType, fields.plaidType, e.target.value)

    }


    const editProductivityMaster = (LocCode, scaleUpDay) => {
        debugger;

        setBtnSaveVisible(true)
        setBtnVisible(false);
        setheaderFleids(true);
        setAddBtnVisible(true)
        setbackBtnVisible(false)
        if (LocCode != '') {
            setFields(ProductivityList.filter(a => a.locCode == LocCode && a.scaleUpDay == scaleUpDay)[0]);
            let result = ProductivityList.filter(a => a.locCode == LocCode && a.scaleUpDay == scaleUpDay)[0];

        }
    };
    const onClose = () => {
        clearFields()
    };
    const clearFields = () => {
        setFields({
            ...initialFieldValues
        });
        setFields([]);
        setProductivityList([]);
        setErrors({ ...initialErrorMessages });
    }

    const disablePastDate = () => {
        const today = new Date();
        //const today = String(today1.getDate() - 1).padStart(2, "0");
        // var today = new Date(),
        // date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };
    const tableColumns = [
        {
            name: "locCode",
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div onClick={() => edit(tm.rowData[1], tm.rowData[2], tm.rowData[3], tm.rowData[4], tm.rowData[5], tm.rowData[6], tm.rowData[7], tm.rowData[8], tm.rowData[9], tm.rowData[10], tm.rowData[11], 'edit')}>
                                <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                            </div>
                            <Tooltip title="Clone">
                                <div onClick={() => Clone(tm.rowData[1], tm.rowData[2], tm.rowData[3], tm.rowData[4], tm.rowData[5], tm.rowData[6], tm.rowData[7], tm.rowData[8], tm.rowData[9], tm.rowData[10], tm.rowData[11], 'Clone')}>
                                    <FontAwesomeIcon icon={faCopy} color="#919191" />
                                </div>
                            </Tooltip>
                        </div>

                    )
                }
            }
        },
        {
            name: "locCode",
            label: "Location"
        },
        {
            name: "factCode",
            label: "factCode"
        },
        {
            name: "lineGroup",
            label: "line Group"
        },
        {
            name: "noOfOperators",
            label: "no Of Operators"
        },
        {
            name: "workingHrs",
            label: "working Hrs"
        },
        {
            name: "productType",
            label: "product Type"
        },
        {
            name: "subProductType",
            label: "sub ProductType"
        },
        {
            name: "plaidType",
            label: "plaid Type"
        },
        {
            name: "difficultyLevel",
            label: "difficulty Level"
        },
        {
            name: "startdate",
            label: "star tdate"
        },
        {
            name: "enddate",
            label: "end date"
        },
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

    const onClick = () => {
        setShowResults(false)
        setShowForm(true)
        setbackBtnVisible(true)
        setAddBtnVisible(false)
        setheaderFleids(false);
        setBtnVisible(false);
        // setbtnUpdateVisible(false)
        setviewBtnVisible(true);
    }

    const close = () => {
        clearFields()
    }
    const [tableProps, setTableProps] = useState({
        page: 0,
        rowsPerPage: 10,
        sortOrder: {
            name: 'locCode',
            direction: 'asc'
        }
    })

    const updateTableProps = props => {
        setTableProps({
            ...tableProps,
            ...props
        })
    }

    function getDatas(locCode, factcode, linegroup) {
        debugger;
        setListLoading(true)
        ApiCall({
            path: API_URLS.GetProductivityList + "?loccode=" + locCode + "&factcode=" + factcode + "&linegroup=" + linegroup,
        }).then(resp => {
            setListLoading(false)
            setList(resp.data)
            console.log(resp.data)

        }).catch(err => {
            setListLoading(false)
            message.error(err.message || err)
        })
    }
    const back = () => {
        setLoader(false)
        setShowResults(true)
        setShowForm(false)
        setProdFields({
            ...Test
        });
        setProdFields([]);
        setList([]);

        onClose();


    }

    const edit = async (locCode, factCode, lineGroup, noOfOperators, workingHrs, productType, subProductType, plaidType, difficultyLevel, startdate, enddate, type) => {

        setShowResults(false)
        setShowForm(true)
        setLoader(true)
        setVisible(true);
        ApiCall({
            path: API_URLS.GetProductivityListByStartdateEnddateParamerters + "?loccode=" + locCode + "&factcode=" + factCode + "&linegroup=" + lineGroup + "&producttype=" + productType + "&subproducttype=" + subProductType + "&noofoperators=" + noOfOperators + "&plaidtype=" + plaidType + "&difficultylevel=" + difficultyLevel + "&workinghrs=" + workingHrs + "&Startdate=" + startdate + "&Enddate=" + enddate,
        }).then(resp => {

            const current = new Date(resp.data[0].lastSubmittedDate);
            const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

            if (resp.data[0].data.length > 0 && resp.data[0].dateStatus == false && resp.data[0].dataStatus == true) {
                setProductivityList(resp.data[0].data)
                //  setBtnVisible(true);
                setheaderFleids(true);
                //setBtnSaveVisible()
                setbackBtnVisible(true);
                setviewBtnVisible(false);
                //  alert('1');
            } else if (resp.data[0].dateStatus == false && resp.data[0].dataStatus == false) {
                alert("already data is exists. please changes correct date & last Submitted Date is " + date)
                setProductivityList([]);
                setBtnVisible(false);
                //  alert('2');
            } else if (resp.data[0].dateStatus == true && resp.data[0].dataStatus == true) {
                setProductivityList(resp.data[0].data)
                setBtnVisible(true);
                setheaderFleids(true);
                setBtnSaveVisible(false)
                //  alert('3');
            } else {
                alert("Missing date please select correct date & last Submitted Date is " + date)
                setProductivityList([]);
                setBtnVisible(false);
                // alert('4');
            }
        })
    }


    const Clone = async (locCode, factCode, lineGroup, noOfOperators, workingHrs, productType, subProductType, plaidType, difficultyLevel, startdate, enddate, type) => {
        setShowResults(false)
        setShowForm(true)
        setLoader(true)
        setVisible(true);
        setviewBtnVisible(true);
        setbackBtnVisible(true);
        setBtnVisible(false);
        setFields({
            id: 0,
            locCode: locCode,
            factCode: factCode,
            lineGroup: lineGroup,
            noOfOperators: noOfOperators,
            workingHrs: workingHrs,
            productType: productType,
            subProductType: subProductType,
            plaidType: plaidType,
            difficultyLevel: difficultyLevel,
            startdate: startdate,
            enddate: enddate,
            peakEff:"N",
            createdDate : "2022-08-17T09:51:51.057Z",
            createdBy : "",
            modifiedDate : "2022-08-17T09:51:51.057Z",
            modifiedBy : "",
            hostName : ""
        })
    }
    return (

        <>
            {showResults &&
                <div className='defect-master-main'>
                    <div className='m-3'>
                        <h6 className='m-0 p-0'>{name}</h6>

                        <div className='row align-items-center mt-2'>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 mt-1'>
                                <label> Location </label>
                                <div class="main-select">
                                    <select name="locCodel" class="form-control SlectBox main-select" required
                                        value={Prodfields.locCodel}
                                        onChange={inputOnChangeList("locCodel")}
                                        disabled={AddbtnVisible}
                                    >
                                        <option value="">Select Location </option>
                                        {LocationList1.map((v, index) => {
                                            return <option key={index} value={v.locCode}>{v.locCode}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 mt-1'>
                                <label> Factory </label>
                                <div class="main-select">
                                    <select name="factCodel" class="form-control SlectBox main-select" required
                                        value={Prodfields.factCodel}
                                        onChange={inputOnChangeList("factCodel")}
                                        disabled={AddbtnVisible}
                                    >
                                        <option value="">Select Factory </option>
                                        {Factoryist1.map((v, index) => {
                                            return <option key={index} value={v.uCode}>{v.uCode}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 mt-1'>
                                <label> Line Group </label>
                                <div class="main-select">
                                    <select name="lineGroupl" class="form-control SlectBox main-select" required
                                        value={Prodfields.lineGroupl}
                                        onChange={inputOnChangeList("lineGroupl")}
                                        disabled={AddbtnVisible}
                                    >
                                        <option value="">Select line Group </option>
                                        {OperatorList1.map((v, index) => {
                                            return <option key={index} value={v}>{v}</option>
                                        })}
                                    </select>
                                </div>
                            </div>



                            <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-2 mt-1 text-end' >
                                <button className='btn-sm btn defect-master-add' onClick={() => getDatas(Prodfields.locCodel, Prodfields.factCodel, Prodfields.lineGroupl)} >  Load List </button>
                            </div>


                            <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-2 mt-1 text-end'>
                                <button className='btn-sm btn defect-master-add' onClick={onClick} onClose={onClose} visible={visible} > + Add New </button>
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
                </div>
            }
            {showForm &&
                <div class="container-fluid" >
                    <div class="breadcrumb-header justify-content-between bread-list">
                        <div class="w-100">
                            <div class="d-flex border-bottom pb-15">
                                <div class="me-auto ">
                                    <a href="#myCollapse" data-bs-toggle="collapse" aria-expanded="true" class="text-black">
                                        <h4 class="content-title float-start pr-20 border-0">
                                            <span class="pr-10">
                                                <img src={breadcrumbIcon} alt="" />
                                            </span>
                                            &nbsp; Productivity Master
                                        </h4>
                                    </a>
                                </div>
                                <div class="pt-15"></div>
                            </div>
                            <div class="col-lg"></div>
                        </div>
                    </div>
                    <div class="clear"></div>

                    <div class="row mt-25 main-tab pl-15 pr-15">
                        <ul class="nav nav-tabs p-15 pl-15" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                    type="button" role="tab" aria-controls="home" aria-selected="true">Productivity Master </button>
                            </li>
                            {/* <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile1" type="button" role="tab" aria-controls="profile" aria-selected="false">Pack audit Sampling plan</button>
                    </li> */}
                        </ul>
                        <div class="tab-content p-15" id="myTabContent">
                            <div class="tab-pane fade show active mb-70" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div class="row mt-15">


                                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <div className="form-group">
                                            <label> Start Date </label>
                                            <small className='text-danger'> {fields.startdate === '' ? errors.startdate : ''}</small>
                                            <Input type="date" name="startdate" className="form-control" id="startdate" placeholder="Start Date" value={moment(fields.startdate).format('YYYY-MM-DD')}
                                                min={disablePastDate()}
                                                onChange={inputOnChange("startdate")}
                                                disabled={AddbtnVisible}

                                            />
                                            <span className="error"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <div className="form-group">
                                            <label> End Date </label>
                                            <small className='text-danger'> {fields.enddate === '' ? errors.enddate : ''}</small>
                                            <Input type="date" name="enddate" className="form-control" id="enddate" placeholder="End Date" value={moment(fields.enddate).format('YYYY-MM-DD')}
                                                // onChange={ToDateChangeHandle("enddate")}
                                                onChange={inputOnChange("enddate")}
                                                disabled={AddbtnVisible}
                                                min={disablePastDate()}
                                            />
                                            <span className="error"></span>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <label> Location </label>
                                        <small className='text-danger'> {fields.locCode === '' ? errors.locCode : ''}</small>
                                        <div class="main-select">
                                            <select name="locCode" class="form-control SlectBox main-select" required
                                                value={fields.locCode}
                                                // onChange={LocationChangeHandle("locCode")}
                                                onChange={inputOnChange("locCode")}
                                                disabled={AddbtnVisible}

                                            // onChange={e => { inputOnChange("locCode"); LocationChangeHandle("locCode") }}
                                            >
                                                <option value="">Select Location </option>
                                                {LocationList.map((v, index) => {
                                                    return <option key={index} value={v.locCode}>{v.locCode}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <label> Factory </label>
                                        <small className='text-danger'> {fields.factCode === '' ? errors.factCode : ''}</small>
                                        <div class="main-select">
                                            <select name="factCode" class="form-control SlectBox main-select" required
                                                value={fields.factCode}
                                                onChange={inputOnChange("factCode")}
                                                disabled={AddbtnVisible}
                                            // onChange={factCodeChangeHandle("factCode")}
                                            >
                                                <option value="">Select Factory </option>
                                                {Factoryist.map((v, index) => {
                                                    return <option key={index} value={v.uCode}>{v.uCode}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>



                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <label> Line Group </label>
                                        <small className='text-danger'> {fields.lineGroup === '' ? errors.lineGroup : ''}</small>
                                        <div class="main-select">
                                            <select name="lineGroup" class="form-control SlectBox main-select" required
                                                value={fields.lineGroup}
                                                onChange={inputOnChange("lineGroup")}
                                                disabled={AddbtnVisible}
                                            >
                                                <option value="">Select line Group </option>
                                                {OperatorList.map((v, index) => {
                                                    return <option key={index} value={v}>{v}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <label> NoOfOperators </label>
                                        <small className='text-danger'> {fields.noOfOperators === '' ? errors.noOfOperators : ''}</small>
                                        <div class="main-select">
                                            <select name="noOfOperators" class="form-control SlectBox main-select" required
                                                value={fields.noOfOperators}
                                                disabled={AddbtnVisible}
                                                // onChange={inputOnChange("noOfOperators")}
                                                onChange={OperatorsChangeHandle("noOfOperators")}
                                            >
                                                <option value="">Select no Of Operators </option>
                                                {OperatorListNew.map((v, index) => {
                                                    return <option key={index} value={v}>{v}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <label> Working Hrs </label>
                                        <small className='text-danger'> {fields.workingHrs === '' ? errors.workingHrs : ''}</small>
                                        <div class="main-select">
                                            <select name="workingHrs" class="form-control SlectBox main-select" required
                                                value={fields.workingHrs}
                                                disabled={AddbtnVisible}
                                                onChange={inputOnChange("workingHrs")}
                                            >
                                                <option value="">Select working Hrs </option>
                                                {WorkingHrsList.map((v, index) => {
                                                    return <option key={index} value={v}>{v}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <label> Product Type </label>
                                        <small className='text-danger'> {fields.productType === '' ? errors.productType : ''}</small>
                                        <div class="main-select">
                                            <select name="productType" class="form-control SlectBox main-select" required
                                                value={fields.productType}
                                                disabled={AddbtnVisible}
                                                onChange={inputOnChange("productType")}
                                            >
                                                <option value="">Select Product Type </option>
                                                {ProductTypeList.map((v, index) => {
                                                    return <option key={index} value={v.productType}>{v.productType}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <label>  Sub Product Type </label>
                                        <small className='text-danger'> {fields.subProductType === '' ? errors.subProductType : ''}</small>
                                        <div class="main-select">
                                            <select name="subProductType" class="form-control SlectBox main-select" required
                                                value={fields.subProductType}
                                                disabled={AddbtnVisible}
                                                onChange={inputOnChange("subProductType")}
                                            >
                                                <option value="">Select Sub Product Type </option>
                                                <option value="CARGO PANTS">CARGO PANTS </option>
                                                <option value="CARGO SHORT">CARGO SHORT </option>
                                                <option value="CARGOSHORT">CARGOSHORT </option>
                                                <option value="PANTS 5 PKT">PANTS 5 PKT </option>
                                                <option value="PANTS CHINO 4 PKT">PANTS CHINO 4 PKT </option>
                                                <option value="SHORTS 5 PKT">SHORTS 5 PKT </option>
                                                <option value="SHORTS CHINO 4 PKT">SHORTS CHINO 4 PKT </option>
                                                <option value="SKIRT">SKIRT </option>
                                                <option value="LADIES BLOUSE">LADIES BLOUSE </option>
                                                <option value="LADIES DRESS">LADIES DRESS </option>
                                                <option value="LADIES SHIRT/TOP">LADIES SHIRT/TOP </option>
                                                <option value="JACKET">JACKET </option>
                                                <option value="MEN SHIRT L/SLV">MEN SHIRT L/SLV </option>
                                                <option value="SKIRT">SKIRT </option>
                                                <option value="LADIES BLOUSE">LADIES BLOUSE </option>
                                                <option value="LADIES DRESS">LADIES DRESS </option>
                                                <option value="LADIES SHIRT/TOP">LADIES SHIRT/TOP </option>
                                                <option value="MEN SHIRT L/SLV">MEN SHIRT L/SLV </option>
                                                <option value="MENS SHIRT L/SLV">MENS SHIRT L/SLV </option>
                                                <option value="MENS SHIRT S/SLV">MENS SHIRT S/SLV </option>




                                                {/* {ProductTypeList.map((v, index) => {
                                            return <option key={index} value={v.productType}>{v.productType}</option>
                                        })} */}
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <label> Fabric Type </label>
                                        <small className='text-danger'></small>
                                        <div class="main-select">
                                            <select name="plaidType" class="form-control SlectBox main-select" required
                                                value={fields.plaidType}
                                                disabled={AddbtnVisible}
                                                onChange={inputOnChange("plaidType")}
                                            >
                                                <option value="">Select Fabric Type </option>
                                                {FabTypeList.map((v, index) => {
                                                    return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <label> Difficulty Level </label>
                                        <small className='text-danger'></small>
                                        <div class="main-select">
                                            <select name="difficultyLevel" class="form-control SlectBox main-select" required
                                                value={fields.difficultyLevel}
                                                disabled={AddbtnVisible}
                                                // onChange={inputOnChange("difficultyLevel")}
                                                onChange={difficultyLevelOnChange("difficultyLevel")}

                                            >
                                                <option value="">Select Difficulty Level </option>
                                                {DifficultyLevelList.map((v, index) => {
                                                    return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    {
                                        headerFleids &&
                                        <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                            <label> Scaleup Day </label>
                                            <small className='text-danger'></small>
                                            <div class="main-select">
                                                <select name="scaleUpDay" class="form-control SlectBox main-select" required disabled="disabled"
                                                    value={fields.scaleUpDay}
                                                    onChange={inputOnChange("scaleUpDay")}
                                                >
                                                    <option value="">Select scale UpDay </option>
                                                    {ProductivityList.map((v, index) => {
                                                        return <option key={index} value={v.scaleUpDay}>{v.scaleUpDay}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                    }

                                    {
                                        headerFleids &&
                                        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                            <div className="form-group">
                                                <label> Scaleup Qty </label>
                                                <Input type="text" name="scaleUpEffPer" className="form-control" id="ScaleUpEffPer" placeholder="ScaleUp Eff"
                                                    value={fields.scaleUpEffPer} onChange={inputOnChange("scaleUpEffPer")}
                                                    autoComplete="off"
                                                />

                                            </div>
                                        </div>
                                    }
                                    {
                                        headerFleids &&
                                        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                            <div className="form-group">
                                                <label> Peak Eff </label>
                                                <select className="form-control" name="peakEff" id='peakEff' value={fields.peakEff} onChange={inputOnChange("peakEff")} >
                                                    <option value="">- Peak Eff -</option>
                                                    <option value="Y">YES</option>
                                                    <option value="N" selected={true}>NO</option>
                                                </select>

                                            </div>
                                        </div>
                                    }

                                </div>
                                <div class="row mt-15">

                                </div>
                                <div className='row d-flex my-xl-auto right-content'>
                                    <div class="col-12 mg-t-10 mg-md-t-0 p-0 mr-10">

                                        <div class="float-start pl-5">
                                            {
                                                viewBtnVisible && < button class="btn btn-primary search-btn btn-block" onClick={() => ViewList()}>View</button>
                                            }

                                        </div>
                                        <div class="float-start pl-5">
                                            {
                                                backBtnVisible && < button class="btn btn-primary search-btn btn-block" onClick={back}>Back</button>
                                            }

                                        </div>

                                        <div class="float-start pl-5">
                                            {
                                                btnVisible && < button class="btn btn-primary search-btn btn-block" onClick={() => AddProductivityList()}>Add to List</button>
                                            }
                                        </div>
                                        <div class="float-start pl-5">
                                            {
                                                btnVisible &&
                                                <button class="btn btn-sm defect-master-add search-btn btn-block" onClick={() => ProductivityMastersave()}>Save</button>
                                            }
                                        </div>

                                        <div class="float-start pl-5">
                                            {
                                                btnSaveVisible &&
                                                <button class="btn btn-sm defect-master-add search-btn btn-block" onClick={() => ProductivityMasterUpdate()}>Update</button>
                                            }
                                        </div>

                                    </div>
                                </div>
                                <div class="clear"></div>
                                <div id="table-scroll" class="table-scroll l-tb-1 m-fixx pt-15">
                                    <div class="table-wrap">


                                        <table id="example" class="table table-striped edit-np f-l1">
                                            <thead>
                                                <tr>
                                                    <th className="text-center w-10">Actions</th>
                                                    <th className="" align='center'>Id</th>
                                                    <th className="" align='center'>Peak Eff</th>
                                                    <th className="" align='center'>Location</th>
                                                    <th className="" align='center'>Factory</th>
                                                    <th className="" align='center'>Start Date</th>
                                                    <th className="" align='center'>End Date</th>
                                                    <th className="" align='center'>No Of Operators</th>
                                                    <th className="" align='center'>WorkingHrs</th>
                                                    <th className="" align='center'>Product Type</th>
                                                    <th className="" align='center'>Fabric Type</th>
                                                    <th className="" align='center'>Difficulty Level</th>
                                                    <th className="" align='center'>Scaleup Day</th>
                                                    <th className="" align='center'>Scaleup Qty</th>



                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* if(visible=="True") */}
                                                {

                                                    ProductivityList.map((row, index) => (
                                                        <tr key={index}>
                                                            <td align='center'>
                                                                <div className='text-center' >
                                                                    <FontAwesomeIcon icon={faPenToSquare} color="#919191"
                                                                        onClick={() => { editProductivityMaster(row?.locCode, row?.scaleUpDay) }}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td align='center'> {index + 1} </td>
                                                            <td align='center'>{row.peakEff}</td>
                                                            <td align='center'>{row.locCode}</td>
                                                            <td align='center'>{row.factCode}</td>
                                                            <td align='center'>{row.startdate}</td>
                                                            <td align='center'>{row.enddate}</td>
                                                            <td align='center'>{row.noOfOperators}</td>
                                                            <td align='center'>{row.workingHrs}</td>
                                                            <td align='center'>{row.productType}</td>
                                                            <td align='center'>{row.plaidType}</td>
                                                            <td align='center'>{row.difficultyLevel}</td>
                                                            <td align='center'>{index + 1}</td>
                                                            <td align='center'>{row.scaleUpEffPer}</td>


                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >
            }
        </>
    )
}