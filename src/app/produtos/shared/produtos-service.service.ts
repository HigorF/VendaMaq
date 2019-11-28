import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebasePath } from 'src/app/core/firebase-path';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private db: AngularFireDatabase) { }

  getAll(categoriaKey: string = null) {
    return this.db.list(FirebasePath.PRODUTOS, q => {
      if (categoriaKey) {
        return q.orderByChild('categoriaKey').equalTo(categoriaKey);
      } else {//if (null) {
        return q.orderByChild('nome');
      //} else {
        //return q.orderByChild('preco');
      }
    }).snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.payload.key, ...m.payload.val() }));
      })
    );
  }

  // db.list trás uma lista toda.
  getcategoriasAll() {
    return this.db.list(FirebasePath.CATEGORIAS).snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({ key: m.payload.key, ...m.payload.val() }));
      })
    );
  }

  // buscar o produto por uma key
  // dbobject trás apenas um item.
getByKey(key: string) {
  // os sifrões servem para concatenar variável com uma constante.
  const path = `${FirebasePath.PRODUTOS}${key}`;
  return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, ...change.payload.val() });
      })
    );
  }

  getByCustomers(produtos: string) {
    return this.db.list(FirebasePath.PRODUTOS, q => q.orderByChild('nome').startAt(produtos).endAt(produtos+'\uf88f'))
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(m => ({ key: m.payload.key, ...m.payload.val() }))
        })
      );
}

}
