import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  usuario: string = "";
  
  constructor(
    public navCtrl: NavController,
    public acceso: AccesoService
  ) {
    this.acceso.getSession('persona').then((res: any) => {
      this.usuario = res;
    });
  }

  ngOnInit() {
  }

  irPuestos() {
    this.navCtrl.navigateRoot(['puestos']);
  }

  irVerificarPuestos() {
    this.navCtrl.navigateRoot(['verificar']);
  }

  irIngresarValor() {
    this.navCtrl.navigateRoot(['valor']);
  }

  irIngresarVehiculo() {
    this.navCtrl.navigateRoot(['registrar']);
  }

  irSalida() {
    this.navCtrl.navigateRoot(['salida']);
  }


}
