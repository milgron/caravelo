<script setup>
import { ref, watch, onMounted } from 'vue';
import { useSubscriberStore } from '@/stores/subscriber';

const props = defineProps({
  quotaType: String,
});

const subscriberStore = useSubscriberStore();
const { getReasonsFromAPI, getIncrementReasons, getDecrementReasons } = subscriberStore;

const emit = defineEmits(['handleReason']);

const selectedReason = ref(null);

watch(() => selectedReason.value, () => {
  selectedReason.value ? emit('handleReason', selectedReason.value) : emit('handleReason', null)
})

watch(() => props.quotaType, () => {
  selectedReason.value = null;
})

onMounted(async () => {
  await getReasonsFromAPI();
})
</script>

<template>
  <div v-if="props.quotaType && getIncrementReasons().value && getDecrementReasons().value" class="flex flex-col gap-2 mt-4">
    <p class="text-xs text-left px-1">Please, select the reason for the quota {{ props.quotaType }}.</p>
    <div class="flex items-center gap-2" v-if="props.quotaType === 'increment'">
      <Listbox v-model="selectedReason" :options="getIncrementReasons().value" optionLabel="copy" class="w-full" />
    </div>
    <div class="flex items-center gap-2" v-else>
      <Listbox v-model="selectedReason" :options="getDecrementReasons().value" optionLabel="copy" class="w-full" />
    </div>
  </div>
</template>