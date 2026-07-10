import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

interface ContactChannel {
  icon: 'phone' | 'mail' | 'clock';
  label: string;
  value: string;
  href: string;
}

interface OfficeLocation {
  city: string;
  region: string;
  address: string;
  isHub: boolean;
}

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements AfterViewInit, OnDestroy {
  @ViewChild('rootEl') rootEl!: ElementRef<HTMLElement>;

  companyName = 'Vedant Logistics';

  channels: ContactChannel[] = [
    {
      icon: 'phone',
      label: 'Call dispatch',
      value: '+1 (555) 240-1180',
      href: 'tel:+15552401180'
    },
    {
      icon: 'mail',
      label: 'Email the team',
      value: 'vendantlogistic@gmail.com',
      href: 'mailto:vendantlogistic@gmail.com'
    },
    {
      icon: 'clock',
      label: 'Response time',
      value: 'Under 2 business hours',
      href: ''
    }
  ];

  offices: OfficeLocation[] = [
    { city: 'Surat', region: 'Gujarat , India', address: 'Near main highway 12', isHub: true },
    { city: 'Mumbai', region: ' Maharashtra ,India', address: '445 Port Way', isHub: false },
    { city: 'Delhi', region: 'Delhi, India', address: '9 Delhi Market Road', isHub: false }
  ];

  form: FormGroup;
  status: SubmitStatus = 'idle';

  private observer?: IntersectionObserver;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
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

  fieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.form.invalid || this.status === 'sending') {
      this.form.markAllAsTouched();
      return;
    }

    this.status = 'sending';

    setTimeout(() => {
      this.status = 'sent';
      this.form.reset();

      setTimeout(() => {
        this.status = 'idle';
      }, 4000);
    }, 1400);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
