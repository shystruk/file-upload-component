# File Upload components
Here you may find React and Angular components for file upload with multiple file selection, preview images, download, file thumbnail.

![](demo.gif)

## Angular 5.0
```
<file-upload></file-upload>

<files-view [files]="files"
            [removeFile]="callback"
            [downloadFile]="callback">
</files-view>
```

## Angular 1.6
```
<file-upload></file-upload>

<files-view files="="
            remove-file="&"
            download-file="&">
</files-view>
```

## React 16.0
```
<File_Upload/>

<Files_View files={files}/>
```
