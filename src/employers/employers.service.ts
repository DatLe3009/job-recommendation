import { Injectable } from '@nestjs/common';
import { CreateEmployerDto, UpdateEmployerDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class EmployersService {
  constructor(
    @InjectRepository(Employer)
    private employerRepository: Repository<Employer>,
  ) {}

  async create(createEmployerDto: CreateEmployerDto) {
    const newEmployer = this.employerRepository.create(createEmployerDto);
    const employer = this.employerRepository.save(newEmployer);
    return employer;
  }

  findAll() {
    return `This action returns all employers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employer`;
  }

  async update(id: number, updateEmployerDto: UpdateEmployerDto): Promise<Employer> {
    await this.employerRepository.update(id, updateEmployerDto);
    const employer = this.employerRepository.findOneBy({userId: id});
    return employer;
  }

  remove(id: number) {
    return `This action removes a #${id} employer`;
  }
}
