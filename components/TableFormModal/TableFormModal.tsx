import { tableApi } from "@/api/table.api";
import { ModalStatus } from "@/types/modalStatus";
import { Table } from "@/types/table";
import { Form, Input, InputNumber, Modal, message } from "antd";
import { Rule } from "antd/lib/form";
import { useForm, useWatch } from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import React, { useImperativeHandle, useState } from "react";
const rules: Rule[] = [{ required: true }];

export interface TableModalRef {
  handleOpen: (status: ModalStatus, record?: Table) => void;
}

export const TableModal = React.forwardRef(
  ({ onSubmitOk }: { onSubmitOk: () => void }, ref) => {
    const [status, setStatus] = useState<ModalStatus>("create");
    const [form] = useForm();
    const [visibleModal, setVisibleModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState<Table>();
    const imageUrl = useWatch("image", form);

    useImperativeHandle(
      ref,
      () => {
        return {
          handleOpen(status: ModalStatus, record?: Table) {
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
            await tableApi.update(selectedData?._id || "", dataPost);
            message.success("Đã sửa");
            break;

          //create
          default:
            await tableApi.create(dataPost);
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
        title={status == "create" ? "Thêm bàn" : "Cập nhật bàn"}
        confirmLoading={loading}
        onOk={handleSubmitForm}
        destroyOnClose
        afterClose={() => form.resetFields()}
      >
        <Form form={form} layout="vertical">
          <FormItem rules={rules} required label="Tên bàn" name={"title"}>
            <Input />
          </FormItem>
          <FormItem required label="Vị trí" name={"position"}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </FormItem>
        </Form>
      </Modal>
    );
  }
);
