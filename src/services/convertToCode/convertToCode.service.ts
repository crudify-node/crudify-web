import { type CRUDIFY_DATA } from "../../Constants/CrudifyData";

export const convertToCodeFromCrudifyData = async (
  data: CRUDIFY_DATA
): Promise<any> => {
  console.log({ data });
  const element = document.createElement("a");
  const textFile: any = new Blob([JSON.stringify(data) as BlobPart], {
    type: "json"
  });
  element.href = URL.createObjectURL(textFile);
  element.download = "userFile.json";
  document.body.appendChild(element);
  element.click();
};
