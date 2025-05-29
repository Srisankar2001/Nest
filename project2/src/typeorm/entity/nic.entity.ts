import { Entity, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class  NIC{
    @PrimaryColumn()
    id : string;
    @OneToOne(()=>User,user=>user.nic)
    user:User;
}