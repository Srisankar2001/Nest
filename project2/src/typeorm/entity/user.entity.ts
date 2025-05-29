import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { NIC } from "./nic.entity";
import { Course } from "./course.entity";
import { University } from "./university.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    age : number;

    @OneToOne(()=>NIC,nic=>nic.user)
    @JoinColumn()
    nic : NIC;

    @ManyToOne(()=>University,university=>university.users)
    university : University;

    @ManyToMany(()=>Course,course=>course.users)
    @JoinTable()
    courses: Course[];
}