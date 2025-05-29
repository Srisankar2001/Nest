import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class University{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    name : string;
    @OneToMany(()=>User,user=>user.university)
    users : User[];
}