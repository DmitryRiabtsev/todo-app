<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-80 shadow-xl space-y-4">
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <p class="text-sm text-gray-600">{{ message }}</p>
      <div class="flex justify-end gap-2">
        <button @click="$emit('cancel')" class="px-4 py-2 text-gray-600 hover:underline">
          Отмена
        </button>
        <button @click="$emit('confirm')" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  message: String
})
defineEmits(['confirm', 'cancel'])
</script>
