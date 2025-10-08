<template>
    <div>
        <h1>Welcome Home</h1>
        <p>You are logged in as : {{ user?.email }}</p>
        <p>Your name is : {{ user?.id }}</p>
        <button @click="signOut" >Log out</button>
    </div>
</template>

<script setup>

import {ref, onMounted} from 'vue'
import {supabase} from '../client/supabase'
import { useRouter } from 'vue-router';

const user = ref(null)
const router = useRouter()

onMounted(async()=> {
    const { data } = await supabase.auth.getUser() //getUser only send id, aud , email and created_at details
    user.value = data.user
})

const signOut = (async () =>{
    await supabase.auth.signOut()
    router.push('/login')
})
</script>