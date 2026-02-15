import {Module} from "@nestjs/common";
import {GiveawayController} from "./controllers/giveaway.controller";
import {PrismaService} from "../infrastructure/database/prisma.service";
import {GIVEAWAY_REPOSITORY} from "../domain/repositories/giveaway.repository.interface";
import {PrismaGiveawayRepository} from "../infrastructure/repositories/prisma-giveaway.repository";
import {GIVEAWAY_SERVICE} from "../domain/services/giveaway.service.interface";
import {GiveawayService} from "../application/services/giveaway.service";

@Module({
    controllers: [GiveawayController],
    providers: [
        PrismaService,
        {
            provide: GIVEAWAY_REPOSITORY,
            useClass: PrismaGiveawayRepository,
        },
        {
            provide: GIVEAWAY_SERVICE,
            useClass: GiveawayService,
        },
    ],
    exports: [GIVEAWAY_SERVICE],
})
export class GiveawayModule {
}