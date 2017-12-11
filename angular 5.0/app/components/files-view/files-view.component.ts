/**
 * @rxdoc component
 * @name filesView
 *
 * @description
 * filesView is a UI Component that allows to display, download, remove files.
 * Component is displayed a thumbnail and name of a file.
 * Also, you can configure remove, download file.
 *
 * Example:
 * <files-view [files]="files"
 *             [removeFile]="removeFile"
 *             [downloadFile]="downloadFile">
 * </files-view>
 */

import { Component, Input } from '@angular/core';

@Component({
    selector: 'files-view',
    templateUrl: 'files-view.component.html',
    styleUrls: ['files-view.component.css']
})

export class FilesViewComponent {
    @Input() files: Array<Object> = [];
    @Input() removeFile: Function;
    @Input() downloadFile: Function;

    download(index: number) {
        let file:any = this.files[index];

        this.downloadFile(index)
            .then(function (path: string) {
                setTimeout(() => {
                    let a = document.createElement('a');
                    document.body.appendChild(a);
                    a.style.display = 'none';
                    a.href = path;
                    a.download = file.name;
                    a.click();
                    document.body.removeChild(a);
                }, 0);
            })
            .catch(()=>{});
    }
}
