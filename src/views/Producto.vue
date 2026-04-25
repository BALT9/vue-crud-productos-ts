<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { ProductoInterface } from '../interfaces/ProductoInterface';
import productoService from '../services/producto.service';

    const productos = ref<ProductoInterface[]>([]);

    onMounted(()=>{
        ListarProductos()
    })

    async function ListarProductos(){
        const res = await productoService.getProductos();
        productos.value = res.data.data;
        console.log(productos);
        // productos.value[0];
    }

</script>

<template>
    <h1>Gestion de Productos</h1>
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>PRECIO</th>
                <th>STOCK</th>
                <th>IMAGEN</th>
                <th>CATEGORIA</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="prod in productos">
                <td>{{ prod.id }}</td>
                <td>{{ prod.nombre }}</td>
                <td>{{ prod.precio }}</td>
                <td>{{ prod.stock }}</td>
                <td><img :src="`https://laravue2.blumbit.net/back/public/${prod.imagen}`" alt="" width="50px" height="50px" ></td>
                <td>{{ prod.categoria.nombre }}</td>
                <td></td>
            </tr>
        </tbody>
    </table>
    <pre>{{ JSON.stringify(productos, null, 2) }}</pre>
</template> 