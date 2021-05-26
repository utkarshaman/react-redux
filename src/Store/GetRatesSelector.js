import latestRates from "./GetRatesReducer";

export const getLatestRates1 =(state) =>{
    console.log("state----", state)
    const a = state?state.rateList:null
    const arr=[]
    if(a && Object.keys(a).length>0){
        for(const [key,value] of Object.entries(a.rates)){
            arr.push([key,value]);
        }
    }
    if(a && a.base){
        return {
            currencylist:arr,
            baseCurrency:a.base
        }
    }
    return arr
}

export const getFetchingState = (state) =>{
    return state?state.fetching:false;
}

export const getErrorMessage = (state) =>{
    console.log("error state", state);
    return state?.errorMessage?state.errorMessage:'';
}