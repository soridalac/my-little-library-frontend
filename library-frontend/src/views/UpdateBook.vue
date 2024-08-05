<template>
    <main>
        <Navbar />
        <div class="my-5">
            <div class="mx-auto w-25" style="max-width:100%;">
                <h2 class="text-center mb-3">Update Book</h2>
                <form @submit.prevent="updateBook">

                    <!-- Title -->
                    <div class="row">
                        <div class="col-md-12 form-group mb-3">
                            <label for="title" class="form-label">Title</label>
                            <input id="title" type="text" name="title" class="form-control" placeholder="Title" required
                                v-model="book.title" />
                        </div>
                    </div>

                    <!-- Author -->
                    <div class="row">
                        <div class="col-md-12 form-group mb-3">
                            <label for="author" class="form-label">Author</label>
                            <input id="author" type="text" name="author" class="form-control" placeholder="Author"
                                required v-model="book.author" />
                        </div>
                    </div>

                    <!-- Genre -->
                    <div class="row">
                        <div class="col-md-12 form-group mb-3">
                            <label for="genre" class="form-label">Genre</label>
                            <select id="genre" v-model="book.genre" class="form-control">
                                <option disabled value="">Please select one</option>
                                <option>action and adventure</option>
                                <option>anthology</option>
                                <option>classic</option>
                                <option>drama</option>
                                <option>fantasy</option>
                                <option>graphic novel</option>
                                <option>historical fiction</option>
                                <option>horror</option>
                                <option>poetry</option>
                                <option>romance</option>
                                <option>mystery</option>
                                <option>science fiction</option>
                                <option>short story</option>
                                <option>thriller</option>
                                <option>western</option>
                                <option>young adult</option>
                                <option>others</option>
                            </select>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="row">
                        <div class="col-md-12 form-group mb-3">
                            <label for="description" class="form-label">Description</label>
                            <input id="description" type="text" name="description" class="form-control"
                                placeholder="Description" required v-model="book.description" />
                        </div>
                    </div>

                    <!-- Published Year -->
                    <div class="row">
                        <div class="col-md-12 form-group mb-3">
                            <label for="publishedYear" class="form-label">Published Year</label>
                            <input id="publishedYear" type="text" name="publishedYear" class="form-control"
                                placeholder="Published Year" required v-model="book.publishedYear" />
                        </div>
                    </div>

                    <!-- Language -->
                    <div class="row">
                        <div class="col-md-12 form-group mb-3">
                            <label for="language" class="form-label">Language</label>
                            <input id="language" type="text" name="language" class="form-control" placeholder="Language"
                                required v-model="book.language" />
                        </div>
                    </div>

                    <!-- Image Upload -->
                    <div class="row">
                        <div class="col-md-12 form-group mb-3">
                            <label for="imageFile" class="form-label">Image</label>
                            <input id="imageFile" type="file" name="imageFile" class="form-control"
                                @change="handleFileUpload" accept="image/*" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 form-group">
                            <input class="btn btn-primary w-100" type="submit" value="Update" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import {ApiUrl} from '../constants.js'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'UpdateBook',
    components: {
        Navbar
    },
    data() {
        return {
            book: {
                id: '',
                title: '',
                author: '',
                genre: '',
                description: '',
                publishedYear: '',
                language: '',
            },
            image: null // Corrected from empty string to null
        };
    },
    created() {
        this.fetchBook();
    },
    methods: {
        fetchBook() {
            const bookId = this.$route.params.id;
            fetch(`${ApiUrl}/api/books/${bookId}`)
                .then(response => response.json())
                .then(data => {
                    this.book = data;
                })
                .catch(error => {
                    console.error('Error fetching book:', error);
                });
        },
        handleFileUpload(event) {
            this.image = event.target.files[0];
        },
        updateBook() {
            const formData = new FormData();

            // Append book data
            for (const key in this.book) {
                formData.append(key, this.book[key]);
            }

            // Append image file if it exists
            if (this.image) {
                formData.append('image', this.image);
            }

            const bookId = this.$route.params.id;

            fetch(`${ApiUrl}/api/books/${bookId}`, {
                method: 'PUT',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.$router.push("/");
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }
};
</script>
