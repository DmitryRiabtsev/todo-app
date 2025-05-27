<script setup>
import { ref, reactive } from 'vue'
import draggable from 'vuedraggable'
import TaskCard from '../components/TaskCard.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

const showConfirm = ref(false)
const taskToDelete = ref(null)

const columns = [
  { title: 'To Do', status: 'todo', color: 'bg-blue-100' },
  { title: 'In Progress', status: 'in-progress', color: 'bg-yellow-100' },
  { title: 'QA', status: 'qa', color: 'bg-purple-100' },
  { title: 'Done', status: 'done', color: 'bg-green-100' },
]

const tasksByStatus = reactive({
  'todo': [
    { id: 1, title: 'Создать проект' },
    { id: 2, title: 'Добавить роутинг' },
  ],
  'in-progress': [
    { id: 3, title: 'Сделать тест' },
  ],
  'qa': [
    { id: 4, title: 'Пуш на GitHub' },
  ],
  'done': []
})

const newTaskTitle = ref('')
const newTaskStatus = ref('todo')

const statuses = columns.map(col => col.status)

const statusLabels = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'qa': 'QA',
  'done': 'Done',
}

function requestDelete(task) {
  taskToDelete.value = task
  showConfirm.value = true
}

function confirmDelete() {
  deleteTask(taskToDelete.value)
  taskToDelete.value = null
  showConfirm.value = false
}

function cancelDelete() {
  taskToDelete.value = null
  showConfirm.value = false
}

function addTask() {
  if (!newTaskTitle.value.trim()) return

  tasksByStatus[newTaskStatus.value].push({
    id: Date.now(),
    title: newTaskTitle.value,
    status: newTaskStatus.value // добавляем статус
  })

  newTaskTitle.value = ''
  newTaskStatus.value = 'todo'
}


function deleteTask(taskToDelete) {
  const list = tasksByStatus[taskToDelete.status]
  const index = list.findIndex(task => task.id === taskToDelete.id)
  if (index !== -1) {
    list.splice(index, 1)
  }
}

function moveTaskForward(task) {
  const currentIndex = statuses.indexOf(task.status)
  if (currentIndex < statuses.length - 1) {
    // Удаляем из текущего списка
    const list = tasksByStatus[task.status]
    const index = list.findIndex(t => t.id === task.id)
    if (index !== -1) {
      list.splice(index, 1)
    }

    // Обновляем статус и добавляем в следующий список
    task.status = statuses[currentIndex + 1]
    tasksByStatus[task.status].push(task)
  }
}

function moveTaskBack(task) {
  const currentIndex = statuses.indexOf(task.status)
  if (currentIndex > 0) {
    const list = tasksByStatus[task.status]
    const index = list.findIndex(t => t.id === task.id)
    if (index !== -1) {
      list.splice(index, 1)
    }

    task.status = statuses[currentIndex - 1]
    tasksByStatus[task.status].push(task)
  }
}

</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 dashboard-content">
    <div class="mb-6 bg-white p-4 rounded shadow">
      <form @submit.prevent="addTask" class="flex flex-col md:flex-row gap-4">
        <input
          v-model="newTaskTitle"
          type="text"
          placeholder="Название задачи"
          class="flex-1 px-3 py-2 border rounded"
          required
        />
        <select v-model="newTaskStatus" class="px-3 py-2 border rounded">
          <option v-for="s in statuses" :key="s" :value="s">
            {{ statusLabels[s] }}
          </option>
        </select>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Добавить
        </button>
      </form>
    </div>
    <div class="dashboard-content_box">
      <ConfirmModal
          v-if="showConfirm"
          :title="'Удалить задачу?'"
          :message="'Вы уверены, что хотите удалить задачу `${taskToDelete?.title}`?'"
          @confirm="confirmDelete"
          @cancel="cancelDelete"
        />
      <div
        v-for="column in columns"
        :key="column.status"
        :class="`${column.color} p-4 rounded shadow`">
        <h2 class="text-xl font-semibold mb-4 task-title">{{ column.title }}</h2>
        <draggable
          v-model="tasksByStatus[column.status]"
          group="tasks"
          item-key="id">
          <template #item="{ element }">
            <TaskCard class="card"
              :task="element"
              @move-next="moveTaskForward"
              @move-back="moveTaskBack"
              @delete-task="requestDelete"
            />
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.dashboard-content{
  display: flex;
  flex-direction: column;

  .dashboard-content_box{
    display: flex;
    flex-direction: row;
    gap: 40px;

    h2{
      padding: 10px 25px;
    }

    .card{
      margin-bottom: 15px;
    }
  }

}
</style>
