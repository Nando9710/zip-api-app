import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Files } from '../../file/entities/file.entity';
import { IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastName?: string

  @Column()
  email: string;

  @Column()
  @Exclude()
  password?: string;

  @Column({ default: null, type: "datetime" })
  created_at?: Date;

  @Column({ default: null, type: "datetime" })
  updated_at?: Date;

  @OneToMany(() => Files, files => files.user)
  @JoinColumn()
  @IsOptional()
  files?: Files[];

  @ManyToOne(() => User, (user) => user.children)
  @JoinColumn()
  parent: User;

  @OneToMany(() => User, (user) => user.parent)
  @JoinColumn()
  children: User[];
}