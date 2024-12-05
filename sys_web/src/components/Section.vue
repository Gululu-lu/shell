<template>
  <div class="section">
    <ul>
      <li v-for="(category, index) in categories" :key="index" @mouseover="showDropdown(index)" @mouseleave="hideDropdown(index)">
        {{ category.name }}
        <div class="dropdown-panel" v-if="category.showDropdown">
          <div v-for="(book, bIndex) in category.books" :key="bIndex" class="book-info">
            <img :src="'/images/' + book.image" :alt="book.title" @click="goToDetail(book.title)" />
            <p>{{ book.title }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          name: '小说',
          showDropdown: false,
          books: [
            { title: '大狗', image: 'novel_01.jpg' },
            { title: '梦游人', image: 'novel_02.jpg' },
            { title: '凛冬之罪', image: 'novel_03.jpg' },
            { title: '羊道', image: 'novel_04.jpg' }
          ]
        },
        {
          name: '文学',
          showDropdown: false,
          books: [
            { title: '阿勒泰的角落', image: 'literature_01.jpg' },
            { title: '活着', image: 'literature_02.jpg' },
            { title: '太白金星有点烦', image: 'literature_03.jpg' },
            { title: '我与地坛', image: 'literature_04.jpg' }
          ]
        },
        {
          name: '推理',
          showDropdown: false,
          books: [
            { title: '钟表馆事件', image: 'illation_01.jpg' },
            { title: '孤岛的来访者', image: 'illation_02.jpg' },
            { title: '消失的13级台阶', image: 'illation_03.jpg' },
            { title: '第七重解答', image: 'illation_04.jpg' }
          ]
        },
        {
          name: '科幻',
          showDropdown: false,
          books: [
            { title: '意识上传中', image: 'science_01.jpg' },
            { title: '地球尽头的温室', image: 'science_02.jpg' },
            { title: '星之继承者', image: 'science_03.jpg' },
            { title: '科幻逃离未来4', image: 'science_04.jpg' }
          ]
        },
        {
          name: '历史',
          showDropdown: false,
          books: [
            { title: '人与神圣', image: 'history_01.jpg' },
            { title: '三国前夜', image: 'history_02.jpg' },
            { title: '清人社会生活', image: 'history_03.jpg' },
            { title: '云南禄村', image: 'history_04.jpg' }
          ]
        },
        {
          name: '传记',
          showDropdown: false,
          books: [
            { title: '弗吉尼亚·伍尔夫传', image: 'biography_01.jpg' },
            { title: '契科夫传', image: 'biography_02.jpg' },
            { title: '巨流河', image: 'biography_03.jpg' },
            { title: '一次告别', image: 'biography_04.jpg' }
          ]
        }
      ]
    };
  },
  methods: {
    showDropdown(index) {
      this.categories[index].showDropdown = true;
    },
    hideDropdown(index) {
      this.categories[index].showDropdown = false;
    },
    goToDetail(title) {
      this.$router.push({ path: `/book/${title}` });
    }
  }
};
</script>

<style scoped>
.section {  
  max-width: 800px;  
  margin: 50px auto;  
  background-color: #fff;  
  padding: 20px;  
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);  
}  
  
ul {  
  list-style-type: none;  
  padding: 0;  
  margin: 0;  
}  
  
.section ul {  
  display: flex;  
  flex-wrap: wrap;  
  justify-content: space-around;  
}  
  
li {  
  margin: 5px;  
  padding: 10px;  
  border-bottom: 1px solid #ddd;  
  cursor: pointer;  
  position: relative;  
}  
  
.section li:hover {  
  background-color: #f0f0f0;  
}  
  
.dropdown-panel {  
  display: none;  
  position: absolute;  
  background-color: #fff;  
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);  
  padding: 10px;  
  width: 500px;  
  z-index: 1000;  
  left: 0;  
  top: 100%;  
  display: flex;  
  flex-direction: row;  
}  
  
.book-info {  
  margin-right: 20px;  
  text-align: center;  
}  
  
.book-info img {  
  max-width: 100px;  
  height: auto;  
  margin-bottom: 10px;  
  cursor: pointer;  
}  
  
li.show-dropdown .dropdown-panel {  
  display: block;  
} 
</style>
