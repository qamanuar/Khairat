<template>
  <nav class="bg-emerald-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
    <!-- Logo -->
    <h1 class="text-xl font-bold tracking-wide">Khairat Kematian</h1>

    <!-- Nav Links -->
    <ul class="flex gap-8">
      <li>
        <router-link 
          to="/"
          class="relative pb-1 font-medium transition-colors duration-300 hover:text-emerald-200"
        >
          Home
          <span
            class="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-emerald-200 transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>
      </li>

      <li>
        <router-link 
          to="/payment"
          class="relative pb-1 font-medium transition-colors duration-300 hover:text-emerald-200"
        >
          Payment
          <span
            class="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-emerald-200 transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>
      </li>

      <li>
        <router-link 
          to="/secret"
          class="relative pb-1 font-medium transition-colors duration-300 hover:text-emerald-200"
        >
          Secret
          <span
            class="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-emerald-200 transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
</script>
