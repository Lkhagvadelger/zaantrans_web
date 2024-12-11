import { Vehicle } from "@prisma/client";
import { getVehiclePublicData } from "./smartcart";
import { prisma } from "@api/prisma";
import { AppError } from "@util/errors";
import { QueryParamType } from "@ui/hooks/query-param";

export const createMultipleVehicles = async () => {
    const plateNumbers =['6938уня', '1287убл', '7446уне', '5845уаа', '6670уеа', '9196уеа', '7582убг', '9196уам', '5313унэ', '3243убо', '8979уао', '9197унз', '7964уне', '9786уае', '7298убб', '7445уас', '9196уна', '5800уас', '4755убб', '9196унз', '5811уау', '7985уау', '2741убп', '6632убү', '1742убх', '3188уас', '8667убд', '8918уну', '0921уар', '3813убр', '4735убч', '8452унз', '8376убч', '9566унв', '4895убо', '6036уек', '6893убө', '8733убн', '6715унн', '7731унө', '2521уна', '8311уео', '7928уек', '0432убх', '4043уне', '2280убр', '7928убб', '7568уну', '2296унд', '8094убл', '2529убн', '7637уас', '5784уне', '6085дуа', '8819өво', '6747уан', '2260убэ', '1773уня', '6996унн', '8222уен', '1297унв', '4560уар', '7298убо', '2004унч', '6108уае', '8376убү', '4250убд', '5154уам', '9566уав', '9686убн', '7566уат', '3376убб', '4894убо', '0298уар', '3181уат', ' 9895ун', '8979уау', '0287уае', '0581утс', '8196уат', '9895унт', '7018уам'];
    // iterate create
    for (const plateNumber of plateNumbers) {
        console.log(plateNumber);
        try {
            await createVehicleByPlateNumber(plateNumber.toUpperCase());
        } catch (e) {
            console.log(e);
        }
    }
}
export const createVehicleByPlateNumber = async (plateNumber: string) => {
    const data = await getVehiclePublicData(plateNumber);
    const vehicle = await createVehicle(data);
    return vehicle;
};
export const createVehicle = async (vehicle: Vehicle) => {
    //check if vehicle exists
    const existingVehicle = await prisma.vehicle.findFirst({
        where: {
            plateNumber: vehicle.plateNumber,
        },
    });
    if (existingVehicle) {
        return existingVehicle;
    }
    const data = await prisma.vehicle.create({
        data: vehicle,
    });
    return data;
};
export const getVehicleList = async (filter: QueryParamType) => {
    const size = Number(filter.size),
        page = Number(filter.page);

    if (size <= 0 || page <= 0)
        throw AppError.BadRequest("validation.paging.size");

    const filters: any[] = [];
    if (filter.text) {
        const fText = { contains: filter.text, mode: "insensitive" };
        filters.push({
            OR: [
                { plateNumber: fText },
                { cabinNumber: fText },
                { markName: fText },
                { modelName: fText }
            ],
        });
    }

    const where = filters.length === 0 ? {} : filters.length === 1 ? filters[0] : { AND: filters };
    const total = await prisma.vehicle.count({ where });

    return {
        total,
        pages: Math.ceil(total / size),
        data: await prisma.vehicle.findMany({
            where,
            include: {
                driver: {
                    select: {
                        id: true,
                        phoneNumber: true,
                        profile: {
                            select: {
                                firstName: true,
                                lastName: true,
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: "desc" },
            skip: size * (page - 1),
            take: size,
        }),
    };
};

