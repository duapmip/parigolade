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
    //  verify if the user is authenticated
     return this.authState.value;
   }

   getUser() {
    //  get the user currently logged in
     return this.auth.currentUser.email.split('@')[0];
   }

  
  async register({ email, password}) {
    // function to register as a new user
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
    // function to login as a user
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
    // function to log out as a user
    return signOut(this.auth);
  }
}
