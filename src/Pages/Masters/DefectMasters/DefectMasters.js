import React, { useState, useEffect } from 'react';
import './DefectMasters.css';
import { Tag, Drawer, Switch, Pagination, Spin, message, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faStar } from '@fortawesome/free-regular-svg-icons';
import { ItrApiService } from '@afiplfeed/itr-ui';

export default function DefectMasters() {

    const clearFields = () => {
        setDefectMaster({
            isActive: true,
            id: 0,
            defectLevel: "",
            defectCategory: "",
            defectCode: "",
            defectName: "",
            displayName: "",
            indexNo: "0",
            defectProfile: '',
            isFav: '',
            hostName: "",
            shtkey: '',
            garmentType: "",
            profArr: [],
            active: 'Y'
            // ...defectMaster, defectName: '', defectLevel: 'Selected Level', defectCategory: '', defectCode: '', displayName: '', defectProfile: '', profArr: [], isActive: true, id: 0, active: 'Y'
        });
        setErrors({ ...errors, defectName: '', defectCode: '', defectLevel: '', defectCategory: '', displayName: '', defectProfile: '' });
        setexists(false);
    }

    const { Option } = Select;

    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };


    // for-Edit-new-defect-master
    const [closeDefect, setCloseDefect] = useState(false);
    const editDefect = (defectId) => {
        setCloseDefect(true);
        ItrApiService.GET({
            url: `DefectMaster/GetDefectbyId/${defectId}`,
            appCode: "CNF",
        }).then(res => {
            if (res.Success == true) {
                console.log(res);
                setDefectMaster(res.data);
            }
            else {
                setLoader(false);
            }
        });
    };
    const cancel = () => {
        setCloseDefect(false);
    };

    const [loader, setLoader] = useState(false);
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);

    const [defectMaster, setDefectMaster] = useState({
        isActive: true,
        id: 0,
        defectLevel: "",
        defectCategory: "",
        defectCode: "",
        defectName: "",
        displayName: "",
        indexNo: "0",
        defectProfile: '',
               isFav: '',
        hostName: "",
        shtkey: '',
        garmentType: "",
        profArr: [],
        active: 'Y'
    });

    const [errors, setErrors] = useState({
        defectName: '',
        defectLevel: '',
        defectCode: '',
        defectCategory: '',
        displayName: '',
        defectProfile: ''
    });
    
    const [exist, setexists] = useState(false);

    const [focus, setFocus] = useState(false);

    const createDefectMaster = () => {
        let { defectName, defectCode, defectLevel, defectCategory, displayName, defectProfile } = defectMaster;

        if (defectName == '' || defectCode == '' || defectLevel == '' || defectCategory == '' || displayName == '' || defectProfile == '') {
            let obj = {
                defectLevel: "",
                defectCategory: "",
                defectCode: "",
                defectName: "",
                displayName: "",
                defectProfile: ""
            }
            if (defectName == '' || defectName == '0' || defectName == undefined) obj = { ...obj, defectName: 'Defect Name is required' };
            if (defectCategory == '' || defectCategory == '0' || defectCategory == undefined) obj = { ...obj, defectCategory: 'Defect Category is required' };
            if (defectCode == '' || defectCode == '0' || defectCode == undefined) obj = { ...obj, defectCode: 'Defect Code is required' };
            if (defectLevel == '' || defectLevel == '0' || defectLevel == undefined) obj = { ...obj, defectLevel: 'Defect Level is required' };
            if (displayName == '' || displayName == '0' || displayName == undefined) obj = { ...obj, displayName: 'Display Name is required' };
            if (defectProfile == '' || defectProfile == '0' || defectProfile == undefined) obj = { ...obj, defectProfile: 'Defect Profile is required' };
            setErrors(obj)
            // setErrors({ ...errors, name: 'Defect Name is required', code: 'Defect Code is required', level: 'Defect Level is required', category: 'Defect Cateogry is required', displayName: 'Display Name is required', profile: 'Defect Profile is required' })
        }
        else {
            let data = {
                isActive: defectMaster.isActive,
                id: 0,
                defectLevel: defectMaster.defectLevel,
                defectCategory: defectMaster.defectCategory,
                defectCode: defectMaster.defectCode,
                defectName: defectMaster.defectName,
                displayName: defectMaster.displayName,
                indexNo: defectMaster.indexNo,
                defectProfile: defectMaster.defectProfile,
                isFav: defectMaster.isFav,
                hostName: defectMaster.hostName,
                shtkey: defectMaster.shtkey,
                garmentType: defectMaster.garmentType,
                active: defectMaster.active
            }

            setLoader(true);
            ItrApiService.POST({
                appCode: 'ENAPP003',
                url: `DefectMaster/IsCheckDefectCode?defectcode=${defectMaster.defectCode}`
            }).then(res => {
                if (res.Success == true) {
                    if (res.data.alertinfo.indexOf("not") == -1 && !exist) {
                        // setexists(true);
                        setFocus(true)
                        message.warning(res.data.alertinfo);
                    }
                    else {
                        ItrApiService.POST({
                            url: 'DefectMaster/SaveDefectMaster',
                            appCode: "CNF",
                            data: data
                        }).then(res => {
                            if (res.Success == true) {
                                let translationMaster = {
                                    isActive: res.data.isActive,
                                    id: 0,
                                    defectMast_Id: res.data.id,
                                    defectCode: res.data.defectCode,
                                    defectName: res.data.defectName,
                                    translation: res.data.defectName,
                                    languageCode: 'EN',

                                };
                                ItrApiService.POST({
                                    url: `DefectTranslationMaster/SaveDefectTranslationMasterList`,
                                    appCode: 'CNF',
                                    data: [translationMaster]
                                }).then(res => {
                                    if (res.Success == true) {
                                        console.log(res);
                                        message.success(res.message);
                                    }
                                    else {
                                        setLoader(false);
                                    }
                                })
                                // setDatas(res.data)
                                message.success("Defects added successfull");
                                setLoader(false);
                                onClose();
                                clearFields();
                                getDatas(true);
                            }
                            else {
                                setLoader(false);
                                // message.warning(res.message);
                            }
                        });
                    }

                }
            })

        }
        // if (defectMaster.defectName == '' && errors.name == '') {
        //     // setErrors({ ...errors, name: 'Defect Name is required' })
        //     message.warning('Defect Name is required');
        // }
        // else if (defectMaster.defectCode == '' && errors.code == '') {
        //     // setErrors({ ...errors, code: 'Defect Code/ is required' })
        //     message.warning('Defect Code is required');
        // }
        // else if (defectMaster.defectLevel == '' && errors.level == '') {
        //     // setErrors({ ...errors, level: 'Defect Level is required' })
        //     message.warning('Defect Level is required');
        // }
        // else if (defectMaster.defectCategory == '' && errors.category == '') {
        //     // setErrors({ ...errors, category: 'Defect Category is required' })
        //     message.warning('Defect Category is required');
        // }
        // else if (defectMaster.displayName == '' && errors.displayName == '') {
        //     // setErrors({ ...errors, displayName: 'Display Name is required' })
        //     message.warning('Display Name is required');
        // }
        // else if (defectMaster.defectProfile == '' && errors.profile == '') {
        //     // setErrors({ ...errors, profile: 'Defect Profile is required' })
        //     message.warning('Defect Profile is required');
        // }

    }

    const updateDefectMaster = () => {
        let { defectName, defectCode, defectLevel, defectCategory, displayName, defectProfile } = defectMaster;

        if (defectName == '' || defectCode == '' || defectLevel == '' || defectCategory == '' || displayName == '' || defectProfile == '') {
            let obj = {
                defectLevel: "",
                defectCategory: "",
                defectCode: "",
                defectName: "",
                displayName: "",
                defectProfile: ""
            }
            if (defectName == '' || defectName == '0' || defectName == undefined) obj = { ...obj, defectName: 'Defect Name is required' };
            if (defectCategory == '' || defectCategory == '0' || defectCategory == undefined) obj = { ...obj, defectCategory: 'Defect Category is required' };
            if (defectCode == '' || defectCode == '0' || defectCode == undefined) obj = { ...obj, defectCode: 'Defect Code is required' };
            if (defectLevel == '' || defectLevel == '0' || defectLevel == undefined) obj = { ...obj, defectLevel: 'Defect Level is required' };
            if (displayName == '' || displayName == '0' || displayName == undefined) obj = { ...obj, displayName: 'Display Name is required' };
            if (defectProfile == '' || defectProfile == '0' || defectProfile == undefined) obj = { ...obj, defectProfile: 'Defect Profile is required' };
            setErrors(obj);
            // setErrors({ ...errors, name: 'Defect Name is required', code: 'Defect Code is required', level: 'Defect Level is required', category: 'Defect Cateogry is required', displayName: 'Display Name is required', profile: 'Defect Profile is required' })
        }
        else {
            let translationMaster = [{
                isActive: defectMaster.isActive,
                id: 0,
                defectMast_Id: defectMaster.id,
                defectCode: defectMaster.defectCode,
                defectName: defectMaster.defectName,
                translation: defectMaster.defectName,
                languageCode:'EN',
            }]

            setLoader(true);
            ItrApiService.POST({
                url: `DefectMaster/SaveDefectMaster`,
                appCode: "CNF",
                data: defectMaster
            }).then(res => {
                if (res.Success == true) {
                    console.log(defectMaster);
                    ItrApiService.POST({
                        url: `DefectTranslationMaster/SaveDefectTranslationMasterList`,
                        appCode: 'CNF',
                        data: translationMaster
                    }).then(res => {
                        if (res.Success == true) {
                            console.log(res);
                            message.success(res.message);
                        }
                        else {
                            setLoader(false);
                        }
                    })
                    setLoader(false);
                    cancel();
                    clearFields();
                    getDatas(false, true);
                    message.success("Defects Updated successfull");
                }
                else {
                    message.warning(res.message);
                    setLoader(false);
                }
                // setDatas(res.data)
            });
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
    
    const [defCat, setDefCat] = useState([]);

    const getDefectCat = () => {
        ItrApiService.GET({
            url: 'DefectMaster/GetAllDefectMasterWithCategory',
            appCode: "CNF"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setDefCat(res.data.categories);
            }
            else {
                // message.warning('Something went wrong');
                setLoader(false);
            }
        });
    }


    const getDatas = (onCreate, onUpdate) => {
        setLoader(true);
        ItrApiService.GET({
            url: 'DefectMaster/GetAllDefectMaster',
            appCode: "CNF"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setDatas(res.data);
                setDatas2(res.data);
                // for (let defProfile of res.data) {
                //     let getArray = defProfile.defectProfile.split('')
                // }
                if (onCreate && onCreate == true) {
                    setPagination({ ...pagination, totalPage: res.data.length / pageSize, minIndex: (Math.ceil(res.data.length / pageSize) - 1) * pageSize, maxIndex: Math.ceil(res.data.length / pageSize) * pageSize, current: Math.ceil(res.data.length / pageSize) });
                } else if (onUpdate && onUpdate == true) {
                    setPagination({ ...pagination, totalPage: res.data.length / pageSize });
                } else {
                    setPagination({ ...pagination, totalPage: res.data.length / pageSize, minIndex: 0, maxIndex: pageSize });
                }
            }
            else {
                // message.warning('Something went wrong');
                setLoader(false);
            }
        });
    }

    useEffect(() => {
        getDatas();
        getDefectCat();
       
    }, []);


    const myFunction = (e) => {
        let val = datas2;
        // var input, filter, table, tr, td, i, txtValue;
        // input = document.getElementById("masterSearch");
        let ss = val.filter(dd => {
            if (dd.defectCode.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.defectCategory.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.defectName.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.defectLevel.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.displayName.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.defectProfile.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
        });
        setDatas(ss);
        setPagination({ ...pagination, totalPage: ss.length / pageSize, minIndex: 0, maxIndex: pageSize });
        //         filter = input.value.toUpperCase();
        //         table = document.getElementById("masterTable");
        //         tr = table.getElementsByTagName("tr");
        // 
        //         for (i = 0; i < tr.length; i++) {
        //             td = tr[i].getElementsByTagName("td")[1];
        //             if (td) {
        //                 txtValue = td.textContent || td.innerText;
        //                 if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //                     tr[i].style.display = "";
        //                 } else {
        //                     tr[i].style.display = "none";
        //                 }
        //             }
        //         }
    }

    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>Defect Master</h6>
                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1'>
                        <input type="search" className='form-control' id='masterSearch' placeholder='Search' onChange={myFunction} />
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
                    <table className="table table-hover" id='masterTable'>
                        <thead id='table-header'>
                            <tr>
                                <th scope="col">Favourite</th>
                                <th scope="col">Defect Code</th>
                                <th scope="col">Defect Category</th>
                                <th scope="col">Defect Name</th>
                                <th scope="col">Defect Level</th>
                                <th scope="col">Display Name</th>
                                <th scope="col">Defect Profile</th>
                                <th scope='col'> Defect Status </th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {datas.map((defect, index) => index >= pagination.minIndex && index < pagination.maxIndex && (
                                <tr key={index}>
                                    <td> {defect?.isFav == "Y" ? <FontAwesomeIcon icon={faStar} color="#F7931D" /> : <FontAwesomeIcon icon={faStar} color="grey" />} </td>
                                    <td> {defect?.defectCode ? defect?.defectCode : '-'} </td>
                                    <td> {defect?.defectCategory ? defect?.defectCategory : '-'} </td>
                                    <td> {defect?.defectName ? defect?.defectName : '-'} </td>
                                    <td>
                                        <Tag style={{ borderRadius: '4px' }}
                                            color={defect?.defectLevel == 'Critical' ? '#FF1414' : defect?.defectLevel == 'Major' ? '#F7931D' : '#59A0E5'}
                                        >
                                            {defect?.defectLevel ? defect?.defectLevel : '-'}
                                        </Tag>
                                    </td>
                                    <td> {defect?.displayName ? defect?.displayName : '-'} </td>
                                    <td>
                                        <Tag style={{ borderRadius: '4px', backgroundColor: defect.defectProfile == '' ? 'white' : '#F7931D', color: defect.defectProfile == '' ? 'black' : 'white' }}
                                        >
                                            {defect?.defectProfile ? defect?.defectProfile.split('') : '-'}
                                        </Tag>
                                        {/* {defect?.defectProfile ? defect?.defectProfile : '-'}  */}
                                    </td>
                                    <td>
                                        <Tag style={{ borderRadius: '4px', backgroundColor: defect?.active == 'Y' ? 'green' : '#FF1414', color: 'white' }}
                                        >
                                            {defect?.active == 'Y' ? 'YES' : 'NO'}
                                        </Tag>
                                    </td>
                                    <td>
                                        <div className='text-center' onClick={() => { editDefect(defect?.id) }}>
                                            <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {/* { datas && datas?.map((defect, index) => (
                                <tr key={index}>
                                    <td> {defect?.isFav == "Y" ? <FontAwesomeIcon icon={faStar} color="yellow" /> : <FontAwesomeIcon icon={faStar} color="grey" />} </td>
                                    <td> {defect?.defectCode} </td>
                                    <td> {defect?.defectCategory} </td>
                                    <td> {defect?.defectName} </td>
                                    <td>
                                        <Tag
                                            color={defect?.defectLevel == 'Critical' ? '#FF1414' : defect?.defectLevel == 'Major' ? '#F7931D' : '#59A0E5'}
                                        >
                                            {defect?.defectLevel}
                                        </Tag>
                                    </td>
                                    <td> {defect?.defectProfile ? defect?.defectProfile : '-'} </td>
                                    <td>
                                        <div className='text-center' onClick={() => { editDefect(defect?.id); console.log(defect?.id, 'defect master id') }}>
                                            <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                        </div>
                                    </td>
                                </tr>
                            ))} */}
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
                        showSizeChanger={false}
                    />
                </div>
            </div>


            {/* Add */}
            <Drawer
                maskClosable={false}
                keyboard={false}
                footer={
                    <div>
                        <div>
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={() => createDefectMaster()}> Save </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                onClose();
                            }}> Cancel </button>
                        </div>
                    </div>
                } title={< h6 className='m-0' > Add New Defect</h6 >} placement="right" onClose={() => { clearFields(); onClose() }} visible={visible} >
                <div className='defect-master-add-new'>
                    <form>
                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Defect Name <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{defectMaster.defectName == '' ? errors.defectName : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter Defect Name'
                                minLength="1" maxLength="50"
                                value={defectMaster.defectName}
                                onChange={(e) => setDefectMaster({ ...defectMaster, defectName: e.target.value, })}
                                required />
                        </div>

                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Defect Code <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{defectMaster.defectCode == '' ? errors.defectCode : ''}</small>
                            </div>
                            <input
                                // style={{ borderColor: focus == true ? 'rgb(255,5,5)' : '', boxShadow: focus == true ? '-2px 2px 7px -1px rgba(255,5,5,1)': '' }}
                                className='form-control form-control-sm mt-1' placeholder='Enter Defect Name'
                                minLength="1" maxLength="10"
                                value={defectMaster.defectCode}
                                onChange={(e) => {
                                    setDefectMaster({ ...defectMaster, defectCode: e.target.value });
                                    //                                     ItrApiService.POST({
                                    //                                         appCode:'ENAPP003',
                                    //                                         url:`DefectMaster/IsCheckDefectCode?defectcode=${e.target.value}`
                                    //                                     }).then(res => {
                                    //                                         if(res.Success == true){
                                    //                                             // setDefectMaster({...defectMaster, ...res.data})
                                    //                                         } else {
                                    // 
                                    //                                         }
                                    //                                     })
                                }}
                                required />
                        </div>

                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Defect Level <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{defectMaster.defectLevel == '' ? errors.defectLevel : ''}</small>
                            </div>
                            <select className='form-select form-select-sm mt-1' required
                                value={defectMaster.defectLevel}
                                onChange={(e) => setDefectMaster({ ...defectMaster, defectLevel: e.target.value })}
                            >
                                <option value=""> Select Level </option>
                                <option value="Major"> MAJOR </option>
                                <option value="Minor"> MINOR </option>
                                <option value="Critical"> CRITICAL </option>
                            </select>
                        </div>

                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Defect Category <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{defectMaster.defectCategory == '' ? errors.defectCategory : ''}</small>
                            </div>
                            <select className='form-select form-select-sm mt-1' required
                                value={defectMaster.defectCategory}
                                onChange={(e) => setDefectMaster({ ...defectMaster, defectCategory: e.target.value })}
                            >
                                <option value="" selected> Select Category </option>
                                {defCat.map((cate, index) => {
                                    return <option key={index} value={cate}>{cate}</option>
                                })}
                            </select>
                        </div>

                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Display Name <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{defectMaster.displayName == '' ? errors.displayName : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter Defect Name'
                                minLength="0" maxLength="10"
                                value={defectMaster.displayName}
                                onChange={(e) => setDefectMaster({ ...defectMaster, displayName: e.target.value })}
                                required />
                        </div>
                      
                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Defect Profile <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{defectMaster.defectProfile == '' ? errors.defectProfile : ''}</small>
                            </div>
                            {/* <select className='form-select form-select-sm mt-1'
                                value={defectMaster.defectProfile}
                                onChange={(e) => setDefectMaster({ ...defectMaster, defectProfile: e.target.value })}
                                required>
                                <option selected> Multi-Select Profile </option>
                                <option value="Score Card"> Score Card </option>
                                <option value="End Line"> End Line </option>
                                <option value="Finishing"> Finishing </option>
                                <option value="Audit"> Audit </option>
                            </select> */}
                            <Select mode="multiple" style={{ width: '100%' }} placeholder="Select Defect Profile"
                                value={defectMaster.profArr}
                                onChange={(e) => {
                                    setDefectMaster({
                                        ...defectMaster, defectProfile: e.join(','),
                                        profArr: [...e]
                                    })
                                }}
                            >
                                <Option value="S" > Score Card </Option>
                                <Option value="E" > End Line / Inline </Option>
                                <Option value="F" > Finishing </Option>
                                <Option value="A" > Audit </Option>
                            </Select>
                            {/* <p className='text-danger'> {errors} </p> */}
                        </div>
                                               <div className='mt-3'>
                            <label>Defect Status <span className='text-danger'>*</span> </label>
                            <div className='mt-1'>
                                <Switch size='default' checked={defectMaster.active == 'Y'}
                                    onChange={(e) => { setDefectMaster({ ...defectMaster, active: e == true ? 'Y' : 'N' }); }}
                                />
                                <span className='px-2'> {defectMaster.active === 'Y' ? 'Active' : 'Disable'} </span>
                            </div>
                            {/* <p className='text-danger'> {errors} </p> */}
                        </div>
                    </form>
                </div>
            </Drawer>



            {/* Edit */}
            <Drawer
                maskClosable={false}
                keyboard={false}
                footer={
                    <>
                        <div>
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={updateDefectMaster}> Update </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                cancel();
                            }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Edit Defect</h6 >} placement="right" onClose={() => {
                    clearFields();
                    cancel();
                }
                } visible={closeDefect} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Defect Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{defectMaster.defectName == '' ? errors.defectName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Defect Name'
                            minLength="1" maxLength="50"
                            value={defectMaster.defectName}
                            onChange={(e) => setDefectMaster({ ...defectMaster, defectName: e.target.value })}
                            required />
                        {/* <p className='text-danger'> {errors.name} </p> */}
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Defect Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{defectMaster.defectCode == '' ? errors.defectCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Defect Name' disabled
                            minLength="1" maxLength="10"
                            value={defectMaster.defectCode}
                            onChange={(e) => setDefectMaster({ ...defectMaster, defectCode: e.target.value })}
                            required />
                        {/* <p className='text-danger'> {errors.code} </p> */}
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Defect Level <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{defectMaster.defectLevel == '' ? errors.defectLevel : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={defectMaster.defectLevel}
                            onChange={(e) => setDefectMaster({ ...defectMaster, defectLevel: e.target.value })}
                        >
                            <option value="Selected Level" disabled selected> Select Level </option>
                            <option value="Major"> MAJOR </option>
                            <option value="Minor"> MINOR </option>
                            <option value="Critical"> CRITICAL </option>
                        </select>
                        {/* <p className='text-danger'> {errors.level} </p> */}
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Defect Category <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{defectMaster.defectCategory == '' ? errors.defectCategory : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={defectMaster.defectCategory}
                            onChange={(e) => setDefectMaster({ ...defectMaster, defectCategory: e.target.value })}
                        >
                            <option value="" selected> Select Category </option>
                            {defCat.map((cate, index) => {
                                return <option key={index} value={cate}>{cate}</option>
                            })}
                        </select>
                        {/* <p className='text-danger'> {errors.category} </p> */}
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Display Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{defectMaster.displayName == '' ? errors.displayName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Defect Name'
                            minLength="0" maxLength="10"
                            value={defectMaster.displayName}
                            onChange={(e) => setDefectMaster({ ...defectMaster, displayName: e.target.value })}
                            required />
                        {/* <p className='text-danger'> {errors.displayName} </p> */}
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Defect Profile <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{defectMaster.defectProfile == '' ? errors.defectProfile : ''}</small>
                        </div>
                        {/* <select className='form-select form-select-sm mt-1'
                            value={defectMaster.defectProfile}
                            onChange={(e) => setDefectMaster({ ...defectMaster, defectProfile: e.target.value })}
                            required>
                            <option selected> Multi-Select Profile </option>
                        </select> */}
                        <Select mode="multiple" style={{ width: '100%' }} placeholder="Select Defect Profile"
                            value={defectMaster.defectProfile.split(',')}
                            onChange={(e) => {
                                setDefectMaster({
                                    ...defectMaster, defectProfile: e.join(','),
                                    profArr: [...e]
                                })
                            }}
                        >
                            <Option value="S" > Score Card </Option>
                            <Option value="E" > End Line / Inline </Option>
                            <Option value="F" > Finishing </Option>
                            <Option value="A" > Audit </Option>
                        </Select>
                        {/* <p className='text-danger'> {errors} </p> */}
                    </div>
                  
                    <div className='mt-3'>
                        <label>Defect Status <span className='text-danger'>*</span> </label>
                        <div className='mt-1'>
                            <Switch size='default' checked={defectMaster.active == 'Y'}
                                onChange={(e) => setDefectMaster({ ...defectMaster, active: e == true ? 'Y' : 'N' })}
                            />
                            <span className='px-2'> {defectMaster.active === 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                        {/* <p className='text-danger'> {errors} </p> */}
                    </div>
                    <div className='mt-3'>
                        <label>Defect Favourite <span className='text-danger'>*</span> </label>
                        <div className='mt-1'>
                            <Switch size='default' checked={defectMaster.isFav == 'Y'}
                                onChange={(e) => setDefectMaster({ ...defectMaster, isFav: e == true ? 'Y' : 'N' })}
                            />
                            <span className='px-2'> {defectMaster.isFav === 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                        {/* <p className='text-danger'> {errors} </p> */}
                    </div>
                </div>
            </Drawer>
        </div >
    )
}
