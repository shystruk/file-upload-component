import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Services
import { FileUploadService } from './services/file-upload.service';

// App bootstrap
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FilesViewComponent } from './components/files-view/files-view.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        FileUploadComponent,
        FilesViewComponent
    ],
    providers: [ FileUploadService ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
