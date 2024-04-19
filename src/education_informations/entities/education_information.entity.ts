import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { OnlineProfile } from "src/online_profiles/entities"

@Entity('education_informations')
export class EducationInformation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    schoolName: string

    @Column()
    specialization: string

    @Column()
    degreeName: string

    @Column({ type: 'date'})
    startDate: Date

    @Column({ type: 'date'})
    endDate: Date

    @ManyToOne(() => OnlineProfile, (online_profile) => online_profile.education_informations, {
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE' 
    })
    online_profile: OnlineProfile

} 