import React, { useState } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Spin, Pagination, Drawer, Tag, Switch, message } from 'antd';
import { useEffect } from 'react';
import { ItrApiService } from '@afiplfeed/itr-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { RESIZE_ITEM_ACTION } from '@progress/kendo-react-scheduler';

export default function HsnMaster() {
    const [datas, setDatas] = useState([]);
    const [totalPageCount, setTotalPageCount] = useState();
    const [totalpagesize, settotalpagesize] = useState(10);
    const [loader, setLoader] = useState(false);
    //const pageSize = 10;
    const [pagination, setPagination] = useState({
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0,

    });
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    }
    const onClose = () => {
        setVisible(false);
    }
    const clearFields = () => {
        setHsnMaster({
            ...hsnMaster,
            isActive: true,
            isSuccess: true,
            id: 0,
            gstType: "",
            chapter: "",
            hScode: "",
            hsDescription: "",
            uom: "",
            taxRate: "",
            hostName: "",
            active: 'Y'
        });
        setErrors({ ...errors, gstType: '', chapter: '', hScode: '', hsDescription: '', uom: '', taxRate: '' });
        setexists(false);
    }
    const [hsnMaster, setHsnMaster] = useState({
        createdDt: new Date(),
        createdBy: "",
        modifyDt: new Date(),
        modifyBy: "",
        isActive: true,
        id: 0,
        gstType: "",
        chapter: "",
        hScode: "",
        hsDescription: "",
        uom: "",
        taxRate: "",
        hostName: "",
        active: 'Y'
    });

    const [errors, setErrors] = useState({
        gstType: '',
        chapter: '',
        hScode: '',
        hsDescription: '',
        uom: '',
        taxRate: ''
    });
    
    const [search, setSearch] = useState('');
    const handleChange = event => {
        setSearch(event.target.value);
    };
    const [exist, setexists] = useState(false);
    const [dynamicpageno, setDynamicpageno] = useState(1);
    const getDatas = (onCreate, onUpdate) => {
        console.log(dynamicpageno,totalpagesize);
        setLoader(true);
        ItrApiService.GET({
            url: 'GSTHSCode/GetAllGSTHSCodeWithPagesByPageNo/' + dynamicpageno + '/' + totalpagesize,
            appCode: "CNF"
        }).then(res => {
           
            if (res.Success == true) {
                setLoader(false);
                setDatas(res.data.list);
                setTotalPageCount(res.data.pageCount);
console.log(res.data.pageCount);
    // if (onCreate && onCreate == true) {
    //                 setPagination({ ...pagination, totalPage:res.data.pageCount,
    //                     minIndex: (Math.ceil(res.data.pageCount) - 1) * totalpagesize, 
    //                     maxIndex: Math.ceil(res.data.pageCount) * totalpagesize, 
    //                     current: Math.ceil(res.data.pageCount) });
    //             }
    //             else if (onUpdate && onUpdate == true) {
    //                 setPagination({ ...pagination, totalPage: res.data.pageCount });
    //             } else {
    //                 setPagination({ ...pagination, totalPage:res.data.pageCount,
    //                      minIndex: 0, maxIndex: totalpagesize });
    //             }
    //             //   settotalpagesize(res.data.pageSize);
                // if (onCreate && onCreate == true) {
                //     setPagination({ ...pagination, totalPage: res.data.length / totalpagesize, minIndex: (Math.ceil(res.data.list.length / totalpagesize) - 1) * totalpagesize, maxIndex: Math.ceil(res.data.list.length / totalpagesize) * totalpagesize, current: Math.ceil(res.data.list.length / totalpagesize) });
                // }
                // else if (onUpdate && onUpdate == true) {
                //     setPagination({ ...pagination, totalPage: res.data.length / totalpagesize });
                // } else {
                //     setPagination({ ...pagination, totalPage: res.data.length / totalpagesize, minIndex: 0, maxIndex: totalpagesize });
                // }
                console.log('-->',totalPageCount)
            }
            else {
                setLoader(false);
            }
        })
    }
    const PageClick = (cpage) => {
        setLoader(true);
        console.log(cpage);
        if (search == '') {
            ItrApiService.GET({
                url: 'GSTHSCode/GetAllGSTHSCodeWithPagesByPageNo/' + cpage + '/' + totalpagesize,
                appCode: "CNF"
            }).then(res => {
                if (res.Success == true) {
                    setLoader(false);
                    setDatas(res.data.list);
                    setTotalPageCount(res.data.pageCount);
                             //  settotalpagesize(res.data.pageSize);
                    setPagination({ ...pagination, 
                        totalPage: res.data.pageCount,
                         current: cpage, minIndex: ((cpage - 1) * totalpagesize),
                          maxIndex: (cpage * totalpagesize) });
                }
                else {
                    setLoader(false);
                }
            })
        }
        else {
            ItrApiService.GET({
                url: 'GSTHSCode/GetAllGSTHSCodeWithPagesByPageNoSearchString/' + cpage + '?searchstring=' + search,
                appCode: "CNF"
            }).then(res => {
                if (res.Success == true) {
                    setLoader(false);
                    setDatas(res.data.list);
                    setTotalPageCount(res.data.pageCount);
                    //          settotalpagesize(res.data.pageSize);
                    setPagination({ ...pagination, 
                        current: cpage, 
                        totalPage: res.data.pageCount, 
                        minIndex: 0, maxIndex: totalpagesize })
                }
                else {
                    setLoader(false);
                }
            })
        }
    };
    useEffect(() => {
        getDatas();
    }, []);
    const createHsnMaster = () => {
        let { gstType, chapter, hScode, hsDescription, uom, taxRate } = hsnMaster;
        if (gstType == '' || chapter == '' || hScode == '' || hsDescription == '' || uom == '' || taxRate == '') {
            setErrors({ ...errors, gstType: ' Gst Type is required', chapter: 'Chapter is required', hScode: 'Hs Code is required', hsDescription: 'Hs Description is required', uom: 'UOM is required', taxRate: 'Tax Rate is required', })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: 'GSTHSCode/SaveGSTHSCode',
                appCode: "CNF",
                data: hsnMaster
            }).then(res => {
                if (res.Success == true) {
                    setDynamicpageno(1);
                    setLoader(false);
                    message.success("HSN Master Created Successfully");
                    onClose();
                    clearFields();
                    getDatas(true);
                }
                else {
                    setLoader(false);
                    message.warning(res.message);
                }
            })
        }
    }
    const [closeDefect, setCloseDefect] = useState(false);
    const editDefect = (chapter, gstType, hScode) => {
        setCloseDefect(true);
        ItrApiService.GET({
            url: `GSTHSCode/GetGSTHSCode/` + chapter + "/" + gstType + "/" + hScode,
            appCode: "CNF",
        }).then(res => {
            if (res.Success == true) {
                setHsnMaster(res.data);
                setDynamicpageno(pagination.current);
            }
            else {
                setLoader(false);
            }
        })
    };
    const cancel = () => {
        setCloseDefect(false);
    };
    const updateHsnMaster = () => {
        let { hsDescription, uom, taxRate, gstType, chapter, hScode } = hsnMaster;
        if (hsDescription == '' || uom == '' || taxRate == "" || gstType == "" || chapter == "" || hScode == "") {
            setErrors({ ...errors, hsDescription: 'Hs Description is required', uom: 'UOM is required', taxRate: 'Tax Rate is required' })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `GSTHSCode/SaveGSTHSCode`,
                appCode: "CNF",
                data: { ...hsnMaster, createdDate: new Date(), modifiedDate: new Date() }
            }).then(res => {
                if (res.Success == true) {
                    message.success("Hsn Master Updated Successfully");
                    cancel();
                    clearFields();
                    getDatas(false, true);
                }
                else {
                    setLoader(false);
                }
            })
        }
    };

    const onShowSizeChanger = (current, totalpagesize) => {
        console.log(current, totalpagesize);
        // setLoader(true);
        // ItrApiService.GET({
        //     url: 'GSTHSCode/GetAllGSTHSCodeWithPagesByPageNo/' + current + '/' + totalpagesize,
        //     appCode: "CNF"
        // }).then(res => {
        //     if (res.Success == true) {
        //         setLoader(false);
        //         setDatas(res.data.list);
        //         setTotalPageCount(res.data.pageCount);
        //         //           settotalpagesize(res.data.pageSize);
        //         //setPagination({ ...pagination, totalPage: res.data.length / totalpagesize, current: cpage, minIndex: ((cpage - 1) * totalpagesize), maxIndex: (cpage * totalpagesize) });
        //     }
        //     else {
        //         setLoader(false);
        //     }
        // })
      
       // PageClick(current)
        settotalpagesize(totalpagesize);



    }
    const myFunction = (searchstring) => {
        ItrApiService.GET({
            url: 'GSTHSCode/GetAllGSTHSCodeWithPagesByPageNoSearchString/1?searchstring=' + searchstring,
            appCode: "CNF",
            data: hsnMaster
        }).then(res => {
            if (res.Success == true) {
                console.log(res.data.pageCount);
                setDatas(res.data.list);
                setTotalPageCount(res.data.pageCount);
                settotalpagesize(res.data.pageSize);
                setDynamicpageno(pagination.current);
                //console.log(page * pageSize);
                setPagination({ ...pagination, totalPage: res.data.pageCount, minIndex: 0, maxIndex: totalpagesize })
            }

        });
    }
    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>HSN Master</h6>
                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1'>
                        <input type="search" className='form-control' id='operationSearch' placeholder='Search'
                            onKeyPress={
                                (e) => e.key === 'Enter' && myFunction(e.target.value)

                            }
                            value={search}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                        <button className='btn-sm btn defect-master-add' onClick={showDrawer} > + Add New </button>
                    </div>
                </div>
                <div className='table-responsive mt-2 defect-master-table'>
                    <table className="table table-hover" id='operationTable'>
                        <thead id='table-header'>
                            <tr>
                                <th scope="col">Gst Type</th>
                                <th scope="col">Chapter</th>
                                <th scope="col">HS Code</th>
                                <th scope="col">HS Description</th>
                                <th scope="col">UOM</th>
                                <th scope="col">Tax Rate</th>
                                <th scope="col">Active</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((hsn, index) => (
                                <tr key={index}>
                                    <td>{hsn?.gstType ? hsn?.gstType : '-'}</td>
                                    <td>{hsn?.chapter ? hsn?.chapter : '-'}</td>
                                    <td> {hsn?.hScode ? hsn?.hScode : '-'} </td>
                                    <td>{hsn?.hsDescription ? hsn.hsDescription : '-'}</td>
                                    <td> {hsn?.uom ? hsn?.uom : '-'} </td>
                                    <td>{hsn?.taxRate ? hsn?.taxRate : '0.00'}</td>
                                    <td>
                                        <Tag style={{ borderRadius: '4px', backgroundColor: hsn?.active == 'Y' ? 'green' : '#FF1414', color: 'white' }}
                                        >
                                            {hsn?.active == 'Y' ? 'Yes' : 'No'}</Tag></td>
                                    <td>
                                        <div className='text-center' onClick={() => editDefect(hsn?.chapter, hsn?.gstType, hsn?.hScode)}>
                                            <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {loader && <div className='text-center mt-3'>
                        <Spin style={{ color: 'red' }} tip="Loading..." />
                    </div>}
                </div>
                <div className='text-end mt-3'>
                    <Pagination
                        showQuickJumper

                        onShowSizeChange={onShowSizeChanger}
                        pageSizeOptions={['10', '25', '50']}
                        current={pagination.current}
                        //pageSize={totalpagesize}
                        total={totalPageCount * 10 }
                        onChange={PageClick}
                        responsive={true}
                        showSizeChanger={true}



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
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={createHsnMaster}> Save </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                onClose();
                            }}> Cancel </button>
                        </div>
                    </>
                } title={< h4 className='m-0' > Add New HSN Master</h4 >} placement="right" onClose={() => {
                    clearFields();
                    onClose();
                }} visible={visible} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Gst Type</label>
                            <small className='text-danger'>{hsnMaster.gstType == '' ? errors.gstType : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1'
                            value={hsnMaster.gstType}
                            onChange={(e) => setHsnMaster({ ...hsnMaster, gstType: e.target.value })}

                        >
                            <option value="">Select Gst Type</option>
                            <option value="GOODS"> GOODS </option>
                        </select>
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Chapter <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{hsnMaster.chapter == '' ? errors.chapter : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            maxLength="2"
                            placeholder='Enter Chapter'
                            value={hsnMaster.chapter}
                            onChange={(e) => {
                                let re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setHsnMaster({ ...hsnMaster, chapter: e.target.value })
                                }
                            }}
                        />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>HS Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{hsnMaster.hScode == '' ? errors.hScode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            maxLength="15"

                            placeholder='Enter HS Code'
                            value={hsnMaster.hScode}
                            onChange={(e) => {
                                let re = /^[0-9\b]+$/;

                                if (e.target.value === '' || re.test(e.target.value)) { setHsnMaster({ ...hsnMaster, hScode: e.target.value }) }
                            }
                            }
                        />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>HS Description <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{hsnMaster.hsDescription == '' ? errors.hsDescription : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter HS Description'
                            maxLength="200"
                            value={hsnMaster.hsDescription}
                            onChange={(e) => setHsnMaster({ ...hsnMaster, hsDescription: e.target.value })} />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>UOM<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{hsnMaster.uom == '' ? errors.uom : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1'
                            value={hsnMaster.uom}
                            onChange={(e) => setHsnMaster({ ...hsnMaster, uom: e.target.value })}
                        >
                            <option value="">Select UOM </option>
                            <option value="NOS">NOS</option>
                            <option value="KGS">KGS</option>
                            <option value="TKW">TKW</option>
                            <option value="TON">TON</option>
                            <option value="LTR">LTR</option>
                            <option value="THN">THN</option>
                            <option value="SQM">SQM</option>
                        </select>
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Tax Rate <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{hsnMaster.taxRate == '' ? errors.taxRate : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'

                            placeholder='00.00'
                            value={hsnMaster.taxRate} minLength="1" maxLength="5"
                            onChange={(e) => {
                                let re = /^(?=.*\d)\d{0,2}(?:\.\d{0,2})?$/;

                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setHsnMaster({ ...hsnMaster, taxRate: e.target.value })
                                }
                            }
                            }
                        />                    </div>
                    <div className='mt-3'>
                        <label>Active</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={hsnMaster.active == 'Y'}
                                onChange={(e) => setHsnMaster({ ...hsnMaster, active: e === true ? 'Y' : 'N' })} />
                            <span className='px-2'> {hsnMaster.active === 'Y' ? 'Active' : 'Disable'} </span>
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
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={updateHsnMaster}>Update</button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                cancel();
                            }}>Cancel</button>
                        </div>
                    </>
                }
                title={
                    <h4 className='m-0'>Edit HSN Master</h4>
                } placement="right" onClose={() => { clearFields(); cancel(); }} visible={closeDefect} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Gst Type<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{hsnMaster.gstType == '' ? errors.gstType : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1'
                            value={hsnMaster.gstType} readOnly
                        >
                            <option value="">Select Gst Type</option>
                            <option value="GOODS"> GOODS </option>
                        </select>
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Chapter <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{hsnMaster.chapter == '' ? errors.chapter : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            readOnly
                            placeholder='Enter Chapter'
                            value={hsnMaster.chapter}
                            onChange={(e) => setHsnMaster({ ...hsnMaster, chapter: e.target.value })} />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>HS Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{hsnMaster.hScode == '' ? errors.hScode : ''}</small>

                        </div>
                        <input className='form-control form-control-sm mt-1'
                            minLength="1" maxLength="10"
                            readOnly
                            placeholder='Enter HS Code'
                            value={hsnMaster.hScode}
                            onChange={(e) => setHsnMaster({ ...hsnMaster, hScode: e.target.value })} />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>HS Description <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{hsnMaster.hsDescription == '' ? errors.hsDescription : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'

                            placeholder='Enter HS Description'
                            value={hsnMaster.hsDescription} maxLength="100"
                            onChange={(e) => setHsnMaster({ ...hsnMaster, hsDescription: e.target.value })} />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>UOM<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{hsnMaster.uom == '' ? errors.uom : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1'
                            value={hsnMaster.uom}
                            onChange={(e) => setHsnMaster({ ...hsnMaster, uom: e.target.value })}
                        >
                            <option value="">Select UOM </option>
                            <option value="NOS">NOS</option>
                            <option value="KGS">KGS</option>
                            <option value="TKW">TKW</option>
                            <option value="TON">TON</option>
                            <option value="LTR">LTR</option>
                            <option value="THN">THN</option>
                            <option value="SQM">SQM</option>
                        </select>
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Tax Rate <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{hsnMaster.taxRate == '' ? errors.taxRate : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='00.00'
                            value={hsnMaster.taxRate} minLength="1" maxLength="5"
                            onChange={(e) => {
                                let re = /^(?=.*\d)\d{0,2}(?:\.\d{0,2})?$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setHsnMaster({ ...hsnMaster, taxRate: e.target.value })
                                }
                            }
                            }
                        />
                    </div>
                    <div className='mt-3'>
                        <label>Active</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={hsnMaster.active == 'Y'}
                                onChange={(e) => setHsnMaster({ ...hsnMaster, active: e === true ? 'Y' : 'N' })} />
                            <span className='px-2'> {hsnMaster.active === 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

