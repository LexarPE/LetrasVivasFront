import axios from "axios";
import { axiosInstance, axiosInstanceToken } from "../api/axiosInstance";


export async function cargarCategorias(){
  try {
    const res = await axiosInstance.get(`categorias/listar`);
    return res.data.categorias;
  } catch (error) {
    console.log("Ocurrio un error al cargar categorias",error)
  }
}