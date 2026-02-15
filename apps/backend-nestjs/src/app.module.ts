import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {GiveawayModule} from "./modules/giveaway/presentation/giveaway.module";
import {HealthController} from "./health/health.controller";
import {PrismaService} from "./modules/giveaway/infrastructure/database/prisma.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GiveawayModule,
    ],
    controllers: [
        HealthController,
    ],
    providers: [
        PrismaService,

    ]
})
export class AppModule {
}
