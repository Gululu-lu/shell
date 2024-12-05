// src/store/cart.js
import { ref, reactive, provide, inject } from 'vue';

const cartSymbol = Symbol();

export function provideCart() {
  const cart = reactive({
    items: []
  });

  function addToCart(book) {
    cart.items.push(book);
  }
  const removeFromCart = (item) => {
    const index = state.items.findIndex(i => i.id === item.id);
    if (index > -1) {
      state.items.splice(index, 1);
    }
  };
  provide(cartSymbol, {
    cart,
    addToCart,
    removeFromCart
  });
}

export function useCart() {
  const cartStore = inject(cartSymbol);
  if (!cartStore) {
    throw new Error('useCart must be used after provideCart');
  }
  return cartStore;
}
