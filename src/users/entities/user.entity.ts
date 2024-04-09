import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Sex, UserRole } from "src/shared/enums";
import { Exclude } from "class-transformer";
import { Employee } from "src/employees/entities";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number

    @Column({
        unique: true
    })
    email: string

    @Exclude()
    @Column()
    password: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.EMPLOYEE
    })
    role: UserRole

    @Column({ nullable: true })
    name: string

    @Column({ type: 'date', nullable: true })
    dob: Date

    @Column({ nullable: true })
    address: string

    @Column({ nullable: true })
    phone: string

    @Column({
        type: 'enum',
        enum: Sex,
        default: Sex.Other
    })
    sex: Sex

    @Column({ nullable: true })
    avatar: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @OneToOne(() => Employee,
        (employee) => employee.user)
    employer: Employee
}
