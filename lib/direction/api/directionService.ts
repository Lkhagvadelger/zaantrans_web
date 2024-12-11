import { Vehicle } from "@prisma/client";

import { prisma } from "@api/prisma";
import { AppError } from "@util/errors";
import { QueryParamType } from "@ui/hooks/query-param";

export const getDirectionList = async (filter: QueryParamType) => {
    const size = Number(filter.size),
        page = Number(filter.page);

    if (size <= 0 || page <= 0)
        throw AppError.BadRequest("validation.paging.size");

    const filters: any[] = [];
    if (filter.text) {
        const fText = { contains: filter.text, mode: "insensitive" };
        filters.push({
            OR: [
                { shortName: fText },
                { totalDistance: fText },
                { totalTime: fText },
                { costPerKm: fText }
            ],
        });
    }

    const where = filters.length === 0 ? {} : filters.length === 1 ? filters[0] : { AND: filters };
    const total = await prisma.transportDirection.count({ where });

    return {
        total,
        pages: Math.ceil(total / size),
        data: await prisma.transportDirection.findMany({
            where,
            include: {
                startingLocation: true,
                endingLocation: true,
                transportation: true
            },
            orderBy: { createdAt: "desc" },
            skip: size * (page - 1),
            take: size,
        }),
    };
};