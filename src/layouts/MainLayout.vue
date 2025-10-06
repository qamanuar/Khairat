<template>
  <div>
    <header class="bg-white shadow sticky top-0 z-50">
      <div class="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        <!-- Logo / Title -->
        <div class="flex items-center gap-2">
          <div class="bg-emerald-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
            K
          </div>
          <h1 class="text-lg font-semibold text-emerald-700">
            Khairat Kematian
          </h1>
        </div>

        <!-- Logout -->
        <button
          @click="logout"
          class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm"
        >
          Log Keluar
        </button>
      </div>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import {supabase} from "../client/supabase.js"

async function logout(){
    const { error } = await supabase.auth.signOut();

    if(error){
      console.log(error)
    }else{
      console.log("logged out")
    }
  }

</script>