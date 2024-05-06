import { TinderService } from './../tinder.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css']
})
export class CreateprofileComponent {
  profileData: any = {}; // Définissez un objet pour stocker les données du profil
file: any = null;
onFileChange(event: any): void {
  this.file = event.target.files[0];

  
}
  constructor(private tinderService: TinderService) { }
  createProfile() {
    if(this.file != null){
    const userId = "9"; // Assuming you have the user ID, replace it with actual user ID
    const formData = new FormData();
    
    formData.append('image', this.file); 
    formData.append('userId', userId);
    formData.append('description', this.profileData.description);
    formData.append('age', this.profileData.age);
    formData.append('localisation', this.profileData.localisation);
    formData.append('preferencesRecherche', this.profileData.preferencesRecherche);
    this.tinderService.createProfile(this.profileData).subscribe(
      (response) => {
        console.log('Profile created successfully:', response);
        // Optionally, you can perform actions after profile creation, such as redirecting to another page
      },
      (error) => {
        console.error('Error creating profile:', error);
        // Handle error response, display error message, etc.
      }
    );
  }
}
  
}
