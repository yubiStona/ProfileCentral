<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="card shadow">
                    <div class="card-header bg-primary text-white">
                        <h4 class="mb-0">{{ formType }}</h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="handleSubmit">
                            <!-- Name Field -->
                            <div v-if="!loginForm" class="form-group mb-3">
                                <label for="name" class="form-label">Full Name</label>
                                <input type="text" id="name" v-model="form.name" placeholder="Enter your full name"
                                    class="form-control" required>
                            </div>

                            <!-- Contact Field -->
                            <div v-if="!loginForm" class="form-group mb-3">
                                <label for="contact" class="form-label">Contact Number</label>
                                <input type="tel" id="contact" v-model="form.contact"
                                    placeholder="Enter your phone number" class="form-control" required>
                            </div>

                            <!-- Address Field -->
                            <div v-if="!loginForm" class="form-group mb-3">
                                <label for="address" class="form-label">Address</label>
                                <textarea id="address" v-model="form.address" rows="2"
                                    placeholder="Enter your full address" class="form-control" required></textarea>
                            </div>

                            <!-- Email Field -->
                            <div class="form-group mb-3">
                                <label for="email" class="form-label">Email Address</label>
                                <input type="email" id="email" v-model="form.email" placeholder="Enter your email"
                                    class="form-control" :readonly="editMode" required>
                            </div>

                            <!-- Password Field -->
                            <div v-if="!editMode" class="form-group mb-4">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" id="password" v-model="form.password"
                                    placeholder="Create a password" class="form-control" required>
                                <small v-if="!loginForm" class="form-text text-muted">Use 8 or more characters with a
                                    mix of letters, numbers & symbols</small>
                            </div>

                            <!-- Submit Button -->
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary btn-lg">
                                    {{ buttonText }}
                                </button>
                            </div>
                        </form>
                        <div  v-if="!editMode" >
                            <p v-if="!loginForm" class="mt-3">Already have an account? <router-link
                                to="/login">Login</router-link></p>
                            <p v-if="loginForm" class="mt-3">Don't have an account?<router-link
                                to="/register">register</router-link></p>
                        </div>            
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AuthForm',
    props: {
        buttonText: {
            type: String,
        },
        onSubmit: {
            type: Function,
            required: true
        },
        formType: {
            type: String,
            default: 'Registration form'
        },
        loginForm: {
            type: Boolean,
            default: false
        },
        editMode:{
            type:Boolean,
            default:false
        },
        userData:{
            type:Object,
            default: ()=>({})
        }

    },
    data() {
        return {
            form: {
                name:this.userData.name || '',
                contact:this.userData.contact || '',
                address: this.userData.address || '',
                email: this.userData.email || '',
                password: this.userData.password || '',
                role: 'user',
                createdAt: new Date().toISOString()

            }
        }
    },
    watch: {
        userData: {
            handler(newUserData) {
                if (newUserData && Object.keys(newUserData).length > 0) {
                    this.form = {
                        name: newUserData.name || '',
                        contact: newUserData.contact || '',
                        address: newUserData.address || '',
                        email: newUserData.email || '',
                        password: newUserData.password || '',
                        role: newUserData.role || 'user',
                        createdAt: newUserData.createdAt || new Date().toISOString()
                    };
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        handleSubmit() {
            if(this.editMode && this.userData.id){
                this.form.id= this.userData.id;
            }
            this.onSubmit(this.form);
        }
    }
}
</script>