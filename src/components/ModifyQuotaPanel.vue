<script setup>
import { ref, onMounted } from 'vue';
import { useSubscriberStore } from '@/stores/subscriber';
import QuotaModal from '@/components/QuotaModal.vue';

const searchQuery = ref('');
const showModal = ref(false);
const { getSelectedSubscriber, setSelectedSubscriber, getSubscribers, getSubscribersFromAPI } = useSubscriberStore();

function searchSubscribers(event) {
  const query = event.query.toLowerCase();
  filteredSubscribers.value = getSubscribers().value
    .filter(subscriber => subscriber.name.toLowerCase().includes(query))
}

const filteredSubscribers = ref([]);

function handleSelectedSubscriber() {
  setSelectedSubscriber(filteredSubscribers.value[0]);
}

onMounted(async() => {
  await getSubscribersFromAPI();
})

</script>

<template>
  <section class="flex flex-col items-center justify-between shadow-md bg-white  rounded-md p-4 lg:h-1/3 lg:w-1/4 text-center">
      <div>
        <h1 class="text-xl font-bold">Modifying subscriber quota</h1>
      </div>
      <div class="flex flex-col items-center gap-2 w-full">
        <label for="searchQuery" class="text-xs text-left px-1">
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
          class="!bg-black !text-white !border-none w-full"
          label="Modify quota"
          :disabled="!getSelectedSubscriber().value?.id"
          @click="showModal = true"
        />
        <QuotaModal :visible="showModal" @close="showModal = false" />
      </div>
    </section>
</template>