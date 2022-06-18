package com.wzy.exam_online.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.wzy.exam_online.bean.Catalog;
import com.wzy.exam_online.service.ICatalogService;
import com.wzy.exam_online.service.IQuestionService;
import com.wzy.exam_online.util.ResponseCode;
import com.wzy.exam_online.util.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/catalogs")
public class CatalogController {


    @Autowired
    private ICatalogService catalogService;

    @Autowired
    private IQuestionService questionService;

    @GetMapping
    public ResponseData getAll(){
        ArrayList<Catalog> catalogs = new ArrayList<>();
        for (Catalog catalog : catalogService.getAll()) {
            catalog.setCount((int) questionService.catalogQuantities(catalog.getCid()));
            catalogs.add(catalog);
        }
        return new ResponseData(true,ResponseCode.SELECT_OK,"查询成功",catalogs);

    }


    @PostMapping
    public ResponseData save(@RequestBody Catalog catalog){
        System.out.println(catalog.toString());
        if(catalog!=null){
            catalog.setCreateTime(LocalDate.now());

        }
        return new ResponseData(catalogService.save(catalog),ResponseCode.INSERT_OK,"新增成功");
    }

    @PutMapping
    public ResponseData update(@RequestBody Catalog catalog){
        return new ResponseData(catalogService.update(catalog),ResponseCode.UPDATE_OK,"更新成功");
}


    @DeleteMapping("{id}")
    public ResponseData delete(@PathVariable Integer id){
        return new ResponseData(catalogService.delete(id),ResponseCode.DELETE_OK,"删除成功");
}

    @GetMapping("{id}")
    public ResponseData getById(@PathVariable Integer id){
        return new ResponseData(true,ResponseCode.SELECT_OK,"查询成功",catalogService.getById(id));
}

    @GetMapping("{currentPage}/{pageSize}")
    public ResponseData getPage(@PathVariable Integer currentPage,@PathVariable Integer pageSize){

        IPage<Catalog> page = catalogService.getPage(currentPage, pageSize);
        return new ResponseData(true,ResponseCode.SELECT_OK,"查询成功",page.getRecords());

    }

}
