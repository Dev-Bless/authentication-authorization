import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number; 

    @Column({ length: 100 })
    name!: string;

    @Column("text",{ unique: true })
    email!: string;

    @Column()
    phone!: string;

    @Column("text")
    password!: string;

    @Column({default: 'user'})
    role!: string;

}


export default User
