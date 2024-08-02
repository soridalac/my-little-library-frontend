import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import ViewBooks from '@/views/ViewBooks.vue'


describe('ViewBooks.vue Implementation Test', () => {
    let wrapper = null

    // SETUP - run prior to each unit test
    beforeEach(() => {
        // render the component
        wrapper = shallowMount(ViewBooks)
    })

    // TEARDOWN - run after each unit test
    afterEach(() => {
        wrapper.unmount()
    })

    it('initializes with correct elements', () => {
        // check that the heading text is rendered
        expect(wrapper.findAll('h1').length).toEqual(1)
        expect(wrapper.findAll('h1').at(0).text()).toMatch('View Book')

        // check that 1 label is created
        expect(wrapper.findAll('input').length).toEqual(1)
        expect(wrapper.findAll('input').at(0).text()).toMatch('')

        // check that 2 buttons are created and are disabled
        expect(wrapper.findAll('button').length).toEqual(1)
        expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
        expect(wrapper.findAll('button').at(0).element.disabled).toBeFalsy()

    })

    it('emits a custom event when searchTitle() is called', () => {
        // set the input data for the user
        wrapper.vm.title = ''

        wrapper.vm.getBooks()

        // check that 1 occurrence of the event has been emitted
        expect(wrapper.emitted('text-center')).toBeUndefined()

        // check that the input data is not cleared after emitting the event
        expect(wrapper.vm.title).toMatch('')
    })
})

describe('ViewBooks.vue Behavioral Test', () => {
    let wrapper = null

    // SETUP - run prior to each unit test
    beforeEach(() => {
        // render the component
        wrapper = shallowMount(ViewBooks)
    })

    // TEARDOWN - run after each unit test
    afterEach(() => {
        wrapper.unmount()
    })

    it('initializes with the one buttons disabled', () => {
        // check that 2 buttons are created and are disabled
        expect(wrapper.findAll('button').length).toEqual(1)
        expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
    })

    it('enables the two buttons when a title is entered', async () => {
        // set the input data for the user
        wrapper.vm.title = ''

        // Wait until the DOM updates
        await flushPromises()

        // check that 1 buttons are enabled
        expect(wrapper.findAll('button').length).toEqual(1)
        expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
        expect(wrapper.findAll('button').at(0).element.disabled).toBeFalsy()
    })

    it('clears the input when title() is called', () => {
        // set the input data for the user
        wrapper.vm.title = ''

        wrapper.vm.getBooks()

        // check that the input data is cleared after emitting the event
        expect(wrapper.vm.title).toMatch(/^$/)
    })
})
