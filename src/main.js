import './assets/main.css'
import './assets/style.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useDroppable } from '@dnd-kit/core'



const app = createApp(App)

app.directive('droppable', {
  mounted(el, binding) {
    useDroppable({
      id: binding.value.id,
    })
  }
})

app.use(router)

app.mount('#app')
