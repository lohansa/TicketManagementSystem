import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  imports: [MatTableModule, MatButtonModule],
})
export class TicketListComponent implements OnInit {
  tickets: any[] = [];
  displayedColumns: string[] = ['name', 'price', 'status', 'actions'];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe((data) => {
      this.tickets = data;
    });
  }

  purchaseTicket(id: string) {
    this.ticketService.purchaseTicket(id).subscribe(() => {
      this.loadTickets();
    });
  }
}
