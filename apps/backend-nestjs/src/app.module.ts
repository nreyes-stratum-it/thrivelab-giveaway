import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {GiveawayModule} from "./modules/giveaway/presentation/giveaway.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GiveawayModule,
    ],
})
export class AppModule {
}
