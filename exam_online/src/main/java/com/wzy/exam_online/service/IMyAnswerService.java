package com.wzy.exam_online.service;

import com.baomidou.mybatisplus.extension.service.IService;

import com.wzy.exam_online.bean.MyAnswer;

import java.util.List;

public interface IMyAnswerService extends IService<MyAnswer> {
    //多插

    /**
     * 插入多个数据
     * @param list
     * @return 成功插入的个数
     */

    Integer insertMyAnswerList(List<MyAnswer> list);

}
