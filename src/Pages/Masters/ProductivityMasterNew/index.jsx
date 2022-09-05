import React, { useState, useEffect } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Drawer, Switch, Pagination, Spin, message, Tag, Radio } from 'antd';
import breadcrumbIcon from '../../../Assets/images/style/bred-icon.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { ItrApiService } from '@afiplfeed/itr-ui';
import PropTypes, { number } from 'prop-types';
import ApiCall from "../../../services";
import { API_URLS, MISCELLANEOUS_TYPES } from "../../../constants/api_url_constants";
import { Construction, Deblur } from '@mui/icons-material';
import { findDOMNode } from 'react-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Col, FormFeedback } from 'reactstrap';
import { filledInputClasses } from '@mui/material';


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
        // id: 0,
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
    Test = {
        // id: 0,
        // locCode: "",
        // factCode: "",
        // lineGroup: "",
        // productType: "",
        // subProductType: "",
        // noOfOperators: 0,
        // plaidType: "NA",
        // difficultyLevel: "",
        // workingHrs: 0,
        // scaleUpDay: 0,
        // scaleUpEffPer: 0,
        // peakEff: "N",
        // startdate: Date.UTC,
        // enddate: Date.UTC,
        // createdDate: "2022-08-17T09:51:51.057Z",
        // createdBy: "",
        // modifiedDate: "2022-08-17T09:51:51.057Z",
        // modifiedBy: "",
        // hostName: "",
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

    const [Prodfields, setProdFields] = useState([{
        ...Test
    }]);

    const [LocationList, setLocationList] = useState([]);
    const [Factoryist, setFactoryList] = useState([]);
    const [OperatorList, setOperatorList] = useState([]);

    const [OperatorListNew, setOperatorNewList] = useState([]);
    const [WorkingHrsList, setWorkingHrsList] = useState([]);
    const [ProductTypeList, setProductTypeList] = useState([]);
    const [FabTypeList, setFabTypeList] = useState([]);
    const [DifficultyLevelList, setDifficultyLevelList] = useState([]);
    const [selected, setselected] = useState(true);
    const [ProductivityList, setProductivityList] = useState([]);

    const [ProductivityListTemp, setProductivityListTemp] = useState([]);






    useEffect(() => {
        getLocation();
        getProductType();
        getFabType();
        getDifficultyLevel();
    }, []);

    useEffect(() => {
        if (fields.locCode) {
            getFactoryDropDown()
        }
    }, [fields.locCode])

    useEffect(() => {
        if (fields.enddate) {
            //   getNoOfOperatorsDropDown()
        }
    }, [fields.enddate])

    useEffect(() => {
        if (fields.factCode) {
            factCodeChangeHandle()
        }
    }, [fields.factCode])

    useEffect(() => {
        if (fields.lineGroup) {
            lineGroupChangeHandle()
        }
    }, [fields.lineGroup])

    useEffect(() => {
        if (fields.operators) {
            OperatorsChangeHandle()
        }
    }, [fields.operators])



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


    const LocationChangeHandle = name => e => {
        let value = e.target.value
        setFields({ ...fields, [name]: value })
        //  console.log(fields)
        // ApiCall({
        //     path: API_URLS.GET_UNIT_MASTER_LIST
        // }).then(resp => {
        //     try {
        //         console.log(resp.data);
        //         setFactoryList(resp.data.filter(f => f.loccode == fields.locCode))
        //     } catch (er) {
        //         message.error("Response data is not as expected")
        //     }
        // })
        //     .catch(err => {
        //         message.error(err.message || err)
        //     })
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

    const getNoOfOperatorsDropDown = () => {
        setFields({ ...fields, noOfOperators: fields.id == 0 ? "" : fields.noOfOperators })
        //   console.log(API_URLS.GET_LINECOST_MASTER_LOCCODEFACTORY_LIST + "?LocCode=" + `${fields.locCode}` + "&FactCode=" + `${fields.factCode}` + "&FromDate=" + `${fields.startdate}` + "&ToDate=" + `${fields.enddate}`)
        if (fields.enddate) {
            ApiCall({
                path: API_URLS.GET_LINECOST_MASTER_LOCCODEFACTORY_LIST + "?LocCode=" + `${fields.locCode}` + "&FactCode=" + `${fields.factCode}` + "&FromDate=" + `${fields.startdate}` + "&ToDate=" + `${fields.enddate}`
            }).then(resp => {
                try {
                    //  console.log(resp.data);
                    setOperatorList(resp.data)
                } catch (er) {
                    message.error("Response data is not as expected")
                }
            })
                .catch(err => {
                    message.error(err.message || err)
                })
        } else {
            setOperatorList([])
        }
    }

    const ToDateChangeHandle = name => e => {
        debugger;
        let value = e.target.value
        setFields({ ...fields, [name]: value })
        //  console.log(API_URLS.GET_LINECOST_MASTER_LOCCODEFACTORY_LIST + "?LocCode=" + fields.locCode + "&FactCode=" + fields.factCode + "&FromDate=" + fields.startdate + "&ToDate=" + fields.enddate)
        ApiCall({
            path: API_URLS.GET_LINECOST_MASTER_LOCCODEFACTORY_LIST + "?LocCode=" + fields.locCode + "&FactCode=" + fields.factCode + "&FromDate=" + fields.startdate + "&ToDate=" + "2023-08-25"
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
    }

    const factCodeChangeHandle = () => {
        debugger;

        setFields({ ...fields, lineGroup: fields.id == 0 ? "" : fields.lineGroup })
        if (fields.factCode) {
            ApiCall({
                path: API_URLS.GET_LINECOST_LINEGROUB + "?LocCode=" + fields.locCode + "&FactCode=" + fields.factCode   //+ "&FromDate=" + fields.startdate + "&ToDate=" + "2023-08-25"
            }).then(resp => {
                try {
                    //   console.log(resp.data)
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
    const lineGroupChangeHandle = () => {
        debugger;

        setFields({ ...fields, operators: fields.id == 0 ? "" : fields.operators })
        //    console.log(API_URLS.GET_LINECOST_OPERATORE + "?LocCode=" + fields.locCode + "&FactCode=" + fields.factCode + "&LineGroup=" + fields.lineGroup);
        if (fields.lineGroup) {
            ApiCall({
                path: API_URLS.GET_LINECOST_OPERATORE + "?LocCode=" + fields.locCode + "&FactCode=" + fields.factCode + "&LineGroup=" + fields.lineGroup //+ "&ToDate=" + "2023-08-25"
            }).then(resp => {
                try {
                    //   console.log(resp.data)
                    setOperatorNewList(resp.data)
                } catch (er) {
                    message.error("Response data is not as expected")
                }
            })
                .catch(err => {
                    message.error(err.message || err)
                })
        } else {
            setOperatorList([])
        }

    }

    const OperatorsChangeHandle = name => e => {
        debugger;
        let err = {}, validation = true
        let value = e.target.value
        setFields({ ...fields, noOfOperators: fields.id == 0 ? "" : fields.noOfOperators })
        setFields({ ...fields, [name]: value })

        //    console.log(API_URLS.GET_LINECOST_WORKINGHRS + "?LocCode=" + fields.locCode + "&FactCode=" + fields.factCode + "&LineGroup=" + fields.lineGroup + "&Operators=" + e.target.value);
        if (fields.noOfOperators) {
            ApiCall({
                path: API_URLS.GET_LINECOST_WORKINGHRS + "?LocCode=" + fields.locCode + "&FactCode=" + fields.factCode + "&LineGroup=" + fields.lineGroup + "&Operators=" + e.target.value//+ "&ToDate=" + "2023-08-25"
            }).then(resp => {
                try {
                    //       console.log(resp.data)
                    setWorkingHrsList(resp.data)
                } catch (er) {
                    message.error("Response data is not as expected")
                }
            })
                .catch(err => {
                    message.error(err.message || err)
                })
        } else {
            setWorkingHrsList([])
        }

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

    function AddProductivityList() {

        let err = {}, validation = true
        debugger;
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
            let len = ProductivityList.length;
            let len1 = Prodfields.length;
            fields.id = len + 1;
            if (parseInt(fields.scaleUpEffPer) != 0) {
                fields.scaleUpDay = len + 1;

                console.log( API_URLS.GetProductivityByStartdateEnddateParamertersList + "?loccode=" + fields.locCode + "&pactcode=" + fields.factCode + "&linegroup=" + fields.lineGroup + "&producttype=" + fields.productType + "&subproducttype=" + fields.subProductType + "&noofoperators=" + fields.noOfOperators + "&plaidtype=" + fields.plaidType  + "&difficultylevel=" + fields.difficultyLevel  + "&workinghrs=" + fields.workingHrs+ "&scaleupday=" + fields.scaleUpDay + "&Startdate=" + fields.startdate + "&Enddate=" + fields.enddate)

                ItrApiService.GET({
                    url: API_URLS.GetProductivityByStartdateEnddateParamertersList + "?loccode=" + fields.locCode + "&pactcode=" + fields.factCode + "&linegroup=" + fields.lineGroup + "&producttype=" + fields.productType + "&subproducttype=" + fields.subProductType + "&noofoperators=" + fields.noOfOperators + "&plaidtype=" + fields.plaidType  + "&difficultylevel=" + fields.difficultyLevel  + "&workinghrs=" + fields.workingHrs+ "&scaleupday=" + fields.scaleUpDay + "&Startdate=" + fields.startdate + "&Enddate=" + fields.enddate,
                    appCode: "CNF"
                }).then(res => {
                    alert(res)
                    console.log(res.data)
                });

                // setProductivityList([...ProductivityList, fields])
                // setFields({ ...fields, scaleUpEffPer: 0 })
            } else {
                alert("Please enter scaleUp Qty....! ")
            }


            // fields.aqlvmDetlModels.push(visualSampling)
            // clearFieldsVisualSam();
        }
    }

    function ProductivityMastersave() {
        //console.log(fields.aqlpkDetlModels.filter(d=>d.noofCtnsFrom>0) && fields.aqlvmDetlModels.filter(a=>a.packQtyFrom>0));
        // console.log(ProductivityList);

        if (loader) return
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

            }


            ApiCall({
                method: "POST",
                path: API_URLS.SAVE_PRODUCTIVITY_MASTER,
                data: ProductivityList   //JSON.stringify(ProductivityList)

            }).then(resp => {
                setLoader(false)
                message.success(resp.message)
                onClose();
            }).catch(err => {
                setLoader(false)
                setFields({ ...fields })
                setErrors({ ...initialErrorMessages })
                message.error(err.message || err)
            })
        }
    }

    const difficultyLevelOnChange = name => e => {
        let err = {}, validation = true
        let value = e.target.value
        setFields({ ...fields, [name]: value })

        //  console.log(fields.locCode, fields.factCode, fields.noOfOperators, fields.productType, fields.plaidType, e.target.value)

    }

    const onClose = () => {
        clearFields()
        // setVisible(false);
    };
    const clearFields = () => {
        setFields({
            ...initialFieldValues
        });
        setFields([]);
        setProductivityList([]);

        setErrors({ ...initialErrorMessages });
    }

    return (
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
            {/* <div class="row mt-15 dis-sel mt-20">
                <div class="col-lg">
                    <label>AQL Type</label>
                    <small className='text-danger'>{fields.aqlType === '' ? errors.aqlType : ''}</small>
                    <div class="main-select">
                        <select name="somename" class="form-control SlectBox main-select" required
                            value={fields.aqlType}
                            onChange={inputOnChange1("aqlType")}
                        >
                            <option value="">Select AQL Type </option>
                            {aqlList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.code}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div class="col-lg">
                    <label>Audit Format</label>
                    <small className='text-danger'>{fields.auditFormat === '' ? errors.auditFormat : ''}</small>
                    <div class="main-select">
                        <select name="somename" class="form-control SlectBox main-select" required
                            value={fields.auditFormat}
                            onChange={inputOnChange1("auditFormat")}
                        >
                            <option value="">Select Audit Format</option>
                           
                            {auditFormatList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.code}</option>
                            })}

                        </select>
                    </div>
                </div>
                <div class="col-lg">
                    <label>Unit Code</label>
                    <small className='text-danger'>{fields.unitCode === '' ? errors.unitCode : ''}</small>
                    <select name="somename" class="form-control SlectBox main-select" required
                        value={fields.unitCode}
                        onChange={inputOnChange1("unitCode")}
                    >
                        <option value="">Select Unit Code </option>
                        {unitCodeList.map((v, index) => {
                            return <option key={index} value={v.uCode}>{v.uCode}</option>
                        })}
                    </select>
                </div>
                <div class="col-lg">
                    <label>Buyer Div Code</label>
                    <small className='text-danger'>{fields.buyerCode === '' ? errors.buyerCode : ''}</small>
                    <select name="somename" class="form-control SlectBox main-select" required
                        value={fields.buyerCode}
                        onChange={inputOnChange1("buyerCode")}
                    >
                        <option value="">Select Buyer Div Code </option>
                        {buyDivCodeList.map((v, index) => {
                            return <option key={index} value={v.buyDivCode}>{v.buyDivCode}</option>
                        })}
                    </select>
                </div>

                <div class="col-lg pt-20 ">
                    <button class="btn btn-secondary search-btn btn-block"
                        onClick={() => AddVisualSamplingPlan(fields.aqlType, fields.auditFormat, fields.unitCode, fields.buyerCode)}
                    >Show Result</button>
                </div>
            </div> */}
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
                                    <Input type="date" name="startdate" className="form-control" id="startdate" placeholder="Start Date" value={fields.startdate}
                                        onChange={inputOnChange("startdate")}
                                    />
                                    <span className="error"></span>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                <div className="form-group">
                                    <label> End Date </label>
                                    <small className='text-danger'> {fields.enddate === '' ? errors.enddate : ''}</small>
                                    <Input type="date" name="enddate" className="form-control" id="enddate" placeholder="End Date" value={fields.enddate}
                                        // onChange={ToDateChangeHandle("enddate")}
                                        onChange={inputOnChange("enddate")}
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
                                        onChange={inputOnChange("workingHrs")}
                                    >
                                        <option value="">Select working Hrs </option>
                                        {WorkingHrsList.map((v, index) => {
                                            return <option key={index} value={v}>{v}</option>
                                        })}

                                        {/* {OperatorList.map((v, index) => {
                                            return <option key={index} value={v.workingHrs}>{v.workingHrs}</option>
                                        })} */}
                                    </select>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                <label> Product Type </label>
                                <small className='text-danger'> {fields.productType === '' ? errors.productType : ''}</small>
                                <div class="main-select">
                                    <select name="productType" class="form-control SlectBox main-select" required
                                        value={fields.productType}
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

                            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                <label> Scaleup Day </label>
                                <small className='text-danger'></small>
                                <div class="main-select">
                                    <select name="scaleUpDay" class="form-control SlectBox main-select" required
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

                            <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                <div className="form-group">
                                    <label> Scaleup Qty </label>
                                    <Input type="text" name="scaleUpEffPer" className="form-control" id="ScaleUpEffPer" placeholder="ScaleUp Eff"
                                        value={fields.scaleUpEffPer} onChange={inputOnChange("scaleUpEffPer")}
                                    />

                                </div>
                            </div>

                            {/* <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                <label> Peak Eff </label>
                                <small className='text-danger'></small>
                                <div class="main-select">
                                    <select name="peakEff" class="form-control SlectBox main-select" required
                                        value={fields.peakEff}
                                        onChange={inputOnChange("peakEff")}
                                    >
                                        <option value="">Select peakEff </option>
                                        <option value="Y">YES</option>
                                        <option value="N" selected={true}>NO</option>
                                    </select>
                                </div>
                            </div> */}

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

                            {/* <div className='col-lg'>
                                <div className='form-group'  >
                                    <label>Pack-Qty From</label>
                                    <small className='text-danger'>{fields.aqlvmDetlModels.packQtyFrom === '' ? errors.aqlvmDetlModels.packQtyFrom : ''}</small>
                                    <input type="text" class="form-control disabled " placeholder='Enter Pack-Qty From' value={visualSampling.packQtyFrom == 0 ? '' : visualSampling.packQtyFrom}
                                        id="packQtyFrom"
                                        disabled={packQtyvisible}

                                        onChange={inputOnChange("packQtyFrom")}
                                    />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Pack-Qty To</label>
                                    <small className='text-danger'>{fields.aqlvmDetlModels.packQtyTo === '' ? errors.aqlvmDetlModels.packQtyTo : ''}</small>
                                    <input type="text" class="form-control" placeholder='Enter Pack-Qty To' value={visualSampling.packQtyTo == 0 ? '' : visualSampling.packQtyTo}
                                        id="packQtyTo"
                                        // disabled={visible}
                                        disabled={packQtyvisible}
                                        onChange={inputOnChange("packQtyTo")}
                                    />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Sample Size</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Sample Size' value={visualSampling.sampleSize == 0 ? 0 : visualSampling.sampleSize}
                                        id="sampleSize" onChange={inputOnChange("sampleSize")} disabled={visible}
                                    />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Visual Defect</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Visual Defect' value={visualSampling.maxAllowVisualDefects == 0 ? 0 : visualSampling.maxAllowVisualDefects}
                                        id="maxAllowVisualDefects"
                                        disabled={visible}
                                        onChange={inputOnChange("maxAllowVisualDefects")}
                                    />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Critical Defect</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Critical Defect' value={visualSampling.maxAllowCriticalDefects == 0 ? 0 : visualSampling.maxAllowCriticalDefects}
                                        id="maxAllowCriticalDefects"
                                        disabled={visible}
                                        onChange={inputOnChange("maxAllowCriticalDefects")}
                                        onBlur={Defvalidation("maxAllowCriticalDefects")}
                                    />
                                </div>
                            </div> */}

                        </div>
                        <div class="row mt-15">
                            {/* <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Sewing Defect</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Sewing Defect' value={visualSampling.maxAllowSewDefects == 0 ? 0 : visualSampling.maxAllowSewDefects}
                                        id="maxAllowSewDefects"
                                        disabled={visible}
                                        onChange={inputOnChange("maxAllowSewDefects")}
                                        onBlur={Defvalidation("maxAllowSewDefects")}
                                    />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Other Defect</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Other Defect' value={visualSampling.maxAllowOthDefects == 0 ? 0 : visualSampling.maxAllowOthDefects}
                                        id="maxAllowOthDefects"
                                        disabled={visible}
                                        onChange={inputOnChange("maxAllowOthDefects")}
                                        onBlur={Defvalidation("maxAllowOthDefects")}
                                    />
                                </div>
                            </div>

                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Mesurement Pcs</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Mesurement Pcs' value={visualSampling.mesurementPcs == 0 ? 0 : visualSampling.mesurementPcs}
                                        id="mesurementPcs"
                                        disabled={visible}
                                        onChange={inputOnChange("mesurementPcs")}
                                    />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Mesurement Defect</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Mesurement Defect' value={visualSampling.maxAllowMesurementDefects == 0 ? 0 : visualSampling.maxAllowMesurementDefects}
                                        id="maxAllowMesurementDefects"
                                        disabled={visible}
                                        onChange={inputOnChange("maxAllowMesurementDefects")}
                                    />
                                </div>
                            </div>
                            <div className='col-lg'></div> */}
                        </div>
                        <div className='row d-flex my-xl-auto right-content'>
                            <div class="col-5 mg-t-10 mg-md-t-0 p-0 mr-10">
                                {/* <div class="float-start">
                                    <button class="btn btn-primary search-btn btn-block  ">Reset</button>
                                </div> */}
                                <div class="float-start pl-5">
                                    < button class="btn btn-primary search-btn btn-block" onClick={() => AddProductivityList()}>Add to List</button>
                                    {/* {
                                        addBtnVisible && < button class="btn btn-primary search-btn btn-block" onClick={() => AddVisualSamPlan()}>Add to List</button>
                                    } */}
                                </div>
                                <div class="float-start pl-5">
                                    <button class="btn btn-sm defect-master-add search-btn btn-block" onClick={() => ProductivityMastersave()}>Save</button>
                                    {/* {
                                        btnvisible && <button class="btn btn-primary search-btn btn-block" onClick={() => UpdateVisualSamPlan()} >  Update List</button>
                                    } */}
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
                                            <th className="" align='center'>Peak Eff</th>


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
                                                                onClick={() => { editVisualSampling(row?.id, row?.packQtyFrom) }}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td align='center'> {index + 1} </td>
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
                                                    <td align='center'>{row.peakEff}</td>

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
    )
}