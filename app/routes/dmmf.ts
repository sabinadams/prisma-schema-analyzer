import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getDMMF, formatSchema } from "@prisma/sdk";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const schema = formData.get("schema")?.toString() || "";

  try {
    await formatSchema({ schema });
  } catch (e) {
    return json({ error: "Invalid schema." }, { status: 400 });
  }

  let dmmf = {};
  try {
    dmmf = await getDMMF({ datamodel: schema });
  } catch (e) {
    return json(
      {
        error:
          "There was a problem parsing the DMMF object. Please check your schema.",
      },
      { status: 400 }
    );
  }

  return json(dmmf);
};
