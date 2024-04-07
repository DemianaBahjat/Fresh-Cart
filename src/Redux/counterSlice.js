
import { createSlice } from '@reduxjs/toolkit'


  let initialState={
    counter:0
  }

 let counterSlice= createSlice({

    name:'counter',
    initialState,
    reducers: {
            increase: (state, actions) =>{
                 state.counter++
                 console.log(actions.payload)
            },

            decrease: (state) =>{
                state.counter --
            },

            incrementByNumber: (state, actions) =>{
                state.counter += actions.payload
            },
    }


 })

    export let counterReducer= counterSlice.reducer;
    export let {increase , decrease, incrementByNumber}= counterSlice.actions;