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
import { Button, Form, FormGroup, Label, Input, FormText, Col, FormFeedback } from 'reactstrap';
// import '../../../Assets/style.css'
import bootstrap from 'bootstrap/dist/js/bootstrap'
// import '../../../Assets/bootstrapstyle.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
//assets/img/delete-tbl.svg
import deletetbl from '../../../Assets/images/style/delete-tbl.svg'
import breadcrumbIcon from '../../../Assets/images/style/bred-icon.svg'
import '../../../Assets/sumoselect.css'
import jquery from '../../../Assets/js/jquerymin'

const requiredFields = ["entityID", "eCode", "eName", "address1", "address2", "address3", "city", "pinCode", "country", "tngstNo", "tinNo", "tanNo", "cinNo", "cstNo", "panNo", "stNo", "areaCode", "emailId", "contPerson1", "contPerson2", "contNo", "gstNo"],
    requiredField = ["entityID", "eCode", "eName", "address1", "address2", "address3", "city", "pinCode", "country", "tngstNo", "tinNo", "tanNo", "cinNo", "cstNo", "panNo", "stNo", "areaCode", "emailId", "contPerson1", "contPerson2", "contNo", "gstNo"],
    requiredFieldse = ["entityID", "eCode", "eName", "address1", "address2", "address3", "city", "pinCode", "country", "tngstNo", "tinNo", "tanNo", "cinNo", "cstNo", "panNo", "stNo", "areaCode", "emailId", "contPerson1", "contPerson2", "contNo", "gstNo"],
    requiredFieldss = ["entityID", "eCode", "eName", "address1", "address2", "address3", "city", "pinCode", "country", "tngstNo", "tinNo", "tanNo", "cinNo", "cstNo", "panNo", "stNo", "areaCode", "emailId", "contPerson1", "contPerson2", "contNo", "gstNo"],
    requiredFieldsss = ["entityID", "eCode", "eName", "address1", "address2", "address3", "city", "pinCode", "country", "tngstNo", "tinNo", "tanNo", "cinNo", "cstNo", "panNo", "stNo", "areaCode", "emailId", "contPerson1", "contPerson2", "contNo", "gstNo"],

    initialErrorMessages = {
        id: 0,
        parentGroup: "",
        matType: "",
        matGroup: "",
        matSubGroup: "",
        sysMatCode: "",
        matCode: "",
        matDesc: "",
        buyDivcode: "",
        approved: "",
        approvedBy: "",
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
            matMast_ID: "",
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
            shrinkWarp: 0,
            shrinkWeft: "",
            washMethod: "",
            fabWt_BW: "",
            fabWt_AW: "",
            weightUom: "",
            yarnWarp: "",
            actualWidth: "",
            cutWidth: "",
            widthUom: "",
            physicalFinish: "",
            chemicalFinish: "",
            active: 'Y',
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
            active: 'Y',
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
            active: 'Y',
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
        sysMatCode: "",
        matCode: "",
        matDesc: "",
        buyDivcode: "",
        approved: "",
        approvedBy: "",
        approvedDt: Date.UTC,
        active: 'Y',
        hostName: "",
        createdDate: "2022-08-22",
        createdBy: "AD",
        modifiedDate: "2022-08-22",
        modifiedBy: "",
        isActive: false,
        matMastFBRModels: [],
        matMastThreadModels: [],
        matMastTrimsModels: [],
        matMastPurchaseModels: []

    },
    MatmastFabinitialValues = {
        id: 0,
        matMast_ID: "",
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
        shrinkWarp: 0,
        shrinkWeft: "",
        washMethod: "",
        fabWt_BW: "",
        fabWt_AW: "",
        weightUom: "",       
        actualWidth: "",
        cutWidth: "",
        widthUom: "",
        physicalFinish: "",
        chemicalFinish: "",
        active: 'Y',
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
        active: 'Y',
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
        active: 'Y',
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
    const [countryList, setcountryList] = useState([]);
    const [showResults, setShowResults] = React.useState(true);
    const [showForm, setShowForm] = React.useState(false);
    const [showFabricTab, setshowFabricTab] = React.useState(true);

    // const [showFabricTab, setshowFabricTab] = React.useState(false);

    const [entityVisible, setEntityVisible] = useState(false);
    const [Savevisible, setSavevisible] = React.useState(true);
    const [updatevisible, setUpdatevisible] = React.useState(false);

    // const [Threadvisible, setThreadvisible] = React.useState(true);
    // const [Fabricvisible, setFabricvisible] = React.useState(true);
    // const [Trimsvisible, setTrimsvisible] = React.useState(true);
    // const [Purchasevisible, setPurchasevisible] = React.useState(true);

    const [Threadvisible, setThreadvisible] = React.useState(false);
    const [Fabricvisible, setFabricvisible] = React.useState(false);
    const [Trimsvisible, setTrimsvisible] = React.useState(false);
    const [Purchasevisible, setPurchasevisible] = React.useState(false);
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
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    })

    const clearFields = () => {
        setFields({
            ...initialFieldValues
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


    const pageSize = 10;

    // for-list-pagination
    const [pagination, setPagination] = useState({
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0
    });

    useEffect(() => {
        getDatas();
        getOrginLocationType();
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

    const getOrginLocationType = () => {

        ItrApiService.GET({
            url: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.PARENTGRP,
            appCode: "CNF"
        }).then(resp => {
            setcountryList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
        });
    }

    const getDatas = () => {
        setListLoading(true)
        ApiCall({
            path: API_URLS.GET_COMPANY_MASTER_LIST

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

    const onClick = () => {
        setShowResults(false)
        setShowForm(true)
    }

    const close = () => {
        clearFields()
        setShowResults(true)
        setShowForm(false)
        setSavevisible(true)
        setUpdatevisible(false)
        setEntityVisible(false);
    }

    // const ChangeEvent = (e) => {
    //     debugger;
    //     this.setState({ [e.target.name]: e.target.value });
    //     // this.setstatevaluedropdownfunction(e.target.name, e.target.value);
    // }

    const inputOnChange = name => e => {
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'entityID' || name === 'eCode' || name === 'eName') {
            setFields({ ...fields, [name]: value.toUpperCase() })
        }
        else {
            setFields({ ...fields, [name]: value })
        }

    }


    const Save = async (entityID, eCode, eName, type) => {
        debugger;
        //  alert(buyCode, buyDivCode, productType, type);
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
            if (type === "update") {
                if (validation) {
                    setLoader(true)

                    ApiCall({
                        method: "POST",
                        path: API_URLS.SAVE_COMPANY_MASTER,
                        data: {
                            ...fields,
                            hostName: getHostName()
                        }
                    }).then(resp => {
                        setLoader(false)
                        message.success(resp.message)
                        onClose()
                        getDatas()
                        setSavevisible(true)
                        setUpdatevisible(false)
                        setEntityVisible(false);
                        setShowResults(true)
                        setShowForm(false)
                    }).catch(err => {
                        setLoader(false)

                        //  fields['ftdOprName'] = tempOprName
                        setFields({ ...fields })
                        setErrors({ ...initialErrorMessages })
                        message.error(err.message || err)
                    })
                }
            }
            else {
                ItrApiService.GET({
                    url: API_URLS.GET_COMPANY_MASTER_BY_ID + "/" + entityID + "/" + eCode + "/" + eName,
                    appCode: "CNF"
                }).then(res => {
                    //  alert(res.Success);
                    if (res.Success == false) {
                        if (validation) {
                            setLoader(true)

                            ApiCall({
                                method: "POST",
                                path: API_URLS.SAVE_COMPANY_MASTER,
                                data: {
                                    ...fields,
                                    hostName: getHostName()
                                }
                            }).then(resp => {
                                setLoader(false)
                                message.success(resp.message)
                                onClose()
                                getDatas()
                                setSavevisible(true)
                                setUpdatevisible(false)
                                setEntityVisible(false);
                                setShowResults(true)
                                setShowForm(false)
                            }).catch(err => {
                                setLoader(false)
                                setFields({ ...fields })
                                setErrors({ ...initialErrorMessages })
                                message.error(err.message || err)
                            })
                        }
                    }
                    else {

                        setLoader(false);
                        // if (buyCode.toUpperCase() === res.data.buyCode.toUpperCase()) {
                        err = "Company Details Already Available"
                        message.error(err)
                        // }
                    }
                });


            }

        }
    }
    const [tableProps, setTableProps] = useState({
        page: 0,
        rowsPerPage: 10,
        sortOrder: {
            name: 'buyDivCode',
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
            name: "entityID",
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div onClick={() => edit(tm.rowData[1], tm.rowData[2], tm.rowData[3], 'edit')}>
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
            name: "entityID",
            label: "entityID",
        },
        {
            name: "eCode",
            label: "eCode",
        },
        {
            name: "eName",
            label: "eName",
        },
        {
            name: "address1",
            label: "address1",
        },
        {
            name: "address2",
            label: "address2",
        },
        {
            name: "address3",
            label: "address3",
        },
        {
            name: "city",
            label: "city",
        },
        {
            name: "pinCode",
            label: "pinCode",
        },

        // {
        //     name: "loccode",
        //     label: "loccode"
        // },  

        {
            name: "country",
            label: "country",
        },
        {
            name: "tngstNo",
            label: "tngstNo",
        },
        {
            name: "tinNo",
            label: "tinNo",
        },
        {
            name: "tanNo",
            label: "tanNo",
        },
        {
            name: "cinNo",
            label: "cinNo",
        },
        {
            name: "cstNo",
            label: "cstNo",
        },
        {
            name: "cstDate",
            label: "cstDate",
        },

        {
            name: "panNo",
            label: "panNo"
        },

        {
            name: "stNo",
            label: "stNo",
        },
        {
            name: "areaCode",
            label: "areaCode",
        },
        {
            name: "emailId",
            label: "emailId",
        },
        {
            name: "contPerson1",
            label: "contPerson1",
        },
        {
            name: "contPerson2",
            label: "contPerson2",
        },
        {
            name: "contNo",
            label: "contNo",
        },
        {
            name: "gstNo",
            label: "gstNo",
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

    const getDataById = (entityID, eCode, eName) => {

        return ApiCall({
            path: API_URLS.GET_COMPANY_MASTER_BY_ID + "/" + entityID + "/" + eCode + "/" + eName,

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
    const edit = async (entityID, eCode, eName, type) => {
        try {
            setLoader(true);
            setVisible(true);
            setShowResults(false);
            setShowForm(true);
            let { data } = (entityID && await getDataById(entityID, eCode, eName))
            if (!data) {
                message.error("Data not found")
                return
            }
            const tableId = type === 'clone' ? 0 : 0
            setFields({
                // id: tableId,                    
                entityID: data.entityID,
                eCode: data.eCode,
                eName: data.eName,
                address1: data.address1,
                address2: data.address2,
                address3: data.address3,
                city: data.city,
                pinCode: data.pinCode,
                country: data.country,
                tngstNo: data.tngstNo,
                tinNo: data.tinNo,
                tanNo: data.tanNo,
                cinNo: data.cinNo,
                cstNo: data.cstNo,
                cstDate: data.cstDate,
                panNo: data.panNo,
                stNo: data.stNo,

                areaCode: data.areaCode,
                emailId: data.emailId,
                contPerson1: data.contPerson1,
                contPerson2: data.contPerson2,
                contNo: data.contNo,
                gstNo: data.gstNo,

                active: data.active
            })
            setEntityVisible(true);
            setSavevisible(false);
            setUpdatevisible(true);
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
                                    {countryList.map((v, index) => {
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
                                    {countryList.map((v, index) => {
                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
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
                                    {countryList.map((v, index) => {
                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
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
                                value={fields.matCode} minLength="1" maxLength="10"
                                onChange={inputOnChange("matCode")} disabled={entityVisible}
                            />
                        </div>

                        <div class="col-lg-3">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Buyer Division<span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{fields.buyDivcode === '' ? errors.buyDivcode : ''}</small>
                            </div>
                            <div class="main-select">
                                <select name="somename" className='form-control form-control-sm mt-1'
                                    required
                                    value={fields.buyDivcode}
                                    onChange={inputOnChange("buyDivcode")}                                >
                                    <option value=""> Select Buyer Division</option>
                                    {countryList.map((v, index) => {
                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                    })}
                                </select>
                            </div>
                            {/* <input className='form-control form-control-sm mt-1' placeholder='Enter buyDivcode'
                                value={fields.buyDivcode} minLength="1" maxLength="100"
                                onChange={inputOnChange("buyDivcode")} disabled={entityVisible}
                            /> */}
                        </div>
                        <div class="col-lg-3">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Material Description<span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{fields.matDesc === '' ? errors.matDesc : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter Material Description'
                                value={fields.matDesc} minLength="1" maxLength="3"
                                onChange={inputOnChange("matDesc")} disabled={entityVisible}
                            />
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
                                                {/* <small className='text-danger'>{fields.fibreContent === '' ? errors.fibreContent : ''}</small> */}
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter Fiber'
                                                //value={fields.fibreContent} minLength="1" maxLength="100"
                                                onChange={inputOnChange("fibre")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Content<span className='text-danger'>  </span> </label>
                                                {/* <small className='text-danger'>{fields.address2 === '' ? errors.address2 : ''}</small> */}
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter Content'
                                               // value={fields.address2} minLength="1" maxLength="100"
                                                onChange={inputOnChange("Content")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Fabric Content<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.fibreContent === '' ? errors.fibreContent : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Fabric Content'
                                                value={fabricfields.fibreContent} minLength="1" maxLength="100"
                                                onChange={inputOnChange("fibreContent")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Fabric Type<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.fabricType === '' ? errors.fabricType : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter fabricType'
                                                value={fabricfields.fabricType} minLength="1" maxLength="50"
                                                onChange={inputOnChange("fabricType")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Fab Weave<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.fabWeave === '' ? errors.fabWeave : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter fabWeave'
                                                value={fabricfields.fabWeave} minLength="1" maxLength="15"
                                                onChange={inputOnChange("fabWeave")}
                                            />
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
                                                    value={fabricfields.country}
                                                    onChange={inputOnChange("dyeProcess")}
                                                >
                                                    <option value=""> Select Dye Process</option>
                                                    {countryList.map((v, index) => {
                                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                    })}

                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Address 1<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.yarnWarp === '' ? errors.yarnWarp : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter YarnWarp'
                                                value={fabricfields.yarnWarp} minLength="1" maxLength="100"
                                                onChange={inputOnChange("yarnWarp")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>YarnWeft<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.yarnWeft === '' ? errors.yarnWeft : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter yarnWeft'
                                                value={fabricfields.yarnWeft} minLength="1" maxLength="100"
                                                onChange={inputOnChange("yarnWeft")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>WarpYarnBlend<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.warpYarnBlend === '' ? errors.warpYarnBlend : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter warpYarnBlend'
                                                value={fabricfields.warpYarnBlend} minLength="1" maxLength="100"
                                                onChange={inputOnChange("warpYarnBlend")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Weft YarnBlend<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.weftYarnBlend === '' ? errors.weftYarnBlend : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter weftYarnBlend'
                                                value={fabricfields.weftYarnBlend} minLength="1" maxLength="50"
                                                onChange={inputOnChange("weftYarnBlend")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Ends PerInch<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.endsPerInch === '' ? errors.endsPerInch : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter endsPerInch'
                                                value={fabricfields.endsPerInch} minLength="1" maxLength="15"
                                                onChange={inputOnChange("endsPerInch")}
                                            />
                                        </div>

                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>PickPerInch <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.pickPerInch === '' ? errors.pickPerInch : ''}</small>
                                            </div>
                                            {/* <label>Country</label>
                                        <small className='text-danger'>{fields.country === '' ? errors.country : ''}</small> */}
                                            <div class="main-select">
                                                <select name="somename" className='form-control form-control-sm mt-1'
                                                    required
                                                    value={fabricfields.pickPerInch}
                                                    onChange={inputOnChange("pickPerInch")}
                                                >
                                                    <option value=""> Select pickPerInch</option>
                                                    {countryList.map((v, index) => {
                                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                    })}

                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>ShrinkWarp<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.shrinkWarp === '' ? errors.shrinkWarp : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter shrinkWarp'
                                                value={fabricfields.shrinkWarp} minLength="1" maxLength="100"
                                                onChange={inputOnChange("shrinkWarp")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>ShrinkWeft<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.shrinkWeft === '' ? errors.shrinkWeft : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter shrinkWeft'
                                                value={fabricfields.shrinkWeft} minLength="1" maxLength="100"
                                                onChange={inputOnChange("shrinkWeft")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>WashMethod<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.washMethod === '' ? errors.washMethod : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter washMethod'
                                                value={fabricfields.washMethod} minLength="1" maxLength="100"
                                                onChange={inputOnChange("washMethod")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>FabWt_BW<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.fabWt_BW === '' ? errors.fabWt_BW : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter fabWt_BW'
                                                value={fabricfields.fabWt_BW} minLength="1" maxLength="50"
                                                onChange={inputOnChange("fabWt_BW")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>FabWt_AW<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.fabWt_AW === '' ? errors.fabWt_AW : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter fabWt_AW'
                                                value={fabricfields.fabWt_AW} minLength="1" maxLength="15"
                                                onChange={inputOnChange("fabWt_AW")}
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
                                                    onChange={inputOnChange("weightUom")}
                                                >
                                                    <option value=""> Select weightUom</option>
                                                    {countryList.map((v, index) => {
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
                                                value={fabricfields.actualWidth} minLength="1" maxLength="100"
                                                onChange={inputOnChange("actualWidth")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Cut Width<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.cutWidth === '' ? errors.cutWidth : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter cutWidth'
                                                value={fabricfields.cutWidth} minLength="1" maxLength="100"
                                                onChange={inputOnChange("cutWidth")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Width Uom<span className='text-danger'>  </span> </label>
                                                <small className='text-danger'>{fabricfields.widthUom === '' ? errors.widthUom : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter widthUom'
                                                value={fabricfields.widthUom} minLength="1" maxLength="100"
                                                onChange={inputOnChange("widthUom")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Physical Finish<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.physicalFinish === '' ? errors.physicalFinish : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter physicalFinish'
                                                value={fabricfields.physicalFinish} minLength="1" maxLength="50"
                                                onChange={inputOnChange("physicalFinish")}
                                            />
                                        </div>
                                        <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Chemical Finish<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.chemicalFinish === '' ? errors.chemicalFinish : ''}</small>
                                            </div>
                                            <input className='form-control form-control-sm mt-1' placeholder='Enter chemicalFinish'
                                                value={fabricfields.chemicalFinish} minLength="1" maxLength="15"
                                                onChange={inputOnChange("chemicalFinish")}
                                            />
                                        </div>

                                        {/* <div class="col-lg-2">
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Country <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{fabricfields.country === '' ? errors.country : ''}</small>
                                            </div>                                           
                                            <div class="main-select">
                                                <select name="somename" className='form-control form-control-sm mt-1'
                                                    required
                                                    value={fabricfields.country}
                                                    onChange={inputOnChange("country")}
                                                >
                                                    <option value=""> Select country</option>
                                                    {countryList.map((v, index) => {
                                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                                    })}

                                                </select>
                                            </div>
                                        </div> */}
                                        

                                    </div>
                                </div>
                            }

<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="home-tab">
                                <div class="row mt-15">
                                <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Quality <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{threadfields.quality === '' ? errors.quality : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter quality'
                                            value={threadfields.quality} minLength="1" maxLength="50"
                                            onChange={inputOnChange("quality")}
                                        />
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Tex<span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{threadfields.tex === '' ? errors.tex : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter tex'
                                            value={threadfields.tex} minLength="1" maxLength="10"
                                            onChange={inputOnChange("tex")}
                                        />
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Tkt<span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{threadfields.tkt === '' ? errors.tkt : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter tkt'
                                            value={threadfields.tkt} minLength="1" maxLength="50"
                                            onChange={inputOnChange("tkt")}
                                        />
                                    </div>


                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>NoOfMtr <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{threadfields.noOfMtr === '' ? errors.noOfMtr : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter NoOfMtr'
                                            value={threadfields.noOfMtr} minLength="1" maxLength="50"
                                            onChange={inputOnChange("noOfMtr")}
                                        />
                                    </div>
                                   
                                </div>
                            </div>

                            <div class="tab-pane fade" id="profile1" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="row mt-15">

                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Article No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{trimsfields.articleNo === '' ? errors.articleNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter articleNo'
                                            value={trimsfields.articleNo} minLength="1" maxLength="50"
                                            onChange={inputOnChange("articleNo")}
                                        />
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Product<span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{trimsfields.product === '' ? errors.product : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter product'
                                            value={trimsfields.product} minLength="1" maxLength="10"
                                            onChange={inputOnChange("product")}
                                        />
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Finish<span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{trimsfields.finish === '' ? errors.finish : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter finish'
                                            value={trimsfields.finish} minLength="1" maxLength="50"
                                            onChange={inputOnChange("finish")}
                                        />
                                    </div>


                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Remarks <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.noOfMtr === '' ? errors.noOfMtr : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Remarks'
                                            value={trimsfields.noOfMtr} minLength="1" maxLength="50"
                                            onChange={inputOnChange("noOfMtr")}
                                        />
                                    </div>
                                   

                                </div>
                            </div>
                           
                            <div class="tab-pane fade" id="profile2" role="tabpanel" aria-labelledby="home-tab">
                                <div class="row mt-15">
                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Email Id <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.matCode === '' ? errors.matCode : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter matCode'
                                            value={purchasefields.matCode} minLength="1" maxLength="50"
                                            onChange={inputOnChange("matCode")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact Person1 <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.contPerson1 === '' ? errors.contPerson1 : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact Person1'
                                            value={purchasefields.contPerson1} minLength="1" maxLength="50"
                                            onChange={inputOnChange("contPerson1")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact Person2 <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.contPerson2 === '' ? errors.contPerson2 : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact Person2'
                                            value={purchasefields.contPerson2} minLength="1" maxLength="50"
                                            onChange={inputOnChange("contPerson2")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.contNo === '' ? errors.contNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact No'
                                            value={purchasefields.contNo} minLength="1" maxLength="25"
                                            onChange={inputOnChange("contNo")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.contNo === '' ? errors.contNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact No'
                                            value={purchasefields.contNo} minLength="1" maxLength="25"
                                            onChange={inputOnChange("contNo")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Area Code <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.areaCode === '' ? errors.areaCode : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Area Code'
                                            value={purchasefields.areaCode} minLength="1" maxLength="25"
                                            onChange={inputOnChange("areaCode")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>GST No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.gstNo === '' ? errors.gstNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter GST No'
                                            value={purchasefields.gstNo} minLength="1" maxLength="30"
                                            onChange={inputOnChange("gstNo")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Email Id <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.matCode === '' ? errors.matCode : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter matCode'
                                            value={purchasefields.matCode} minLength="1" maxLength="50"
                                            onChange={inputOnChange("matCode")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact Person1 <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.contPerson1 === '' ? errors.contPerson1 : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact Person1'
                                            value={purchasefields.contPerson1} minLength="1" maxLength="50"
                                            onChange={inputOnChange("contPerson1")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact Person2 <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.contPerson2 === '' ? errors.contPerson2 : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact Person2'
                                            value={purchasefields.contPerson2} minLength="1" maxLength="50"
                                            onChange={inputOnChange("contPerson2")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.contNo === '' ? errors.contNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact No'
                                            value={purchasefields.contNo} minLength="1" maxLength="25"
                                            onChange={inputOnChange("contNo")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.contNo === '' ? errors.contNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact No'
                                            value={purchasefields.contNo} minLength="1" maxLength="25"
                                            onChange={inputOnChange("contNo")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Area Code <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.areaCode === '' ? errors.areaCode : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Area Code'
                                            value={purchasefields.areaCode} minLength="1" maxLength="25"
                                            onChange={inputOnChange("areaCode")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>GST No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.gstNo === '' ? errors.gstNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter GST No'
                                            value={purchasefields.gstNo} minLength="1" maxLength="30"
                                            onChange={inputOnChange("gstNo")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Email Id <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.matCode === '' ? errors.matCode : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter matCode'
                                            value={purchasefields.matCode} minLength="1" maxLength="50"
                                            onChange={inputOnChange("matCode")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact Person1 <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.contPerson1 === '' ? errors.contPerson1 : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact Person1'
                                            value={purchasefields.contPerson1} minLength="1" maxLength="50"
                                            onChange={inputOnChange("contPerson1")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact Person2 <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.contPerson2 === '' ? errors.contPerson2 : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact Person2'
                                            value={purchasefields.contPerson2} minLength="1" maxLength="50"
                                            onChange={inputOnChange("contPerson2")}
                                        />
                                    </div>

                                    <div className='col-lg-2'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{purchasefields.contNo === '' ? errors.contNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact No'
                                            value={purchasefields.contNo} minLength="1" maxLength="25"
                                            onChange={inputOnChange("contNo")}
                                        />
                                    </div>

                                    {/* <div className='col-lg-3'>
                                        <label>{fields.active === 'Y' ? 'Active' : 'In Active'}</label>
                                        <div className='mt-1'>
                                            <Switch size='default'
                                                checked={fields.active === 'Y'}
                                                onChange={(e) => setFields({ ...fields, active: e ? 'Y' : 'N' })} />
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-content-center pt-20 pb-20 justify-content-center sticky-bottom">

                            <div class=" ">
                                <button class="btn btn-primary search-btn btn-block ml-10" onClick={close}>Back</button>
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
                                }}> Cancel </button>
                            </div>
                            <div class="">
                                {Savevisible && <button class="btn btn-success search-btn btn-block ml-10" disabled={loader} onClick={() => Save(fields.entityID, fields.eCode, fields.eName, 'save')}>Save</button>}
                                {updatevisible && <button class="btn btn-success search-btn btn-block ml-10" disabled={loader} onClick={() => Save(fields.entityID, fields.eCode, fields.eName, 'update')}>Update</button>}
                                {/* <button class="btn btn-success search-btn btn-block ml-10" onClick={save}>Save</button> */}
                            </div>
                            {/* <button disabled={loader} className='btn-sm btn defect-master-save mt-1 w-100' onClick={save}> {fields.id === 0 ? "Save" : "Update"} </button> */}

                        </div>
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