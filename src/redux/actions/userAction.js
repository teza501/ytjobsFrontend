import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL
} from '../constants/userConstant';

import axios from 'axios'

//login action
export const login =(email,password) => async (dispatch)=>{
    try{
        dispatch({ type:LOGIN_REQUEST })

        const config = { headers: {"Content-Type": "application/json" } };

        const { data } =  await axios.post(
            `/api/v1/signin`,
            {email, password},
            config
        )

        dispatch({type:LOGIN_SUCCESS, payload:data.user})
    }
    catch(error){
        dispatch({ type:LOGIN_FAIL, payload:error.response.data.message });
    }
}

//register
export const register = (userData) => async(dispatch)=>{
    try{
        dispatch({type:REGISTER_USER_REQUEST})

        const config = { headers: {"Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/v1/signup`,userData,config)

        dispatch({type:REGISTER_USER_SUCCESS, payload:data.user})

    }
    catch(error){
        dispatch({ type:REGISTER_USER_FAIL, payload:error.response.data.message });

    }
}



//Load  User
export const LoadUser =() => async (dispatch)=>{
    try{
        dispatch({ type:LOAD_USER_REQUEST })


        const { data } =  await axios.get(`/api/v1/me`)

        dispatch({type:LOAD_USER_SUCCESS, payload:data.user})
    }
    catch(error){
        dispatch({ type:LOAD_USER_FAIL, payload:error.response.data.message });
    }
}

//User Logout
export const logout =() => async (dispatch)=>{
    try{
         await axios.get(`/api/v1/logout`)

         dispatch({ type:LOGOUT_USER_SUCCESS })


    }
    catch(error){
        dispatch({ type:LOGOUT_USER_FAIL, payload:error.response.data.message });
    }
}