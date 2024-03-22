import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-actualizar-clave-modal',
  templateUrl: 'actualizar-clave-modal.component.html',
  styleUrls: ['actualizar-clave-modal.component.scss'],
})
export class ActualizarClaveModalComponent {
  cedula: string = '';
  nuevaClave: string = '';
  confirmarClave: string = '';
  usuarioVerificado: boolean = false;

  constructor(
    private accesoService: AccesoService,
    private modalController: ModalController
  ) {}

  verificarCedula() {
    this.accesoService.verificarCedula(this.cedula).subscribe(
      (res: any) => {
        if (res.estado) {
          this.usuarioVerificado = true;
          this.accesoService.showToast('Usuario verificado. Por favor, cambie su clave.');
        } else {
          this.accesoService.showToast('Cédula no encontrada.');
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  cambiarClave() {
    if (this.nuevaClave === this.confirmarClave) {
      this.accesoService.cambiarClave(this.cedula, this.nuevaClave).subscribe(
        (res: any) => {
          if (res.estado) {
            this.accesoService.showToast('Clave actualizada correctamente.');
            this.modalController.dismiss();
          } else {
            this.accesoService.showToast('Hubo un error al actualizar la clave.');
          }
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      this.accesoService.showToast('Las claves no coinciden.');
    }
  }
}
