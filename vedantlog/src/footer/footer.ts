import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
export interface FooterLink {
  label: string;
  url: string;
}
 
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear: number = new Date().getFullYear();
 
  newsletterEmail: string = '';
  isSubscribing: boolean = false;
  subscribed: boolean = false;
 
  companyLinks: FooterLink[] = [
    { label: 'About Us', url: '/about' },
    { label: 'Careers', url: '/careers' },
    { label: 'Our Fleet', url: '/fleet' },
    { label: 'Blog', url: '/blog' }
  ];
 
  serviceLinks: FooterLink[] = [
    { label: 'GC Tracking', url: '/gctracking' },
    { label: 'Full Truck Load', url: '/services/ftl' },
    { label: 'Part Load (LTL)', url: '/services/ltl' },
    { label: 'Warehousing', url: '/services/warehousing' }
  ];
 
  supportLinks: FooterLink[] = [
    { label: 'Help Center', url: '/help' },
    { label: 'Raise a Ticket', url: '/support/ticket' },
    { label: 'Terms of Service', url: '/terms' },
    { label: 'Privacy Policy', url: '/privacy' }
  ];
 
  socialLinks: SocialLink[] = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'M13 22v-9h3l1-4h-4V6.5C13 5.36 13.36 5 14.5 5H17V1.14C16.65 1.1 15.4 1 14.05 1 11.14 1 9 2.79 9 6.14V9H6v4h3v9h4z' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7A11.7 11.7 0 013 4.9a4.1 4.1 0 001.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 01-1.9.1 4.1 4.1 0 003.8 2.8A8.3 8.3 0 012 18.4a11.7 11.7 0 006.3 1.8c7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.6 1.5-1.3 2.1-2.2z' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.35-.02-3.08-1.88-3.08-1.88 0-2.17 1.47-2.17 2.98V21H9z' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'M12 2c2.7 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.16.55.55.9 1.1 1.16 1.77.25.64.42 1.37.47 2.43C22 8.94 22 9.3 22 12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.16 1.77 4.9 4.9 0 01-1.77 1.16c-.64.25-1.37.42-2.43.47C15.06 22 14.7 22 12 22s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.77-1.16 4.9 4.9 0 01-1.16-1.77c-.25-.64-.42-1.37-.47-2.43C2 15.06 2 14.7 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.16-1.77a4.9 4.9 0 011.77-1.16c.64-.25 1.37-.42 2.43-.47C8.94 2 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z' }
  ];
 
  subscribeNewsletter(): void {
    if (!this.newsletterEmail.trim() || this.isSubscribing) {
      return;
    }
    this.isSubscribing = true;
 
    // Simulated subscribe call — replace with a real newsletter API call.
    setTimeout(() => {
      this.isSubscribing = false;
      this.subscribed = true;
      this.newsletterEmail = '';
      setTimeout(() => (this.subscribed = false), 4000);
    }, 900);
  }
}

