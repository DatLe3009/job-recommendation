import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "src/shared/enums";
import { Exclude } from "class-transformer";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    userId: number

    @Column({
        unique: true
    })
    email: string

    @Exclude()
    @Column()
    password: string

    @Column({ nullable: true })
    name: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.EMPLOYEE
    })
    role: UserRole
}
