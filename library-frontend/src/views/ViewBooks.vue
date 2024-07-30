<template>
    <main>
        <Navbar />

        <!-- Table-->
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1 class="text-center">View Book</h1>
                    <form class="row justify-content-center" @submit.prevent="search(searchText)">

                    <!--Search button -->
                        <input class="col-3 m-2" v-model="searchText" required placeholder="Please input the book name">
                        <button class="btn btn-primary col-2 m-2">Search</button>
                   
                    <!--Add button -->
                    <a href="/api/books" class="btn btn-primary col-2 m-2">Add Book</a>
                 </form>

                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Description</th>
                                <th scope="col">Published Year</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Language</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="book in books" :key="book.id">
                            <th scope="row">{{book.id}}</th>
                            <td>{{book.title}}</td>
                            <td>{{book.author}}</td>
                            <td>{{book.description}}</td>
                            <td>{{book.publishedYear}}</td>
                            <td>{{book.genre}}</td>
                            <td>{{book.language}}</td>
                                <td>
                                    <a class="btn btn-primary" :href="`/api/books/${book.id}`">Edit</a>
                                    <button class="btn btn-danger mx-2" @click="deleteBook(book.id)">Delete</button>
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
import Navbar from '../components/Navbar.vue'

export default {
    name: 'ViewBooks',
    components: {
        Navbar
    },
    data() {
        return {
            books: []
        }
    },

    beforeMount() {
        this.getBooks()
    },

    methods: {
        getBooks() {
            fetch('https://my-little-library-backend-841473d33266.herokuapp.com/api/books')
                .then(res => res.json())
                .then(data => {
                    this.books = data
                    console.log(data)
                })
        },
        deleteBook(id) {
            fetch(`https://my-little-library-backend-841473d33266.herokuapp.com/api/books/${id}`, {
                method: 'DELETE'
            })
                .then(data => {
                    console.log(data)
                    this.getBooks()
                })
        },
        async search(searchText) {
            const result = await fetch(
                `https://my-little-library-backend-841473d33266.herokuapp.com/api/books/search?title=${searchText}`
            );

            this.books = await result.json();
        },
    }

}

</script>