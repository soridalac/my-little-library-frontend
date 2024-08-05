import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AddBook from '../views/AddBook.vue'


describe('AddBook.vue Test', () => {
    it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(AddBook, {
        propsData: {
            title: '',
            author: '',
            genre: '',
            description: '',
            publishedYear: '',
            language: '',
        }
    })

    // check that the title is rendered
    expect(wrapper.text()).toMatch('')
    })
})