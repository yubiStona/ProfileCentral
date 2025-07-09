<template>
    <div class="container mt-5">
        <AuthForm :editMode="true" :formType="'Edit User Info'" :button-text="'Update User'" :userData="user"
            :onSubmit="updateUser" />
    </div>
</template>
<script>
import axios from 'axios'
import AuthForm from '@/components/AuthForm.vue';
export default {
    name: 'EditUserPage',
    components: {
        AuthForm
    },
    data() {
        return {
            user: {}
        }
    },
    async mounted() {
        this.fetchUser();
    },
    methods: {
        async fetchUser() {
            try {
                const userId = this.$route.params.id;
                const response = await axios.get(`http://localhost:3000/users/${userId}`);
                this.user = response.data;
            } catch (error) {
                alert('Error loading data');
            }
        },
        async updateUser(formData) {
            try {
                const userId = this.$route.params.id;
                if (formData.password === '') {
                    delete formData.password; // Remove password if empty
                }

                const response = await axios.put(`http://localhost:3000/users/${userId}`, formData);
                if (response.status === 200) {
                    alert('user updates successfully!');
                    this.$router.push('/dashboard');
                }
            } catch (error) {
                console.error('Error updating user:', error);
                alert('Error updating user');
            }
        }
    }
}

</script>