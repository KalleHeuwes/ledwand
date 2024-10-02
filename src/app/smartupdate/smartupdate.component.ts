import { Component, model, OnInit } from '@angular/core';

@Component({
  selector: 'app-smartupdate',
  standalone: true,
  imports: [],
  templateUrl: './smartupdate.component.html',
  styleUrl: './smartupdate.component.css'
})
export class SmartupdateComponent implements OnInit {
  ngOnInit(): void {
    console.log('Method not implemented.');
  }

  public opt: string = '';
  public opts = ["a", "b"];
  public cars = [
    {model: "Smart", color: "blue"}, 
    {model: "Fiat 500", color: "green"}
  ];
  test1(){
    alert('Hallo, Welt !');
  }
}
