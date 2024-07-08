import { Component, computed, signal } from '@angular/core';
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
  tasks = signal<Task[]>([]);
  
    filter = signal<'all' | 'pending' | 'completed'>('all');
    tasksByFilter = computed(() => {
      const filter = this.filter();
      const tasks = this. tasks();
      if (filter === 'pending') {
          return tasks.filter(task => !task.completed);        
      }
      if (filter === 'completed') {
        return tasks.filter(task => task.completed);        
    }
    return tasks
    })
    newTaskCtrl = new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,

      ]
      
    })

injector = inject(Injector)

trackTask(){
	effects(() => {
			const tasks = this.tasks();
			localStorage.setItem('tasks', JSON.stringify(tasks));
	}, { injector: this.injector });
}

ngOnInit(){
	const storage = localStorage.getItem('tasks');
	if(storage){
		const tasks = JSON.parse(storage);
		this.tasks.set(tasks);
		}
	this.trackTasks();
}
  
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
  updateTaskEditingMode(index: number){
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if(position === index) {
          return {
            ...task, 
            editing: true
          }
        }
        return {
          ...task, 
          editing: false
        };
      })
    })
  }

  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if(position === index) {
          return {
            ...task, 
            tittle: input.value,
            editing: false
          }
        }
        return {
          ...task, 
          editing: false
        };
      })
    })
  }  
  changeFilter(filter: 'all' | 'pending' | 'completed'){
    
    this.filter.set(filter);
  }
}

