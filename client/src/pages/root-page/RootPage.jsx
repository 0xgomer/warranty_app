import React from 'react';
import WarrantyForm from "../../components/warranty-form/WarrantyForm";
import './root-page.css'

const RootPage = () => {

    return (
        <div className='root-page'>
            <div className="container">
                <WarrantyForm/>
            </div>
        </div>
    );
};

export default RootPage;