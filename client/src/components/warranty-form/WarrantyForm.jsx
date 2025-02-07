import React, {useEffect, useState} from 'react';
import WarrantyService from "../../services/WarrantyService";
import InputButton from "../UI/input-button/InputButton";
import ProductWarrantyInfo from "../UI/product-warranty-info/productWarrantyInfo";
import ErrorAlert from "../UI/error-alert/ErrorAlert";
import './warranty-form.css'
import {useDispatch, useSelector} from "react-redux";
import {setError} from "../../store/reducers/UserReducer";


const WarrantyForm = () => {
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state => state.user)
    const [serial, setSerial] = useState('')
    const [info, setInfo] = useState({})
    const [formVerify, setFormVerify] = useState(false)
    const [error, setError] = useState(null)

    const setInfoHandler = async (e) => {
        e.preventDefault()

        try {
            const response = await WarrantyService.getWarranty(serial)

            setError(false)
            setInfo(response.data)
        } catch (e) {
            setFormVerify(true)
            setError(e.response?.data?.message)
            setInfo({})
            console.log(e.response?.data?.message)
        }
    }

    const verifyHandler = async (e) => {
        e.preventDefault()

        try {
            const response = await WarrantyService.addWarranty(serial)

            setError(false)
            setInfo(response.data)
            setFormVerify(false)
        } catch (e) {

            setError(e.response?.data?.message)
            setInfo({})
            console.log(e.response?.data?.message)
        }
    }

    return (
        <form className={'warranty-form'}>
            <div className="warranty-form__text">
                <h1>Verify your Product</h1>
                <p>Enter the serial number of the product to check the warranty, if the product is not registered, then you can register it</p>
            </div>
            <div className="warranty-form__form">
                {formVerify && isAuth ?
                    <InputButton value={serial} onChange={(e) => setSerial(e.target.value)} btnText={'verify'} placeholder={'Enter serial number...'} onClick={(e) => verifyHandler(e)}/>
                            :
                    <InputButton value={serial} onChange={(e) => setSerial(e.target.value)} btnText={'check'} placeholder={'Enter serial number...'} onClick={(e) => setInfoHandler(e)}/>
                }
                {info.serial && <ProductWarrantyInfo serial={info.serial} product={info.product} startDate={info.created} duration={info.warranty}/>}
                {error && <ErrorAlert error={error} setError={setError}/>}
            </div>
        </form>
    );
};

export default WarrantyForm;