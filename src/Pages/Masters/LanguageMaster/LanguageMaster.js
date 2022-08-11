import React, { useState } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Tag, Space, Drawer, Switch, Avatar, message, Pagination, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useEffect } from 'react';
import { ItrApiService } from '@afiplfeed/itr-ui';

export default function LanguageMaster() {

    const clearFields = () => {
        setlanguageMasterMaster({
            ...languageMaster, isActive: true,
            id: 0,
            languageCode: "",
            languageName: "",
            translationName: "",
            hostName: ""
        });
        setErrors({ ...errors, languageCode: "", translationName: "", languageName: "" });
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

    // for-Edit-new-Operation-master
    const [closeDefect, setCloseDefect] = useState(false);
    const editDefect = (langId) => {
        setCloseDefect(true);
        ItrApiService.GET({
            url: `Lang/GetLangInfoByID/${langId}`,
            appCode: "CNF",
        }).then(res => {
            if (res.Success == true) {
                setlanguageMasterMaster(res.data);
            }
            else {
                setLoader(false);
            }
        })
    };
    const cancel = () => {
        setCloseDefect(false);
    };


    const [languageMaster, setlanguageMasterMaster] = useState({
        isActive: true,
        id: 0,
        languageCode: "",
        languageName: "",
        translationName: "",
        hostName: ""
    });


    const [partsList, setPartsList] = useState([]);
    const getPartsData = () => {
        setLoader(true);
        ItrApiService.GET({
            url: 'GarPartsMaster/GetAllGarPartData',
            appCode: "CNF"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setPartsList(res.data);
            }
            else {
                setLoader(false);
            }
        });
    }

    const [loader, setLoader] = useState(false);
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);

    const [errors, setErrors] = useState({
        languageCode: "",
        languageName: "",
        translationName: "",
    })

    const [exist, setexists] = useState(false);

    const createAssignmentMaster = () => {
        let { languageCode, languageName, translationName } = languageMaster;
        if (languageName == '' || translationName == '' || languageCode == "") {
            setErrors({ ...errors, languageName: 'Language Name is required', translationName: 'Translation Name is required', languageCode: "Language Code is required" })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: 'Lang/SaveLangMaster',
                appCode: "CNF",
                data: languageMaster
            }).then(res => {
                if (res.Success == true) {
                    setLoader(false);
                    message.success("Language Master Created Successfully");
                    onClose();
                    clearFields();
                    getDatas(true);
                }
                else {
                    setLoader(false);
                }
            })
        }
    }

    // for-Update-Operation-master
    const updateAssignmentMaster = () => {

        let { languageCode, languageName, translationName } = languageMaster;
        if (languageName == '' || translationName == '' || languageCode == "") {
            setErrors({ ...errors, languageName: 'Language Name is required', translationName: 'Translation Name is required', languageCode: "Language Code is required" })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `Lang/SaveLangMaster`,
                appCode: "CNF",
                data: languageMaster
            }).then(res => {
                if (res.Success == true) {
                    message.success("Language Master Updated Successfully");
                    cancel();
                    clearFields();
                    getDatas(false, true);
                }
                else {
                    message.warning(res.message);
                    setLoader(false);
                }
            })
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
            url: 'Lang/GetAllLanguageInfo',
            appCode: "CNF"
        }).then(res => {
            console.table(res.data);
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
                setLoader(false);
                // message.warning('Something went wrong');
            }
        })
    }

    useEffect(() => {
        getDatas();
        getPartsData();
    }, []);


    const myFunction = (e) => {
        let val = datas2;
        // var input, filter, table, tr, td, i, txtValue;
        // input = document.getElementById("masterSearch");
        let ss = val.filter(dd => {
            if (dd.operCode.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.operName.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
        });
        console.log("------->", ss);
        setDatas(ss);
        setPagination({ ...pagination, totalPage: ss.length / pageSize, minIndex: 0, maxIndex: pageSize });
    }

    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>Language Master</h6>
                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1'>
                        <input type="search" className='form-control' id='operationSearch' placeholder='Search' onChange={myFunction} />
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
                    <table className="table table-hover" id='operationTable'>
                        <thead id='table-header'>
                            <tr>
                                <th scope="col">Language Code</th>
                                <th scope="col">Language Name</th>
                                <th scope="col">Translation Name</th>
                                {/* <th scope="col">Active</th> */}
                                <th scope="col" className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((lang, index) => index >= pagination.minIndex && index < pagination.maxIndex && (
                                <tr key={index}>
                                    <td> {lang?.languageCode ? lang?.languageCode : '-'} </td>
                                    <td> {lang?.languageName ? lang?.languageName : '-'} </td>
                                    <td> {lang?.translationName ? lang?.translationName : ''} </td>
                                    {/* <td>
                                        <Tag style={{ borderRadius: '4px', backgroundColor: lang?.active == 'Y' ? 'green' : '#FF1414', color: 'white' }}
                                        >
                                            {lang?.active == 'Y' ? 'YES' : 'NO'}
                                        </Tag>
                                    </td> */}
                                    <td>
                                        <div className='text-center' onClick={() => { console.log(lang); editDefect(lang?.id) }}>
                                            <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
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
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={createAssignmentMaster}> Save </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                onClose();
                            }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Add New Language</h6 >} placement="right" onClose={() => {
                    clearFields();
                    onClose();
                }} visible={visible} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Language Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{languageMaster.languageCode == '' ? errors.languageCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter Language Code'
                            minLength="1" maxLength="5"
                            value={languageMaster.languageCode}
                            onChange={(e) => {
                                setlanguageMasterMaster({ ...languageMaster, languageCode: e.target.value })
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Language Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{languageMaster.languageName == '' ? errors.languageName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter Language Name'
                            value={languageMaster.languageName}
                            onChange={(e) => {
                                setlanguageMasterMaster({ ...languageMaster, languageName: e.target.value })
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Translation Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{languageMaster.translationName == '' ? errors.translationName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter Translation Name'
                            value={languageMaster.translationName}
                            onChange={(e) => {
                                setlanguageMasterMaster({ ...languageMaster, translationName: e.target.value })
                            }} />
                    </div>

                    {/* <div className='mt-3'>
                        <label>Language Status</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={languageMaster.isActive == 'Y'}
                                onChange={(e) => setlanguageMasterMaster({ ...languageMaster, isActive: e == true ? 'Y' : 'N' })} />
                            <span className='px-2'> {languageMaster.isActive === 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                    </div> */}
                </div>
            </Drawer>


            {/* Edit */}
            <Drawer
                maskClosable={false}
                keyboard={false}
                footer={
                    <>
                        <div>
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={updateAssignmentMaster}> Update </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => { clearFields(); cancel(); }}> Cancel </button>
                        </div>
                    </>
                } title={<h6 className='m-0'> Edit Language</h6>} placement="right" onClose={() => { clearFields(); cancel(); }} visible={closeDefect} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Language Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{languageMaster.languageCode == '' ? errors.languageCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter User Code'
                            value={languageMaster.languageCode}
                            onChange={(e) => {
                                setlanguageMasterMaster({ ...languageMaster, languageCode: e.target.value })
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Language Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{languageMaster.languageName == '' ? errors.languageName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter User Code'
                            value={languageMaster.languageName}
                            onChange={(e) => {
                                setlanguageMasterMaster({ ...languageMaster, languageName: e.target.value })
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Translation Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{languageMaster.translationName == '' ? errors.translationName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter User Code'
                            value={languageMaster.translationName}
                            onChange={(e) => {
                                setlanguageMasterMaster({ ...languageMaster, translationName: e.target.value })
                            }} />
                    </div>

                    {/* <div className='mt-3'>
                        <label>Language Status</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={languageMaster.isActive == 'Y'}
                                onChange={(e) => setlanguageMasterMaster({ ...languageMaster, isActive: e == true ? 'Y' : 'N' })} />
                            <span className='px-2'> {languageMaster.isActive === 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                    </div> */}
                </div>
            </Drawer >
        </div >
    )
}
