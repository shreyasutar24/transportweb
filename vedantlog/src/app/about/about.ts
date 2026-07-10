
import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}
 
interface Milestone {
  year: string;
  title: string;
  description: string;
}
 
interface Pillar {
  icon: 'target' | 'eye' | 'bolt';
  title: string;
  description: string;
}
 

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit, OnDestroy {
  @ViewChild('rootEl') rootEl!: ElementRef<HTMLElement>;
 
  companyName = 'Meridian Logistics';
 
  stats: Stat[] = [
    { value: 46, suffix: '', label: 'Countries served' },
    { value: 12, suffix: 'M+', label: 'Shipments moved / year' },
    { value: 3200, suffix: '+', label: 'Vehicles & vessels' },
    { value: 99, suffix: '.4%', label: 'On-time delivery' }
  ];
 
  milestones: Milestone[] = [
    {
      year: '2014',
      title: 'First route',
      description:
        'Started with a single truck and one contracted route between two coastal warehouses.'
    },
    {
      year: '2017',
      title: 'Regional hub network',
      description:
        'Opened our first three cross-dock hubs, cutting average transit time by a third.'
    },
    {
      year: '2020',
      title: 'Live tracking launched',
      description:
        'Rolled out real-time shipment visibility across every mode we operate.'
    },
    {
      year: '2024',
      title: 'Global footprint',
      description:
        'Crossed 46 countries, connecting ocean, air, rail and road under one network.'
    }
  ];
 
  pillars: Pillar[] = [
    {
      icon: 'target',
      title: 'Reliability',
      description:
        'Every shipment runs on a plan built for delays before they happen, not after.'
    },
    {
      icon: 'eye',
      title: 'Transparency',
      description:
        'You see what we see: live location, dwell time, and the next handoff.'
    },
    {
      icon: 'bolt',
      title: 'Speed',
      description:
        'Routes are re-optimized continuously against traffic, weather, and capacity.'
    }
  ];
 
  private observer?: IntersectionObserver;
  private countersStarted = false;
 
  ngAfterViewInit(): void {
    const root = this.rootEl.nativeElement;
    const revealEls = root.querySelectorAll('.reveal');
    const statsSection = root.querySelector('.stats');
 
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
 
          if (entry.target === statsSection && !this.countersStarted) {
            this.countersStarted = true;
            this.animateCounters();
          }
        });
      },
      { threshold: 0.2 }
    );
 
    revealEls.forEach((el) => this.observer!.observe(el));
  }
 
  private animateCounters(): void {
    const root = this.rootEl.nativeElement;
    const counterEls = root.querySelectorAll<HTMLElement>('.stat-value');
    const duration = 1400;
 
    counterEls.forEach((el, i) => {
      const target = this.stats[i]?.value ?? 0;
      const start = performance.now();
 
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString();
 
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString();
        }
      };
 
      requestAnimationFrame(step);
    });
  }
 
  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
