import { useEffect } from "react";

export default function NoDataFound({ children, className, id, style }) {
  return (
    <p className={`${className} no-data-found`} id={id} style={style}>
      {children}
    </p>
  );
}
