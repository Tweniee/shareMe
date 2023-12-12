import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment.development';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { HomeComponent } from './home/home.component';

const config: SocketIoConfig = {
  url: environment.socketUrl, // socket server url;
  options: {},
};

@NgModule({
  declarations: [AppComponent, TextEditorComponent, HomeComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    MonacoEditorModule.forRoot(), // use forRoot() in main app module only.
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
