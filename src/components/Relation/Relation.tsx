import React, { type Dispatch, useEffect, useRef, useState } from "react";
import type { RelationData } from "../../Constants/Relation";
// import { relationsTypes } from "../../enums/relations";

interface RelationProps {
  relation: RelationData;
  activeRelation: number;
  setActiveRelation: Dispatch<any>;
}
interface Coordinates {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}
// function renderType(param: string, coordinates: Coordinates): JSX.Element {
//   switch (param) {
//     case relationsTypes.ONETOMANY:
//       return (
//         <polyline
//           style={{
//             stroke: "rgba(255,255,0,0.9)",
//             strokeLinecap: "round",
//             strokeWidth: 5,
//             cursor: "pointer",
//             zIndex: "10"
//           }}
//           fill="none"
//           points={
//             (coordinates.targetX - 230).toString() +
//             " " +
//             coordinates.targetY.toString() +
//             "," +
//             (coordinates.targetX - 220).toString() +
//             " " +
//             (coordinates.targetY - 10).toString()
//           }
//         />
//       );
//     default:
//       return (
//         <polyline
//           style={{
//             stroke: "rgba(255,255,0,0.9)",
//             strokeLinecap: "round",
//             strokeWidth: 5,
//             cursor: "pointer",
//             zIndex: "10"
//           }}
//           fill="none"
//           points={
//             (coordinates.targetX - 230).toString() +
//             " " +
//             coordinates.targetY.toString() +
//             "," +
//             (coordinates.targetX - 220).toString() +
//             " " +
//             (coordinates.targetY - 10).toString()
//           }
//         />
//       );
//   }
// }
function Relation({
  relation,
  activeRelation,
  setActiveRelation
}: RelationProps): JSX.Element {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    sourceX: 0,
    sourceY: 0,
    targetX: 0,
    targetY: 0
  });
  const relationRef = useRef<SVGPolylineElement | null>(null);
  const { sourceColumnId, targetColumnId, id } = relation;

  useEffect(() => {
    const sourceColumn = document.getElementById(sourceColumnId.toString());
    const targetColumn = document.getElementById(targetColumnId.toString());
    if (sourceColumn != null && targetColumn != null) {
      const sourceColumnRect: DOMRect = sourceColumn.getBoundingClientRect();
      const targetColumnRect: DOMRect = targetColumn.getBoundingClientRect();
      const { left: sourceX, top: sourceY } = sourceColumnRect;
      const { left: targetX, top: targetY } = targetColumnRect;
      const coordinate = {
        sourceX: sourceX + sourceColumnRect.width,
        sourceY: sourceY + sourceColumnRect.height / 2,
        targetX,
        targetY: targetY + targetColumnRect.height / 2
      };
      setCoordinates(coordinate);
    }
  }, []);
  const handleClickLine = (): void => {
    setActiveRelation(id);
  };
  return (
    <>
      <polyline
        id={id.toString()}
        style={{
          stroke:
            activeRelation !== id
              ? "rgba(255,255,0,0.5)"
              : "rgba(255,255,0,0.9)",
          strokeLinecap: "round",
          strokeWidth: 5,
          cursor: "pointer",
          zIndex: "10"
        }}
        ref={relationRef}
        onClick={handleClickLine}
        fill="none"
        points={
          coordinates.sourceX.toString() +
          " " +
          coordinates.sourceY.toString() +
          "," +
          ((coordinates.sourceX + coordinates.targetX) / 2).toString() +
          " " +
          coordinates.sourceY.toString() +
          "," +
          ((coordinates.sourceX + coordinates.targetX) / 2).toString() +
          " " +
          coordinates.targetY.toString() +
          "," +
          coordinates.targetX.toString() +
          " " +
          coordinates.targetY.toString()
        }
      />
      {/* {renderType(data.type, coordinates)} */}
    </>
  );
}
export default Relation;
