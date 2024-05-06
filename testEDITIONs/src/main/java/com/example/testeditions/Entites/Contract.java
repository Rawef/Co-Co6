package com.example.testeditions.Entites;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Contract {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    private String content;
    @Temporal(TemporalType.DATE)
    private Date date_contract;
    private StatCont statutC;
    private int DureeC;
    private choixC choixC;
    private boolean signature;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="contract")
    private List<User> Users;
    @OneToOne
    private AnnonceColocation annoncecolocation;
    @OneToOne
    private ReservationColoc reservationcoloc;
}