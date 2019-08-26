<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Test"
};
</script>

<style>
/* CSS */
::-webkit-scrollbar {
  width: 3px;
  height:3px;
}
 
::-webkit-scrollbar-track {
  background: #ddd;
}
 
::-webkit-scrollbar-thumb {
  background: #666; 
}
</style>
