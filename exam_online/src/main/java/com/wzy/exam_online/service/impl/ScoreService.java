package com.wzy.exam_online.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.support.SFunction;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wzy.exam_online.bean.MyAnswer;
import com.wzy.exam_online.bean.Paper;
import com.wzy.exam_online.bean.Score;
import com.wzy.exam_online.dao.QuestionDao;
import com.wzy.exam_online.dao.ScoreDao;
import com.wzy.exam_online.service.IScoreService;
import com.wzy.exam_online.util.MyUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.security.util.Length;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Service
public class ScoreService extends ServiceImpl<ScoreDao, Score> implements IScoreService {

    @Autowired
    private ScoreDao scoreDao;
    @Autowired
    private PaperService paperService;
    @Autowired
    private  QuestionDao questionDao;
    @Autowired
    private MyAnswerService myAnswerService;
    //查看根据pid
    @Override
    public Score getScoreBypid(Integer pid) {
        LambdaQueryWrapper<Score> lwq = new LambdaQueryWrapper<>();
        lwq.eq(Score::getPaperId,pid);

        return scoreDao.selectOne(lwq);
    }

    /**
     * 计算分数
     * 判断对错
     * 错误个数
     *
     * @param answers 对方答题卡
     * @return 是否成功
     */
    @Override
    public Boolean examResult(List<MyAnswer> answers) {
        Integer wrongCount=0;

        if(answers.size()<1){
            return  false;
        }
        //获取试卷
        Paper paper = paperService.getById(answers.get(0).getPid());
        if(paper.getPaperState()==1){
            return false;
        }
        //获取正确答案
        Integer[] qids = MyUtil.StringToInt(paper.getQuestionId().split(","));
        List<MyAnswer> modelAnswerList = questionDao.getAnswerByQid(Arrays.asList(qids));
        HashMap<Integer, String> modalMap = new HashMap<>();
        for (MyAnswer answer : modelAnswerList) {
            modalMap.put(answer.getQid(),answer.getMyAnswer());
        }


        for (MyAnswer answer : answers) {
            //选择 判断
            if(StringUtils.equals(modalMap.get(answer.getQid()).trim(),answer.getMyAnswer())){
                //回答正确
                answer.setTF(1);
            }else {
                //回答错误 错误加一
                answer.setTF(0);
                wrongCount++;
            }


        }

        //设置试卷为已完成
        paper.setPaperState(1);

        //设置分数
        //获取score对象
        Score score = new Score();
        //设置分数
        score.setScore(100-(int)((double)wrongCount/paper.getQuestionQuantities()*100));
        //置试卷id
        score.setPaperId(paper.getPid());
        //设置试卷名
        score.setPaperName(paper.getPaperName());
        //设置
        score.setWrongCount(wrongCount);
        //保存分数
        this.save(score);
        //保存试卷
        paperService.updateById(paper);
        //保存答题卡
        return myAnswerService.insertMyAnswerList(answers)>0;


    }


}
