/**
 * @rxdoc service
 * @name fileUploadService
 *
 * @description
 * FileUploadService helps to upload file from UI, get thumbnail or icon related to the type of file
 *
 */

import { Injectable } from '@angular/core';
import { FILE_UPLOAD } from '../constants/file-upload.constant';
import * as _ from 'lodash';

@Injectable()
export class FileUploadService {

    public uploadFile(file: File): Promise<Object> {
        let type = file.type ? file.type.split('/')[1] : '',
            returnFile: any = {
                name: file.name,
                type: file.type
            };

        return new Promise((resolve, reject) => {
            this.getContent(type, file)
                .then((response: any) => {
                    returnFile.preview = FileUploadService.buildPreviewContent(response.preview);
                    returnFile.thumbnail = response.preview ? '' : this.getThumbnail(type);
                    returnFile.content = response.content;

                    resolve(returnFile);
                })
                .catch(() => {
                    reject();
                })
        });
    }

    private getContent(type: string, file: File): Promise<Object> {
        let isPreview = true;

        if (FILE_UPLOAD.TYPES.JPG.indexOf(type) >= 0) {
            return new Promise(resolve => {
                this.readFile(file, isPreview).then(file => {
                    resolve({preview: file});
                });
            });
        } else {
            return new Promise(resolve => {
                this.readFile(file).then(content => {
                    resolve({content});
                });
            });
        }
    }

    private readFile(file: File, isPreview?: boolean): Promise<void> {
        let reader = new FileReader();

        return new Promise(resolve => {
            reader.onload = function() {
                resolve(reader.result);
            };

            if (isPreview) {
                reader.readAsDataURL(file);
            } else {
                reader.readAsArrayBuffer(file);
            }
        });
    }

    static buildPreviewContent(content: string): string|Object {
        return content ? {backgroundImage: content} : '';
    }

    private getThumbnail(type: string): string {
        let resultType = _.find(_.keys(FILE_UPLOAD.TYPES), key => {
            return !!this.isTypeOfFileExist(FILE_UPLOAD.TYPES[key], type);
        });

        return FILE_UPLOAD.ICONS[resultType] || FILE_UPLOAD.ICONS.DEFAULT;
    }

    private isTypeOfFileExist(fileTypes: Array<string>, type: String): String {
        return _.find(fileTypes, file => {
            return type.indexOf(file) >= 0;
        });
    }
}
