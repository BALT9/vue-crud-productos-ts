import api from "./api";
import type {ProductoInterface} from "../interfaces/ProductoInterface";

export default{
    getProductos(buscar : string = ""){
        return api.get("/producto?limit=20&q="+buscar);
    },

    guardaRProducto(datos: ProductoInterface){
        return api.post("/producto", datos);
    },

    mostrarProducto(id:number){
        return api.get("/producto/"+id);
    },
 
    modificarProducto(id:number, datos: ProductoInterface){
        return api.put("/producto/"+id, datos);
    },

    eliminarProducto(id:number){
        return api.delete("/producto/"+id);
    },

}