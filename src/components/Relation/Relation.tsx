import React, { useEffect, useState } from "react";
import type { RelationData } from "../../Constants/Relation";
interface RelationProps {
  relation: RelationData;
}
interface Coordinates {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}
function Relation({ relation }: RelationProps): JSX.Element {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    sourceX: 0,
    sourceY: 0,
    targetX: 0,
    targetY: 0
  });
  const { sourceColumnId, targetColumnId, id } = relation;

  useEffect(() => {
    const sourceColumn = document.getElementById(sourceColumnId.toString());
    const targetColumn = document.getElementById(targetColumnId.toString());
    console.log(sourceColumn);

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
      console.log({ coordinate });
      setCoordinates(coordinate);
    }
  }, []);
  return (
    <svg
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: "0"
      }}
    >
      <polyline
        id={id.toString()}
        style={{
          stroke: "rgba(255,255,0,0.5)",
          strokeLinecap: "round",
          strokeWidth: 3
        }}
        points={
          coordinates.sourceX.toString() +
          " " +
          coordinates.sourceY.toString() +
          "," +
          coordinates.targetX.toString() +
          " " +
          coordinates.targetY.toString()
        }
      />
    </svg>
  );
}
export default Relation;
