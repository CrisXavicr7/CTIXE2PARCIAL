
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 

import { ActualizarClaveModalComponent } from './actualizar-clave-modal.component';

@NgModule({
  declarations: [ActualizarClaveModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Asegúrate de que IonicModule está aquí
    // Otros módulos necesarios
  ],
  // exports y entryComponents si son necesarios
})
export class ActualizarClaveModalModule {}
