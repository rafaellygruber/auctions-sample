import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private firestore: AngularFirestore) { }

  createNewAuction(record) {
    return this.firestore.collection('auctions').add(record);
  }

  readAuctions(searchParam?: string) {
    if (searchParam) {
      return this.firestore.collection('auctions', ref=> ref.where('name', '==', searchParam)).snapshotChanges();
    }

    return this.firestore.collection('auctions').snapshotChanges();
  }

  getAuction(recordID) {
    return this.firestore.doc('auctions/' + recordID).valueChanges();
  }

  updateAuction(recordID, record) {
    return this.firestore.doc('auctions/' + recordID).update(record);
  }

  deleteAuction(recordID) {
    this.firestore.doc('auctions/' + recordID).delete();
  }
}
