import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
export interface TrackingStep {
  label: string;
  location: string;
  timestamp: string;
  status: 'done' | 'active' | 'pending';
  icon: string;
}
 
export interface ConsignmentDetails {
  gcNumber: string;
  origin: string;
  destination: string;
  weight: string;
  bookedOn: string;
  eta: string;
  transporter: string;
  vehicleNo: string;
}

@Component({
  selector: 'app-gctracking',
  imports: [CommonModule, FormsModule],
  templateUrl: './gctracking.html',
  styleUrl: './gctracking.css',
})
export class Gctracking implements OnInit {
 
  searchGcNumber: string = '';
  hasSearched: boolean = false;
  isLoading: boolean = false;
  notFound: boolean = false;
 
  consignment: ConsignmentDetails = {
    gcNumber: 'GC-4471029',
    origin: 'Pune, MH',
    destination: 'Ahmedabad, GJ',
    weight: '1,240 kg',
    bookedOn: '05 Jul 2026, 10:12 AM',
    eta: '11 Jul 2026, by 6:00 PM',
    transporter: 'Shree Balaji Roadlines',
    vehicleNo: 'MH-12 AB 4529'
  };
 
  steps: TrackingStep[] = [
    { label: 'Booked', location: 'Pune Hub', timestamp: '05 Jul, 10:12 AM', status: 'done', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Picked Up', location: 'Pune Warehouse', timestamp: '05 Jul, 2:40 PM', status: 'done', icon: 'M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0l-2 5H6l-2-5m16 0H4' },
    { label: 'In Transit', location: 'Near Vadodara', timestamp: '09 Jul, 8:15 AM', status: 'active', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { label: 'Out for Delivery', location: 'Ahmedabad Hub', timestamp: 'Expected 11 Jul', status: 'pending', icon: 'M3 12h18M3 6h18M3 18h18' },
    { label: 'Delivered', location: 'Ahmedabad, GJ', timestamp: 'Expected 11 Jul', status: 'pending', icon: 'M5 13l4 4L19 7' }
  ];
 
  progressPercent: number = 0;
 
  ngOnInit(): void {
    this.computeProgress();
  }
 
  computeProgress(): void {
    const doneCount = this.steps.filter(s => s.status === 'done').length;
    const activeBonus = this.steps.some(s => s.status === 'active') ? 0.5 : 0;
    this.progressPercent = ((doneCount + activeBonus) / this.steps.length) * 100;
  }
 
  trackConsignment(): void {
    if (!this.searchGcNumber.trim()) {
      return;
    }
    this.isLoading = true;
    this.hasSearched = false;
    this.notFound = false;
 
    // Simulated lookup — replace with a real API call to your tracking service.
    setTimeout(() => {
      this.isLoading = false;
      this.hasSearched = true;
      this.notFound = false;
      this.computeProgress();
    }, 900);
  }
 
  resetSearch(): void {
    this.hasSearched = false;
    this.searchGcNumber = '';
    this.notFound = false;
  }
 
  get activeStepIndex(): number {
    return this.steps.findIndex(s => s.status === 'active');
  }
}
