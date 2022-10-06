import React, { useState, useEffect } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Drawer, Switch, Pagination, Spin, message, Tag } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { ItrApiService } from '@afiplfeed/itr-ui';

export default function AqlMaster() {


    const clearFields = () => {
        setAqlMaster({
            ...aqlMaster,
            id: 0,
            unitCode: "",
            aqlType: "",
            auditFormat: "",
            buyerCode: "",
            packQtyFrom: 0,
            packQtyTo: 0,
            sampleSize: 0,
            mesurementPcs: 0,
            packSamples: 0,
            maxAllowVisualDefects: 0,
            maxAllowCriticalDefects: 0,
            maxAllowSewDefects: 0,
            maxAllowOthDefects: 0,
            maxAllowMesurementDefects: 0,
            maxAllowPackDefects: 0,
            active: 'Y',
            hostName: ""
        });
        setErrors({
            ...errors, unitCode: '', aqlType: '', auditFormat: '', buyerCode: '', packQtyFrom: '', packQtyTo: '', sampleSize: '', measurementPcs: '',
            packSamples: '', maxAllowVisualDefects: '', maxAllowCriticalDefects: '', maxAllowSewDefects: '', maxAllowOthDefects: '', maxAllowMesurementDefects: '', maxAllowPackDefects: ''
        });
        setexists(false);
    }

    // for-Add-new-defect-master
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    // for-Edit-new-defect-master
    const [closeDefect, setCloseDefect] = useState(false);
    const editDefect = (aqlId) => {
        setCloseDefect(true);
        ItrApiService.GET({
            url: `AQLBaseTable/GetAQLBaseById/${aqlId}`,
            appCode: "CNF",
        }).then(res => {
            if (res.Success == true) {
                setAqlMaster(res.data);
            }
            else {
                setLoader(false);
            }
        });
    };
    const cancel = () => {
        setCloseDefect(false);
    };

    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);
    const [loader, setLoader] = useState(false);

    const [aqlMaster, setAqlMaster] = useState({
        id: 0,
        unitCode: "",
        aqlType: "",
        auditFormat: "",
        buyerCode: "",
        packQtyFrom: 0,
        packQtyTo: 0,
        sampleSize: 0,
        mesurementPcs: 0,
        packSamples: 0,
        maxAllowVisualDefects: 0,
        maxAllowCriticalDefects: 0,
        maxAllowSewDefects: 0,
        maxAllowOthDefects: 0,
        maxAllowMesurementDefects: 0,
        maxAllowPackDefects: 0,
        active: 'Y',
        hostName: ""
    });

    console.log(aqlMaster);


    function test() {
        // debugger;
        // let GetMeaPcs = aqlMaster.mesurementPcs;
        // const data = { ...aqlMaster, premaxAllowMesurementDefects: (premaxAllowMesurementDefects) => premaxAllowMesurementDefects + aqlMaster.maxAllowMesurementDefects }
        // console.log(GetMeaPcs)
        // console.log(data)
        // if (data > GetMeaPcs) {
        //     alert("not allowed")
        // }

        // document.getElementById().value;
        // setAqlMaster({ ...aqlMaster,premaxAllowMesurementDefects: (premaxAllowMesurementDefects)=> premaxAllowMesurementDefects+1})
    }

    const [errors, setErrors] = useState({
        unitCode: '', aqlType: '', auditFormat: '', buyerCode: '', qtyFrom: '', qtyTo: '',
        sampleSize: '', measurementPcs: '', samples: '', visualDef: '', criticalDef: '',
        sewDef: '', othDef: '', mesDef: '', packDef: ''
    });

    const [exist, setexists] = useState(false);
    const [total, setTotal] = useState(0);
    const [temp, setTemp] = useState(0)

    const createAqlMaster = () => {
        console.log(aqlMaster)
        let { unitCode,
            aqlType,
            auditFormat,
            buyerCode,
            packQtyFrom,
            packQtyTo,
            sampleSize,
            mesurementPcs,
            packSamples,
            maxAllowVisualDefects,
            maxAllowCriticalDefects,
            maxAllowSewDefects,
            maxAllowOthDefects,
            maxAllowMesurementDefects,
            maxAllowPackDefects } = aqlMaster;

        if (unitCode == '' || aqlType == '' || auditFormat == '' || buyerCode == '' || packQtyFrom == '' || packQtyTo == '' || sampleSize == '' || mesurementPcs == '' ||
            packSamples == '' || maxAllowVisualDefects == '' || maxAllowCriticalDefects == '' || maxAllowSewDefects == '' || maxAllowOthDefects == '' || maxAllowMesurementDefects == '' || maxAllowPackDefects == '') {
            let obj = {
                unitCode: '', aqlType: '', auditFormat: '', buyerCode: '', qtyFrom: '', qtyTo: '',
                sampleSize: '', measurementPcs: '', samples: '', visualDef: '', criticalDef: '',
                sewDef: '', othDef: '', mesDef: '', packDef: ''
            }
            if (unitCode == '' || unitCode == '0' || unitCode == undefined) obj = { ...obj, unitCode: 'Unit Code is required' };
            if (aqlType == '' || aqlType == '0' || aqlType == undefined) obj = { ...obj, aqlType: 'Aql Type is required' };
            if (auditFormat == '' || auditFormat == '0' || auditFormat == undefined) obj = { ...obj, auditFormat: 'Audit Format is required' };
            if (buyerCode == '' || buyerCode == '0' || buyerCode == undefined) obj = { ...obj, buyerCode: 'Buyer Code is required' };
            if (packQtyFrom == '' || packQtyFrom == '0' || packQtyFrom == undefined) obj = { ...obj, packQtyFrom: 'Qty From is required' };
            if (packQtyTo == '' || packQtyTo == '0' || packQtyTo == undefined) obj = { ...obj, packQtyTo: 'Qty To is required' };
            if (sampleSize == '' || sampleSize == '0' || sampleSize == undefined) obj = { ...obj, sampleSize: 'Sample Size is required' };
            if (mesurementPcs == '' || mesurementPcs == '0' || mesurementPcs == undefined) obj = { ...obj, measurementPcs: 'Measurement Pcs is required' };
            if (packSamples == '' || packSamples == '0' || packSamples == undefined) obj = { ...obj, packSamples: 'Pack Sample is required' };
            if (maxAllowVisualDefects == '' || maxAllowVisualDefects == '0' || maxAllowVisualDefects == undefined) obj = { ...obj, maxAllowVisualDefects: 'Visual Defects is required' };
            if (maxAllowCriticalDefects == '' || maxAllowCriticalDefects == '0' || maxAllowCriticalDefects == undefined) obj = { ...obj, maxAllowCriticalDefects: 'CriticalDefects is required' };
            if (maxAllowSewDefects == '' || maxAllowSewDefects == '0' || maxAllowSewDefects == undefined) obj = { ...obj, maxAllowSewDefects: 'SewDefects is required' };
            if (maxAllowOthDefects == '' || maxAllowOthDefects == '0' || maxAllowOthDefects == undefined) obj = { ...obj, maxAllowOthDefects: 'Other Defects is required' };
            if (maxAllowMesurementDefects == '' || maxAllowMesurementDefects == '0' || maxAllowMesurementDefects == undefined) obj = { ...obj, maxAllowMesurementDefects: 'Measurement Defect is required' };
            if (maxAllowPackDefects == '' || maxAllowPackDefects == '0' || maxAllowPackDefects == undefined) obj = { ...obj, maxAllowPackDefects: 'Pack defects is required' };
            setErrors(obj);
        }
        else {

            if (parseInt(aqlMaster.packQtyFrom) && (parseInt(aqlMaster.packQtyFrom) < parseInt(packQtyTo))) {
                let from1 = 0;
                let from2 = 0;
                let index = datas.map((res) => res.buyerCode).lastIndexOf(aqlMaster.buyerCode);
                if (index != -1) {
                    from1 = datas[index].packQtyTo;
                }
                let index2 = datas.map((res) => res.buyerCode).indexOf(aqlMaster.buyerCode);
                if (index2 != -1) {
                    from2 = datas[index2].packQtyFrom;
                }
                console.log(from1);
                console.log(from2);
                console.log(aqlMaster.packQtyFrom);
                console.log(aqlMaster.packQtyTo);
                // console.log(to);
                console.log(aqlMaster.packQtyTo);
                if ((parseInt(aqlMaster.packQtyFrom) && (parseInt(aqlMaster.packQtyFrom) < from2 || parseInt(aqlMaster.packQtyFrom) > from1) && (parseInt(aqlMaster.packQtyFrom) < parseInt(aqlMaster.packQtyTo)))) {
                    if ((parseInt(aqlMaster.packQtyFrom) < from2 && parseInt(aqlMaster.packQtyTo) > from2)) {
                        message.warning('This range of Pack-Qty From and Pack-Qty To is already exists');
                    }
                    else {
                        setLoader(true);
                        ItrApiService.POST({
                            url: 'AQLBaseTable/SaveAQLBase',
                            appCode: "CNF",
                            data: {
                                ...aqlMaster, maxAllowCriticalDefects: parseInt(aqlMaster.maxAllowCriticalDefects),
                                maxAllowMesurementDefects: parseInt(aqlMaster.maxAllowMesurementDefects), maxAllowOthDefects: parseInt(aqlMaster.maxAllowOthDefects),
                                maxAllowPackDefects: parseInt(aqlMaster.maxAllowPackDefects), maxAllowSewDefects: parseInt(aqlMaster.maxAllowSewDefects), maxAllowVisualDefects: parseInt(aqlMaster.maxAllowVisualDefects)
                            }
                        }).then(res => {
                            if (res.Success == true) {
                                setLoader(false);
                                onClose();
                                clearFields();
                                getDatas(true);
                                message.success("AQL Created Successfully");
                            }
                            else {
                                setLoader(false);
                                message.warning(res.message);
                            }
                        });
                    }
                }
                //             if ((parseInt(aqlMaster.packQtyFrom) && (parseInt(aqlMaster.packQtyFrom) > parseInt(from1))) && (parseInt(aqlMaster.packQtyFrom) < parseInt(aqlMaster.packQtyTo))) {
                //                 setLoader(true);
                // 
                //             } 
                else {
                    message.warning('This range of Pack-Qty From and Pack-Qty To is already exists');
                }
            } else {
                message.warning('Pack Qty To should be greater than Pack Qty From')
            }


        }
    }

    const updateAqlMaster = () => {
        let { unitCode,
            aqlType,
            auditFormat,
            buyerCode,
            packQtyFrom,
            packQtyTo,
            sampleSize,
            mesurementPcs,
            packSamples,
            maxAllowVisualDefects,
            maxAllowCriticalDefects,
            maxAllowSewDefects,
            maxAllowOthDefects,
            maxAllowMesurementDefects,
            maxAllowPackDefects } = aqlMaster;

        if ((unitCode == '' || aqlType == '' || auditFormat == '' || buyerCode == '' || packQtyFrom == '' || packQtyTo == '' || sampleSize == '' || mesurementPcs == '' ||
            packSamples == '' || maxAllowVisualDefects == '' || ((maxAllowCriticalDefects == '' || maxAllowCriticalDefects == undefined) && maxAllowCriticalDefects != 0) || (maxAllowSewDefects == '' || maxAllowSewDefects == undefined) && maxAllowSewDefects != 0 || ((maxAllowOthDefects == '' || maxAllowOthDefects == undefined) && maxAllowOthDefects != 0) || maxAllowMesurementDefects == '' || maxAllowPackDefects == '')) {
            let obj = {
                unitCode: '', aqlType: '', auditFormat: '', buyerCode: '', qtyFrom: '', qtyTo: '',
                sampleSize: '', measurementPcs: '', samples: '', visualDef: '', criticalDef: '',
                sewDef: '', othDef: '', mesDef: '', packDef: ''
            }
            console.log('132456789')
            if (unitCode == '' || unitCode == '0' || unitCode == undefined) obj = { ...obj, unitCode: 'Unit Code is required' };
            if (aqlType == '' || aqlType == '0' || aqlType == undefined) obj = { ...obj, aqlType: 'Aql Type is required' };
            if (auditFormat == '' || auditFormat == '0' || auditFormat == undefined) obj = { ...obj, auditFormat: 'Audit Format is required' };
            if (buyerCode == '' || buyerCode == '0' || buyerCode == undefined) obj = { ...obj, buyerCode: 'Buyer Code is required' };
            if (packQtyFrom == '' || packQtyFrom == '0' || packQtyFrom == undefined) obj = { ...obj, packQtyFrom: 'Qty From is required' };
            if (packQtyTo == '' || packQtyTo == '0' || packQtyTo == undefined) obj = { ...obj, packQtyTo: 'Qty To is required' };
            if (sampleSize == '' || sampleSize == '0' || sampleSize == undefined) obj = { ...obj, sampleSize: 'Sample Size is required' };
            if (mesurementPcs == '' || mesurementPcs == '0' || mesurementPcs == undefined) obj = { ...obj, measurementPcs: 'Measurement Pcs is required' };
            if (packSamples == '' || packSamples == '0' || packSamples == undefined) obj = { ...obj, packSamples: 'Pack Sample is required' };
            if (maxAllowVisualDefects == '' || maxAllowVisualDefects == '0' || maxAllowVisualDefects == undefined) obj = { ...obj, maxAllowVisualDefects: 'Visual Defects is required' };
            if ((maxAllowCriticalDefects == '' || maxAllowCriticalDefects == undefined) && maxAllowCriticalDefects != 0) obj = { ...obj, maxAllowCriticalDefects: 'CriticalDefects is required' };
            if ((maxAllowSewDefects == '' || maxAllowSewDefects == undefined) && maxAllowSewDefects != 0) obj = { ...obj, maxAllowSewDefects: 'SewDefects is required' };
            if ((maxAllowOthDefects == '' || maxAllowOthDefects == undefined) && maxAllowOthDefects != 0) obj = { ...obj, maxAllowOthDefects: 'Other Defects is required' };
            if (maxAllowMesurementDefects == '' || maxAllowMesurementDefects == '0' || maxAllowMesurementDefects == undefined) obj = { ...obj, maxAllowMesurementDefects: 'Measurement Defect is required' };
            if (maxAllowPackDefects == '' || maxAllowPackDefects == '0' || maxAllowPackDefects == undefined) obj = { ...obj, maxAllowPackDefects: 'Pack defects is required' };
            setErrors(obj);
        }
        else {
            if (parseInt(aqlMaster.packQtyFrom) && (parseInt(aqlMaster.packQtyFrom) < parseInt(aqlMaster.packQtyTo))) {
                let from1 = 0;
                let from2 = 0;
                let index = datas.map((res) => res.buyerCode).lastIndexOf(aqlMaster.buyerCode);
                if (index != -1) {
                    from1 = datas[index].packQtyTo;
                }
                let index2 = datas.map((res) => res.buyerCode).indexOf(aqlMaster.buyerCode);
                if (index2 != -1) {
                    from2 = datas[index2].packQtyFrom;
                }
                console.log(from1);
                console.log(from2);
                console.log(aqlMaster.packQtyFrom);
                console.log(aqlMaster.packQtyTo);
                // console.log(to);
                console.log(aqlMaster.packQtyTo);

                setLoader(true);
                ItrApiService.POST({
                    url: `AQLBaseTable/SaveAQLBase`,
                    appCode: "CNF",
                    data: {
                        ...aqlMaster, maxAllowCriticalDefects: parseInt(aqlMaster.maxAllowCriticalDefects),
                        maxAllowMesurementDefects: parseInt(aqlMaster.maxAllowMesurementDefects), maxAllowOthDefects: parseInt(aqlMaster.maxAllowOthDefects),
                        maxAllowPackDefects: parseInt(aqlMaster.maxAllowPackDefects), maxAllowSewDefects: parseInt(aqlMaster.maxAllowSewDefects), maxAllowVisualDefects: parseInt(aqlMaster.maxAllowVisualDefects)
                    }
                }).then(res => {
                    if (res.Success == true) {
                        setLoader(false);
                        cancel();
                        clearFields();
                        getDatas(false, true);
                        message.success("AQL Updated Successfully");
                    }
                    else {
                        setLoader(false);
                        message.warning(res.message);
                    }
                })
            }
            else {
                message.warning('Pack Qty To should be greater than Pack Qty From')
            }
            // if ((parseInt(aqlMaster.packQtyFrom) && (parseInt(aqlMaster.packQtyFrom) < from2 || parseInt(aqlMaster.packQtyFrom) > from1) && (parseInt(aqlMaster.packQtyFrom) < parseInt(aqlMaster.packQtyTo)))) {
            //     if ((parseInt(aqlMaster.packQtyFrom) < from2 && parseInt(aqlMaster.packQtyTo) > from2)) {
            //         message.warning('This range of Pack-Qty From and Pack-Qty To is already exists');
            //     }
            //     
            // }
            // //             if ((parseInt(aqlMaster.packQtyFrom) && (parseInt(aqlMaster.packQtyFrom) > parseInt(from1))) && (parseInt(aqlMaster.packQtyFrom) < parseInt(aqlMaster.packQtyTo))) {
            // //                 setLoader(true);
            // // 
            // //             } 
            // else {
            //     message.warning('');
            //     message.warning('This range of Pack-Qty From and Pack-Qty To is already exists');
            // }
        }



    }

    const NUMBER_IS_FOCUS_IN_ZERO = name => (e) => {
        if (e.target.value == "0" || e.target.value == "" || e.target.value == undefined) {
            setAqlMaster({ ...aqlMaster, [name]: "" });
        }
    }

    const NUMBER_IS_FOCUS_OUT_ZERO = name => (e) => {
        if (e.target.value == "" || e.target.value == undefined) {
            setAqlMaster({ ...aqlMaster, [name]: 0 });
        }
    }

    const pageSize = 10;

    // for-list-pagination
    const [pagination, setPagination] = useState({
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0
    });

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

    const getDatas = (onCreate, onUpdate) => {
        setLoader(true);
        ItrApiService.GET({
            url: 'AQLBaseTable/GetAllAQLBase',
            appCode: "CNF"
        }).then(res => {
            console.log(res.data);
            if (res.Success == true) {
                setLoader(false);
                setDatas(res.data);
                setDatas2(res.data);
                if (onCreate && onCreate == true) {
                    setPagination({ ...pagination, totalPage: res.data.length / pageSize, minIndex: (Math.ceil(res.data.length / pageSize) - 1) * pageSize, maxIndex: Math.ceil(res.data.length / pageSize) * pageSize, current: Math.ceil(res.data.length / pageSize) });
                } else if (onUpdate && onUpdate == true) {
                    setPagination({ ...pagination, totalPage: res.data.length / pageSize });
                } else {
                    setPagination({ ...pagination, totalPage: res.data.length / pageSize, minIndex: 0, maxIndex: pageSize });
                }
                // setPagination({ ...pagination, totalPage: res.data.length / pageSize, minIndex: 0, maxIndex: pageSize });
            }
            else {
                // message.warning('Something went wrong');
                setLoader(false);
            }
        });
    }

    useEffect(() => {
        getDatas();
    }, []);


    // table-search
    const myFunction = (e) => {
        let val = datas2;
        // var input, filter, table, tr, td, i, txtValue;
        // input = document.getElementById("masterSearch");
        let ss = val.filter(dd => {
            if (dd.aqlType.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.auditFormat.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.unitCode.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.buyerCode.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.packQtyFrom.toString().toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.packQtyTo.toString().toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.sampleSize.toString().toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.mesurementPcs.toString().toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.packSamples.toString().toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.maxAllowCriticalDefects.toString().toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.maxAllowMesurementDefects.toString().toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.maxAllowOthDefects.toString().toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.maxAllowPackDefects.toString().toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.maxAllowSewDefects.toString().toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.maxAllowVisualDefects.toString().toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
        });
        console.log("------->", ss);
        setDatas(ss);
        setPagination({ ...pagination, totalPage: ss.length / pageSize, minIndex: 0, maxIndex: pageSize });
        // var input, filter, table, tr, td, i, txtValue;
        // input = document.getElementById("aqlSearch");
        // filter = input.value.toUpperCase();
        // table = document.getElementById("aqlTable");
        // tr = table.getElementsByTagName("tr");
        // for (i = 0; i < tr.length; i++) {
        //     td = tr[i].getElementsByTagName("td")[0];
        //     if (td) {
        //         txtValue = td.textContent || td.innerText;
        //         if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //             tr[i].style.display = "";
        //         } else {
        //             tr[i].style.display = "none";
        //         }
        //     }
        // }
    }

    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>AQL Master</h6>
                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1'>
                        <input type="search" className='form-control' id='aqlSearch' placeholder='Search' onChange={myFunction} />
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                        {/* <select className='form-select form-select-sm border-0'>
                            <option> All Locations </option>
                        </select> */}
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                        <button className='btn-sm btn defect-master-add' onClick={showDrawer}> + Add New </button>
                    </div>
                </div>
                <div className='table-responsive mt-2 defect-master-table'>
                    <table className="table table-hover" id='aqlTable'>
                        <thead id='table-header'>
                            <tr>
                                <th scope="col">AQL Type</th>
                                <th scope="col">Audit Format</th>
                                <th scope="col">Unit Code</th>
                                <th scope="col">Buyer Code</th>
                                <th scope="col">Pack-Qty From</th>
                                <th scope="col">Pack-Qty To</th>
                                <th scope="col">Sample Size</th>
                                <th scope="col">Mesurement Pcs</th>
                                <th scope="col">Pack Samples</th>
                                <th scope="col">Critical Defect (Max Allowed)</th>
                                <th scope="col">Mesurement Defect (Max Allowed)</th>
                                <th scope="col">Other Defect (Max Allowed)</th>
                                <th scope="col">Packing Defect (Max Allowed)</th>
                                <th scope="col">Sewing Defect (Max Allowed)</th>
                                <th scope="col">Visual Defect (Max Allowed)</th>
                                <th scope="col">Active</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((aql, index) => index >= pagination.minIndex && index < pagination.maxIndex && (
                                <tr key={index}>
                                    <td> {aql?.aqlType ? aql?.aqlType : '-'} </td>
                                    <td> {aql?.auditFormat ? aql?.auditFormat : '-'} </td>
                                    <td> {aql?.unitCode ? aql?.unitCode : '-'} </td>
                                    <td> {aql?.buyerCode ? aql?.buyerCode : '-'} </td>
                                    <td> {aql?.packQtyFrom} </td>
                                    <td> {aql?.packQtyTo} </td>
                                    <td> {aql?.sampleSize ? aql?.sampleSize : '-'} </td>
                                    <td> {aql?.mesurementPcs ? aql?.mesurementPcs : '-'} </td>
                                    <td> {aql?.packSamples ? aql?.packSamples : '-'} </td>
                                    <td> {aql?.maxAllowCriticalDefects ? aql.maxAllowCriticalDefects : '0'} </td>
                                    <td> {aql?.maxAllowMesurementDefects ? aql?.maxAllowMesurementDefects : '0'} </td>
                                    <td> {aql?.maxAllowOthDefects ? aql?.maxAllowOthDefects : '0'} </td>
                                    <td> {aql?.maxAllowPackDefects ? aql?.maxAllowPackDefects : '0'} </td>
                                    <td> {aql?.maxAllowSewDefects ? aql?.maxAllowSewDefects : '0'} </td>
                                    <td> {aql?.maxAllowVisualDefects ? aql?.maxAllowVisualDefects : '0'} </td>
                                    <td>
                                        <Tag style={{ borderRadius: '4px', backgroundColor: aql?.active == 'Y' ? 'green' : '#FF1414', color: 'white' }}
                                        >
                                            {aql?.active == 'Y' ? 'YES' : 'NO'}
                                        </Tag>
                                        {/* {aql?.active ? aql?.active : '-'} */}
                                    </td>
                                    <td>
                                        <div className='text-center' onClick={() => { editDefect(aql?.id) }}>
                                            <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {/* </>} */}
                        </tbody>
                    </table>
                    {loader && <div className='text-center mt-3'>
                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                    </div>}
                </div>
                <div className='text-end mt-3'>
                    <Pagination
                        current={pagination.current}
                        pageSize={pageSize}
                        total={datas.length}
                        onChange={handleChange}
                        responsive={true}
                        showTotal={total => `Total ${total} items`}
                    />
                </div>
            </div>

            {/* Add */}
            <Drawer
                maskClosable={false}
                keyboard={false}
                footer={
                    <>
                        <div>
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={createAqlMaster}> Save </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                onClose();
                            }
                            }> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Add Aql Master</h6 >} placement="right" onClose={() => { clearFields(); onClose() }} visible={visible} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>AQL Type <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{aqlMaster.aqlType == '' ? errors.aqlType : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter AQL Type'
                            minLength="1" maxLength="10"
                            value={aqlMaster.aqlType}
                            onChange={(e) => setAqlMaster({ ...aqlMaster, aqlType: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Audit Format <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.auditFormat == '' ? errors.auditFormat : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Audit Format'
                            value={aqlMaster.auditFormat}
                            minLength="1" maxLength="5"
                            onChange={(e) => setAqlMaster({ ...aqlMaster, auditFormat: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Unit Code <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.unitCode == '' ? errors.unitCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter unit Code'
                            value={aqlMaster.unitCode}
                            minLength="1" maxLength="10"
                            onChange={(e) => setAqlMaster({ ...aqlMaster, unitCode: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Buyer Code <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.buyerCode == '' ? errors.buyerCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Buyer Code'
                            value={aqlMaster.buyerCode}
                            minLength="1" maxLength="20"
                            onChange={(e) => setAqlMaster({ ...aqlMaster, buyerCode: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Pack-Qty-From <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.packQtyFrom == '' ? errors.packQtyFrom : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter PackQtyFrom'
                            type="text"
                            min="0"
                            value={aqlMaster.packQtyFrom}
                            //  onFocus={NUMBER_IS_FOCUS_IN_ZERO("packQtyFrom")}
                            // onFocus={NUMBER_IS_FOCUS_IN_ZERO("packQtyFrom")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("packQtyFrom")}
                            minLength="1" maxLength="4"

                            onChange={(e) => {
                                var reg = new RegExp('^[0-9]*$');
                                if (e.target.value != '' && reg.test(e.target.value) != false) {
                                    setAqlMaster({ ...aqlMaster, packQtyFrom: parseInt(e.target.value) })
                                }
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, packQtyFrom: e.target.value })
                                }
                                // setAqlMaster({ ...aqlMaster, packQtyFrom: e.target.value })
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Pack-Qty-To <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.packQtyTo == '' ? errors.packQtyTo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter PackQtyTo'
                            type="text"
                            value={aqlMaster.packQtyTo}
                            // onFocus={NUMBER_IS_FOCUS_IN_ZERO("packQtyTo")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("packQtyTo")}
                            minLength="1" maxLength="4"
                            onChange={(e) => {
                                var reg = new RegExp('^[0-9]*$');
                                if (e.target.value != '' && reg.test(e.target.value) != false) {
                                    setAqlMaster({ ...aqlMaster, packQtyTo: parseInt(e.target.value) })
                                }
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, packQtyTo: e.target.value })
                                }


                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Sample Size <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.sampleSize == '' ? errors.sampleSize : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Sample Size'
                            type="text"
                            min="0"
                            value={aqlMaster.sampleSize}
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("sampleSize")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("sampleSize")}
                            minLength="1" maxLength="4"
                            onChange={(e) => {
                                var reg = new RegExp('^[0-9]*$');
                                if (e.target.value != '' && reg.test(e.target.value) != false) {
                                    setAqlMaster({ ...aqlMaster, sampleSize: parseInt(e.target.value) })
                                }
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, sampleSize: e.target.value })
                                }
                            }} />
                        {/* onChange={(e) => setAqlMaster({ ...aqlMaster, sampleSize: e.target.value })} /> */}
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Mesurement Pcs <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.mesurementPcs == '' ? errors.measurementPcs : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter MesurementPcs' id='mesurementPcs'
                            type="text"
                            min="0"
                            value={aqlMaster.mesurementPcs}
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("mesurementPcs")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("mesurementPcs")}
                            minLength="1" maxLength="4"
                            onChange={(e) => {
                                var reg = new RegExp('^[0-9]*$');
                                if (e.target.value != '' && reg.test(e.target.value) != false) {
                                    setAqlMaster({ ...aqlMaster, mesurementPcs: parseInt(e.target.value) })
                                }
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, mesurementPcs: e.target.value })
                                }
                            }} />
                        {/* onChange={(e) => {
                                console.log(e.target.value)
                                setAqlMaster({ ...aqlMaster, mesurementPcs: e.target.value })
                            }} /> */}
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Pack Samples <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.packSamples == '' ? errors.packSamples : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter PackSamples'
                            type="text"
                            min="0"
                            value={aqlMaster.packSamples}
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("packSamples")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("packSamples")}
                            minLength="1" maxLength="4"
                            onChange={(e) => {
                                var reg = new RegExp('^[0-9]*$');
                                if (e.target.value != '' && reg.test(e.target.value) != false) {
                                    setAqlMaster({ ...aqlMaster, packSamples: parseInt(e.target.value) })
                                }
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, packSamples: e.target.value })
                                }
                            }} />
                        {/* onChange={(e) => setAqlMaster({ ...aqlMaster, packSamples: e.target.value })} /> */}
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Max Allow Visual Defects <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.maxAllowVisualDefects == '' ? errors.maxAllowVisualDefects : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter MaxAllowVisualDefects'
                            type="text"
                            min="0"
                            value={aqlMaster.maxAllowVisualDefects}
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("maxAllowVisualDefects")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("maxAllowVisualDefects")}
                            minLength="1" maxLength="4"
                            onChange={(e) => {
                                console.log(e.target.value)
                                if (parseInt(aqlMaster.sampleSize) && (parseInt(aqlMaster.sampleSize) >= parseInt(e.target.value))) {
                                    setAqlMaster({ ...aqlMaster, maxAllowVisualDefects: e.target.value });
                                    setTemp(parseInt(e.target.value));
                                    setTotal(parseInt(e.target.value));
                                } else if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, maxAllowVisualDefects: e.target.value });
                                    setTemp(0);
                                    setTotal(0);
                                }
                                // setAqlMaster({ ...aqlMaster, maxAllowVisualDefects: e.target.value })
                            }
                            }
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Max Allow Critical Defects <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.maxAllowCriticalDefects == '' ? errors.maxAllowCriticalDefects : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter MaxAllowCriticalDefects'
                            type="text"
                            min="0"
                            value={aqlMaster.maxAllowCriticalDefects}
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("maxAllowCriticalDefects")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("maxAllowCriticalDefects")}
                            minLength="1" maxLength="4"
                            onChange={(e) => {
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, maxAllowCriticalDefects: e.target.value })
                                } else if (total >= parseInt(e.target.value)) {
                                    let d1 = aqlMaster.maxAllowSewDefects == '' ? 0 : parseInt(aqlMaster.maxAllowSewDefects),
                                        d2 = aqlMaster.maxAllowOthDefects == '' ? 0 : parseInt(aqlMaster.maxAllowOthDefects)
                                    let ckVal = total - (d1 + d2);
                                    if (ckVal >= parseInt(e.target.value)) {
                                        setAqlMaster({ ...aqlMaster, maxAllowCriticalDefects: e.target.value })
                                    }
                                }
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Max Allow Sew Defects <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.maxAllowSewDefects == '' ? errors.maxAllowSewDefects : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter MaxAllowSewDefects'
                            type="text"
                            min="0"
                            value={aqlMaster.maxAllowSewDefects}
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("maxAllowSewDefects")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("maxAllowSewDefects")}
                            minLength="1" maxLength="4"
                            onChange={(e) => {
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, maxAllowSewDefects: e.target.value })
                                } else if (total >= parseInt(e.target.value)) {
                                    let d1 = aqlMaster.maxAllowCriticalDefects == '' ? 0 : parseInt(aqlMaster.maxAllowCriticalDefects),
                                        d2 = aqlMaster.maxAllowOthDefects == '' ? 0 : parseInt(aqlMaster.maxAllowOthDefects)
                                    let ckVal = total - (d1 + d2);
                                    if (ckVal >= parseInt(e.target.value)) {
                                        setAqlMaster({ ...aqlMaster, maxAllowSewDefects: e.target.value })
                                    }
                                }
                                // onChange={(e) => setAqlMaster({ ...aqlMaster, maxAllowSewDefects: e.target.value })} />
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Max Allow Other Defects <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.maxAllowOthDefects == '' ? errors.maxAllowOthDefects : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter MaxAllowOthDefects'
                            type="text"
                            min="0"
                            value={aqlMaster.maxAllowOthDefects}
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("maxAllowOthDefects")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("maxAllowOthDefects")}
                            minLength="1" maxLength="4"
                            onChange={(e) => {
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, maxAllowOthDefects: e.target.value })
                                } else if (total >= parseInt(e.target.value)) {
                                    let d1 = aqlMaster.maxAllowCriticalDefects == '' ? 0 : parseInt(aqlMaster.maxAllowCriticalDefects),
                                        d2 = aqlMaster.maxAllowSewDefects == '' ? 0 : parseInt(aqlMaster.maxAllowSewDefects)
                                    let ckVal = total - (d1 + d2);
                                    if (ckVal >= parseInt(e.target.value)) {
                                        setAqlMaster({ ...aqlMaster, maxAllowOthDefects: e.target.value })
                                    }
                                }
                                // onChange={(e) => setAqlMaster({ ...aqlMaster, maxAllowOthDefects: e.target.value })} />
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Max Allow Mesurement Defects <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.maxAllowMesurementDefects == '' ? errors.maxAllowMesurementDefects : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter MaxAllowMesurementDefects'
                            type="text"
                            // min={aqlMaster.mesurementPcs}
                            value={aqlMaster.maxAllowMesurementDefects}
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("maxAllowMesurementDefects")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("maxAllowMesurementDefects")}
                            minLength="1" maxLength="4"
                            onChange={(e) => {
                                console.log(aqlMaster.mesurementPcs)
                                if (parseInt(aqlMaster.mesurementPcs) && (parseInt(aqlMaster.mesurementPcs) > parseInt(e.target.value))) {
                                    setAqlMaster({ ...aqlMaster, maxAllowMesurementDefects: e.target.value });
                                } else if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, maxAllowMesurementDefects: e.target.value });
                                }
                            }}
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Max Allow Pack Defects <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.maxAllowPackDefects == '' ? errors.maxAllowPackDefects : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter MaxAllowPackDefects'
                            type="text"
                            min="0"
                            value={aqlMaster.maxAllowPackDefects}
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("maxAllowPackDefects")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("maxAllowPackDefects")}
                            minLength="1" maxLength="4"
                            onChange={(e) => {
                                if (parseInt(aqlMaster.packSamples) && (parseInt(aqlMaster.packSamples) > parseInt(e.target.value))) {
                                    setAqlMaster({ ...aqlMaster, maxAllowPackDefects: e.target.value });
                                } else if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, maxAllowPackDefects: e.target.value })
                                }
                            }}
                        />
                    </div>

                    <div className='mt-3'>
                        <label>Active</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={aqlMaster.active == 'Y'}
                                onChange={(e) => setAqlMaster({ ...aqlMaster, active: e == true ? 'Y' : 'N' })} />
                            <span className='px-2'> {aqlMaster.active == 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                    </div>
                </div>
            </Drawer>




            {/* Edit */}
            <Drawer
                maskClosable={false}
                keyboard={false}
                footer={
                    <>
                        <div>
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={updateAqlMaster}> Update </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => { clearFields(); cancel() }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Edit Aql Master</h6 >} placement="right" onClose={() => { clearFields(); cancel() }} visible={closeDefect} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <label>AQL Type</label>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter AQL Type'
                            minLength="1" maxLength="10"
                            value={aqlMaster.aqlType} disabled
                            onChange={(e) => setAqlMaster({ ...aqlMaster, aqlType: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <label>Audit Format</label>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Audit Format'
                            minLength="1" maxLength="5"
                            value={aqlMaster.auditFormat} disabled
                            onChange={(e) => setAqlMaster({ ...aqlMaster, auditFormat: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <label>Unit Code</label>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Unit Code'
                            value={aqlMaster.unitCode} disabled
                            minLength="1" maxLength="10"
                            onChange={(e) => setAqlMaster({ ...aqlMaster, unitCode: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <label>BuyerCode</label>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Buyer Code'
                            value={aqlMaster.buyerCode} disabled
                            minLength="1" maxLength="20"
                            onChange={(e) => setAqlMaster({ ...aqlMaster, buyerCode: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Pack-Qty-From <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.packQtyFrom == '' ? errors.packQtyFrom : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter PackQtyFrom'
                            type="text"
                            min="0"
                            value={aqlMaster.packQtyFrom}
                            minLength="1" maxLength="4"
                            onChange={(e) => {
                                var reg = new RegExp('^[0-9]*$');
                                if (e.target.value != '' && reg.test(e.target.value) != false) {
                                    setAqlMaster({ ...aqlMaster, packQtyFrom: parseInt(e.target.value) })
                                }
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, packQtyFrom: e.target.value })
                                }
                                // setAqlMaster({ ...aqlMaster, packQtyFrom: e.target.value })
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Pack-Qty-To <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.packQtyTo == '' ? errors.packQtyTo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter PackQtyTo'
                            type="text"
                            min="0"
                            value={aqlMaster.packQtyTo}
                            minLength="1" maxLength="4"
                            onChange={(e) => {
                                var reg = new RegExp('^[0-9]*$');
                                if (e.target.value != '' && reg.test(e.target.value) != false) {
                                    setAqlMaster({ ...aqlMaster, packQtyTo: parseInt(e.target.value) })
                                }
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, packQtyTo: e.target.value })
                                }
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Sample Size <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.sampleSize == '' ? errors.sampleSize : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Sample Size'
                            type="text"
                            min="0"
                            value={aqlMaster.sampleSize}
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("sampleSize")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("sampleSize")}
                            minLength="1" maxLength="4"
                            onChange={(e) => {
                                var reg = new RegExp('^[0-9]*$');
                                if (e.target.value != '' && reg.test(e.target.value) != false) {
                                    setAqlMaster({ ...aqlMaster, sampleSize: parseInt(e.target.value) })
                                }
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, sampleSize: e.target.value })
                                }
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Mesurement Pcs <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.mesurementPcs == '' ? errors.measurementPcs : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter MesurementPcs'
                            type="text"
                            min="0"
                            value={aqlMaster.mesurementPcs}
                            minLength="1" maxLength="4"
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("mesurementPcs")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("mesurementPcs")}
                            onChange={(e) => {
                                var reg = new RegExp('^[0-9]*$');
                                if (e.target.value != '' && reg.test(e.target.value) != false) {
                                    setAqlMaster({ ...aqlMaster, mesurementPcs: parseInt(e.target.value) })
                                }
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, mesurementPcs: e.target.value })
                                }
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Pack Samples <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.packSamples == '' ? errors.packSamples : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter PackSamples'
                            type="text"
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("packSamples")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("packSamples")}
                            min="0"
                            minLength="1" maxLength="4"
                            value={aqlMaster.packSamples}
                            onChange={(e) => {
                                var reg = new RegExp('^[0-9]*$');
                                if (e.target.value != '' && reg.test(e.target.value) != false) {
                                    setAqlMaster({ ...aqlMaster, packSamples: parseInt(e.target.value) })
                                }
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, packSamples: e.target.value })
                                }
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Max Allow Visual Defects <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.maxAllowVisualDefects == '' ? errors.maxAllowVisualDefects : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter MaxAllowVisualDefects'
                            type="text"
                            min="0"
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("maxAllowVisualDefects")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("maxAllowVisualDefects")}
                            minLength="1" maxLength="4"
                            value={aqlMaster.maxAllowVisualDefects}
                            onChange={(e) => {
                                console.log(e.target.value)
                                if (parseInt(aqlMaster.sampleSize) && (parseInt(aqlMaster.sampleSize) >= parseInt(e.target.value))) {
                                    setAqlMaster({ ...aqlMaster, maxAllowVisualDefects: e.target.value });
                                    setTemp(parseInt(e.target.value));
                                    setTotal(parseInt(e.target.value));
                                } else if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, maxAllowVisualDefects: e.target.value });
                                    setTemp(0);
                                    setTotal(0);
                                }
                                // setAqlMaster({ ...aqlMaster, maxAllowVisualDefects: e.target.value })
                            }
                                // onChange={(e) => setAqlMaster({ ...aqlMaster, maxAllowVisualDefects: e.target.value })} />
                            }
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Max Allow Critical Defects <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.maxAllowCriticalDefects == '' ? errors.maxAllowCriticalDefects : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter MaxAllowCriticalDefects'
                            type="text"
                            min="0"
                            // onFocus={NUMBER_IS_FOCUS_IN_ZERO("maxAllowCriticalDefects")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("maxAllowCriticalDefects")}
                            minLength="1" maxLength="4"
                            value={aqlMaster.maxAllowCriticalDefects}
                            onChange={(e) => {
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, maxAllowCriticalDefects: e.target.value })
                                } else if (total >= parseInt(e.target.value)) {
                                    let d1 = aqlMaster.maxAllowSewDefects == '' ? 0 : parseInt(aqlMaster.maxAllowSewDefects),
                                        d2 = aqlMaster.maxAllowOthDefects == '' ? 0 : parseInt(aqlMaster.maxAllowOthDefects)
                                    let ckVal = total - (d1 + d2);
                                    if (ckVal >= parseInt(e.target.value)) {
                                        setAqlMaster({ ...aqlMaster, maxAllowCriticalDefects: e.target.value })
                                    }
                                }
                                // onChange={(e) => setAqlMaster({ ...aqlMaster, maxAllowCriticalDefects: e.target.value })} />
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Max Allow Sew Defects <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.maxAllowSewDefects == '' ? errors.maxAllowSewDefects : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter MaxAllowSewDefects'
                            type="text"
                            min="0"
                            // onFocus={NUMBER_IS_FOCUS_IN_ZERO("maxAllowSewDefects")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("maxAllowSewDefects")}
                            minLength="1" maxLength="4"
                            value={aqlMaster.maxAllowSewDefects}
                            onChange={(e) => {
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, maxAllowSewDefects: e.target.value })
                                } else if (total >= parseInt(e.target.value)) {
                                    let d1 = aqlMaster.maxAllowCriticalDefects == '' ? 0 : parseInt(aqlMaster.maxAllowCriticalDefects),
                                        d2 = aqlMaster.maxAllowOthDefects == '' ? 0 : parseInt(aqlMaster.maxAllowOthDefects)
                                    let ckVal = total - (d1 + d2);
                                    if (ckVal >= parseInt(e.target.value)) {
                                        setAqlMaster({ ...aqlMaster, maxAllowSewDefects: e.target.value })
                                    }
                                }
                                // onChange={(e) => setAqlMaster({ ...aqlMaster, maxAllowSewDefects: e.target.value })} />
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Max Allow Other Defects <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.maxAllowOthDefects == '' ? errors.maxAllowOthDefects : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter MaxAllowOthDefects'
                            type="text"
                            min="0"
                            // onFocus={NUMBER_IS_FOCUS_IN_ZERO("maxAllowOthDefects")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("maxAllowOthDefects")}
                            minLength="1" maxLength="4"
                            value={aqlMaster.maxAllowOthDefects}
                            onChange={(e) => {
                                if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, maxAllowOthDefects: e.target.value })
                                } else if (total >= parseInt(e.target.value)) {
                                    let d1 = aqlMaster.maxAllowCriticalDefects == '' ? 0 : parseInt(aqlMaster.maxAllowCriticalDefects),
                                        d2 = aqlMaster.maxAllowSewDefects == '' ? 0 : parseInt(aqlMaster.maxAllowSewDefects)
                                    let ckVal = total - (d1 + d2);
                                    if (ckVal >= parseInt(e.target.value)) {
                                        setAqlMaster({ ...aqlMaster, maxAllowOthDefects: e.target.value })
                                    }
                                }
                                // onChange={(e) => setAqlMaster({ ...aqlMaster, maxAllowOthDefects: e.target.value })} />
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Max Allow Mesurement Defects <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.maxAllowMesurementDefects == '' ? errors.maxAllowMesurementDefects : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter MaxAllowMesurementDefects'
                            type="text"
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("maxAllowMesurementDefects")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("maxAllowMesurementDefects")}
                            minLength="1" maxLength="4"
                            min="0"
                            value={aqlMaster.maxAllowMesurementDefects}
                            onChange={(e) => {
                                console.log(aqlMaster.mesurementPcs)
                                if (parseInt(aqlMaster.mesurementPcs) && (parseInt(aqlMaster.mesurementPcs) > parseInt(e.target.value))) {
                                    setAqlMaster({ ...aqlMaster, maxAllowMesurementDefects: e.target.value });
                                } else if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, maxAllowMesurementDefects: e.target.value });
                                }
                            }
                                // setAqlMaster({ ...aqlMaster, maxAllowMesurementDefects: e.target.value })
                            }
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Max Allow Pack Defects <span className='text-danger'>*  </span></label>
                            <small className='text-danger'>{aqlMaster.maxAllowPackDefects == '' ? errors.maxAllowPackDefects : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter MaxAllowPackDefects'
                            type="number"
                            min="0"
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("maxAllowPackDefects")} onBlur={NUMBER_IS_FOCUS_OUT_ZERO("maxAllowPackDefects")}
                            minLength="1" maxLength="4"
                            value={aqlMaster.maxAllowPackDefects}
                            onChange={(e) => {
                                if (parseInt(aqlMaster.packSamples) && (parseInt(aqlMaster.packSamples) > parseInt(e.target.value))) {
                                    setAqlMaster({ ...aqlMaster, maxAllowPackDefects: e.target.value });
                                } else if (e.target.value == '') {
                                    setAqlMaster({ ...aqlMaster, maxAllowPackDefects: e.target.value })
                                }
                            }
                                // setAqlMaster/({ ...aqlMaster, maxAllowPackDefects: e.target.value })
                            } />
                    </div>

                    <div className='mt-3'>
                        <label>Active</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={aqlMaster.active == 'Y'}
                                onChange={(e) => setAqlMaster({ ...aqlMaster, active: e == true ? 'Y' : 'N' })} />
                            <span className='px-2'> {aqlMaster.active == 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                    </div>
                </div>
            </Drawer >
        </div >
    )
}