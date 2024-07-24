<script setup>
import { ref } from 'vue'
import { getBooks, postBooks, searchBooks } from '@/services/bookList';
const name = ref('Vue.js')

async function post(event) {
  const result = await postBooks();
  alert(result);
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName)
  }
}

async function get(event) {
  const result = await getBooks();
  alert(result);
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName)
  }
}

async function search(event) {
  const result = await searchBooks('test');
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
    <button @click="search">SEARCH</button>
    <button @click="get">GET</button>
    <button @click="post">POST</button>
  </main>
</template>
