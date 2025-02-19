import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuantitySelector from '@/components/QuantityCounter.vue'
import { CircleMinus, CirclePlus } from 'lucide-vue-next'

describe('QuantitySelector', () => {
    const createWrapper = (quantity = 1) => {
        return mount(QuantitySelector, {
            props: {
                quantity
            }
        })
    }

    it('renders correctly with the provided quantity', () => {
        const wrapper = createWrapper(5)

        const quantityText = wrapper.find('p')
        expect(quantityText.text()).toBe('5')

        expect(wrapper.findComponent(CircleMinus).exists()).toBe(true)
        expect(wrapper.findComponent(CirclePlus).exists()).toBe(true)
    })

    it('emits onIncrease event when plus button is clicked', async () => {
        const wrapper = createWrapper(2)

        await wrapper.findComponent(CirclePlus).trigger('click')

        expect(wrapper.emitted('onIncrease')).toBeTruthy()
        expect(wrapper.emitted('onIncrease')?.length).toBe(1)
    })

    it('emits onDescrease event when minus button is clicked', async () => {
        const wrapper = createWrapper(2)

        await wrapper.findComponent(CircleMinus).trigger('click')

        expect(wrapper.emitted('onDescrease')).toBeTruthy()
        expect(wrapper.emitted('onDescrease')?.length).toBe(1)
    })

    it('handles zero quantity correctly', () => {
        const wrapper = createWrapper(0)

        const quantityText = wrapper.find('p')
        expect(quantityText.text()).toBe('0')
    })

    it('does not emit any events on initial render', () => {
        const wrapper = createWrapper(1)

        expect(wrapper.emitted('onIncrease')).toBeFalsy()
        expect(wrapper.emitted('onDescrease')).toBeFalsy()
    })


    it('works with large quantity values', () => {
        const wrapper = createWrapper(9999)

        const quantityText = wrapper.find('p')
        expect(quantityText.text()).toBe('9999')
    })
})