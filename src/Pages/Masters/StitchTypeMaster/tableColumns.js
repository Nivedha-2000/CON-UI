import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import React from "react";

export const shipmentTableColumns = ({edit}) =>  {
    return [
        {
            name: "buyCode",
            label: "Buyer Code"
        },
        {
            name: "buyDivcode",
            label: "Buyer Division Code"
        },
        {
            name: "minGarQty",
            label: "Minimum Garment Qty"
        },
        {
            name: "maxGarQty",
            label: "Maximum Garment Qty"
        },
        {
            name: "market",
            label: "Market"
        },
        {
            name: "minShipPer",
            label: "Minimum shipment percentage"
        },
        {
            name: "maxShipPer",
            label: "Maximum shipment percentage"
        },
        {
            name: "wash",
            label: "Wash"
        },
        {
            name: "activeText",
            label: "Active",
        },
        {
            name: "id",
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <div onClick={() => edit(value, 'edit')}>
                                <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                            </div>
                        </div>

                    )
                }
            }
        }
    ]
}