<template>
  <div class="sticky top-0 z-40 shadow-2xl">
    <div
      class="w-full h-20 px-6 bg-gray-100 border-b flex items-center justify-between"
    >
      <!-- left navbar -->
      <div class="flex">
        <!-- mobile hamburger -->
        <div class="inline-block lg:hidden flex items-center mr-4">
          <button
            class="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger"
            @click="toggleSidebar()"
          >
          <font-awesome-icon :icon="['fas', 'bars']" beat-fade />
          </button>
        </div>

        
      </div>

      <!-- right navbar -->
      <div class="flex items-center relative">
        <span class="text-xl mr-2">
            {{nombre_usuario}}
        </span>
        <img
          src="https://assets.stickpng.com/images/585e4bd7cb11b227491c3397.png"
          class="w-12 h-12 rounded-full shadow-lg"
          @click="dropDownOpen = !dropDownOpen"
        />
      </div>
    </div>

    <!-- dropdown menu -->
    <div
      class="absolute bg-gray-100 border border-t-0 shadow-xl text-gray-700 rounded-b-lg w-48 right-0 mr-6"
      :class="dropDownOpen ? '' : 'hidden'"
    >
      <!-- <a href="#" class="block px-4 py-2 hover:bg-gray-200">Tu Cuenta</a> -->
      <a @click="cerrarSesion" class="block px-4 py-2 hover:bg-gray-200 cursor-pointer">Salir</a>
    </div>
    <!-- dropdown menu end -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import router from '@/router';

export default {
  computed: {
    ...mapState(["sideBarOpen"]),
  },
  data() {
    return {
      dropDownOpen: false,
      nombre_usuario: localStorage.getItem("nombre_usuario"),
    };
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch("toggleSidebar");
    },
    cerrarSesion(){
        localStorage.removeItem("nombre_usuario");
        localStorage.removeItem("authToken");
        router.push({name: "login"});
    }
  },
};
</script>
