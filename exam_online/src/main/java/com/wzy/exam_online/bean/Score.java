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

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@TableName(value = "score")
@Alias("score")
public class Score {
    @TableId(type = IdType.AUTO)//id自增
    private Integer id;
    private Integer paperId;
    private String paperName;

    private Integer score;

    private Integer wrongCount;

}
