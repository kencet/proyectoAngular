import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Task} from "./../../models/task.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports : [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
    id: Date.now(),
    tittle: "Crear proyecto",
    completed: false
    },
    {
      id: Date.now(),
      tittle: "Crear proyecto2",
      completed: false
      },
  ]);

  changeHandler(event : Event) {
    const input = event.target as HTMLInputElement
    const newTask = input.value

    input.value="";
  }
    
  addTasks (tittle: string) {
  const newTask = {
    id: Date.now(),
    tittle, 
    completed: false
  }
  this.tasks.update((tasks) => [...tasks, newTask]);
  }


  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((tasks, position) => position !== index));
  }
}
