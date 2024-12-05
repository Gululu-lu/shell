<template>
  <nav class="custom-menu">
    <div class="menu">
      <div class="left-section">
        <router-link to="/" class="logo">
          <img src="../assets/logo.png" alt="Logo">
        </router-link>
        <div class="search-box">
          <input type="text" v-model="searchQuery" placeholder="搜索图书...">
          <button @click="handleSearch">搜索</button>
        </div>
      </div>
      <div class="right-section">
        <template v-if="isLoggedIn">
          <router-link to="/profile" class="nav-link">个人中心</router-link>
          <span style="color: #30A3A7;">|</span>
          <router-link to="/cart" class="nav-link">购物车</router-link>
        </template>
        <template v-else>
          <router-link to="/login" class="nav-link">登录</router-link>
          <span style="color: #30A3A7;">|</span>
          <router-link to="/register" class="nav-link">注册</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();
const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');

function handleSearch() {
  console.log('Search query:', searchQuery.value);  // 添加日志
  if (searchQuery.value) {
    // 使用 encodeURIComponent 确保搜索字符串正确编码
    const encodedQuery = encodeURIComponent(searchQuery.value);
    router.push({ path: '/search', query: { search: encodedQuery } });
  }
}
</script>
  
  <style scoped>
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
    margin-right: 5px;
  }
  
  .custom-menu .left-section .logo img {
    width: 20%;
    height: auto;
  }
  
  .right-section {
    display: flex;
    align-items: center;
  }
  
  .nav-link {
    margin-left: 10px;
    color: #30A3A7;
    text-decoration: none;
  }
  
  .nav-link:hover {
    text-decoration: underline;
  }
  
  </style>
  