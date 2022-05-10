import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getDMMF, formatSchema } from "@prisma/sdk";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const schema = formData.get("schema")?.toString() || "";

  try {
    await formatSchema({ schema });
  } catch (e: any) {
    return json(
      { error: "Invalid schema.", details: e.message },
      { status: 400 }
    );
  }

  let dmmf = {};
  try {
    dmmf = await getDMMF({ datamodel: schema });
  } catch (e: any) {
    return json(
      {
        error:
          "There was a problem parsing the DMMF object. Please check your schema.",
        details: e.message,
      },
      { status: 400 }
    );
  }

  return json(dmmf);
};
