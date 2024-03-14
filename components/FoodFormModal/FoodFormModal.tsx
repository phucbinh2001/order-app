import { foodApi } from "@/api/food.api";
import { useCategory } from "@/hooks/useCategory";
import { Food } from "@/types/food";
import { ModalStatus } from "@/types/modalStatus";
import { Form, Input, InputNumber, Modal, Select, message } from "antd";
import { Rule } from "antd/lib/form";
import { useForm, useWatch } from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { SingleImageUpload } from "../Uploads/SingleImageUpload";
const rules: Rule[] = [{ required: true }];

export interface FoodModalRef {
  handleOpen: (status: ModalStatus, record?: Food) => void;
}

export const FoodModal = React.forwardRef(
  ({ onSubmitOk }: { onSubmitOk: () => void }, ref) => {
    const [status, setStatus] = useState<ModalStatus>("create");
    const [form] = useForm();
    const [visibleModal, setVisibleModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState<Food>();
    const { fetchCategories, categories } = useCategory({ initQuery: {} });
    const imageUrl = useWatch("image", form);

    useEffect(() => {
      fetchCategories();
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          handleOpen(status: ModalStatus, record?: Food) {
            setSelectedData(record);
            setStatus(status);
            setVisibleModal(true);
            if (status == "create") {
              form.resetFields();
            } else {
              form.setFieldsValue(record);
            }
          },
        };
      },
      []
    );
    const handleSubmitForm = async () => {
      await form.validateFields();
      setLoading(true);
      const dataPost = form.getFieldsValue();
      try {
        switch (status) {
          case "update":
            await foodApi.update(selectedData?._id || "", dataPost);
            message.success("Đã sửa");
            break;

          //create
          default:
            await foodApi.create(dataPost);
            message.success("Đã thêm");
            break;
        }

        onSubmitOk();
        setVisibleModal(false);
      } finally {
        setLoading(false);
      }
    };

    return (
      <Modal
        onCancel={() => setVisibleModal(false)}
        open={visibleModal}
        title={status == "create" ? "Thêm món ăn" : "Cập nhật món ăn"}
        confirmLoading={loading}
        onOk={handleSubmitForm}
        destroyOnClose
        afterClose={() => form.resetFields()}
      >
        <Form form={form} layout="vertical">
          <FormItem rules={rules} required label="Ảnh" name={"image"}>
            <SingleImageUpload
              imageUrl={imageUrl}
              onUploadOk={(image) => {
                form.setFieldValue("image", image);
              }}
            />
          </FormItem>
          <FormItem rules={rules} required label="Tên món" name={"title"}>
            <Input />
          </FormItem>
          <FormItem label="Mô tả ngắn" name={"description"}>
            <Input.TextArea rows={2} maxLength={100} showCount />
          </FormItem>
          <FormItem rules={rules} required label="Giá" name={"price"}>
            <Input />
          </FormItem>
          <FormItem rules={rules} required label="Danh mục" name={"categoryId"}>
            <Select
              style={{ width: "100%" }}
              allowClear
              showSearch
              options={categories?.map((item) => ({
                label: item.title,
                value: item._id,
              }))}
            />
          </FormItem>
          <FormItem label="Vị trí" name={"position"}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </FormItem>
        </Form>
      </Modal>
    );
  }
);
