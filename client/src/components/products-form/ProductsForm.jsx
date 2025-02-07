import React, {useEffect, useState} from 'react';
import moment from "moment";
import WarrantyService from "../../services/WarrantyService";
import {expiresIn} from "../../utils";
import {useSelector} from "react-redux";
import Table from "../table/Table";
import './products-form.css'

const ProductsForm = () => {
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [limit] = useState(20)
    const [totalCount, setTotalCount] = useState(0)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(false)
    const {user, isAuth} = useSelector(state => state.user)

    useEffect(() => {
        if (fetching && isAuth) {
            WarrantyService.getAllWarranties({page, limit, query: user.username})
                .then((response) => {
                    setList([...list, ...response.data])
                    setPage(prevState => prevState + 1)
                    setTotalCount(response.headers['x-total-count'])
                }).catch(err => {
                setError(err)
            }).finally(() => {
                setFetching(false)
            })
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return function () {
            return document.removeEventListener('scroll', scrollHandler)
        }
    }, [list])

    useEffect(() => {
        if (error){
            setError(error)
        }
    }, [error])


    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && list.length < totalCount) {
            setFetching(true)
        }
    }

    const transformList = (list) => {
        return list.map(item => {
            const dateInfo = expiresIn(item.created, item.warranty)

            return {
                id: item._id,
                item: {
                    product: item.product,
                    serial: item.serial,
                    start: moment(dateInfo.start).format('MMMM, DD, YYYY'),
                    end: moment(dateInfo.end).format('MMMM, DD, YYYY'),
                    expiresIn: dateInfo.expires.years + ' years ' + dateInfo.expires.months + ' months ' + dateInfo.expires.days + ' days '
                }
            }
        })
    }

    return (
        <div className='products-form'>
            <div className="products-form__header">
                <h1>My products</h1>
                <p>All your products on which you have activated the warranty are displayed here</p>
            </div>
            <Table head={['Product', 'Serial number', 'Start date', 'End date', 'Expires in']} list={transformList(list)}/>
        </div>
    );
};

export default ProductsForm;