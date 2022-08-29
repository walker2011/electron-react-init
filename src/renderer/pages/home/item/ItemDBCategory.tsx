import { ProForm, ProFormText, ProList } from '@ant-design/pro-components';
import React, { Dispatch, useCallback, useState } from 'react';
import { Button, message, Modal } from 'antd';

export type CategoryDataSourceType = {
    category: React.Key,
    desc?: string;
};

export type ItemDBCategoryProp = {
    dataSource: CategoryDataSourceType[],
    setDataSource: Dispatch<CategoryDataSourceType[]>,
}

const ItemDBCategory = ({ dataSource, setDataSource }: ItemDBCategoryProp) => {
    // const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    // const [dataSource, setDataSource] = useState<CategoryDataSourceType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    // const [form] = useForm();
    const [isAddRowModalVisible, setIsAddRowModalVisible] = useState(false);
    const [curData, setCurData] = useState<CategoryDataSourceType | undefined>(undefined);

    const onClickDelete = useCallback((record) => {
        setDataSource(dataSource.filter((item) => item.category !== record.category));
    }, [setDataSource, dataSource]);

    // const categoryColumns: ProColumns<CategoryDataSourceType>[] = [
    //     {
    //         title: 'category',
    //         dataIndex: 'category',
    //         width: 60
    //     },
    //     {
    //         title: 'desc',
    //         dataIndex: 'desc',
    //         width: 100
    //     },
    //     {
    //         title: '操作',
    //         valueType: 'option',
    //         width: 60,
    //         render: (text, record, _, action) => [
    //             <a
    //                 key='editable'
    //                 onClick={() => {
    //                     action?.startEditable?.(record.category);
    //                 }}
    //             >
    //                 编辑
    //             </a>,
    //             <a
    //                 key='delete'
    //                 onClick={() => {
    //                     onClickDelete(record);
    //                 }}
    //             >
    //                 删除
    //             </a>
    //         ]
    //     }
    // ];

    /**
     * 开始添加
     */
    const onClickAddOne = useCallback(() => {
        setCurData({ category: 1 });
        setIsAddRowModalVisible(true);
    }, [setIsAddRowModalVisible, setCurData]);

    /**
     * 确认添加
     */
    const onApplyAddRow = useCallback(() => {
        if (curData && curData.category && curData.desc) {
            setIsAddRowModalVisible(false);
            setCurData(undefined);
        } else {
            message.error('请填写完整');
        }
    }, [setIsAddRowModalVisible, setCurData]);

    /**
     * 取消添加
     */
    const onCancelAddRow = useCallback(() => {
        setCurData(undefined);
        setIsAddRowModalVisible(false);
    }, [setIsAddRowModalVisible, setCurData]);

    return (
        <div>
            <ModalForm<{
                name: string;
                company: string;
            }>
                title="新建表单"
                trigger={
                    <Button type="primary">
                        <PlusOutlined />
                        新建表单
                    </Button>
                }
                autoFocusFirstInput
                modalProps={{
                    onCancel: () => console.log('run'),
                }}
                submitTimeout={2000}
                onFinish={async (values) => {
                    await waitTime(2000);
                    console.log(values.name);
                    message.success('提交成功');
                    return true;
                }}
            >
            </ModalForm>
            <Modal title='Basic Modal' visible={isAddRowModalVisible} onOk={onApplyAddRow} onCancel={onCancelAddRow}>
                <ProForm<{
                    name: string;
                    company?: string;
                    useMode?: string;
                }>
                    wrapperCol={{ span: 14 }}
                    onFinish={async (values) => {
                        // await waitTime(2000);
                        // console.log(values);
                        // message.success('提交成功');
                    }}
                >
                    <ProFormText
                        width='md'
                        name='category'
                        label='类型（category）'
                        placeholder='请输入category'
                    />
                    <ProFormText
                        name='desc'
                        width='md'
                        label='提示'
                        placeholder='请输入提示'
                    />
                </ProForm>
            </Modal>
            <Button
                type='primary'
                style={{
                    padding: '6px',
                    width: '100%',
                    height: '100%'
                }}
                onClick={onClickAddOne}
            >
                添加
            </Button>
            <ProList<CategoryDataSourceType>
                // columns={categoryColumns}
                headerTitle='道具类型'
                rowKey='id'
                pagination={false}
                toolBarRender={false}
                tableAlertRender={false}
                dataSource={dataSource}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys,
                    onChange: setSelectedRowKeys,
                    renderCell: (value, record, index, originNode) => {
                        return undefined;
                    },
                    columnWidth: 0
                }}
                onRow={record => {
                    return {
                        onClick: event => {
                            if (record.category && !!record.desc) {
                                setSelectedRowKeys([record.id]);
                            }
                        },
                        onDoubleClick: event => {

                        }
                    };
                }}
            >
            </ProList>
        </div>
    );
};
export default ItemDBCategory;
