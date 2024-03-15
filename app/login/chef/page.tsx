"use client";
import { authApi } from "@/api/auth.api";
import { rules } from "@/constants";
import { setLoginCookie } from "@/utils/cookie";
import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useForm } from "antd/lib/form/Form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChefLoginPage() {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmitForm = async () => {
    try {
      setLoading(true);
      await form.validateFields();
      const dataPost = form.getFieldsValue();
      //@ts-ignore
      const { accessToken, user } = await authApi.chefLogin(dataPost);
      setLoginCookie(accessToken, user);
      router.push("/chef");
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        style={{
          background:
            "linear-gradient(109.6deg, rgb(255, 78, 80) 11.2%, rgb(249, 212, 35) 100.2%)",
        }}
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="flex justify-center mt-10">
              <Link
                href="/"
                className="flex items-center mb-2 text-2xl font-semibold text-gray-900 text-center"
              >
                <img
                  className="size-14 rounded-xl"
                  src="/logo.png"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="p-10 pt-0 pb-10">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Đăng nhập <br />
                <span className="text-lg text-[#f57417]">Dành cho Đầu bếp</span>
              </h1>
              <Form
                layout="vertical"
                form={form}
                className="space-y-4 md:space-y-6 !mt-8"
              >
                <FormItem
                  rules={rules}
                  style={{ fontWeight: 600 }}
                  label="Tên đăng nhập"
                  name={"username"}
                >
                  <Input size="large" />
                </FormItem>

                <FormItem
                  rules={rules}
                  style={{ fontWeight: 600 }}
                  label="Mật khẩu"
                  name={"password"}
                >
                  <Input.Password size="large" />
                </FormItem>

                <Button
                  loading={loading}
                  type="primary"
                  size="large"
                  block
                  className="!font-semibold"
                  onClick={handleSubmitForm}
                >
                  Đăng nhập
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
