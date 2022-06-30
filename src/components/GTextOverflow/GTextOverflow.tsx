import React, { FC, useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { useResizeDetector } from "react-resize-detector";
import clsx from "clsx";

import { useStyles } from "./styles";

import { GTextOverflowProps } from "./types";

export const GTextOverflow: FC<GTextOverflowProps> = ({
  title,
  id,
  classname = "",
}) => {
  const [hoverStatus, setHover] = useState(true);
  const { ref: textElementRef, width } = useResizeDetector();
  const classes = useStyles();

  useEffect(() => {
    if (!textElementRef) return;

    const compare =
      textElementRef.current.clientWidth <= textElementRef.current.scrollWidth;
    setHover(compare);
  }, [textElementRef, width]);

  return (
    <Tooltip
      id={id}
      title={title}
      disableHoverListener={!hoverStatus}
      placement="top"
    >
      <span
        ref={textElementRef}
        className={clsx(classes.tooltipText, classname)}
      >
        {title}
      </span>
    </Tooltip>
  );
};
