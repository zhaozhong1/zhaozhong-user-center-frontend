import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button, message} from 'antd';
import {useRef} from 'react';
import {searchUsers} from "@/services/ant-design-pro/api";
import React from 'react';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};


// createTime?: Date;
const columns: ProColumns<API.CurrentUser>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    ellipsis: true,
  },
  {
    disable: true,
    // search:false,
    title: '用户名',
    dataIndex: 'userName',
    filters: true,
    onFilter: true,
    ellipsis: true,
    // valueType: 'select',
  },
  {
    disable: true,
    title: '账号',
    dataIndex: 'userAccount',
    filters: true,
    onFilter: true,
    ellipsis: true,

  },
  {
    disable: true,
    title: '头像',
    search:false,
    dataIndex: 'avatarUrl',
    render: (a, record) => (
      <div>
        <img src={record.avatarUrl} width={100}/>
      </div>
    ),
    filters: true,
    onFilter: true,
    ellipsis: true,

  },
  {
    disable: true,
    title: '性别',
    dataIndex: 'gender',
    filters: true,
    onFilter: true,
    ellipsis: true,

  },
  {
    disable: true,
    title: '电话',
    search:false,
    dataIndex: 'phone',
    filters: true,
    onFilter: true,
    ellipsis: true,

  },
  {
    disable: true,
    title: '邮箱',
    search:false,
    dataIndex: 'email',
    filters: true,
    onFilter: true,
    ellipsis: true,

  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'userStatus',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueEnum: {
      0: {
        text: '正常',
        status: 'success',
      },
      1: {
        text: '非正常',
        status: 'error',
      }
    }
  },
  {
    disable: true,
    title: '角色',
    dataIndex: 'userRole',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      0: {
        text: '普通用户',
        status: 'default',
      },
      1: {
        text: '管理员',
        status: 'default',
      }
    }
  },
  {
    disable: true,
    title: '星球码',
    search:false,
    dataIndex: 'planetCode',
    filters: true,
    onFilter: true,
    ellipsis: true,

  },
  {
    disable: true,
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'date',
    filters: true,
    onFilter: true,
    ellipsis: true,

  },

];


export default () => {
  const actionRef = useRef<ActionType>();


  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // searchFormRender={}
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        const {data} = await searchUsers();
        return {
          data: data,
        }
        // request<{
        //   data: userList
        // }>('/', {
        //   params,
        // });
      }}
      editable={{
        type: 'multiple',
      }}
      // editable={{
      //   type: 'multiple',
      //   editableKeys,
      //   onChange: setEditableRowKeys,
      //   onSave: async (rowKey, data) => {
      //     // 校验[当前前三列是否已存在记录]
      //     const repeatData = dataSource?.filter(
      //       (item) =>
      //         item.game_id === data.game_id &&
      //         item.op_channel === data.op_channel &&
      //         item.settle_time === data.settle_time,
      //     );
      //     if (repeatData.length) {
      //       message.error('已存在相同记录');
      //       return Promise.reject();
      //     }
      //     try {
      //       const { code, message: ResMessage } = await 接口({
      //         ...data,
      //         company_id: id,
      //       });
      //       if (code === 0) {
      //         return Promise.resolve();
      //       } else {
      //         message.error(ResMessage);
      //         return Promise.reject();
      //       }
      //     } catch (error) {
      //       return Promise.reject();
      //     }
      //   },
      // }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined/>}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
      ]}
    />
  );
};
