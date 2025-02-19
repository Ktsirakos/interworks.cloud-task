<script setup lang="ts">
import { ApiClient } from '@/api/client';
import type { Product } from '@/api/types';
import ProductCard from '@/components/ProductCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import { ref } from 'vue';

const items = ref<Product[]>()
const initialItems = ref<Product[]>([])
ApiClient.fetchAllProducts().then((value) => {
  items.value = value
  initialItems.value = value
})

const filterProducts = (query: string) => {
  console.log(query)
  items.value = initialItems.value?.filter(e => e.name.includes(query))
}

</script>

<template>
  <main class="pb-10 flex flex-col gap-5">
    <SearchBar @on-query-change="filterProducts" />
    <div class="grid grid-cols-3 gap-10">
      <ProductCard v-for="item of items" :key="item.name" :product="item" />
    </div>
  </main>
</template>
