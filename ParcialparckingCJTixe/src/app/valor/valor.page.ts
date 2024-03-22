import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-valor',
  templateUrl: 'valor.page.html',
  styleUrls: ['valor.page.scss'],
})
export class ValorPage implements OnInit {
  valorHora: number | null = null; // La propiedad para almacenar el valor ingresado

  constructor(
    private alertCtrl: AlertController,
    private accesoService: AccesoService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.presentarAlertaValorHora(); // Muestra la alerta para ingresar el valor tan pronto se carga la página
  }

  async presentarAlertaValorHora() {
    const alert = await this.alertCtrl.create({
      header: 'Ingresar Valor por Hora',
      inputs: [
        {
          name: 'valor',
          type: 'number',
          min: 1,
          max: 5,
          placeholder: 'Valor ($1 - $5)'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => this.navCtrl.navigateBack('/menu')
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const valor = parseFloat(data.valor);
            if (!isNaN(valor) && valor >= 1 && valor <= 5) {
              this.valorHora = valor;
              this.guardarValorHora(); 
              return true;
            } else {
              this.mostrarMensajeError('Por favor, ingresa un valor entre $1 y $5.');
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  mostrarMensajeError(mensaje: string) {
    this.alertCtrl.create({
      header: 'Error',
      message: mensaje,
      buttons: ['Aceptar']
    }).then(alert => alert.present());
  }

  guardarValorHora() {
    if(this.valorHora !== null) {
     
      this.accesoService.guardarValorHora(this.valorHora).subscribe(
        response => {
       
          this.accesoService.showToast('El valor por hora ha sido guardado.');
          this.navCtrl.navigateBack('/menu');
        },
        error => {
         
          this.accesoService.showToast('Ocurrió un error al guardar el valor por hora.');
          console.error('Error al guardar el valor por hora', error);
        }
      );
    } else {
      
      this.accesoService.showToast('No se ha ingresado un valor válido.');
    }
  }
}
