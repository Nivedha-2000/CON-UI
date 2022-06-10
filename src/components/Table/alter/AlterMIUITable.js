import { ThemeProvider } from '@mui/material/styles';
import React from "react";
import CustomTableComponent from "./customTableComponent";
import {themeOtherGrid} from "../MuiTable";

const CustomTableContainer = ({
                                  title,
                                  columns,
                                  data,
                                  options,
                                  downloadFileName,
                                  checkbox,
                                  selectedDeliveryIndex
                              }) => {
    return (
        <ThemeProvider theme={themeOtherGrid}>
            <CustomTableComponent
                title={title}
                columns={columns}
                data={data}
                options={options}
                downloadFileName={downloadFileName}
                checkbox={checkbox}
                selectedDeliveryIndex={selectedDeliveryIndex}
            />
            <div className="clear-fix" style={{height: "50px"}}></div>
        </ThemeProvider>
    );
};

export default CustomTableContainer;