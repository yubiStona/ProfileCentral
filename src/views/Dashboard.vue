<template>
    <div class="container mt-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Welcome to the Dashboard</h2>
            <!-- <button class="btn btn-danger" @click="logout">
                <i class="bi bi-box-arrow-right"></i> Logout
            </button> -->
        </div>

        <div class="card shadow-sm">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.contact }}</td>
                                <td>{{ user.address }}</td>
                                <td>{{ user.email }}</td>
                                <td>
                                    <button class="btn btn-sm btn-warning me-2" @click="editUser(user.id)">
                                        <i class="bi bi-pencil">edit</i>
                                    </button>
                                    <button class="btn btn-sm btn-danger" @click="deleteUser(user.id)">
                                        <i class="bi bi-trash">delete</i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "DashboardPage",
    data() {
        return {
            users: []
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('user');
            this.$router.push('/login');
        },
        editUser(userId) {
            this.$router.push(`/edit-user/${userId}`);
        },
        async deleteUser(userId){
            if(confirm('Are you sure you want to delete this user?')){
                try{
                    const response = await axios.delete(`http://localhost:3000/users/${userId}`);
                    if(response.status==200){
                        alert('User deleted Successfully!');
                        this.fetchUsers();
                    }
                }catch(error){
                    console.error('Error deleting user:', error);
                    alert('Error deleting user');
                }
            }
        },
        async fetchUsers() {
            try {
                const response = await axios.get('http://localhost:3000/users');
                if (response.data.length > 0) {
                    this.users = response.data;
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
    },
    mounted() {
        this.fetchUsers();
    }
};
</script>