<template>
    <p>{{ text }}</p>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    value: number,
    locale?: "EU" | "US"
}>()

const text = computed(() => props.locale === "EU" ? "€" + props.value : props.value + "$")
</script>