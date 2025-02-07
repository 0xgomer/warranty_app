import React, {useEffect, useState} from 'react';
import moment from "moment/moment";
import WarrantyService from "../../services/WarrantyService";
import {expiresIn} from "../../utils";
import Table from "../table/Table";
import Button from "../UI/button/Button";
import Search from "../UI/search/Search";
import Form from "../UI/form/Form";
import ProductWarrantyInfo from "../UI/product-warranty-info/productWarrantyInfo";
import Alert from "../UI/alert/Alert";
import './warranty-tab.css'

const WarrantyTab = () => {
    const [detailsForm, setDetailForm] = useState(false)
    const [search, setSearch] = useState('')
    const [warranty, setWarranty] = useState({})
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [limit] = useState(20)
    const [totalCount, setTotalCount] = useState(0)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(false)
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        if (fetching) {
            WarrantyService.getAllWarranties({page, limit, query: search})
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
        if (alert) {
            setTimeout(() => {
                setAlert(null)
            }, 3000)
        }
    }, [alert])


    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && list.length < totalCount) {
            setFetching(true)
        }
    }

    const searchHandler = () => {
        setPage(1)

        WarrantyService.getAllWarranties({page: 1, limit, query: search})
            .then((response) => {
                setList([...response.data])
                setTotalCount(response.headers['x-total-count'])
            }).catch(err => {
            setError(err)
        }).finally(() => {
            setFetching(false)
        })
    }

    const clearHandler = () => {
        setPage(1)
        setSearch('')

        WarrantyService.getAllWarranties({page: 1, limit, query: ''})
            .then((response) => {
                setList([...response.data])
                setTotalCount(response.headers['x-total-count'])
            }).catch(err => {
            setError(err)
        }).finally(() => {
            setFetching(false)
        })
    }

    const transformList = (list) => {
        return list.map(item => {
            const dateInfo = expiresIn(item.created, item.warranty)

            return {
                id: item._id,
                item: {
                    product: item.product,
                    user: item.user.username,
                    start: moment(dateInfo.start).format('MMMM, DD, YYYY'),
                    serial: item.serial,
                    details: <Button type={'small'} onClick={() => {
                        WarrantyService.getWarranty(item.serial)
                            .then((response) => {
                                setWarranty(response.data)
                            }).catch(err => {
                            setError(err)
                        })
                        setDetailForm(true)
                    }}>Show</Button>,
                    expiresIn: dateInfo.expires.years + ' years ' + dateInfo.expires.months + ' months ' + dateInfo.expires.days + ' days '
                }
            }
        })
    }

    const deleteHandler = (e) => {
        e.preventDefault()

        WarrantyService.deleteWarranty(warranty._id)
            .then((response) => {
                if (response.status == 200){
                    setAlert('Product deleted')
                    setList([])
                    setPage(1)
                    setFetching(true)
                }
            })
            .catch(err => {
                setError(err)
            })

        setDetailForm(false)
    }

    return  (
        <div className='warranty-tab'>
            <div className="warranty-tab__header">
                <div className="warranty-tab__left">
                    <h1>Warranty</h1>
                    <p>Warranties for products are displayed here</p>
                </div>
                <div className="warranty-tab__right">
                    <Search value={search} setValue={setSearch} handler={searchHandler} clearHandler={clearHandler}/>
                </div>
            </div>
            {alert && <Alert alert={alert} setAlert={setAlert}/>}
            <Table head={['Product', 'User', 'Start date', 'Serial number', 'Details', 'Expires in']} list={transformList(list)}/>
            {detailsForm && <Form error={error} setError={setError} setForm={setDetailForm} header={'Add product'} text={'Here you can add a product and information about it'} alert={alert} setAlert={setAlert}>
                <div className="warranty-details-form__user">
                    <strong>User</strong>
                    <span>{warranty?.user?.username}</span>
                </div>
                <ProductWarrantyInfo product={warranty.product} serial={warranty.serial} duration={warranty.warranty} startDate={warranty.created}/>
                <Button type={'primary'} onClick={(e) => deleteHandler(e)}>Delete</Button>
            </Form>}
        </div>
    );
};

export default WarrantyTab;