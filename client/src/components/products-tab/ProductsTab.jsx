import React, {useEffect, useState} from 'react';
import ProductService from "../../services/ProductService";
import {ReactComponent as Plus} from "../../assets/icons/plus.svg";
import Table from "../table/Table";
import Button from "../UI/button/Button";
import Search from "../UI/search/Search";
import Form from "../UI/form/Form";
import InputText from "../UI/input-text/InputText";
import InputUpload from "../UI/input-upload/InputUpload";
import Alert from "../UI/alert/Alert";
import './products-tab.css'

const ProductsForm = () => {
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [limit] = useState(20)
    const [totalCount, setTotalCount] = useState(0)
    const [fetching, setFetching] = useState(true)
    const [id, setId] = useState('')
    const [search, setSearch] = useState('')
    const [editForm, setEditForm] = useState(false)
    const [error, setError] = useState(null)
    const [alert, setAlert] = useState(null)
    const [file, setFile] = useState([])

    // add product
    const [addForm, setAddForm] = useState(false)
    const [name, setName] = useState('')
    const [warranty, setWarranty] = useState(1)

    //edit product

    const [editName, setEditName] = useState('')
    const [editWarranty, setEditWarranty] = useState(1)



    useEffect(() => {
        if (fetching) {
            ProductService.getAllProducts(page, limit)
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

    const transformList = (list) => {
        return list.map(item => {

            return {
                id: item._id,
                item: {
                    id: item._id,
                    name: item.name,
                    warranty: item.warranty,
                }
            }
        })
    }

    const searchHandler = () => {
        setPage(1)

        ProductService.getAllProducts({page: 1, limit, query: search})
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

        ProductService.getAllProducts({page: 1, limit, query: ''})
            .then((response) => {
                setList([...response.data])
                setTotalCount(response.headers['x-total-count'])
            }).catch(err => {
            setError(err)
        }).finally(() => {
            setFetching(false)
        })
    }

    const editHandler = (id) => {
        setId(id)
        setEditForm(true)
    }

    // add product

    const handlerOnChange = (e) => {
        e.preventDefault()

        setFile(e.target.files)
    }

    const addFormHandler = async (e) => {
        e.preventDefault()

        try {
            const response = await ProductService.addProduct({name, warranty, file: file[0]})

            if (response.status === 200){
                setName('')
                setWarranty(1)
                setEditName('')
                setEditWarranty(1)
                setFile(null)
                setList([])
                setPage(1)
                setFetching(true)
                setAlert('Product added')
                setAddForm(false)
            }

            return response
        } catch (e) {
            setError(e?.response?.data?.message)
        }

    }

    //edit product

    const editFormHandler = async (e) => {
        e.preventDefault()

        try {
            const response = await ProductService.editProduct({id, name: editName, warranty: editWarranty, file: file[0]})

            if (response.status === 200){
                setName('')
                setWarranty(1)
                setEditName('')
                setEditWarranty(1)
                setFile(null)
                setList([])
                setPage(1)
                setFetching(true)
                setAlert('Product edited')
                setEditForm(false)
            }

            return response
        } catch (e) {
            setError(e?.response?.data?.message)
        }

    }

    return (
        <div className='products-tab'>
            <div className="products-tab__header">
                <div className="products-tab__left">
                    <h1>products</h1>
                    <p>Here you can add or change products</p>
                </div>
                <div className="products-tab__right">
                    <Search value={search} setValue={setSearch} handler={searchHandler} clearHandler={clearHandler}/>
                    <Button type={'primary'} onClick={() => setAddForm(true)}><Plus/></Button>
                </div>
            </div>
            {alert && <Alert alert={alert} setAlert={setAlert}/>}
            <Table head={['ID', 'Name', 'Warranty']} list={transformList(list)} edit={editHandler}/>
            {addForm && <Form error={error} setError={setError} setForm={setAddForm} header={'Add product'} text={'Here you can add a product and information about it'} btnHandler={addFormHandler} btnText={'Save'}>
                <InputText name={'Name'} type={'text'} value={name || ''} onChange={(e) => setName(e.target.value)}/>
                <InputText name={'Warranty'} type={'number'} value={warranty || ''} onChange={(e) => setWarranty(e.target.value)}/>
                <InputUpload onChange={handlerOnChange}>Import serial numbers from excel file</InputUpload>
            </Form>}
            {editForm && <Form error={error} setError={setError} setForm={setEditForm} header={'Edit product'} text={'Here you can add a product and information about it'} btnHandler={editFormHandler} btnText={'Save'}>
                <InputText name={'Name'} type={'text'} value={editName || ''} onChange={(e) => setEditName(e.target.value)}/>
                <InputText name={'Warranty'} type={'number'} value={editWarranty || ''} onChange={(e) => setEditWarranty(e.target.value)}/>
                <InputUpload onChange={handlerOnChange}>Import serial numbers from excel file</InputUpload>
            </Form>}
        </div>
    );
};

export default ProductsForm;