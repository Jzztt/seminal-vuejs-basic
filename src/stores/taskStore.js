import { taskServices } from '@/services/taskServices'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

export const useTaskStore = defineStore('task', {
  state: () => {
    return {
      tasks: []
    }
  },
  actions: {
    async fetchTasks() {
      try {
        const fetchTasksResponse = await taskServices.getTasks()
        if (!fetchTasksResponse.success) {
          toast.error('Some thing went wrong')
          return
        }
        this.tasks = fetchTasksResponse.tasks
      } catch (error) {
        this.error = error
      }
    },
    async createTask(newTask) {
      const createTaskResponse = await taskServices.addTask(newTask)
      if (!createTaskResponse.success) {
        toast.error('Some thing went wrong')
        return
      }
      this.tasks.push(createTaskResponse.task)
      toast.success('Task created successfully')
    },
    async updateTask(updateTask) {
      const updateTaskResponse = await taskServices.updateTask(updateTask)
      if (!updateTaskResponse.success) {
        toast.error('Some thing went wrong')
        return
      }
      const index = this.tasks.findIndex((item) => item.id === updateTask.id)
      if (index == -1) {
        toast.error('Task not found')
        return
      }
      this.tasks.splice(index, 1, updateTask)
      toast.success('Task updated successfully')
    },
    async deleteTask(id) {
      const deleteTaskResponse = await taskServices.deleteTask(id)
      if (!deleteTaskResponse.success) {
        toast.error('Some thing went wrong')
        return
      }
      this.tasks = this.tasks.filter((item) => item.id != id)
      toast.success('Task deleted successfully')
    }
  }
})
