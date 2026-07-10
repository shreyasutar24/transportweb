import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
 
export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  accent: 'amber' | 'teal';
}
 
export interface CustomFeature {
  title: string;
  description: string;
}
 
export interface ExcellenceStat {
  value: number;
  suffix: string;
  label: string;
  current: number;
}

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements AfterViewInit, OnDestroy {
 
  @ViewChild('statsSection') statsSection!: ElementRef<HTMLElement>;
 
  private statsObserver?: IntersectionObserver;
  private countStarted: boolean = false;
  private countInterval?: ReturnType<typeof setInterval>;
 
  services: ServiceItem[] = [
    {
      title: 'Full Truck Load (FTL)',
      description: 'Dedicated vehicles for bulk shipments, moving door to door without transshipment delays.',
      icon: 'M3 13h13V6H3zM16 9h3l3 4v4h-6zM7 19a2 2 0 100-4 2 2 0 000 4zM18 19a2 2 0 100-4 2 2 0 000 4z',
      accent: 'amber'
    },
    {
      title: 'Part Load (LTL)',
      description: 'Cost-efficient shared loads for smaller consignments, consolidated and routed daily.',
      icon: 'M20 7H4a1 1 0 00-1 1v9a1 1 0 001 1h1M20 7l-2-4H8L6 7M20 7v10a1 1 0 01-1 1h-1M9 18a2 2 0 11-4 0 2 2 0 014 0zM19 18a2 2 0 11-4 0 2 2 0 014 0z',
      accent: 'teal'
    },
    {
      title: 'Warehousing',
      description: 'Secure, climate-monitored storage hubs positioned near major freight corridors.',
      icon: 'M3 21V9l9-6 9 6v12H3zM9 21V12h6v9',
      accent: 'amber'
    },
    {
      title: 'GC Tracking',
      description: 'Real-time consignment visibility from booking to delivery, on web and mobile.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      accent: 'teal'
    },
    {
      title: 'Cold Chain Logistics',
      description: 'Temperature-controlled transport for pharma, dairy and perishable goods.',
      icon: 'M12 2v20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1M2 12h20',
      accent: 'teal'
    },
    {
      title: 'Cross-Border Freight',
      description: 'Customs-cleared international movement with end-to-end documentation support.',
      icon: 'M3 12h18M3 6h18M3 18h18',
      accent: 'amber'
    }
  ];
 
  customFeatures: CustomFeature[] = [
    {
      title: 'Tailored Routing',
      description: 'Routes planned around your delivery windows, not a fixed timetable.'
    },
    {
      title: 'Flexible Load Plans',
      description: 'Mix FTL, LTL and warehousing in a single plan that scales with demand.'
    },
    {
      title: 'Dedicated Account Manager',
      description: 'One point of contact who knows your shipments and your business.'
    },
    {
      title: 'Custom Reporting',
      description: 'Delivery, cost and SLA reports built around the metrics you actually track.'
    }
  ];
 
  excellenceStats: ExcellenceStat[] = [
    { value: 99, suffix: '%', label: 'On-time delivery rate', current: 0 },
    { value: 1200, suffix: '+', label: 'Vehicles in fleet', current: 0 },
    { value: 48, suffix: 'hr', label: 'Avg. metro turnaround', current: 0 },
    { value: 15, suffix: 'yrs', label: 'Years in operation', current: 0 }
  ];
 
  ngAfterViewInit(): void {
    this.statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.countStarted) {
            this.countStarted = true;
            this.animateStats();
          }
        });
      },
      { threshold: 0.35 }
    );
 
    if (this.statsSection?.nativeElement) {
      this.statsObserver.observe(this.statsSection.nativeElement);
    }
  }
 
  private animateStats(): void {
    const durationMs = 1400;
    const stepMs = 20;
    const steps = durationMs / stepMs;
    let tick = 0;
 
    this.countInterval = setInterval(() => {
      tick++;
      const progress = Math.min(tick / steps, 1);
 
      this.excellenceStats = this.excellenceStats.map((stat) => ({
        ...stat,
        current: Math.round(stat.value * progress)
      }));
 
      if (progress >= 1) {
        clearInterval(this.countInterval);
      }
    }, stepMs);
  }
 
  ngOnDestroy(): void {
    this.statsObserver?.disconnect();
    if (this.countInterval) {
      clearInterval(this.countInterval);
    }
  }
}
