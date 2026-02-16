import {Module} from "@nestjs/common";
import {GiveawayController} from "./controllers/giveaway.controller";
import {PrismaService} from "../infrastructure/database/prisma.service";
import {GIVEAWAY_REPOSITORY} from "../domain/repositories/giveaway.repository.interface";
import {PrismaGiveawayRepository} from "../infrastructure/repositories/prisma-giveaway.repository";
import {GIVEAWAY_SERVICE} from "../domain/services/giveaway.service.interface";
import {GiveawayService} from "../application/services/giveaway.service";
import {EVENT_PUBLISHER} from "../../../shared/events/event-publisher.interface";
import {SqsEventPublisher} from "../../../shared/events/sqs-event-publisher";
import {MockEventPublisher} from "../../../shared/events/mock-event-publisher";

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
        {
            provide: EVENT_PUBLISHER,
            useClass: process.env.NODE_ENV === 'production'
                ? SqsEventPublisher
                : MockEventPublisher,
        },
    ],
    exports: [GIVEAWAY_SERVICE],
})
export class GiveawayModule {
}