import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore, doc, deleteDoc} from '@angular/fire/firestore';
import { addDoc, collection, updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
 
export interface Bet {
  id?: string;
  title: string;
  betNumber: number;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getBet(): Observable<Bet[]> {
    const betRef = collection(this.firestore, 'bets');
    return collectionData(betRef, {idField: 'id'}) as Observable<Bet[]>;
  }

  getBetById(id): Observable<Bet> {
    const betDocRef = doc(this.firestore, `bets/${id}`);
    return docData(betDocRef, {idField: 'id'}) as Observable<Bet>;
  }

  addBet(bet: Bet) {
    const betsRef = collection(this.firestore, 'bets');
    return addDoc(betsRef, bet);
  }

  deleteBet(bet: Bet) {
    const betDocRef = doc(this.firestore, `bets/${bet.id}`);
    return deleteDoc(betDocRef)
  }

  updateBet(bet: Bet) {
    const betDocRef = doc(this.firestore, `bets/${bet.id}`);
    return updateDoc(betDocRef, {title: bet.title, betNumber: bet.betNumber})
  }
}
