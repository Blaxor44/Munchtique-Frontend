<template>
    <div class="user-info-container">
        <div class="user-header">
            <div class="user-details">
                <h2>{{ user?.fullName }}</h2> <!-- Optional chaining here -->
                <p>{{ user?.username }}</p> <!-- Optional chaining here -->
                <p>{{ user?.email }}</p> <!-- Optional chaining here -->
                <p>{{ user?.phone }}</p> <!-- Optional chaining here -->
                <button @click="isEditing = !isEditing" class="edit-button">
                    {{ isEditing ? 'Cancel' : 'Edit Details' }}
                </button>
            </div>
        </div>
        <div v-if="isEditing" class="edit-form">
            <form @submit.prevent="updateUser">
                <label for="name">Full Name:</label>
                <input type="text" v-model="editUser.fullName" id="name">
                <label for="username">Username:</label>
                <input type="text" v-model="editUser.username" id="username">
                <label for="email">Email:</label>
                <input type="email" v-model="editUser.email" id="email">
                <label for="phone">Phone:</label>
                <input type="text" v-model="editUser.phone" id="phone">
                <button type="submit" class="save-button">Save</button>
            </form>
        </div>
        <div class="user-tabs">
            <button :class="{ active: activeTab === 'basic' }" @click="activeTab = 'basic'; fetchUser()">
                Basic Info
            </button>
            <button :class="{ active: activeTab === 'history' }" @click="activeTab = 'history'; fetchPurchaseHistory()">
                Purchase History
            </button>
        </div>
        <div class="user-content">
            <div v-if="activeTab === 'basic'">
                <h3>Basic Info</h3>
                <p><strong>Full Name:</strong> {{ user?.fullName }}</p> <!-- Optional chaining here -->
                <p><strong>Username:</strong> {{ user?.username }}</p> <!-- Optional chaining here -->
                <p><strong>Email Addr.:</strong> {{ user?.email }}</p> <!-- Optional chaining here -->
                <p><strong>Phone:</strong> {{ user?.phone }}</p> <!-- Optional chaining here -->
            </div>
            <div v-if="activeTab === 'history'">
                <h3>Purchase History</h3>
                <ul v-if="purchaseHistory.length > 0">
                    <li v-for="(item, index) in purchaseHistory" :key="index">
                        <p><strong>Order ID:</strong> {{ item?._id }}</p> <!-- Optional chaining here -->
                        <p><strong>Date:</strong> {{ item?.timestamp }}</p> <!-- Optional chaining here -->
                        <p><strong>Total:</strong> ${{ item?.totalPrice }}</p> <!-- Optional chaining here -->
                    </li>
                </ul>
                <p v-else>No purchase history available.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: null, // Initialize as null or with default values
            editUser: {
                fullName: '',
                username: '',
                email: '',
                phone: '',
            },
            purchaseHistory: [],
            isEditing: false,
            activeTab: 'basic',
        };
    },
    methods: {
        async fetchUser() {
            try {
                const response = await fetch('http://localhost:5000/api/user', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add if needed
                    },
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok - ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                this.user = data; // Assign fetched user data

                // Optional: Initialize editUser for editing purposes
                this.editUser = { ...this.user };

            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error appropriately, e.g., show a user-friendly message
            }
        },

        async fetchPurchaseHistory() {
            try {
                const response = await fetch('http://localhost:5000/api/purchase-history', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add if needed
                    },
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok - ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                this.purchaseHistory = data; // Assign fetched purchase history

            } catch (error) {
                console.error('Error fetching purchase history:', error);
                // Handle error appropriately, e.g., show a user-friendly message
            }
        },

        async updateUser() {
            const updatedUser = {
                fullName: this.editUser.fullName,
                username: this.editUser.username,
                email: this.editUser.email,
                phone: this.editUser.phone,
            };

            try {
                const response = await fetch('http://localhost:5000/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUser),
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok - ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                this.user = data.user; // Update user data with the updated user object
                this.isEditing = false; // Exit edit mode

            } catch (error) {
                console.error('Error updating user data:', error);
                // Handle error appropriately, e.g., show a user-friendly message
            }
        }
    },

    mounted() {
        this.fetchUser(); // Fetch initial user data on component mount
    },
};
</script>

<style scoped>
.user-info-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-header {
    display: flex;
    align-items: center;
}

.user-details {
    flex: 1;
}

.user-details h2 {
    margin: 0;
    font-size: 24px;
}

.user-details p {
    margin: 5px 0;
    color: #555;
}

.edit-button {
    background-color: #ffc107;
    color: #fff;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
}

.user-tabs {
    display: flex;
    margin-top: 20px;
    border-bottom: 1px solid #ddd;
}

.user-tabs button {
    flex: 1;
    background-color: transparent;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    border-bottom: 2px solid transparent;
}

.user-tabs button.active {
    border-bottom: 2px solid #007bff;
    color: #007bff;
}

.user-content {
    padding: 20px;
}

.user-content h3 {
    margin-top: 0;
}

.user-content p {
    margin: 10px 0;
}

.user-content ul {
    list-style: none;
    padding: 0;
}

.user-content ul li {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.edit-form {
    margin-top: 20px;
}

.edit-form label {
    display: block;
    margin-bottom: 5px;
    color: #555;
}

.edit-form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.save-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
}
</style>