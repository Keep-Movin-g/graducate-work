package com.wzy.exam_online.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.time.LocalDate;
import java.util.Date;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@TableName(value = "paper")
@Alias("paper")

public class Paper {
    @TableId(type = IdType.AUTO)//id自增
    private Integer pid;
    private String paperName;
    private Integer allowTime; //分钟
    private Integer paperState; //0未做 1已做

    //随机  题源C:12,23, 上一次范围0~50

    private Integer orderOrRandom; //0 顺序 1随机
    private String source;
    private String limits;

    private String questionId;

    @TableField(exist = false)
    private Integer score;




    //    private Integer PaperFromId; 目前不做
    private Integer questionQuantities;
    private LocalDate createTime;//创建的时间

    public Paper(String paperName, Integer allowTime, Integer orderOrRandom, String source, String limits, Integer questionQuantities, LocalDate createTime) {
        this.paperName = paperName;
        this.allowTime = allowTime;
        this.orderOrRandom = orderOrRandom;
        this.source = source;
        this.limits = limits;
        this.questionQuantities = questionQuantities;
        this.createTime = createTime;
    }

    public Paper(String paperName, Integer allowTime, Integer orderOrRandom, String source, String limits, Integer questionQuantities) {
        this.paperName = paperName;
        this.allowTime = allowTime;
        this.orderOrRandom = orderOrRandom;
        this.source = source;
        this.limits = limits;
        this.questionQuantities = questionQuantities;
    }
}
