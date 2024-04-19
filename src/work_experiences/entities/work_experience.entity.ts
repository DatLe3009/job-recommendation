import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from "typeorm"
import { OnlineProfile } from "src/online_profiles/entities"
import { BadRequestException } from "@nestjs/common"


@Entity()
export class WorkExperience extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    jobTitle: string

    @Column()
    companyName: string

    @Column({ type: 'date'})
    startDate: Date

    @Column({ type: 'date', nullable: true })
    endDate: Date

    @Column({ default: false })
    isDoing: boolean

    @Column({ type: 'text', nullable: true })
    jobDescription: string

    @BeforeInsert()
    @BeforeUpdate()
    checkDates() {
        if (this.startDate && this.endDate && this.startDate > this.endDate) {
            throw new BadRequestException('startDate must be before endDate');
        }
    }

    @ManyToOne(() => OnlineProfile, (online_profile) => online_profile.work_experiences, {
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE' 
    })
    online_profile: OnlineProfile

} 