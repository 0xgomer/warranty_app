import React from 'react';
import {ReactComponent as Edit} from "../../assets/icons/edit.svg";
import './table.css'

const Table = ({head = [], list = [], edit}) => {

    return (
        <table>
            <thead>
                <tr>
                    {head.map(item => <th key={item}>{item}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr style={{height: '20px'}}></tr>
            </tbody>
            <tbody>
            {list.map(item => {
                const values = Object.values(item.item);

                return (
                    <tr key={item.id}>
                        {values.map((value, index) => (
                            <td key={index}><span>{head[index] + ': '}</span>{value}</td>
                        ))}
                        {edit && <td onClick={() => edit(item.id)}><Edit/></td>}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default Table;