import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobPostingDto } from './dto/create-job_posting.dto';
import { UpdateJobPostingDto } from './dto/update-job_posting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from './entities';
import { Repository } from 'typeorm';
import { Employer } from 'src/employers/entities';
import { EmployersService } from 'src/employers/employers.service';


@Injectable()
export class JobPostingsService {
  constructor(
    @InjectRepository(JobPosting)
    private jobPostingRepository: Repository<JobPosting>,
    @InjectRepository(Employer)
    private employerRepository: Repository<Employer>,
    private employerService: EmployersService,
  ) {}

  async findOne(id: number): Promise<JobPosting> {
    const jobPosting = await this.jobPostingRepository
      .createQueryBuilder('jobPosting')
      .select(['jobPosting', 'employer.userId'])
      .leftJoin('jobPosting.employer','employer')
      .where('jobPosting.postId = :id', {id})
      .getOne();

    if (!jobPosting) {
      throw new NotFoundException('job Posting not found');
    }
    return jobPosting;
  }

  async validateOwnershipAndGetResource(
    employerId: number, 
    id: number, 
  ): Promise<JobPosting> {
    const jobPosting = await this.findOne(id);
    if (jobPosting.employer.userId !== employerId) {
      throw new ForbiddenException('You do not owner this JobPosting');
    }
    return jobPosting;
  }

  async create(employerId: number, createJobPostingDto: CreateJobPostingDto): Promise<JobPosting> {
    const employer = await this.employerService.findOne(employerId);

    const newJobPosting = this.jobPostingRepository.create(createJobPostingDto);
    const jobPosting = await this.jobPostingRepository.save(newJobPosting);

    employer.job_postings.push(jobPosting);
    await this.employerRepository.save(employer);
    return jobPosting;
  }

  findAll() {
    return `This action returns all jobPostings`;
  }

  async update(
    employerId: number, 
    id: number, 
    updateJobPostingDto: UpdateJobPostingDto,
  ): Promise<JobPosting> {
    const jobPosting = await this.validateOwnershipAndGetResource(employerId, id);
    Object.assign(jobPosting, updateJobPostingDto);
    return this.jobPostingRepository.save(jobPosting);
  }

  async remove(
    employerId: number, 
    id: number,
  ): Promise<JobPosting> {
    const jobPosting = await this.validateOwnershipAndGetResource(employerId, id);
    return this.jobPostingRepository.remove(jobPosting);
  }
}
