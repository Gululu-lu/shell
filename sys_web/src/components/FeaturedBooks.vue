<template>
  <div class="featured-books">
    <h2>热门图书推荐</h2>
    <div class="book-list">
      <div v-for="book in books" :key="book.id" class="book-card">
        <div class="book-title">{{ book.title }}</div>
        <div class="book-author">{{ book.author }}</div>
        <router-link :to="`/books/${book.id}`" class="book-link">查看详情</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturedBooks',
  data() {
    return {
      books: [
        { id: 1, title: '书籍1', author: '作者1' },
        { id: 2, title: '书籍2', author: '作者2' },
        { id: 3, title: '书籍3', author: '作者3' },
        { id: 4, title: '书籍4', author: '作者4' },
      ],
    };
  },
};
</script>

<style scoped>
.featured-books {
  margin: 20px 0;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.book-card {
  width: calc(25% - 20px); /* 每行显示4个，减去间隙 */
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.book-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.book-author {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.book-link {
  display: block;
  color: #1890ff;
  text-decoration: none;
  font-size: 14px;
}

.book-link:hover {
  text-decoration: underline;
}
</style>
