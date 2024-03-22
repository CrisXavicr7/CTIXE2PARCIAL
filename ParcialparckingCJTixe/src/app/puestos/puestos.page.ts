import { Component } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puestos',
  templateUrl: 'puestos.page.html',
  styleUrls: ['puestos.page.scss'],
})
export class PuestosPage {
  numPuestos: string = '';

  constructor(
        private accesoService: AccesoService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async confirmarNuevoDia() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Desea empezar un nuevo día?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.agregarPuestos(true); 
          }
        }
      ]
    });

    await alert.present();
  }

  agregarPuestos(nuevoDia: boolean) {
    const numeroPuestos = Number(this.numPuestos);
    if (isNaN(numeroPuestos) || numeroPuestos < 1 || numeroPuestos > 25) {
        this.accesoService.showToast('El número debe estar entre 1 y 25.');
        return;
    }
  
    this.accesoService.insertarPuestos(numeroPuestos, nuevoDia).subscribe(
        response => {
          
            this.accesoService.showToast('Puestos agregados correctamente.');
            this.router.navigateByUrl('/menu');
        },
        error => {
           
            this.accesoService.showToast('Error al agregar puestos: ' + error.error.message);
            console.error(error);
          }
      );
  }
  
  guardar() {
    this.confirmarNuevoDia();
  }
}
