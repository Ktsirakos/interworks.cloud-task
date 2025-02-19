import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import BasketDrawer from '@/components/BasketDrawer.vue'
import { createTestingPinia } from "@pinia/testing"
import { useBasketStore } from '@/stores/basket'
import BasketItem from '@/components/BasketItem.vue'
import CurrencyText from '@/components/CurrencyText.vue'
import { X } from 'lucide-vue-next'

describe('BasketDrawer', () => {
    let wrapper: VueWrapper
    let basketStore: ReturnType<typeof useBasketStore>

    beforeEach(() => {
        // Reset document.body.style.overflow
        document.body.style.overflow = ''
    })

    afterEach(() => {
        wrapper.unmount()
    })

    const createWrapper = (isOpen = false) => {
        wrapper = mount(BasketDrawer, {
            props: {
                open: isOpen
            },
            global: {
                plugins: [createTestingPinia({
                    createSpy: vi.fn
                })],
            }
        })

        basketStore = useBasketStore()
        // Setup mock store data

        return { wrapper, basketStore }
    }

    it('should not display content when closed', () => {
        const { wrapper } = createWrapper(false)

        expect(wrapper.find('BasketItem').exists()).toBe(false)
    })

    it('should display content when open', () => {
        const { wrapper } = createWrapper(true)

        expect(wrapper.find('.text-5xl').text()).toBe('Basket')
        expect(wrapper.findComponent(X).exists()).toBe(true)
    })

    it('should render basket items from store', async () => {
        const { wrapper, basketStore } = createWrapper(true)

        // Mock basketItems with multiple products
        basketStore.basketItems = [
            { item: { id: 1, name: 'Product 1', price: 999, image: "" }, quantity: 1 },
            { item: { id: 2, name: 'Product 2', price: 1999, image: "" }, quantity: 2 }
        ]

        await wrapper.vm.$nextTick()

        const basketItems = wrapper.findAllComponents(BasketItem)
        expect(basketItems.length).toBe(2)
    })

    it('should display total price from store', async () => {
        const { wrapper, basketStore } = createWrapper(true)

        // Mock price
        basketStore.basketPrice = 2999

        await wrapper.vm.$nextTick()

        const currencyText = wrapper.findComponent(CurrencyText)
        expect(currencyText.exists()).toBe(true)
        expect(currencyText.props('value')).toBe(2999)
        expect(currencyText.props('locale')).toBe('EU')
    })

    it('should call closeBasketDrawer when X icon is clicked', async () => {
        const { wrapper, basketStore } = createWrapper(true)

        await wrapper.findComponent(X).trigger('click')

        expect(basketStore.closeBasketDrawer).toHaveBeenCalled()
    })

    it('should set body overflow to hidden when drawer opens', async () => {
        createWrapper(true)

        expect(document.body.style.overflow).toBe('hidden')
    })

    it('should reset body overflow when drawer closes', async () => {
        const { wrapper } = createWrapper(true)

        // Verify initial state
        expect(document.body.style.overflow).toBe('hidden')

        // Update props to close drawer
        await wrapper.setProps({ open: false })

        expect(document.body.style.overflow).toBe('')
    })

    it('should reset body overflow when component is unmounted', () => {
        const { wrapper } = createWrapper(true)

        // Verify initial state
        expect(document.body.style.overflow).toBe('hidden')

        wrapper.unmount()

        expect(document.body.style.overflow).toBe('')
    })

    it('should set proper conditional classes based on open state', async () => {
        const { wrapper } = createWrapper(false)

        // When closed
        expect(wrapper.classes()).toContain('w-0')
        expect(wrapper.classes()).toContain('overflow-hidden')
        expect(wrapper.classes()).not.toContain('w-3/10')
        expect(wrapper.classes()).not.toContain('overflow-y-auto')

        // Update to open state
        await wrapper.setProps({ open: true })

        expect(wrapper.classes()).toContain('w-3/10')
        expect(wrapper.classes()).toContain('overflow-y-auto')
        expect(wrapper.classes()).not.toContain('w-0')
        expect(wrapper.classes()).not.toContain('overflow-hidden')
    })
})