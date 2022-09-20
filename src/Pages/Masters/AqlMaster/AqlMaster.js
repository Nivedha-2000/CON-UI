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


const requiredFields = ["aqlType", "auditFormat", "unitCode", "buyerCode", "packQtyFrom", "packQtyTo", "sampleSize", "noofCtnsFrom", "noofCtnsTo", "packSamples",
    //  "sampleSize", "mesurementPcs", "maxAllowVisualDefects", "maxAllowCriticalDefects", "maxAllowSewDefects",
    //     "maxAllowOthDefects", "maxAllowMesurementDefects"
],
    requiredFieldsHeader = ["aqlType", "auditFormat", "unitCode", "buyerCode"],
    initialErrorMessages = {
        id: 0,
        aqlType: "",
        auditFormat: "",
        unitCode: "",
        buyerCode: "",
        active: "",

        noofCtnsFrom: "",
        noofCtnsTo: "",
        packSamples: "",
        maxAllowPackDefects: "",

        packQtyFrom: "",
        packQtyTo: "",
        sampleSize: "",
        mesurementPcs: "",
        maxAllowVisualDefects: "",
        maxAllowCriticalDefects: "",
        maxAllowSewDefects: "",
        maxAllowOthDefects: "",
        maxAllowMesurementDefects: "",

        createdDate: "2022-08-17T09:51:51.057Z",
        createdBy: "",
        modifiedDate: "2022-08-17T09:51:51.057Z",
        modifiedBy: "",
        isActive: "",
        hostName: "",
        aqlpkDetlModels: [
            {
                id: 0,
                aqlHead_ID: 0,
                noofCtnsFrom: 0,
                noofCtnsTo: 0,
                packSamples: 0,
                maxAllowPackDefects: 0,
                active: "",

                createdDate: "2022-08-17T09:51:51.057Z",
                createdBy: "",
                modifiedDate: "2022-08-17T09:51:51.057Z",
                modifiedBy: "",
                isActive: "",
                hostName: "",
            }
        ],
        aqlvmDetlModels: [
            {
                id: 0,
                aqlHead_ID: 0,
                packQtyFrom: 0,
                packQtyTo: 0,
                sampleSize: 0,
                mesurementPcs: 0,
                maxAllowVisualDefects: 0,
                maxAllowCriticalDefects: 0,
                maxAllowSewDefects: 0,
                maxAllowOthDefects: 0,
                maxAllowMesurementDefects: 0,
                active: "",

                createdDate: "2022-08-17T09:51:51.057Z",
                createdBy: "",
                modifiedDate: "2022-08-17T09:51:51.057Z",
                modifiedBy: "",
                isActive: "",
                hostName: "",
            }
        ]
    },
    initialFieldValues = {
        id: 0,
        aqlType: "",
        auditFormat: "",
        unitCode: "",
        buyerCode: "",
        active: "Y",

        createdDate: "2022-08-17T09:51:51.057Z",
        createdBy: "",
        modifiedDate: "2022-08-17T09:51:51.057Z",
        modifiedBy: "",
        isActive: true,
        hostName: "",
        aqlpkDetlModels: [
            // {
            //     id: 0,
            //     aqlHead_ID: 0,
            //     noofCtnsFrom: 0,
            //     noofCtnsTo: 0,
            //     packSamples: 0,
            //     maxAllowPackDefects: 0,
            //     active: "Y",

            //     createdDate: "2022-08-17T09:51:51.057Z",
            //     createdBy: "",
            //     modifiedDate: "2022-08-17T09:51:51.057Z",
            //     modifiedBy: "",
            //     isActive: true,
            //     hostName: "",
            // }
        ],
        aqlvmDetlModels: [
            // {
            //     id: 0,
            //     aqlHead_ID: 0,
            //     packQtyFrom: 0,
            //     packQtyTo: 0,
            //     sampleSize: 0,
            //     mesurementPcs: 0,
            //     maxAllowVisualDefects: 0,
            //     maxAllowCriticalDefects: 0,
            //     maxAllowSewDefects: 0,
            //     maxAllowOthDefects: 0,
            //     maxAllowMesurementDefects: 0,
            //     active: "Y",

            //     createdDate: "2022-08-17T09:51:51.057Z",
            //     createdBy: "",
            //     modifiedDate: "2022-08-17T09:51:51.057Z",
            //     modifiedBy: "",
            //     isActive: true,
            //     hostName: "",
            // }
        ]
    },
    test = {
        id: 0,
        aqlHead_ID: 0,
        packQtyFrom: "",
        packQtyTo: "",
        sampleSize: "",
        mesurementPcs: 0,
        maxAllowVisualDefects: 0,
        maxAllowCriticalDefects: 0,
        maxAllowSewDefects: 0,
        maxAllowOthDefects: 0,
        maxAllowMesurementDefects: 0,
        active: "Y",

        createdDate: "2022-08-17T09:51:51.057Z",
        createdBy: "",
        modifiedDate: "2022-08-17T09:51:51.057Z",
        modifiedBy: "",
        isActive: true,
        hostName: "",
    },
    pkDetlModels = {
        id: 0,
        aqlHead_ID: 0,
        noofCtnsFrom: "",
        noofCtnsTo: "",
        packSamples: "",
        maxAllowPackDefects: 0,
        active: "Y",

        createdDate: "2022-08-17T09:51:51.057Z",
        createdBy: "",
        modifiedDate: "2022-08-17T09:51:51.057Z",
        modifiedBy: "",
        isActive: true,
        hostName: "",
    }
export default function AqlMaster() {
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    })
    const [fields, setFields] = useState({
        ...initialFieldValues
    });
    const [visualSampling, setVisualSampling] = useState({
        ...test
    });
    const [packAuditSampling, setPackAuditSampling] = useState({
        ...pkDetlModels
    });
    const [aqlList, setAqlList] = useState([]);
    const [unitCodeList, setUnitCodeList] = useState([]);
    const [auditFormatList, setAuditFormatList] = useState([]);
    const [buyDivCodeList, setBuyDivCodeList] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [visible, setVisible] = useState(true);
    const [packQtyvisible, setPackQtyVisible] = useState(true);
    const [cartonFromvisible, setCartonFromVisible] = useState(true);
    const [btnvisible, setBtnVisible] = useState(false);
    const [btnPasvisible, setBtnPasVisible] = useState(false);
    const [addBtnVisible, setAddBtnVisible] = useState(true);
    const [addBtnPasVisible, setAddBtnPasVisible] = useState(true);
    const [editVisible, setEditVisible] = useState(true);

    const [headerDisable, setHeaderDisable] = useState(false);
    const [cartonvisible, setCartonVisible] = useState(true);


    useEffect(() => {
        // alert(visible);
        getAqlType();
        getAuditFormat();
        getUnitCode();
        getBuyerDivCode();
        //  txtdisabled();
        // console.log(fields.aqlvmDetlModels.length)
        // console.log(errors.aqlvmDetlModels.length)
        // debugger;
    }, []);

    const getAqlType = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.AQLTYPE
        }).then(resp => {
            try {
                setAqlList(resp.data.map(d => ({ code: d.code, codeDesc: d.code })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }
    const getAuditFormat = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.AUDFORMAT
        }).then(resps => {
            try {
                setAuditFormatList(resps.data.map(d => ({ code: d.code, codeDesc: d.code })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }
    const getUnitCode = () => {
        ApiCall({
            path: API_URLS.GET_UNIT_MASTER_LIST
        }).then(resps => {
            try {
                setUnitCodeList(resps.data.filter(d => d.active == "Y").map(d => ({ uCode: d.uCode, uCode: d.uCode })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getBuyerDivCode = () => {
        // ApiCall({
        //     path: API_URLS.GET_BUYERDIVISION_MASTER_LIST
        // }).then(resps => {
        //     try {
        //         setBuyDivCodeList(resps.data.filter(d => d.active == "Y").map(d => ({ buyDivCode: d.buyDivCode, buyCode: d.buyCode })))
        //     } catch (e) {
        //         message.error("response is not as expected")
        //     }
        // }).catch(err => {
        //     message.error(err.message || err)
        // })


        ItrApiService.GET({
            url: 'BuyerDivMaster/GetAllBuyerDivInfo',
            appCode: "ENAPP003"
        }).then(res => {
            console.log(res)
            if (res.Success == true) {
                //  setLoader(false);
                setBuyDivCodeList(res.data.filter(d => d.active == "Y").
                    map(d => ({ buyDivCode: d.buyDivCode, buyCode: d.buyCode })))

            }
            else {
                message.warning('Something went wrong');
                // setLoader(false);
            }
        });
    }
    function AddVisualSamplingPlan(aqlType, auditFormat, unitCode, buyerCode) {
        debugger;
        setVisible(false);
        setPackQtyVisible(false);
        clearFieldsVisualSam();
        clearFieldsPackAuditSam();
        setAddBtnVisible(true)
        setBtnVisible(false);
        setAddBtnPasVisible(true)
        setBtnPasVisible(false);
        setCartonFromVisible(false);

        let err = {}, validation = true
        requiredFieldsHeader.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
                return false;

            } else {
                validation = true

            }
        })
        setErrors({ ...initialErrorMessages, ...err })
        console.log(validation)
        if (validation) {
            setHeaderDisable(true);
            ApiCall({
                path: API_URLS.GET_AQLMASTERADD_LIST + "?aqltype=" + aqlType + "&auditformat=" + auditFormat + "&unitcode=" + unitCode + "&buyercode=" + buyerCode,
            }).then(respp => {
                let result = respp.data;
                setFields(result)


            }).catch(err => {
                setFields({ ...fields, aqlvmDetlModels: [], aqlpkDetlModels: [] });

                message.error(err.message || err)

            })
        }
    }

    const clearFieldsVisualSam = () => {
        setVisualSampling({
            ...test
        });
        setErrors({ ...initialErrorMessages });
    }

    function ClearBtn() {
        clearFields()
        setHeaderDisable(false);
    }

    const clearFieldsPackAuditSam = () => {
        setPackAuditSampling({
            ...pkDetlModels
        });
        setErrors({ ...initialErrorMessages });
    }
    function ResetVisualSamPlan() {
        clearFieldsVisualSam();
        setAddBtnVisible(true)
        setBtnVisible(false);
        setPackQtyVisible(false);
    }

    function AddVisualSamPlan() {
        debugger;
        let err = {}, validation = true
        debugger;
        requiredFields.forEach(f => {
            if (visualSampling[f] === "") {
                err[f] = "This field is required"
                validation = false
                return false;
            }
            // else if (fields[f] === "") {
            //     err[f] = "This field is required"
            //     validation = false
            //     return false;
            // }
            // else if (fields.aqlvmDetlModels[f] === "") {
            //     err[f] = "This field is required"
            //     validation = false
            //     return false;
            // }

            else {
                validation = true
            }
        })
        setErrors({ ...initialErrorMessages, ...err })
        debugger;
        // fields.aqlvmDetlModels.push(visualSampling)
        // clearFieldsVisualSam();



        let len = fields.aqlvmDetlModels.filter(a => a.active == 'Y').length;
        //  if (fields.aqlvmDetlModels.length > 0) {
        let packqtyF = 0;
        let packqtyT = 0;

        if (len > 0 && validation == true) {
            packqtyF = parseInt(fields.aqlvmDetlModels[len - 1].packQtyTo);
            let CurPackqtyF = parseInt(visualSampling.packQtyFrom);
            let CurpackqtyT = parseInt(visualSampling.packQtyTo);
            if (parseInt(packqtyF, 10) < parseInt(CurPackqtyF, 10) && parseInt(packqtyF, 10) < parseInt(CurpackqtyT, 10)) {
                if (visualSampling.sampleSize > 0) {
                    fields.aqlvmDetlModels.push(visualSampling)
                    console.log(fields);
                    clearFieldsVisualSam();
                } else {
                    message.error("Please enter sample Size .....!")
                }

            } else {
                message.error("This range of Pack-Qty From & Pack-Qty To already exists.....!")
            }
        } else {
            if (visualSampling.packQtyFrom > 0 && visualSampling.sampleSize > 0) {
                fields.aqlvmDetlModels.push(visualSampling)
                console.log(fields);
                clearFieldsVisualSam();
            }
        }
        //}


    }
    function ResetPackAudit() {
        clearFieldsPackAuditSam();
        setAddBtnPasVisible(true)
        setBtnPasVisible(false);
        setCartonFromVisible(false);

    }

    function AddPackAuditSamPlan() {
        let err = {}, validation = true
        requiredFields.forEach(f => {
            if (packAuditSampling[f] === "") {
                err[f] = "This field is required"
                validation = false
                return false;
            } else {
                validation = true
            }
        })
        setErrors({ ...initialErrorMessages, ...err })
        debugger;
        let len = fields.aqlpkDetlModels.filter(a => a.active == 'Y').length;
        let CartonF = 0;
        let CartonT = 0;

        if (len > 0) {
            CartonF = parseInt(fields.aqlpkDetlModels[len - 1].noofCtnsTo);
            let CurCartonF = parseInt(packAuditSampling.noofCtnsFrom);
            let CurCartonT = parseInt(packAuditSampling.noofCtnsTo);
            if (parseInt(CartonF, 10) < parseInt(CurCartonF, 10) && parseInt(CartonF, 10) < parseInt(CurCartonT, 10)) {
                if (packAuditSampling.packSamples > 0) {
                    fields.aqlpkDetlModels.push(packAuditSampling)
                    clearFieldsPackAuditSam();
                    console.log(fields)
                } else {
                    message.error("Please enter pack Samples .....!")
                }

            } else {
                message.error("This range of Carton From & Carton To already exists.....!")

            }
        } else {
            if (packAuditSampling.noofCtnsFrom > 0) {
                clearFieldsPackAuditSam();
                fields.aqlpkDetlModels.push(packAuditSampling)
                console.log(fields)
            }
        }
        //  }

    }

    function UpdateVisualSamPlan() {
        setAddBtnVisible(true)
        setBtnVisible(false);
        console.log(fields.aqlvmDetlModels.filter(q => q.id == visualSampling.id)[0]);
        console.log(visualSampling);
        // fields.aqlvmDetlModels.filter(q=>q.id ==visualSampling.id)[0].push(visualSampling)

        debugger;
        let toUpdateData = fields.aqlvmDetlModels.map((item) => {
            if (item.id === visualSampling.id) {
                item.aqlHead_ID = visualSampling.aqlHead_ID;
                item.packQtyFrom = visualSampling.packQtyFrom;
                item.packQtyTo = visualSampling.packQtyTo;
                item.sampleSize = visualSampling.sampleSize;
                item.mesurementPcs = visualSampling.mesurementPcs;
                item.maxAllowVisualDefects = visualSampling.maxAllowVisualDefects;
                item.maxAllowCriticalDefects = visualSampling.maxAllowCriticalDefects;
                item.maxAllowSewDefects = visualSampling.maxAllowSewDefects;
                item.maxAllowOthDefects = visualSampling.maxAllowOthDefects;
                item.maxAllowMesurementDefects = visualSampling.maxAllowMesurementDefects;
                item.active = visualSampling.active;
                item.createdDate = visualSampling.createdDate;
                item.createdBy = visualSampling.createdBy;
                item.modifiedDate = visualSampling.modifiedDate;
                item.modifiedBy = visualSampling.modifiedBy;
                item.isActive = visualSampling.isActive;
                item.hostName = visualSampling.hostName;
            }
            return item;
        });
        setVisualSampling({ ...toUpdateData });
        clearFieldsVisualSam();
        setPackQtyVisible(false);
    }

    function UpdatePackAuditSamPlan() {
        debugger;
        setAddBtnPasVisible(true)
        setBtnPasVisible(false);
        let toUpdatePackAuditSamPlan = fields.aqlpkDetlModels.map((item1) => {
            if (item1.id === packAuditSampling.id) {
                item1.aqlHead_ID = packAuditSampling.aqlHead_ID;
                item1.noofCtnsFrom = packAuditSampling.noofCtnsFrom;
                item1.noofCtnsTo = packAuditSampling.noofCtnsTo;
                item1.packSamples = packAuditSampling.packSamples;
                item1.maxAllowPackDefects = packAuditSampling.maxAllowPackDefects;
                item1.active = packAuditSampling.active;
                item1.createdDate = packAuditSampling.createdDate;
                item1.createdBy = packAuditSampling.createdBy;
                item1.modifiedDate = packAuditSampling.modifiedDate;
                item1.modifiedBy = packAuditSampling.modifiedBy;
                item1.isActive = packAuditSampling.isActive;
                item1.hostName = packAuditSampling.hostName;
            }
            return item1;
        });
        setPackAuditSampling({ ...toUpdatePackAuditSamPlan });
        clearFieldsPackAuditSam();
        setCartonFromVisible(false);
    }
    const editVisualSampling = (packQtyFrom) => {
        // debugger;
        setEditVisible(false)
        setBtnVisible(true);
        setAddBtnVisible(false);
        setPackQtyVisible(true);
        if (packQtyFrom != '') {
            // console.log(fields.aqlvmDetlModels.filter(a => a.id == row));
            setVisualSampling(fields.aqlvmDetlModels.filter(a => a.packQtyFrom == packQtyFrom)[0]);
        }
    };

    const removeVisualSampling = (row) => {
        debugger;
        if (row != '') {
            // let toUpdateData1 = fields.aqlvmDetlModels.filter(a => a.id != row);
            // toUpdateData1.active=
            // console.log(toUpdateData1);
            // setFields({ ...fields, aqlvmDetlModels: toUpdateData1 });
            // fields.aqlvmDetlModels=[];
            // fields.aqlvmDetlModels.push(toUpdateData1)
            // console.log(fields);


            let toUpdateData1 = fields.aqlvmDetlModels.map((item) => {
                if (item.packQtyFrom === row) {
                    item.active = "N";
                }
                return item;
            });
            setVisualSampling({ ...toUpdateData1 });
        }
    }

    const removepkDetl = (row1) => {
        //  alert(row1);
        debugger;
        let toUpdatePackAuditSamPlan1 = fields.aqlpkDetlModels.map((item1) => {
            if (item1.noofCtnsFrom === row1) {
                item1.active = "N";
            }
            return item1;
        });
        setPackAuditSampling({ ...toUpdatePackAuditSamPlan1 });
        console.log(fields)
        // ApiCall({
        //     method: "POST",
        //     path: API_URLS.POST_AQLMASTER,
        //     data: {
        //         ...fields
        //     }
        // }).then(resp => {
        //     setLoader(false)
        //     message.success("Remove Success")
        //     // onClose();
        //     // setHeaderDisable(false);
        // }).catch(err => {
        //     setLoader(false)
        //     setFields({ ...fields })
        //     setErrors({ ...initialErrorMessages })
        //     message.error(err.message || err)
        // })

    }

    const editpkDetl = (row1) => {
        setCartonFromVisible(true);
        setBtnPasVisible(true);
        setAddBtnPasVisible(false);

        if (row1 != '') {
            // console.log(fields.aqlvmDetlModels.filter(a => a.id == row));
            setPackAuditSampling(fields.aqlpkDetlModels.filter(a => a.noofCtnsFrom == row1)[0]);
        }
    }

    function AqlMastsave() {
        //console.log(fields.aqlpkDetlModels.filter(d=>d.noofCtnsFrom>0) && fields.aqlvmDetlModels.filter(a=>a.packQtyFrom>0));
        console.log(fields);

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
            //   setLoader(true)
            let len = fields.aqlvmDetlModels.filter(f => f.active == "Y").length;
            let len1 = fields.aqlpkDetlModels.filter(f => f.active == "Y").length;
            if (len > 0 && len1 > 0) {
                ApiCall({
                    method: "POST",
                    path: API_URLS.POST_AQLMASTER,
                    data: {
                        ...fields
                    }
                }).then(resp => {
                    setLoader(false)
                    message.success(resp.message)
                    onClose();
                    setHeaderDisable(false);
                }).catch(err => {
                    setLoader(false)
                    setFields({ ...fields })
                    setErrors({ ...initialErrorMessages })
                    message.error(err.message || err)
                })
            } else {
                message.error("Please add atleast one record in Visual Sampling Plan & Pack Audit Sampling Plan...!")
            }


        }
    }

    const Measurementvalidation = name => e => {
        let value = e.target.value
        if (name === 'mesurementPcs' || name === 'maxAllowMesurementDefects') {
            debugger;
            let MP = visualSampling.mesurementPcs;
            let MAMD = visualSampling.maxAllowMesurementDefects;

            //   let tot = parseInt(CD) + parseInt(SD) + parseInt(OD);
            if (parseInt(MP, 10) < parseInt(MAMD, 10)) {
                setVisualSampling({ ...visualSampling, [name]: '' });
                alert('Measurement Defect should be less than Measurement Pcs .....! ')
            }
        }
    }
    const PackDefectvalidation = name => e => {
        let value = e.target.value
        if (name === 'packSamples' || name === 'maxAllowPackDefects') {
            debugger;
            let PS = packAuditSampling.packSamples;
            let MAPD = packAuditSampling.maxAllowPackDefects;

            //   let tot = parseInt(CD) + parseInt(SD) + parseInt(OD);
            if (parseInt(PS, 10) < parseInt(MAPD, 10)) {
                setPackAuditSampling({ ...packAuditSampling, [name]: '' });
                alert('Pack Defect should be less than Pack Sample .....! ')
            }
        }
    }


    const Defvalidation = name => e => {
        let value = e.target.value
        debugger;
        if (name === 'maxAllowVisualDefects1') {

            let VD = visualSampling.maxAllowVisualDefects === "" ? 0 : visualSampling.maxAllowVisualDefects;
            let CD = visualSampling.maxAllowCriticalDefects === "" ? 0 : visualSampling.maxAllowCriticalDefects;
            let SD = visualSampling.maxAllowSewDefects === "" ? 0 : visualSampling.maxAllowSewDefects;
            let OD = visualSampling.maxAllowOthDefects === "" ? 0 : visualSampling.maxAllowOthDefects;
            let tot = parseInt(CD) + parseInt(SD) + parseInt(OD);
            if (parseInt(VD, 10) < parseInt(tot, 10)) {
                setVisualSampling({ ...visualSampling, [maxAllowCriticalDefects]: 0 });
                //setVisualSampling({...visualSampling.maxAllowVisualDefects=0});
                message.error('Should not be less than Critical defect + Sewing Defect + Other Defect .....! ')
                return false;
            }
        }
        else if (name === 'maxAllowCriticalDefects' || name === 'maxAllowSewDefects' || name === 'maxAllowOthDefects') {
            let VD = visualSampling.maxAllowVisualDefects === "" ? 0 : visualSampling.maxAllowVisualDefects;
            let CD = visualSampling.maxAllowCriticalDefects === "" ? 0 : visualSampling.maxAllowCriticalDefects;
            let SD = visualSampling.maxAllowSewDefects === "" ? 0 : visualSampling.maxAllowSewDefects;
            let OD = visualSampling.maxAllowOthDefects === "" ? 0 : visualSampling.maxAllowOthDefects;
            let tot = parseInt(CD) + parseInt(SD) + parseInt(OD);
            if (parseInt(VD, 10) < parseInt(tot, 10)) {
                setVisualSampling({ ...visualSampling, [name]: 0 });
                message.error('Should not be greater than Visual Defect .....! ')
                return false;
            }
        } else {

        }
    }



    const inputOnChange = name => e => {
        debugger;
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'packQtyFrom') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setVisualSampling({ ...visualSampling, [name]: value });
                err['packQtyFrom'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['packQtyFrom'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'packQtyTo') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setVisualSampling({ ...visualSampling, [name]: value });
                err['packQtyTo'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['packQtyTo'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'sampleSize') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setVisualSampling({ ...visualSampling, [name]: value });
                err['sampleSize'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['sampleSize'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'mesurementPcs') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setVisualSampling({ ...visualSampling, [name]: value });
                err['mesurementPcs'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['mesurementPcs'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'maxAllowVisualDefects') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setVisualSampling({ ...visualSampling, [name]: value });
                err['maxAllowVisualDefects'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['maxAllowVisualDefects'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'maxAllowCriticalDefects') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setVisualSampling({ ...visualSampling, [name]: value });
                err['maxAllowCriticalDefects'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['maxAllowCriticalDefects'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'maxAllowSewDefects') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setVisualSampling({ ...visualSampling, [name]: value });
                err['maxAllowSewDefects'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['maxAllowSewDefects'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'maxAllowOthDefects') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setVisualSampling({ ...visualSampling, [name]: value });
                err['maxAllowOthDefects'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['maxAllowOthDefects'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'maxAllowMesurementDefects') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setVisualSampling({ ...visualSampling, [name]: value });
                err['maxAllowMesurementDefects'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['maxAllowMesurementDefects'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else {
            setVisualSampling({ ...visualSampling, [name]: value })
        }

    }
    const inputOnChange2 = name => e => {
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'noofCtnsFrom') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setPackAuditSampling({ ...packAuditSampling, [name]: value });
                err['noofCtnsFrom'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['noofCtnsFrom'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'noofCtnsTo') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setPackAuditSampling({ ...packAuditSampling, [name]: value });
                err['noofCtnsTo'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['noofCtnsTo'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'packSamples') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setPackAuditSampling({ ...packAuditSampling, [name]: value });
                err['packSamples'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['packSamples'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'maxAllowPackDefects') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setPackAuditSampling({ ...packAuditSampling, [name]: value });
                err['maxAllowPackDefects'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['maxAllowPackDefects'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else {
            setPackAuditSampling({ ...packAuditSampling, [name]: value })
        }

    }
    const inputOnChange1 = name => e => {
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'transitdays') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['transitdays'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['transitdays'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        } else {
            setFields({ ...fields, [name]: value })
        }

    }

    const clearFields = () => {
        setFields({
            ...initialFieldValues
        });
        setVisualSampling({
            ...test
        });
        setPackAuditSampling({
            ...pkDetlModels
        })
        // setFields([]);

        setErrors({ ...initialErrorMessages });
    }

    const NUMBER_IS_FOCUS_IN_ZERO = name => (e) => {
        if (e.target.value == "0" || e.target.value == "" || e.target.value == undefined) {
            //    setprofitPercentList({ ...profitPercentList, [name]: "" });
            setVisualSampling({ ...visualSampling, [name]: "" })
        }
    }
    const NUMBER_IS_FOCUS_OUT_ZERO = name => (e) => {
        if (e.target.value == "" || e.target.value == undefined) {
            setVisualSampling({ ...visualSampling, [name]: 0 })
        }
    }

    const onClose = () => {
        clearFields()
        setVisible(false);
    };

    return (
        <div class="container-fluid" >
            <div class="breadcrumb-header justify-content-between bread-list">
                <div class="w-100">
                    <div class="d-flex border-bottom pb-15">
                        <div class="me-auto ">
                            <a href="#myCollapse" data-bs-toggle="collapse" aria-expanded="true" class="text-black">
                                <h4 class="content-title float-start pr-20 border-0">
                                    {/* <span class="pr-10">
                                        <img src={breadcrumbIcon} alt="" />
                                    </span> */}
                                    &nbsp; AQL Master
                                </h4>
                            </a>
                        </div>
                        <div class="pt-15"></div>
                    </div>
                    <div class="col-lg"></div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="row mt-15 dis-sel mt-20">
                <div class="col-lg">
                    <label>AQL Type <span className='text-danger'>*  </span></label>

                    <div class="main-select">
                        <select name="somename" class="form-control SlectBox main-select" required
                            value={fields.aqlType}
                            onChange={inputOnChange1("aqlType")}
                            disabled={headerDisable}
                        >
                            <option value="">Select AQL Type </option>
                            {aqlList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.code}</option>
                            })}
                        </select>
                        <small className='text-danger'>{fields.aqlType === '' ? errors.aqlType : ''}</small>
                    </div>
                </div>
                <div class="col-lg">
                    <label>Audit Format <span className='text-danger'>*  </span></label>

                    <div class="main-select">
                        <select name="somename" class="form-control SlectBox main-select" required
                            value={fields.auditFormat}
                            onChange={inputOnChange1("auditFormat")}
                            disabled={headerDisable}
                        >
                            <option value="">Select Audit Format</option>
                            {/* <option value="I">I</option>
                            <option value="II">II</option> */}
                            {auditFormatList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.code}</option>
                            })}

                        </select>
                        <small className='text-danger'>{fields.auditFormat === '' ? errors.auditFormat : ''}</small>
                    </div>
                </div>
                <div class="col-lg">
                    <label>Unit Code <span className='text-danger'>*  </span></label>

                    <select name="somename" class="form-control SlectBox main-select" required
                        value={fields.unitCode}
                        onChange={inputOnChange1("unitCode")}
                        disabled={headerDisable}
                    >
                        <option value="">Select Unit Code </option>
                        {unitCodeList.map((v, index) => {
                            return <option key={index} value={v.uCode}>{v.uCode}</option>
                        })}
                    </select>
                    <small className='text-danger'>{fields.unitCode === '' ? errors.unitCode : ''}</small>
                </div>
                <div class="col-lg">
                    <label>Buyer Div Code<span className='text-danger'>*  </span></label>

                    <select name="somename" class="form-control SlectBox main-select" required
                        value={fields.buyerCode}
                        onChange={inputOnChange1("buyerCode")}
                        disabled={headerDisable}
                    >
                        <option value="">Select Buyer Div Code </option>
                        {buyDivCodeList.map((v, index) => {
                            return <option key={index} value={v.buyDivCode}>{v.buyDivCode}</option>
                        })}
                    </select>
                    <small className='text-danger'>{fields.buyerCode === '' ? errors.buyerCode : ''}</small>
                </div>

                <div class="col-lg pt-20 ">
                    <button class="btn btn-secondary search-btn btn-block"
                        onClick={() => AddVisualSamplingPlan(fields.aqlType, fields.auditFormat, fields.unitCode, fields.buyerCode)}
                    >View</button>
                </div>
                <div class="col-lg pt-20 ">
                    <button class="btn btn-secondary search-btn btn-block"
                        onClick={() => ClearBtn()}
                    >Clear</button>
                </div>
            </div>
            <div class="row mt-25 main-tab pl-15 pr-15">
                <ul class="nav nav-tabs p-15 pl-15" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                            type="button" role="tab" aria-controls="home" aria-selected="true">Visual Sampling Plan </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile1" type="button" role="tab" aria-controls="profile" aria-selected="false">Pack Audit Sampling plan</button>
                    </li>
                </ul>
                <div class="tab-content p-15" id="myTabContent">
                    <div class="tab-pane fade show active mb-70" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div class="row mt-15">
                            <div className='col-lg'>
                                <div className='form-group'  >
                                    <label>Pack-Qty From<span className='text-danger'>*  </span></label>
                                    {/* <small className='text-danger'>{fields.aqlvmDetlModels.packQtyFrom === '' ? errors.aqlvmDetlModels.packQtyFrom : ''}</small> */}
                                    <input type="text" class="form-control disabled " placeholder='Enter Pack-Qty From'
                                        value={visualSampling.packQtyFrom}
                                        id="packQtyFrom"
                                        disabled={packQtyvisible}
                                        maxLength="6"
                                        onChange={inputOnChange("packQtyFrom")}
                                        autoComplete="off"
                                        onFocus={NUMBER_IS_FOCUS_IN_ZERO("packQtyFrom")}
                                        onBlur={NUMBER_IS_FOCUS_OUT_ZERO("packQtyFrom")}
                                    />
                                    <small className='text-danger'>{visualSampling.packQtyFrom === '' ? errors.packQtyFrom : ''}</small>

                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Pack-Qty To<span className='text-danger'>*  </span></label>
                                    <input type="text" class="form-control" placeholder='Enter Pack-Qty To'
                                        value={visualSampling.packQtyTo}
                                        id="packQtyTo"
                                        maxLength="6"
                                        // disabled={visible}
                                        disabled={packQtyvisible}
                                        onChange={inputOnChange("packQtyTo")}
                                        autoComplete="off"
                                        onFocus={NUMBER_IS_FOCUS_IN_ZERO("packQtyTo")}
                                        onBlur={NUMBER_IS_FOCUS_OUT_ZERO("packQtyTo")}
                                    />
                                    <small className='text-danger'>{visualSampling.packQtyTo === '' ? errors.packQtyTo : ''}</small>
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Sample Size<span className='text-danger'>*  </span></label>
                                    <input type="text" class="form-control" placeholder='Enter Sample Size'
                                        //  value={visualSampling.sampleSize == 0 ? '' : visualSampling.sampleSize}
                                        value={visualSampling.sampleSize}
                                        id="sampleSize"
                                        maxLength="4"
                                        onChange={inputOnChange("sampleSize")} disabled={visible}
                                        autoComplete="off"
                                    // onFocus={NUMBER_IS_FOCUS_IN_ZERO("sampleSize")}
                                    // onBlur={NUMBER_IS_FOCUS_OUT_ZERO("sampleSize")}
                                    />
                                    <small className='text-danger'>{visualSampling.sampleSize === '' ? errors.sampleSize : ''}</small>
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Visual Defect</label>
                                    <input type="text" class="form-control" placeholder='Enter Visual Defect'
                                        value={visualSampling.maxAllowVisualDefects == '' ? 0 : visualSampling.maxAllowVisualDefects}
                                        id="maxAllowVisualDefects"
                                        disabled={visible}
                                        maxLength="4"
                                        onChange={inputOnChange("maxAllowVisualDefects")}
                                        onBlur={Defvalidation("maxAllowVisualDefects")}
                                        autoComplete="off"
                                    // onFocus={NUMBER_IS_FOCUS_IN_ZERO("maxAllowVisualDefects")}
                                    // onBlur={NUMBER_IS_FOCUS_OUT_ZERO("maxAllowVisualDefects")}
                                    />
                                    <small className='text-danger'>{visualSampling.maxAllowVisualDefects === '' ? errors.maxAllowVisualDefects : ''}</small>
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Critical Defect</label>
                                    <input type="text" class="form-control" placeholder='Enter Critical Defect'
                                        value={visualSampling.maxAllowCriticalDefects == '' ? 0 : visualSampling.maxAllowCriticalDefects}
                                        id="maxAllowCriticalDefects"
                                        disabled={visible}
                                        maxLength="4"
                                        onChange={inputOnChange("maxAllowCriticalDefects")}
                                        onBlur={Defvalidation("maxAllowCriticalDefects")}
                                        autoComplete="off"
                                    />
                                    <small className='text-danger'>{visualSampling.maxAllowCriticalDefects === '' ? errors.maxAllowCriticalDefects : ''}</small>
                                </div>
                            </div>

                        </div>
                        <div class="row mt-15">
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Sewing Defect</label>
                                    <input type="text" class="form-control" placeholder='Enter Sewing Defect'
                                        value={visualSampling.maxAllowSewDefects == '' ? 0 : visualSampling.maxAllowSewDefects}
                                        id="maxAllowSewDefects"
                                        disabled={visible}
                                        maxLength="4"
                                        onChange={inputOnChange("maxAllowSewDefects")}
                                        onBlur={Defvalidation("maxAllowSewDefects")}
                                        autoComplete="off"
                                    />
                                    <small className='text-danger'>{visualSampling.maxAllowSewDefects === '' ? errors.maxAllowSewDefects : ''}</small>
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Other Defect</label>
                                    <input type="text" class="form-control" placeholder='Enter Other Defect'
                                        value={visualSampling.maxAllowOthDefects == '' ? 0 : visualSampling.maxAllowOthDefects}
                                        id="maxAllowOthDefects"
                                        disabled={visible}
                                        maxLength="4"
                                        onChange={inputOnChange("maxAllowOthDefects")}
                                        onBlur={Defvalidation("maxAllowOthDefects")}
                                        autoComplete="off"
                                    />
                                    <small className='text-danger'>{visualSampling.maxAllowOthDefects === '' ? errors.maxAllowOthDefects : ''}</small>
                                </div>
                            </div>

                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Measurement Pcs</label>
                                    <input type="text" class="form-control" placeholder='Enter Measurement  Pcs'
                                        value={visualSampling.mesurementPcs == '' ? 0 : visualSampling.mesurementPcs}
                                        id="mesurementPcs"
                                        disabled={visible}
                                        maxLength="4"
                                        onChange={inputOnChange("mesurementPcs")}
                                        autoComplete="off"
                                        onBlur={Measurementvalidation("mesurementPcs")}
                                    />
                                    <small className='text-danger'>{visualSampling.mesurementPcs === '' ? errors.mesurementPcs : ''}</small>
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Measurement Defect</label>
                                    <input type="text" class="form-control" placeholder='Enter Measurement Defect'
                                        value={visualSampling.maxAllowMesurementDefects == '' ? 0 : visualSampling.maxAllowMesurementDefects}
                                        id="maxAllowMesurementDefects"
                                        disabled={visible}
                                        maxLength="4"
                                        onChange={inputOnChange("maxAllowMesurementDefects")}
                                        autoComplete="off"
                                        onBlur={Measurementvalidation("maxAllowMesurementDefects")}
                                    />
                                    <small className='text-danger'>{visualSampling.maxAllowMesurementDefects === '' ? errors.maxAllowMesurementDefects : ''}</small>
                                </div>
                            </div>
                            <div className='col-lg'></div>
                        </div>
                        <div className='row d-flex my-xl-auto right-content'>
                            <div class="col-5 mg-t-10 mg-md-t-0 p-0 mr-10">
                                <div class="float-start">
                                    <button class="btn btn-primary search-btn btn-block  " onClick={() => ResetVisualSamPlan()}>Reset</button>
                                </div>
                                <div class="float-start pl-5">

                                    {
                                        addBtnVisible && < button class="btn btn-primary search-btn btn-block" onClick={() => AddVisualSamPlan()}>Add to List</button>
                                    }
                                </div>
                                <div class="float-start pl-5">
                                    {
                                        btnvisible && <button class="btn btn-primary search-btn btn-block" onClick={() => UpdateVisualSamPlan()} >  Update List</button>
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
                                            <th>Edit</th>
                                            <th>Remove</th>
                                            {/* <th class="">SlNo</th> */}
                                            <th class="">Pack-Qty From</th>
                                            <th class="">Pack-Qty To</th>
                                            <th class="">Sample Size</th>
                                            <th>Critical Defect (Max Allowed)</th>
                                            <th>Sewing Defect (Max Allowed)</th>
                                            <th>Other Defect (Max Allowed)</th>
                                            <th>Visual Defect (Max Allowed)</th>
                                            <th>Mesurement Pcs</th>
                                            <th>Mesurement Defect (Max Allowed)</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* if(visible=="True") */}
                                        {

                                            fields.aqlvmDetlModels.filter(f => f.active == "Y").map((row, index) => (
                                                <tr key={index}>
                                                    <td align='center'>
                                                        <div className='text-center' onClick={() => { editVisualSampling(row?.packQtyFrom) }}>
                                                            <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                                        </div>
                                                    </td>
                                                    <td align='center'>
                                                        <div className='text-center' onClick={() => { removeVisualSampling(row?.packQtyFrom) }}>
                                                            <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                                        </div>
                                                    </td>
                                                    {/* <td align='center'> {index + 1} </td> */}

                                                    <td align='center'>{row.packQtyFrom}</td>
                                                    <td align='center'>{row.packQtyTo}</td>
                                                    <td align='center'>{row.sampleSize}</td>
                                                    <td align='center'>{row.maxAllowCriticalDefects}</td>
                                                    <td align='center'>{row.maxAllowSewDefects}</td>
                                                    <td align='center'>{row.maxAllowOthDefects}</td>
                                                    <td align='center'>{row.maxAllowVisualDefects}</td>
                                                    <td align='center'>{row.mesurementPcs}</td>
                                                    <td align='center'>{row.maxAllowMesurementDefects}</td>

                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade mb-50" id="profile1" role="tabpanel" aria-labelledby="home-tab">
                        <div class="row mt-15">
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Carton From<span className='text-danger'>*  </span></label>
                                    <input type="text" class="form-control" placeholder='Enter Carton From' value={packAuditSampling.noofCtnsFrom == 0 ? '' : packAuditSampling.noofCtnsFrom}
                                        id="noofCtnsFrom"
                                        disabled={cartonFromvisible}
                                        maxLength="6"
                                        autoComplete='off'

                                        onChange={inputOnChange2("noofCtnsFrom")}

                                    />
                                    <small className='text-danger'>{packAuditSampling.noofCtnsFrom === '' ? errors.noofCtnsFrom : ''}</small>
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Carton To<span className='text-danger'>*  </span></label>
                                    <input type="text" class="form-control" placeholder='Enter Carton To' value={packAuditSampling.noofCtnsTo == 0 ? '' : packAuditSampling.noofCtnsTo}
                                        id="noofCtnsTo"
                                        autoComplete='off'
                                        disabled={cartonFromvisible}
                                        maxLength="6"

                                        onChange={inputOnChange2("noofCtnsTo")}

                                    />
                                    <small className='text-danger'>{packAuditSampling.noofCtnsTo === '' ? errors.noofCtnsTo : ''}</small>

                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Pack Sample</label>

                                    <input type="text" class="form-control" placeholder='Enter Pack Sample'
                                        value={packAuditSampling.packSamples == 0 ? '' : packAuditSampling.packSamples}
                                        id="packSamples"
                                        autoComplete='off'
                                        maxLength="4"
                                        onBlur={PackDefectvalidation("packSamples")}
                                        onChange={inputOnChange2("packSamples")}
                                        disabled={visible}
                                    />
                                    <small className='text-danger'>{packAuditSampling.packSamples === '' ? errors.packSamples : ''}</small>

                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Pack Defect</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Pack Defect'
                                        value={packAuditSampling.maxAllowPackDefects == 0 ? 0 : packAuditSampling.maxAllowPackDefects}
                                        id="maxAllowPackDefects"
                                        autoComplete='off'
                                        maxLength="4"
                                        onBlur={PackDefectvalidation("maxAllowPackDefects")}
                                        onChange={inputOnChange2("maxAllowPackDefects")}
                                        disabled={visible}
                                    />
                                </div>
                            </div>
                            <div className='col-lg'></div>
                        </div>
                        <div className='row d-flex my-xl-auto right-content'>
                            <div class="col-5 mg-t-10 mg-md-t-0 p-0 mr-10">
                                <div class="float-start">
                                    <button class="btn btn-primary search-btn btn-block  " onClick={() => ResetPackAudit()}>Reset</button>
                                </div>
                                <div class="float-start pl-5">
                                    {
                                        addBtnPasVisible && <button class="btn btn-primary search-btn btn-block" onClick={() => AddPackAuditSamPlan()}>Add to List</button>
                                    }
                                </div>
                                <div class="float-start pl-5">
                                    {
                                        btnPasvisible && <button class="btn btn-primary search-btn btn-block" onClick={() => UpdatePackAuditSamPlan()} >  Update List</button>
                                    }
                                </div>
                                <div class="float-start pl-5">
                                    <button class="btn btn-sm defect-master-add search-btn btn-block" onClick={() => AqlMastsave()}>Save</button>
                                </div>
                                {/* <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                                    <button className='btn-sm btn defect-master-add' > Save </button>
                                </div> */}
                            </div>
                        </div>
                        <div class="clear"></div>
                        <div id="table-scroll" class="table-scroll l-tb-1 m-fixx pt-15">
                            <div class="table-wrap">
                                <table id="example" class="table table-striped edit-np f-l1">
                                    <thead>
                                        <tr>
                                            <th align='center'>Edit</th>
                                            <th align='center'>Remove</th>
                                            {/* <th >SlNo</th> */}
                                            <th >Carton From</th>
                                            <th >Carton To</th>
                                            <th >Pack Sample</th>
                                            <th> Pack Defect (Max Allowed)</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            fields.aqlpkDetlModels.filter(f => f.active == "Y").map((row1, index) => (
                                                <tr key={index}>
                                                    <td align='center'>
                                                        <div className='text-center' onClick={() => { editpkDetl(row1?.noofCtnsFrom) }}>
                                                            <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                                        </div>
                                                    </td>
                                                    <td align='center'>
                                                        <div className='text-center' onClick={() => { removepkDetl(row1?.noofCtnsFrom) }}>
                                                            <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                                        </div>
                                                    </td>
                                                    {/* <td > {index + 1} </td> */}
                                                    <td >{row1.noofCtnsFrom}</td>
                                                    <td >{row1.noofCtnsTo}</td>
                                                    <td >{row1.packSamples}</td>
                                                    <td >{row1.maxAllowPackDefects}</td>

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