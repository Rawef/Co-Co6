import { Component, OnInit } from '@angular/core';
import { ServiceforumService } from '../../service/serviceforum.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-afficherpost',
  templateUrl: './afficherpost.component.html',
  styleUrls: ['./afficherpost.component.css']
})
export class AfficherpostComponent implements OnInit {
  posts: any[] = [];
  postForm: FormGroup;
  CommentForm: FormGroup;
  comments: any = {}; // Utilisation d'un objet pour stocker les commentaires associés à chaque post
  selectedPostId: number | null = null;
  userId: number = 7;
  toxicityThreshold: number = 0.008;
  toxicityResults: any[] = [];


  constructor(private http: HttpClient, private service: ServiceforumService, private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      descriptionPost: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]]
    });
    this.CommentForm = this.formBuilder.group({
      description_comment: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      postId: Number
    });
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.service.afficherpost().subscribe((posts: any[]) => {
      console.log(posts);
      this.posts = posts;
      this.posts.forEach(post => {
        this.countTotalReactions(post.idPost); // Appeler la méthode pour chaque post
      });
    });
  }

  countTotalReactions(postId: number): void {
    this.service.countTotalReactionsForPost(postId).subscribe(
      (count: number) => {
        const postIndex = this.posts.findIndex(post => post.idPost === postId);
        if (postIndex !== -1) {
          this.posts[postIndex].totalReactions = count; // Stocker le nombre total de réactions dans l'objet post
        }
      },
      (error: any) => {
        console.error("Error counting total reactions:", error);
      }
    );
  }

  ajouterLikeAuPost(postId: number, userId: number): void {
    this.service.attribuerLike(postId, userId)
      .subscribe(
        () => {
          // Mettre à jour la liste des posts après l'ajout du like
          this.getPosts();
        },
        (error: any) => {
          console.error("Erreur lors de l'ajout du like :", error);
        }
      );
  }

  ajouterDislikeAuPost(postId: number, userId: number): void {
    this.service.attribuerDislike(postId, userId)
      .subscribe(
        () => {
          // Mettre à jour la liste des posts après l'ajout du dislike
          this.getPosts();
        },
        (error: any) => {
          console.error("Erreur lors de l'ajout du dislike :", error);
        }
      );
  }

  ajouterHahaAuPost(postId: number, userId: number): void {
    this.service.attribuerHaha(postId, userId)
      .subscribe(
        () => {
          // Mettre à jour la liste des posts après l'ajout du haha
          this.getPosts();
        },
        (error: any) => {
          console.error("Erreur lors de l'ajout du haha :", error);
        }
      );
  }

  ajouterLoveAuPost(postId: number, userId: number): void {
    this.service.attribuerLove(postId, userId)
      .subscribe(
        () => {
          // Mettre à jour la liste des posts après l'ajout du love
          this.getPosts();
        },
        (error: any) => {
          console.error("Erreur lors de l'ajout du love :", error);
        }
      );
  }

  submitPost(): void {
    if (this.postForm.valid) {
      const nouveauPost = {
        descriptionPost: this.postForm.value.descriptionPost
      };

      this.service.ajouterPostParUtilisateur(6, nouveauPost).subscribe(
        (response: any) => {
          console.log("Post ajouté avec succès :", response);
          // Réinitialiser la liste des posts après l'ajout
          this.getPosts();
          // Réinitialiser le formulaire
          this.postForm.reset();
        },
        (error: any) => {
          console.error("Erreur lors de l'ajout du post :", error);
        }
      );
    } else {
      console.log('Le formulaire n\'est pas valide');
    }
  }

  afficherFormulaireCommentaire(postId: number): void {
    if (this.selectedPostId === postId) {
      this.selectedPostId = null;
    } else {
      this.selectedPostId = postId;
      this.afficherCommentaires(postId);
    }
    console.log('ID du post sélectionné :', this.selectedPostId); 
  }

  afficherCommentaires(postId: number): void {
    this.service.afficherCommentParPost(postId)
      .subscribe((comments: any[]) => {
        console.log(comments);
        this.comments[postId] = comments; // Stocker les commentaires associés au post sélectionné
      });
  }

  hideComments(postId: number): void {
    // Supprimer les commentaires associés au post sélectionné
    delete this.comments[postId];
  }

  submitComment(postId: number): void {
    if (this.CommentForm.valid) {
      const description_comment = this.CommentForm.value.description_comment;

      this.service.ajouterCommentaireAUnePublication(postId, description_comment).subscribe(
        (response: any) => {
          console.log("Commentaire ajouté avec succès :", response);
          this.afficherCommentaires(postId);
        },
        (error: any) => {
          if (error.status != 200)
            console.error("Erreur lors de l'ajout du commentaire :", error);
          this.analyzeCommentToxicity(this.userId, description_comment, postId);
        }
      );

      // Analyze the comment after successful submission
      this.analyzeCommentToxicity(this.userId, description_comment, postId);
    }
  }

  analyzeCommentToxicity(userId: number, commentText: string, postId: number): void {
    this.service.analyzeComment(commentText).subscribe(
      (result: any) => {
        console.log("Résultat de l'analyse du commentaire :", result);
        if (result.analysisResult && result.analysisResult.attributeScores && result.analysisResult.attributeScores.TOXICITY) {
          const toxicityScore = result.analysisResult.attributeScores.TOXICITY.summaryScore.value;
          const detectedLanguages = result.analysisResult.detectedLanguages;
          
          // Ajouter les résultats de l'analyse à la variable toxicityResults
          this.toxicityResults.push({
            postId: postId,
            toxicityScore: toxicityScore,
            detectedLanguages: detectedLanguages
          });
        }
      },
      (error: any) => {
        console.error("Erreur lors de l'analyse du commentaire :", error);
      }
    );
    
  }
}
