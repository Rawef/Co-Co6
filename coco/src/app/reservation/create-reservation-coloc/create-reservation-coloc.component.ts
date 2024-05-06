import { Component, OnInit } from '@angular/core';
import { ReservationColocServiceService } from '../reservation-coloc-service.service';
import { AnnonceColocService } from '../../annoceColoc/annonce-coloc.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../login/services/service.service';

@Component({
  selector: 'app-create-reservation-coloc',
  templateUrl: './create-reservation-coloc.component.html',
  styleUrls: ['./create-reservation-coloc.component.css']
})
export class CreateReservationColocComponent implements OnInit {
  reservation: any = {};
  annonceId: any;
  annonceColoc: any;
  prixAnnonce: any;
  imageAnnonce: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationColocServiceService,
    private annonceService: AnnonceColocService,
    private userservice: ServiceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      console.log('ID récupéré de l\'URL:', id); // Ceci affichera l'ID dans la console
      if (!isNaN(id)) {
        this.annonceId = id;
        this.getAnnonceDetails();
      } else {
        console.error('ID de l\'annonce non valide dans l\'URL.');
      }
    });
  }
  
  

  getAnnonceDetails(): void {
    this.annonceService.getAnnonceColocById(this.annonceId)
      .subscribe(annonce => {
        this.annonceColoc = annonce;
        this.prixAnnonce = annonce.prix; // Récupérer le prix de l'annonce
        this.imageAnnonce = annonce.image; // Récupérer l'image de l'annonce
      });
  }

  onSubmit() {
    const userId = this.userservice.getLoggedInUserId();
  
    if (userId && this.annonceColoc) {
      this.reservationService.addReservation(this.annonceColoc.id, userId, this.reservation).subscribe(
        (data) => {
          console.log('Réservation ajoutée avec succès !', data);
          this.reservation = {};
          this.router.navigate(['/annoncesColoc/view/:id/reservationColoc/contract']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la réservation :', error);
        }
      );
    } else {
      console.error('Annonce non trouvée ou ID utilisateur non valide.');
    }
  }
  
  
  
}
