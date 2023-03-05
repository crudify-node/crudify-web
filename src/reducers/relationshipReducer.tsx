import { type RelationData } from "../Constants/Relation";
import { newRelation } from "../utils/relation";
import { ACTIONS } from "./actions";

export const relationReducer = (
  relations: RelationData[],
  action: any
): RelationData[] => {
  switch (action.type) {
    case ACTIONS.CREATE_RELATION: {
      const relationData = JSON.parse(
        localStorage.getItem("relationData") ?? "{}"
      );
      relationData.data = [...relations, newRelation(action.payload)];
      localStorage.setItem("relationData", JSON.stringify(relationData));
      return [...relations, newRelation(action.payload)];
    }
    case ACTIONS.DELETE_RELATION: {
      const updatedRelations = relations.filter(
        (relation) => relation.id !== action.payload.id
      );
      localStorage.setItem(
        "relationData",
        JSON.stringify({ data: updatedRelations })
      );
      return updatedRelations;
    }
    case ACTIONS.SET_RELATION:
      return action.payload.data;
    case ACTIONS.EDIT_RELATION: {
      const editedTableData = relations.map((relation) => {
        if (relation.id === action.payload.id) {
          return action.payload;
        }
        return relation;
      });
      const relationData = JSON.parse(
        localStorage.getItem("relationData") ?? "{}"
      );
      relationData.data = editedTableData;
      localStorage.setItem("relationData", JSON.stringify(relationData));
      return editedTableData;
    }
    default:
      return relations;
  }
};
