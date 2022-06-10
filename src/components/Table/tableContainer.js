import { ThemeProvider } from '@mui/material/styles';
import React from "react";
import CustomTableComponent from "./customTableComponent";
import { themeOtherGrid } from "./MuiTable";

const CustomTableContainer = ({
    title,
    columns,
    data,
    options,
    downloadFileName,
    checkbox,
    selectedDeliveryIndex,
    search
}) => {
    return (
        <ThemeProvider theme={themeOtherGrid}>
            <CustomTableComponent
                title={title}
                columns={columns}
                data={data}
                options={options}
                search={search}
                downloadFileName={downloadFileName}
                checkbox={checkbox}
                selectedDeliveryIndex={selectedDeliveryIndex}
            />
        </ThemeProvider>
    );
};

export default CustomTableContainer;
