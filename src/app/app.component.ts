import { Component, OnInit } from '@angular/core';
import { ProductosService } from './services/productos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular y NodeJS';
  lista=null;
  prod: any = {
    id:null,
    nombre:null,
    marca:null,
    precio:null,
    cantidad:null,
    archivo:null,
    ruta:null
  }

  uploadFile: Array<File>;
  constructor(private productosServicio: ProductosService) {}

  ngOnInit() {
    this.recuperarTodos();
  }

  fileChange(e) {
    console.log('fileChange: ', e);
    this.uploadFile =e.target.files;
  }

  recuperarTodos() {
    this.productosServicio.listar().subscribe(result => {
      this.lista = result;
    });
  }

  nuevo() {
    this.productosServicio.nuevo(this.prod).subscribe(result => {
      if (result=='ok') {
        console.log("Subir imágen");
        let formData = new FormData();
        for (let i=0;i<this.uploadFile.length;i++){
          formData.append("Imagenes[]" , this.uploadFile[i], this.uploadFile[i].name);
        }
        this.limpiar();
        this.recuperarTodos();
      }
    });
  }

  eliminar(id) {
  	if(!confirm("Esta seguro que desea eliminar este registro?"))
  		return;
    this.productosServicio.eliminar(id).subscribe(result => {
      if (result=='ok') {
        this.recuperarTodos();
      }
    });
  }

  actualizar() {
    this.productosServicio.actualizar(this.prod).subscribe(result => {
      //if (result.nModified=='1') {
        this.limpiar();
        this.recuperarTodos();
      //}
    });    
  }
  
  mostrar(id: any) {
    this.productosServicio.mostrar(id).subscribe(result => {
      this.prod = result
    });
  }

  hayRegistros() {
    return true;
  }
  limpiar(){
    this.prod = { 
      id:null, 
      nombre:null, 
      precio:null,
      marca:null, 
      cantidad:null,
      archivo:null,
      ruta:null
    };
  }
}
