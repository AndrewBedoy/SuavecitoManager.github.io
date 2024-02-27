import { CommonModule } from '@angular/common';
import { Component, NgModule, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'suavecitomanager';
  opcion = 'Altas';
  opcionTemporal = '';
  nombre = '';
  descripcion = '';
  categoria = '';
  precio = 0;
  stock = 0;
  codigo = 0;
  productos: any;
  terminoBusqueda = '';
  productosFiltrados: any[] = [];
  notyf = new Notyf();
  constructor() {
    this.productos = [];
    this.opcion = 'Productos';
    const productosGuardados = localStorage.getItem('productos');
    this.productos = productosGuardados ? JSON.parse(productosGuardados) : [];
  }
  
  actualizarFiltrados(): void {
    if(this.opcion !== "Buscar")
      this.opcionTemporal = this.opcion;
    else
      this.opcion = this.opcionTemporal;
    
    if(this.terminoBusqueda === '') {
      this.productosFiltrados = [];
      this.opcion = this.opcionTemporal;
    } else {
      this.opcion = "Buscar";
      // Filtrar por nombre
      const productosFiltradosPorNombre = this.productos.filter((producto: { nombre: string; }) =>
      producto.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );

      // Filtrar por categoría
      const productosFiltradosPorCategoria = this.productos.filter((producto: { categoria: string; }) =>
      producto.categoria.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );

      // Combinar los resultados y eliminar duplicados
      this.productosFiltrados = Array.from(new Set([...productosFiltradosPorNombre, ...productosFiltradosPorCategoria]));
    }
  }
  

  altas() {
    this.opcion = 'Altas';
  }

  bajas(){
    this.opcion = 'Bajas';
  }

  cambios(){
    this.opcion = 'Cambios';
  }

  eliminar(producto: any){
    this.notyf.success('Producto <i>' + producto.nombre + '</i> eliminado');
    this.productos = this.productos.filter((p: any) => p.codigo !== producto.codigo);
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  modificar(producto: any){
    this.opcion = 'Modificar';
    this.productoSeleccionado = producto;
    this.nombre = producto.nombre;
    this.descripcion = producto.descripcion;
    this.categoria = producto.categoria;
    this.precio = producto.precio;
    this.stock = producto.stock;
  }

  productoSeleccionado: any;

  agregarProducto(): void {
    // Preguntar al cliente si el código es necesario o no; aleatorio o manual
    const producto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      categoria: this.categoria,
      precio: this.precio,
      stock: this.stock,
      codigo: Math.floor(Math.random() * 90000) + 10000
    };

    // Agregar el producto a los productos y guardarlo en el local storage
    let productos = JSON.parse(localStorage.getItem('productos') as string) || [];
    productos.push(producto); 
    localStorage.setItem('productos', JSON.stringify(productos));

    this.nombre = '';
    this.descripcion = '';
    this.categoria = '';
    this.precio = 0;
    this.stock = 0;
    this.actualizarProductos();
    this.notyf.success('Producto agregado');
  }

  modificarProducto() {
    this.productoSeleccionado.nombre = this.nombre;
    this.productoSeleccionado.descripcion = this.descripcion;
    this.productoSeleccionado.categoria = this.categoria;
    this.productoSeleccionado.precio = this.precio;
    this.productoSeleccionado.stock = this.stock;
  
    // Guarda los productos actualizados en el almacenamiento local
    localStorage.setItem('productos', JSON.stringify(this.productos));
  
    this.notyf.success('Producto <i>' + this.nombre + '</i> modificado');

    this.nombre = '';
    this.descripcion = '';
    this.categoria = '';
    this.precio = 0;
    this.stock = 0;
    this.productoSeleccionado = null;
    this.opcion = 'Productos';
  }
  
  mostrarProductos() {
    this.opcion = 'Productos';
    this.actualizarProductos();
  }
  
  actualizarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    this.productos = productosGuardados ? JSON.parse(productosGuardados) : [];
  }
  
}
