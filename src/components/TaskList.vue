<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col">#</th>
          <th scope="col">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in taskStore.tasks" :key="task.id">
          <td scope="row">
            <span>{{ task.title }}</span>
          </td>
          <td @click="handleChangeStatus(task)">
            <span>{{ task.status }}</span>
          </td>
          <td><PencilLine @click="editTask(task)" /></td>
          <td><Trash @click="handleDeleteTask(task.id)" /></td>
        </tr>
      </tbody>
    </table>
    <TaskEditModal :showModal="showModal" @toggleModal="toggleModal" :task="selectedTask" />
  </div>
</template>

<script setup>
import { PencilLine, Trash } from 'lucide-vue-next'
import { ref } from 'vue'
import TaskEditModal from './TaskEditModal.vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
const { updateTask, deleteTask } = taskStore

const showModal = ref(false)

const selectedTask = ref(null)

const toggleModal = (status) => {
  showModal.value = status
}
const handleDeleteTask = async (id) => {
  const isConfirmed = window.confirm('Are you sure you want to delete this task?')
  if (isConfirmed) {
    await deleteTask(id)
  }
}

const editTask = (task) => {
  selectedTask.value = task
  toggleModal(true)
}

const handleChangeStatus = async (task) => {
  if (task.status === 'to-do') {
    task.status = 'in-progress'
  } else if (task.status === 'in-progress') {
    task.status = 'done'
  } else {
    task.status = 'to-do'
  }

  await updateTask(task)
}
</script>

<style >
</style>