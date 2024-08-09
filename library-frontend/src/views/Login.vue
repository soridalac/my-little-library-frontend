<template>
    <main class="page-container">
        <div class="content text-center">
            <!-- Centered Image -->
            <img src="../assets/login.png" alt="LoginImage" class="small-image">
            <div>
                <button @click="loginWithGoogle" class="btn btn-danger w-100 mb-2">Login with Google</button>
            </div>
            <div>
                <button @click="loginWithGithub" class="btn btn-dark w-100">Login with GitHub</button>
            </div>
        </div>
    </main>
</template>

<script>
import { ApiUrl } from '../constants.js';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();

        const loginWithGoogle = () => {
            window.location.href = `${ApiUrl}/oauth2/authorization/google`;
        };

        const loginWithGithub = () => {
            window.location.href = `${ApiUrl}/oauth2/authorization/github`;
        };

        return {
            loginWithGoogle,
            loginWithGithub
        };
    }
};
</script>

<style scoped>
.page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* Full viewport height */
    margin: 0;
}

.content {
    text-align: center;
}

.small-image {
    width: 50vw;
    max-width: 500px;
    height: auto;
    margin-bottom: 20px;
}

.btn-danger, .btn-dark {
    font-family: 'Arial', sans-serif;
    font-size: 16px; /* Adjust size here */
    padding: 10px; /* Adjust padding here */
}

.btn-danger {
    background-color: #774286;
    border: none;
}

.btn-dark {
    background-color: #433939;
    border: none;
}
</style>
