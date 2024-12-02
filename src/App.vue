<script setup>
import './assets/main.css'
import { RouterView } from 'vue-router'
import { watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useSubscriberStore } from './stores/subscriber';

const { getMessageAfterSavingQuota } = useSubscriberStore();
const toast = useToast();

watch(getMessageAfterSavingQuota(), (message) => {
  if(message){
    toast.add({ summary: `${message.type == 'success' ? 'New quota saved' : 'Error saving quota'}`, detail: message.message, severity: message.type });
  }
});
</script>

<template>
  <Toast />
  <RouterView />
</template>

<style>
@media (max-width: 768px) {
  .p-toast {
    width: 75% !important;
  }
}
</style>