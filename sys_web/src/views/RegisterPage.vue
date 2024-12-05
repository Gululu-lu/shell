<template>
  <div class="register-page">
    <nav class="custom-menu">
      <div class="menu">
        <div class="left-section">
          <router-link to="/" class="logo">
            <img src="../assets/logo.png" alt="Logo">
          </router-link>
          <h1 class="separator">| 注册</h1>
        </div>
      </div>
    </nav>
    <div class="register-page-info">
      <div class="register-panel">
        <div class="register-card">
          <h2>注册</h2>
          <form @submit.prevent="handleRegister" class="register-form">
            <div class="form-item">
              <label for="username">用户名</label>
              <input 
                v-model="username" 
                id="username" 
                placeholder="请输入用户名" 
                class="custom-input" 
                @blur="checkUsername"
              />
              <span v-if="usernameError" class="error-message">{{ usernameError }}</span>
            </div>
            <div class="form-item">
              <label for="password">密码</label>
              <input 
                v-model="password" 
                type="password" 
                id="password" 
                placeholder="请输入密码" 
                class="custom-input" 
              />
            </div>
            <div class="form-item">
              <label for="confirmPassword">确认密码</label>
              <input 
                v-model="confirmPassword" 
                type="password" 
                id="confirmPassword" 
                placeholder="请确认密码" 
                class="custom-input" 
              />
            </div>
            <div class="form-item">
              <label for="email">邮箱</label>
              <input 
                v-model="email" 
                type="email" 
                id="email" 
                placeholder="请输入邮箱" 
                class="custom-input" 
              />
            </div>
            <div class="form-item" style="margin-bottom: 0;">
              <button type="submit" class="custom-button">注册</button>
            </div>
          </form>
          <div class="login-link">
            <router-link to="/login" class="tip">已有账号？立即登录</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { message } from 'ant-design-vue'; // 导入 ant-design-vue 的 message 组件

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      usernameError: ''
    };
  },
  methods: {
    async checkUsername() {
  try {
    const response = await axios.get(`http://localhost:2000/checkUsername?username=${this.username}`);
    if (response.data.exists) {
      this.usernameError = '该用户名已被注册，请更换用户名';
    } else {
      this.usernameError = '';
    }
  } catch (error) {
    console.error('检查用户名失败:', error);
    message.error('检查用户名失败，请稍后重试');
  }
},
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        message.error('两次输入的密码不一致');
        return;
      }
      if (this.usernameError) {
        message.error('请更换用户名');
        return;
      }
      try {
        const response = await axios.post('http://localhost:2000/register', {
          user_Name: this.username,
          user_Password: this.password,
          user_Email: this.email
        });
        if (response.data.status) {
          this.$router.push('/login');
        } else {
          message.error('注册失败，请检查输入信息');
        }
      } catch (error) {
        message.error('注册失败，请检查输入信息');
      }
    }
  }
};
</script>

<style scoped>
.custom-input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #f0f2f5;
  transition: border-color 0.3s;
  margin-bottom: 12px;
}

.custom-input:focus,
.custom-input:hover {
  border-color: #40a9ff;
}

.custom-button {
  width: 100%;
  height: 42px;
  background-color: #30A3A7;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-button:hover {
  background-color: #86d2d3;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.custom-menu {
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  width: 100%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.menu {
  background-color: #ffffff;
  color: #000;
  padding: 10px;
  font-size: 16px;
  max-width: 100%;
  overflow-x: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
}

.custom-menu .left-section {
  display: flex;
  align-items: center;
}

.custom-menu .left-section .logo {
  margin-right: 5px; /* 调整这个值来靠近h1 */
}

.custom-menu .left-section .logo img {
  width: 20%;
  height: auto;
}

.separator {
  color: #30A3A7;
  margin-left: -250px; /* 调整这个值来靠近图片 */
}

.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #efefef;
}

.register-page-info {
  margin-top: 50px;
  width: 1200px;
  height: 620px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-panel {
  width: 400px;
  margin-top: 20px;
}

.register-card {
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
}

.register-card h2 {
  margin-bottom: 20px;
}

.login-link {
  margin-top: 10px;
  text-align: center;
  color: #86d2d3;
}

.tip {
  color: #86d2d3;
  margin-left: -225px; /* 调整这个值来靠近注册页面的文字 */
}
</style>
