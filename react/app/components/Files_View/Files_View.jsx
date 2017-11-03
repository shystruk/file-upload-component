'use strict';

import React, { Component } from 'react';
import { removeFile } from './../../actions/files';
import store from './../../store';

export default class Files_View extends Component {
    constructor() {
        super();
    }

    /**
     * @param index
     */
    downloadFile(index) {
        let file = this.props.files[index];

        // You have two options here
        // 1. To get content from server
        // 2. By direct path to file

        if (file.content) {
            let blob = new Blob([file.content], { type: file.type });

            // https://github.com/eligrey/FileSaver.js/
            return void saveAs(blob, file.name);
        }

        Files_View.downloadFileByPath('https://en.wikipedia.org/wiki/Basketball');
    }

    /**
     * @param {String} path - direct path to file
     */
    static downloadFileByPath(path) {
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = path;
        a.download = file.name;
        a.click();
        document.body.removeChild(a);
    }

    /**
     * @param index
     */
    static removeFile(index) {
        store.dispatch(removeFile(index));
    }

    render() {
        let files = this.props.files;

        if (_.isEmpty(files)) {
            return null;
        }

        return <div>
            <div className="files-view">
                <div className="files-view-wrapper">

                    {files.map((file, index) => {
                       return <div className="files-view-item" key={index}>
                           <div className={"files-view-thumbnail fa " + file.thumbnail}
                                title={file.name}
                                onClick={this.downloadFile.bind(this, index)}>
                               <img className={file.preview.backgroundImage ? 'displayBlock' : 'displayNone'}
                                    src={file.preview.backgroundImage}
                                    alt={file.name} />
                           </div>

                           <div className="files-view-name" onClick={this.downloadFile.bind(this, index)} title={file.name}>
                               {file.name}
                           </div>

                           <span className="files-view-remove" onClick={Files_View.removeFile.bind(this, (index))}>x</span>
                       </div>
                    })}

                </div>
            </div>
        </div>
    }
}
