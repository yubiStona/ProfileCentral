<template>
  <div class="container mt-5">
    <div class="alert alert-danger">
      <h4>Access Denied</h4>
      <p>You don't have permission to access this page. Admin privileges required.</p>
      <router-link to="/profile" class="btn btn-primary">Go to Profile</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnauthorizedPage'
}
</script>