package com.wzy.exam_online.util;


import io.swagger.models.auth.In;

//相应的数据类
public class ResponseData<T>{

    private Boolean success;//是否请求成功

    private String code ;//响应状态码

    private String message; //响应的提示语句

    private T data;

    public ResponseData() {
    }

    public ResponseData(Boolean success, String code,String message){
        this.success=success;
        this.code=code;
        this.message=message;

    }
    public ResponseData(Boolean success, String code, String message, T data) {
        this.success = success;
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "ResponseData{" +
                "success=" + success +
                ", code=" + code +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}
