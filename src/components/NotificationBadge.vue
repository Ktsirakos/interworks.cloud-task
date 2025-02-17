<template>
    <div class="relative inline-block">
        <span class="
        absolute 
        -top-2
        -right-2
        bg-red-500 
        rounded-4xl 
        w-6 h-6
        text-lg
        flex 
        items-center
        justify-center
        z-10
        ">{{ props.count }}</span>

        <div class="relative">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    count: number
}>()
</script>