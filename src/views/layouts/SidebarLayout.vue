<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <div
    class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-gray-100 border-r z-30 shadow-2xl"
    :class="sideBarOpen ? '' : 'hidden'"
    id="main-nav"
  >
    <div class="w-full h-20 border-b flex px-4 items-center mb-8">
        <img src="../../assets/images/met_group.jpeg" alt="" class="w-20 mx-auto">
    </div>

    <div class="mb-4 px-4">
      <p class="pl-4 text-sm font-semibold mb-1">MENUS</p>
      <div
        class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
        :class="ruta_actual == 'tiendas' ? 'bg-gray-200' : ''"
      >
        <font-awesome-icon :icon="['fas', 'store']" :bounce="ruta_actual == 'tiendas'" size="lg" class="mr-3"/>
        <span class="text-gray-700">Tiendas</span>
      </div>
      <div
        class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
        :class="ruta_actual == 'productos' ? 'bg-gray-200' : ''"
      >
        <font-awesome-icon :icon="['fas', 'box']" :bounce="ruta_actual == 'productos'" size="lg" class="mr-3"/>
        <span class="text-gray-700">Productos</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import router from '@/router';

export default {
  computed: {
    ...mapState(["sideBarOpen"]),
  },
  data(){
    return {
        ruta_actual: router.currentRoute.value.name
    }
  }
};
</script>
