import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlacklistEntity } from './entity/blacklist.entity';
import { LessThan, Repository } from 'typeorm';
import { AddToBlacklistDto } from './dto/add-to-blacklist.dto';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(BlacklistEntity)
    private readonly blacklistRepository: Repository<BlacklistEntity>,
  ) {}

  findToken(refreshToken: string): Promise<BlacklistEntity> {
    return this.blacklistRepository.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
  }

  checkIfBlacklisted(refreshToken: string): Promise<boolean> {
    return this.blacklistRepository.exists({
      where: { refresh_token: refreshToken },
    });
  }

  async addToken(entityDto: AddToBlacklistDto): Promise<BlacklistEntity> {
    await this.pruneDB();

    try {
      const entity: BlacklistEntity =
        this.blacklistRepository.create(entityDto);

      return await this.blacklistRepository.save(entity);
    } catch (error) {
      throw new ConflictException('Token already blacklisted');
    }
  }

  private async pruneDB() {
    await this.blacklistRepository.delete({
      expiration_date: LessThan(new Date()),
    });
  }
}
