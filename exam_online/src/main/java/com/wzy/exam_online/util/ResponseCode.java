package com.wzy.exam_online.util;

/**
 * 响应状态码
 */
public class ResponseCode {

    //////////////// 关于登录的 //////////////////////////////////
    public static final String LOGIN_ED = "A_001"; // 已经登陆
    public static final String LOGIN_NO = "A_002"; // 未登陆
    public static final String LOGIN_CHANGE = "A_003"; // 切换登录用户
    public static final String LOGIN_EXCEPTION = "A_004"; // 登录异常


    //////////////// 关于SQL语句的 //////////////////////////////////

    public static final String INSERT_OK = "B_001"; // 新增成功
    public static final String INSERT_ERROR = "B_002"; // 新增失败
    public static final String INSERT_EXCEPTION = "B_003"; // 新增异常

    public static final String DELETE_OK = "B_004"; // 删除成功
    public static final String DELETE_ERROR = "B_005"; // 删除失败
    public static final String DELETE_EXCEPTION = "B_006"; // 删除异常

    public static final String UPDATE_OK = "B_007"; // 修改成功
    public static final String UPDATE_ERROR = "B_008"; // 修改失败
    public static final String UPDATE_EXCEPTION = "B_009"; // 修改异常

    public static final String SELECT_OK = "B_010"; // 查询成功
    public static final String SELECT_EXCEPTION = "B_011"; // 查询失败
    public static final String SELECT_NONE = "B_012"; // 查询失败

    //////////////// 关于匹配的 //////////////////////////////////

    public static final String MATCH_EMAIL_ERROR = "C_001"; // 匹配邮箱失败
    public static final String MATCH_PASSWORD_ERROR = "C_002"; // 匹配密码失败
    public static final String MATCH_DATE_ERROR = "C_003"; // 匹配日期失败
    public static final String MATCH_PHONE_ERROR = "C_004"; // 匹配手机号失败
    public static final String MATCH_OLD_PASSWORD_ERROR = "C_005"; // 匹配旧密码失败
    public static final String MATCH_VERIFICATION_CODE_ERROR = "C_006"; // 匹配验证码失败
    public static final String MATCH_NICKNAME_ERROR = "C_007"; // 匹配昵称失败
    public static final String MATCH_AUTOGRAPH_ERROR = "C_008"; // 匹配个性签名失败
    public static final String MATCH_ARTICLE_TITLE_ERROR = "C_009"; // 匹配文章标题失败
    public static final String MATCH_ARTICLE_VISIBLE_ERROR = "C_010"; // 匹配文章可见失败
    public static final String MATCH_ARTICLE_MARKING_ERROR = "C_011"; // 匹配文章标记失败
    public static final String MATCH_ARTICLE_REPRINT_URL_ERROR = "C_012"; // 匹配文章转载地址失败
    public static final String MATCH_ARTICLE_LABEL_ERROR = "C_013"; // 匹配文章标签失败
    public static final String MATCH_ARTICLE_CONTEXT_ERROR = "C_014"; // 匹配文章内容失败
    public static final String MATCH_ARTICLE_UPLOAD_FILE_ERROR = "C_015"; // 匹配上传源文件失败
    public static final String MATCH_ARTICLE_UPLOAD_FILE_EVENT_ERROR = "C_016"; // 匹配上传文件事件失败
    public static final String MATCH_ARTICLE_SEX_ERROR = "C_017"; // 匹配性别失败
    public static final String MATCH_ARTICLE_BLOOD_TYPE_ERROR = "C_018"; // 匹配性别失败


    //////////////// 关于发送的 //////////////////////////////////

    public static final String SEND_EMAIL_VERIFICATION_CODE_OK = "D_001"; // 发送邮箱验证码成功
    public static final String SEND_EMAIL_VERIFICATION_CODE_ERROR = "D_002"; // 发送邮箱验证码失败
    public static final String SEND_EMAIL_VERIFICATION_CODE_NO = "D_003"; //为发送验证码

    //////////////// 关于其他的 //////////////////////////////////
    public static final String UPLOAD_OK = "Z_001"; // 上传成功
    public static final String UPLOAD_ERROR = "Z_002"; // 上传失败
    public static final String DOWNLOAD_OK = "Z_003"; // 下载成功
    public static final String DOWNLOAD_ERROR = "Z_004"; // 下载失败


}
