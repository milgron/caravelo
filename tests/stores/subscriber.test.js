import { setActivePinia, createPinia } from 'pinia';
import { useSubscriberStore } from '@/stores/subscriber';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Subscriber Store', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useSubscriberStore();
  });

  it('fetches subscribers from API', async () => {
    // Mock the fetch API
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ name: 'Test User', id: 1, quota: 1 }]),
      })
    );

    await store.getSubscribersFromAPI();

    expect(store.subscribers).toEqual([{ name: 'Test User', id: 1, quota: 1 }]);
    expect(fetch).toHaveBeenCalledWith('/subscribers.json');
  });

  it('fetches reasons from API', async () => {
    await store.getReasonsFromAPI();

    expect(store.getIncrementReasons().value).toEqual([
      { copy: 'Subscriber canceled flight', value: 'subscriber_canceled_flight' },
      { copy: 'Airline canceled flight', value: 'airline_canceled_flight' },
      { copy: 'Customer compensation', value: 'customer_compensation' },
      { copy: 'Other', value: 'other' },
    ]);

    expect(store.getDecrementReasons().value).toEqual([
      { copy: 'Flight not redeposited after a flight cancellation', value: 'flight_not_redeposited' },
      { copy: 'Subscriber had log in or password issues', value: 'subscriber_had_login_or_password_issues' },
      { copy: 'Subscriber had issues when booking', value: 'subscriber_had_issues_when_booking' },
      { copy: 'Subscription has not renewed correctly', value: 'subscription_has_not_renewed_correctly' },
      { copy: 'Other', value: 'other' },
    ]);
  });
}); 