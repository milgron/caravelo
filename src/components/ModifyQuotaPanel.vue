<script setup>
import { ref, onMounted, computed } from 'vue';
import { useSubscriberStore } from '@/stores/subscriber';
import QuotaModal from '@/components/QuotaModal.vue';

const { getSelectedSubscriber, setSelectedSubscriber, getSubscribers, getSubscribersFromAPI, saveQuotaToAPI } = useSubscriberStore();

const searchQuery = ref('');
const showModal = ref(false);
const filteredSubscribers = ref([]);

function searchSubscribers(event) {
  const query = event.query.toLowerCase();
  filteredSubscribers.value = getSubscribers().value
    .filter(subscriber => subscriber.name.toLowerCase().includes(query))
}

function handleSelectedSubscriber() {
  setSelectedSubscriber(filteredSubscribers.value[0]);
}

function isSearchQueryValid() {
  const query = String(searchQuery.value || '');
  if (getSelectedSubscriber().value?.id === null || query.trim() === '' || filteredSubscribers.value.length === 0) return false;

  return true;
}

async function saveQuota(quotaModification) {
  searchQuery.value = ''
  showModal.value = false

  // Add true as second parameter to force error.
  await saveQuotaToAPI(quotaModification)
}

onMounted(async() => {
  await getSubscribersFromAPI();
})
</script>

<template>
  <section class="flex flex-col justify-between shadow-md bg-white  rounded-md p-4 lg:h-1/3 lg:w-1/4 mx-8 lg:mx-0 mb-8 lg:mb-0">
      <h1 class="text-xl font-bold text-left">Modifying subscriber quota</h1>
      <div class="flex flex-col items-center gap-2 w-full mt-8">
        <label for="searchQuery" class="text-xs text-left">
          Please, select the subscriber you want to modify the quota for.
        </label>
        <AutoComplete 
          class="w-full"
          v-model="searchQuery"
          :suggestions="filteredSubscribers"
          @complete="searchSubscribers"
          @option-select="handleSelectedSubscriber"
          placeholder="Search subscribers"
          optionLabel="name"
        />
        <Button
          class="!bg-caravelo-blue hover:!bg-blue-500 !text-white !border-none w-full"
          label="Modify quota"
          :disabled="!isSearchQueryValid()"
          @click="showModal = true"
        />
        <QuotaModal :visible="showModal" @close="showModal = false" @saveQuota="saveQuota" />
      </div>
    </section>
</template>