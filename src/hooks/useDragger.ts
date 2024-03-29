import { type Dispatch, useEffect, useRef } from "react";
import { ACTIONS } from "../reducers/actions";
import { type TableData } from "../Constants/Table";
import type { RelationData } from "../Constants/Relation";
import { tableRelationExists } from "../utils/table";
import { setRelationCoordinates } from "../utils/relation";

function useDragger(
  table: TableData,
  tableDispatch: Dispatch<any>,
  relations: RelationData[]
): void {
  const isClicked = useRef<boolean>(false);
  const id = table.id.toString();
  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: table.startX,
    startY: table.startY,
    lastX: table.endX,
    lastY: table.endY
  });

  useEffect(() => {
    const target = document.getElementById(id);
    if (target == null) throw new Error("Element with given id doesn't exist");

    const container = target.parentElement;
    if (container == null) throw new Error("target element must have a parent");

    target.style.top = table.endY.toString() + "px";
    target.style.left = table.endX.toString() + "px";
    target.style.zIndex = "10";

    const onMouseDown = (e: MouseEvent): void => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = (e: MouseEvent): void => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
      table.startX = coords.current.startX;
      table.startY = coords.current.startY;
      table.endX = coords.current.lastX;
      table.endY = coords.current.lastY;
      tableDispatch({ type: ACTIONS.EDIT_TABLE, payload: table });
      for (const relation of relations) {
        if (tableRelationExists(table, relation)) {
          setRelationCoordinates(relation);
        }
      }
    };

    const onMouseMove = (e: MouseEvent): void => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;
      for (const relation of relations) {
        if (tableRelationExists(table, relation)) {
          setRelationCoordinates(relation);
        }
      }
    };

    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    // container.addEventListener('mouseleave', onMouseUp);

    const cleanup = (): void => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, [table, relations]);
}

export default useDragger;
