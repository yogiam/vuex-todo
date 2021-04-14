<template>
  <div class="app">
    <div class="container">
      <todos/>
    </div>
  </div>
</template>

<script>
import Todos from '@/components/Todos.vue'

export default {
  components: { Todos },
  name: "app",

}
</script>
<style scoped>
body {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  line-height: 1.6;
  background: #e8f7f0;
}
.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}
</style>