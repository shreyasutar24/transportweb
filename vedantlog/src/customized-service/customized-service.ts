import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
 
interface ServiceModule {
  id: string;
  icon: 'route' | 'warehouse' | 'truck' | 'api' | 'manager' | 'shield';
  title: string;
  description: string;
}
 
interface ProcessStep {
  step: string;
  title: string;
  description: string;
}
 
interface Industry {
  icon: 'retail' | 'factory' | 'pharma' | 'commerce';
  label: string;
}
 

@Component({
  selector: 'app-customized-service',
  imports: [],
  templateUrl: './customized-service.html',
  styleUrl: './customized-service.css',
  animations: [
    trigger('chipAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px) scale(0.9)' }),
        animate('220ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('180ms ease-in', style({ opacity: 0, transform: 'translateY(-6px) scale(0.9)' }))
      ])
    ])
  ]

})
export class CustomizedService implements AfterViewInit, OnDestroy{
   @ViewChild('rootEl') rootEl!: ElementRef<HTMLElement>;
 
  companyName = 'Meridian Logistics';
 
  modules: ServiceModule[] = [
    {
      id: 'fleet',
      icon: 'truck',
      title: 'Dedicated fleet',
      description: 'Vehicles reserved for your volume only — no shared capacity, no bumped loads.'
    },
    {
      id: 'warehouse',
      icon: 'warehouse',
      title: 'Flexible warehousing',
      description: 'Scale storage up or down monthly as your inventory cycles shift.'
    },
    {
      id: 'routing',
      icon: 'route',
      title: 'Custom route planning',
      description: 'Routes built around your delivery windows, not our default network.'
    },
    {
      id: 'api',
      icon: 'api',
      title: 'Real-time API integration',
      description: 'Plug shipment data straight into your own systems and dashboards.'
    },
    {
      id: 'account',
      icon: 'manager',
      title: 'Dedicated account manager',
      description: 'One person who knows your account, on call during your business hours.'
    },
    {
      id: 'insurance',
      icon: 'shield',
      title: 'Custom cargo insurance',
      description: 'Coverage sized to what you actually ship, not a flat-rate policy.'
    }
  ];
 
  selectedIds = new Set<string>(['fleet', 'routing']);
 
  processSteps: ProcessStep[] = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We map your current shipping pattern, pain points, and growth plans.'
    },
    {
      step: '02',
      title: 'Custom plan',
      description: 'You pick the modules that matter; we price only what you use.'
    },
    {
      step: '03',
      title: 'Integration',
      description: 'Systems connect, fleet is assigned, and your account manager is introduced.'
    },
    {
      step: '04',
      title: 'Ongoing optimization',
      description: 'Routes and capacity are re-tuned every quarter against your real data.'
    }
  ];
 
  industries: Industry[] = [
    { icon: 'retail', label: 'Retail' },
    { icon: 'factory', label: 'Manufacturing' },
    { icon: 'pharma', label: 'Pharma & cold chain' },
    { icon: 'commerce', label: 'E-commerce' }
  ];
 
  private observer?: IntersectionObserver;
 
  get selectedModules(): ServiceModule[] {
    return this.modules.filter((m) => this.selectedIds.has(m.id));
  }
 
  isSelected(id: string): boolean {
    return this.selectedIds.has(id);
  }
 
  toggleModule(id: string): void {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
  }
 
  ngAfterViewInit(): void {
    const revealEls = this.rootEl.nativeElement.querySelectorAll('.reveal');
 
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );
 
    revealEls.forEach((el) => this.observer!.observe(el));
  }
 
  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
