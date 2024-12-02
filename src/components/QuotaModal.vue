<script setup>
import { ref } from 'vue';
import QuotaField from '@/components/QuotaField.vue';
import { useSubscriberStore } from '@/stores/subscriber';
const quotaType = ref(null);

const { getSelectedSubscriber } = useSubscriberStore();
const props = defineProps({
  visible: Boolean,
});

const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}

function handleQuotaType(type) {
  console.log(type);
}
</script>

<template>
  <Dialog :visible="visible" modal header="Subscriber quota" class="w-[25rem] p-0">
    <section class="flex flex-col gap-2">
      <Message severity="info" variant="outlined" class="w-full text-xs">
        Modifying the quota will affect the subscriber's quota.
      </Message>
      <div class="pb-2 flex justify-between">
        <div class="flex items-center gap-1">
          <strong>Name:</strong>
          <span>{{ getSelectedSubscriber().value.name }}</span>
        </div>
        <div class="flex items-center gap-2">
          <strong>Quota</strong>
          <QuotaField @quotaType="handleQuotaType" />
        </div>
      </div>
      <div>
        <ReasonField />
      </div>
    </section>
    <div class="flex flex-col gap-2">
      <hr class="mt-2"> 
      <div class="flex justify-between">
        <button @click="closeModal" class="bg-black text-white px-4 py-2 rounded">Close</button>
        <button class="bg-caravelo-blue text-white px-4 py-2 rounded">Save quota</button>
      </div>
    </div>
  </Dialog>
</template>

<style>
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
