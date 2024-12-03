import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../model/models';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private roomSubject = new BehaviorSubject<Room[]>([]);
  rooms$ = this.roomSubject.asObservable();

  addRoom(roomItem: Room): void {
    const currentRooms = this.roomSubject.value;
    this.roomSubject.next([...currentRooms, roomItem]);
  }

  updateRoom(updatedRoom: Room): void {
    const currentRooms = this.roomSubject.value.map((roomItem) =>
      roomItem.id === updatedRoom.id ? updatedRoom : roomItem
    );
    this.roomSubject.next(currentRooms);
  }

  deleteRoom(id: number): void {
    const currentRooms = this.roomSubject.value.filter(
      (roomItem) => roomItem.id !== id
    );
    this.roomSubject.next(currentRooms);
  }
}
