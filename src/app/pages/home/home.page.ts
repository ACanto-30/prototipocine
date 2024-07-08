import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CinemaApiService } from "../../services/cinema-api.service";
import { NavController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage implements OnInit {
  movies: any[] = [];

  constructor(private moviesApiService: CinemaApiService, private navCtrl: NavController) { }

  goToMovieDetail(movieId: number) {
    this.navCtrl.navigateForward(`/movie-detail/${movieId}`);
  }

  ngOnInit() {
    console.log('Fetching movies from API...');
    this.moviesApiService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (error) => {
        console.error('Error fetching movies', error);
      },
      complete: () => {
        console.log('Movies fetch complete');
      }
    });
  }
}
