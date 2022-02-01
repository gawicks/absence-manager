import React from "react";
import style from "./ImageCell.module.scss";

function ImageCell({ src, alt }: { src: string; alt: string }) {
  return <img className={style.imageCell} alt={alt} src={src} />;
}

export default ImageCell;
