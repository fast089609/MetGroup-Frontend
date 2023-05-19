<template>
  <div class="home">
    <div class="w-100">
      <h1 class="text-3xl">Productos</h1>
    </div>
    <div class="w-100 px-10 text-right">
      <button
        class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
        @click="mostrarCrear = !mostrarCrear"
      >
        <font-awesome-icon
          :icon="['fas', 'square-plus']"
          size="xl"
          class="mr-2"
        />
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
              Precio
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
              Tienda
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
            v-for="producto in productos"
            :key="producto.id"
          >
            <td class="px-6 py-4 text-center">
              <h1 class="font-bold text-lg text-blue-500">{{ producto.name }}</h1>
            </td>
            <td class="px-6 py-4 text-center">
                <h1 class="text-sm">{{ new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(producto.precio) }}</h1>
              </td>
            <td class="px-6 py-4 text-center">
              <span
                class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold"
                :class="
                producto.status == true
                    ? 'bg-green-50 text-green-600'
                    : 'bg-red-50 text-red-600'
                "
              >
                <span
                  class="h-1.5 w-1.5 rounded-full"
                  :class="producto.status == true ? 'bg-green-600' : 'bg-red-600'"
                ></span>
                {{ producto.status == true ? "Activo" : "Inactivo" }}
              </span>
            </td>
            <td class="px-6 py-4 text-center">
                {{ producto.store != null ? (producto.store.name ?? '') : '' }}
              </td>
            <td class="px-6 py-4 text-center">
              {{ fechaFormato(producto.createdAt, "YYYY-MM-DD h:mm:ss a") }}
            </td>
            <td class="px-6 py-4 text-center">
              <div class="flex justify-center">
                <div class="relative">
                  <font-awesome-icon
                    :icon="['fas', 'pen-to-square']"
                    size="2xl"
                    class="text-blue-300 cursor-pointer tooltip"
                    @click="editarModal(producto)"
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
                    @click="eliminarConfirmacion(producto.id)"
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
    <EliminarProducto
      :mostrarEliminar="mostrarEliminar"
      @verificar-eliminacion="verificarEliminacion"
    />
    <EditarProducto
      :mostrar="mostrarEditar"
      @confimacion-editar="verificarEdicion"
      :dataEditar="dataEditar"
    />
    <CrearProducto :mostrar="mostrarCrear" @cerrarModalCrear="cerrarModalCrear" />
  </div>
</template>

<script>
import productos from "@/services/productos";
import moment from "moment";
import EliminarProducto from "./productos/EliminarProducto";
import EditarProducto from "./productos/EditarProducto";
import CrearProducto from "./productos/CrearProducto";

export default {
  components: {
    EliminarProducto,
    EditarProducto,
    CrearProducto,
  },
  created() {
    this.obtenerTabla();
  },
  methods: {
    editarModal(tienda) {
      this.mostrarEditar = true;
      this.dataEditar = tienda;
    },
    obtenerTabla() {
      productos.obtener().then((respuesta) => {
        this.productos = respuesta.data;
      });
    },
    fechaFormato(fecha) {
      fecha = moment(fecha);
      return fecha.format("DD/MM/YYYY h:mm:ss a");
    },
    eliminarConfirmacion(id) {
      this.mostrarEliminar = true;
      this.id_eliminacion = id;
    },
    verificarEdicion(producto) {
      if (producto.modo == 1) {
        productos
          .actualizar(
            { body: { name: producto.name, status: producto.status, precio: producto.precio, storeId: producto.storeId } },
            this.dataEditar.id
          )
          .then(() => {
            this.obtenerTabla();
            this.$notify({
              group: "foo",
              title: "Exito",
              text: "Registro actualizado!"
            }, 2000);
          });
      }
      this.mostrarEditar = false;
      this.dataEditar = {};
    },
    verificarEliminacion(modo) {
      if (modo == 1) {
        productos.eliminar({}, this.id_eliminacion).then(() => {
          this.obtenerTabla();
          this.$notify({
              group: "foo",
              title: "Exito",
              text: "Eliminado con exito!"
            }, 2000);
        });
      }
      this.mostrarEliminar = false;
      this.id_eliminacion = null;
    },
    cerrarModalCrear(modo) {
      this.mostrarCrear = false;
      if (modo == 1) {
        this.obtenerTabla();
      }
    },
  },
  data() {
    return {
      productos: [],
      mostrarEliminar: false,
      id_eliminacion: null,
      mostrarEditar: false,
      dataEditar: {},
      mostrarCrear: false,
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
