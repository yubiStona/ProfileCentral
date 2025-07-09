<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-10 col-lg-8">
        <!-- Profile Header -->
        <div class="card shadow mb-4">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 class="mb-0">
              <i class="fas fa-user-circle me-2"></i>
              User Profile
            </h4>
            <button class="btn btn-light btn-sm" @click="toggleEditMode" :disabled="loading">
              <i :class="editMode ? 'fas fa-times' : 'fas fa-edit'"></i>
              {{ editMode ? 'Cancel' : 'Edit' }}
            </button>
          </div>

          <div class="card-body">
            <!-- Loading State -->
            <div v-if="loading" class="text-center py-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-2">Loading profile...</p>
            </div>

            <!-- Profile Content -->
            <div v-else-if="user" class="row">
              <!-- Avatar Section -->
              <div class="col-md-4 text-center mb-4">
                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Profile" />
                <div class="profile-avatar mb-3">
                  <i class="fas fa-user-circle text-primary" style="font-size: 8rem;"></i>
                </div>
                <h5 class="text-primary">{{ user.name }}</h5>
                <p class="text-muted">Member since {{ formatDate(user.createdAt) }}</p>
              </div>

              <!-- Profile Information -->
              <div class="col-md-8">
                <form @submit.prevent="saveProfile" v-if="editMode">
                  <!-- Edit Mode -->
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label fw-bold">Full Name</label>
                      <input type="text" class="form-control" v-model="editForm.name" required>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label fw-bold">Email</label>
                      <input type="email" class="form-control" v-model="editForm.email" required>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label fw-bold">Contact</label>
                      <input type="tel" class="form-control" v-model="editForm.contact" required>
                    </div>
                    <div class="col-12 mb-3">
                      <label class="form-label fw-bold">Address</label>
                      <textarea class="form-control" rows="3" v-model="editForm.address" required></textarea>
                    </div>
                  </div>

                  <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-success" :disabled="saving">
                      <i class="fas fa-save me-1"></i>
                      {{ saving ? 'Saving...' : 'Save Changes' }}
                    </button>
                    <button type="button" class="btn btn-secondary" @click="toggleEditMode">
                      Cancel
                    </button>
                  </div>
                </form>

                <!-- View Mode -->
                <div v-else class="profile-info">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <div class="info-item">
                        <label class="form-label fw-bold text-muted">
                          <i class="fas fa-user me-2"></i>Full Name
                        </label>
                        <p class="info-value">{{ user.name }}</p>
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <div class="info-item">
                        <label class="form-label fw-bold text-muted">
                          <i class="fas fa-envelope me-2"></i>Email
                        </label>
                        <p class="info-value">{{ user.email }}</p>
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <div class="info-item">
                        <label class="form-label fw-bold text-muted">
                          <i class="fas fa-phone me-2"></i>Contact
                        </label>
                        <p class="info-value">{{ user.contact }}</p>
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <div class="info-item">
                        <label class="form-label fw-bold text-muted">
                          <i class="fas fa-id-badge me-2"></i>User ID
                        </label>
                        <p class="info-value">{{ user.id }}</p>
                      </div>
                    </div>
                    <div class="col-12 mb-3">
                      <div class="info-item">
                        <label class="form-label fw-bold text-muted">
                          <i class="fas fa-map-marker-alt me-2"></i>Address
                        </label>
                        <p class="info-value">{{ user.address }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error State -->
            <div v-else class="text-center py-4">
              <i class="fas fa-exclamation-triangle text-warning" style="font-size: 3rem;"></i>
              <h5 class="mt-3">Unable to load profile</h5>
              <p class="text-muted">Please try refreshing the page or contact support.</p>
              <button class="btn btn-primary" @click="loadUserProfile">
                <i class="fas fa-refresh me-1"></i>
                Retry
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card shadow">
          <div class="card-header bg-light">
            <h5 class="mb-0">
              <i class="fas fa-cogs me-2"></i>
              Quick Actions
            </h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <button class="btn btn-outline-primary w-100" @click="changePasswordModal = true">
                  <i class="fas fa-key me-2"></i>
                  Change Password
                </button>
              </div>
              <div class="col-md-6 mb-3">
                <button class="btn btn-outline-info w-100" @click="downloadProfile">
                  <i class="fas fa-download me-2"></i>
                  Download Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <b-modal v-model="changePasswordModal" title="Change Password" hide-footer centered>
    <b-form @submit.prevent="changePassword">
      <b-form-group label="Old Password" label-for="oldPassword">
        <b-form-input id="oldPassword" v-model="oldPassword" type="password" required></b-form-input>
      </b-form-group>

      <b-form-group label="New Password" label-for="newPassword">
        <b-form-input id="newPassword" v-model="newPassword" type="password" required></b-form-input>
      </b-form-group>

      <b-form-group label="Confirm Password" label-for="confirmPassword">
        <b-form-input id="confirmPassword" v-model="confirmPassword" type="password" required></b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-end mt-3">
        <b-button variant="secondary" class="me-2" @click="changePasswordModal = false">
          Cancel
        </b-button>
        <b-button variant="primary" type="submit">
          Save Changes
        </b-button>
      </div>
    </b-form>
  </b-modal> -->

  <!-- Change Password Modal -->
  <div v-if="changePasswordModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <i class="fas fa-key me-2"></i>
            Change Password
          </h5>
          <button type="button" class="btn-close" @click="changePasswordModal = false"></button>
        </div>
        <form @submit.prevent="changePassword">
          <div class="modal-body">
            <div class="mb-3">
              <label for="oldPassword" class="form-label">Old Password</label>
              <input 
                type="password" 
                id="oldPassword"
                class="form-control" 
                v-model="oldPassword"
                required
                placeholder="Enter your current password"
              >
            </div>
            <div class="mb-3">
              <label for="newPassword" class="form-label">New Password</label>
              <input 
                type="password" 
                id="newPassword"
                class="form-control" 
                v-model="newPassword"
                required
                minlength="6"
                placeholder="Enter new password (min 6 characters)"
              >
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword"
                class="form-control" 
                v-model="confirmPassword"
                required
                placeholder="Confirm your new password"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="changePasswordModal = false">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-save me-1"></i>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import { BModal, BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-next'

export default {
  name: 'UserProfile',
  // components: {
  //   BModal,
  //   BButton,
  //   BForm,
  //   BFormGroup,
  //   BFormInput
  // },
  data() {
    return {
      user: null,
      loading: true,
      editMode: false,
      saving: false,
      editForm: {
        name: '',
        email: '',
        contact: '',
        address: ''
      },
      changePasswordModal: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  },

  mounted() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        this.loading = true
        const userData = localStorage.getItem('user')

        if (!userData) {
          this.$router.push('/login')
          return
        }

        const user = JSON.parse(userData)

        // Fetch fresh user data from server
        const response = await axios.get(`http://localhost:3000/users/${user.id}`)
        this.user = response.data

        // Add created date if not exists
        if (!this.user.createdAt) {
          this.user.createdAt = new Date().toISOString()
        }

      } catch (error) {
        console.error('Error loading user profile:', error)
        // Fallback to localStorage data
        const userData = localStorage.getItem('user')
        if (userData) {
          this.user = JSON.parse(userData)
          if (!this.user.createdAt) {
            this.user.createdAt = new Date().toISOString()
          }
        }
      } finally {
        this.loading = false
      }
    },

    toggleEditMode() {
      this.editMode = !this.editMode
      if (this.editMode) {
        // Populate edit form with current user data
        this.editForm = {
          name: this.user.name,
          email: this.user.email,
          contact: this.user.contact,
          address: this.user.address
        }
      }
    },

    async saveProfile() {
      try {
        this.saving = true

        const updatedUser = {
          ...this.user,
          ...this.editForm
        }

        // Update user on server
        await axios.put(`http://localhost:3000/users/${this.user.id}`, updatedUser)

        // Update local storage
        localStorage.setItem('user', JSON.stringify(updatedUser))

        // Update component data
        this.user = updatedUser
        this.editMode = false

        alert('Profile updated successfully!')

      } catch (error) {
        console.error('Error saving profile:', error)
        alert('Failed to update profile. Please try again.')
      } finally {
        this.saving = false
      }
    },

    formatDate(dateString) {
      if (!dateString) return 'Recently'
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },

    async changePassword() {
      // Validate passwords match
      if (this.newPassword !== this.confirmPassword) {
        alert('New passwords do not match');
        return
      }

      // Validate password length
      if (this.newPassword.length < 6) {
        alert('New password must be at least 6 characters long')
        return
      }

      // Check if current password matches
      if (this.oldPassword !== this.user.password) {
        alert('Current password is incorrect')
        return
      }

      try {

        const updatedUser = {
          ...this.user,
          password: this.newPassword
        }

        // Update user on server
        await axios.put(`http://localhost:3000/users/${this.user.id}`, updatedUser)

        // Update local storage
        localStorage.setItem('user', JSON.stringify(updatedUser))

        // Update component data
        this.user = updatedUser

        alert('Password changed successfully!')
        this.changePasswordModal = false;

      } catch (error) {
        console.error('Error changing password:', error)
        alert('Failed to change password. Please try again.')
      } finally {
        this.oldPassword = ''
        this.newPassword = ''
        this.confirmPassword = ''
      }
    },
    downloadProfile() {
      // Create downloadable profile data
      const profileData = {
        name: this.user.name,
        email: this.user.email,
        contact: this.user.contact,
        address: this.user.address,
        id: this.user.id,
        exportDate: new Date().toISOString()
      }

      const dataStr = JSON.stringify(profileData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })

      const link = document.createElement('a')
      link.href = URL.createObjectURL(dataBlob)
      link.download = `profile_${this.user.name.replace(/\s+/g, '_')}.json`
      link.click()
    },
  }
}
</script>

<style scoped>
.profile-avatar {
  transition: transform 0.3s ease;
}

.profile-avatar:hover {
  transform: scale(1.05);
}

.info-item {
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #f8f9fa;
  transition: background-color 0.3s ease;
}

.info-item:hover {
  background-color: #e9ecef;
}

.info-value {
  margin: 0.5rem 0 0 0;
  font-size: 1.1rem;
  color: #495057;
  font-weight: 500;
}

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .profile-avatar i {
    font-size: 5rem !important;
  }

  .col-md-4,
  .col-md-6,
  .col-md-8 {
    margin-bottom: 1rem;
  }
}
</style>