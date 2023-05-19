<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-xl w-full shadow-lg px-16">
      <img
        src="./../../assets/images/met_group.jpeg"
        alt=""
        class="w-50 mx-auto"
      />
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">
        Ingresa Al Sistema
      </h2>
      <h1 class="text-red-600" v-if="error">
        <b>{{error }}</b>
      </h1>
      <form
        class="space-y-4"
        @submit.prevent="loguearse"
      >
        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <font-awesome-icon :icon="['fas', 'user']" bounce size="lg" />
          </span>
          <input
            id="email"
            name="email"
            type="email"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Correo"
            v-model="v$.usuario.$model"
          />
        </div>
        <div v-if="v$.usuario.$error" class="text-red-700">{{v$.usuario.$errors[0].$message }}</div>

        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <font-awesome-icon :icon="['fas', 'lock']" shake size="lg" />
          </span>
          <input
            id="password"
            name="password"
            type="password"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Contraseña"
            v-model="v$.contrasena.$model"
          />
        </div>
        <div v-if="v$.contrasena.$error" class="text-red-700">{{v$.contrasena.$errors[0].$message }}</div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-4 px-6 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Entrar
          </button>
        </div>
      </form>

      <div class="mt-2 text-sm text-gray-600">
        No estas registrado?
        <router-link
          :to="{ name: 'registrar' }"
          :class="'font-medium text-indigo-600 hover:text-indigo-500'"
        >
          Crea Una Cuenta
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, minLength  } from '@vuelidate/validators'
import usuario from '../../services/usuarios';
import router from '@/router';

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  methods: {
    async loguearse(){
      const formulario_validado = await this.v$.$validate()
      
      if (!formulario_validado) return

      usuario.login({body: {email: this.usuario, password: this.contrasena}}).then(data => {
        if(data.status != undefined && data.status == "error") {
          this.error = data.message;
        }else{
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("nombre_usuario", data.data.name);
          router.push({name: "tiendas"});
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  data() {
    return {
      usuario: "",
      contrasena: "",
      error: null
    };
  },
  validations (){
    return {
      usuario: {
        required: helpers.withMessage('El usuario es requerido', required),
        email: helpers.withMessage('El usuario debe ser un email valido', email)
      },
      contrasena: {
        required: helpers.withMessage('La contraseña es requerida.', required),
        minLength: helpers.withMessage('La contraseña debe de tener minimo 8 caracteres.', minLength(8))
      }
    }
  }
};
</script>
