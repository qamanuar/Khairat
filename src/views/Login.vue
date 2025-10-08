<template>
    <div>
        <h1>Login Page</h1>
        
        <form @submit.prevent="login">
            <input 
                type="email"
                v-model="email"
                placeholder="Email"
                required
            />

            <input 
                type="password"
                v-model="password"
                placeholder="Password"
                required
            />

            <button type="submit">Log in</button>
        </form>

        <p v-if="errorMessage" class=""error>{{ errorMessage }}</p>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {supabase} from '../client/supabase'
import {useRouter} from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()

const login = async () =>{
    errorMessage.value = ''

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })

    if (error){
        errorMessage.value = error.errorMessage
    }else{
        console.log("Logged in user:", data.user)
        router.push('/')
    }
}

</script>