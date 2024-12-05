<template>
  <div>
    <nav class="custom-menu">
      <div class="menu">
        <div class="left-section">
          <router-link to="/" class="logo">
            <img src="../assets/logo.png" alt="Logo">
          </router-link>
          <h1 class="separator">| 登录</h1>
        </div>
      </div>
    </nav>
    <div class="login-page">
      <div class="login-panel">
        <div class="login-card">
          <h2>登录</h2>
          <form @submit.prevent="handleLogin">
            <div class="form-item">
              <label for="username">用户名</label>
              <input
                v-model="username"
                id="username"
                placeholder="请输入用户名"
                class="custom-input"
              />
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
              <button type="submit" class="custom-button">登录</button>
            </div>
          </form>
          <div class="register-link">
            <router-link to="/register" class="tip">没有账号？立即注册</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:2000/login', {
          username: this.username,
          password: this.password
        });

        if (response.data.success) {
          // 登录成功后进行路由跳转
          this.$router.push(`/personal-home/${this.username}`);
        } else {
          this.errorMessage = response.data.error;
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.errorMessage = 'Network Error: Unable to login.';
      }
    }
  }
};
</script>

<style scoped>
.custom-input {
  width: 300px;
  height: 42px;
  border: 1px solid #d9d9d9; /* 初始灰色边框 */
  padding: 0 10px;
  transition: border-color 0.3s;
}

.custom-input:focus,
.custom-input:hover {
  border-color: #94D0D2; /* 焦点和悬浮时的颜色 */
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

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background: #efefef;
}

.login-panel {
  width: 1200px;
  height: 420px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 400px;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
}

.login-card h2 {
  margin-bottom: 20px;
}

.register-link {
  margin-top: 10px;
  text-align: center;
  color: #86d2d3;
}

.tip {
  color: #86d2d3;
  margin-left: -225px;
}
</style>
