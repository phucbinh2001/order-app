import { staffApi } from "@/api/staff.api";
import { ModalStatus } from "@/types/modalStatus";
import { User, roleOptions } from "@/types/user";
import { Form, Input, Modal, Select, message } from "antd";
import { Rule } from "antd/lib/form";
import { useForm, useWatch } from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import React, { useImperativeHandle, useState } from "react";
const rules: Rule[] = [{ required: true }];

export interface UserModalRef {
  handleOpen: (status: ModalStatus, record?: User) => void;
}

export const UserModal = React.forwardRef(
  ({ onSubmitOk }: { onSubmitOk: () => void }, ref) => {
    const [status, setStatus] = useState<ModalStatus>("create");
    const [form] = useForm();
    const [visibleModal, setVisibleModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState<User>();
    const imageUrl = useWatch("image", form);

    useImperativeHandle(
      ref,
      () => {
        return {
          handleOpen(status: ModalStatus, record?: User) {
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
            await staffApi.update(selectedData?._id || "", dataPost);
            message.success("Đã sửa");
            break;

          //create
          default:
            await staffApi.create(dataPost);
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
        title={status == "create" ? "Thêm bàn" : "Cập nhật nhân viên"}
        confirmLoading={loading}
        onOk={handleSubmitForm}
        destroyOnClose
        afterClose={() => form.resetFields()}
      >
        <Form form={form} layout="vertical">
          <FormItem
            rules={rules}
            required
            label="Tên đăng nhập"
            name={"username"}
          >
            <Input disabled={status == "update"} autoComplete="new-password" />
          </FormItem>
          {status == "create" && (
            <FormItem rules={rules} required label="Mật khẩu" name={"password"}>
              <Input.Password autoComplete="new-password" />
            </FormItem>
          )}

          <FormItem rules={rules} required label="Tên nhân viên" name={"name"}>
            <Input />
          </FormItem>

          <FormItem rules={rules} required label="Quyền" name={"role"}>
            <Select
              style={{ width: "100%" }}
              allowClear
              filterOption={false}
              options={roleOptions}
            />
          </FormItem>
        </Form>
      </Modal>
    );
  }
);
