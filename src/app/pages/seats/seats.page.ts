import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonProgressBar,
  IonButtons,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol, NavController
} from '@ionic/angular/standalone'
import {CinemaApiService} from "../../services/cinema-api.service";
import { CharPipe } from 'src/app/pipes/char.pipe';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.page.html',
  styleUrls: ['./seats.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    CommonModule,
    IonProgressBar,
    IonButtons,
    IonIcon,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    CharPipe
  ]

})
export class SeatsPage implements OnInit {
  title: string = 'Seats';
  showtimeHourId: string = '';
  occupiedSeats: any; // Lista de posiciones ocupadas
  selectedSeats: any[] = [];

  private dataLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private navCtrl: NavController, private movieApiService: CinemaApiService, private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    if (state) {
      this.showtimeHourId = state['showtimeHourId'];
      if (this.showtimeHourId) {
        this.movieApiService.getSeatsFromShowtimeHours(this.showtimeHourId).subscribe({
          next: (data) => {
            this.occupiedSeats = data;
          },
          error: (error) => {
            console.error('Error fetching seats', error);
          },
          complete: () => {
            console.log('Seats fetch complete');
            console.log(this.occupiedSeats);
            this.dataLoaded.next(true);
          }
        });
      } else {
        console.error('No showtimeHourId ID found in route parameters');
      }
    }
  }

  ngAfterViewInit() {
    this.dataLoaded.subscribe((isLoaded) => {
      if (isLoaded) {
        this.disableOccupiedSeats();
      }
    });
  }

  disableOccupiedSeats() {
    this.occupiedSeats.forEach((seat: { position: string }) => {
      const button = this.el.nativeElement.querySelector(`.${seat.position}`);
      console.log(button);
      if (button) {
        this.renderer.setAttribute(button, 'disabled', 'true');
      }
    });
  }
  

  toggleSeatSelection(seat: { idSeat: number, position: string }) {
    console.log(seat.idSeat);
    const index = this.selectedSeats.findIndex(s => s.idSeat === seat.idSeat);
    console.log(index);
    const button = this.el.nativeElement.querySelector(`.${seat.position}`);

    if (index > -1) {
      this.selectedSeats.splice(index, 1);
      if (button) {
        this.renderer.removeClass(button, 'selected');
        console.log(this.selectedSeats);
      }
    } else {
      this.selectedSeats.push(seat);
      if (button) {
        this.renderer.addClass(button, 'selected');
        console.log(this.selectedSeats);
      }
    }
  }

  getPosition(rowIndex: number, colIndex: number): string {
    const rowChar = String.fromCharCode('A'.charCodeAt(0) + rowIndex);
    return `${rowChar}${colIndex + 1}`;
  }
  
  /*selectSeat(seat: Seat) {
    // Lógica para seleccionar/deseleccionar asientos
    if (seat.status === 'available') {
      seat.status = 'selected';
      this.selectedSeats.push(seat);
    } else if (seat.status === 'selected') {
      seat.status = 'available';
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
    }
  }*/


  /*private initializeSeats() {
    // Ejemplo de inicialización de asientos
    const totalRows = 3;
    const seatsPerRow = 8;
    let seatId = 1;

    for (let row = 0; row < totalRows; row++) {
      const rowSeats: Seat[] = [];
      for (let col = 0; col < seatsPerRow; col++) {
        // Ejemplo de estado inicial, ajusta según tu lógica
        const status = Math.random() > 0.5 ? 'available' : 'reserved';
        rowSeats.push({ id: seatId++, status });
      }
      this.seats.push(rowSeats);
    }
  }*/

  goToUserData() {
    this.router.navigate(['/user-data']);
    console.log('Selected seats:', this.selectedSeats);
  }
  

  navigateBack() {
    this.router.navigate(['/selection']);
  }
}
