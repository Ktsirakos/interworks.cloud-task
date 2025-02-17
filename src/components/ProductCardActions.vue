<template>
    <div class="flex flex-row justify-between py-2">
        <QuantityCounter v-if="isItemInBasket" @on-descrease="onDecreaseQuantity" @on-increase="onIncreaseQuantity"
            :quantity="itemQuantity ?? 0" />
        <div v-else></div>
        <button v-if="!isItemInBasket" @click="addToBasket"
            class="flex flex-row gap-2 bg-cyan-500 text-black py-2 px-5 rounded-3xl">Add to
            basket</button>
        <button v-else @click="removeFromBasket"
            class="flex flex-row gap-2 bg-red-400 text-black py-2 px-5 rounded-3xl">Remove</button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import QuantityCounter from './QuantityCounter.vue';
import { useBasketStore } from "@/stores/basket"
import type { Product } from '@/api/types';

const props = defineProps<{ item: Product }>()
const basketStore = useBasketStore()
const isItemInBasket = computed(() => basketStore.isItemInBasket(props.item.id))
const itemQuantity = computed(() => basketStore.getQuantityForItem(props.item.id))
const onIncreaseQuantity = () => {
    basketStore.increaseQuantityForItem(props.item.id)
}
const onDecreaseQuantity = () => {
    basketStore.decreaseQuantityForItem(props.item.id)
}
const addToBasket = () => { basketStore.addItemsToBasket(props.item) }
const removeFromBasket = () => { basketStore.removeItemFromBasket(props.item.id) }
</script>