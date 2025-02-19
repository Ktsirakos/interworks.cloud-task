<template>
    <input placeholder="Search products" class="border-2 rounded-xl p-5 text-xl w-full" v-model="value" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const value = ref<string>()
const emits = defineEmits(['onQueryChange'])

watch(value, (newValue) => {
    emits('onQueryChange', newValue)
})
</script>