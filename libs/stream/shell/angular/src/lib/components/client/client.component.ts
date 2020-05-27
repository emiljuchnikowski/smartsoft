import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'smart-stream-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  source = "http://techslides.com/demos/sample-videos/small.mp4";

  constructor() { }

  ngOnInit() {

  }
}
