<template>
    <div class="container mt-5">
        <AuthForm :loginForm="true" :formType="'Login'" :buttonText="'Login'" :onSubmit="login" />
        

    </div>
</template>
<script>
import axios from 'axios'
import AuthForm from '../components/AuthForm.vue';
export default {
    name: 'LoginPage',
    components: {
        AuthForm
    },
    methods: {
        async login(form) {
            const result = await axios.get(`http://localhost:3000/users?email=${form.email}`)
            if (result.data.length > 0) {
                if (result.data[0].password !== form.password) {
                    alert('invalid Credentials');
                    return;
                }
                localStorage.setItem('user', JSON.stringify(result.data[0]));
                // Emit event to parent App component
                this.$emit('user-logged-in');
                this.$router.push('/dashboard');
            } else {
                alert('invalid Credentials');
            }
        }
    }
}
</script>