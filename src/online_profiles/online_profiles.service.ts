import { ConflictException, Injectable } from '@nestjs/common';
import { CreateOnlineProfileDto, UpdateOnlineProfileDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OnlineProfile } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class OnlineProfilesService {
  constructor(
    @InjectRepository(OnlineProfile)
    private onlineProfileRepository: Repository<OnlineProfile>
  ) {}

  async isUserIdExists(userId: number): Promise<boolean> {
    const resource = await this.onlineProfileRepository.findOneBy({userId: userId});
    return !!resource;
  }

  async create(id: number, createOnlineProfileDto: CreateOnlineProfileDto): Promise<OnlineProfile> {
    const isUserIdExists = await this.isUserIdExists(id);
    if (isUserIdExists) {
      throw new ConflictException(`Online profile has userId ${id} already exists`);
    }
    const newOnlineProfile = this.onlineProfileRepository.create({...createOnlineProfileDto, userId: id});
    const online_profile = await this.onlineProfileRepository.save(newOnlineProfile);
    return online_profile;
  }

  findAll() {
    return `This action returns all onlineProfiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} onlineProfile`;
  }

  update(id: number, updateOnlineProfileDto: UpdateOnlineProfileDto) {
    return `This action updates a #${id} onlineProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} onlineProfile`;
  }
}
