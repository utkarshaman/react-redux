import React from 'react'
import './CurrencyTable.css'

function CurrencyTable({rates}) {
    return (
        <div className="currencyTable">
            <table>
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Rate</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {rates?(rates.map(frates=>(
                        <tr key={frates[0]}>
                            <td>{frates[0]}</td>
                            <td>{frates[1]}</td>
                        </tr>
                    ))
                    ):null}
                </tbody>
            </table>
        </div>
    )
}

export default CurrencyTable
