import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  accent: 'amber' | 'teal' | 'coral';
}

@Component({
  selector: 'app-customized-service',
  imports: [CommonModule, FormsModule],
  templateUrl: './customized-service.html',
  styleUrl: './customized-service.css',
  

})
export class CustomizedService {
   services: ServiceCard[] = [
    {
      icon: 'M3 7h13v10H3zM16 10h4l3 3v4h-7z M6 20a2 2 0 100-4 2 2 0 000 4zM18 20a2 2 0 100-4 2 2 0 000 4z',
      title: 'Freight Forwarding',
      description: 'Air, ocean, and ground freight routed for cost or speed.',
      accent: 'amber'
    },
    {
      icon: 'M3 21V10l9-6 9 6v11h-6v-7H9v7z',
      title: 'Warehousing',
      description: 'Flexible storage with inventory visibility down to the pallet.',
      accent: 'teal'
    },
    {
      icon: 'M13 2 3 14h7l-1 8 10-12h-7z',
      title: 'Last-Mile Delivery',
      description: 'Final-leg delivery tuned for cities or wide rural routes.',
      accent: 'coral'
    }
  ];
 
  request = {
    name: '',
    email: '',
    message: ''
  };
 
  submitted = false;
 
  onSubmit(): void {
    if (!this.request.name || !this.request.email) { return; }
    this.submitted = true;
  }
}