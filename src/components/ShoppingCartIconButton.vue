<template>
    <NotificationBadge :count="basketStore.numberOfItemsInBasket">
        <ShoppingCart @click="() => basketStore.openBasketDrawer()" class="hover:text-cyan-500 cursor-pointer"
            :size="42" />
    </NotificationBadge>
</template>

<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next';
import NotificationBadge from './NotificationBadge.vue';
import { useBasketStore } from '@/stores/basket';

const basketStore = useBasketStore()
</script>