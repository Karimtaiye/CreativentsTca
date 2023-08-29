import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    userRes:[],

    user:{
        name:"",
        email:"",
        id:"",
        token:"",
        login:false,
        profilePicture:"",
        admin:false
    },

    userInitUpdate: [],

    userLogInData:[],

    allUser:[],

    eventInfo:[],

    ticketQty : 1,

    ticketPrice:0,
    barCode:""
}

export const eventReducers = createSlice({
    name:"creativents",
    initialState,
    reducers:{
        userStoreData:(state, {payload})=>{
            state.user = payload
        },
        userResData:(state, {payload})=>{
            state.userRes = payload
        },
        userLogin:(state, {payload})=>{
            state.userLogInData = payload
        },
        userProfileUpdate:(state, {payload})=>{
            state.userInitUpdate = payload
        },
        eventData:(state, {payload})=>{
            state.eventInfo = payload
        },
        checkoutTicketQty:(state, {payload})=>{
            state.ticketQty = payload
        },
        checkoutTicketPrice:(state, {payload})=>{
            state.ticketPrice = payload
        },
        getBarCode:(state, {payload})=>{
            state.barCode = payload
        }
    }
})
export const {userStoreData, userResData, userLogin, userProfileUpdate, eventData, checkoutTicketQty, checkoutTicketPrice, getBarCode} = eventReducers.actions
export default eventReducers.reducer