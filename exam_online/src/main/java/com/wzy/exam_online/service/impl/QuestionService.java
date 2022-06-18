package com.wzy.exam_online.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wzy.exam_online.bean.Question;
import com.wzy.exam_online.dao.QuestionDao;
import com.wzy.exam_online.service.IQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService extends ServiceImpl<QuestionDao, Question>implements IQuestionService {

    @Autowired
    private  QuestionDao questionDao;

    @Override
    public long catalogQuantities(int cid) {
        LambdaQueryWrapper<Question> wq= new LambdaQueryWrapper<>();
        wq.eq(Question::getCatalogId,cid);
        return questionDao.selectCount(wq);

    }

    @Override
    public Integer insertSome(List<Question> questionList) {
        int count=0;
        for (Question question : questionList) {
            count=this.save(question)?count+1:count;
        }
        return count;

    }

    @Override
    public List<Question> getByCid(Integer cid) {
        LambdaQueryWrapper<Question> lwq = new LambdaQueryWrapper<>();
        lwq.eq(Question::getCatalogId,cid);
        lwq.orderByAsc(Question::getTypeId);
        return questionDao.selectList(lwq);
    }

    @Override
    public Boolean update(Question question) {
        return null;
    }

    /**
     * 获得所有错题
     *
     * @return
     */
    @Override
    public List<Question> getWrongQuestion() {
        return questionDao.getWrongQuestion();
    }


}
