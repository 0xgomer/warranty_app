import React from 'react';
import {expiresIn} from "../../../utils";
import './product-warranty-info.css'

const ProductWarrantyInfo = ({serial, product, startDate, duration}) => {
    const warrantyInfo = expiresIn(startDate, duration)

    return (
        <div className='product-warranty-info'>
            <span>Serial number: {serial}</span>
            <span>Product: {product}</span>
            <span>Start date: {warrantyInfo.start}</span>
            <span>End date: {warrantyInfo.end}</span>
            <span>Expires in: {warrantyInfo.expires.years + ' years ' + warrantyInfo.expires.months + ' months ' + warrantyInfo.expires.days + ' days'}</span>
        </div>
    );
};

export default ProductWarrantyInfo;