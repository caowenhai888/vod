import React, { useState } from 'react';
import Papa from 'papaparse';
import { Upload, Button, message, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { GetProp, UploadProps } from 'antd';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
function FileUpload() {

  const [jsonData, setJsonData] = useState([]);
  const { Title, Text } = Typography;

  const handleFileUpload = (file: FileType) => {
 

    Papa.parse(file, {
      header: true,
      complete: function(results) {
        const rows = results.data;
        let data:any[] = [];  // 用于存储所有的数据
        let currentItem:any = null;  // 用于在循环过程中追踪当前的项目

        for(let row of rows){

          if(row.main_title && row.main_content){
            currentItem = {
              title: row.main_title,
              content: row.main_content,
              list: []
            };
            data.push(currentItem);
          }

          if(row.list_title && row.list_content){
            currentItem.list.push({
              title: row.list_title,
              content: row.list_content
            });
          }
        }

        setJsonData(data as any);
      }
    });
  }

  const handleUpload = () => {
    if(jsonData.length === 0) return message.error('没有数据需要上传')
    fetch('api/project/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        message.success('上传陈功')
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div>
      <Title>Upload Your File</Title>
      <Upload name="file" beforeUpload={handleFileUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Button onClick={handleUpload}>Upload</Button>
     
    </div>
  );
}

export default FileUpload;