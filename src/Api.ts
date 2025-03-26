import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});


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