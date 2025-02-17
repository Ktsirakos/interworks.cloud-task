<template>
    <div class="flex flex-row w-full justify-between items-center py-10">
        <div>
            <img :width="300" src="https://interworks.cloud/wp-content/uploads/2022/08/interworks.cloud-logo.svg" />
            <p>Assignment authored by Konstantinos Tsirakos</p>
        </div>
        <ShoppingCartIconButton />
    </div>
</template>

<script setup lang="ts">
import ShoppingCartIconButton from './ShoppingCartIconButton.vue';
</script>