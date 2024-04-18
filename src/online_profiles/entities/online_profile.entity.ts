import { Entity, BaseEntity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Employee } from "src/employees/entities"
import { Degree, EmploymentType, Experience, PositionLevel, Profession } from "src/shared/enums"
import { AnotherDegree } from "src/another_degrees/entities";

@Entity('online_profiles')
export class OnlineProfile extends BaseEntity {
    @PrimaryColumn()
    userId: number;
    // general information
    @Column({ nullable: true })
    jobTitle: string

    @Column({
        type: 'enum',
        enum: Profession,
        default: [],
        array: true,
    })
    profession: Profession[]

    @Column({
        type: 'enum',
        enum: PositionLevel,
        default: PositionLevel.Employee
    })
    currentPosition: PositionLevel

    @Column({
        type: 'enum',
        enum: PositionLevel,
        default: PositionLevel.Employee
    })
    desiredPosition: PositionLevel

    @Column({ nullable: true })
    desiredSalary: number

    @Column({
        type: 'enum',
        enum: Degree,
        default: Degree.Other
    })
    degree: Degree

    @Column({ nullable: true })
    workAddress: string

    @Column({
        type: 'enum',
        enum: Experience,
        default: Experience.Zero
    })
    experience: Experience

    @Column({
        type: 'enum',
        enum: EmploymentType,
        default: EmploymentType.Other
    })
    employmentType: EmploymentType

    @Column({ nullable: true })
    careerGoal: string

    @Column({ nullable: true })
    skills: string

    // Other information ------------------------
    @Column({ nullable: true })
    view: number

    @Column({ default: false })
    isHidden: boolean

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedDate: Date
    // Relations ------------------------
    @OneToOne(() => Employee, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'userId'
    })
    employee: Employee

    @OneToMany(() => AnotherDegree, (anotherdegree) => anotherdegree.online_profile)
    another_degrees: AnotherDegree[]
}