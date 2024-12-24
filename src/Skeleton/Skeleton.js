import { useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function SkeletonFun(props) {
  let SkeShow = Array.from({ length: props.count }).map((_, index) => (
    <div key={index} className={props.classs}>
      <div className="mx-2">
        <Skeleton height={props.height} width={props.width} />
      </div>
    </div>
  ));

  return SkeShow;
}
