import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import * as _ from 'lodash';
const FileSaver = require('file-saver');

@Component({
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html',
    styleUrls: ['file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
    files: Array<any> = [];

    constructor(
        private fileUploadService: FileUploadService,
    ) {}

    ngOnInit(): void {}

    pushFiles(event: any = {}): Promise<void> {
        return Promise
            .all(_.map(event.target.files, (file: any) => {
                return this.pushFileToScope(file);
            }))
            .then(() => {
                event.target.value = '';
            });
    }

    removeFile(index: number): void {
        this.files.splice(index, 1);
    }

    downloadFile(index: number): Promise<Object> {
        let file = this.files[index];

        // You have two options here
        // 1. To get content from server
        // 2. By direct path to file

        if (file.content) {
            let blob = new Blob([file.content], { type: file.type });

            // https://www.npmjs.com/package/file-saver
            FileSaver.saveAs(blob, file.name);

            return Promise.reject({});
        }

        return Promise.resolve('https://static.pexels.com/photos/38136/pexels-photo-38136.jpeg');
    }

    pushFileToScope(file: File): Promise<void> {
        return this.fileUploadService.uploadFile(file)
            .then(uploadedFile => {
                this.files.push(uploadedFile);
            })
            .catch(()=>{})
    }
}
