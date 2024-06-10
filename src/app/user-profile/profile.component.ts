import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProfileService } from './profile.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="userProfile">
        <div *ngFor="let profile of userProfile; let i = index">
        <h1>{{ profile.name }}</h1>
        <p>Username: {{ profile.username }}</p>
        <p>Email: {{ profile.email }}</p>
        <p>Address: {{ profile.address.street }}, {{ profile.address.suite }}, {{ profile.address.city }} {{ profile.address.zipcode }}</p>
        <p>Phone: {{ profile.phone }}</p>
        <p>Website: {{ profile.website }}</p>
        <p>Company: {{ profile.company.name }}</p>
        <hr *ngIf="i !== userProfile.length - 1" />
      </div>
      <hr />
    </div>
    <button (click)="fetchProfile()">Fetch Profile</button>
  `,
})
export class ProfileComponent {
  userProfile: any;

  constructor(private profileService: ProfileService) {
    this.profileService.fetchProfile();
  }

  fetchProfile() {
    this.userProfile = this.profileService.userProfileSignal();
    this.profileService.fetchProfile();
  }
}