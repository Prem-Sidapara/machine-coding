import React, { useRef, useState } from "react";
import { Form, Modal, QRCode, Input } from "antd";
import { ArrowDownToLine } from "lucide-react";

const App = () => {
  const [form] = Form.useForm();
  const divRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState("");
  const [qr, setQr] = useState({
    value: "https://www.youtube.com/",
    icon: "",
    bgColor: "#ffffff",
    color: "#000000",
  });

  const downloadit = () => {
    const div = divRef.current;
    const canvas = div.querySelector("canvas");
    const base64String = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = base64String;
    a.download = "qr-code.png";
    a.click();
    a.remove();
  };

  const generateQr = (values) => {
    values.bgColor = values.bgColor || "#ffffff";
    values.color = values.color || "#000000";
    values.icon = icon;
    setOpen(false);
    setQr((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const chooseFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setIcon(url);
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
    setIcon("");
  };

  return (
    <div className="bg-[linear-gradient(359deg,_#667eea,_#764ba2)] h-screen py-12 flex flex-col items-center justify-center">
      <h1 className="text-4xl text-[#84fab0] text-stroke-2 font-bold mb-12">Generate - QR CODE</h1>
      <div
        ref={divRef}
        className="mb-12 rounded-xl p-4 bg-white shadow-lg w-fit hover:scale-115 transition:transform duration-300 hover:shadow-2xl "
      >
        <QRCode
          value={qr.value}
          size={200}
          icon={qr.icon}
          bgColor={qr.bgColor}
          color={qr.color}
        />
      </div>

      <div className="flex gap-4">
        <div className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          <button onClick={() => setOpen(true)}>Generate new QR</button>
        </div>

        <div className="flex rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          <ArrowDownToLine className="w-4 h-4" />
          <button size="large" onClick={downloadit}>
            Download
          </button>
        </div>

        <Modal open={open} onCancel={handleClose} footer={null}>
          <h1 className="text-lg font-medium mb-4">Generate your QR</h1>
          <Form onFinish={generateQr} form={form}>
            <Form.Item
              label="URL"
              name="value"
              rules={[{ required: true, type: "url" }]}
            >
              <Input size="large" placeholder="https://domain.com" />
            </Form.Item>

            <Form.Item
              label="BG color"
              name="bgColor"
              initialValue="#ffffff"
            >
              <Input type="color" size="large" />
            </Form.Item>

            <Form.Item
              label="Color"
              name="color"
              initialValue="#000000"
            >
              <Input type="color" size="large" />
            </Form.Item>

            {/* File input handled separately, not inside Form */}
            <div className="mb-4">
              <label className="block mb-2">Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={chooseFile}
              />
            </div>

            <Form.Item>
              <button size="large" type="submit">
                Generate
              </button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default App;
