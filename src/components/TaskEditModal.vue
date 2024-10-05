<template>
  <div>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      :class="{ show: showModal }"
      :style="{ display: showModal ? 'block' : 'none' }"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <X @click="closeModal" />
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" v-model="title" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="closeModal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="handleSubmit">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore'
import { X } from 'lucide-vue-next'
import { ref, watch } from 'vue'

const taskStore = useTaskStore()

const { updateTask } = taskStore

const props = defineProps(['toggleModal', 'showModal', 'task'])

const emit = defineEmits(['toggleModal'])

const title = ref('')

const closeModal = () => {
  emit('toggleModal', false)
}
const handleSubmit = async () => {
  if (title.value) {
    updateTask({ ...props.task, title: title.value })
    closeModal()
  }
}
watch(
  () => props.task,
  (newTask) => {
    title.value = newTask.title
  }
)
</script>

<style scoped>
.modal-header {
  justify-content: space-between;
}
</style>