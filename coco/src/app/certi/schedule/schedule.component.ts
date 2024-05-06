import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ScheduleService } from '../service/schedule.service';
import internal from 'stream';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceService } from '../../login/services/service.service';




@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
  providers: [provideNativeDateAdapter()],
  

})
export class ScheduleComponent {
  @ViewChild('map', { static: true }) map: any;


   ngOnInit() {

    
  
  

  }
  

  area: string = "";
  date: string = "";
  station: string = ""; // Initialize station with default values
  availability: string = "";
  price: number = 0;
  user_id: number = 0 ;
  selected!: Date | null;


  constructor(private schedule: ScheduleService, private http: HttpClient, private servicee:ServiceService) {}

  handleClick(event: any) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    console.log(`Clicked on: ${lat}, ${lng}`);
    this.station = `${lat},${lng}`; // Update station with lat,lng format
  }
  
  losave() {
    // Define an interface for the event data (optional)
    interface EventData {
      area: string;
      date: string; // Consider using a Date object for better date handling
      price: number;
      availability: string;
      station: string;
      user_id: number;
    }
  
    this.servicee.getLoggedInUser().subscribe((userData: any) => {
      // Prepare event data inside the subscription to ensure user_id is properly retrieved
      const eventData: EventData = {
        area: this.area,
        date: this.selected ? this.selected.toISOString() : '', // Use optional chaining
        price: this.price,
        availability: this.availability,
        station: this.station,
        user_id: userData.user_id, // Access the user_id property from the emitted user data
      };
  
    // Set content type header (optional)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    // Make the HTTP request
    this.http.post<any>("http://localhost:8089/schedules/ajouterschedule", eventData, { headers })
      .subscribe(
        (response) => {
          console.log(response); // Log the response data (might contain additional info)
          alert("Event created successfully!");
        },
        (error) => {
          console.error("Error creating event:", error);
          // Handle specific errors based on response status code or error message
          alert("Event creation failed. Please try again.");
        }
      );
  })
  
  
  }
}  



