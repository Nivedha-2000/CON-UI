import React, { useState, useEffect } from 'react';
import './DefectMasters1.css';
import { Tag, Drawer, Switch, Pagination, Spin, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faStar } from '@fortawesome/free-regular-svg-icons';
import { ItrApiService } from '@afiplfeed/itr-ui';
// import { baseUrl } from '../../../Env/baseUrl';

export default function DefectMasters1() {

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
            appCode: "ENAPP003",
        }).then(res => {
            if (res.Success == true) {
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


    const [defectMaster, setDefectMaster] = useState({
        isActive: true,
        id: 0,
        defectLevel: "",
        defectCategory: "",
        defectCode: "",
        defectName: "",
        displayName: "",
        indexNo: "0",
        isFav: "",
        hostName: ""
    });
    const [errors, setErrors] = useState({
        name: '',
        level: '',
        code: '',
        category: '',
        displayName: ''
    });

    const createDefectMaster = async () => {
        let { defectName, defectCode, defectLevel, defectCategory, displayName } = defectMaster;
        if (defectName == '' && defectCode == '' && defectLevel == '' && defectCategory == '', displayName == '') {
            setErrors({ ...errors, name: 'Defect Name is required', code: 'Defect Code is required', level: 'Defect Level is required', category: 'Defect Cateogry is required', displayName: 'Display Name is required' })
        }
        else {
            setLoader(true);
            await ItrApiService.POST({
                url: 'DefectMaster/SaveDefectMaster',
                appCode: "ENAPP003",
                data: defectMaster
            }).then(res => {
                if (res.Success == true) {
                    // setDatas(res.data)
                    message.success(res.message);
                    setLoader(false);
                    onClose();
                    getDatas();
                }
                else {
                    setLoader(false);
                    message.warning('Something went wrong');
                }
            });
        }
    }

    const updateDefectMaster = () => {
        let { defectName, defectCode, defectLevel, defectCategory, displayName } = defectMaster;
        if (defectName == '' && defectCode == '' && defectLevel == '' && defectCategory == '', displayName == '') {
            setErrors({ ...errors, name: 'Defect Name is required', code: 'Defect Code is required', level: 'Defect Level is required', category: 'Defect Cateogry is required', displayName: 'Display Name is required' })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `DefectMaster/SaveDefectMaster`,
                appCode: "ENAPP003",
                data: defectMaster
            }).then(res => {
                if (res.Success == true) {
                    setLoader(false);
                    cancel();
                    getDatas();
                    message.success(res.message);
                }
                else {
                    message.warning('Something went wrong');
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
            appCode: "ENAPP003"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setDefCat(res.data.categories);
            }
            else {
                message.warning('Something went wrong');
                setLoader(false);
            }
        });
    }


    const getDatas = () => {
        setLoader(true);
        ItrApiService.GET({
            url: 'DefectMaster/GetAllDefectMaster',
            appCode: "ENAPP003"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setDatas(res.data);
                setPagination({ ...pagination, totalPage: res.data.length / pageSize, minIndex: 0, maxIndex: pageSize });
            }
            else {
                message.warning('Something went wrong');
                setLoader(false);
            }
        });
    }

    useEffect(() => {
        getDatas();
        getDefectCat();
    }, []);


    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>Defect Master 1</h6>
                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1'>
                        <input type="text" className='form-control' placeholder='Search' />
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                        <select className='form-select form-select-sm border-0'>
                            <option> All Locations </option>
                        </select>
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                        <button className='btn-sm btn defect-master-add' onClick={showDrawer}> + Add New </button>
                    </div>
                </div>

                <div className='table-responsive mt-2 defect-master-table'>
                    <table className="table table-hover">
                        <thead id='table-header'>
                            <tr>
                                <th scope="col">Favourite</th>
                                <th scope="col">Defect Code</th>
                                <th scope="col">Defect Category</th>
                                <th scope="col">Defect Name</th>
                                <th scope="col">Defect Level</th>
                                <th scope="col">Defect Profile</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {datas.map((defect, index) => index >= pagination.minIndex && index < pagination.maxIndex && (
                                <tr key={index}>
                                    <td> {defect?.isFav == "Y" ? <FontAwesomeIcon icon={faStar} color="#F7931D" /> : <FontAwesomeIcon icon={faStar} color="grey" />} </td>
                                    <td> {defect?.defectCode} </td>
                                    <td> {defect?.defectCategory} </td>
                                    <td> {defect?.defectName} </td>
                                    <td>
                                        <Tag style={{ borderRadius: '4px' }}
                                            color={defect?.defectLevel == 'Critical' ? '#FF1414' : defect?.defectLevel == 'Major' ? '#F7931D' : '#59A0E5'}
                                        >
                                            {defect?.defectLevel}
                                        </Tag>
                                    </td>
                                    <td> {defect?.defectProfile ? defect?.defectProfile : '-'} </td>
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
                    />
                </div>
            </div>


            {/* Add */}
            <Drawer footer={
                <div>
                    <div>
                        <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={createDefectMaster}> Save </button>
                    </div>
                    <div>
                        <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                            setDefectMaster({
                                ...defectMaster, defectName: '', defectLevel: 'Selected Level', defectCategory: '', defectCode: '', displayName: '', isActive: false
                            }); onClose()
                        }}> Cancel </button>
                    </div>
                </div>
            } title={< h6 className='m-0' > Add New Defect</h6 >} placement="right" onClose={() => {
                setDefectMaster({
                    ...defectMaster, defectName: '', defectLevel: 'Selected Level', defectCategory: '', defectCode: '', displayName: '', isActive: false
                }); onClose()
            }} visible={visible} >
                <div className='defect-master-add-new'>
                    <form>
                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Defect Name <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{defectMaster.defectName == '' ? errors.name : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter Defect Name'
                                value={defectMaster.defectName}
                                onChange={(e) => setDefectMaster({ ...defectMaster, defectName: e.target.value, })}
                                required />
                        </div>

                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Defect Code <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{defectMaster.defectCode == '' ? errors.code : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter Defect Name'
                                value={defectMaster.defectCode}
                                onChange={(e) => setDefectMaster({ ...defectMaster, defectCode: e.target.value })}
                                required />
                        </div>

                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Defect Level <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{defectMaster.defectLevel == '' ? errors.level : ''}</small>
                            </div>
                            <select className='form-select form-select-sm mt-1' required
                                value={defectMaster.defectLevel}
                                onChange={(e) => setDefectMaster({ ...defectMaster, defectLevel: e.target.value })}
                            >
                                <option value="Selected Level"> Select Level </option>
                                <option value="Major"> MAJOR </option>
                                <option value="Minor"> MINOR </option>
                                <option value="Critical"> CRITICAL </option>
                            </select>
                        </div>

                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Defect Category <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{defectMaster.defectCategory == '' ? errors.category : ''}</small>
                            </div>
                            <select className='form-select form-select-sm mt-1' required
                                value={defectMaster.defectCategory}
                                onChange={(e) => setDefectMaster({ ...defectMaster, defectCategory: e.target.value })}
                            >
                                <option value="Select Category" selected> Select Category </option>
                                {defCat.map((cate, index) => {
                                    return <option value={cate}>{cate}</option>
                                })}
                            </select>
                        </div>

                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Display Name <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{defectMaster.displayName == '' ? errors.displayName : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter Defect Name'
                                value={defectMaster.displayName}
                                onChange={(e) => setDefectMaster({ ...defectMaster, displayName: e.target.value })}
                                required />
                        </div>

                        <div className='mt-3'>
                            <label>Defect Profile <span className='text-danger'>*</span> </label>
                            <select className='form-select form-select-sm mt-1'
                                value={defectMaster.defectProfile}
                                onChange={(e) => setDefectMaster({ ...defectMaster, defectProfile: e.target.value })}
                                required>
                                <option selected> Multi-Select Profile </option>
                                <option value="Score Card"> Score Card </option>
                                <option value="End Line"> End Line </option>
                                <option value="Finishing"> Finishing </option>
                                <option value="Audit"> Audit </option>
                            </select>
                            {/* <p className='text-danger'> {errors} </p> */}
                        </div>

                        <div className='mt-3'>
                            <label>Defect Status <span className='text-danger'>*</span> </label>
                            <div className='mt-1'>
                                <Switch size='default' checked={defectMaster.isActive}
                                    onChange={(e) => setDefectMaster({ ...defectMaster, isActive: e })}
                                />
                                <span className='px-2'> {defectMaster.isActive == true ? 'Active' : 'Disable'} </span>
                            </div>
                            {/* <p className='text-danger'> {errors} </p> */}
                        </div>
                    </form>
                </div>
            </Drawer>




            {/* Edit */}
            <Drawer size="large" footer={
                <>
                    <div>
                        <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={updateDefectMaster}> Update </button>
                    </div>
                    <div>
                        <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={cancel}> Cancel </button>
                    </div>
                </>
            } title={< h6 className='m-0' > Edit Defect</h6 >} placement="right" onClose={cancel} visible={closeDefect} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Defect Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{defectMaster.defectName == '' ? errors.name : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Defect Name'
                            value={defectMaster.defectName}
                            onChange={(e) => setDefectMaster({ ...defectMaster, defectName: e.target.value })}
                            required />
                        {/* <p className='text-danger'> {errors.name} </p> */}
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Defect Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{defectMaster.defectCode == '' ? errors.code : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Defect Name' disabled
                            value={defectMaster.defectCode}
                            onChange={(e) => setDefectMaster({ ...defectMaster, defectCode: e.target.value })}
                            required />
                        {/* <p className='text-danger'> {errors.code} </p> */}
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Defect Level <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{defectMaster.defectLevel == '' ? errors.level : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={defectMaster.defectLevel}
                            onChange={(e) => setDefectMaster({ ...defectMaster, defectLevel: e.target.value })}
                        >
                            <option value="Selected Level" disabled selected> Select Level </option>
                            <option value="MAJOR"> MAJOR </option>
                            <option value="MINOR"> MINOR </option>
                            <option value="CRITICAL"> CRITICAL </option>
                        </select>
                        {/* <p className='text-danger'> {errors.level} </p> */}
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Defect Category <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{defectMaster.defectCategory == '' ? errors.category : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={defectMaster.defectCategory}
                            onChange={(e) => setDefectMaster({ ...defectMaster, defectCategory: e.target.value })}
                        >
                            <option selected> Select Category </option>
                            {defCat.map((cate, index) => {
                                return <option value={cate}>{cate}</option>
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
                            value={defectMaster.displayName}
                            onChange={(e) => setDefectMaster({ ...defectMaster, displayName: e.target.value })}
                            required />
                        {/* <p className='text-danger'> {errors.displayName} </p> */}
                    </div>

                    <div className='mt-3'>
                        <label>Defect Profile <span className='text-danger'>*</span> </label>
                        <select className='form-select form-select-sm mt-1'
                            value={defectMaster.defectProfile}
                            onChange={(e) => setDefectMaster({ ...defectMaster, defectProfile: e.target.value })}
                            required>
                            <option selected> Multi-Select Profile </option>
                        </select>
                        {/* <p className='text-danger'> {errors} </p> */}
                    </div>

                    <div className='mt-3'>
                        <label>Defect Status <span className='text-danger'>*</span> </label>
                        <div className='mt-1'>
                            <Switch size='default' checked={defectMaster.isActive}
                                onChange={(e) => setDefectMaster({ ...defectMaster, isActive: e })}
                            />
                            <span className='px-2'> {defectMaster.isActive == true ? 'Active' : 'Disable'} </span>
                        </div>
                        {/* <p className='text-danger'> {errors} </p> */}
                    </div>
                </div>
            </Drawer>
        </div >
    )
}
