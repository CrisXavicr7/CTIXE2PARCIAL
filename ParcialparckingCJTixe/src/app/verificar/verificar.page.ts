import { Component } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-verificar',
  templateUrl: 'verificar.page.html',
  styleUrls: ['verificar.page.scss'],
})
export class VerificarPage {
  public totalLibres: number = 0;
  public totalOcupados: number = 0;
  public error: string = '';

  constructor(private accesoService: AccesoService) { }

  ngOnInit() {
    this.irVerificarPuestos();
  }

  irVerificarPuestos() {
    const body = { accion: 'verificarPuestos' }; 
    this.accesoService.postData(body).subscribe(
      response => {
        
        if(response.success) {
          this.totalLibres = response.totalLibres;
          this.totalOcupados = response.totalOcupados;
        } else {
          this.error = response.message || 'Error al obtener los datos.';
        }
      },
      error => {
        this.error = error.error.message || 'Error en la respuesta del servidor';
        console.error('Error en la petición HTTP', error);
      }
    );
  }
}
