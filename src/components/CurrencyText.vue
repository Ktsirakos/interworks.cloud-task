<template>
    <p>{{ text }}</p>
</template>

<script setup lang="ts">
const props = defineProps < {
    value: number,
    locale?: "EU" | "US"
} > ()

const text = props.locale === "EU" ? "€" + props.value : props.value + "$"
</script>