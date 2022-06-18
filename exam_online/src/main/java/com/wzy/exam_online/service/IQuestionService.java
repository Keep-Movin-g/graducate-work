package com.wzy.exam_online.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.wzy.exam_online.bean.Catalog;
import com.wzy.exam_online.bean.Question;

import java.util.List;

public interface IQuestionService  extends IService<Question> {

    //统计每个目录题目数量
    long catalogQuantities(int cid);

    /**
     * 插入多条数据
     * @param questionList 数据列表
     * @return 正确插入的数量
     */
    Integer insertSome(List<Question> questionList);

    List<Question> getByCid(Integer cid);

    Boolean  update(Question question);

    /**
     * 获得所有错题
     * @return
     */
    List<Question> getWrongQuestion();
}
