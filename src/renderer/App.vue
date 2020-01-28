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
html,
body {
  padding: 0;
  margin: 0;
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

::-webkit-scrollbar-track {
  background: #ddd;
}

::-webkit-scrollbar-thumb {
  background: #666;
}
</style>
