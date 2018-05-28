import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
	// private user: firebase.User;
	private user;
	public data;

	constructor(public angularFireAuth: AngularFireAuth) {
		this.loadUserId();
	}

	// signInWithEmail(credentials) {
	// 	console.log('Sign in with email');
	// 	return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
	// }

	// signUp(credentials) {
	// 	return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	// }

	private loadUserId(): Observable<string> {
		return this['subscriptor'] || ( this['subscriptor'] =
	 	Observable.create(sub => {
			this.angularFireAuth.authState.subscribe(user => {
				if (user) {
					this.user = user;
					sub.next(this.user.uid);
					sub.complete();
					this['subscriptor'] = null;
				}
			});
		}).share() );
	}

	get authenticated(): boolean {
	  return this.user !== null && this.user !== undefined;
	}

	public autenticou(): Observable<boolean> {
		return Observable.create(sub => {
			this.angularFireAuth.authState.subscribe(user => sub.next(user !== null && user !== undefined));
		});
	}

	// getEmail() {
	//   return this.user && this.user.email;
	// }

	public getUserId(): Promise<string> {
		return new Promise(resolve => {
			console.log(this.user);
			if (this.user) {
				resolve(this.user.uid);
			} else {
				this.loadUserId().subscribe(uid => {
					resolve(uid);
				});
			}
		});
	}

	signOut(): Promise<void> {
		this.data = null;
	  return this.angularFireAuth.auth.signOut();
	}

	signInWithGoogle() {
			console.log('Sign in with google');
			// return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
			return this.oauthSignIn(new auth.GoogleAuthProvider());
	}

	// private oauthSignIn(provider: AuthProvider) {
	private oauthSignIn(provider) {
		if (!(<any>window).cordova) {
			return this.angularFireAuth.auth.signInWithPopup(provider)
			.then(res => this.data = res);
		} else {
			return this.angularFireAuth.auth.signInWithRedirect(provider)
			.then(() => {
				return this.angularFireAuth.auth.getRedirectResult().then( result => {
					// This gives you a Google Access Token.
					// You can use it to access the Google API.
					let token = result.credential.accessToken;
					// The signed-in user info.
					let user = result.user;
					console.log(token, user);
				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});
			});
		}
	}
}
