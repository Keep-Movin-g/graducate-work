package com.wzy.exam_online.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wzy.exam_online.bean.MyAnswer;
import com.wzy.exam_online.dao.MyAnswerDao;
import com.wzy.exam_online.service.IMyAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyAnswerService extends ServiceImpl<MyAnswerDao, MyAnswer> implements IMyAnswerService {
    /**
     * 插入多个数据
     *
     * @param list
     * @return 成功插入的个数
     */

    @Autowired
    private MyAnswerDao myAnswerDao;

    @Override
    public Integer insertMyAnswerList(List<MyAnswer> list) {
        return  myAnswerDao.insertMyAnswerList(list);
    }
}
