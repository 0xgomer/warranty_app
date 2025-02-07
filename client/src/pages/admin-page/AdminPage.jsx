import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Button from "../../components/UI/button/Button";
import TabsButtons from "../../components/tabs-buttons/TabsButtons";
import StatisticForm from "../../components/statistic-form/StatisticForm";
import UsersForm from "../../components/users-form/UsersForm";
import './admin-page.css'
import ProductsTab from "../../components/products-tab/ProductsTab";
import WarrantyTab from "../../components/warranty-tab/WarrantyTab";
import InfoTab from "../../components/info-tab/InfoTab";

const AdminPage = () => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState('statistic')
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(false)
    }, [selected])

    return (
        <div className='admin-page'>
            <div className="container">
                <div className="admin-page__tabs">
                    <div className="admin-page__tab-selected">
                        <Button onClick={() => setVisible(!visible)}>{selected}</Button>
                    </div>
                    <div className="admin-page__tabs">
                        <TabsButtons selected={selected} setSelected={setSelected} buttons={['statistic', 'users', 'products', 'warranty', 'pages']} />
                        <Button type={'primary'} onClick={() => navigate('/')}>Exit from panel</Button>
                    </div>
                </div>
                <div className="admin-page__form">
                    {selected == 'statistic' && <StatisticForm/>}
                    {selected == 'users' && <UsersForm/>}
                    {selected == 'products' && <ProductsTab/>}
                    {selected == 'warranty' && <WarrantyTab/>}
                    {selected == 'pages' && <InfoTab/>}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;