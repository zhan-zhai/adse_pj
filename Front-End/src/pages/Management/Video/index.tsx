import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  Modal,
  Form,
  message,
  Popconfirm,
  Card,
  Upload,
  Select,
  InputNumber,
} from 'antd';
import urlConfig from '@/urlConfig';
import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  getItems,
  addItem,
  deleteItem,
  updateItem,
  url2UploadFileList,
  uploadFileList2Url,
  normFile,
  getVideoTypes,
  formLayout,
  validateMessages,
  formatFileSize,
} from '@/utils/utils';

const url= urlConfig.VIDEO_URL; // modify

const VideoTable: React.FC = () =>{ // modify
  const [data, setData] = useState([]);
  const [videoTypes, setVideoTypes] = useState([]);
  const [addFormFileSize, setAddFormFileSize] = useState("");
  const [editFormFileSize, setEditFormFileSize] = useState("");
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [addModelVisible, setAddModelVisible] = useState(false);
  const [modifyModelVisible, setModifyModelVisible] = useState(false);

  const [searchForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const { Option } = Select;

  const getData = async () => {
    const queryParams = {
      ...searchForm.getFieldsValue(),
      size: pageInfo.pageSize,
      page: pageInfo.current - 1,
    }
    const res = await getItems(url, queryParams)
    if(res){
      setData(res.data.content);
      setPageInfo({...pageInfo, total: res.data.totalElements})
    }
  };

  useEffect(() => {
    getData();
  }, [pageInfo.current]);

  useEffect(() => {
    getVideoTypes().then((res)=>{
      setVideoTypes(res);
    }
  )
  }, [pageInfo.current]);


  const onAddOk = async () => {
    const formValues = addForm.getFieldsValue();
    const videoUrl = uploadFileList2Url(formValues.url); // modify
    if(url){
      const success = await addItem(url, { ...addForm.getFieldsValue(), url:videoUrl});
      if(success){
        setAddModelVisible(false);
        getData();
      }
    }else{
      message.error("存在文件未上传成功！");
    }
  };

  const onModify = (record: any) => {
    console.log(record);
    editForm.setFieldsValue({...record, url: url2UploadFileList(record.url)});
    if(record.fileSize){
      setEditFormFileSize(formatFileSize(record.fileSize))
    }else{
      setEditFormFileSize("")
    }
    setModifyModelVisible(true);
  }

  const onModifyOk = async () => {
    const formValues = editForm.getFieldsValue();
    const videoUrl = uploadFileList2Url(formValues.url);
    if(videoUrl){
      const success = await updateItem(url, editForm.getFieldValue("id"), { ...editForm.getFieldsValue(), url: videoUrl});
      if(success){
        setModifyModelVisible(false);
        getData();
      }
    }else{
      message.error("存在文件未上传成功！");
    }
  };

  const onAddFormUpload  = () => {
    const fileList = addForm.getFieldsValue().url;
    if(fileList&&fileList[0].response&&fileList[0].id!=='-1'&&fileList[0].response.code==='000'){
      addForm.setFieldsValue({fileSize: fileList[0].size})
      setAddFormFileSize(formatFileSize(fileList[0].size))
      const video = document.createElement('audio');
      // set the file object URL as the src of the video element
      video.src = urlConfig.FILE_DOWNLOAD_URL + fileList[0].response.data;
      // get video/audio duration when it's available
      video.addEventListener('loadedmetadata', () => {
        if(video.duration===Infinity){
          addForm.setFieldsValue({duration:"时长解析失败，请自行填写！"})
        }else{
          addForm.setFieldsValue({duration: +video.duration.toFixed(2)})
        }
      });
    }
  };


  const onModifyFormUpload  = () => {
    const fileList = editForm.getFieldsValue().url;
    if(fileList&&fileList[0].response&&fileList[0].id!=='-1'&&fileList[0].response.code==='000'){
      editForm.setFieldsValue({fileSize: fileList[0].size})
      setEditFormFileSize(formatFileSize(fileList[0].size))
      const video = document.createElement('audio');
      // set the file object URL as the src of the video element
      video.src = urlConfig.FILE_DOWNLOAD_URL + fileList[0].response.data;
      // get video/audio duration when it's available
      video.addEventListener('loadedmetadata', () => {
        editForm.setFieldsValue({duration:+video.duration.toFixed(2)})
      });
    }
  };

  return (
    <PageContainer>
      <Card>
        {/* modify */}
        <Form form={searchForm} layout="inline">
          <Form.Item name="id" label="ID">
            <Input />
          </Form.Item>
          <Form.Item name="type" label="视频类型">
            <Select placeholder="视频类型" allowClear >
              {videoTypes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="name" label="视频名称">
            <Input/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={getData}>查询</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={()=>searchForm.resetFields()}>重置</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={()=>setAddModelVisible(true)}>新增</Button>
          </Form.Item>
        </Form>
      </Card>
      <br/>
      <Card>
        <Table
          columns={ [
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: '视频名称', // modify
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '视频时长', // modify
              dataIndex: 'duration',
              key: 'duration',
              render: val => val > 60 ?`${Math.floor(val / 60)  }分钟${  Math.round(val%60)}秒`:`${  Math.round(val%60)}秒`,
            },
            {
              title: '视频大小', // modify
              dataIndex: 'fileSize',
              key: 'fileSize',
              render: val =>  formatFileSize(val),
            },
            {
              title: '视频类型', // modify
              dataIndex: 'type',
              key: 'type',
            },
            {
              title: 'Action',
              key: 'action',
              render: (text: any, record: any) => (
                <Space size="middle">
                  <Button onClick={()=>onModify(record)}>编辑</Button>
                  <Popconfirm
                    title="确认删除？"
                    okText="确认"
                    cancelText="取消"
                    onConfirm={() => {
                      deleteItem(url, record.id).then(()=>getData());
                    }}
                  >
                    <Button danger>删除</Button>
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
          dataSource={data}
          pagination={pageInfo}
          onChange={(newPageInfo: any)=>setPageInfo(newPageInfo)}
          rowKey={record=>record.id}
        />
      </Card>
      <Modal
        title="新增"
        visible={addModelVisible}
        okButtonProps={{ htmlType: 'submit', form: 'addForm' }}
        onCancel={()=>setAddModelVisible(false)}
      >
        <Form
          name ="addForm"
          form ={addForm}
          {...formLayout}
          validateMessages={validateMessages}
          onFinish={onAddOk}
        >
          <Form.Item name = "name" label="视频名称" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="视频类型" rules={[{required: true,},]}>
            <Select placeholder="视频类型" allowClear >
              {videoTypes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name = "url" label="视频文件" valuePropName="fileList" getValueFromEvent={normFile} rules={[{required: true,},]}>
            <Upload
              name="file"
              listType="picture"
              action={urlConfig.VIDEO_UPLOAD_URL}
              showUploadList={{ showRemoveIcon: false }}
              maxCount={1}
              onChange={onAddFormUpload}
            >
              <Button icon={<UploadOutlined />}>选择视频文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="duration" label="时长(s)" rules={[{required: true,  type: 'number', min: 0, max: 99999999},]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="fileSize" label="文件大小(byte)" rules={[{required: true,},]} >
            <Input disabled />
          </Form.Item>
          <Form.Item label="易读文件大小">
            <Input value={addFormFileSize} />
          </Form.Item>

        </Form>
      </Modal>
      <Modal
        title="编辑"
        visible={modifyModelVisible}
        okButtonProps={{ htmlType: 'submit', form: 'editForm' }}
        onCancel={()=>setModifyModelVisible(false)}
      >
        <Form name="editForm" form={editForm} {...formLayout}  onFinish={onModifyOk} validateMessages={validateMessages}>
          <Form.Item label="ID" name="id" rules={[{ required: true,},
          ]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name = "name" label="视频名称" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="视频类型" rules={[{required: true,},]}>
            <Select placeholder="视频类型" allowClear >
              {videoTypes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name = "url" label="视频文件" valuePropName="fileList" getValueFromEvent={normFile} rules={[{required: true,},]}>
            <Upload
              name="file"
              listType="picture"
              action={urlConfig.VIDEO_UPLOAD_URL}
              showUploadList={{ showRemoveIcon: false }}
              maxCount={1}
              onChange={onModifyFormUpload}
            >
              <Button icon={<UploadOutlined />}>选择视频文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="duration" label="时长(s)" rules={[{required: true,  type: 'number', min: 0, max: 99999999},]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="duration" label="时长(s)" rules={[{required: true,  type: 'number', min: 0, max: 99999999},]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="fileSize" label="文件大小(B)" rules={[{required: true,},]}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="易读文件大小">
            <Input value={editFormFileSize} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
export default VideoTable;
