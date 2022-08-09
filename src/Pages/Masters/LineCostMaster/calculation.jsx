import React, { Component } from 'react';

export default class MedalCellRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            linecost: props.data.linecost
        };
    //     this.state = {
    //         workingHrs: props.data.workingHrs
    //     };
    //     this.state = {
    //         operators: props.data.operators
    //     };
     }

    // changes = (e) => {
    //     debugger;
    //     this.setState({
    //         test: e.target.value
    //     });
    //     const temData={...this.props.data};
    //     temData.rate=e.target.value;
    //     this.props.onClick(temData);
    // }

    changes = (e) => {
        debugger;
        this.setState({
            linecost: e.target.value
        });
        const temData = { ...this.props.data };
        temData.linecost = e.target.value;
        this.props.onClick(temData);
    }

    //  operatorschange = (e) => {
    //     this.setState({
    //         operators: e.target.value
    //     });
    //     const temData1 = { ...this.props.data };
    //     temData1.operators = e.target.value;
    //     this.props.onClick(temData1);
    // }
    // workingHrschange = (e) => {
    //     this.setState({
    //         workingHrs: e.target.value
    //     });
    //     const temData2 = { ...this.props.data };
    //     temData2.workingHrs = e.target.value;
    //     this.props.onClick(temData2);
    // }

    render() {
        return (
            <div>
                <input  type='text' className='form-control form-control-sm mt-1' value={this.state.linecost} onChange={this.changes} />
                 {/* <input type='text' className='form-control form-control-sm mt-1' value={this.state.workingHrs}  />
                <input type='text'  className='form-control form-control-sm mt-1' value={this.state.operators}  />  */}
            </div>

        );
    }
}