<script setup>
import { onMounted } from 'vue'
import TaskInput from './components/TaskInput.vue'
import TaskList from './components/TaskList.vue'
import { useTaskStore } from './stores/taskStore'

const taskStore = useTaskStore()
const { fetchTasks } = taskStore

onMounted(() => {
  fetchTasks()
})
</script>

<template>
  <div class="container">
    <h1 class="text-center mt-5">My Vue Todo App</h1>
    <TaskInput />
    <TaskList />
  </div>
</template>

<style scoped>
</style>
