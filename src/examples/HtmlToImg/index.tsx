import React, { FC, useRef } from "react";
import html2canvas from "html2canvas";

interface IProps {}

const Demo: FC<IProps> = (props) => {
  const wrapRef = useRef(null);
  const doCut = () => {
    html2canvas(wrapRef.current).then((canvas) => {
      const img = new Image();
      img.src = canvas.toDataURL("png");
      img.setAttribute("crossOrigin", "anonymous");
      canvas.height = 500;
      var context = canvas.getContext("2d");
      img.onload = function () {
        var w = img.width;
        var h = img.height;
        context.drawImage(img, 0, 0, w, h, 0, 0, w, h);
        var imgUrl = canvas.toDataURL("image/png");
        console.log(imgUrl);

        const domA = document.createElement("a");
        domA.setAttribute("href", imgUrl);
        if ("download" in domA) {
          domA.setAttribute("download", "图片.png");
        }
        domA.style.display = "none";
        // 触发点击
        document.body.appendChild(domA);
        domA.click();
        // 然后移除
        document.body.removeChild(domA);
      };
    });
  };
  return (
    <div>
      <button style={{ margin: "16px 0" }} onClick={doCut}>
        点击截图
      </button>
      <div
        style={{ height: 350, width: 400, background: "#cfc" }}
        id="roc"
        ref={wrapRef}
      >
        <div>集会码1：xxx-xxx-xxx</div>
        <div>集会码2：xxx-xxx-xxx</div>
        <div>集会码3：xxx-xxx-xxx</div>
        <div>集会码4：xxx-xxx-xxx</div>
      </div>
    </div>
  );
};
export default Demo;
// <template>
//     <div style="margin-top: 30px;">
//       <button @click="doCut()"> 点击截图 </button>
//       <div style="height: 350px" id="roc" ref="roc"></div>
//     </div>
// </template>

// <script>
//     import html2canvas from 'html2canvas'
//     export default {
//        methods: {
//     doCut() {
//       html2canvas(this.$refs.roc).then((canvas) => {
//       const img = new Image()
//       img.src = canvas.toDataURL('png')
//       img.setAttribute('crossOrigin', 'anonymous')
//       canvas.height = 500
//       var context = canvas.getContext('2d')
//       img.onload = function() {
//         var w = img.width
//         var h = img.height
//         context.drawImage(img, 0, 0, w, h, 0, 0, w, h)
//         var imgUrl = canvas.toDataURL('image/png')
//         console.log(imgUrl);
//   }
// })
// };
//   }

//     }
// </script>
