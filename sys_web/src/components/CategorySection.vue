<template>
  <div class="category-section">
    <h2>分类</h2>
    <div class="category-list">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <div class="category-title">{{ category.name }}</div>
        <div class="category-description">{{ category.description }}</div>
        <router-link :to="`/categories/${category.id}`" class="category-link">查看更多</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategorySection',
  data() {
    return {
      categories: [
        { id: 1, name: '小说', description: '各种小说书籍' },
        { id: 2, name: '科技', description: '科技类书籍' },
        { id: 3, name: '历史', description: '历史类书籍' },
        { id: 4, name: '儿童', description: '儿童书籍' },
      ],
    };
  },
};
</script>

<style scoped>
.category-section {
  margin: 20px 0;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.category-card {
  width: calc(25% - 20px); /* 每行显示4个，减去间隙 */
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.category-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.category-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.category-link {
  display: block;
  color: #1890ff;
  text-decoration: none;
  font-size: 14px;
}

.category-link:hover {
  text-decoration: underline;
}
</style>
