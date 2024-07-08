import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonButton,
  NavController
} from '@ionic/angular/standalone';
import { CinemaApiService } from "../../services/cinema-api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardTitle, IonButton]
})
export class MovieDetailPage implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private movieApiService: CinemaApiService,
    private navCtrl : NavController
  ) { }

  goToShowtimeHours(movieId: number) {
    this.navCtrl.navigateForward(`selection/${movieId}`);
  }

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    console.log(movieId)
    if (movieId) { // Verificar si movieId no es null
      this.movieApiService.getMovie(movieId).subscribe({
        next: (data) => {
          this.movie = data;
        },
        error: (error) => {
          console.error('Error fetching movie details', error);
        },
        complete: () => {
          console.log('Movie details fetch complete');
        }
      });
    } else {
      console.error('No movie ID found in route parameters');
    }
  }


}
