import axios from 'axios'
import config from '@/config'

const request = axios.create({
  baseURL: config.BACK_END_URL,
  timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
  config.headers!['Content-Type'] = 'application/json;charset=utf-8';

  let jwt = localStorage.getItem('token');
  if (jwt) {
    // config.headers['Authorization'] = "Bearer " + jwt;  // 设置jwt
    config.headers!['Authorization'] = jwt;  // 设置jwt
  }
  return config
}, error => {
  return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  response => {
    let res = response.data;
    // 如果是返回的文件
    if (response.config.responseType === 'blob') {
      return res
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res
    }
    if (res.code === '401')
    {
      window.$message.error('登录已过期，请重新登录');
      localStorage.clear()
      window.location.href = '/login';
      return {}
    }
    return res;
  },
  error => {
    console.log('err' + error) // for debug
    window.$message.error('网络异常，请稍后再试');
    return Promise.reject(error)
  }
)


export default request
