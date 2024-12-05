import axios from 'axios'
const newAxios=axios.create({
   // baseURL:'/api',
    timeout:5000
})

//暴漏axios对象
export default newAxios