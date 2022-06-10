import React from "react";
import MUIDataTable from "mui-datatables";
import {
    checkboxEnableGrid,
    optionsDisableGrid,
    optionsOtherGrid,
} from "../MuiTable";

const CustomTableComponent = ({
                                  title,
                                  columns,
                                  data,
                                  options,
                                  downloadFileName,
                                  checkbox,
                                  selectedDeliveryIndex
                              }) => {
    return (
        <MUIDataTable
            data={data}
            columns={columns}
            options={
                options ? options : optionsDisableGrid
            }
            title={title}
        />
    );
};

export default CustomTableComponent;
