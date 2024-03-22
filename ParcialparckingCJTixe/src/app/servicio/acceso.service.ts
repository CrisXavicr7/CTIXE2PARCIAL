import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  server: string = "http://localhost/parkingionic/parkingctixe.php";

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController
  ) { }

  postData(body: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' });
    let options = { headers: headers };
    return this.http.post(this.server, JSON.stringify(body), options);
  }

  login(usuario: string, clave: string): Observable<any> {
    let body = {
      accion: 'login',
      usuario: usuario,
      clave: clave
    };
    return this.postData(body);
  }

  verificarCedula(cedula: string): Observable<any> {
    let body = {
      accion: 'verificarCedula',
      cedula: cedula
    };
    return this.postData(body);
  }

  cambiarClave(cedula: string, nuevaClave: string): Observable<any> {
    let body = {
      accion: 'cambiarClave',
      cedula: cedula,
      nuevaClave: nuevaClave
    };
    return this.postData(body);
  }

  insertarPuestos(numPuestos: number, nuevoDia: boolean): Observable<any> {
    let body = {
      accion: 'insertar_puestos',
      numero: numPuestos,
      nuevo_dia: nuevoDia ? 'si' : 'no'  
    };
    return this.http.post(this.server, JSON.stringify(body), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
    }).pipe(
      catchError((error) => {
        // Aquí puedes manejar el error
        console.error('Ocurrió un error:', error);
        // Opcionalmente, puedes lanzar el error o retornar un valor por defecto
        return throwError('Algo salió mal al intentar insertar los puestos');
      })
    );
  }

  guardarValorHora(valorHora: number): Observable<any> {
    let body = {
      accion: 'ingresar_valor',
      valorHora: valorHora
    };
    return this.postData(body);
  }

  registrarVehiculo(placa: string): Observable<any> {
    const body = {
      accion: 'registrar_v',
      i_placa: placa
    };
    return this.postData(body);
  }


  getEstadoPuestos(): Observable<any> {
    let body = {
      accion: 'getEstadoPuestos'
    };
    return this.postData(body);
  }
  
  registrarSalida(placa: string): Observable<any> {
    return this.postData({
      accion: 'registrar_salida',
      i_placa: placa
    });
  }

  async creatSession(id: string, valor: string) {
    await Preferences.set({ key: id, value: valor });
  }

  async closeSession() {
    await Preferences.clear();
  }

  async getSession(id: string) {
    const item = await Preferences.get({ key: id });
    return item.value;
  }
 

  async showToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 5000,
      position: 'top'
    });
    toast.present();
  }
}
