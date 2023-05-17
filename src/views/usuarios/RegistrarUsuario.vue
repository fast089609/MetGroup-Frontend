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
          @submit.prevent="$router.push({ name: 'dashboard' })"
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
              required=""
            />
          </div>

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
              required=""
            />
          </div>
  
          <div class="relative text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <font-awesome-icon :icon="['fas', 'lock']" shake size="lg" />
            </span>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              placeholder="Password"
            />
          </div>
  
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

  export default {

  };
  </script>
  