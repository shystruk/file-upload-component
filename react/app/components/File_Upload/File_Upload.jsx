'use strict';

import React, { Component } from 'react';
import store from './../../store';
import { addFile } from './../../actions/files';
import { uploadFile } from './../../services/fileUploadService';

export default class File_Upload extends Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * @param {Object} event
     */
    handleChange(event) {
        _.each(event.target.files, file => {
            uploadFile(file).then(uploadedFile => {
                store.dispatch(addFile(uploadedFile));
            });
        });

        // allow to upload the same file twice in a row
        event.target.value = '';
    }

    render() {
        return <div>
            <div className="file-upload">
                <input type="file" name="file" onChange={this.handleChange} id="fileUpload" multiple/>
                <label htmlFor="fileUpload">Add File</label>
            </div>
        </div>
}
}
