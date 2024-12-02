<script setup>
import ModifyQuotaPanel from '@/components/ModifyQuotaPanel.vue';
</script>

<template>
  <section class="flex flex-col items-center justify-between lg:p-12 h-screen bg-gray-100">
    <div class="mt-8 lg:mt-0">
      <img src="/caravelo.svg" alt="Vue logo" class="w-24"/>
    </div>
    <ModifyQuotaPanel />
  </section>
</template>

<style>
.p-autocomplete input {
  width: 100% !important;
}
</style>