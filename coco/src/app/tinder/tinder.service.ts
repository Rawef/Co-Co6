import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TinderService {
  private baseUrl= 'http://localhost:8089';
  
  constructor(private http:HttpClient) { }

  createMatchIfMutualLike(likeDislike: any, userId: number, profilId: number): Observable<any> {
  // Envoyer l'objet likeDislike ainsi que les IDs d'utilisateur et de profil dans le corps de la requête POST
  return this.http.post(`${this.baseUrl}/api/matches/createMatchIfMutualLike/${userId}/${profilId}`, likeDislike);
}


  saveLikeDislike(likeDislike: any, userId: number, profilId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/likedislikes/${userId}/${profilId}`, likeDislike);
  }
  getProfileById(profileId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/profiles/${profileId}`);
  }

  getAllProfiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/profiles`);
  }

  deleteProfile(profileId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/profiles/${profileId}`);
  }
  getUserPreferences(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getPreferences/${userId}`);
  }
  getProfilesWithUserNames(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/profiles/names`);
  }
  createProfile(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/profiles`, formData);
  }
  checkUserLikedProfile(userId: number, profileId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/likedislikes/check/${userId}/${profileId}`);
  }
  
}
