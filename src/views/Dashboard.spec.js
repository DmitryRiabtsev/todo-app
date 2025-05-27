/// <reference types="vitest" />
import { mount } from '@vue/test-utils'
import DashboardView from './DashboardView.vue'
import { nextTick } from 'vue'
import { describe, it, expect } from 'vitest'

describe('DashboardView', () => {
  it('добавляет новую задачу при заполнении формы', async () => {
    const wrapper = mount(DashboardView)

    // Найдём input для названия задачи
    const input = wrapper.find('input[type="text"]')
    // Найдём select для выбора статуса
    const select = wrapper.find('select')
    // Найдём кнопку submit
    const button = wrapper.find('button[type="submit"]')

    // Введём название задачи
    await input.setValue('Новая задача для теста')

    // Выберем статус (например 'in-progress')
    await select.setValue('in-progress')

    // Нажмём кнопку добавить
    await button.trigger('submit')

    // Ждём обновления DOM
    await nextTick()

    // Проверим, что новая задача появилась в списке
    const newTask = wrapper.vm.tasksByStatus['in-progress'].find(t => t.title === 'Новая задача для теста')

    expect(newTask).toBeTruthy()
    expect(newTask.status).toBe('in-progress')

    // Дополнительно можно проверить, что форма очистилась
    expect(wrapper.vm.newTaskTitle).toBe('')
    expect(wrapper.vm.newTaskStatus).toBe('todo') // сбрасывается на todo
  })
})
