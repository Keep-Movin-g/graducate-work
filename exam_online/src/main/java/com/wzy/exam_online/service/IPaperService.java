package com.wzy.exam_online.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.wzy.exam_online.bean.Paper;
import com.wzy.exam_online.bean.Question;
import org.apache.ibatis.annotations.Param;


import java.util.List;

public interface IPaperService extends IService<Paper> {
    /**
     * 删除
     * @param id
     * @return
     */
    Boolean  delete(Integer id);
    //增加

    /**
     * 查看全部
     * @return
     */
    List<Paper> getAll();


    //生成

    /**
     * 按相应pid查找错题
     * @param pids
     * @return
     */
    String getWrongQuestionsIdByPid(List<Integer> pids);


    /**
     * 根据cid生成题目列表
     * @param cids
     * @return
     */
    String getQuestionsIdByCid(List<Integer> cids);


    /**
     * 创建试卷对应的题目
     * @param paper
     * @param qidStr
     * @return
     */
    Boolean createPaper(Paper paper);

    //出题
    /**
     * 按相应qid查找题目
     * @param qids
     * @return
     */
    List<Question> makeQuestionList(List<Integer> qids);

    /**
     * 按相应pid查找题目
     * @param pid
     * @return
     */
    List<Question> getQuestionsIdByPid(Integer pid);






    /**
     * 显示做题详情 //查询考试后的信息
     * @param pid
     * @return 题目列表
     */
    List<Question> getLastExam(Integer pid);




}
