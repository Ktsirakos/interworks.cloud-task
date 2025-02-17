<template>
    <div :class="`absolute transition-all duration-500 ${props.open ? 'w-3/10' : 'w-0'} bg-white h-full right-0 z-10`">
        <div class="py-10 px-5">
            <div class="flex flex-row justify-between items-center">
                <p class="text-black text-5xl">Basket</p>
                <X @click="() => basketStore.closeBasketDrawer()" :size="52" color="black" class="cursor-pointer" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBasketStore } from '@/stores/basket';
import { X } from 'lucide-vue-next';
const props = defineProps<{
    open: boolean
}>()

const basketStore = useBasketStore()
</script>