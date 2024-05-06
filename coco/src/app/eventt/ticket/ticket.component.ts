import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { EventData } from '../event.component';
import { TicketService } from './ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { QrDialogComponent } from '../qr-dialog/qr-dialog.component';
import { QrCodeService } from '../../qr-code.service';


export interface Ticket {
  id: number;
  description: string;
  place: string;
  // Add more properties as needed
}





@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  events: EventData[] = [];
  myAngularxQrCode: string = 'hello'
  


  constructor(private eventService: EventService , private ticketService: TicketService , private dialog: MatDialog , private qrCodeService: QrCodeService) {}

  ngOnInit(): void {
    this.eventService.showEvents().subscribe(
      (events: EventData[]) => {
        this.events = events;
        console.log('Events retrieved successfully:', events);
      },
      (error) => {
        console.error('Error retrieving events:', error);
        // Handle errors accordingly
      }
    );
    /*    this.servicee.getLoggedInUser().subscribe(user => {
      if (user) {
        this.getSchedule(user.id); // Assuming 'id' is the property that holds the user's ID
      }
    }); */
  
  }
  participate(event: EventData): void {
    // You can customize this method to generate the ticket and display the QR code window
    const ticketDetails = {
      description: event.description,
      place: event.place
    };
    const myAngularxQrCode = 'Updated QR Code Data';

    // Assuming you have a method in TicketService to generate the ticket
    this.ticketService.generateTicket(ticketDetails).subscribe(
      (ticket) => {
        // Display the QR code window with the ticket details
        console.log('Ticket generated successfully:', ticket);
        // You can add logic here to display a dialog/modal with the QR code
      },
      (error) => {
        console.error('Error generating ticket:', error);
        // Handle errors accordingly
      }
    );
    this.qrCodeService.myAngularxQrCode = myAngularxQrCode;
  }
  openQrDialog(qrData: string): void {
    const dialogRef = this.dialog.open(QrDialogComponent, {
      width: '250px',
      data: { qrData: qrData }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
