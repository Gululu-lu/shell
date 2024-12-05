<template>
  <div id="app">
    <Suspense>
      <template #default>
        <router-view></router-view>
      </template>
      <template #fallback>
        <div>加载中...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { findAllBook } from './apis/BookApi';
import { provideCart } from './store/cart';

// 在 setup 函数内部定义异步函数，用于获取数据
async function fetchData() {
  try {
    const res = await findAllBook();
    console.log('获取到的数据是---', res);
    // 可以在这里处理获取到的数据，例如将数据传递给组件进行渲染
  } catch (error) {
    console.error('获取数据失败：', error);
    // 可以选择在这里处理错误，例如显示错误信息给用户
  }
}

// 调用 fetchData 函数，确保在组件加载时进行数据获取
fetchData();
provideCart();
</script>
