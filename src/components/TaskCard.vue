<template>
  <div
    class="p-3 bg-white border rounded shadow cursor-move flex flex-col gap-2 task-card">
    <p class="font-medium">{{ task.title }}</p>
    <div class="flex justify-between items-center text-sm">
      <div class="flex gap-2">
        <button
          @click="$emit('move-back', task)"
          :disabled="task.status === 'todo'"
          class="text-blue-600 hover:underline disabled:opacity-30"
        >
          ◀ Назад
        </button>
        <button
          @click="$emit('move-next', task)"
          :disabled="task.status === 'done'"
          class="text-blue-600 hover:underline disabled:opacity-30"
        >
          Вперёд ▶
        </button>
      </div>
      <button
        @click="$emit('delete-task', task)"
        class="text-red-600 hover:underline"
      >
        🗑 Удалить
      </button>
    </div>
  </div>
</template>

<style scoped land="scss">
.task-card{
  display: flex;
  flex-direction: column;
  padding: 20px 25px;
  border: 1px solid black;
  border-radius: 10px;
}
</style>


<script setup>
defineProps({ task: Object })
defineEmits(['move-next', 'move-back', 'delete-task'])
</script>

