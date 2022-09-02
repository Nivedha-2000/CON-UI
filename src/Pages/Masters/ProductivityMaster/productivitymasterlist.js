import React, { Component, Fragment } from 'react';
//import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// import Enumerable from 'linq';

class ProductivityMasterList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            finalDetl: this.props.PML1
        };
    }

    render() {
        return (
            <div>
                <table className="table" border="1">
                    <thead className="thead-light">
                        <th className="text-center w-10">Actions</th>
                        <th className="" align='center'>Factory</th>
                        <th className="" align='center'>Product Type</th>
                        <th className="" align='center'>Sub Product</th>
                        <th className="" align='center'>No Of Operators</th>
                        <th className="" align='center'>Fabric Type</th>
                        <th className="" align='center'>Difficulty Level</th>
                        <th className="" align='center'>WorkingHrs</th>
                        <th className="" align='center'>Start Date</th>
                        <th className="" align='center'>End Date</th>
                        {

                            this.props.daylist.filter(f => f != (this.props.daylist.length)).map((data, ind) => (
                                <th className="" colSpan={2}>{data}</th>
                            ))
                        }
                    </thead>
                    <tbody>
                        {
                            this.props.PML1.map((data, ind) => (
                                <tr>
                                    <td>
                                        <button onClick={this.props.EditRow} data-param={JSON.stringify(data)} className="MuiButtonBase-root MuiIconButton-root text-success MuiIconButton-colorPrimary" tabindex="0" type="button" aria-label="Edit">
                                            <span className="MuiIconButton-label" data-param={JSON.stringify(data)} >
                                                <i className="zmdi zmdi-edit" data-param={JSON.stringify(data)}></i>
                                            </span>
                                            <span className="MuiTouchRipple-root"></span>
                                        </button>
                                        <button className="MuiButtonBase-root MuiIconButton-root text-danger MuiIconButton-colorPrimary" tabindex="0" type="button" aria-label="Delete" >
                                            <span className="MuiIconButton-label">
                                                <i className="zmdi zmdi-delete"></i>
                                            </span>
                                            <span className="MuiTouchRipple-root"></span>
                                        </button>
                                    </td>
                                    <td>{data.factCode}</td>
                                    <td>{data.productType}</td>
                                    <td>{data.lineGroup}</td>
                                    <td>{data.noOfOperators}</td>
                                    <td>{data.plaidType}</td>
                                    <td>{data.difficultyLevel}</td>
                                    <td>{data.workingHrs}</td>
                                    <td>{data.startdate}</td>
                                    <td>{data.enddate}</td>
                                    {
                                        //this.props.daylist.filter(f => f != (this.props.daylist.length))
                                        this.props.daylist.filter(f => f != (this.props.daylist.length)).map(data1 => {
                                            return (this.props.PML.filter(f => f.factCode == data.factCode && f.lineGroup == data.lineGroup && f.noOfOperators == data.noOfOperators && f.productType == data.productType && f.plaidType == data.plaidType && f.difficultyLevel == data.difficultyLevel && f.workingHrs == data.workingHrs && f.scaleUpDay == data1).length ?
                                                (
                                                    this.props.PML.filter(f => f.factCode == data.factCode && f.lineGroup == data.lineGroup && f.noOfOperators == data.noOfOperators && f.productType == data.productType && f.plaidType == data.plaidType && f.difficultyLevel == data.difficultyLevel && f.workingHrs == data.workingHrs && f.scaleUpDay == data1).map((data2, ind2) => (
                                                        <>
                                                            <td className="">{data2.scaleUpEffPer}</td>
                                                            <td className="">{data2.peakEff}</td>
                                                        </>
                                                    ))
                                                ) : (
                                                    <>
                                                        <td className=""></td>
                                                        <td className=""></td>
                                                    </>
                                                ));
                                        })


                                        // this.props.PML.filter(f => f.factCode == data.factCode && f.lineGroup == data.lineGroup && f.noOfOperators == data.noOfOperators && f.productType == data.productType && f.plaidType == data.plaidType && f.difficultyLevel == data.difficultyLevel && f.workingHrs == data.workingHrs).map((data1, ind1) => (
                                        //     this.props.PML.filter(f => f.factCode == data1.factCode && f.lineGroup == data1.lineGroup && f.noOfOperators == data1.noOfOperators && f.productType == data1.productType && f.plaidType == data1.plaidType && f.difficultyLevel == data1.difficultyLevel && f.workingHrs == data1.workingHrs && f.scaleUpDay == data1.scaleUpDay).map((data2, ind2) => (
                                        //         <>
                                        //             <td className="">{data2.scaleUpEffPer}</td>
                                        //             <td className="">{data2.peakEff}</td>
                                        //         </>
                                        //     ))
                                        // ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div >
        )
    }

}

export default ProductivityMasterList;