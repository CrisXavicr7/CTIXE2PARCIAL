import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.page.html',
  styleUrls: ['./salida.page.scss'],
})
export class SalidaPage {
  public placa: string = ''; 

  constructor(
    private accesoService: AccesoService,
    private navCtrl: NavController
  ) {}

  registrarSalida() {
    if (this.placa) {
      this.accesoService.registrarSalida(this.placa).subscribe(
        (respuesta) => {
          if (respuesta.estado) {
            this.accesoService.showToast(respuesta.mensaje);
            this.navCtrl.navigateRoot('/menu'); 
          } else {
            this.accesoService.showToast(respuesta.mensaje);
          }
        },
        (error) => {
          this.accesoService.showToast('Error al registrar la salida: ' + error.message);
        }
      );
    } else {
      this.accesoService.showToast('Por favor, ingresa la placa del vehículo.');
    }
  }
  
}
