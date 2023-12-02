import axios from 'axios'

const instance = axios.create({
  baseURL: '/',
  timeout: 5000
})

// 拦截request
instance.interceptors.request.use(response => {
return response;
}, error => {
console.log(error);
});

// 拦截response 获取crtoken
instance.interceptors.response.use((response) => {
return response;
}, error => {
return Promise.reject(error);
});

 


export default instance