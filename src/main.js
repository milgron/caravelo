import './assets/main.css'
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import AutoComplete from 'primevue/autocomplete';
import Message from 'primevue/message';
import Dialog from 'primevue/dialog';
import Listbox from 'primevue/listbox';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{blue.50}",
      100: "{blue.100}",
      200: "{blue.200}",
      300: "{blue.300}",
      400: "{blue.400}",
      500: "{blue.500}",
      600: "{blue.600}",
      700: "{blue.700}",
      800: "{blue.800}",
      900: "{blue.900}",
    }
  }
});

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset
  }
})
app.use(ToastService); 

app.component('Button', Button) 
app.component('AutoComplete', AutoComplete) 
app.component('Message', Message) 
app.component('Dialog', Dialog)
app.component('Listbox', Listbox)
app.component('Toast', Toast)
app.mount('#app')