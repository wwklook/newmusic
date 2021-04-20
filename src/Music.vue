<template>
  <router-view v-slot="{ Component }"
    ><keep-alive :include="['Recommend', 'Rank']"> <component class="view" :is="Component" /> </keep-alive
  ></router-view>
</template>

<script>
export default {};
</script>

<style>
</style>