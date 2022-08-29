import React, { useState } from 'react';
import ItemDBCategory, { CategoryDataSourceType } from './ItemDBCategory';
import { Col, Row, Space } from 'antd';


const ItemDB = () => {
    const [categoryDataSource, setCategoryDataSource] = useState<CategoryDataSourceType[]>([{category:1,desc:"1325"}]);
    const [subCategoryDataSource, setSubCategoryDataSource] = useState<CategoryDataSourceType[]>([]);
    return (
        <Row wrap={false} gutter={16}>
            <Col span={5} >
                <ItemDBCategory dataSource={categoryDataSource} setDataSource={setCategoryDataSource}></ItemDBCategory>
            </Col>
            <Col span={5} >
                <ItemDBCategory dataSource={subCategoryDataSource} setDataSource={setSubCategoryDataSource}></ItemDBCategory>
            </Col>
        </Row>
    );
};
export default ItemDB;
