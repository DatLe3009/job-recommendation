import { User } from "src/users/entities";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('employees')
export class Employee extends BaseEntity {
    @PrimaryColumn()
    userId: number;

    @Column({ nullable: true })
    isMarried: boolean

    @OneToOne(() => User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'userId'
    })
    user: User
}