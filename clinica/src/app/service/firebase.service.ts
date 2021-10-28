import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Imagen } from '../shared/imagen';
import { Usuario } from '../shared/usuario';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  dbPathUsuarios: string = "usuariosClinica";
  dbPathEspecialidades: string = "especialidades";

  usuariosCollection: AngularFirestoreCollection;
  usuarios!: Observable<Usuario[]>;

  especialidadesCollection: AngularFirestoreCollection;
  especialidades: Observable<any[]>;

  constructor(public db: AngularFirestore, public storage: AngularFireStorage) {
    this.cargarUsuarios();
    this.cargarEspecialidades();
  }


  addUsuario(usuario: Usuario, img: Imagen) {
    console.log(this.usuariosCollection);
    this.usuariosCollection.add({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      edad: usuario.edad,
      DNI: usuario.DNI,
      email: usuario.email,
      password: usuario.password,
      tipoUsuario: usuario.tipoUsuario,
      obraSocial: usuario.obraSocial,
      especialidad: usuario.especialidad,
      img1Nombre: img.nombre,
      img1Url: img.url,
    });
  }

  cargarUsuarios() {
    this.usuariosCollection = this.db.collection(this.dbPathUsuarios);
    this.usuarios = this.usuariosCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Usuario;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }

  onUpload(filePath: string, file: any) {
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
  }

  uploadUsuarioImg(img: Imagen, usuario: Usuario): Observable<number> {
    const filePath = `${this.dbPathUsuarios}/${img.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, img.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          img.url = downloadURL;
          img.nombre = img.file.name;
          this.addUsuario(usuario, img);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  deleteFile(img: Imagen): void {
    this.deleteFileStorage(img.nombre);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.dbPathUsuarios);
    storageRef.child(name).delete();
  }

  updateUsuario(usuario: Usuario) {
    const tutorialsRef = this.db.collection(this.dbPathUsuarios);
    tutorialsRef.doc(usuario.id).update({ nombre: usuario.nombre });
  }

  getUsuarios() {
    return this.usuarios;
  }

  cargarEspecialidades() {
    this.especialidadesCollection = this.db.collection(this.dbPathEspecialidades);
    this.especialidades = this.especialidadesCollection.snapshotChanges();
  }

  addEspecilidad(especialidad: string){
    this.especialidadesCollection.add({
      nombre: especialidad
    });
  }

  getEspecialidades(){
    return this.especialidades;
  }
}


