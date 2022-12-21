import React, { useRef, useMemo, useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import '../DefectMasters/DefectMasters.css';
import { Drawer, Switch, message, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import CustomTableContainer from "../../../components/Table/alter/AlterMIUITable";
import { getHostName, validateInputOnKeyup } from "../../../helpers";
import ApiCall from "../../../services"
import { API_URLS, MISCELLANEOUS_TYPES } from "../../../constants/api_url_constants";

import MedalCellRenderer from '../LineCostMaster/calculation';
import '../../../Assets/style.css'
import bootstrap from 'bootstrap/dist/js/bootstrap'
// import '../../../Assets/bootstrapstyle.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
//assets/img/delete-tbl.svg
import deletetbl from '../../../Assets/images/style/delete-tbl.svg'
import breadcrumbIcon from '../../../Assets/images/style/bred-icon.svg'
import '../../../Assets/sumoselect.css'
import jquery from '../../../Assets/js/jquerymin'


import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

// import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS


const initialErrorMessages = {
    id: 0,
    transMonth: "",
    transYear: "",
    locCode: "",
    buyCode: "",
    buyDivCode: "",
    pdcPer: 0,

},
    initialFieldValues = {
        id: 0,
        transMonth: "",
        transYear: "",
        locCode: "",
        buyCode: "",
        buyDivCode: "",
        pdcPer: 0,

    },
    requiredFields = ["transYear", "locCode", "buyDivCode"]

function PDCMaster({ name }) {
    const clearFields = () => {
        setFields({
            ...initialFieldValues
        });
        setRowData([]);
        setErrors({ ...initialErrorMessages });
    }

    const [visible, setVisible] = useState(false);
    const [datas, setDatas] = useState([]);


    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row

    const onClose = () => {
        clearFields()
        setVisible(false);
    };


    const [fields, setFields] = useState({
        ...initialFieldValues
    });


    const inputOnChange = name => e => {
        let value = e.target.value
        if (name == "unitperPack") value = validateInputOnKeyup(e)
        setFields({ ...fields, [name]: value })
    }

    const inputOnChange1 = (index, name) => e => {
        debugger;
        let err = {}, validation = true
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let value = e.target.value
            let res = rowData[index];
            let curname1 = name;
            var oData = rowData;
            res[name] = value;
            let aa = parseInt(value);
            if (parseInt(aa) > 100) {
                message.error("pdcPer equal to or more than 0 and not more than 100 ...! ")
                res["pdcPer"] = 0;
                return false;
            } else {
                const updatedObject = rowData.map((user, rowIndex) =>
                    index === rowIndex ? res : user
                );
                setRowData(updatedObject)
            }
        } else {
            err['pdcPer'] = "Please enter numbers only"
            validation = false
            setErrors({ ...errors, ...err })
        }



    }

    const [listLoading, setListLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [locationList, setLocationList] = useState([]);
    const [finyearList, setFinyearList] = useState([]);
    const [foctoryList, setFoctoryList] = useState([]);
    const [buyerList, setBuyerList] = useState([]);
    const [buyerDivisionList, setBuyerDivisionList] = useState([]);

    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    })


    const getLocationList = () => {
        ApiCall({
            path: API_URLS.GET_LOCATION_MASTER_LIST
        }).then(resp => {
            if (Array.isArray(resp.data)) {
                setLocationList(resp.data.filter(d => d.active == "Y"))
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getFinyearList = () => {

        if (fields.locCode) {
            ApiCall({
                path: API_URLS.GET_FINYEAR_MASTER_LIST
            }).then(resp => {
                try {
                    setFinyearList(resp.data.filter(a => a.locCode == fields.locCode))
                } catch (er) {
                    message.error("Response data is not as expected")
                }
            })
                .catch(err => {
                    message.error(err.message || err)
                })
        } else {
            setFinyearList([])
        }
    }

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
        setFields({ ...fields, buyDivCode: fields.id == 0 ? "" : fields.buyDivCode })
        if (fields.buyCode) {
            ApiCall({
                path: API_URLS.GET_BUYER_DIVISION_DROPDOWN + `/${fields.buyCode}`
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

    function GridDataLoad(transYear, locCode, buyDivCode) {
        debugger;
        // if (loader) return
        let err = {}, validation = true
        requiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            } else {
                validation = true
            }
        })

        setErrors({ ...initialErrorMessages, ...err })
        if (validation) {
            console.log(API_URLS.GET_PDC_MONTHWISE_LIST + "?Finyear=" + transYear + "&locCode=" + locCode + "&buyDivCode=" + buyDivCode);
            ApiCall({
                path: API_URLS.GET_PDC_MONTHWISE_LIST + "?Finyear=" + transYear + "&locCode=" + locCode + "&buyDivCode=" + buyDivCode,
            }).then(respp => {
                console.log(respp)
                if (Array.isArray(respp.data)) {
                    // setList(respp.data)
                    setRowData(respp.data)
                } else {
                    message.error("Response data is expected as array")
                }
            }).catch(err => {
                message.error(err.message || err)
            })

        }
    }

    useEffect(() => {
        getBuyerList()
        getLocationList()
        //   getFinyearList()
    }, []);
    useEffect(() => {
        if (fields.buyCode) {
            getBuyerDivisionDropDown()
        }
    }, [fields.buyCode])

    useEffect(() => {
        if (fields.locCode) {
            getFinyearList(fields.locCode)
        }
    }, [fields.locCode])

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        { field: 'transMonth', filter: true },
        {
            field: 'transYear'
            , filter: true
        },
        {
            field: 'buyDivCode'
            , filter: true
        },
        {
            field: 'pdcPer'
            , filter: true
            , editable: true
        }
    ]);

    function postPDCsave() {
        debugger;
        let err = {}, validation = true
        requiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            } else {
                validation = true
            }
        })

        setErrors({ ...initialErrorMessages, ...err })

        if ((fields.locCode != "")) {
            let validation = 'false';
            const dataset = [];
            for (const item of rowData) {

                dataset.push({
                    transMonth: item.transMonth,
                    transYear: item.transYear,
                    locCode: item.locCode,
                    buyDivCode: item.buyDivCode,
                    pdcPer: item.pdcPer,
                    createdDate: item.createdDate,
                    createdBy: "ADMIN",
                    modifiedDate: item.modifiedDate,
                    modifiedBy: "ADMIN",
                    hostName: "ADMIN"
                });
                validation = 'true';
            }
            console.log(dataset);
            if (validation) {

                ApiCall({
                    method: "POST",
                    path: API_URLS.SAVE_PDC_MASTER,
                    data: dataset
                }).then(resp => {
                    message.success(resp.message)
                    onClose();
                }).catch(err => {
                    message.error(err.message || err)
                })
            }
        } else {
            NotificationManager.error('Please Select One User');
        }
    }


    return (

        <>
            <div class="container-fluid">
                <div class="row mt-25 main-tab pl-15 pr-15">
                    <ul class="nav nav-tabs p-15 pl-15" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active1" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact"
                                type="button" role="tab" aria-controls="contact" aria-selected="false">PDC Master</button>
                        </li>
                    </ul>
                    <div class="tab-content p-15 mb-80" id="myTabContent">
                        <div class="tab-pane fade show active" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            <div class="row mt-10">
                                <div class="col-lg-4">
                                    <label>Location <span className='text-danger'>*  </span> </label>
                                    <small className='text-danger'>{errors.locCode}</small>
                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            id="locCode"
                                            value={fields.locCode} onChange={inputOnChange("locCode")} required>
                                            <option value="" hidden>Select Location Code</option>
                                            {
                                                locationList.map((t, ind) => (
                                                    <option key={ind} value={t.locCode}>{t.locName}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <label>Financial Year <span className='text-danger'>*  </span> </label>
                                    <small className='text-danger'>{fields.transYear === '' ? errors.transYear : ''}</small>
                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            required
                                            value={fields.transYear}
                                            onChange={inputOnChange("transYear")}
                                            id="transYear"
                                        >
                                            <option value=""> Financial Year</option>
                                            {
                                                finyearList.map((t, ind) => (
                                                    <option key={ind} value={t.finyear}>{t.finyear}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <label>Buyer Code <span className='text-danger'>*  </span> </label>
                                    <small className='text-danger'>{fields.buyCode === '' ? errors.buyCode : ''}</small>
                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            required
                                            value={fields.buyCode}
                                            onChange={inputOnChange("buyCode")}
                                        >
                                            <option value=""> Select buyCode</option>
                                            {buyerList.map((v, index) => {
                                                return <option key={index} value={v.buyCode}>{v.buyCode}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>


                                <div class="col-lg-4">
                                    <label>Buyer Div Code <span className='text-danger'>*  </span> </label>
                                    <small className='text-danger'>{fields.buyDivCode === '' ? errors.buyDivCode : ''}</small>
                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            required
                                            value={fields.buyDivCode}
                                            onChange={inputOnChange("buyDivCode")}
                                        >
                                            <option value=""> Select buy div Code</option>
                                            {buyerDivisionList.map((v, index) => {
                                                return <option key={index} value={v.buyDivCode}>{v.buyDivCode}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>

                                {/* <div class="col-lg-4">
                                    <label>Line Group <span className='text-danger'>*  </span> </label>
                                    <small className='text-danger'>{fields.lineGroup === '' ? errors.lineGroup : ''}</small>
                                    <input type="text" class="form-control" placeholder='Enter line Group'
                                        value={fields.lineGroup} maxLength="50"
                                        id="line-Group"
                                        onChange={inputOnChange("lineGroup")}
                                        required />
                                </div> */}

                                <div class="col-lg-1">
                                    <label></label>
                                    <button class="btn btn-success search-btn btn-block ml-10 mt-10" onClick={() => GridDataLoad(fields.transYear, fields.locCode, fields.buyDivCode)}>
                                        ADD
                                    </button>
                                </div>

                                <div class="col-lg-1 ">
                                    <label></label>
                                    <button class="btn btn-primary search-btn btn-block  ml-10 mt-10" onClick={() => onClose()}>Cancel</button>
                                </div>
                                <div class="col-lg-1">
                                    <label></label>
                                    <button class="btn btn-success search-btn btn-block ml-10 mt-10" onClick={() => postPDCsave()}>Save</button>
                                </div>
                            </div>



                            <div class="table-responsive pb-10 bg-white mt-20">
                                <div className="table-responsive pb-10 bg-white mt-20">
                                    <table id="example-1" class="table table-striped tbl-wht   text-md-nowrap">
                                        <thead>
                                            <tr>
                                                <th>SlNo</th>
                                                <th>Location</th>
                                                <th>Month</th>
                                                <th>Buyer Div Code </th>
                                                <th>PCDper </th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rowData.map((pcdcost, index) => (
                                                <tr key={index}>
                                                    <td> {index + 1} </td>
                                                    <td>{pcdcost.locCode}</td>
                                                    <td>{pcdcost.transMonth}</td>
                                                    <td>{pcdcost.buyDivCode}</td>
                                                    <td>
                                                        <input type="text" maxLength="3" className="form-control-sm mt-1" value={pcdcost.pdcPer} name={index} onChange={inputOnChange1(index, "pdcPer")} />
                                                        {/* <input type="text" className="form-control-sm mt-1" value={linecost.linecost} name={index} onChange={inputOnChange1(index, "linecost")} /> */}

                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-content-center pt-20 pb-20 justify-content-center sticky-bottom">



                    </div>
                </div>
            </div>
        </>




    )
}

PDCMaster.propTypes = {
    name: PropTypes.string
}


export default PDCMaster;