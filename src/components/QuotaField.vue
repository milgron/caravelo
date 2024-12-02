<script setup>
import { ref, onMounted, watch } from 'vue';
import { useSubscriberStore } from '@/stores/subscriber';

const { getSelectedSubscriber, quotaMax, quotaMin } = useSubscriberStore();
const emit = defineEmits(['handleQuotaModification']);

const userQuota = ref(null);

function incrementQuota() {
  return userQuota.value < quotaMax && userQuota.value++
}

function decrementQuota() {
  return userQuota.value > quotaMin && userQuota.value--
}

watch(() => userQuota.value, () => {
  if(userQuota.value == getSelectedSubscriber().value.quota) {
    emit('handleQuotaModification', { type: null, updatedQuota: getSelectedSubscriber().value.quota })
  } else if (userQuota.value < getSelectedSubscriber().value.quota) {
    emit('handleQuotaModification', { type: 'decrement', updatedQuota: userQuota.value })
  } else {
    emit('handleQuotaModification', { type: 'increment', updatedQuota: userQuota.value })
  }
});

onMounted(() => {
  userQuota.value = getSelectedSubscriber().value.quota;
})
</script>

<template>
  <div class="flex items-center bg-black border-none rounded-md w-fit">
    <button @click="decrementQuota" :disabled="userQuota == quotaMin" :class="{ 'bg-gray-500 cursor-not-allowed': userQuota == quotaMin }" class="bg-black w-fit text-white rounded-l-md px-2">-</button>
    <span class="w-10 text-center bg-blue-50">{{ userQuota }}</span>
    <button @click="incrementQuota" :disabled="userQuota == quotaMax" :class="{ 'bg-gray-500 cursor-not-allowed': userQuota == quotaMax }" class="bg-black w-fit text-white rounded-r-md px-2">+</button>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>