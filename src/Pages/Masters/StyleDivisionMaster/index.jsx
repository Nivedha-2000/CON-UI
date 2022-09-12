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

const requiredFields = ["fashionGroup", "productType", "styleDivision", "subProductType", "avgSAM"],
    initialErrorMessages = {
        id: 0,
        fashionGroup: "",
        productType: "",
        styleDivision: "",
        subProductType: "",
        avgSAM: 0,
        Active: 'Y'
    },
    initialFieldValues = {
        id: 0,
        fashionGroup: "",
        productType: "",
        styleDivision: "",
        subProductType: "",
        avgSAM: 0,
        Active: 'Y'
    };

function StyleDivisionMaster({ name }) {
    const [visible, setVisible] = useState(false);
    const [fashionGroupList, setfashionGroupList] = useState([]);
    const [productTypeList, setproductTypeList] = useState([]);
    const [styleDivisionList, setstyleDivisionList] = useState([]);
    const [subProductTypeList, setsubProductTypeList] = useState([]);
    const [subavgSAMList, setavgSAMList] = useState([]);


    const [fields, setFields] = useState({
        ...initialFieldValues
    });
    const [listLoading, setListLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    });
    const [saveVisible, setSaveVisible] = useState(true);
    const [updateVisible, setUpdateVisible] = useState(false);

    const clearFields = () => {
        setFields({
            ...initialFieldValues
        });
        setErrors({ ...initialErrorMessages });
    }

    const onClose = () => {
        clearFields()
        setVisible(false);
    };

    const showDrawer = () => {
        setVisible(true);
        setSaveVisible(true)
        setUpdateVisible(false)
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
        getProductType();
        getDatas();
        // getLocationMaster()
        getFashionGroup();
    }, []);

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };


    const getProductType = () => {
        ApiCall({
            path: API_URLS.GET_PRODUCTTYPE_MASTER_LIST
        }).then(resp => {
            try {
                console.log(resp.data);
                setproductTypeList(resp.data.map(d => ({ code: d.productType, codeDesc: d.productType })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }
    const getFashionGroup = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.FASHIONGROUP
        }).then(resp => {
            try {
                setfashionGroupList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
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
            path: API_URLS.GET_STYLEDIV_MASTER_LIST
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


    const inputOnChange = name => e => {
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'profitPercent') {
            const re = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['profitPercent'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['profitPercent'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'fashionGroup' || name === 'productType' || name === 'styleDivision' || name === 'subProductType') {
            setFields({ ...fields, [name]: value.toUpperCase() })
        }
        else {
            setFields({ ...fields, [name]: value })
        }

    }
    const save = async (fashionGroup, productType, styleDivision, subProductType, Type) => {
        if (loader) return
        let err = {}, validation = true
        debugger;
        requiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            }
        })
        // if (fields.transitdays==0){
        //     err['transitdays'] = "Should be greater than zero."
        //     validation = false
        // }

        setErrors({ ...initialErrorMessages, ...err })

        if (validation) {
            setLoader(true)
            if (Type == "update") {
                ApiCall({
                    method: "POST",
                    path: API_URLS.SAVE_STYLEDIV_MASTER,
                    data: {
                        ...fields,
                        hostName: getHostName()
                    }
                }).then(resp => {
                    setLoader(false)
                    message.success(resp.message)
                    onClose()
                    getDatas()
                }).catch(err => {
                    setLoader(false)
                    setFields({ ...fields })
                    setErrors({ ...initialErrorMessages })
                    message.error(err.message || err)
                })
            } else {

                debugger;
                ItrApiService.GET({
                    url: API_URLS.GET_STYLEDIV_MASTER_BY_ID + "/" + fashionGroup + "/" + productType + "/" + styleDivision + "/" + subProductType,
                    appCode: "CNF"
                }).then(res => {
                    if (res.Success == false) {
                        ApiCall({
                            method: "POST",
                            path: API_URLS.SAVE_STYLEDIV_MASTER,
                            data: {
                                ...fields,
                                hostName: getHostName()
                            }
                        }).then(resp => {
                            setLoader(false)
                            message.success(resp.message)
                            onClose()
                            getDatas()
                        }).catch(err => {
                            setLoader(false)
                            setFields({ ...fields })
                            setErrors({ ...initialErrorMessages })
                            message.error(err.message || err)
                        })
                    }
                    else {
                        setLoader(false);
                        if (fashionGroup.toUpperCase() === res.data.fashionGroup.toUpperCase() && productType.toUpperCase() === res.data.productType.toUpperCase() && styleDivision.toUpperCase() === res.data.styleDivision.toUpperCase() && subProductType.toUpperCase() === res.data.subProductType.toUpperCase()) {
                            err = "Fashion Group Already Available"
                            message.error(err)

                        }
                    }
                });

            }

        }
    }

    const [tableProps, setTableProps] = useState({
        page: 0,
        rowsPerPage: 10,
        sortOrder: {
            name: 'fashionGroup',
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
            name: "fashionGroup",
            label: "Fashion Group"
        },
        {
            name: "productType",
            label: "Product Type"
        },
        {
            name: "styleDivision",
            label: "Style Division"
        },
        {
            name: "subProductType",
            label: "Sub Product Type"
        },
        {
            name: "avgSAM",
            label: "Avg SAM"
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
        },
        {
            name: "fashionGroup",
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div onClick={() => edit(tm.rowData[0], tm.rowData[1], tm.rowData[2], tm.rowData[3], 'edit')}>
                                <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
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

    const getDataById = (fashionGroup, productType, styleDivision, subProductType) => {
        // console.log(API_URLS.GET_MATERIALTYPE_BY_ID + "/" + id)
        return ApiCall({
            path: API_URLS.GET_STYLEDIV_MASTER_BY_ID + "/" + fashionGroup + "/" + productType + "/" + styleDivision + "/" + subProductType,
        })
    }
    const add = async () => {
        try {
            setLoader(true)
            setVisible(true);
            clearFields()
            setLoader(false)
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    };
    const edit = async (fashionGroup, productType, styleDivision, subProductType, type) => {
        //  console.log(fashionGroup,productType,styleDivision,subProductType)
        try {
            setLoader(true)
            setVisible(true);
            setSaveVisible(false)
            setUpdateVisible(true)
            let { data } = (fashionGroup && await getDataById(fashionGroup, productType, styleDivision, subProductType))
            //  console.log(data);
            if (!data) {
                message.error("Data not found")
                return
            }


            // console.log(data.active);
            setFields({

                fashionGroup: data.fashionGroup,
                productType: data.productType,
                styleDivision: data.styleDivision,
                subProductType: data.subProductType,
                avgSAM: data.avgSAM,
                Active: data.active
            })
            setLoader(false)
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    }

    //console.log(fields)
    const NUMBER_IS_FOCUS_IN_ZERO = name => (e) => {
        if (e.target.value == "0" || e.target.value == "" || e.target.value == undefined) {
            //    setprofitPercentList({ ...profitPercentList, [name]: "" });
            setFields({ ...fields, [name]: "" })
        }
    }
    const NUMBER_IS_FOCUS_OUT_ZERO = name => (e) => {
        if (e.target.value == "" || e.target.value == undefined) {
            setFields({ ...fields, [name]: 0 })
        }
    }

    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>{name}</h6>

                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mt-1'>
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                        <button className='btn-sm btn defect-master-add' onClick={showDrawer}> + Add New </button>
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
            <Drawer
                maskClosable={false}
                keyboard={false}
                footer={
                    <>
                        <div>
                            {
                                saveVisible && <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={() => save(fields.fashionGroup, fields.productType, fields.styleDivision, fields.subProductType, 'save')}> Save </button>

                            }{
                                updateVisible && <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={() => save(fields.fashionGroup, fields.productType, fields.styleDivision, fields.subProductType, 'update')}> Update </button>
                            }


                            {/* {
                                !loader ?
                                    <button disabled={loader} className='btn-sm btn defect-master-save mt-1 w-100' onClick={save}> {fields.id === 0 ? "Save" : "Update"} </button>
                                    : (
                                        <div className="text-center">
                                            <Spin style={{ color: '#F57234' }} tip="Loading..." />
                                        </div>
                                    )
                            } */}
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={(e) => {
                                let _id = Number(fields.id)
                                if (_id === 0) add()
                                else edit(_id)
                            }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > {`${fields.id === 0 ? "Add New" : "Edit"} Style Division Master`}</h6 >} placement="right" onClose={() => {
                    clearFields();
                    onClose();
                }} visible={visible} >
                <div className='defect-master-add-new'>
                    {/* <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Material Type Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.Type === '' ? errors.Type : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                                value={fields.Type}
                                onChange={inputOnChange("Type")}                            
                        >
                            <option value=""> Select Material Type</option>
                             <option value="F"> F </option>
                             <option value="T"> T </option>
                             <option value="O"> O </option>
                        </select>
                    </div> */}

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Fashion Group <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.fashionGroup === '' ? errors.fashionGroup : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={fields.fashionGroup}
                            onChange={inputOnChange("fashionGroup")}
                            disabled={fields.id != 0}
                        >
                            <option value=""> Select fashion Group</option>
                            {fashionGroupList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Product Type <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.productType === '' ? errors.productType : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={fields.productType}
                            onChange={inputOnChange("productType")}
                            disabled={fields.id != 0}
                        >
                            <option value=""> Select product Type </option>
                            {productTypeList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })}
                        </select>
                    </div>


                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Style Division <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.styleDivision === '' ? errors.styleDivision : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter style Division '
                            value={fields.styleDivision} maxLength="50"
                            id="styleDivision"
                            disabled={fields.id != 0}
                            onChange={inputOnChange("styleDivision")}
                            required />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Sub Product Type <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.subProductType === '' ? errors.subProductType : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={fields.subProductType}
                            onChange={inputOnChange("subProductType")}
                            disabled={fields.id != 0}
                        >
                            <option value=""> Select Sub product Type </option>
                            <option value="LADIESDRESS"> LADIES DRESS </option>
                            <option value="CARGOSHORT"> CARGO SHORT </option>
                            <option value="SHORTS5PKT"> SHORTS 5 PKT </option>
                        </select>
                    </div>


                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Avg SAM </label>
                            <small className='text-danger'>{errors.avgSAM ? errors.avgSAM : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter avg SAM'
                            value={fields.avgSAM} minLength="1" maxLength="10"
                            onChange={inputOnChange("avgSAM")}
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("avgSAM")}
                            onBlur={NUMBER_IS_FOCUS_OUT_ZERO("avgSAM")}
                        />
                    </div>

                    <div className='mt-3'>
                        <label>{fields.Active === 'Y' ? 'Active' : 'In Active'}</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={fields.Active === 'Y'}
                                onChange={(e) => setFields({ ...fields, Active: e ? 'Y' : 'N' })} />
                        </div>
                    </div>
                </div>
            </Drawer>
        </div >
    )
}

StyleDivisionMaster.propTypes = {
    name: PropTypes.string
}

export default StyleDivisionMaster;