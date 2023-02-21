<script setup>
import Navbar from '@/components/Navbar/Navbar.vue'
import Footer from '@/components/Navbar/Footer.vue'
</script>

<template>
  <Navbar />
  <div class="min-h-screen">
    <router-view />
  </div>
  <Footer />
</template>

<style></style>

