import { uploadImage } from "@/utils/upload";
import { FileImageOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image, Space, Spin, Upload, message } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";

interface SingleImageUploadProps {
  uploadUrl?: string;
  imageUrl: string;
  onUploadOk: (path: string) => void;
  width?: number | string;
  height?: number | string;
  disabled?: boolean;
  uploadText?: string;
  folderName?: string;
}

export const SingleImageUpload = React.memo(
  ({
    imageUrl,
    onUploadOk,
    height = 100,
    width = 100,
    disabled,
    uploadText,
    folderName = "Food",
  }: SingleImageUploadProps) => {
    const [loading, setLoading] = useState(false);
    const uploadRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [singleUploadId, setsingleUploadId] = useState(
      `single-upload-${dayjs().valueOf()}`
    );
    const [imageSize, setImageSize] = useState<{
      width: number;
      height: number;
    }>({ width: 0, height: 0 });

    const beforeUpload = async (file: File) => {
      const isImg = file.type.includes("image");

      return isImg;
    };

    const handleChange = (info: UploadChangeParam<any>) => {
      if (info.file.status === "uploading") {
        setLoading(true);
        return;
      }
      if (info.file.status === "done") {
        onUploadOk(info.file.response);
        setLoading(false);
      }
      if (info.file.status === "error") {
        message.error(info.file.response?.message);
        setLoading(false);
        return;
      }
    };

    const handleUpload = async (options: any) => {
      console.log({ options });

      const { onSuccess, file } = options;
      try {
        const url = await uploadImage(file, folderName);
        onSuccess(url);
      } catch (error) {
        // onError({ error });
      }
    };

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>{uploadText || "Upload"}</div>
      </div>
    );

    useEffect(() => {
      const container = document.querySelector<HTMLDivElement>(
        `.${singleUploadId} .ant-upload-select`
      );
      if (container) {
        container.style.width = typeof width == "number" ? `${width}px` : width;
        container.style.height =
          typeof height == "number" ? `${height}px` : height;
      }
    }, []);

    return (
      <Spin spinning={loading}>
        <Space
          size={0}
          align="center"
          direction="vertical"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <>
            <Upload
              accept="image/jpeg, image/png"
              name="file"
              listType="picture-card"
              className={singleUploadId}
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              customRequest={handleUpload}
              ref={uploadRef}
              disabled={disabled}
              style={{
                width: width,
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  className="w-full h-full object-contain"
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </>
          {imageUrl && (
            <Button
              type="text"
              icon={<FileImageOutlined />}
              onClick={() => setVisible(true)}
            >
              Xem ảnh
            </Button>
          )}

          <Image
            width={200}
            style={{ display: "none" }}
            src={imageUrl}
            preview={{
              visible,

              src: imageUrl,
              onVisibleChange: (value) => {
                setVisible(value);
              },
            }}
          />
        </Space>
      </Spin>
    );
  }
);
