import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
 
interface ExcellencePoint {
  text: string;
  open: boolean;
}
@Component({
  selector: 'app-excellence-service',
  imports: [CommonModule],
  templateUrl: './excellence-service.html',
  styleUrl: './excellence-service.css',
})
export class ExcellenceService {
   points: ExcellencePoint[] = [
    { text: 'Best in industry record for an end to end service level achievements.', open: false },
    { text: 'Next day delivery service on select routes.', open: false },
    { text: 'Secured, weatherproof godowns and close body vehicles for a safer delivery.', open: false },
    { text: 'Tailor-made operations designed as per your business requirements.', open: false },
    { text: 'Capability to provide solutions for raw material, finished goods and secondary transportation requirements of any client across the western and southern part of India.', open: false },
    { text: 'Predefined routes and transit time between booking and delivery branches.', open: false },
    { text: 'Dedicated fleet and real-time tracking support for every shipment.', open: false },
    { text: 'Trained field staff ensuring smooth pickup and delivery experience.', open: false }
  ];
 
  toggle(point: ExcellencePoint): void {
    point.open = !point.open;
  }
}

