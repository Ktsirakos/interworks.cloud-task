<template>
    <div class="flex flex-col gap-2 border-1 rounded-4xl overflow-hidden">
        <img class="flex-2 w-full" :src="props.product.image" />
        <div class="flex flex-col p-5 gap-2">
            <p class="text-2xl">{{ props.product.name }}</p>
            <CurrencyText locale="EU" class="text-2xl" :value="props.product.price" />
            <ProductCardActions :item="product" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from "@/api/types";
import CurrencyText from "./CurrencyText.vue";
import ProductCardActions from "./ProductCardActions.vue";

const props = defineProps<{
    product: Product
}>()
</script>