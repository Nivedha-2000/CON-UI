import * as Yup from "yup";

export const ShipmentToleranceColumn = {
    buyCode: Yup.string().required("Please select buyer code"),
    buyDivcode: Yup.string().required("Please select buyer division code"),
    minGarQty: Yup.number()
        .positive("Must be more than 0")
        .integer("Please enter numeric only")
        .min(1)
        .max(9999999, 'Must be less than 7 characters')
        .required("Please enter number"),
    maxGarQty: Yup.number()
        .positive("Must be more than 0")
        .integer("Please enter numeric only")
        .min(1)
        .max(9999999, 'Must be less than 7 characters'),
    minShipPer: Yup.number()
        .positive("Must be more than 0")
        .integer("Please enter numeric only")
        .min(1)
        .max(100)
        .required("Please enter number"),
    maxShipPer: Yup.number()
        .positive("Must be more than 0")
        .integer("Please enter numeric only")
        .min(1)
        .max(100)
        .required("Please enter number"),
    wash: Yup.string().required("Please select wash"),
};