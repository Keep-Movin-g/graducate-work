package com.wzy.exam_online.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wzy.exam_online.bean.Catalog;
import com.wzy.exam_online.dao.CatalogDao;
import com.wzy.exam_online.dao.QuestionDao;
import com.wzy.exam_online.service.ICatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class CatalogService implements ICatalogService {

    @Autowired
    private CatalogDao catalogDao;
    @Autowired
    private QuestionDao questionDao;
    /**
     * 添加一个目录
     *
     * @param catalog id 目录名 课程目 科目目 创建时间
     * @return 是否添加一个目录成功
     * @throws Exception
     */
    @Override
    public Boolean save(Catalog catalog) {
        return catalogDao.insert(catalog)>0;
    }

    @Override
    public Boolean update(Catalog catalog) {
        return catalogDao.updateById(catalog)>0;
    }

    @Override
    public Boolean delete(Integer id) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("catalog_id",id);
        questionDao.deleteByMap(map);
        return catalogDao.deleteById(id)>0 ;
    }

    @Override
    public Catalog getById(Integer id) {
        return catalogDao.selectById(id);
    }

    @Override
    public List<Catalog> getAll() {
        return catalogDao.selectList(null);
    }

    @Override
    public IPage<Catalog> getPage(int currentPage, int pageSize) {

        IPage<Catalog> page = new Page<>(currentPage,pageSize);
        catalogDao.selectPage(page,null);
        return page;
    }


}
