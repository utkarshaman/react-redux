import React, {useState} from 'react'
import './GetRates.css';
import { connect } from "react-redux";
import { getLatestRates } from "../Store/GetRatesAction";
import { getLatestRates1,getErrorMessage } from "../Store/GetRatesSelector";
import CurrencyTable from "./CurrencyTable";
import Loader from "./Loader";

const GetRates = ({getLatestRates,rates,errorMessage}) => {
    
    //const BASE_URL="https://api.exchangeratesapi.io/latest";

    const fetchLatestRates =async() => {
        await getLatestRates()
    };

    //const [items,setItems]= useState([]);
    console.log("component returned rates--",rates)
    console.log("errorMessage--",errorMessage)
    return (
        <>
            <div className="getRates">
                <Loader/>
                <button onClick={fetchLatestRates}>Get Latest Rates</button>
                {errorMessage?alert(errorMessage):<div>
                    {rates?.baseCurrency?<div>BASE RATE: {rates.baseCurrency}</div>:null}
                    <hr />
                    {rates?.currencylist?<CurrencyTable rates={rates.currencylist} />:null}</div>
                }
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    rates:getLatestRates1(state),
    errorMessage:getErrorMessage(state)
})

export default connect(mapStateToProps,{getLatestRates})(GetRates)
