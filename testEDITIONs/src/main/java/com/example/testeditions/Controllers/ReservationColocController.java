package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.AnnonceColocation;
import com.example.testeditions.Entites.ReservationColoc;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.UserRepository;
import com.example.testeditions.Services.AnnonceColocationService;
import com.example.testeditions.Services.ReservationColocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations-coloc")
public class ReservationColocController {

    @Autowired
    private ReservationColocService reservationColocService;
    @Autowired
    private AnnonceColocationService annonceColocationService;
    @Autowired
    private UserRepository userRepository;
    @GetMapping
    public List<ReservationColoc> getAllReservations() {
        return reservationColocService.getAllReservations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationColoc> getReservationById(@PathVariable Long id) {
        Optional<ReservationColoc> reservationOptional = reservationColocService.getReservationById(id);
        return reservationOptional.map(reservation -> ResponseEntity.ok().body(reservation))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{annonceId}")
    public ResponseEntity<ReservationColoc> createReservation(@PathVariable Long annonceId, @RequestBody ReservationColoc reservationColoc,@RequestParam Long id) {
        // Récupérer l'annonce correspondant à l'identifiant
        Optional<AnnonceColocation> annonceOptional = annonceColocationService.getAnnonceById(annonceId);
        if (annonceOptional.isPresent()) {
            AnnonceColocation annonceColocation = annonceOptional.get();
            // Associer l'annonce à la réservation
            reservationColoc.setAnnoncecolocation(annonceColocation);
            // Enregistrer la réservation avec l'annonce associée
            ReservationColoc createdReservation = reservationColocService.createReservation(reservationColoc);
            User user=userRepository.findById(id).get();
            annonceColocation.setUser(user);

            // Mettre à jour les informations de l'annonce dans la réservation créée
            createdReservation.getAnnoncecolocation().setPrix(annonceColocation.getPrix());
            createdReservation.getAnnoncecolocation().setImage(annonceColocation.getImage());

            return ResponseEntity.status(HttpStatus.CREATED).body(createdReservation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }




    @PutMapping("/{id}")
    public ResponseEntity<ReservationColoc> updateReservation(@PathVariable Long id, @RequestBody ReservationColoc newReservation) {
        ReservationColoc updatedReservation = reservationColocService.updateReservation(id, newReservation);
        return updatedReservation != null ? ResponseEntity.ok().body(updatedReservation) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationColocService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/stats/reservationCountByDay")
    public ResponseEntity<Map<Date, Integer>> getReservationCountByDay() {
        Map<Date, Integer> reservationCountMap = reservationColocService.getReservationCountByDay();
        return ResponseEntity.ok().body(reservationCountMap);
    }

}
