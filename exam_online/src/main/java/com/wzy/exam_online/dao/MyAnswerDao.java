package com.wzy.exam_online.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wzy.exam_online.bean.MyAnswer;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface MyAnswerDao extends BaseMapper<MyAnswer> {
    //多查

    //多插
    Integer insertMyAnswerList(List<MyAnswer> list);

}
