import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      username: '',
      email: '',
      gender: '',
      birthDate: '',
      location: '',
    },
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    async login(credentials) {
      try {
        console.log('Sending login request with credentials:', credentials); // 添加发送请求前的日志
    
        const response = await axios.post('http://localhost:2000/login', credentials);
        console.log('Login response:', response); // 添加请求成功后的响应日志
    
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('token', this.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      } catch (error) {
        console.error('Login error:', error); // 添加捕获到的错误日志
        throw error;
      }
    }
    ,
    async register(userInfo) {
      try {
        await axios.post('/api/auth/register', userInfo);
      } catch (error) {
        throw error;
      }
    },
    async fetchUser() {
      if (!this.token) return;

      try {
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.user = response.data;
      } catch (error) {
        this.logout();
        throw error;
      }
    },
    logout() {
      this.token = '';
      this.user = {
        username: '',
        email: '',
        gender: '',
        birthDate: '',
        location: '',
      };
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
    async getUserData() {
      try {
        const response = await axios.get('http://localhost:2000/api/user');
        return response.data;
      } catch (error) {
        throw error;
      }
    }, 
    async updateProfile(updatedInfo) {
      try {
        const response = await axios.put('http://localhost:2000/api/user/update', updatedInfo);
        this.user = response.data.user; // 更新本地 user 状态
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
});
