import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ length: 100 })
    name!: string;

    @Column("text",{ unique: true })
    email!: string;

    @Column()
    phone!: string;

    @Column("text")
    password!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    })
    role!: string;

}


export default User
