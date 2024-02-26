import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

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
  nombre = '';
  descripcion = '';
  precio = 0;
  stock = 0;
  codigo = 0;
  productos: any;
  constructor() {
    this.productos = [];
  }

  altas() {
    this.opcion = 'Altas';
  }

  bajas(){
    this.opcion = 'Bajas';
  }

  agregarProducto(): void {
    // Preguntar al cliente si el código es necesario o no; aleatorio o manual
    const producto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
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
    this.precio = 0;
    this.stock = 0;
  }

  mostrarProductos() {
    this.opcion = 'Productos';
    const productosGuardados = localStorage.getItem('productos');
    this.productos = productosGuardados ? JSON.parse(productosGuardados) : [];
  }
  
}
