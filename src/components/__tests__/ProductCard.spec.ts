import { describe, it, expect, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'
import CurrencyText from '@/components/CurrencyText.vue'
import ProductCardActions from '@/components/ProductCardActions.vue'
import LazyImage from '@/components/LazyImage.vue'
import type { Product } from '@/api/types'
import { createTestingPinia } from '@pinia/testing'

describe('ProductCard', () => {
    // Sample product data for testing
    const mockProduct: Product = {
        id: 1,
        name: 'Test Product',
        price: 2999,
        image: 'test-image-url.jpg',
    }

    const createWrapper = (product = mockProduct): VueWrapper => {
        return mount(ProductCard, {
            props: {
                product
            },
            global: {
                plugins: [createTestingPinia({
                    createSpy: vi.fn
                })]
            }
        })
    }

    it('renders correctly with product data', () => {
        const wrapper = createWrapper()

        const productName = wrapper.find('p')
        expect(productName.text()).toBe('Test Product')
    })

    it('passes the correct image URL to LazyImage component', () => {
        const wrapper = createWrapper()

        const lazyImage = wrapper.findComponent(LazyImage)
        expect(lazyImage.exists()).toBe(true)
        expect(lazyImage.props('src')).toBe('test-image-url.jpg')
    })

    it('passes the correct price to CurrencyText component', () => {
        const wrapper = createWrapper()

        const currencyText = wrapper.findComponent(CurrencyText)
        expect(currencyText.exists()).toBe(true)
        expect(currencyText.props('value')).toBe(2999)
        expect(currencyText.props('locale')).toBe('EU')
    })

    it('passes the product to ProductCardActions component', () => {
        const wrapper = createWrapper()

        const productActions = wrapper.findComponent(ProductCardActions)
        expect(productActions.exists()).toBe(true)
        expect(productActions.props('item')).toEqual(mockProduct)
    })

    it('handles products with long names correctly', () => {
        const longNameProduct = {
            ...mockProduct,
            name: 'This is a very long product name that should still display correctly in the UI'
        }

        const wrapper = createWrapper(longNameProduct)
        const productName = wrapper.find('p')
        expect(productName.text()).toBe(longNameProduct.name)
    })

    it('renders correctly with minimum product data', () => {
        // Create minimal product with only required fields
        const minimalProduct: Product = {
            id: 2,
            name: 'Minimal Product',
            price: 1099,
            image: 'minimal.jpg',
        }

        const wrapper = createWrapper(minimalProduct)

        expect(wrapper.find('p').text()).toBe('Minimal Product')
        const currencyText = wrapper.findComponent(CurrencyText)
        expect(currencyText.props('value')).toBe(1099)
        const lazyImage = wrapper.findComponent(LazyImage)
        expect(lazyImage.props('src')).toBe('minimal.jpg')
    })

    it('handles zero price products correctly', () => {
        const freeProduct = {
            ...mockProduct,
            price: 0
        }

        const wrapper = createWrapper(freeProduct)
        const currencyText = wrapper.findComponent(CurrencyText)
        expect(currencyText.props('value')).toBe(0)
    })
})