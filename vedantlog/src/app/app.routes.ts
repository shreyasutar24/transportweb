import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Services } from './services/services';
import { About } from './about/about';
import { Gctracking } from './gctracking/gctracking';
import { Contact } from './contact/contact';
import { ExcellenceService } from '../excellence-service/excellence-service';
import { CustomizedService } from '../customized-service/customized-service';

export const routes: Routes = [
  {
        path: '',
        component: Home
    },
    {
        path: 'about',
        component: About
    },
     {
        path: 'services',
        component: Services
    },
    {
        path:'gctracking',
        component:Gctracking
    },
    {
        path:'contact',
        component:Contact
    },
    {
        path:'excellence-service',
        component:ExcellenceService
    },
{
        path:'customized-service',
        component:CustomizedService
    },

    
    


];
