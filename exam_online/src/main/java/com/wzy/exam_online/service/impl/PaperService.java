package com.wzy.exam_online.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wzy.exam_online.bean.Paper;
import com.wzy.exam_online.bean.Question;
import com.wzy.exam_online.dao.MyAnswerDao;
import com.wzy.exam_online.dao.PaperDao;
import com.wzy.exam_online.dao.QuestionDao;
import com.wzy.exam_online.dao.ScoreDao;
import com.wzy.exam_online.service.IPaperService;
import com.wzy.exam_online.util.MyUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;


@Service
public class PaperService extends ServiceImpl<PaperDao, Paper> implements IPaperService {

    @Autowired
    private PaperDao paperDao;
    @Autowired
    private ScoreDao scoreDao;
    @Autowired
    private QuestionDao questionDao;

    @Autowired
    private MyAnswerDao myAnswerDao;

    /**
     * 删除
     *更加id 删除 paper score
     * @param id
     * @return
     */
    @Override
    public Boolean delete(Integer id) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("paper_id",id);
        scoreDao.deleteByMap(map);
        map.remove("paper_id");
        map.put("pid",id);
        myAnswerDao.deleteByMap(map);
        return paperDao.deleteById(id)>0 ;
    }

    /**
     * 查看全部
     *
     * @return
     */
    @Override
    public List<Paper> getAll() {
        ArrayList<Paper> papers = new ArrayList<>();
        //为开始的
        LambdaQueryWrapper<Paper> lwq = new LambdaQueryWrapper<>();
        lwq.eq(Paper::getPaperState,0);
        papers.addAll(paperDao.selectList(lwq));
        //已结束的
        papers.addAll(paperDao.getOverAll());
        return papers;
    }

    /**
     * 按相应pid查找错题
     *
     * @param pids
     * @return
     */
    @Override
    public String getWrongQuestionsIdByPid(List<Integer> pids) {
        String wqidStr=null;
        List<String> wqidList = paperDao.getWrongQuestionsIdByPid(pids);
        wqidStr =StringUtils.join(wqidList,",");
        return wqidStr;
    }

    /**
     * 根据cid生成题目列表
     *
     * @param cids
     * @return
     */
    @Override
    public String getQuestionsIdByCid(List<Integer> cids) {
        String qidStr=null;
        List<Integer> qidList = questionDao.getQuestionsIdByCid(cids);
        qidStr=StringUtils.join(qidList,',');

        return qidStr;

    }

    /**
     * 创建试卷对应的题目
     *
     * @param paper   orderOrRandom source limits questionId paperState
     * @return
     */
    @Override
    public Boolean createPaper(Paper paper) {
        //随机  题源C:12,23, 上一次范围0~50
        String source = paper.getSource();
        Character type=source.charAt(0);
        type=Character.toUpperCase(type);
        String qidStr="";//问题列表
        Integer[] range =MyUtil.StringToInt(paper.getLimits().split("~"));
        range[0]=range[0]-1;
        range[1]=range[1];
        if(range.length!=2){
            return false;
        }
        Integer[] list;
        switch (type){
            case 'C':
                //去除标识
                source=StringUtils.replace(source,"C:","");
                list= MyUtil.StringToInt(source.split(","));
                qidStr=this.getQuestionsIdByCid(Arrays.asList(list));
                break;
            case 'P':
                //去除标识
                source=StringUtils.replace(source,"P:","");
                list= MyUtil.StringToInt(source.split(","));
                qidStr=this.getWrongQuestionsIdByPid(Arrays.asList(list));
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + type);
        }
        if(StringUtils.isEmpty(qidStr)){
            return false;
        }
        Integer[] qidList=MyUtil.StringToInt(qidStr.split(","));

        //数组去重
        qidList=MyUtil.DontRepeat(qidList);
        //切片
        //报证切片不大于数组大小
        if(qidList.length<range[1]){
            range[1]=qidList.length;
        }
        qidList=MyUtil.sliceArray(qidList,range[0],range[1]);

        switch (paper.getOrderOrRandom()){
            case 0://0 顺序
          //如果QuestionQuantities小于切片长度
                if(paper.getQuestionQuantities()<qidList.length){
                    //则随机抽取QuestionQuantities个
                    qidList=MyUtil.lotteryDrawing(qidList,10);
                }
                break;
            case 1://1随机
                //保证选择的题目数量等于真实数量
                if(paper.getQuestionQuantities()>qidList.length){
                    paper.setQuestionQuantities(qidList.length);
                }
                //随机选择数组
                qidList=MyUtil.lotteryDrawing(qidList,paper.getQuestionQuantities());
        }

        //重新设置题目数量
        if(paper.getQuestionQuantities()>qidList.length){
            paper.setQuestionQuantities(qidList.length);
        }
        //设置题目列表
        paper.setQuestionId(Arrays.toString(qidList).replace("[","").replace("]","").replaceAll(" ",""));
        //设置试卷状态 0是未做 1是已做
        paper.setPaperState(0);

        //设置时间
        paper.setCreateTime(LocalDate.now());
        this.save(paper);
        return true;
    }

    /**
     * 按相应qid查找题目
     *
     * @param qids
     * @return
     */
    @Override
    public List<Question> makeQuestionList(List<Integer> qids) {
        return questionDao.makeQuestionList(qids);
    }

    /**
     * 按相应pid查找题目
     *
     * @param pid
     * @return
     */
    @Override
    public List<Question> getQuestionsIdByPid(Integer pid) {
        Paper paper = this.getById(pid);
        //转换成问题列表
        List<Integer> list= Arrays.asList(MyUtil.StringToInt(paper.getQuestionId().split(",")));
        //按题目类型分组
        return this.makeQuestionList(list);

    }

    @Override
    public List<Question> getLastExam(Integer pid) {

        //获取qid
        return  questionDao.getLastExam(pid);

    }


}
