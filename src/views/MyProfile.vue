<template>
    <div class="user-info-container">
        <!-- User Details Section -->
        <div class="user-header">
            <div class="user-details">
                <h2>{{ user?.fullName }}</h2> <!-- Optional chaining -->
                <p>{{ user?.username }}</p>
                <p>{{ user?.email }}</p>
                <p>{{ user?.phone }}</p>
                <button @click="isEditing = !isEditing" class="edit-button">
                    {{ isEditing ? 'Cancel' : 'Edit Details' }}
                </button>
            </div>
        </div>

        <!-- Edit Form -->
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

        <!-- User Tabs -->
        <div class="user-tabs">
            <button :class="{ active: activeTab === 'basic' }" @click="setActiveTab('basic')">
                Basic Info
            </button>
        </div>

        <!-- User Content -->
        <div class="user-content">
            <div v-if="activeTab === 'basic' && !loading">
                <h3>Basic Info</h3>
                <p><strong>Full Name:</strong> {{ user?.fullName }}</p>
                <p><strong>Username:</strong> {{ user?.username }}</p>
                <p><strong>Email:</strong> {{ user?.email }}</p>
                <p><strong>Phone:</strong> {{ user?.phone }}</p>
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
            loading: false,
        };
    },
    methods: {
        async fetchUser() {
            this.loading = true;
            try {
                const response = await fetch('https://api.render.com/deploy/srv-crkk5jg8fa8c738fk830?key=5I3Xm2Y_L20/api/user', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error fetching user: ${response.statusText}`);
                }

                const data = await response.json();
                this.user = data; // Assign fetched user data
                this.editUser = { ...this.user }; // Prepare data for editing
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert('An error occurred while fetching user data.');
            } finally {
                this.loading = false;
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
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token
                    },
                    body: JSON.stringify(updatedUser),
                });

                if (!response.ok) {
                    throw new Error(`Error updating user: ${response.statusText}`);
                }

                const data = await response.json();
                this.user = data.user; // Update user data with the latest user info
                this.editUser = { ...this.user }; // Sync editUser with the updated user
                this.isEditing = false; // Exit edit mode
            } catch (error) {
                console.error('Error updating user data:', error);
                alert('An error occurred while updating user data.');
            }
        },

        setActiveTab(tab) {
            this.activeTab = tab;

            if (tab === 'history') {
                this.fetchPurchaseHistory();
            } else if (tab === 'basic') {
                this.fetchUser();
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