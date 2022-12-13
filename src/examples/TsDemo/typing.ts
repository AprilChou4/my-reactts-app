import React, { FC, PropsWithChildren, ReactNode } from "react";

export type IProps = PropsWithChildren<{
  // 名称
  name?: string;
  // 年龄
  age?: number;
  //  是否必填
  isRequired?: boolean;
}>;
