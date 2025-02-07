import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import moment from "moment";
import PagesService from "../../services/PagesService";
import './info-page.css'


const InfoPage = () => {
    const [error, setError] = useState(null)
    const [content, setContent] = useState('')
    let location = useLocation().pathname.replace('/','')

    useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [location])

    useEffect(() => {
        PagesService.getPage(location)
            .then((response) => {
                setContent(response.data)
            }).catch(err => {
            setError(err)
        })
    }, [location])

    return (
        <div className='info-page'>
            <div className="container">
                <header>
                    <h1>{content.header}</h1>
                    <p className="info-page__update">Updated: <strong>{moment(content.updatedAt).format('DD.MM.YYYY')}</strong></p>
                </header>
                <main dangerouslySetInnerHTML={{__html: content.content}}/>
            </div>
        </div>
    );
};

export default InfoPage;