(function () {
'use strict';

    angular.module('app').constant('FILE_UPLOAD', {

        TYPES: {
            JPG: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tga', 'tif', 'tiff'],
            DOC: ['text', 'doc', 'docx', 'odt'],
            XLS: ['xls', 'xlsx', 'ods'],
            PPT: ['ppt', 'pptx', 'odp'],
            TXT: ['plain', 'txt', 'log'],
            AVI: ['mp4', 'avi', 'mov', 'wmv', 'mpg', 'flv'],
            ZIP: ['rar', 'zip', '7z', 'gzip', 'gz', 'zipx'],
            PDF: ['pdf'],
            HTML: ['html'],
            JS: ['javascript'],
            JAVA: ['java'],
            XML: ['xml']
        },

        ICONS: {
            JPG: 'icon_class_jpg',
            DOC: 'icon_class_doc',
            XLS: 'icon_class_xls',
            PPT: 'icon_class_ppt',
            TXT: 'icon_class_txt',
            AVI: 'icon_class_avi',
            ZIP: 'icon_class_zip',
            PDF: 'icon_class_pdf',
            HTML: 'icon_class_html',
            JS: 'icon_class_js',
            JAVA: 'icon_class_java',
            XML: 'icon_class_xml',
            DEFAULT: 'icon_class_default'
        },
    });
})();
