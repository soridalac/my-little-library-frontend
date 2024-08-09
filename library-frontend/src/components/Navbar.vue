<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">My Little Library</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="/view">My Books</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/api/books">Add</a>
                    </li>
                </ul>
                <div class="navbar-text mx-3">
                    Welcome, {{ username }}!
                </div>
                <button @click="handleLogout" class="btn btn-danger">Logout</button>
            </div>
        </div>
    </nav>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from '@/services/authService';

export default {
    name: 'Navbar',
    setup() {
        const router = useRouter();
        
        // Retrieve the username from localStorage
        const username = computed(() => localStorage.getItem('username') || 'Guest');

        const handleLogout = async () => {
            try {
                await logout();
                // Clear localStorage after successful logout
                localStorage.removeItem('username');
                localStorage.removeItem('token');
                // Redirect to login page after successful logout
                router.push('/login');
            } catch (error) {
                console.error('Logout failed', error);
            }
        };

        return {
            username,
            handleLogout
        };
    }
};
</script>
