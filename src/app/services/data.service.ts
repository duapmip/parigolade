import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { collectionData, docData, Firestore, doc, deleteDoc} from '@angular/fire/firestore';
import { addDoc, collection, updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
 
export interface Bet {
  id?: string;
  title: string;
  betNumber: number;
  set: number;
  choices: string[];
}

export interface League {
  idLeague?: string;
  titleLeague: string;
  bets: Bet[];
  admin: User;
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
    return updateDoc(betDocRef, {title: bet.title, betNumber: bet.betNumber, set: bet.set, choices: bet.choices})
  }

  getLeague(): Observable<League[]> {
    const leagueRef = collection(this.firestore, 'leagues');
    return collectionData(leagueRef, {idField: 'idLeague'}) as Observable<League[]>;
  }

  getLeagueById(idLeague): Observable<League> {
    const leagueDocRef = doc(this.firestore, `leagues/${idLeague}`);
    return docData(leagueDocRef, {idField: 'idLeague'}) as Observable<League>;
  }

  addLeague(league: League) {
    const leaguesRef = collection(this.firestore, 'leagues');
    return addDoc(leaguesRef, league);
  }

  deleteLeague(league: League) {
    const leagueDocRef = doc(this.firestore, `leagues/${league.idLeague}`);
    return deleteDoc(leagueDocRef)
  }
}
