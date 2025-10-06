<template>
    <div class="border-1 border-solid border-red-300">
        <h1>This is a protected content</h1>
        <p id = "account"> 
                Account :
                {{ account.data.session.user.email }}
        </p>
        <p>Protext the secret password : **TMX$$</p>
    </div>
</template>

<script setup>

import {supabase} from "../client/supabase";
import {ref} from "vue";

const account = ref();
getSession();

async function getSession(){
        account.value = await supabase.auth.getSession();
}

</script>