<template>
  <div>
    <h1>搜索结果</h1>
    <div v-if="isLoading">
      <p>加载中...</p>
    </div>
    <div v-else-if="books.length">
      <div v-for="book in books" :key="book.id" class="book">
        <img :src="book.image" alt="书籍图片">
        <h3>{{ book.title }}</h3>
        <p>作者: {{ book.author }}</p>
        <p>出版社: {{ book.publisher }}</p>
        <p>￥: {{ book.price }}</p>
        <router-link :to="{ name: 'BookDetail', params: { title: decodeURIComponent(book.title) } }">查看详情</router-link>

      </div>
    </div>
    <div v-else>
      <p>没有找到匹配的图书。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const searchQuery = decodeURIComponent(route.query.search);  // 使用 decodeURIComponent 解码查询参数
const books = ref([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`http://localhost:2000/api/books?search=${searchQuery}`);
    console.log('Response data:', response.data);  // 添加日志
    books.value = response.data;
  } catch (error) {
    console.error('搜索失败', error);
  } finally {
    isLoading.value = false;
  }
});
</script>


<style scoped>
.book {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.book img {
  max-width: 100px;
  margin-right: 10px;
}
.book h3 {
  margin: 0;
}
</style>
