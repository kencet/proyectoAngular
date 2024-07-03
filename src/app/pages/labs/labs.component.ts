import { Component } from '@angular/core';
import { signal } from '@angular/core'
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports : [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Primera app con Angular';
  tasks =  signal([
    "pawa",
    "pawa2",
    "pawa3"
  ]);
  name = signal("Peter");
  age = 18;
  disabled = true;
  img = "https://w3schools.com/howto/img_avatar.png";

  person = signal({
    name: "nicolas",
    age: 21,
    avatar: "https://w3schools.com/howto/img_avatar.png"
  })

  colorCtrl = new FormControl();

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value) 
    })
  }

  clickHandler() {
    alert("hola")
  }

  changeHandler(event : Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }
  changeAge(event : Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ... prevState,
        age: parseInt(newValue, 10)
      }
    });
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
