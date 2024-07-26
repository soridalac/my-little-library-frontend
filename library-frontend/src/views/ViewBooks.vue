<template>
    <main>
        <Navbar />

        <!-- Table-->
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1 class="text-center">View Book</h1>
                    <!--Add button -->
                    <button @click="search">SEARCH</button>
                    <a href="/api/books" class="btn btn-primary">Add Book</a>
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
                            <td>{{book.published_year}}</td>
                            <td>{{book.genre}}</td>
                            <td>{{book.language}}</td>
                                <td>
                                    <a class="btn btn-primary" :href="`/edit/${book.id}`">Edit</a>
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
import { searchBooks } from '@/services/bookList';
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

        beforeMount(){
        this.getBooks()
    },

    methods: {
            getBooks(){
            fetch('http://localhost:8080/api/books')
                .then(res => res.json())
                .then(data => {
                    this.books = data
                    console.log(data)
                })
        },
            deleteBook(id){
            fetch(`http://localhost:8080/api/books/${id}`, {
                method: 'DELETE'
            })
                .then(data => {
                    console.log(data)
                    this.getBooks()
                })
        }, 
        async search(event) {
            const result = await searchBooks('test');
            alert(result);
            // `event` is the native DOM event
            if (event) {
                alert(event.target.tagName)
            }
        },
    }

}

</script>