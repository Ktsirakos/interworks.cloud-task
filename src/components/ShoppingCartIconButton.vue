<template>
    <NotificationBadge :count="2">
        <ShoppingCart class="hover:text-cyan-500 cursor-pointer" :size="42" />
    </NotificationBadge>
</template>

<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next';
import NotificationBadge from './NotificationBadge.vue';

</script>