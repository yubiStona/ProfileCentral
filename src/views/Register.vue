<template>
    <div class="container mt-5">
        <AuthForm :loginForm="false" :buttonText="'Register'" :onSubmit="register" />
    </div>
</template>
<script>
import axios from 'axios';
import AuthForm from '../components/AuthForm.vue';
export default {
    name: 'RegisterPage',
    components: {
        AuthForm,
    },
    methods: {
        async register(form) {
            const res = await axios.get(`http://localhost:3000/users?email=${form.email}`);
            if (res.data.length > 0) {
                alert("user already exists");
                return;
            }
            const newUser = await axios.post('http://localhost:3000/users', form);
            if (newUser.status == 201) {
                this.$router.push('/login');
            }
        }
    }
}
</script>