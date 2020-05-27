import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'smart-stream-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss']
})
export class SenderComponent implements OnInit {
  mediaStreamConstraints: MediaStreamConstraints = {
    video: true,
    audio: true
  };
  mediaStream: MediaStream;

  @ViewChild('videoRef', { static: false }) videoRef: ElementRef;

  constructor() { }

  ngOnInit() {
    navigator.mediaDevices.getUserMedia(this.mediaStreamConstraints)
        .then(mediaStream => {
          this.mediaStream = mediaStream;
          this.videoRef.nativeElement.srcObject = mediaStream;
          this.videoRef.nativeElement.muted = true;
        })
        .catch(error => {
          console.log('Getting user media failed', error);
        });
  }

}
