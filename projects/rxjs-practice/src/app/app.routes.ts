import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'events', 
        loadComponent: () => import('./events-streams/events-streams').then(m => m.EventsStreams)
    }
];
