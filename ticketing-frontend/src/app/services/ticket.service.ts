import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'http://localhost:5000/api/tickets';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTicket(ticket: { name: string; price: number }): Observable<any> {
    return this.http.post(this.apiUrl, ticket);
  }

  purchaseTicket(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/purchase/${id}`, {});
  }
}
