<template>
  <NavBar />
  <Section/>
  <div class="home-page">
    <CategorySection />
    <FeaturedBooks />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import Section from '../components/Section.vue';
import CategorySection from '../components/CategorySection.vue';
import FeaturedBooks from '../components/FeaturedBooks.vue';

export default {
  name: 'HomePage',
  components: {
    NavBar,
    Section,
    CategorySection,
    FeaturedBooks,
  },
};
</script>

<style scoped>
.home-page {
  max-width: 1200px; /* 设置页面最大宽度为1000px */
  margin: 0 auto; /* 居中显示 */
  padding: 20px; /* 可选：添加一些内边距 */
  box-sizing: border-box; /* 确保 padding 包含在宽度内 */
}


</style>
