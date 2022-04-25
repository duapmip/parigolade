import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject(false);

  constructor(
    private auth: Auth, 
    ) { }

   isAuthenticated() {
     return this.authState.value;
   }

  
  async register({ email, password}) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );
      this.authState.next(true);
      return user;
    } catch (e) {
      return null;
    }    
  }

  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );
      this.authState.next(true);
      return user;
    } catch (e) {
      return null;
    }       
  }

  logout() {
    return signOut(this.auth);
  }
}
