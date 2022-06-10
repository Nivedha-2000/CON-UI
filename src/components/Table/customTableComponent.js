import React from "react";
import MUIDataTable from "mui-datatables";
import {
    checkboxEnableGrid,
    optionsDisableGrid,
    optionsOtherGrid,
} from "./MuiTable";

const CustomTableComponent = ({
                                  title,
                                  columns,
                                  data,
                                  options,
                                  downloadFileName,
                                  checkbox,
                                  search,
                                  selectedDeliveryIndex
                              }) => {
    return (
        <MUIDataTable
            data={data}
            columns={columns}
            options={
                options ? optionsOtherGrid(downloadFileName, search) : checkbox ? checkboxEnableGrid(downloadFileName, selectedDeliveryIndex) : optionsDisableGrid
            }
            title={title}
        />
    );
};

export default CustomTableComponent;
