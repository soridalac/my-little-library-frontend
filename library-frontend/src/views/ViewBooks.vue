<template>
    <main>
        <Navbar />

        <!-- Table-->
        <div class="container">
            <div class="modal fade" id="exampleModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
                role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Recommendations</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                @click="clearAi"></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                {{ visibleAiPrompt }}
                            </div>
                            <hr>
                            <div v-if="!aiResponse" class="spinner-grow text-light" role="status">
                                <img src="../assets/book.svg" />
                            </div>
                            <div v-html="aiResponse"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <h1 class="text-center">View Book</h1>
                    <form class="row justify-content-center" @submit.prevent="search(searchText)">

                        <!-- Search button -->
                        <input type="text" class="col-3 m-2" v-model="searchText" required placeholder="Please input the book name">
                        <button class="btn btn-primary col-2 m-2">Search</button>

                        <!-- Add button -->
                        <a href="/api/books" class="btn btn-primary col-2 m-2">Add Book</a>
                    </form>

                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <!-- <th scope="col">Id</th> -->
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Description</th>
                                <th scope="col">Published Year</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Language</th>
                                <th scope="col">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="book in books" :key="book.id">
                                <!-- <th scope="row">{{book.id}}</th> -->
                                <td>{{ book.title }}</td>
                                <td>{{ book.author }}</td>
                                <td>{{ book.description }}</td>
                                <td>{{ book.publishedYear }}</td>
                                <td>{{ book.genre }}</td>
                                <td>{{ book.language }}</td>
                                <td>
                                    <img :src="book.image" alt="Book Image" style="width: 100px; height: auto;" />
                                </td>
                                <td>
                                    <div>

                                        <button type="button" class="btn btn-primary mx-2" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal" @click="suggestBook(book)">
                                            Recommendations
                                        </button>

                                        <a class="btn btn-primary mx-2" :href="`/api/books/${book.id}`">Edit</a>

                                        <button class="btn btn-danger mx-2" @click="deleteBook(book.id)">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { ApiUrl } from '@/constants';
import Navbar from '../components/Navbar.vue'


export default {
    name: 'ViewBooks',
    components: {
        Navbar
    },
    data() {
        return {
            books: [],
            searchText: '',
            visibleAiPrompt: '',
            aiResponse: ''
        }
    },

    beforeMount() {
        this.getBooks()
    },

    methods: {
        getBooks() {
            fetch(`${ApiUrl}/api/books`)
                .then(res => res.json())
                .then(data => {
                    this.books = data
                    console.log(data)
                })
        },
        clearAi() {
            this.visibleAiPrompt = '';
            this.aiResponse = '';
        },
        deleteBook(id) {
            fetch(`${ApiUrl}/api/books/${id}`, {
                method: 'DELETE'
            })
                .then(data => {
                    console.log(data)
                    this.getBooks()
                })
        },
        async suggestBook(book) {
            this.visibleAiPrompt = `Give me recommendations for books similar to ${book.title}`;
            const aiPrompt = `Give me 3 bullet point recommendations formatted in hyper text markup language and for readabilit for books similar to ${book.title} do not give me hyperlinks make title bold;`
            const result = await fetch(
                `${ApiUrl}/api/chat?prompt=${aiPrompt}`
            );

            this.aiResponse = await result.text();
            this.aiResponse= this.aiResponse.replace('```html','')
            this.aiResponse= this.aiResponse.replace('```','')
        },
        async search(searchText) {
            const result = await fetch(
                `${ApiUrl}/api/books/search?title=${searchText}`
            );

            this.books = await result.json();
        },
    }
}
</script>
