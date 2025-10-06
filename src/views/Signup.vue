<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h1 class="text-2xl font-bold text-emerald-600 text-center">Sign Up</h1>
      <p class="text-gray-500 text-center mb-6">Create your account</p>

      <form class="space-y-4">
        <div>
          <label class="block text-gray-700">Full Name</label>
          <input 
            type="text" 
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            placeholder="John Doe"
            v-model="name"
          />
        </div>

        <div>
          <label class="block text-gray-700">Email</label>
          <input 
            type="email" 
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            placeholder="you@example.com"
            v-model="email"
          />
        </div>

        <div>
          <label class="block text-gray-700">Password</label>
          <input 
            type="password" 
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            placeholder="••••••••"
            v-model="password"
          />
        </div>

        <button 
          type="button"          
          class="w-full py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition"
          @click="createAccount"
          >
          Sign Up
        </button>
      </form>

      <p class="text-center text-gray-600 text-sm mt-6">
        Already have an account?
        <router-link to="/login" class="text-emerald-600 font-semibold hover:underline">
          Log in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
  import {ref} from "vue"
  import {supabase} from "../client/supabase.js"

  let email = ref("");
  let password = ref("");
  let name = ref("");

  async function createAccount(){
    const {data,error} = await supabase.auth.signUp({
      email : email.value,
      password : password.value,
      name : name.value
    }) 
    if(error){
      console.log(error)
    }else{
      console.log(data)
    }
  }
</script>