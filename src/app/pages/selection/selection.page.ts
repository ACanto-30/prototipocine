import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
  IonIcon,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  NavController,

} from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { CinemaApiService } from "../../services/cinema-api.service";

@Component({
  selector: 'app-selection',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonButton,
    IonIcon,
    IonDatetime,
    IonDatetimeButton,
    IonModal
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectionPage implements OnInit {
  showtimes: any;
  title: string = 'Selection';
  selectedDay: string = '';
  selectedTime: string = '';

  constructor(private router: Router, private movieApiService : CinemaApiService, private route:ActivatedRoute, private navCtrl:NavController) {
    addIcons ({ arrowBackOutline })
  }

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    console.log(movieId)
    if (movieId) { // Verificar si movieId no es null
      this.movieApiService.getShowtimeHours(movieId).subscribe({
        next: (data) => {
          this.showtimes = data;
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

  onDaySelected(event: any) {
    this.selectedDay = event.detail.value;
  }

  onTimeSelected(event: any) {
    this.selectedTime = event.detail.value;
  }

  goToSelectSeats(showtimeHour: string) {
    // Encuentra el día seleccionado
    const showtime = this.showtimes.find((s: any) => s.showtimeDate === this.selectedDay);
    if (showtime) {
      // Encuentra la hora seleccionada en el día seleccionado
      const showtimeHourObj = showtime.showtimeHours.find((s: any) => s.showtimeHour === showtimeHour);
      if (showtimeHourObj) {
        this.navCtrl.navigateForward(`seats`, {
          state: { showtimeHourId: showtimeHourObj.idShowtimeHour }
        });
      } else {
        console.error('Hora seleccionada no encontrada');
      }
    } else {
      console.error('Día seleccionado no encontrado');
    }
  }


  getShowtimeHoursForDay(day: string) {
    const showtime = this.showtimes.find((s: any) => s.showtimeDate === day);
    return showtime ? showtime.showtimeHours : [];
  }

  /*goToSeats() {
    this.router.navigate(['/seats']);
    console.log('Selected Day:', this.selectedDay);
    console.log('Selected Time:', this.selectedTime);
  }*/
  navigateBack() {
    this.router.navigate(['/home']);
  }
}
