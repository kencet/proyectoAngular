import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Task } from "./../../models/task.model";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports : [RouterOutlet, CommonModule, ReactiveFormsModule],
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

    newTaskCtrl = new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,

      ]
      
    })

  changeHandler() {
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim();
      if(value!== ''){
        this.addTasks(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }
  addTasks (tittle: string) {
    const newTask = {
      id: Date.now(),
      tittle, 
      completed: false
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
    }
  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((tasks, position) => position !== index));
  }
  toggleChecked(task: Task) {
    task.completed = !task.completed;
  }
  
  updateTask(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === index) {
          return {
            ...task, 
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }
}