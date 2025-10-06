<template>
  <div id="toastBox" class="fixed top-5 right-5 z-50 space-y-2"></div>  <!-- ✅ Add toast container -->

  <div class="min-h-screen flex items-center justify-center bg-gray-100">


    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h1 class="text-2xl font-bold text-emerald-600 text-center">Login</h1>
      <p class="text-gray-500 text-center mb-6">Welcome back! Please log in.</p>

      <!-- <form class="space-y-4"> -->
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
            id = "password"
            v-model="password"
          />
        </div>

        <router-link 
          to="/forgot-password"
          class="text-sm text-emerald-600 hover:underline float-right"
        >
          Forgot Password?
        </router-link>

        <button 
          type="button"
          class="w-full py-2 bg-emerald-600 cursor-pointer active:scale-95 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition"
          @click ="login"
        >
          Login
        </button>
      <!-- </form> -->
     
      <p class="text-center text-gray-600 text-sm mt-6">
        Don’t have an account?
        <router-link to="/signup" class="text-emerald-600 font-semibold hover:underline">
          Sign up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import {supabase} from "../client/supabase.js"
  import {useRouter} from "vue-router"

  //connect input
  let email = ref ("");
  let password = ref ("");


  const router = useRouter()

  //forgot password
  function forgotPassword(){
    console.log("forgot password")
  }

  function showToast(message = "⚠️ Please fill in both fields") {
  const toastBox = document.getElementById('toastBox');
  const toast = document.createElement('div');
  toast.classList.add('bg-red-500', 'text-white', 'px-4', 'py-2', 'rounded', 'shadow');
  toast.innerHTML = message;
  toastBox.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

  //login
  async function login(){
    
    if(!email.value.trim() || !password.value.trim()){
      showToast();
      return
    }

    const {data, error} = await supabase.auth.signInWithPassword({
      email : email.value,
      password : password.value
    })
    if(error){
      console.log(error)
    }else{
      router.push("/")
    }
  }

   //seeCurrentUser
  async function seeCurrentUser(){
    const localUser = await supabase.auth.getSession();
    console.log(localUser)
  }

  //logout
 
</script>