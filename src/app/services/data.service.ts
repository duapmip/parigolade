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
  league: League;
}

export interface League {
  idLeague?: string;
  titleLeague: string;
  bets: Bet[];
  admin: string;
  participantsNumber: number;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }


  // general function to get and add bet and league in all the app

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

  // those 4 functions will be usefull when administrator's authorization will be develop

  // deleteBet(bet: Bet) {
  //   const betDocRef = doc(this.firestore, `bets/${bet.id}`);
  //   return deleteDoc(betDocRef)
  // }

  // updateBet(bet: Bet) {
  //   const betDocRef = doc(this.firestore, `bets/${bet.id}`);
  //   return updateDoc(betDocRef, {title: bet.title, betNumber: bet.betNumber, set: bet.set, choices: bet.choices, league: bet.league})
  // }

  // deleteLeague(league: League) {
  //   const leagueDocRef = doc(this.firestore, `leagues/${league.idLeague}`);
  //   return deleteDoc(leagueDocRef)
  // }

  // updateLeague(bet: Bet) {
  //   const betDocRef = doc(this.firestore, `bets/${bet.id}`);
  //   return updateDoc(betDocRef, {title: bet.title, betNumber: bet.betNumber, set: bet.set, choices: bet.choices, league: bet.league})
  // }
}
