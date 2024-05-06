import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importez HttpClient pour effectuer des requêtes HTTP
import { Observable } from 'rxjs';
import { ServiceService } from '../login/services/service.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationColocServiceService {
  private apiUrl = 'http://localhost:8089/api/reservations-coloc'; // URL de votre API Spring

  constructor(private http: HttpClient,private userservice:ServiceService) { }

 // Méthode pour ajouter une réservation
addReservation(annonceId: number, userId: number, reservation: any): Observable<any> {
  const url = `${this.apiUrl}/${annonceId}?id=${userId}`;
  return this.http.post<any>(url, reservation);
}

  

}
