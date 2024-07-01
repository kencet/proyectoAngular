import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports : [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks =  signal([
    {
    id: Date.now(),
    tittle: "Crear proyecto",
    completed: false
    },
    "pawa"
  ]);

  changeHandler(event : Event) {
    const input = event.target as HTMLInputElement
    const newTask = input.value
    this.tasks.update((tasks) => [...tasks, newTask]);
    input.value="";
  }
  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((tasks, position) => position !== index));
  }
}
