<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div class="max-w-xl w-full shadow-lg px-16">
        <img
          src="./../../assets/images/met_group.jpeg"
          alt=""
          class="w-40 mx-auto"
        />
        <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">
          Registrate
        </h2>
  
        <form
          class="space-y-4"
          @submit.prevent="registrarse"
        >
        <div class="relative text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <font-awesome-icon :icon="['fas', 'user']" bounce size="lg" />
            </span>
            <input
              id="name"
              name="name"
              type="name"
              autocomplete="name"
              class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              placeholder="Nombre"
              v-model="v$.nombre.$model"
            />
          </div>
          <div v-if="v$.nombre.$error" class="text-red-700">{{v$.nombre.$errors[0].$message }}</div>'

          <div class="relative text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <font-awesome-icon :icon="['fas', 'envelope']" fade size="lg"/>
            </span>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              placeholder="Email address"
              v-model="v$.correo.$model"
            />
          </div>
          <div v-if="v$.correo.$error" class="text-red-700">{{v$.correo.$errors[0].$message }}</div>
  
          <div class="relative text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <font-awesome-icon :icon="['fas', 'lock']" shake size="lg" />
            </span>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              placeholder="Password"
              v-model="v$.contrasena.$model"
            />
          </div>
          <div v-if="v$.contrasena.$error" class="text-red-700">{{v$.contrasena.$errors[0].$message }}</div>
  
          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-4 px-6 border border-transparent font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Registrate
            </button>
          </div>
        </form>
  
        <div class="mt-2 text-sm text-gray-600">
          Tienes una cuenta?
          <router-link :to="{ name: 'login'}" :class="'font-medium text-green-600 hover:text-green-500'">Ingresa</router-link>
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
    async registrarse(){
      const formulario_validado = await this.v$.$validate()
      
      if (!formulario_validado) return

      usuario.registrar(
        {
          body: {
            name: this.nombre, 
            email: this.correo, 
            password: this.contrasena
          }
        }).then(data => {
        if(data.status != undefined && data.status == "error") {
          this.error = data.message;
        }
        //sale todo bien
        router.push({name: "login"});
      }).catch(error => {
        console.log(error);
      });
    }
  },

    data() {
      return {
        correo: "",
        nombre: "",
        contrasena: "",
        error: null
      };
    },

    validations (){
      return {
        nombre: {
          required: helpers.withMessage('El nombre es requerido', required),
          minLength: helpers.withMessage('La contraseña debe de tener minimo 3 caracteres.', minLength(3))
        },
        correo: {
          required: helpers.withMessage('El correo es requerido', required),
          email: helpers.withMessage('El correo debe ser un email valido', email)
        },
        contrasena: {
          required: helpers.withMessage('La contraseña es requerida.', required),
          minLength: helpers.withMessage('La contraseña debe de tener minimo 8 caracteres.', minLength(8))
        }
      }
    }
  };
  </script>
  