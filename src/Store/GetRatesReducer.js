import * as constants  from "./GetRatesConstants";

const initialState = {
    rateList:{},
    fetching:false,
    error:false,
    errorMessage:''
} 

export default (state=initialState,{type,data}) =>{
    switch (type){
        case constants.FETCHING_LATEST_RATES:
            return ({
                ...state,
                fetching:true
            })
        case constants.FETCHING_LATEST_RATES_SUCCESS:
            return ({
                ...state,
                rateList:data,
                fetching:false
            })
        case constants.FETCHING_LATEST_RATES_FAILURE:
            return ({
                ...state,
                fetching:false,
                error:true,
                errorMessage:data
            })
    }
}

