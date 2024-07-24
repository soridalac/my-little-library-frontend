<script setup>
import { ref } from 'vue'
import { postBooks } from '@/services/bookList';
const name = ref('Vue.js')

async function greet(event) {
  const result = await fetch('www.google.com')
  alert(result);
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName)
  }
}
async function post(event) {
  const result = await postBooks();
  alert(result);
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName)
  }
}

</script>

<template>
  <main>
    <h1>Hello Vue 3!</h1>
    <button @click="greet">Greet</button>
    <button @click="post">POST</button>
  </main>
</template>
