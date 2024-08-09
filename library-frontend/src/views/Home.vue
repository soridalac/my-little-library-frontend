<template>
    <main>
        <Navbar />
        <a href="/view">

            <body scroll="no" style="overflow-x: hidden; width: 100%; ">
                <div class="product-container d-flex justify-content-start align-items-center">
                    <div class="product-image"
                        style="background-image: url('../assets/booklogo.png'); background-size: cover; ">
                        <img src="../assets/booklogo.png" alt="homepage logo"
                            style=" width: 100vw; height: 100vh; margin-bottom: auto; ">
                    </div>
                </div>
            </body>
        </a>

    </main>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'addBook',
    components: {
        Navbar
    },

};
</script>