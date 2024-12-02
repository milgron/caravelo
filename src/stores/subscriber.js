import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSubscriberStore = defineStore('subscriber', () => {
  const selectedSubscriber = ref(null)
  const quotaMax = 3;
  const quotaMin = 0; 
  const subscribers = ref([]);
  const decrementReasons = ref([]);
  const incrementReasons = ref([]);
  const messageAfterSavingQuota = ref(null);

  // Getters

  const getSubscribers = () => computed(() => subscribers.value)
  const getSelectedSubscriber = () => computed(() => selectedSubscriber.value)
  const getIncrementReasons = () => computed(() => incrementReasons.value)
  const getDecrementReasons = () => computed(() => decrementReasons.value)
  const getMessageAfterSavingQuota = () => computed(() => messageAfterSavingQuota.value)

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

  function setIncrementReasons(reasons) {
    incrementReasons.value = reasons;
  }

  function setDecrementReasons(reasons) {
    decrementReasons.value = reasons;
  }

  function setNewSubscriberQuota(subscriberId , quota) {
    const subscriber = subscribers.value.find(subscriber => subscriber.id === subscriberId);
    if (subscriber) {
      subscriber.quota = quota;
    }
  }

  function setMessageAfterSavingQuota(message) {
    messageAfterSavingQuota.value = message;
  }

  // API handlers
  
  async function getSubscribersFromAPI() {
    console.log('Getting subscribers from API')
    // Here we should handle the call to the API to get the subscribers
    const subscribersJSON = await fetch('/subscribers.json').then(res => res.json())

    try {
      setSubscribers(subscribersJSON);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  }

  async function getReasonsFromAPI() {
    try {
      // Here we should handle the call to the API to get the reasons
      setIncrementReasons([
        { copy: 'Subscriber canceled flight', value: 'subscriber_canceled_flight' },
        { copy: 'Airline canceled flight', value: 'airline_canceled_flight' },
        { copy: 'Customer compensation', value: 'customer_compensation' },
        { copy: 'Other', value: 'other' },
      ]);

      setDecrementReasons([
        { copy: 'Flight not redeposited after a flight cancellation', value: 'flight_not_redeposited' },
        { copy: 'Subscriber had log in or password issues', value: 'subscriber_had_login_or_password_issues' },
        { copy: 'Subscriber had issues when booking', value: 'subscriber_had_issues_when_booking' },
        { copy: 'Subscription has not renewed correctly', value: 'subscription_has_not_renewed_correctly' },
        { copy: 'Other', value: 'other' },
      ]);
    } catch (error) {
      console.error('Error fetching reasons:', error);
    }
  }

  async function saveQuotaToAPI(quotaModification) {
    // Here we should handle the call to the API to save the quota modification
    
    try {
      setNewSubscriberQuota(quotaModification.subscriberId, quotaModification.newQuota)
      setMessageAfterSavingQuota('Quota saved successfully')
      setTimeout(() => {
        setMessageAfterSavingQuota(null)
      }, 3000)
    } catch (error) {
      setMessageAfterSavingQuota('Error saving quota modification')
      setTimeout(() => {
        setMessageAfterSavingQuota(null)
      }, 3000)
      console.error('Error saving quota modification:', error)
    }
  }

  return { selectedSubscriber, setSelectedSubscriber, quotaMax, quotaMin, subscribers, setSubscribers, getSubscribersFromAPI, getSubscribers, getSelectedSubscriber, setNewQuota, setIncrementReasons, setDecrementReasons, getDecrementReasons, getIncrementReasons, getReasonsFromAPI, saveQuotaToAPI, getMessageAfterSavingQuota}
})