import React, {useEffect, useState} from 'react';
import ReactQuill from "react-quill";
import PagesService from "../../services/PagesService";
import Button from "../UI/button/Button";
import ErrorAlert from "../UI/error-alert/ErrorAlert";
import Select from "../UI/select/Select";
import './info-tab.css'
import 'react-quill/dist/quill.snow.css';
import Alert from "../UI/alert/Alert";

const InfoTab = () => {
    const [error, setError] = useState(null)
    const [alert, setAlert] = useState(null)
    const [content, setContent] = useState('')
    const [selected, setSelected] = useState('privacy')

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold"],
            [{ align: ["", "center", "right", "justify"] }]
        ]
    }

    const formats = ["header", "bold", "align"]

    useEffect(() => {
        PagesService.getPage(selected)
            .then((response) => {
                setContent(response.data.content)
            }).catch(err => {
            setError(err.response.data.message)
        })
    }, [])

    useEffect(() => {
        setError(null)
        setAlert(null)

        PagesService.getPage(selected)
            .then((response) => {
                setContent(response.data.content)
            }).catch(err => {
            setError(err.response.data.message)
        })
    }, [selected])


    const handleProcedureContentChange = (content) => {
        setContent(content);
    }

    const editPageHandler = () => {
        PagesService.editPage(selected, content)
            .then((response) => {
                setContent(response.data.content)
            }).catch(err => {
            setError(err.response.data.message)
        }).finally(() => {
            if (!error) setAlert('Page updated')
        })
    }


    return (
        <div className='info-tab'>
            <div className="info-tab__header">
                <h1>Edit pages</h1>
                <p>Here you can edit the information on the information pages</p>
            </div>
            <Select name={'Page'} options={['privacy', 'terms', 'warranty', 'about']} selected={selected} setSelected={setSelected}></Select>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={handleProcedureContentChange}
            />
            {error && <ErrorAlert setError={setError} error={error}/>}
            {alert && <Alert setAlert={setAlert} alert={alert}/>}
            <Button type={'primary'} onClick={editPageHandler}>Save</Button>
        </div>
    );
};

export default InfoTab;