<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { ProductoInterface } from '../interfaces/ProductoInterface';
import productoService from '../services/producto.service';

const producto_blank: ProductoInterface = {
    nombre: "",
    precio: 0,
    stock: 0,
    categoria_id: 1,
    cod_producto: "",
    descripcion: ""
}

const productos = ref<ProductoInterface[]>([]);
const producto = ref<ProductoInterface>({ ...producto_blank });

onMounted(() => {
    ListarProductos()
})

async function ListarProductos() {
    const res = await productoService.getProductos();
    productos.value = res.data.data;
    console.log(productos.value);
    // productos.value[0];
}

// async function GuardarProducto(datos:ProductoInterface) {
async function GuardarProducto() {

    if (producto.value.id) {
        // modificando
        console.log("Editando...");
        const res = await productoService.modificarProducto(producto.value.id, producto.value);
        console.log(res.data);
    } else {
        console.log("Guardando...");
        const res = await productoService.guardaRProducto(producto.value);
        console.log(res.data);

    }
    producto.value = producto_blank;
    ListarProductos()
    // console.log("Guardando...", datos);

}

async function funEditar(prod: ProductoInterface) {

    producto.value = prod;
}

</script>

<template>
    <div class="min-h-screen bg-gray-100 p-6">

        <!-- TÍTULO -->
        <h1 class="text-3xl font-bold text-gray-800 mb-6">
            Gestión de Productos
        </h1>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <!-- FORMULARIO -->
            <div class="bg-white rounded-2xl shadow-md p-6">

                <h2 class="text-xl font-semibold text-gray-700 mb-4">
                    Registrar Producto
                </h2>

                <!-- <form @submit.prevent="GuardarProducto(producto)" class="space-y-5"> -->
                <form @submit.prevent="GuardarProducto()" class="space-y-5">

                    <!-- NOMBRE -->
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">
                            Nombre
                        </label>
                        <input type="text" v-model="producto.nombre" placeholder="Ingrese el nombre"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <!-- PRECIO -->
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">
                            Precio
                        </label>
                        <input type="number" v-model="producto.precio" placeholder="0.00"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <!-- STOCK -->
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">
                            Stock
                        </label>
                        <input type="number" v-model="producto.stock" placeholder="Cantidad disponible"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <!-- IMAGEN -->
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">
                            Imagen
                        </label>
                        <input type="text" v-model="producto.imagen" placeholder="Imagen"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />

                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">
                            Codigo de Producto
                        </label>
                        <input type="text" v-model="producto.cod_producto" placeholder="Categoria"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />

                    </div>

                    <!-- CATEGORIA -->
                    <!-- <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">
                            Categoría
                        </label>
                        <input type="text" v-model="producto.categoria" placeholder="Categoria"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div> -->

                    <!-- BOTÓN -->
                    <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
                        Guardar Producto
                    </button>

                    <div>{{ producto }}</div>

                </form>
            </div>

            <!-- TABLA -->
            <div class="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">

                <h2 class="text-xl font-semibold text-gray-700 mb-4">
                    Lista de Productos
                </h2>

                <table class="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-100 text-gray-700">
                            <th class="p-2">#</th>
                            <th class="p-2">ID</th>
                            <th class="p-2">Nombre</th>
                            <th class="p-2">Precio</th>
                            <th class="p-2">Stock</th>
                            <th class="p-2">Imagen</th>
                            <th class="p-2">Categoría</th>
                            <th class="p-2">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(prod, pos) in productos" :key="prod.id"
                            class="border-b hover:bg-gray-50 transition">
                            <td class="p-2">{{ pos }}</td>
                            <td class="p-2">{{ prod.id }}</td>
                            <td class="p-2 font-medium">{{ prod.nombre }}</td>
                            <td class="p-2">${{ prod.precio }}</td>
                            <td class="p-2">{{ prod.stock }}</td>
                            <td class="p-2">
                                <img :src="`https://laravue2.blumbit.net/back/public/${prod.imagen}`"
                                    class="w-10 h-10 object-cover rounded" />
                            </td>
                            <td class="p-2">
                                {{ prod.categoria?.nombre }}
                            </td>
                            <td class="p-2">
                                <button @click="funEditar(prod)"
                                    class="text-yellow-500 hover:text-yellow-700 font-medium">
                                    Editar
                                </button>
                                <button class="text-red-500 hover:text-red-700 font-medium">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    </div>
</template>