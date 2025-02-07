import React from 'react';
import classNames from "classnames";
import './logo.css'

const Logo = ({type = 'light'}) => {
    const cl = classNames({
        'logo': true,
        'logo--light': type === 'light',
        'logo--dark': type === 'dark',
    })

    return (
        <div className={cl}>
            <div className="logo__main">warranty service</div>
            <span>Check the warranty for your product</span>
        </div>
    );
};

export default Logo;