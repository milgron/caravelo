# Caravelo FE Test
by Tomás Milgron

## Project Setup

```sh
git clone https://github.com/milgron/caravelo.git &&
cd caravelo-test &&
npm install && npm run dev
```
## Tests
I prepared some simple tests to check if the mock API calls in the Pinia stores are working as expected. To run them, you can type in your terminal:
```
npm run test:unit
```
## Stack

- Vue 3
- Vite
- TailwindCSS
- Vitest
- Pinia
- PrimeVue
## Acceptance Criteria
- **The agent will be able to add or reduce quota for a specific subscriber when needed by using a simple interface with two controls (quota field and reason field).**
	- Handled by **QuotaField** and **ReasonField** inside the **QuotaModal**, after selecting a subscriber and the, if allowed, clicking the button that opens the modal.
- **The agent performing this action will not be able to add or reduce quota without selecting a reason.**
	- Validated by **isSaveButtonDisabled**, a function that validates **quotaType** and **selectedReason**.
- **When the agent adds quota, they should be able to see the following options in the reason field: 'Subscriber canceled flight', ‘Airline canceled flight', ‘Customer compensation' or  ’Other'.**
	- The options are obtained mocking an API call in the Store, across **getReasonsFromAPI**, and filling the **incrementReasons** in the store.
- **When the agent removes quota, they should be able to see the following options in the “reason” field: 'Flight not redeposited after a flight cancellation', ‘Subscriber had log in or password issues', ‘Subscriber had issues when booking', ‘Subscription has not renewed correctly', ‘Other'.**
	- The options are obtained mocking an API call in the Store, across **getReasonsFromAPI**, and filling the **decrementReasons** in the store.
- **The save button will be only active when the quota has been changed and the reason has been selected.**
	- Validated by **isSaveButtonDisabled**, after the interaction of **QuotaField** with a watcher that validates if the quota has been updated or not, and after the interaction of **ReasonField** with a watcher that validates if the current reason is not null. Both watchers emit handlers to update the parent component, and from there makes the validation.
- **The agent will not be able to add quota for a subscriber higher than 3 flights.**
	- The userQuota value is listen by the the two (increment and decrement) buttons, altering the class and functionality to disabled if needed.
- **The agent will not be able to remove quota for a subscriber lower than 0.**
	- The **userQuota** value is listen by the the two (increment and decrement) buttons, altering the class and functionality to disable them if needed.
- **When the X (close) button is clicked it should close the modal and no change should be applied.**
	- Because some UI preference I changed the x (Close) button for a explicit close button in the footer of the modal.
- **When the save button is clicked it should save the changes and display a contextual success / error message.**
	- You can test failure in the **saveQuotaToAPI** mock API call adding a `true` as second parameter in **saveQuota()** *(Line 34 of ModifyQuotaPanel)*.
	  If the function in the store receives a boolean `true` as second argument, it forces an error call for testing purposes.
```  
async function saveQuota(quotaModification) {
  searchQuery.value = ''
  showModal.value = false
  
  // Add true to force error.
  await saveQuotaToAPI(quotaModification, true)
}
```

## Extra
1. I introduced a simple subscribers finder in the Home, to make more realistic the agent performing action.
```
[
  { "name": "Alejandro García", "id": 1, "quota": 1 },
  { "name": "María Fernández", "id": 2, "quota": 2 },
  { "name": "Carlos Rodríguez", "id": 3, "quota": 3 },
  { "name": "Lucía Martínez", "id": 4, "quota": 2 },
  { "name": "Javier López", "id": 5, "quota": 1 },
  { "name": "Jordi Pujol", "id": 6, "quota": 1 },
  { "name": "Montserrat Rovira", "id": 7, "quota": 1 },
  { "name": "Pere Soler", "id": 8, "quota": 2 },
  { "name": "Núria Font", "id": 9, "quota": 3 },
  { "name": "Oriol Mas", "id": 10, "quota": 1 }
]   
```
2. I just added the Caravelo svg logo, and favicon, to make it look more realistic.