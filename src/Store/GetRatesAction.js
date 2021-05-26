import * as constants from "./GetRatesConstants";

const BASE_URL="http://api.exchangeratesapi.io/v1/latest?access_key=0ac04da1b065b0c06341e18e49d52a8f";
// /0ac04da1b065b0c06341e18e49d52a8f
export const fetchingLatestRates = () =>({type: constants.FETCHING_LATEST_RATES })
export const fetchGetRatesSuccess = (data) =>({type: constants.FETCHING_LATEST_RATES_SUCCESS, data })
export const fetchGetRatesFailure = (data) =>({type: constants.FETCHING_LATEST_RATES_FAILURE, data })

export const getLatestRates=()=>
    async (dispatch) =>{
        await dispatch(fetchingLatestRates())
        try{
            let latestData= {};
            fetch(BASE_URL)
                .then((res)=>res.json())
                .then(data=>{
                    console.log(data);
                    if(data.error){
                        const message=data.error.message
                        dispatch(fetchGetRatesFailure(message))
                    }else{
                        latestData=data;
                        dispatch(fetchGetRatesSuccess(latestData));
                    }
                })
                .catch(error =>{
                    const {message}=error
                    dispatch(fetchGetRatesFailure(message))
                    return error;
                })
            
        }
        catch(error){
                const {message}=error
                dispatch(fetchGetRatesFailure(message))
                return error;
        }
            
    } 
    
