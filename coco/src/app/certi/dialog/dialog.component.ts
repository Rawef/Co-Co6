import { DomSanitizer } from '@angular/platform-browser';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  map: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.map = L.map('map').setView([36.8663, 10.1645], 13); // Coordinates for Ariana, Tunisia

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    console.log(this.data +"fil dialog")

    // Add initial marker
    this.addMarker(36.8663, 10.1645, 'Ariana, Tunisia');
    this.showMarker(this.data);
  }

  addMarker(lat: number, lng: number, popupText: string) {
    L.marker([lat, lng], {
      icon: L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41],
        shadowAnchor: [12, 41]
      })
    }).addTo(this.map)
      .bindPopup(popupText)
      .openPopup();
  }

  showMarker(data: string): void {
    const [latStr, lngStr] = data.split(','); // Split the string at comma
    const lat = parseFloat(latStr.trim()); // Convert the first part to a number
    const lng = parseFloat(lngStr.trim()); 
    this.addMarker(lat, lng, `Location: ${lat}, ${lng}`);
  }


}



