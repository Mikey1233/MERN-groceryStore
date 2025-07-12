// lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  `${process.env.NEXT_PUBLIC_BACKEND}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add token to headers automatically
axiosInstance.interceptors.request.use((config) => {
  const user = typeof window !== 'undefined' && localStorage.getItem('user');
  if (user) {
    const token = JSON.parse(user).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
//Response Interceptor
axiosInstance.interceptors.response.use(
    (response) =>{
        return response
    },
    (error)=>{
        //Handle common error globally
        if(error.response){
            if(error.response.status === 401){
                window.location.href ="/login"
            }else if(error.response.status === 500){
                console.error("Server error,Please try again")
            }
        }else if(error.code === "ECONNABORTED"){
            console.error("Request timeout .Please try again later")
        }
        return Promise.reject(error)
    }
)

export default axiosInstance;
