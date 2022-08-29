import { ModalForm, ProFormText, ProList } from '@ant-design/pro-components';
import React, { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { Button, message } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-table/lib/typing';

export type CategoryDataSourceType = {
    category: number,
    desc?: string;
};

export type ItemDBCategoryProp = {
    dataSource: CategoryDataSourceType[],
    setDataSource: Dispatch<CategoryDataSourceType[]>,
}

const ItemDBCategory = ({ dataSource, setDataSource }: ItemDBCategoryProp) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const listRef = useRef<ActionType | undefined>(undefined);

    const onClickDelete = useCallback((record) => {
        setDataSource(dataSource.filter((item) => item.category !== record.category));
        console.log('delete', record);
    }, [setDataSource, dataSource]);

    /**
     * 确认添加
     */
    const onApplyAddRow = async (values: CategoryDataSourceType) => {
        if (values.category && values.desc) {
            if (!dataSource.some((value, index) => {
                return value.category == values.category;
            })) {
                let dataSourceT = dataSource.concat();
                dataSourceT.push({ category: Number(values.category), desc: values.desc });
                setDataSource(dataSourceT);
                return true;
            } else {
                message.error('category已存在');
            }
        } else {
            message.error('请填写完整');
        }
        return false;
    };

    /**
     * 取消添加
     */
    const onCancelAddRow = useCallback(() => {

    }, []);

    return (
        <div>
            <ModalForm<CategoryDataSourceType>
                title=''
                trigger={
                    <Button
                        type='primary'
                        style={{
                            padding: '6px',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        添加
                    </Button>
                }
                autoFocusFirstInput
                modalProps={{
                    onCancel: onCancelAddRow
                }}
                submitTimeout={2000}
                onFinish={onApplyAddRow}
            >
                <ProFormText
                    width='md'
                    name='category'
                    label='类型（category）'
                    placeholder='请输入category'
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            transform: (value: string) => Number(value)
                        }
                    ]}
                />
                <ProFormText
                    name='desc'
                    width='md'
                    label='提示'
                    rules={[{ required: true, type: 'string' }]}
                    placeholder='请输入提示'
                />
            </ModalForm>
            <ProList<CategoryDataSourceType>
                headerTitle='基础列表'
                rowKey='category'
                pagination={false}
                showActions='hover'
                tableAlertRender={false}
                dataSource={dataSource}
                actionRef={listRef}
                metas={{
                    title: {
                        dataIndex: 'category'
                    },
                    description: {
                        dataIndex: 'desc'
                    },
                    actions: {
                        render: (dom, entity, index, action) => {
                            return [
                                <Button
                                    key={'delete'}
                                    type='primary'
                                    icon={<CloseCircleTwoTone />}
                                    onClick={() => onClickDelete(entity)}
                                ></Button>
                            ];
                        }
                    }
                }}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys: selectedRowKeys,
                    onChange: (value) => {
                        setSelectedRowKeys(value);
                        console.log(value);
                    },
                    renderCell: (value, record, index, originNode) => {
                        return undefined;
                    },
                    columnWidth: 0
                }}
                onRow={record => {
                    return {
                        onClick: event => {
                            if (record.category && !!record.desc) {
                                setSelectedRowKeys([record.category]);
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
