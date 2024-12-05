<template>
  <div>
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
          <!-- 使用动态绑定确保用户名正确编码 -->
          <router-link :to="'/profile/' + encodeURI(userName)" class="nav-link">个人中心</router-link>          
          <span style="color: #30A3A7;">|</span>
          <router-link to="/cart" class="nav-link">购物车</router-link>
        </div>
      </div>
    </nav>
    <div class="content">
      <h1>欢迎来到个人首页</h1>
      <Section />
      <CategorySection />
      <FeaturedBooks />
    </div>
  </div>
</template>

<script setup>  
import { ref, watchEffect } from 'vue';  
import { useRoute, useRouter } from 'vue-router';  
  
import Section from '../components/Section.vue';  
import CategorySection from '../components/CategorySection.vue';  
import FeaturedBooks from '../components/FeaturedBooks.vue';  
  
const searchQuery = ref('');  
const route = useRoute();  
const router = useRouter();  // 确保导入了 router  
const userName = ref('');  
  
function handleSearch() {  
  console.log('Search query:', searchQuery.value);  
  if (searchQuery.value) {  
    const encodedQuery = encodeURIComponent(searchQuery.value);  
    router.push({ path: '/search', query: { search: encodedQuery } });  
  }  
}  
  
// 使用 watchEffect 监视路由参数的变化，使用 route.params 而不是 route.query  
watchEffect(() => {  
  userName.value = route.params.userName || ''; // 确保路由参数不为 undefined  
  console.log('当前路由用户名:', userName.value);  
});  
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
  width: 100px; /* 调整为适合的大小 */
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

.content {
  padding: 20px;
}
</style>
