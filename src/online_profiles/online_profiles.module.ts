import { Module } from '@nestjs/common';
import { OnlineProfilesService } from './online_profiles.service';
import { OnlineProfilesController } from './online_profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnlineProfile } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([OnlineProfile])
  ],
  controllers: [OnlineProfilesController],
  providers: [OnlineProfilesService],
})
export class OnlineProfilesModule {}
