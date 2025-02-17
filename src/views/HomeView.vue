<script setup lang="ts">
import { ApiClient } from '@/api/client';
import type { Product } from '@/api/types';
import ProductCard from '@/components/ProductCard.vue';
import { ref } from 'vue';

const items = ref<Product[]>()
ApiClient.fetchAllProducts().then((value) => {
  items.value = value
})

</script>

<template>
  <main class="py-10">
    <div class="grid grid-cols-3 gap-10">
      <ProductCard v-for="item of items" :key="item.name" :product="item" />
    </div>
  </main>
</template>
