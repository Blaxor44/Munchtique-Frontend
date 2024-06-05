<script>
import axios from 'axios';

export default {
    name: "MyProfile",
    data() {
        return {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            error: '',
            success: ''
        };
    },
    methods: {
        async updatePassword() {
            if (this.newPassword !== this.confirmPassword) {
                this.error = 'New passwords do not match';
                return;
            }

            try {
                const response = await axios.post('/api/users/updatePassword', {
                    currentPassword: this.currentPassword,
                    newPassword: this.newPassword
                });
                this.success = response.data.message;
                // Clear form fields
                this.currentPassword = '';
                this.newPassword = '';
                this.confirmPassword = '';
            } catch (error) {
                this.error = error.response.data.message;
            }
        }
    }
};
</script>

<template>
    <div>
        <h2>Settings</h2>
        <form @submit.prevent="updatePassword">
            <div class="form-group">
                <label for="currentPassword">Current Password</label>
                <input type="password" v-model="currentPassword" class="form-control" id="currentPassword" required>
            </div>
            <div class="form-group">
                <label for="newPassword">New Password</label>
                <input type="password" v-model="newPassword" class="form-control" id="newPassword" required>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm New Password</label>
                <input type="password" v-model="confirmPassword" class="form-control" id="confirmPassword" required>
            </div>
            <button type="submit" class="btn btn-primary">Update Password</button>
        </form>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>
    </div>
</template>

<style scoped>
.form-group {
    margin-bottom: 20px;
}
</style>
