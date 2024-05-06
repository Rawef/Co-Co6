import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css'],
  
})
export class CertificationComponent {
  certification: any = {}; // Object to hold certification data
  apiUrl = 'http://localhost:8089/certifications/ajoutercerti'; // Replace with your actual API URL

  constructor(private http: HttpClient,public dialog: MatDialog) {}


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px', // Adjust width and height as needed
      height: '400px',
      data: {
        mapUrl: 'https://www.google.com/maps?q=37.422109176517054,-122.0832821071189'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }




  addCertification() {
    this.http.post(this.apiUrl, this.certification)
      .subscribe((response: any) => {
        console.log('Certification added successfully:', response);
        // Optionally, reset the form or take any other action upon successful addition
      }, (error: any) => {
        console.error('Error adding certification:', error);
        // Handle error appropriately (e.g., show error message)
      });
  }
  
}
