import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistEntity } from './entity/blacklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlacklistEntity])],
  providers: [BlacklistService],
  exports: [BlacklistService],
})
export class BlacklistModule {}
