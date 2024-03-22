import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';


interface Puesto {
  id_puesto: number;
  estado: string; // 'libre' o 'ocupado'
}

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  public placa: string = '';

  constructor(
    private accesoService: AccesoService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    
  }

  volverAlMenu() {
    this.navCtrl.navigateRoot('/menu');
  }

  registrarVehiculo() {
    if (this.placa) {
      this.accesoService.registrarVehiculo(this.placa).subscribe(
        (respuesta) => {
          if (respuesta.estado_registro) {
            this.accesoService.showToast(respuesta.mensaje);
            this.navCtrl.navigateRoot('/menu'); 
          } else {
            this.accesoService.showToast(respuesta.mensaje);
          }
        },
        (error) => {
          this.accesoService.showToast('Error al registrar el vehículo: ' + error.message);
        }
      );
    } else {
      this.accesoService.showToast('Por favor, ingrese la placa del vehículo.');
    }
  }
}

