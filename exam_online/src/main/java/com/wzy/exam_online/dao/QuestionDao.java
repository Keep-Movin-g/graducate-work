package com.wzy.exam_online.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wzy.exam_online.bean.MyAnswer;
import com.wzy.exam_online.bean.Question;
import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface QuestionDao  extends BaseMapper<Question> {


    //按相应qid查找题目
    List<Question> makeQuestionList(@Param("qids") List<Integer> qids);

    //按相应cid查找题目
    List<Integer> getQuestionsIdByCid(@Param("cids") List<Integer> cids);

    //根据qid 查找答案

    List<MyAnswer> getAnswerByQid(@Param("qids") List<Integer> qids);

    //查询考试后的信息
    List<Question> getLastExam(@Param("pid") Integer pid);

    //错题集
    //
    List<Question> getWrongQuestion();
}
