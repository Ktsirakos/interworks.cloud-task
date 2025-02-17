<template>
    <div class="flex flex-row gap-5 items-center">
        <CircleMinus @click="emits('onDescrease')" class="cursor-pointer hover:text-cyan-500" />
        <p class="text-white text-2xl">{{ props.quantity }}</p>
        <CirclePlus @click="emits('onIncrease')" class="cursor-pointer hover:text-cyan-500" />
    </div>
</template>

<script setup lang="ts">
import { CircleMinus, CirclePlus } from 'lucide-vue-next';
const props = defineProps<{ quantity: number }>()
const emits = defineEmits(['onIncrease', 'onDescrease'])
</script>