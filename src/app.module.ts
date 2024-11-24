import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { OcurrenceModule } from './modules/ocurrence/ocurrence.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule, OcurrenceModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
