import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "src/users/entities";

@Entity('employers')
export class Employer extends BaseEntity {
    @PrimaryColumn()
    userId: number;

    @Column({ nullable: true })
    taxCode: string

    @Column({ nullable: true })
    companyName: string

    @Column({ nullable: true })
    companyLocation: string

    @Column({ nullable: true })
    careerField: string

    @Column({ nullable: true })
    logo: string

    @Column({ nullable: true })
    banner: string

    @Column({ type: 'text', nullable: true })
    description: string

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