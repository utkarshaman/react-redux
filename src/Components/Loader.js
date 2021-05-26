import React from 'react'
import loadingGif from "../images/loaderGif1.gif"

import { connect } from "react-redux";

import { getFetchingState } from "../Store/GetRatesSelector";

function Loader({loading}) {
    console.log("load varible---", loading);
    return (
        <>
        {loading && <div className="loaderContiner">
            <div className="loader">
                <img src={loadingGif}></img>
            </div>
        </div>}
        </>
    )
}

const mapStateToProps = (state)=>({
    loading:getFetchingState(state)
})

export default connect(mapStateToProps)(Loader)
