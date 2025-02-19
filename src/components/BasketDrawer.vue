<template>
    <div
        :class="`fixed transition-all duration-500 ${props.open ? 'w-3/10' : 'w-0'} bg-stone-500 h-full right-0 z-100 ${props.open ? 'overflow-y-auto' : 'overflow-hidden'}`">
        <div v-if="props.open" class="py-10 px-5">
            <div class="flex flex-row justify-between items-center">
                <p class="text-5xl">Basket</p>
                <X @click="() => closeBasketDrawer()" :size="52" color="white" class="cursor-pointer" />
            </div>
            <div class="py-10 gap-4">
                <BasketItem v-for="product of basketItems" :product="product.item" :key="product.item.id" />
            </div>
            <div class="flex flex-row justify-between items-center">
                <p class="text-3xl">Total</p>
                <CurrencyText locale="EU" class="text-4xl" :value="basketPrice" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBasketStore } from '@/stores/basket';
import { X } from 'lucide-vue-next';
import BasketItem from './BasketItem.vue';
import { watch, onMounted, onUnmounted } from 'vue';
import CurrencyText from './CurrencyText.vue';
import { storeToRefs } from 'pinia';
const props = defineProps<{
    open: boolean
}>()

const basketStore = useBasketStore()

const {
    basketItems,
    basketPrice,
} = storeToRefs(basketStore)

const { closeBasketDrawer } = basketStore

watch(() => props.open, (newValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden'; //disabling body scroll
    } else {
        document.body.style.overflow = ''; //enabling body scroll
    }
});

onMounted(() => {
    if (props.open) {
        document.body.style.overflow = 'hidden'; //disabling body scroll    
    }
});

onUnmounted(() => {
    document.body.style.overflow = ''; //enabling body scroll
});
</script>