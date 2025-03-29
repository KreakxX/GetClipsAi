import axios from 'axios';
import { log } from 'console';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});

const api2 = axios.create({
  baseURL: 'http://localhost:8080/GetClipsAi',
  withCredentials: true
})


export const generateViralClips = async(url: string, leng: string, keyword: string) =>{
  try{
    await api.post("/generate/clips",{url,leng,keyword})
  }catch(error){
    console.log(error)
    throw error
  }
}


export const generateSubtitles = async(url: string) =>{
  try{
    await api.post("/generate/subtitles",{url})
  }catch(error){
    console.log(error);
    throw error;
  }
}

export const login = async(login: {username: string, password: string}) =>{
  try{
    await api2.post("/login",login)
  }catch(error){
    console.log(error);
    throw error;
  }
}

export const register = async(register: {username: string, password: string}) =>{
  try{
    await api2.post("/register",register)
  }catch(error){
    console.log(error);
    throw error;
  }
}

export const validateToken = async() =>{
  try{
    const response = await api2.get("/is/token/valid")
    return response.data;
  }catch(error){
    console.log(error);
    throw error;
  }
}