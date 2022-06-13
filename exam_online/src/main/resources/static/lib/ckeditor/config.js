/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
    // 皮肤主题
    config.skin = 'office2013';
    // 添加插件【快速建立表】【改变表的尺寸】
    config.extraPlugins = 'quicktable,tableresizerowandcolumn,image2,uploadimage,codesnippet';
    config.codeSnippet_theme = 'github-dark.min'; // 【代码高亮的主题】
    // 创建表格视图行数
    config.qtRows = 6;
    // 创建表格视图列数
    config.qtColumns = 8;
    // 图像上传配置
    config.filebrowserBrowseUrl = '';
    config.filebrowserImageBrowseUrl = '';
    config.filebrowserUploadUrl = '';
    config.filebrowserImageUploadUrl = '';
    config.uploadUrl = '';

};
