import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-ticket',
  standalone: true,
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class AddTicketComponent {
  ticketForm: FormGroup;

  constructor(private fb: FormBuilder, private ticketService: TicketService) {
    this.ticketForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  addTicket() {
    if (this.ticketForm.valid) {
      this.ticketService.addTicket(this.ticketForm.value).subscribe(() => {
        this.ticketForm.reset();
        alert('Ticket added successfully!');
      });
    }
  }
}
