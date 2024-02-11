import axios from 'axios';
import { userAuthenticated } from '../app/authenticationSlice';

const axiosInstance  = axios.create({
    baseURL:`${import.meta.env.REACT_APP_BASE_URL}/Auth`,
   
});

export const SignUp = async (dispatch, credentials) =>{
    try{
       const {data} = await axiosInstance.post('/signup', credentials);
       dispatch(userAuthenticated(data))
    }
    catch(error){
      console.error('Error during signup!', error)
      throw error;
    }
}

export const SignIn = async (dispatch, credentials) =>{
    try {
       const {data}  = await axiosInstance.post('/signin', credentials);
       dispatch(userAuthenticated(data));
    }
    catch(error){
      console.log('Error!', error);
      throw error;
    }
}


export const ThirdPartySignIn = async (dispatch, token) =>{
    try{
      const {data} = await axiosInstance.post(`/google?token=${token}`);
      dispatch(userAuthenticated(data));
    }
    catch(error){
      console.error("Error!", error)
      throw error;
    }
  }