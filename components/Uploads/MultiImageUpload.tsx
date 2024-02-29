import { PlusOutlined } from "@ant-design/icons";
import { message, Modal, Upload } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { settings } from "../../../settings";
import { getImageSize } from "../../utils";
import { getToken } from "../../utils/auth";
import { $url } from "../../utils/url";

export interface MultiImageUploadProps {
  uploadUrl?: string;
  onUploadOk: (fileList: Array<{ id?: any; url: string }>) => void;
  recommendSize?: { width: number; height: number };
  fileListProp: UploadFile<any>[];
}

export interface MultiImageUpload {
  handleUpdatePosition: (image: string[]) => void;
}

export interface IFile {
  id?: any;
  url: string;
}

export const MultiImageUpload = React.forwardRef(
  (
    {
      uploadUrl = import.meta.env.VITE_API_URL + "/v1/admin/image/upload",
      fileListProp,
      recommendSize,
      onUploadOk,
    }: MultiImageUploadProps,
    ref
  ) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile<any>[]>();
    const [imageSize, setImageSize] = useState<{
      width: number;
      height: number;
    }>({ width: 0, height: 0 });

    useImperativeHandle(
      ref,
      () => {
        return {
          handleUpdatePosition(fileList: UploadFile<any>[]) {
            setFileList([...fileList]);

            const filePathList: { id?: any; url: string }[] = [];

            fileList.forEach((file) => {
              if (file.status !== "error") {
                filePathList.push({
                  id: file?.uid,
                  url: $url(file.response?.data?.path || file.url),
                });
              }
            });

            onUploadOk(filePathList);
          },
        };
      },
      []
    );

    const handleChange = ({ fileList }: { fileList: UploadFile<any>[] }) => {
      const filePathList: IFile[] = [];

      fileList.forEach((file) => {
        if (file.status === "error") {
          // message.config({ maxCount: 1 });
          message.error(file.response?.message);
        } else {
          filePathList.push({
            id: file?.uid,
            url: $url(file.response?.data?.path || file.url),
          });
        }
      });

      setFileList(fileList.filter((e) => e.status != "error"));

      onUploadOk(filePathList);

      if (recommendSize) {
        if (fileList.length == 0) {
          setImageSize({ width: 0, height: 0 });
        }
        filePathList.every((path) => {
          const imageSize = getImageSize(setImageSize, path.url);
          if (
            imageSize.width > recommendSize.width ||
            imageSize.height > recommendSize.height
          ) {
            return false;
          } else return true;
        });
      }
    };

    const handlePreview = (file: UploadFile) => {
      setPreviewImage(
        file.url || import.meta.env.VITE_IMG_URL + "/" + file.response.data.path
      );
      setPreviewVisible(true);
    };

    const checkSize = async (file: File): Promise<boolean> => {
      return new Promise((resolve) => {
        if (recommendSize) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener("load", (event) => {
            //@ts-ignore
            const _loadedImageUrl = event.target.result;
            const image = document.createElement("img");

            //@ts-ignore
            image.src = _loadedImageUrl;
            image.addEventListener("load", () => {
              const { width, height } = image;
              if (
                width > recommendSize.width ||
                height > recommendSize.height
              ) {
                message.error(
                  `Kích thước quá lớn (Đề xuất: ${recommendSize.width}x${recommendSize.height})`
                );

                return resolve(false);
              } else {
                resolve(true);
              }
            });
          });
        } else {
          return resolve(true);
        }
      });
    };

    const beforeUpload = async (file: File) => {
      const notLargeSize = await checkSize(file);

      const isImg = file.type.includes("image");

      if (!isImg) {
        message.error("Only accept image format");
      }

      return (notLargeSize && isImg) || Upload.LIST_IGNORE;
    };

    useEffect(() => {
      setFileList(() => fileListProp.map((e) => ({ ...e })));

      if (recommendSize) {
        for (let i = 0; i < fileListProp.length; i++) {
          //
          const file = fileListProp[i];
          if (file.url) {
            getImageSize(({ width, height }) => {
              if (
                width > recommendSize.width ||
                height > recommendSize.height
              ) {
                return setImageSize({ width, height });
              }
            }, file.url);
          }
        }
      }
    }, [fileListProp]);

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <>
        {recommendSize &&
          (imageSize.width > recommendSize?.width ||
            imageSize.height > recommendSize.height) && (
            <p style={{ color: "red" }}>
              Kích thước hình ảnh quá lớn cần chỉnh sửa lại
            </p>
          )}

        <Upload
          multiple
          headers={{
            token: getToken() || "",
            version: settings.version,
            role: "admin",
          }}
          action={uploadUrl}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={beforeUpload}
        >
          {uploadButton}
        </Upload>
        <Modal
          maskClosable={false}
          visible={previewVisible}
          title={""}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
);
