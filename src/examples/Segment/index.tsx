import React from "react";
import "./index.less";
import NodeWrap from "./NodeWrap";

interface IProps {}
const list = [
  {
    name: "node1",
    type: "segment",
    children: [
      {
        name: "node11",
        children: [
          {
            name: "node111",
            children: [
              {
                name: "node1111",
              },
              {
                name: "node1112",
              },
              {
                name: "node1113",
              },
            ],
          },
        ],
      },
      {
        name: "node12",
        // children: [
        //   {
        //     name: "node121",
        //   },
        //   {
        //     name: "node122",
        //   },
        // ],
      },
    ],
  },
  // {
  //   name: "node2",
  //   type: "segment",
  //   children: [
  //     {
  //       name: "node21",
  //     },
  //     {
  //       name: "node22",
  //     },
  //   ],
  // },
  // {
  //   name: "node3",
  //   type: "segment",
  //   children: [
  //     {
  //       name: "node31",
  //     },
  //     {
  //       name: "node32",
  //     },
  //   ],
  // },
];

const NodeSegment = (props) => {
  return (
    <NodeWrap>
      <div
        {...props}
        style={{ width: 80, height: 32, background: "#959595" }}
      ></div>
    </NodeWrap>
  );
};

const NodeSubject = (props) => {
  return (
    <div
      {...props}
      style={{ background: "#cc7777" }}
      className="condition-node"
    ></div>
    // <div className="branch-wrap">
    //   <div className="branch-box-wrap">
    //     <div className="branch-box">
    //       <button className={`add-branch `}>添加条件</button>
    //       {branches.map((item, index) => {
    //         return (
    //           <div className="col-box" key={index.toString()}>
    //             <BranchNode
    //               {...item}
    //               first={index === 0}
    //               copyBranch={copyBranch}
    //             />
    //             {item.childNode && !item.isFold && (
    //               <Render pRef={item} config={item.childNode} />
    //             )}
    //             <CoverLine
    //               first={index === 0}
    //               last={index === branches.length - 1}
    //             />
    //           </div>
    //         );
    //       })}
    //     </div>
    //     {/* <AddNode objRef={restProps.objRef} /> */}
    //   </div>
    // </div>
  );
};

const RenderSubjectNode = ({ arr }) => {
  console.log(arr, "-----arr");
  return (
    <div className="branch-wrap">
      <div className="branch-box-wrap">
        <div
          className={`branch-box ${
            arr.length === 1 ? "branch-box-single" : ""
          }`}
        >
          <button className={`add-branch `}>添加条件</button>
          {arr.map((item, index) => {
            return (
              <div key={index} className={"col-box"}>
                <NodeSubject>
                  <div className="condition-node-box">
                    <div className="auto-judge ">{item.name}</div>
                  </div>
                </NodeSubject>
                {item.children && <RenderSubjectNode arr={item.children} />}
                {index == 0 ? (
                  <>
                    <div className="top-left-cover-line"></div>
                    <div className="bottom-left-cover-line"></div>
                  </>
                ) : (
                  ""
                )}
                {index == arr?.length - 1 ? (
                  <>
                    <div className="top-right-cover-line"></div>
                    <div className="bottom-right-cover-line"></div>
                  </>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const RenderNode = (props) => {
  const { config } = props;

  return (
    <>
      {config.map((item, index) => {
        const { type } = item;
        return (
          <div
            key={index}
            className={type === "segment" ? "segment" : "subject"}
          >
            {type === "segment" ? (
              <NodeSegment>{item.name}</NodeSegment>
            ) : (
              <NodeSubject>{item.name}</NodeSubject>
            )}
            {item.children && <RenderSubjectNode arr={item.children} />}
          </div>
        );
      })}
    </>
  );
};
const Segment: React.FC<IProps> = () => {
  return (
    <div>
      <RenderNode config={list} />
    </div>
  );
};

export default Segment;
