import { Routes } from '@angular/router';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
  { path: 'tickets', component: TicketListComponent },
  { path: 'add-ticket', component: AddTicketComponent },
];
