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

    barCode:"",

    homeSearchResult:[],

    searchTerm:"",

    promotion:false,

    promotedID:"",

    eventID:"",

    followStatus:false
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
        },
        getSearchResult:(state, {payload})=>{
            state.homeSearchResult = payload
        },
        searchWord:(state, {payload})=>{
            state.searchTerm = payload
        },
        promoteEvent:(state, {payload})=>{
            state.promotion = payload
        },
        promoteEventID:(state, {payload})=>{
            state.promotedID = payload
        },
        purchasedEventID:(state, {payload})=>{
            state.eventID = payload
        },
        checkFollow:(state, {payload})=>{
            state.followStatus = payload
        }
    }
})
export const {userStoreData, userResData, userLogin, userProfileUpdate, eventData, checkoutTicketQty,
             checkoutTicketPrice, getBarCode, getSearchResult, searchWord, promoteEvent, promoteEventID,
             purchasedEventID, checkFollow} = eventReducers.actions
export default eventReducers.reducer