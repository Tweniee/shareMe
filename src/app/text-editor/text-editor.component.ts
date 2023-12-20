import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css',
})
export class TextEditorComponent implements OnInit {
  messageArray: any[] = [];
  sessionId = this.route.snapshot.params['sessionId'];
  editorOptions = { theme: 'vs-dark', language: 'javascript' };
  codeOutput: string = '';
  code: string = '';
  constructor(private service: SocketService, private route: ActivatedRoute) {
    this.service.getNewMessage().subscribe((item: any) => {
      if (item) {
        this.code = item;
      }
    });
   
  }
  ngOnInit(): void {
    this.service.joinRoom(this.sessionId);
    this.service.getOutputAfterExicution().subscribe((res: string) => {
      if (res) {
        this.codeOutput = res;
      }
    });
    // this.service.sendTextMessageWithId({
    //   id: this.sessionId,
    //   message: this.code,
    // });
  }
  change() {
    this.service.sendTextMessageWithId({
      id: this.sessionId,
      message: this.code,
    });
  }
}
