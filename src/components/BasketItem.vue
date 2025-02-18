<template>
    <div class="flex flex-row gap-2 overflow-hidden my-5">
        <img class="w-1/4" :src="props.product.image" />
        <div>
            <p class="text-2xl">{{ props.product.name }}</p>
            <CurrencyText locale="EU" class="text-2xl" :value="props.product.price" />
        </div>
    </div>
    <ProductCardActions :item="product" />
</template>

<script setup lang="ts">
import type { Product } from "@/api/types";
import CurrencyText from "./CurrencyText.vue";
import ProductCardActions from "./ProductCardActions.vue";

const props = defineProps<{
    product: Product
}>()
</script>