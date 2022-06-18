package com.wzy.exam_online.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wzy.exam_online.bean.Paper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface PaperDao extends BaseMapper<Paper> {

    //按相应pid查找题目
    List<String> getQuestionsIdByPid(@Param("pids") List<Integer> pids);

    //按相应pid查找错题
    List<String> getWrongQuestionsIdByPid(@Param("pids") List<Integer> pids);

    List<Paper> getOverAll();
}
