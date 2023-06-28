"use client";

import Image from "next/image";
import React, { useEffect } from "react";

function imageZoom(imgID: string, resultID: string) {
  let img: HTMLImageElement, result: HTMLElement, cx: number, cy: number;
  img = document.getElementById(imgID) as HTMLImageElement;
  result = document.getElementById(resultID)!;
  /*create lens:*/
  let lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /*insert lens:*/
  img.parentElement!.insertBefore(lens, img);
  /*calculate the ratio between result DIV and lens:*/
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /*set background properties for the result DIV:*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";
  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e: MouseEvent | TouchEvent) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  }
  function getCursorPos(e: any) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}

const ProductImage = ({ url }: { url: string }) => {
  useEffect(() => {
    imageZoom("product_img", "zoomResult");
  });
  return (
    <div className="group relative z-10 img-zoom-container">
      <Image
        src={url}
        width={400}
        height={500}
        alt=""
        className="w-full h-full object-cover rounded-md border-2 border-black"
        id="product_img"
      />
      <div
        id="zoomResult"
        className="absolute top-1/2 w-96 h-80 max-w-[100vw] -translate-y-1/2 scale-0 group-hover:scale-100 left-[calc(100%_+_2rem)]"
      ></div>
    </div>
  );
};

export default ProductImage;
