import { type CRUDIFY_DATA } from "../../Constants/CrudifyData";
import { BASE_URL } from "../../envs/environment";
export const convertToCodeFromCrudifyData = async (
  data: CRUDIFY_DATA
): Promise<any> => {
  await fetch(BASE_URL() + "api/crudify", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(async (res) => {
    const blob = await res.blob();
    const newBlob = new Blob([blob]);
    const blobUrl = window.URL.createObjectURL(newBlob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", "target.zip");
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  });
};
