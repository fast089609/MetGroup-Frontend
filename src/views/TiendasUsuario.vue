<template>
  <div class="home">
    <div class="w-100">
      <h1 class="text-3xl">Tiendas</h1>
    </div>
    <div class="w-100 px-10 text-right">
      <button class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" @click="mostrarCrear = !mostrarCrear">
        <font-awesome-icon :icon="['fas', 'square-plus']" size="xl" class="mr-2"/>
        Crear
      </button>
    </div>
    <div
      class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5"
    >
      <table
        class="w-full border-collapse bg-white text-left text-sm text-gray-500"
      >
        <thead class="bg-blue-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-4 font-bold text-gray-900 text-center"
            >
              Nombre
            </th>
            <th
              scope="col"
              class="px-6 py-4 font-bold text-gray-900 text-center"
            >
              Estado
            </th>
            <th
              scope="col"
              class="px-6 py-4 font-bold text-gray-900 text-center"
            >
              Fecha de creacion
            </th>
            <th
              scope="col"
              class="px-6 py-4 font-bold text-gray-900 text-center"
            >
              Opciones
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
          <tr
            class="hover:bg-gray-50"
            v-for="tienda in tiendas"
            :key="tienda.id"
          >
            <td class="px-6 py-4 text-center">
              <h1 class="font-bold text-lg text-blue-500">{{ tienda.name }}</h1>
            </td>
            <td class="px-6 py-4 text-center">
              <span
                class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold"
                :class="
                  tienda.status == true
                    ? 'bg-green-50 text-green-600'
                    : 'bg-red-50 text-red-600'
                "
              >
                <span
                  class="h-1.5 w-1.5 rounded-full"
                  :class="tienda.status == true ? 'bg-green-600' : 'bg-red-600'"
                ></span>
                {{ tienda.status == true ? "Activo" : "Inactivo" }}
              </span>
            </td>
            <td class="px-6 py-4 text-center">
              {{ fechaFormato(tienda.createdAt, "YYYY-MM-DD") }}
            </td>
            <td class="px-6 py-4 text-center">
              <div class="flex justify-center">
                <div class="relative">
                  <font-awesome-icon
                    :icon="['fas', 'pen-to-square']"
                    size="2xl"
                    class="text-blue-300 cursor-pointer tooltip"
                    @click="editarModal(tienda)"
                  />
                  <div
                    class="bg-gray-800 text-white text-sm rounded p-2 absolute top-full left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-200 tooltip-hijo"
                  >
                    Editar
                  </div>
                </div>
                <div class="relative ml-5">
                  <font-awesome-icon
                    :icon="['fas', 'trash']"
                    size="2xl"
                    class="text-red-500 cursor-pointer tooltip"
                    @click="eliminarConfirmacion(tienda.id)"
                  />
                  <div
                    class="bg-gray-800 text-white text-sm rounded p-2 absolute top-full left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-200 tooltip-hijo"
                  >
                    Eliminar
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <EliminarTienda :mostrarEliminar="mostrarEliminar" @verificar-eliminacion="verificarEliminacion"/>
    <EditarTienda :mostrar="mostrarEditar" @confimacion-editar="verificarEdicion" :dataEditar="dataEditar"/>
    <CrearTienda :mostrar="mostrarCrear" @cerrarModalCrear="cerrarModalCrear"/>
  </div>
</template>

<script>
import tiendas from "@/services/tiendas";
import moment from "moment";
import EliminarTienda from './tiendas/EliminarTienda'
import EditarTienda from './tiendas/EditarTienda'
import CrearTienda from './tiendas/CrearTienda'

export default {
  components:{
    EliminarTienda,
    EditarTienda,
    CrearTienda
  },
  created() {
    this.obtenerTabla();
  },
  methods: {
    editarModal(tienda){
      this.mostrarEditar = true;
      this.dataEditar = tienda;
    },
    obtenerTabla(){
      tiendas.obtener().then((respuesta) => {
        this.tiendas = respuesta.data;
      });
    },
    fechaFormato(fecha, formato) {
      fecha = moment(fecha, formato);
      return fecha.format("DD/MM/YYYY h:mm:ss a");
    },
    eliminarConfirmacion(id){
      this.mostrarEliminar = true;
      this.id_eliminacion = id;
    },
    verificarEdicion(tienda){
      if(tienda.modo == 1){
        tiendas.actualizar({body: {name: tienda.name, status: tienda.status}}, this.dataEditar.id).then(respuesta => {
          console.log(respuesta);
          this.obtenerTabla();
        })
      }
      this.mostrarEditar = false;
      this.dataEditar = {};
    }, 
    verificarEliminacion(modo){
      if(modo == 1){
        tiendas.eliminar({}, this.id_eliminacion).then(() => {
          this.obtenerTabla();
        })
      }
      this.mostrarEliminar = false;
      this.id_eliminacion = null;
    },
    cerrarModalCrear(modo){
      this.mostrarCrear = false;
      if(modo == 1){
        this.obtenerTabla();
      }
    }
  },
  data() {
    return {
      tiendas: [],
      mostrarEliminar: false,
      id_eliminacion: null,
      mostrarEditar: false,
      dataEditar: {},
      mostrarCrear: false
    };
  },
};
</script>

<style>
.tooltip:hover + .tooltip-hijo {
  opacity: 1;
  bottom: 100%;
  top: auto;
}
</style>
