<template>
    <div>Redirecting...</div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ApiUrl } from '../constants.js';

export default {
    setup() {
        const router = useRouter();

        const handleLoginSuccess = async (token) => {
            localStorage.setItem('token', token);
            try {
                const response = await axios.get(`${ApiUrl}/users/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('email', response.data.email);
                // Redirect to frontend homepage
                router.push('/view');
            } catch (error) {
                console.error('Failed to fetch user information', error);
                router.push('/login');
            }
        };

        onMounted(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('code');
            if (token) {
                handleLoginSuccess(token);
            } else {
                router.push('/login');
            }
        });
    }
};
</script>
