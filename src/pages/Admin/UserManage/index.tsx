import {MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {ActionType, ProColumns, ProForm, ProFormDateRangePicker} from '@ant-design/pro-components';
import {ModalForm, ProFormSelect, ProFormText, ProTable} from '@ant-design/pro-components';
import {Button, Form, message, Upload} from 'antd';
import React, {useRef, useState} from 'react';

import {
  authorized,
  deleteList,
  deleteUserById,
  insertUser,
  searchUsers,
  updateUser, uploadAvatar
} from "@/services/ant-design-pro/api";
import {RecordKey} from "@ant-design/pro-utils/es/useEditableArray";
import position from "@antv/layout/es/layout/dagre/src/position";
import {ProFormFieldSet, ProFormUploadButton, ProFormUploadDragger} from "@ant-design/pro-form";
import {fileLoader} from "@umijs/deps/compiled/ejs";
import {FormattedMessage} from "@@/exports";

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

const columns: ProColumns<API.CurrentUser>[] = [
  //id key 不可更改
  {
    title: 'id',
    dataIndex: 'id',
    ellipsis: true,
    editable:false,
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
        <img src={record.avatarUrl} width={50} height={50}/>
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
    valueEnum: {
      0: {
        text: '男',
        // status: 'default',
      },
      1: {
        text: '女',
        // status: 'default',
      }
    }
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
  //role 不可更改 通过授权按钮进行更改
  {
    disable: true,
    title: '角色',
    dataIndex: 'userRole',
    filters: true,
    onFilter: true,
    ellipsis: true,
    editable:false,
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
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      // <a
      //   key="editable"
      //   onClick={() => {
      //     //调用删除接口
      //   }}
      // >
      //   删除
      // </a>,
    ],
  },
];




export default () => {

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]); // 选中的行keys
  const [selectedRows, setSelectedRows] = useState<API.CurrentUser[]>([]); // 选中的行数据

  const [avatar,setAvatar]= useState<string[]>([]);

  /**
   * 通过id进行单个删除
   * 出现在编辑的二级选项下
   * @param values 接收CurrentUser类型 通过values得到id进行删除
   */
  const deleteId = async(values: API.CurrentUser) => {
    const userInfo = await deleteUserById(values);
    const code = userInfo.code;
    if (code === 0) {
      message.success("删除成功!");
    } else {
      message.error("删除失败!");
    }
  }

  /**
   * 通过id对单个用户进行修改
   * 出现在编辑的二级选项下
   * @param values 接收CurrentUser类型 通过values得到id进行修改
   */
  const update = async(values: API.CurrentUser)=>{
    const userInfo = await updateUser(values);
    const code = userInfo.code;
    if(code === 0){
      message.success("更新成功!");
    }else{
      message.error("更新失败!");
    }
  }

  /**
   * 多选授权 可通过表格的复选框进行多选授权
   * @param list 接收一个id数组 返回给后端 让后端根据该数组进行修改权限
   */
  const authorizeByIds = async (list: number[])=>{
    // alert(list);
    const userInfo = await authorized(list);
    const code = userInfo.code;
    if(code === 0){
      message.success("授权成功!");
    }else{
      message.error("授权失败!");
    }
  }

  /**
   * 多选删除 可通过表格的复选框进行多选删除
   * @param list 接收一个id数组 返回给后端 让后端根据该数组进行删除
   */
  const deleteUserByIds = async (list: number[])=> {
    const userInfo = await deleteList(list);
    const code = userInfo.code;
    if(code === 0){
      message.success("删除成功!");
    }else{
      message.error("删除失败!");
    }
  }
  const addUser = async (info: { file: { status: string; response: { code: number; data: React.SetStateAction<string[]>; }; }; }) => {
    if (info.file.status === 'removed') { //移除图片时；
      setAvatar("");
    } else if (info.file.status === 'done') { //上传完成时
      if (info.file.response.code === 0) {
        // 把返回的图像地址设置给 imageUrl
        setAvatar(info.file.response.data) // 取决于服务端返回的字段名
      }
    }
  }


  const [form] = Form.useForm<{
    name: string;
    userAccount: string;
    planetCode: string;
    phone: string,
    email: string,
    gender: number,
    userRole: number,
    userPassword: string,
  }>();

  const actionRef = useRef<ActionType>();
  // const themeConfig = {
  //   token: {
  //     colorPrimary: 'blue',
  //     borderRadius: 4,
  //   },
  //   algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm],
  // };
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore


  /**
   * @important 踩坑经历
   * useState是React提供的钩子函数，调用set方法可以触发视图更新
   */


  function onSelectChange(selectedRowKeys:number[], selectedRows, info: { type }) {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
    console.log(selectedRowKeys);
    console.log(selectedRows);

  }

  return (
    <div
      style={{
        backgroundColor: 'hsl(0,0%,100%)',
      }}
    >


    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}

      cardBordered
      // 多选框属性方法定义
      rowSelection={{
        // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
        selectedRowKeys,
        onChange: onSelectChange,

      }}
      /**
      * request 请求表格数据
      * 对params进行添加并约定类型
      * params可以自动接收查询的数据(当按下查询时接收)
      */
      request={async (params:API.SearchParams & {
        pageSize: number;
        current: number;
      }, sort, filter) => {
        console.log(sort, filter);
        //TODO 分页查询

        // alert(params.pageSize+","+params.current)
        await waitTime(2000);
        const {data} = await searchUsers(params);
        return {
          data: data,
        }
        // request<{
        //   data: userList
        // }>('/', {
        //   params,
        // });
      }}
      /**
      * 可编辑
      * onSave：点击保存触发回调
      * onDelete：点击删除触发回调
      */
      editable={{
        // type: 'multiple',
        onSave:async (key: RecordKey, row: API.CurrentUser) => {
          console.log(key, row, 'onSave');
          await update(row);
          return Promise.resolve();
        },
        onDelete:async (key: RecordKey, row: API.CurrentUser) => {
          console.log(key, row, 'onDelete');
          await deleteId(row);
          return Promise.resolve();
        },

      }}
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
      headerTitle="用户列表"
      toolBarRender={() => [
        <Button key="button"
                icon={<MinusOutlined />}
                type="primary"
                danger={true}
                onClick={async ()=>{
                  console.log("do delete");
                  if(selectedRowKeys.length < 1) {
                    message.error("请选择至少一个用户进行删除！");
                  }else {
                    deleteUserByIds(selectedRowKeys);
                  }
                  return Promise.resolve();
                }}>
          批量删除
        </Button>,
        <Button key="button"
                icon={<PlusOutlined />}
                type="primary"
                onClick={async ()=>{
                  console.log("do authorize");
                  if(selectedRowKeys.length < 1) {
                    message.error("请选择至少一个用户进行授权！");
                  }else {
                    authorizeByIds(selectedRowKeys);
                  }
                  return Promise.resolve();
                }}
        >
          授权
        </Button>,

        <ModalForm<{
          name: string;
          userAccount: string;
          planetCode: string;
          phone: string,
          email: string,
          gender: number,
          userRole: number,
          userPassword: string,
        }>
          title="新建表单"
          trigger={
            <Button type="primary">
              <PlusOutlined />
              新建用户
            </Button>
          }
          form={form}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log('run'),
          }}
          submitTimeout={2000}
          onFinish={async (values) => {
            await waitTime(2000);
            const {code,description} = await insertUser(values,avatar);
            if(code === 0) {
              message.success('提交成功');
            }else {
              message.error(description);
            }
            return true;
          }}
        >
          <ProForm.Group>
            <ProFormText
              name="userName"
              label="用户名"
              placeholder="请输入用户名"
              width="lg"
              rules={[
                {
                  required: true,
                  message: (
                      <FormattedMessage
                          id="pages.userName.required"
                          defaultMessage="请输入用户名!"
                      />
                  ),
                },
                {
                  required: false,
                  min: 4,
                  message:(
                      <FormattedMessage
                          id="pages.userName.notReachMin"
                          defaultMessage="用户名不可小于4位！"
                      />
                  )
                },
              ]}
            />
            <ProFormText
              name="planetCode"
              label="星球码"
              placeholder="请输入星球码"
              rules={[
                {
                  required: true,
                  message: (
                      <FormattedMessage
                          id="pages.userName.required"
                          defaultMessage="请输入星球码!"
                      />
                  ),
                },
              ]}
            />

            <ProFormText
                name="userAccount"
                label="账号"
                placeholder="请输入账号"
                rules={[
                  {
                    required: true,
                    message: (
                        <FormattedMessage
                            id="pages.login.userAccount.required"
                            defaultMessage="请输入账号!"
                        />
                    ),
                  },
                  {
                    required: false,
                    min: 4,
                    message:(
                        <FormattedMessage
                            id="pages.login.userAccount.notReachMin"
                            defaultMessage="账号长度不可小于4位！"
                        />
                    )
                  },
                ]}
            />
            <ProFormText.Password
              name="userPassword"
              label="密码"
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
                {
                  required: false,
                  min: 8,
                  message:(
                    <FormattedMessage
                      id="pages.login.length.notReachMin"
                      defaultMessage="密码长度不可小于8位！"
                    />
                  )
                },
              ]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              width="md"
              name="phone"
              label="电话"
            />
            <ProFormText
              width="md"
              name="email"
              label="邮箱"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect

              request={async () => [
                {
                  value: 0,
                  label: '男',
                },
                {
                  value: 1,
                  label: '女',
                }
              ]}
              width="xs"
              name="gender"
              label="性别"
            />
            <ProFormSelect
              width="xs"
              options={[
                {
                  value: 0,
                  label: '普通用户',
                },
                {
                  value: 1,
                  label: '管理员',
                },
              ]}
              name="userRole"
              label="用户角色"
            />
          </ProForm.Group>
          <ProForm.Group>
            {/*头像上传Button(重要)*/}
            <ProFormUploadButton
              name="avatarFile"
              label="头像上传"
              max={1}         //仅允许上传一个头像
              fieldProps={{
                multiple: false,
                name: 'file',
                listType: 'picture-card',
                /*
                 在上传前进行校验：
                 1.若文件不为规定格式的文件，则ignore
                 2.若文件大小超过允许范围，则ignore
                 */
                beforeUpload: (file) => {
                  if(file.size>5242880){
                    message.error("请上传不超过5MB的文件！");
                    return Upload.LIST_IGNORE;
                  }
                  console.log(file.type);
                  //isPNG和isJPG 判定文件类型是否为png或jpg/jpeg
                  const isPNG = file.type === 'image/png';
                  const isJPG = file.type === 'image/jpg'||file.type === 'image/jpeg';
                  if (!isPNG&&!isJPG) {
                    message.error("该文件不是jpg/jpeg/png格式，请检查！");
                  }
                  if(isPNG){
                    return isPNG;
                  }
                  if(isJPG){
                    return isJPG;
                  }
                  return Upload.LIST_IGNORE;
                },
              }}
              action="/api/upload/avatar" //上传图片接口地址
              onChange={addUser}
              extra="仅支持.jpg、.jpeg、.png等格式"
            />
          </ProForm.Group>
        </ModalForm>
      ]}
    />

    </div>
  );
};
