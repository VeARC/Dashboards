import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FundTypesModule } from './fundTypes/fundTypes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'krishna',
      password: 'pass1234',
      database: 'DWFinance',
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      options: { encrypt: false },
    }),
    UsersModule,
    AuthModule,
    FundTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
