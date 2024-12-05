<template>
  <div class="book-detail">  
    <h1>{{ book.title }}</h1>  
    <div class="book-info">  
      <img :src="book.image" :alt="book.title" class="book-image" />  
      <div class="book-details">  
        <p><span class="detail-label">作者:</span> {{ book.author }}</p>  
        <p><span class="detail-label">出版社:</span> {{ book.publisher }}</p>  
        <p><span class="detail-label">出版年:</span> {{ book.publishYear }}</p>  
        <p><span class="detail-label">页数:</span> {{ book.pages }}</p>  
        <p><span class="detail-label">定价:</span> {{ book.price }}</p>  
        <p><span class="detail-label">装帧:</span> {{ book.binding }}</p>  
        <p><span class="detail-label">ISBN:</span> {{ book.ISBN }}</p>  
      </div>  
      <button @click="buyBook">购买</button>  
    </div>  
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCart } from '../store/cart';

const route = useRoute();
const book = ref({});

const allBooks = [
  {
    title: '大狗',
    image: '../novel_01.jpg',
    author: '常小琥',
    publisher: '中国工人出版社',
    producer: '尺寸',
    publishYear: '2024-6',
    pages: '408',
    price: '$58.00',
    binding: '平装',
    ISBN: '9787500884019'
  },
  {
    title: '梦游人',
    image: '../novel_02.jpg',
    author: '[奥]赫尔曼·布洛赫',
    publisher: '浙江文艺出版社',
    producer: 'KEY·可以文化',
    publishYear: '2024-6',
    pages: '935',
    price: '218.00元',
    binding: '精装',
    ISBN: '9787533970574'
  },
  {
    title: '凛冬之罪',
    image: '../novel_03.jpg',
    author: '岳勇',
    publisher: '北京联合出版公司',
    producer: '牧神文化',
    publishYear: '2024-6',
    pages: '308',
    price: '59.00元',
    binding: '平装',
    ISBN: '9787559675873'
  },
  {
    title: '羊道',
    image: '../novel_04.jpg',
    author: '李娟',
    publisher: '花城出版社',
    publishYear: '2022-9',
    pages: '348',
    price: '55.00元',
    binding: '平装',
    ISBN: '9787536097087'
  },
  {
    title: '阿勒泰的角落',
    image: '../literature_01.jpg',
    author: '李娟',
    publisher: '新星出版社',
    producer: '新经典文化',
    publishYear: '2024-1-9',
    pages: '352',
    price: '59',
    binding: '平装',
    ISBN: '9787513344180'
  },
  {
    title: '活着',
    image: '../literature_02.jpg',
    author: '余华',
    publisher: '作家出版社',
    publishYear: '2012-8',
    pages: '191',
    price: '20.00元',
    binding: '平装',
    ISBN: '9787506365437'
  },
  {
    title: '太白金星有点烦',
    image: '../literature_03.jpg',
    author: '马伯庸',
    publisher: '湖南文艺出版社',
    producer: '博集天卷',
    publishYear: '2023-6',
    pages: '276',
    price: '45.00',
    binding: '平装',
    ISBN: '9787572610912'
  },
  {
    title: '我与地坛',
    image: '../literature_04.jpg',
    author: '史铁生',
    publisher: '人民文学出版社',
    publishYear: '2011-1-1',
    pages: '226',
    price: '23.00元',
    binding: '平装',
    ISBN: '9787020083442'
  },
  {
    title: '钟表馆事件',
    image: '../illation_01.jpg',
    author: '[日] 绫辻行人',
    publisher: '新星出版社',
    originalTitle: '時計館の殺人',
    translator: '刘羽阳',
    publishYear: '2016-6',
    pages: '452',
    price: '35.00元',
    binding: '平装',
    series: '午夜文库·大师系列：绫辻行人作品（2016版）',
    ISBN: '9787513320955'
  },
  {
    title: '孤岛的来访者',
    image: '../illation_02.jpg',
    author: '[日] 方丈贵惠',
    publisher: '新星出版社',
    originalTitle: '孤島の来訪者',
    translator: '穆迪',
    publishYear: '2023-4',
    pages: '308',
    price: '49.00元',
    binding: '平装',
    series: '午夜文库·日系佳作',
    ISBN: '9787513351850'
  },
  {
    title: '消失的13级台阶',
    image: '../illation_03.jpg',
    author: '[日] 高野和明',
    publisher: '上海文艺出版社',
    producer: '读客文化',
    originalTitle: '13階段',
    translator: '赵建勋',
    publishYear: '2020-5-15',
    pages: '288',
    price: '42.00元',
    binding: '平装',
    series: '读客悬疑文库从书',
    ISBN: '9787532175512'
  },
  {
    title: '第七重解答',
    image: '../illation_04.jpg',
    author: '[法] 保罗·霍尔特',
    publisher: '新星出版社',
    originalTitle: 'La Septieme Hypothese',
    translator: '王琢',
    publishYear: '2010-1',
    pages: '258',
    price: '23.00元',
    binding: '平装',
    series: '午夜文库·大师系列：保罗·霍尔特作品',
    ISBN: '9787802258136'
  },
  {
    title: '意识上传中',
    image: '../science_01.jpg',
    author: '[澳] 格雷格·伊根',
    publisher: '江苏凤凰文艺出版社',
    producer: '读客文化',
    originalTitle: 'Axiomatic',
    translator: '姚向辉',
    publishYear: '2022-11-18',
    pages: '416',
    price: '56',
    binding: '平装',
    series: '读客科幻文库：格雷格·伊根作品',
    ISBN: '9787559470560'
  },
  {
    title: '地球尽头的温室',
    image: '../science_02.jpg',
    author: '金草叶',
    publisher: '花城出版社',
    producer: '磨铁·大鱼读品',
    originalTitle: '지구 끝의 온실',
    translator: '胡椒筒',
    publishYear: '2023-5-15',
    pages: '272',
    price: '49',
    binding: '平装',
    ISBN: '9787536099760'
  },
  {
    title: '星之继承者',
    image: '../science_03.jpg',
    author: '[英] 詹姆斯·P.霍根',
    publisher: '新星出版社',
    producer: '八光分文化',
    originalTitle: 'Inherit the Stars',
    translator: '[加] 仇春卉',
    publishYear: '2021-4',
    pages: '238',
    price: '58.00元',
    binding: '精装',
    series: '光分科幻文库',
    ISBN: '9787513342094'
  },
  {
    title: '科幻逃离未来4',
    image: '../science_04.jpg',
    author: '(日) 小林泰三',
    publisher: '译林出版社',
    originalTitle: '未来からの脱出',
    translator: '丁丁虫',
    publishYear: '2023-10',
    pages: '280',
    price: '56.00元',
    binding: '精装',
    series: '译林幻系列',
    ISBN: '9787544798587'
  },
  {
    title: '人与神圣',
    image: '../history_01.jpg',
    author: '[法] 罗杰·卡约瓦',
    publisher: '生活·读书·新知三联书店',
    originalTitle: 'L\'homme et le sacré',
    translator: '赵天舒',
    publishYear: '2024-6-11',
    pages: '291',
    price: '69.00元',
    binding: '精装',
    series: '法兰西思想文化丛书',
    ISBN: '9787108077332'
  },
  {
    title: '三国前夜',
    image: '../history_02.jpg',
    author: '张向荣',
    publisher: '上海人民出版社',
    producer: '世纪文景',
    subtitle: '士大夫政治与东汉皇权的崩解',
    publishYear: '2024-6',
    pages: '516',
    price: '89.80元',
    binding: '精装',
    series: '文景·未央',
    ISBN: '9787208186903'
  },
  {
    title: '清人社会生活',
    image: '../history_03.jpg',
    author: '冯尔康 / 常建华',
    publisher: '天津人民出版社',
    producer: '长城砖',
    publishYear: '2024-6',
    pages: '539',
    price: '98.00',
    binding: '精装',
    series: '长城砖',
    ISBN: '9787201199535'
  },
  {
    title: '云南禄村',
    image: '../history_04.jpg',
    author: '[加] 宝森',
    publisher: '江苏人民出版社',
    producer: '胡玉坤',
    subtitle: '中国妇女与农村发展',
    publishYear: '2024-5-1',
    pages: '525',
    price: '138.00元',
    binding: '精装',
    series: '海外中国研究丛书·精选版第四辑',
    ISBN: '9787214290700'
  },
  {
    title: '弗吉尼亚·伍尔夫传',
    image: '../biography_01.jpg',
    author: '[英] 林德尔·戈登',
    publisher: '上海文艺出版社',
    producer: '艺文志eons',
    subtitle: '作家的一生',
    originalTitle: 'Virginia Woolf: A Writer\'s Life',
    translator: '谢雅卿',
    publishYear: '2024-3',
    pages: '540',
    price: '88',
    binding: '平装',
    series: '艺文志·人物',
    ISBN: '9787532186198'
  },
  {
    title: '契科夫传',
    image: '../biography_02.jpg',
    author: '[英]唐纳德·雷菲尔德',
    publisher: '浙江大学出版社',
    producer: '启真馆',
    originalTitle: 'Anton Chekhov：A Life',
    translator: '徐菡',
    publishYear: '2023-9',
    pages: '850',
    price: '178.00元',
    binding: '精装',
    series: '启真·文学家',
    ISBN: '9787308238694'
  },
  {
    title: '巨流河',
    image: '../biography_03.jpg',
    author: '齐邦媛',
    publisher: '生活·读书·新知三联书店',
    publishYear: '2010-10',
    pages: '398',
    price: '39.00元',
    binding: '平装',
    ISBN: '9787108034731'
  },
  {
    title: '一次告别',
    image: '../biography_04.jpg',
    author: '[哥伦比亚] 罗德里戈·加西亚',
    publisher: '南海出版公司',
    producer: '新经典文化',
    originalTitle: 'A Farewell to Gabo and Mercedes',
    translator: '杨玲',
    publishYear: '2024-4',
    pages: '160',
    price: '49.00元',
    binding: '精装',
    ISBN: '9787573507983'
  }
];

const title = route.params.title;
book.value = allBooks.find(b => b.title === title);

const { addToCart } = useCart();

const buyBook = () => {
  const { title, author, publisher, price, image } = book.value;
  addToCart({ title, author, publisher, price, image });
};
</script>

<style scoped>
.book-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.book-info {
  display: flex;
  margin-top: 20px;
}

.book-image {
  width: 200px;
  height: auto;
  margin-right: 20px;
}

.book-details {
  flex-grow: 1;
}

.detail-label {
  font-weight: bold;
  margin-right: 5px;
}
</style>
