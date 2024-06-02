import { Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then( m => m.HomePage)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
      {
        path: 'comingsoon',
        loadComponent: () => import('./comingsoon/comingsoon.page').then( m => m.ComingsoonPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];