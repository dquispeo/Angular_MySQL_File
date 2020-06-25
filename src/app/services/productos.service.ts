import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  url='http://localhost:3000/productos/'; 
  constructor(private http: HttpClient) { }
  listar() {
    return this.http.get(`${this.url}listar`);
  }
  nuevo(producto) {
    return this.http.post(`${this.url}crear`, producto);    
  }
  eliminar(id) {
    return this.http.delete(`${this.url}eliminar/${id}`);
  }
  mostrar(id) {
    return this.http.get(`${this.url}mostrar/${id}`);
  }
  actualizar(producto) {
    return this.http.put(`${this.url}actualizar`, producto);    
  }
}

