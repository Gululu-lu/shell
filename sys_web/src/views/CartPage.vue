<template>
  <div>
    <h1>购物车</h1>
    <ul>
      <li v-for="item in cart.items" :key="item.id">
        <img :src="item.image" alt="Book Image" width="50" />
        <h3>{{ item.title }}</h3>
        <p>作者: {{ item.author }}</p>
        <p>出版社: {{ item.publisher }}</p>
        <p>价格: ¥{{ item.price }}</p>
        <button @mousedown.prevent="startLongPress(item)" @mouseup.prevent="cancelLongPress" @mouseleave.prevent="cancelLongPress">长按删除</button>
      </li>
    </ul>
    <p>共计: ¥{{ totalPrice }}</p>
    <button @click="confirmPurchase">确认购买</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCart } from '../store/cart';

const { cart, removeFromCart } = useCart();
const longPressTimeout = ref(null);

const startLongPress = (item) => {
  longPressTimeout.value = setTimeout(() => {
    if (confirm(`是否删除 ${item.title} ？`)) {
      removeFromCart(item);
    }
  }, 1000); // 1秒长按触发删除
};

const cancelLongPress = () => {
  if (longPressTimeout.value) {
    clearTimeout(longPressTimeout.value);
    longPressTimeout.value = null;
  }
};

const totalPrice = computed(() => {
  return cart.items.reduce((total, item) => total + parseFloat(item.price.replace('¥', '').replace('$', '')), 0).toFixed(2);
});

const confirmPurchase = () => {
  alert('购买成功！');
};
</script>
