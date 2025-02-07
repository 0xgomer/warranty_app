import React from 'react';
import './search.css'

const Search = ({value, setValue, handler, clearHandler}) => {
    return (
        <div className='search'>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={clearHandler}>Clear</button>
            <button onClick={handler}>Search</button>
        </div>
    );
};

export default Search;