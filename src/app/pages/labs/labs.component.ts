import { Component } from '@angular/core';
import { signal } from '@angular/core'
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports : [RouterOutlet, CommonModule],
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

  person = {
    name: "Nicolas",
    age: 21,
    avatar: "https://w3schools.com/howto/img_avatar.png"
  }

  clickHandler() {
    alert("hola")
  }

  changeHandler(event : Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }
  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
