import React, {useEffect, useState} from 'react';
import {ReactComponent as Chevron} from "../../assets/icons/chevron.svg";
import TabsButtons from "../../components/tabs-buttons/TabsButtons";
import ProfileForm from "../../components/profile-form/ProfileForm";
import PasswordForm from "../../components/password-form/PasswordForm";
import ProductsForm from "../../components/products-form/ProductsForm";
import Button from "../../components/UI/button/Button";
import './profile-page.css'

const ProfilePage = () => {
    const windowWidth = document.documentElement.clientWidth
    const [selected, setSelected] = useState('profile')
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(false)
    }, [selected])

    return (
        <div className='profile-page'>
            <div className="container">
                <div className="profile-page__tabs">
                    <div className="profile-page__tab-selected">
                        <Button onClick={() => setVisible(!visible)}>{selected}</Button>
                        <Chevron style={{transform: `rotate(${visible ? '-180deg' : '0deg'})`}}/>
                    </div>
                    {
                        windowWidth > 767
                            ? <TabsButtons selected={selected} setSelected={setSelected} buttons={['profile', 'password', 'products']}/>
                            : <>{visible && <TabsButtons selected={selected} setSelected={setSelected} buttons={['profile', 'password', 'products']}/>}</>
                    }
                </div>
                <div className="profile-page__form">
                    {selected == 'profile' && <ProfileForm/>}
                    {selected == 'password' && <PasswordForm/>}
                    {selected == 'products' && <ProductsForm/>}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;