<template>
    <div>
        <div v-if="loading" class="justify-center items-center">
            <Loader class="animate-spin text-cyan-500" :size="42" />
        </div>
        <img :onload="() => { loading = false }" :class="`transition-all duration-500 ${loading ? 'w-0' : 'w-full'}`"
            :src="props.src" />
    </div>
</template>

<script setup lang="ts">
import { Loader } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{ src: string }>()

const loading = ref(true)
</script>