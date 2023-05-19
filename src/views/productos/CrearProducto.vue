<template>
  <div
    class="relative z-40"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    v-if="mostrar"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-20 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
        >
          <form class="w-100 mt-4 px-10" @submit.prevent="cerrarModal(1)">
            <div class="text-center">
              <h1 class="text-blue-500 font-bold text-4xl">Crear Producto</h1>
            </div>

            <label for="" class="font-bold text-xl text-blue-400">Nombre</label>
            <div class="relative text-gray-400 mb-5">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <font-awesome-icon :icon="['fas', 'signature']" size="xl" />
              </span>
              <input
                class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                placeholder="Nombre"
                v-model="v$.nombre.$model"
              />
            </div>
            <div v-if="v$.nombre.$error" class="text-red-700">
              {{ v$.nombre.$errors[0].$message }}
            </div>

            <label for="" class="font-bold text-xl text-blue-400">Precio</label>
            <div class="relative text-gray-400 mb-5">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <font-awesome-icon :icon="['fas', 'money-bill']" size="xl" />
              </span>
              <input
                class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                placeholder="Precio"
                type="number"
                v-model="v$.precio.$model"
              />
            </div>
            <div v-if="v$.precio.$error" class="text-red-700">
              {{ v$.precio.$errors[0].$message }}
            </div>

            <label for="" class="font-bold text-xl text-blue-400">Tienda</label>
            <div class="relative text-gray-400 mb-4">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <font-awesome-icon :icon="['fas', 'store']" size="xl" />
              </span>
              <select
                class="border border-gray-300 rounded-lg px-4 py-4 cursor-pointer w-full pl-10"
                v-model="v$.tienda.$model"
                placeholder="Tienda"
              >
                <option
                  :value="tienda_s.id"
                  v-for="(tienda_s) in tiendas_select"
                  :key="tienda_s.id"
                >
                  {{ tienda_s.name }}
                </option>
              </select>
            </div>
            <div v-if="v$.tienda.$error" class="text-red-700">
              {{ v$.tienda.$errors[0].$message }}
            </div>

            <label for="" class="font-bold text-xl text-blue-400">Estado</label>
            <div class="relative text-gray-400">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <font-awesome-icon :icon="['fab', 'hashnode']" size="xl" />
              </span>
              <select
                class="border border-gray-300 rounded-lg px-4 py-4 cursor-pointer w-full pl-10"
                v-model="v$.estado.$model"
              >
                <option
                  :value="index"
                  v-for="(estado, index) in estados"
                  :key="estado"
                >
                  {{ estado }}
                </option>
              </select>
            </div>
            <div v-if="v$.estado.$error" class="text-red-700">
              {{ v$.estado.$errors[0].$message }}
            </div>

          </form>
          <div class="bg-gray-50 px-4 py-3 sm:flex justify-center sm:px-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-green-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto mr-4"
              @click="cerrarModal(1)"
            >
              Guardar
            </button>
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-gray-300 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-400 sm:mt-0 sm:w-auto px-10 ml-4"
              @click="cerrarModal(0)"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, integer  } from '@vuelidate/validators'
import tiendas from "@/services/tiendas";
import productos from "@/services/productos";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  props: ["mostrar"],
  data() {
    return {
      estados: ["Inactivo", "Activo"],
      nombre: "",
      estado: 1,
      precio: 0,
      tienda: null,
      tiendas_select: []
    };
  },
  watch:{
    mostrar(mostrar_nuevo){
      if(mostrar_nuevo){
        this.nombre = "";
        this.estado = 1;
        this.precio = 0;
        this.tienda = null;

        tiendas.obtener().then((resultado) => {
          this.tiendas_select = resultado.data;
        })
      }
    }
  },
  methods: {
    async cerrarModal(modo) {
      if(modo == 0){
        this.$emit("cerrarModalCrear", modo);
        return;
      }
      const formulario_validado = await this.v$.$validate()

      if (!formulario_validado) return

      if(modo == 1){
        productos.crear({body: {name: this.nombre, status: this.status, precio: this.precio, storeId: this.tienda}}).then(() => {
          this.$emit("cerrarModalCrear", modo);
          this.$notify({
              group: "foo",
              title: "Exito",
              text: "Registro creado!"
            }, 2000);
        })
      }
    },
  },
  validations() {
    return {
      nombre: {
        required: helpers.withMessage("El nombre es requerido", required),
      },
      estado: {
        required: helpers.withMessage("El estado es requerida.", required),
        integer: helpers.withMessage("El estado debe ser un entero.", integer),
      },
      precio: {
        required: helpers.withMessage("El precio es requerida.", required),
        integer: helpers.withMessage("El precio debe ser un entero.", integer),
      },
      tienda: {
        required: helpers.withMessage("La tienda es requerida.", required),
        integer: helpers.withMessage("La tienda debe ser un entero.", integer),
      },
    };
  },
};
</script>
