<template>
  <div class="d-flex">
    <input v-model="task.title" type="text" placeholder="Enter Task" />
    <button @click="addTask" class="btn btn-primary">Submit</button>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore'
import { ref } from 'vue'
const taskStore = useTaskStore()
const { createTask } = taskStore

const task = ref({
  title: '',
  status: 'to-do'
})

const addTask = () => {
  if (task.value.title) {
    createTask(task.value)
    task.value = {
      title: '',
      status: 'to-do'
    }
  }
}
</script>

<style scoped>
</style>