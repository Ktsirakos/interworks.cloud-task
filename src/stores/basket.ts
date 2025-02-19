import type { Product } from '@/api/types'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useBasketStore = defineStore('basket', () => {
    const basketItems = ref<{ item: Product, quantity: number }[]>([])
    const numberOfItemsInBasket = computed(() => basketItems.value.length)
    const isBasketOpen = ref<boolean>(false)
    const basketPrice = ref<number>(0)

    const addItemsToBasket = (item: Product) => {
        if (isItemInBasket(item.id)) return
        basketItems.value = [...basketItems.value, { item, quantity: 1 }]
    }

    const removeItemFromBasket = (id: number) => {
        const updatedItems = [...basketItems.value]
        basketItems.value = updatedItems.filter(e => e.item.id !== id)
    }

    const increaseQuantityForItem = (id: number) => {
        const updatedItems = [...basketItems.value]
        const index = updatedItems.findIndex(e => e.item.id === id)
        updatedItems[index].quantity++
        basketItems.value = updatedItems

    }

    const decreaseQuantityForItem = (id: number) => {
        const updatedItems = [...basketItems.value]
        const index = updatedItems.findIndex(e => e.item.id === id)

        if (index < 0) return;
        if (updatedItems[index].quantity <= 1) return;
        updatedItems[index].quantity--
        basketItems.value = updatedItems
    }

    watch(() => basketItems.value, (newValue, oldValue) => {
        console.log(basketItems.value, { newValue, oldValue })
        const totalPrice = basketItems.value.reduce((acc, curr) => {
            return acc + (curr.item.price * curr.quantity)
        }, 0)

        console.log('New price', totalPrice)
        basketPrice.value = Math.floor(totalPrice)
    })


    const isItemInBasket = (id: number) => !!basketItems.value.find(e => e.item.id === id)
    const getQuantityForItem = (id: number) => basketItems.value.find(e => e.item.id === id)?.quantity
    const openBasketDrawer = () => isBasketOpen.value = true
    const closeBasketDrawer = () => isBasketOpen.value = false

    return {
        basketItems,
        numberOfItemsInBasket,
        isBasketOpen,
        basketPrice,
        openBasketDrawer,
        closeBasketDrawer,
        addItemsToBasket,
        removeItemFromBasket,
        isItemInBasket,
        getQuantityForItem,
        increaseQuantityForItem,
        decreaseQuantityForItem
    }
})
