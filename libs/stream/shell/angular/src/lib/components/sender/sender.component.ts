import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";

import { IStream } from "@smartsoft001/stream-shell-dtos";

import { StreamProvider } from "../../providers";

@Component({
  selector: "smart-stream-sender",
  templateUrl: "./sender.component.html",
  styleUrls: ["./sender.component.scss"]
})
export class SenderComponent implements OnInit {
  mediaStreamConstraints: MediaStreamConstraints = {
    video: true,
    audio: true
  };
  mediaStream: MediaStream;

  item$: Observable<IStream>;

  @Input() set id(val: string) {
    this.item$ = this.provider.getById(val);
  }

  @ViewChild("videoRef", { static: false }) videoRef: ElementRef;

  constructor(private provider: StreamProvider) {}

  ngOnInit(): void {
    this.provider.init();
    navigator.mediaDevices
      .getUserMedia(this.mediaStreamConstraints)
      .then(mediaStream => {
        this.mediaStream = mediaStream;
        this.videoRef.nativeElement.srcObject = mediaStream;
        this.videoRef.nativeElement.muted = true;
      })
      .catch(error => {
        console.log("Getting user media failed", error);
      });
  }
}
