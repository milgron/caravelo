<script setup>
import { ref, computed } from 'vue';
import QuotaField from '@/components/QuotaField.vue';
import { useSubscriberStore } from '@/stores/subscriber';
import ReasonField from '@/components/ReasonField.vue';

const props = defineProps({
  visible: Boolean,
});

const quotaType = ref(null)
const selectedReason = ref(null)
const newQuota = ref(null)

const { getSelectedSubscriber } = useSubscriberStore();

const emit = defineEmits(['close', 'saveQuota']);

function closeModal() {
  emit('close');
}

function handleQuotaModification({updatedQuota, type}) {
  newQuota.value = updatedQuota
  return newQuota.value == getSelectedSubscriber().value.quota
  ? (quotaType.value = null, selectedReason.value = null)
  : quotaType.value = type
}

function handleReason(reason) {
  selectedReason.value = reason;
}

function handleSaveQuota() {
  const quotaModification = {
    subscriberId: getSelectedSubscriber().value.id,
    quotaModificationType: quotaType.value,
    newQuota: newQuota.value,
    reason: selectedReason.value.value,
  }
  emit('saveQuota', quotaModification);
}

const isSaveButtonDisabled = computed(() => {
  return quotaType.value == null || !selectedReason.value
})
</script>

<template>
  <Dialog :visible="visible" modal header="Subscriber quota" class="w-[25rem] p-0 ">
    <section class="flex flex-col gap-2">
      <Message severity="info" variant="outlined" class="w-full text-xs">
        Modifying the quota will affect the subscriber's quota. Please be careful.
      </Message>
      <div class="pb-2 flex justify-between">
        <div class="flex items-center gap-1">
          <strong>Name:</strong>
          <span>{{ getSelectedSubscriber().value.name }}</span>
        </div>
        <div class="flex items-center gap-2">
          <strong>Quota</strong>
          <QuotaField @handleQuotaModification="handleQuotaModification" />
        </div>
      </div>
      <ReasonField :quotaType="quotaType" @handleReason="handleReason" />
    </section>
    <section class="flex flex-col gap-2 mt-12">
      <div class="flex justify-between">
        <button @click="closeModal" class="bg-black text-white px-4 py-2 rounded">Close</button>
        <button   
          class="bg-caravelo-blue text-white px-4 py-2 rounded hover:bg-blue-500" 
          :class="{'bg-gray-500 cursor-not-allowed hover:bg-gray-500': isSaveButtonDisabled}" 
          :disabled="isSaveButtonDisabled"
          @click.prevent="handleSaveQuota"
        >
          Save quota
        </button>
      </div>
    </section>
  </Dialog>
</template>

<style>
/* Styling PrimeVue components */

.p-dialog-content,
.p-dialog-header {
  padding: .5rem !important;
}
.p-dialog-header-actions {
  display: none !important;
}
.p-message-text {
  font-size: .6rem !important;
}
.p-message-content {
  padding: .2rem !important;
}
</style>
