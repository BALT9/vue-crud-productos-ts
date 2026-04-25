export interface CategoriaInterface {
    id: number,
    nombre: string,
    detalle: string
}


export interface ProductoInterface {
    id?: number,
    nombre: string,
    cod_producto: string,
    precio: number,
    stock: number,
    imagen?: string,
    descripcion?: string,
    categoria_id: number,
    categoria?: CategoriaInterface
}