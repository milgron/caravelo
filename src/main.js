import './assets/main.css'
import PrimeVue from 'primevue/config';
import Select from 'primevue/select';
import Button from "primevue/button"
import SelectButton from 'primevue/selectbutton';
import InputText from 'primevue/inputtext';
import AutoComplete from 'primevue/autocomplete';
import Message from 'primevue/message';
import Dialog from 'primevue/dialog';
import Listbox from 'primevue/listbox';
import Toast from 'primevue/toast';

import Aura from '@primevue/themes/aura';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.component('Button', Button) // Register the Button component globally
app.component('Select', Select) // Register the Select component globally
app.component('SelectButton', SelectButton) // Register the SelectButton component globally
app.component('InputText', InputText) // Register the InputText component globally
app.component('AutoComplete', AutoComplete); // Register the AutoComplete component globally
app.component('Message', Message); // Register the Message component globally
app.component('Dialog', Dialog); // Register the Dialog component globally
app.component('Listbox', Listbox); // Register the Listbox component globally
app.component('Toast', Toast); // Register the Toast component globally

app.mount('#app')
