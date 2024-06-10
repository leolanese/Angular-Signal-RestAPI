import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userProfileSignal = signal<any | null>(null); // set null initial value

  constructor(private http: HttpClient) {}

  fetchProfile() {
    console.log('trigger fetchProfile');
    this.http
      .get<any>(`https://jsonplaceholder.typicode.com/users`)
      .pipe(
        retry(3),
        catchError((error) => {
          console.error('Error fetching profile:', error);
          return of(1);
        })
      )
      .subscribe((profile) => {
        // subscribe to a signal to receive updates.
        console.log('API Response:', profile);
        this.userProfileSignal.set(profile);
        console.log('set userProfileSignal', this.userProfileSignal);
      });
  }
}