<template>
    <div class="logout-container">
        <p v-if="message" class="alert alert-success">{{ message }}</p>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from '@/services/authService';

export default {
    name: 'Logout',
    setup() {
        const router = useRouter();
        const message = ref('');

        const handleLogout = async () => {
            try {
                await logout();
                // Set success message
                message.value = 'Successfully logged out. Redirecting to login page...';
                // Redirect to login page after a short delay
                setTimeout(() => {
                    router.push('/login');
                }, 2000); // Adjust delay as needed
            } catch (error) {
                console.error('Logout failed', error);
                message.value = 'Logout failed. Please try again.';
            }
        };

        onMounted(() => {
            handleLogout();
        });

        return {
            message
        };
    }
};
</script>

<style scoped>
.logout-container {
    text-align: center;
    margin-top: 20px;
}
.alert-success {
    color: green;
}
</style>
