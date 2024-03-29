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
        name: "node11", // 节点名称
        type: "theme", // 节点类型- theme=主题  segment=业务,
        childCount: 0, // 节点的子节点个数
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
        children: [
          {
            name: "node121",
          },
          {
            name: "node122",
          },
        ],
      },
    ],
  },
  {
    name: "node2",
    type: "segment",
    children: [
      {
        name: "node21",
      },
      {
        name: "node22",
      },
    ],
  },
  {
    name: "node3",
    type: "segment",
    children: [
      {
        name: "node31",
      },
      {
        name: "node32",
      },
    ],
  },
];

//
// 设置每个节点的统计字段,并返回所有节点总数。
var toTreeCount = (data = [], countField = "childCount") =>
  data.reduce(
    (total, cur) =>
      total + (cur[countField] = toTreeCount(cur.children || [], countField)),
    data.length
  );
toTreeCount(list);
console.log(list, "------childCount");

const NodeSegment = (props) => {
  return (
    <NodeWrap>
      <div {...props}></div>
    </NodeWrap>
  );
};

const NodeSubject = (props) => {
  return (
    <div {...props} className="condition-node"></div>
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

const RenderSubjectNode = ({ arr, childCount }) => {
  // console.log(arr, "-----arr");
  return (
    <div className="branch-wrap">
      <div className="branch-box-wrap">
        <div className={`branch-box `}>
          <button className={`add-branch `}>{childCount}</button>
          {arr.map((item, index) => {
            return (
              <div key={index} className={"col-box"}>
                <NodeSubject>
                  <div
                    className={`condition-node-box ${
                      item.children?.length ? "" : "condition-node-box-last"
                    }`}
                  >
                    <div className="auto-judge ">{item.name}</div>
                  </div>
                </NodeSubject>
                {item.children && (
                  <RenderSubjectNode
                    arr={item.children}
                    childCount={item.childCount}
                  />
                )}
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
            {item.children && (
              <RenderSubjectNode
                arr={item.children}
                childCount={item.childCount}
              />
            )}
          </div>
        );
      })}
    </>
  );
};
const Segment: React.FC<IProps> = () => {
  return <RenderNode config={list} />;
};

export default Segment;
