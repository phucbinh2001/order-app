"use client";
import { staffApi } from "@/api/staff.api";
import {
  UserModal,
  UserModalRef,
} from "@/components/UserFormModal/UserFormModal";
import { useStaff } from "@/hooks/useStaff";
import { User, UserRole, roleTrans } from "@/types/user";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import Column from "antd/es/table/Column";
import { useEffect, useRef } from "react";

export default function StaffPage() {
  const { fetchStaffs, staffs, query, loading } = useStaff({
    initQuery: {},
  });
  const userModalRef = useRef<UserModalRef>();

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handelDelete = async (id: string) => {
    await staffApi.delete(id);
    fetchStaffs();
  };

  return (
    <>
      <Space style={{ width: 300, marginBottom: 15 }}>
        <Search
          loading={loading}
          placeholder="Nhập tên nhân viên để tìm kiếm..."
          onSearch={(value) => {
            query.search = value;
            fetchStaffs();
          }}
          enterButton
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => userModalRef.current?.handleOpen("create")}
        >
          Thêm mới
        </Button>
      </Space>

      <Table className="table-striped-rows" dataSource={staffs} size="small">
        <Column title="Họ tên" dataIndex="name" key="name" />
        <Column title="Username" dataIndex="username" key="username" />
        <Column
          align="center"
          title="Quyền"
          dataIndex="role"
          key="role"
          render={(text: UserRole) => (
            <Tag
              bordered={false}
              className="font-semibold"
              color={roleTrans[text].color}
            >
              {roleTrans[text]?.label}
            </Tag>
          )}
        />
        <Column
          width={100}
          title="Hành động"
          key="action"
          render={(text, record: User) => (
            <Space>
              <Button
                onClick={() =>
                  userModalRef.current?.handleOpen("update", record as User)
                }
                type="primary"
                icon={<EditFilled />}
              >
                Chỉnh sửa
              </Button>
              <Popconfirm
                title={`Bàn này sẽ bị xóa. Tiếp tục?`}
                onConfirm={() => handelDelete(record._id)}
                okText={"Xóa"}
                cancelText={"Hủy"}
              >
                <Button type="primary" danger icon={<DeleteFilled />}>
                  Xóa
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>

      <UserModal ref={userModalRef} onSubmitOk={fetchStaffs} />
    </>
  );
}
