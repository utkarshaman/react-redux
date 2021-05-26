import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {shallow, configure} from 'enzyme'
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import reducer from './Store/GetRatesReducer';
import * as constants from './Store/GetRatesConstants';
import getRates from "./Components/GetRates";
import CurrencyTable from "./Components/CurrencyTable";
import * as testSelector from "./Store/GetRatesSelector";

import * as action from './Store/GetRatesAction';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import fetchMock from 'fetch-mock'

configure({adapter: new Adapter()});

// test('renders todo', () => {
//   const { getByText } = render(<App />);
//   const todoElement = getByText(/here be dragons/i);

//   expect(todoElement).toBeInTheDocument();
// });

jest.mock('./Components/GetRates',() =>{
   const getRates =() =><div />
   return getRates
})

describe('<App />',()=>{
  it('render without crashing',()=>{
    //console.log("runnnn");
    const container = shallow(<App />)
    //console.log(container);
    expect(toJson(container)).toMatchSnapshot()
  })
})

describe('<getRates />',()=>{
  it('render getRates',()=>{
    const container = shallow(<getRates />)
    console.log(toJson(container));
    expect(toJson(container)).toMatchSnapshot()
  })
})

describe('<CurrencyTable />',()=>{
  it('render Currency Table',()=>{
    const container = shallow(<CurrencyTable />)
    console.log(toJson(container));
    expect(toJson(container)).toMatchSnapshot()
  })
})

describe('getRates Reducer',()=>{
  it('handles FETCHING_LATEST_RATES',()=>{
    expect(reducer({},{type:constants.FETCHING_LATEST_RATES})).toMatchObject({
      fetching:true
    })
  })

  it('handles FETCHING_LATEST_RATES',()=>{
    const data = [{
      base:"EUR",
      rates:{
        AED:4.3,
        AFN:90.8
      }
    }]
    expect(reducer({},{type:constants.FETCHING_LATEST_RATES_SUCCESS,data})).toMatchObject({
      rateList:data,
      fetching:false
    })
  })

  it('handles FETCHING_LATEST_RATES',()=>{
    const data=[{errorMessage:"Please enter a valid data"}]
    expect(reducer({},{type:constants.FETCHING_LATEST_RATES_FAILURE,data})).toMatchObject({
      fetching:false,
      error:true,
      errorMessage:data
    })
  })
})

describe(" test selectors",()=>{
  it("test empty state",()=>{
    expect(testSelector.getLatestRates1({})).toEqual([])
  })

  it("getFetchingState", () =>{
    expect(testSelector.getFetchingState()).toEqual(false)
  })

  it("test rates array",()=>{
    const state={
      error:false,
      errorMessage:"",
      rateList:{
        success:true,
        base:"EUR",
        rates:{
          AED:4.3124,
          AOA:740.812
        }
      }
    }

    //console.log("getLatestRates ---- - --",testSelector.getLatestRates1({state}) )
    expect(testSelector.getLatestRates1(state)).toEqual({currencylist:[["AED",4.3124],["AOA",740.812]],
      baseCurrency:"EUR"})
  })

  it("test getErrorMessage",()=>{
    const state={
      errorMessage:"enter a valid data"
    }
    expect(testSelector.getErrorMessage(state)).toEqual("enter a valid data")
  })

})

describe("test Action", ()=>{
   const middlewares = [thunk];
   const mockStore=configureMockStore(middlewares);

   afterEach(()=>{
      fetchMock.restore();
   })
   const mockJSON={
    data: {
      rates: [{ data: { title: "Post 1" } }, { data: { title: "Post 2" } }]
    }
  };

   it("test test",async ()=>{
     fetchMock.getOnce(`http://api.exchangeratesapi.io/v1/latest?access_key=0ac04da1b065b0c06341e18e49d52a8f`,{
       body:mockJSON
     })
     const expectedActions=[
       { type:'FETCHING_LATEST_RATES' }
     ]

     const store=mockStore({})

    //  return store.dispatch(await action.fetchingLatestRates()).then(()=>{
    //    expect(store.getActions()).toMatchObject(expectedActions)
    //  })
    store.dispatch(await action.fetchingLatestRates())
    console.log("---------------------------------------------", store.getActions())
    expect(store.getActions()).toMatchObject(expectedActions)

   })
})
  // const mock =new MockAdapter(axios);
  // const store=mockStore();
  // beforeEach(()=>{
  //   store.clearActions();
  // });
//   global.fetch=jest.fn(()=>{
//     Promise.resolve({
//       json:()=>{Promise.resolve({rates:{CAD:2.2}})}
//     })
//   })
//   it('dispatch fetchGetRatesSuccess',async ()=>{
//     const fetchfn= await action.getLatestRates();
//     //console.log(toJson(fetchfn))
//     expect(fetchfn).toEqual()
//   })
// })

