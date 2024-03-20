import { Drawer } from "antd";
import React, { useImperativeHandle, useState } from "react";

export interface IosGuideRef {
  handleOpen: () => void;
}

export const IosGuide = React.forwardRef(({}: {}, ref) => {
  const [visibleModal, setVisibleModal] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        handleOpen() {
          setVisibleModal(true);
        },
      };
    },
    []
  );

  return (
    <Drawer
      height={"max-content"}
      destroyOnClose
      placement="bottom"
      onClose={() => setVisibleModal(false)}
      open={visibleModal}
      closeIcon={<></>}
      title={
        <div className="text-center flex justify-center">
          <div className="w-[50px] bg-slate-500 h-[6px] rounded-full"></div>
        </div>
      }
      style={{
        maxWidth: 500,
        margin: "auto",
        height: "max-content",
      }}
      styles={{
        content: { borderRadius: "20px 20px 0 0", boxShadow: "none" },
        wrapper: { boxShadow: "none" },
        header: { border: "none" },
        body: { paddingBottom: 40, paddingTop: 10 },
      }}
    >
      <div className="max-w-[500px] mx-auto w-full rounded-lg bg-slate-100 mb-5 py-1 relative">
        <div className="flex p-3 gap-2 items-center">
          <img src="/logo.png" className="rounded-xl size-16" />
          <div>
            <b>Order App</b>
            <p className="text-slate-700 text-xs">Hướng dẫn cài đặt ứng dụng</p>
          </div>
        </div>
      </div>
      <div className="how-to-body border-t pt-5">
        <div className="description-step flex items-center gap-2 bg-slate-100 rounded-lg p-3">
          <div className="svg-wrap">
            <svg
              id="pwa-share"
              width={25}
              height={32}
              viewBox="0 0 17.695 26.475"
            >
              <g fill="currentColor">
                <path d="M17.334 10.762v9.746c0 2.012-1.025 3.027-3.066 3.027H3.066C1.026 23.535 0 22.52 0 20.508v-9.746C0 8.75 1.025 7.734 3.066 7.734h2.94v1.573h-2.92c-.977 0-1.514.527-1.514 1.543v9.57c0 1.015.537 1.543 1.514 1.543h11.152c.967 0 1.524-.527 1.524-1.543v-9.57c0-1.016-.557-1.543-1.524-1.543h-2.91V7.734h2.94c2.04 0 3.066 1.016 3.066 3.028Z" />
                <path d="M8.662 15.889c.42 0 .781-.352.781-.762V5.097l-.058-1.464.654.693 1.484 1.582a.698.698 0 0 0 .528.235c.4 0 .713-.293.713-.694 0-.205-.088-.361-.235-.508l-3.3-3.183c-.196-.196-.362-.264-.567-.264-.195 0-.361.069-.566.264L4.795 4.94a.681.681 0 0 0-.225.508c0 .4.293.694.703.694.186 0 .4-.079.538-.235l1.474-1.582.664-.693-.058 1.465v10.029c0 .41.351.762.771.762Z" />
              </g>
            </svg>
          </div>
          <div className="step-text text-base">
            Nhấn biểu tượng chia sẻ ở thanh điều hướng bên dưới
          </div>
        </div>
        <div className="description-step flex items-center gap-2 bg-slate-100 rounded-lg p-3 mt-2">
          <div className="svg-wrap">
            <svg id="pwa-add" width={25} height={25}>
              <g>
                <path d="m23.40492,1.60784c-1.32504,-1.32504 -3.19052,-1.56912 -5.59644,-1.56912l-10.65243,0c-2.33622,0 -4.2017,0.24408 -5.5267,1.56912c-1.32504,1.34243 -1.56911,3.17306 -1.56911,5.50924l0,10.5827c0,2.40596 0.22665,4.254 1.55165,5.57902c1.34246,1.32501 3.19052,1.5691 5.59647,1.5691l10.60013,0c2.40592,0 4.2714,-0.24408 5.59644,-1.5691c1.325,-1.34245 1.55166,-3.17306 1.55166,-5.57902l0,-10.51293c0,-2.40596 -0.22666,-4.25401 -1.55166,-5.57901zm-0.38355,5.21289l0,11.24518c0,1.51681 -0.20924,2.94643 -1.02865,3.78327c-0.83683,0.83685 -2.30134,1.0635 -3.81815,1.0635l-11.33234,0c-1.51681,0 -2.96386,-0.22665 -3.80073,-1.0635c-0.83683,-0.83684 -1.04607,-2.26646 -1.04607,-3.78327l0,-11.19288c0,-1.5517 0.20924,-3.01617 1.02865,-3.85304c0.83687,-0.83683 2.31876,-1.04607 3.87042,-1.04607l11.28007,0c1.51681,0 2.98132,0.22666 3.81815,1.06353c0.81941,0.81941 1.02865,2.26645 1.02865,3.78327zm-10.53039,12.08205c0.64506,0 1.02861,-0.43586 1.02861,-1.13326l0,-4.34117l4.53294,0c0.66252,0 1.13326,-0.36613 1.13326,-0.99376c0,-0.64506 -0.43586,-1.02861 -1.13326,-1.02861l-4.53294,0l0,-4.53294c0,-0.6974 -0.38355,-1.13326 -1.02861,-1.13326c-0.62763,0 -0.99376,0.45332 -0.99376,1.13326l0,4.53294l-4.51552,0c-0.69737,0 -1.15069,0.38355 -1.15069,1.02861c0,0.62763 0.48817,0.99376 1.15069,0.99376l4.51552,0l0,4.34117c0,0.66252 0.36613,1.13326 0.99376,1.13326z" />
              </g>
            </svg>
          </div>
          <div className="step-text text-base">Nhấn Thêm vào MH chính</div>
        </div>
      </div>
    </Drawer>
  );
});
