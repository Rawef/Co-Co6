package com.example.testeditions.Services;




import com.example.testeditions.Entites.LikeDislike;
import com.example.testeditions.Entites.Matchs;
import com.example.testeditions.Entites.Profil;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.LikeDislikeRepository;
import com.example.testeditions.Repositories.MatchRepository;
import com.example.testeditions.Repositories.ProfilRepository;
import com.example.testeditions.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MatchService {

    @Autowired
    ProfilRepository profilRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    MatchRepository matchRepository;
    @Autowired
    LikeDislikeRepository likeDislikeRepository;


    public List<Matchs> getAllMatches() {
        return matchRepository.findAll();
    }

    public Matchs getMatchById(Long id) {
        return matchRepository.findById(id).orElse(null);
    }

    public Matchs saveMatch(Matchs match) {
        return matchRepository.save(match);
    }

    public void deleteMatch(Long id) {
        matchRepository.deleteById(id);
    }
    public Matchs createMatchIfMutualLike(LikeDislike likeDislike, Long userId, Long profilId) {
        // Récupérer le profil de l'utilisateur aimé
        Profil profil = profilRepository.findById(profilId)
                .orElseThrow(() -> new RuntimeException("Profil not found"));

        // Récupérer l'utilisateur qui a aimé le profil
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Vérifier si le profil de l'utilisateur aimé a aimé l'utilisateur actuel
        LikeDislike existingLikeByProfil = likeDislikeRepository.findByProfilAndUser(profil, user);

        User user1=userRepository.findByProfil(profil).get();
        Profil profile1=profilRepository.findByUser(user);


        // Vérifier si l'utilisateur actuel a aimé le profil de l'utilisateur aimé
        LikeDislike existingLikeByUser = likeDislikeRepository.findByProfilAndUser(profile1, user1);

        if (existingLikeByProfil != null && existingLikeByUser != null) {
            // Créer un nouveau match
            Matchs match = new Matchs();
            match.setUser1(existingLikeByUser.getUser());
            match.setUser2(existingLikeByProfil.getUser());
            // Enregistrer le match dans la base de données
            return matchRepository.save(match);
        } else {
            // Aucun match mutuel trouvé
            throw new RuntimeException("Mutual like not found");
        }
    }


}

