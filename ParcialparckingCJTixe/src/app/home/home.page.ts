import { Component } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';
import { ActualizarClaveModalComponent } from '../actualizar-clave-modal/actualizar-clave-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  txt_clave:string="";
  txt_usuario:string="";
  constructor(
    private acceso :AccesoService, 
    private navCtrl: NavController,
    private modalController: ModalController
) {} 
loggin(){
  this.acceso.showToast("hola");
let datos={
accion: "loggin",
usuario:this.txt_usuario, 
clave: this.txt_clave
}
this.acceso.postData(datos).subscribe((res:any)=>{
if (res.estado==true)
{
this.acceso.creatSession('cod_persona', res.persona[0].codigo);
this.acceso.creatSession('persona', res.persona [0].nombre+" "+res.persona [0].apellido);
this.acceso.showToast ('Bienvenido');
this.navCtrl.navigateRoot('/menu');
}
else
{
  console.log(res.mensaje)
this.acceso.showToast (res.mensaje);
}
});
}
async presentActualizarClaveModal() {
  const modal = await this.modalController.create({
    component: ActualizarClaveModalComponent
  });
  return await modal.present();
}
}

