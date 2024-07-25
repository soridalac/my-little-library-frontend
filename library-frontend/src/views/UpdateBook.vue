<template>
    <main>
        <Navbar/>
        <div class="my-5">
            <div class="mx-auto w-25 " style="max-width:100%;">
                <h2 class="text-center mb-3">Update Book</h2>
                <form @submit.prevent="updateBook">
                <!--Title-->
                <div class="row">
                    <div class="col-md-12 form-group mb-3">
                    <label for="title" class="form-label">Name</label>
                    <input id="title"  type="text" name="title" class="form-control" placeholder="Name" required v-model="book.name">
                    </div>
                </div>

                
                <!--Author-->
                <div class="row">
                    <div class="col-md-12 form-group mb-3">
                        <label for="author" class="form-label">Author</label>
                        <input id="author" type="text"  name="author" class="form-control" placeholder="Author" required v-model="book.author" >
                    </div>
                </div>

                <!--Description-->
                <div class="row">
                    <div class="col-md-12 form-group mb-3">
                        <label for="description" class="form-label">Description</label>
                        <input id="description" type="text"  name="description" class="form-control" placeholder="Description" required v-model="book.description" >
                    </div>
                </div>
                
                <!--Published Year-->
                <div class="row">
                    <div class="col-md-12 form-group mb-3">
                        <label for="published_year" class="form-label">Published Year</label>
                        <input id="published_year" type="published_year"  name="published_year" class="form-control" placeholder="Published Year" required v-model="book.published_year" >
                    </div>
                </div>

                <!--Language-->
                <div class="row">
                    <div class="col-md-12 form-group mb-3">
                        <label for="language" class="form-label">Language</label>
                        <input id="language" type="text"  name="language" class="form-control" placeholder="Language" required v-model="book.language" >
                    </div>
                </div>      
                
                <div class="row">
                    <div class="col-md-12 form-group">
                    <input class="btn btn-primary w-100" type="submit" value="Submit">
                    </div>
                </div>

                <div>
                
                </div>
            </form>
        
            </div>
        </div>

    </main>
</template>


<script>
import Navbar from '../components/Navbar.vue';

export default {
    name: 'UpdateBook',
    components: {
        Navbar
    },

    data(){
        return {
            book : {
                    title: '',
                    author: '',
                    genre: '',
                    description: '',
                    published_year: '',
                    language: '',

                }
        }
    },

    beforeMount(){
        this.getBooks();
    },

    methods: {
        getBooks(){
            fetch(`http://localhost:8080/api/books/${this.$route.params.id}`)
            .then(res => res.json())
            .then(data => {
                this.book = data;
                console.log(this.book);
            })

        },
        updateBook(){
            fetch(`http://localhost:8080/api/books`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.book)
            })
            .then(data => {
                console.log(data);
                this.$router.push('/');
            })
        }
    }
}

</script>