package com.wzy.exam_online.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.wzy.exam_online.bean.MyAnswer;
import com.wzy.exam_online.bean.Question;
import com.wzy.exam_online.bean.Score;

import java.util.List;

public interface IScoreService extends IService<Score>{

    //查看根据pid

    Score getScoreBypid(Integer pid);


    /**
     * 计算分数
     * 判断对错
     * 错误个数
     * @param answers 对方答题卡
     * @return 是否成功
     */
    Boolean examResult(List<MyAnswer> answers);




}
