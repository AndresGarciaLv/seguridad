import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/interfaces/user";
import { loginService } from "@/services/userService";


export const useAuthStore = defineStore("auth", () =>{
    const user = ref();
    const token = ref('');

    const login = (email: string, password: string) => {
        user.value = await loginService(email, password)
    }

    const register = (user:User) => {

    }

    return {login, register, user}
})