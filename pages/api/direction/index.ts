import { createHandler } from "@api/handler";
import { createMultipleVehicles, createVehicleByPlateNumber } from "@lib/vehicle/api/service";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    const { plateNumber } = req.body;
    console.log(plateNumber);
    const result = await createVehicleByPlateNumber(plateNumber as string);

    return res.sendSuccess(result);

  } catch (e) {
    res.sendError(e);
  }
}).get(async (req, res) => {
  try {
    await createMultipleVehicles();

    return res.sendSuccess({});

  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
