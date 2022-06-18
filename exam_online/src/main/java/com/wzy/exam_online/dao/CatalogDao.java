package com.wzy.exam_online.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import com.wzy.exam_online.bean.Catalog;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;


@Component
public interface CatalogDao extends BaseMapper<Catalog>{

    Integer insertOneCatalog(Catalog catalog);
    List<Catalog> searchCatalogsAll();


}
