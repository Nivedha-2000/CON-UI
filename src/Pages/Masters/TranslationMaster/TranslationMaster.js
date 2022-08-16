import React, { useState } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Tag, Space, Drawer, Switch, Avatar, message, Pagination, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useEffect } from 'react';
import { ItrApiService } from '@afiplfeed/itr-ui';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';

export default function TranslationMaster() {

    const clearFields = () => {
        setTranslationMaster({
            ...translationMaster, isActive: true,
            id: 0,
            languageCode: "",
            languageName: "",
            translation: "",
            defectName: "",
            defectCode: "",
            defUser: "",
            hostName: ""
        });
        setTranslationsMaster([]);
        setErrors({
            defectName: "",
            translation: "",
            languageCode: "",
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

    // for-Edit-new-Operation-master
    const [closeDefect, setCloseDefect] = useState(false);
    const editDefect = (langId) => {
        setCloseDefect(true);
        ItrApiService.GET({
            url: `DefectTranslationMaster/GetDefectTranslationMasterByID/${langId}`,
            appCode: "CNF",
        }).then(res => {
            if (res.Success == true) {
                console.log(res.data)
                let defUser = ''
                for (let data of defList) {
                    if (data.defectCode == res.data.defectCode) {
                        defUser = JSON.stringify(data);
                    }
                }
                setTranslationMaster({ ...res.data, defUser: defUser });
            }
            else {
                setLoader(false);
            }
        })
    };
    const cancel = () => {
        setCloseDefect(false);
    };

    const [translationsMaster, setTranslationsMaster] = useState([]);
    const [translationMaster, setTranslationMaster] = useState({
        createdDate: new Date(),
        createdBy: "",
        modifiedDate: new Date(),
        modifiedBy: "",
        isActive: true,
        id: 0,
        defectMast_Id: 0,
        defectCode: "",
        defectName: "",
        translation: "",
        languageCode: "",
        defUser: "",
        hostName: ""
    });


    const [langList, setLangList] = useState([]);
    const getLanguageData = async () => {
        setLoader(true);
        ItrApiService.GET({
            url: 'Lang/GetAllLanguageInfo',
            appCode: "CNF"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setLangList(res.data);
            }
            else {
                setLoader(false);
            }
            return
        });
    }

    const [defList, setDefList] = useState([]);
    const getDefectsData = async () => {
        setLoader(true);
        ItrApiService.GET({
            url: 'DefectMaster/GetAllDefectMaster',
            appCode: "CNF"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setDefList(res.data);
            }
            else {
                setLoader(false);
            }
            return;
        });

    }

    const [loader, setLoader] = useState(false);
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);

    const [errors, setErrors] = useState({
        defectName: "",
        translation: "",
        languageCode: "",
    })

    const [exist, setexists] = useState(false);

    const createAssignmentMaster = () => {
        // let { languageCode, defectName, translation } = translationMaster;
        // if (translation == '' || defectName == '' || languageCode == "") {
        //     message.warning('Mandatory fields are missing');
        //     setErrors({
        //         ...errors, defectName: "Defect Name is requied",
        //         translation: "Translation Name is requied",
        //         languageCode: "Language Code is requied",
        //     });
        // }
        // else {
            setLoader(true);
            ItrApiService.POST({
                url: 'DefectTranslationMaster/SaveDefectTranslationMasterList',
                appCode: "CNF",
                data: translationsMaster
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
        // }
    }

    // for-Update-Operation-master
    const updateAssignmentMaster = () => {

        let { languageCode, languageName, translationName } = translationMaster;
        if (languageName == '' || translationName == '' || languageCode == "") {
            setErrors({ ...errors, languageName: 'Language Name is required', translationName: 'Translation Name is required', languageCode: "Language Code is required" })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `Lang/SaveLangMaster`,
                appCode: "CNF",
                data: translationMaster
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

    const getDatas = async (onCreate, onUpdate) => {
        await getLanguageData();
        await getDefectsData();
        setLoader(true);
        ItrApiService.GET({
            url: 'DefectTranslationMaster/GetAllDefectTranslationMaster',
            appCode: "CNF"
        }).then(res => {
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

    }, []);


    const myFunction = (e) => {
        let val = datas2;
        let ss = val.filter(dd => {
            if (dd.languageName.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.defectName.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.translation.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
        });
        setDatas(ss);
        setPagination({ ...pagination, totalPage: ss.length / pageSize, minIndex: 0, maxIndex: pageSize });
    }

    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>Defect Translation Master</h6>
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
                                <th scope="col">Defect Code</th>
                                <th scope="col">Defect Name</th>
                                <th scope="col">Translation Name</th>
                                <th scope='col'>Language Code </th>
                                <th scope="col" className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((trans, index) => index >= pagination.minIndex && index < pagination.maxIndex && (
                                <tr key={index}>
                                    <td> {trans?.defectCode ? trans?.defectCode : '-'} </td>
                                    <td> {trans?.defectName ? trans?.defectName : '-'} </td>
                                    <td> {trans?.translation ? trans?.translation : ''} </td>
                                    <td> {trans?.languageCode ? trans?.languageCode : ''} </td>
                                    <td>
                                        <div className='text-center' onClick={() => { editDefect(trans?.id) }}>
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
                width={500}
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
                } title={< h6 className='m-0' > Add New Translation Master</h6 >} placement="right" onClose={() => {
                    clearFields();
                    onClose();
                }} visible={visible} >
                <div className='defect-master-add-new'>
                    <div className='table-responsive mt-2'>
                        <table className="table table-hover">
                            <thead id='table-header'>
                                <tr>
                                    <th scope="col">Language Name</th>
                                    <th scope="col">Defect Name</th>
                                    <th scope='col'>Translation Name </th>
                                    <th scope="col" className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {translationsMaster.map((item, index) => {
                                    return <tr>
                                        <td>
                                            <input className='form-control form-control-sm mt-1' required
                                                value={item.languageCode}
                                                disabled>
                                            </input>
                                        </td>
                                        <td>
                                            <input className='form-control form-control-sm mt-1'
                                                placeholder='Enter Defect Name'
                                                value={item.defectName}
                                                disabled
                                            />
                                        </td>
                                        <td>
                                            <input className='form-control form-control-sm mt-1'
                                                placeholder='Enter Translation Name'
                                                value={item.translation}
                                                disabled
                                            />
                                        </td>

                                        <td>
                                            <div className='text-center'
                                                onClick={() => {
                                                    let arr1 = [...translationsMaster]
                                                    arr1.splice(index, 1);
                                                    setTranslationsMaster(arr1);
                                                    let tt = sessionStorage.getItem('translation');
                                                    if (tt) {
                                                        if (tt && JSON.parse(tt)) {
                                                            let vv = [...JSON.parse(tt)];
                                                            vv.splice(index, 1);
                                                            if (vv.length == 0) {
                                                                sessionStorage.removeItem('translation');
                                                            }
                                                            else {
                                                                sessionStorage.setItem('translation', JSON.stringify(vv));
                                                            }
                                                        }
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faMinus} color="#F57234" />
                                            </div>
                                        </td>
                                    </tr>
                                })}
                                <tr>
                                    <td>
                                        <small className='text-danger'>{translationMaster.languageCode == '' ? errors.languageCode : ''}</small>
                                        <select className='form-select form-select-sm mt-1' required
                                            value={translationMaster.languageCode}
                                            onChange={(e) => {
                                                if (e.target.value == 'EN') {
                                                    if (translationMaster.defectName != '') {
                                                        setTranslationMaster({ ...translationMaster, languageCode: e.target.value, translation: translationMaster.defectName });
                                                    } else {
                                                        setTranslationMaster({ ...translationMaster, languageCode: e.target.value });
                                                    }
                                                } else {
                                                    setTranslationMaster({ ...translationMaster, languageCode: e.target.value });
                                                }
                                            }}
                                        >
                                            <option value="" selected disabled> Select Level </option>
                                            {langList.map((lang, index) => {
                                                return <option key={index} value={lang?.languageCode}> {lang?.languageName} </option>
                                            })}
                                        </select>
                                    </td>
                                    <td>
                                        <small className='text-danger'>{translationMaster.defectName == '' ? errors.defectName : ''}</small>
                                        <select className='form-select form-select-sm mt-1' required
                                            value={translationMaster.defUser}
                                            onChange={(e) => {
                                                let def = JSON.parse(e.target.value);
                                                if (e.target.value != '') {
                                                    if (translationMaster.languageCode == 'EN') {
                                                        setTranslationMaster({ ...translationMaster, defectName: def.defectName, defectCode: def.defectCode, defUser: e.target.value, translation: def.defectName });
                                                    } else {
                                                        setTranslationMaster({ ...translationMaster, defectName: def.defectName, defectCode: def.defectCode, defUser: e.target.value });
                                                    }
                                                } else {
                                                    setTranslationMaster({ ...translationMaster, defectName: def.defectName, defectCode: def.defectCode, defUser: e.target.value });
                                                }
                                            }}
                                        >
                                            <option value="" selected disabled> Select Level </option>
                                            {defList.map((def, index) => {
                                                return <option key={index} value={JSON.stringify(def)}> {def?.defectName} </option>
                                            })}
                                        </select>
                                    </td>
                                    <td>
                                        <small className='text-danger'>{translationMaster.translation == '' ? errors.translation : ''}</small>
                                        <input className='form-control form-control-sm mt-1'
                                            readOnly={translationMaster.languageCode == "EN" ? true : false}
                                            style={{ fontSize: '13px' }}
                                            placeholder='Enter Translation Name'
                                            value={translationMaster.translation}
                                            onChange={(e) => {
                                                setTranslationMaster({ ...translationMaster, translation: e.target.value })
                                            }}
                                        />
                                    </td>

                                    <td>
                                        <div className='text-center'
                                            onClick={() => {
                                                console.log(translationsMaster)
                                                let { languageCode, defectName, translation } = translationMaster;
                                                if (languageCode == '' || defectName == '' || translation == '') {
                                                    let obj = {
                                                        defectName: "",
                                                        translation: "",
                                                        languageCode: "",
                                                    }
                                                    if (defectName == '' || defectName == '0' || defectName == undefined) obj = { ...obj, defectName: 'Defect Name is required' }
                                                    if (translation == '' || translation == '0' || translation == undefined) obj = { ...obj, translation: 'Tranlation Name is required' }
                                                    if (languageCode == '' || languageCode == '0' || languageCode == undefined) obj = { ...obj, languageCode: 'Language Code is required' }
                                                    setErrors(obj);
                                                }
                                                else {
                                                    setTranslationsMaster([...translationsMaster, translationMaster]);
                                                    setTranslationMaster({ ...translationMaster, defUser: "", languageCode: "", translation: "", defectName: '', defectCode: '' });
                                                    setErrors({
                                                        defectName: "",
                                                        translation: "",
                                                        languageCode: "",
                                                    });
                                                    let deldef = translationMaster;
                                                    delete deldef.defUser
                                                }
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faAdd} color="#F57234" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Drawer>


            {/* Edit */}
            <Drawer
                width={500}
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
                } title={<h6 className='m-0'> Edit Translation Master</h6>} placement="right" onClose={() => { clearFields(); cancel(); }} visible={closeDefect} >
                <div className='defect-master-add-new'>
                    <div className='table-responsive mt-2'>
                        <table className="table table-hover">
                            <thead id='table-header'>
                                <tr>
                                    <th scope="col">Language Name</th>
                                    <th scope="col">Defect Name</th>
                                    <th scope='col'>Translation Name </th>
                                    <th scope="col" className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {translationsMaster.map((item, index) => {
                                    return <tr>
                                        <td>
                                            <input className='form-control form-control-sm mt-1' required
                                                value={item.languageCode}
                                                disabled>
                                            </input>
                                        </td>
                                        <td>
                                            <input className='form-control form-control-sm mt-1'
                                                placeholder='Enter Defect Name'
                                                value={item.defectName}
                                                disabled
                                            />
                                        </td>
                                        <td>
                                            <input className='form-control form-control-sm mt-1'
                                                placeholder='Enter Translation Name'
                                                value={item.translation}
                                                disabled
                                            />
                                        </td>

                                        <td>
                                            <div className='text-center'
                                                onClick={() => {
                                                    let arr1 = [...translationsMaster]
                                                    arr1.splice(index, 1);
                                                    setTranslationsMaster(arr1);
                                                    let tt = sessionStorage.getItem('translation');
                                                    if (tt) {
                                                        if (tt && JSON.parse(tt)) {
                                                            let vv = [...JSON.parse(tt)];
                                                            vv.splice(index, 1);
                                                            if (vv.length == 0) {
                                                                sessionStorage.removeItem('translation');
                                                            }
                                                            else {
                                                                sessionStorage.setItem('translation', JSON.stringify(vv));
                                                            }
                                                        }
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faMinus} color="#F57234" />
                                            </div>
                                        </td>
                                    </tr>
                                })}
                                <tr>
                                    <td>
                                        <small className='text-danger'>{translationMaster.languageCode == '' ? errors.languageCode : ''}</small>
                                        <select className='form-select form-select-sm mt-1' required
                                            value={translationMaster.languageCode}
                                            onChange={(e) => {
                                                if (e.target.value == 'EN') {
                                                    if (translationMaster.defectName != '') {
                                                        setTranslationMaster({ ...translationMaster, languageCode: e.target.value, translation: translationMaster.defectName });
                                                    } else {
                                                        setTranslationMaster({ ...translationMaster, languageCode: e.target.value });
                                                    }
                                                } else {
                                                    setTranslationMaster({ ...translationMaster, languageCode: e.target.value });
                                                }
                                            }}
                                        >
                                            <option value="" selected disabled> Select Level </option>
                                            {langList.map((lang, index) => {
                                                return <option key={index} value={lang?.languageCode}> {lang?.languageName} </option>
                                            })}
                                        </select>
                                    </td>
                                    <td>
                                        <small className='text-danger'>{translationMaster.defectName == '' ? errors.defectName : ''}</small>
                                        <select className='form-select form-select-sm mt-1' required
                                            value={translationMaster.defUser}
                                            onChange={(e) => {
                                                let def = JSON.parse(e.target.value);
                                                if (e.target.value != '') {
                                                    if (translationMaster.languageCode == 'EN') {
                                                        setTranslationMaster({ ...translationMaster, defectName: def.defectName, defectCode: def.defectCode, defUser: e.target.value, translation: def.defectName });
                                                    } else {
                                                        setTranslationMaster({ ...translationMaster, defectName: def.defectName, defectCode: def.defectCode, defUser: e.target.value });
                                                    }
                                                } else {
                                                    setTranslationMaster({ ...translationMaster, defectName: def.defectName, defectCode: def.defectCode, defUser: e.target.value });
                                                }
                                            }}
                                        >
                                            <option value="" selected disabled> Select Level </option>
                                            {defList.map((def, index) => {
                                                return <option key={index} value={JSON.stringify(def)}> {def?.defectName} </option>
                                            })}
                                        </select>
                                    </td>
                                    <td>
                                        <small className='text-danger'>{translationMaster.translation == '' ? errors.translation : ''}</small>
                                        <input className='form-control form-control-sm mt-1'
                                            readOnly={translationMaster.languageCode == "EN" ? true : false}
                                            style={{ fontSize: '13px' }}
                                            placeholder='Enter Translation Name'
                                            value={translationMaster.translation}
                                            onChange={(e) => {
                                                setTranslationMaster({ ...translationMaster, translation: e.target.value })
                                            }}
                                        />
                                    </td>

                                    <td>
                                        <div className='text-center'
                                            onClick={() => {
                                                console.log(translationsMaster)
                                                let { languageCode, defectName, translation } = translationMaster;
                                                if (languageCode == '' || defectName == '' || translation == '') {
                                                    let obj = {
                                                        defectName: "",
                                                        translation: "",
                                                        languageCode: "",
                                                    }
                                                    if (defectName == '' || defectName == '0' || defectName == undefined) obj = { ...obj, defectName: 'Defect Name is required' }
                                                    if (translation == '' || translation == '0' || translation == undefined) obj = { ...obj, translation: 'Tranlation Name is required' }
                                                    if (languageCode == '' || languageCode == '0' || languageCode == undefined) obj = { ...obj, languageCode: 'Language Code is required' }
                                                    setErrors(obj);
                                                }
                                                else {
                                                    setTranslationsMaster([...translationsMaster, translationMaster]);
                                                    setTranslationMaster({ ...translationMaster, defUser: "", languageCode: "", translation: "", defectName: '', defectCode: '' });
                                                    setErrors({
                                                        defectName: "",
                                                        translation: "",
                                                        languageCode: "",
                                                    });
                                                }
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faAdd} color="#F57234" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Drawer >
        </div >
    )
}
