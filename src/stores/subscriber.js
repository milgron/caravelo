import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSubscriberStore = defineStore('subscriber', () => {
  const selectedSubscriber = ref(null)
  const quotaMax = 3;
  const quotaMin = 0; 
  const subscribers = ref([]);

  // Getters

  const getSubscribers = () => computed(() => subscribers.value)
  const getSelectedSubscriber = () => computed(() => selectedSubscriber.value)

  // Setters

  function setSelectedSubscriber(subscriber) {
    selectedSubscriber.value = subscriber
  }

  function setSubscribers(people) {
    subscribers.value = people
  }

  function setNewQuota(quota, subscriber) {
    // Here we should handle the call to the API to set the new quota
    try {
      console.log('New quota:', quota, 'for subscriber:', subscriber)
    } catch (error) {
      console.error('Error setting new quota:', error)
    }
  }

  // API handlers
  
  async function getSubscribersFromAPI() {
    try {
      // Here we should handle the call to the API to get the subscribers
      setSubscribers([
        { name: 'Alejandro García', id: 1, quota: 1 },
        { name: 'María Fernández', id: 2, quota: 2 },
        { name: 'Carlos Rodríguez', id: 3, quota: 3 },
        { name: 'Lucía Martínez', id: 4, quota: 2 },
        { name: 'Javier López', id: 5, quota: 1 },
        { name: 'Jordi Pujol', id: 6, quota: 1 },
        { name: 'Montserrat Rovira', id: 7, quota: 1 },
        { name: 'Pere Soler', id: 8, quota: 2 },
        { name: 'Núria Font', id: 9, quota: 3 },
        { name: 'Oriol Mas', id: 10, quota: 1 },
      ]);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  }

  return { selectedSubscriber, setSelectedSubscriber, quotaMax, quotaMin, subscribers, setSubscribers, getSubscribersFromAPI, getSubscribers, getSelectedSubscriber, setNewQuota}
})